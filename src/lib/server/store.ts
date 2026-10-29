import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { dishes as baseDishes, type Dish } from "@/lib/menu";
import type { Order, OrderStatus } from "@/lib/orders";

/**
 * Data access layer — file-backed today, database-backed tomorrow.
 *
 * ⇄ DB SWAP POINT: every export below is the single seam between the app and
 * its data. When the database lands, reimplement these functions against it
 * (Supabase / Postgres / …) and NOTHING else in the app has to change —
 * pages, API routes and the admin UI all talk to this module only.
 *
 * Until then, state lives in `.data/` (git-ignored) as JSON files so the
 * whole flow works end-to-end in development.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const MENU_FILE = path.join(DATA_DIR, "menu.json");

type MenuOverrides = {
  /** Dishes added from the admin panel. */
  added: Dish[];
  /** Ids of base dishes removed from the menu. */
  removed: string[];
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // Write-then-rename keeps readers from ever seeing a half-written file.
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, file);
}

/* ------------------------------ orders ------------------------------ */

export async function listOrders(): Promise<Order[]> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  return orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
}

export async function saveOrder(order: Order): Promise<void> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  const next = [order, ...orders.filter((o) => o.id !== order.id)].slice(0, 500);
  await writeJson(ORDERS_FILE, next);
}

export async function setOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order | undefined> {
  const orders = await readJson<Order[]>(ORDERS_FILE, []);
  const order = orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
  if (!order) return undefined;
  order.status = status;
  await writeJson(ORDERS_FILE, orders);
  return order;
}

/* -------------------------------- menu ------------------------------- */

export async function getMenuOverrides(): Promise<MenuOverrides> {
  return readJson<MenuOverrides>(MENU_FILE, { added: [], removed: [] });
}

/** The live menu: base dishes (minus deletions) + admin additions. */
export async function listMenu(): Promise<Dish[]> {
  const { added, removed } = await getMenuOverrides();
  const removedSet = new Set(removed);
  const base = baseDishes.filter((d) => !removedSet.has(d.id));
  return [...base, ...added];
}

export async function getDishBySlug(slug: string): Promise<Dish | undefined> {
  const menu = await listMenu();
  return menu.find((d) => d.slug === slug);
}

export type NewDish = Omit<Dish, "id" | "slug"> & { slug?: string };

export async function addDish(input: NewDish): Promise<Dish> {
  const overrides = await getMenuOverrides();
  const stamp = Date.now().toString(36);
  const slug =
    input.slug?.trim() ||
    `item-${stamp}`;
  const dish: Dish = {
    ...input,
    id: `adm-${stamp}`,
    slug,
    tags: input.tags ?? [],
    allergens: input.allergens ?? [],
    ingredients: input.ingredients ?? [],
    pairsWith: input.pairsWith ?? [],
  };
  overrides.added.push(dish);
  await writeJson(MENU_FILE, overrides);
  return dish;
}

/** Removes a dish — base dishes are recorded as removed, added ones are dropped. */
export async function removeDish(id: string): Promise<boolean> {
  const overrides = await getMenuOverrides();
  const before = overrides.added.length;
  overrides.added = overrides.added.filter((d) => d.id !== id);

  const isBase = baseDishes.some((d) => d.id === id);
  if (isBase && !overrides.removed.includes(id)) {
    overrides.removed.push(id);
  }

  const changed = overrides.added.length !== before || isBase;
  if (changed) await writeJson(MENU_FILE, overrides);
  return changed;
}
