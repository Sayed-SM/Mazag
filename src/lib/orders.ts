import type { CartLine } from "./cart-math";

export type OrderItem = {
  dishId: string;
  nameAr: string;
  meal: boolean;
  qty: number;
  unit: number;
  total: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  zoneId: string;
  area: string;
  address: string;
  landmark?: string;
  notes?: string;
  slot: string;
};

export type OrderStatus = "received" | "kitchen" | "courier" | "delivered";

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  promo: string;
  customer: OrderCustomer;
  status: OrderStatus;
  eta: string;
};

const KEY = "mazag.orders.v1";
const LEGACY_KEY = "mangal.orders.v1";
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function buildOrderId(date = new Date()): string {
  const y = String(date.getFullYear()).slice(2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `MZ-${y}${m}${d}-${suffix}`;
}

export function saveOrder(order: Order) {
  try {
    const all = listOrders();
    window.localStorage.setItem(
      KEY,
      JSON.stringify([order, ...all].slice(0, 20)),
    );
  } catch {
    /* ignore */
  }
}

export function listOrders(): Order[] {
  try {
    const raw =
      window.localStorage.getItem(KEY) ?? window.localStorage.getItem(LEGACY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrder(id: string): Order | undefined {
  return listOrders().find((o) => o.id.toUpperCase() === id.toUpperCase());
}

export function toOrderItems(lines: CartLine[], menu: { id: string; nameAr: string; price: number; mealUpgrade?: number }[]) {
  return lines.flatMap((line) => {
    const dish = menu.find((d) => d.id === line.dishId);
    if (!dish) return [];
    const unit = dish.price + (line.meal ? dish.mealUpgrade ?? 35 : 0);
    return [
      {
        dishId: dish.id,
        nameAr: dish.nameAr,
        meal: line.meal,
        qty: line.qty,
        unit,
        total: unit * line.qty,
      },
    ];
  });
}

export const STATUS_STEPS = [
  { id: "received", label: "تم استلام الطلب", hint: "وصلنا طلبك" },
  { id: "kitchen", label: "في المطبخ", hint: "بيتطبخ دلوقتي" },
  { id: "courier", label: "مع الطيار", hint: "في السكة إليك" },
  { id: "delivered", label: "اتسلّم", hint: "بالهنا والشفا" },
] as const;
