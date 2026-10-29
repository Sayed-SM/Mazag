"use client";

import * as React from "react";
import { Check, Plus } from "lucide-react";
import type { Dish } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { cn, egp } from "@/lib/utils";
import { QtyStepper } from "./qty-stepper";

export function AddToCart({ dish }: { dish: Dish }) {
  const [meal, setMeal] = React.useState(false);
  const [qty, setQty] = React.useState(1);
  const { add } = useCart();

  const upgrade = dish.mealUpgrade ?? 0;
  const unit = dish.price + (meal ? upgrade : 0);
  const total = unit * qty;

  return (
    <div className="border border-line bg-paper p-5">
      {upgrade > 0 && (
        <button
          type="button"
          role="checkbox"
          aria-checked={meal}
          onClick={() => setMeal((v) => !v)}
          className={cn(
            "flex w-full items-start gap-3 border p-3.5 text-start transition-colors",
            meal ? "border-olive bg-olive/5" : "border-line hover:border-ink/40",
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center border",
              meal ? "border-olive bg-olive text-cream" : "border-line",
            )}
            aria-hidden="true"
          >
            {meal && <Check className="size-3" />}
          </span>
          <span className="flex-1">
            <span className="flex items-center justify-between gap-2 text-[13px] font-medium">
              حوّلها وجبة كاملة
              <span className="num text-ember">+{egp(upgrade)}</span>
            </span>
            <span className="mt-1 block text-[11.5px] leading-relaxed text-ink-soft">
              بطاطس بالروزماري + ليموناضة نعناع. بتوفر {egp(15)} عن الطلب
              المنفصل.
            </span>
          </span>
        </button>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <QtyStepper value={qty} onChange={setQty} />
        <span className="num text-lg">{egp(total)}</span>
      </div>

      <button
        type="button"
        onClick={() => add(dish, meal, qty)}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-ember text-[14px] font-medium text-white transition-colors hover:bg-ember-deep"
      >
        <Plus className="size-4" />
        أضف للسلة
      </button>

      <p className="mt-3 text-center text-[11px] text-ink-soft">
        بيتطبخ في {dish.prepMin} دقيقة · دفع عند الاستلام
      </p>
    </div>
  );
}
