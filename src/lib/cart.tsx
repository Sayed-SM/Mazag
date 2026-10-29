"use client";

import * as React from "react";
import { toast } from "sonner";
import { dishes, type Dish } from "./menu";
import {
  clampQty,
  totalsFor,
  type CartLine,
  type Totals,
} from "./cart-math";
import type { DeliveryZone } from "./site";

const KEY = "mazag.cart.v2";
const LEGACY_KEY = "mangal.cart.v2";

type CartState = {
  lines: CartLine[];
  zoneId: DeliveryZone["id"];
  promo: string;
};

type CartApi = CartState & {
  hydrated: boolean;
  totals: Totals;
  /** Live menu: base dishes + admin additions. */
  menu: Dish[];
  add: (dish: Dish, meal?: boolean, qty?: number) => void;
  addMany: (items: { dish: Dish; meal?: boolean }[], label?: string) => void;
  remove: (dishId: string, meal: boolean) => void;
  setQty: (dishId: string, meal: boolean, qty: number) => void;
  clear: () => void;
  setZone: (id: DeliveryZone["id"]) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  itemCount: (dishId: string, meal: boolean) => number;
};

const CartContext = React.createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({
    lines: [],
    zoneId: "near",
    promo: "",
  });
  const [hydrated, setHydrated] = React.useState(false);
  // Live menu (base + admin additions). Falls back to the static build list.
  const [menu, setMenu] = React.useState<Dish[]>(dishes);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.dishes) && data.dishes.length) {
          setMenu(data.dishes as Dish[]);
        }
      })
      .catch(() => {
        /* offline — keep the static list */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    try {
      const raw =
        window.localStorage.getItem(KEY) ??
        window.localStorage.getItem(LEGACY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartState>;
        if (Array.isArray(parsed.lines)) {
          setState({
            lines: parsed.lines.filter(
              (l) => l && typeof l.dishId === "string" && l.qty > 0,
            ),
            zoneId: parsed.zoneId ?? "near",
            promo: typeof parsed.promo === "string" ? parsed.promo : "",
          });
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full / blocked */
    }
  }, [state, hydrated]);

  const add = React.useCallback((dish: Dish, meal = false, qty = 1) => {
    const amount = clampQty(qty);
    setState((prev) => {
      const index = prev.lines.findIndex(
        (l) => l.dishId === dish.id && l.meal === meal,
      );
      const lines = [...prev.lines];
      if (index >= 0) {
        lines[index] = {
          ...lines[index],
          qty: clampQty(lines[index].qty + amount),
        };
      } else {
        lines.push({ dishId: dish.id, meal, qty: amount });
      }
      return { ...prev, lines };
    });
    toast.success(`اتضاف: ${dish.nameAr}`, {
      description: meal
        ? `وجبة كاملة × ${amount} — مع البطاطس والمشروب`
        : `× ${amount}`,
      action: { label: "شوف السلة", onClick: () => (window.location.href = "/cart") },
    });
  }, []);

  const addMany = React.useCallback(
    (items: { dish: Dish; meal?: boolean }[], label?: string) => {
      setState((prev) => {
        const lines = [...prev.lines];
        for (const item of items) {
          const meal = item.meal ?? false;
          const index = lines.findIndex(
            (l) => l.dishId === item.dish.id && l.meal === meal,
          );
          if (index >= 0) {
            lines[index] = {
              ...lines[index],
              qty: clampQty(lines[index].qty + 1),
            };
          } else {
            lines.push({ dishId: item.dish.id, meal, qty: 1 });
          }
        }
        return { ...prev, lines };
      });
      toast.success(label ?? "اتضاف للسلة", {
        description: `${items.length} أصناف`,
        action: { label: "شوف السلة", onClick: () => (window.location.href = "/cart") },
      });
    },
    [],
  );

  const remove = React.useCallback((dishId: string, meal: boolean) => {
    setState((prev) => ({
      ...prev,
      lines: prev.lines.filter((l) => !(l.dishId === dishId && l.meal === meal)),
    }));
  }, []);

  const setQty = React.useCallback(
    (dishId: string, meal: boolean, qty: number) => {
      setState((prev) => {
        if (qty <= 0) {
          return {
            ...prev,
            lines: prev.lines.filter(
              (l) => !(l.dishId === dishId && l.meal === meal),
            ),
          };
        }
        return {
          ...prev,
          lines: prev.lines.map((l) =>
            l.dishId === dishId && l.meal === meal
              ? { ...l, qty: clampQty(qty) }
              : l,
          ),
        };
      });
    },
    [],
  );

  const clear = React.useCallback(() => {
    setState((prev) => ({ ...prev, lines: [], promo: "" }));
  }, []);

  const setZone = React.useCallback((id: DeliveryZone["id"]) => {
    setState((prev) => ({ ...prev, zoneId: id }));
  }, []);

  const applyPromo = React.useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean !== "MAZAG10") {
      toast.error("الكود مش شغال", { description: "جرّب MAZAG10" });
      return false;
    }
    setState((prev) => ({ ...prev, promo: clean }));
    toast.success("الكود اتطبّق — ١٠٪ لحد ١٠٠ ج.م");
    return true;
  }, []);

  const clearPromo = React.useCallback(() => {
    setState((prev) => ({ ...prev, promo: "" }));
  }, []);

  const totals = React.useMemo(
    () => totalsFor(state.lines, menu, { zoneId: state.zoneId, promo: state.promo }),
    [state, menu],
  );

  const itemCount = React.useCallback(
    (dishId: string, meal: boolean) =>
      state.lines.find((l) => l.dishId === dishId && l.meal === meal)?.qty ?? 0,
    [state.lines],
  );

  const value: CartApi = {
    ...state,
    hydrated,
    totals,
    menu,
    add,
    addMany,
    remove,
    setQty,
    clear,
    setZone,
    applyPromo,
    clearPromo,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
