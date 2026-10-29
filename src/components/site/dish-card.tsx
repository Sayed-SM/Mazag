"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, Leaf, Plus, Sparkles } from "lucide-react";
import type { Dish, Tag } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { cn, egp } from "@/lib/utils";
import { DrinkArt } from "./drink-art";

const TAG_LABEL: Partial<Record<Tag, string>> = {
  bestseller: "الأكثر طلبًا",
  new: "جديد",
  spicy: "حار",
  veg: "نباتي",
  gf: "بدون جلوتين",
};

const TAG_STYLE: Partial<Record<Tag, string>> = {
  bestseller: "bg-ink text-cream",
  new: "bg-olive text-cream",
  spicy: "bg-ember text-white",
  veg: "bg-cream text-olive border border-olive/30",
  gf: "bg-cream text-ink-soft border border-line",
};

export function DishCard({
  dish,
  preload = false,
  compact = false,
}: {
  dish: Dish;
  preload?: boolean;
  compact?: boolean;
}) {
  const { add } = useCart();
  const primary = dish.tags.find((t) => TAG_LABEL[t]);

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/dish/${dish.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${dish.nameAr} — ${egp(dish.price)}`}
      >
        <div className="plate relative aspect-[4/3] w-full rounded-xl ring-1 ring-ink/[0.07] transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-28px_rgba(23,19,14,0.45)]">
          {dish.image ? (
            <Image
              src={dish.image}
              alt={dish.nameAr}
              fill
              preload={preload}
              sizes={compact ? "(max-width: 768px) 45vw, 240px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              className="object-cover"
            />
          ) : (
            <DrinkArt slug={dish.slug} nameEn={dish.nameEn} />
          )}

          {/* soft bottom fade so the frame reads like a served plate */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {primary && (
            <span
              className={cn(
                "absolute start-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] shadow-sm",
                TAG_STYLE[primary],
              )}
            >
              {primary === "bestseller" && <Sparkles className="size-2.5" />}
              {primary === "spicy" && <Flame className="size-2.5" />}
              {primary === "veg" && <Leaf className="size-2.5" />}
              {TAG_LABEL[primary]}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <h3 className="font-display text-[15.5px] font-medium leading-snug">
            <Link href={`/dish/${dish.slug}`} className="transition-colors hover:text-ember">
              {dish.nameAr}
            </Link>
          </h3>
          {!compact && (
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
              {dish.shortAr}
            </p>
          )}
          <p className="mt-2 flex items-center gap-2 font-mono text-[10.5px] text-ink-soft">
            <span>{dish.prepMin} د</span>
            {dish.kcal && (
              <>
                <span className="text-line">·</span>
                <span>{dish.kcal} كالوري</span>
              </>
            )}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="num text-[15px]">{egp(dish.price)}</span>
          <button
            type="button"
            onClick={() => add(dish, false)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors duration-300 hover:border-ember hover:bg-ember hover:text-white"
            aria-label={`أضف ${dish.nameAr} للسلة`}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
