"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { comboDishes, type Combo } from "@/lib/offers";

export function ComboButton({ combo }: { combo: Combo }) {
  const { addMany } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        addMany(
          comboDishes(combo).map((dish) => ({ dish })),
          `اتضاف: ${combo.name}`,
        )
      }
      className="inline-flex h-11 items-center gap-2 bg-ember px-5 text-[12.5px] font-medium text-white transition-colors hover:bg-ember-deep"
    >
      <Plus className="size-4" />
      أضف العرض
    </button>
  );
}
