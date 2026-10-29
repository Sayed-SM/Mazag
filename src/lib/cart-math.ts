import type { Dish } from "./menu";
import { deliveryZones, site, type DeliveryZone } from "./site";

export type CartLine = { dishId: string; qty: number; meal: boolean };

export type Totals = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  freeDeliveryGap: number;
  minOrderGap: number;
  count: number;
};

export const PROMO = { code: "MAZAG10", percent: 10, maxDiscount: 100 };

export const MAX_QTY = 20;

export function findZone(id: string): DeliveryZone {
  return deliveryZones.find((z) => z.id === id) ?? deliveryZones[0];
}

export function unitPrice(dish: Dish, meal: boolean): number {
  return dish.price + (meal ? dish.mealUpgrade ?? 35 : 0);
}

export function lineTotal(line: CartLine, dish: Dish | undefined): number {
  if (!dish) return 0;
  return unitPrice(dish, line.meal) * Math.max(1, line.qty);
}

export function calcSubtotal(
  lines: CartLine[],
  menu: Dish[],
): number {
  return lines.reduce((sum, line) => {
    const dish = menu.find((d) => d.id === line.dishId);
    return sum + lineTotal(line, dish);
  }, 0);
}

export function discountFor(subtotal: number, code: string): number {
  if (code.trim().toUpperCase() !== PROMO.code) return 0;
  return Math.min(Math.round((subtotal * PROMO.percent) / 100), PROMO.maxDiscount);
}

export function deliveryFeeFor(zoneId: string, subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= site.freeDeliveryFrom) return 0;
  return findZone(zoneId).fee;
}

export function totalsFor(
  lines: CartLine[],
  menu: Dish[],
  opts: { zoneId: string; promo: string },
): Totals {
  const subtotal = calcSubtotal(lines, menu);
  const discount = discountFor(subtotal, opts.promo);
  const delivery = deliveryFeeFor(opts.zoneId, subtotal);
  const total = Math.max(0, subtotal - discount + delivery);
  return {
    subtotal,
    discount,
    delivery,
    total,
    freeDeliveryGap: Math.max(0, site.freeDeliveryFrom - subtotal),
    minOrderGap: Math.max(0, site.minOrder - subtotal),
    count: lines.reduce((n, l) => n + l.qty, 0),
  };
}

export function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
}
