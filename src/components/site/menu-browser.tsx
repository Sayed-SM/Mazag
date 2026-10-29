"use client";

import * as React from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, dishes as baseDishes, type CategoryId, type Dish } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { DishCard } from "./dish-card";

type Filter = "all" | CategoryId;
type DietFilter = "veg" | "gf" | "spicy";

const dietLabels: Record<DietFilter, string> = {
  veg: "نباتي",
  gf: "بدون جلوتين",
  spicy: "حار",
};

const pillBase =
  "shrink-0 rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300";
const pillOn = "border-ink bg-ink text-cream shadow-[0_8px_20px_-10px_rgba(23,19,14,0.5)]";
const pillOff =
  "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink";

/* Keep short sections from leaving a dead column at the end of the row. */
function gridFor(count: number) {
  if (count >= 4) return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (count === 3) return "sm:grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "sm:grid-cols-2";
  return "";
}

export function MenuBrowser({
  initialCategory = "all",
  lockCategory = false,
  dishes = baseDishes,
}: {
  initialCategory?: Filter;
  lockCategory?: boolean;
  /** Live menu from the data layer — admin additions included. */
  dishes?: Dish[];
}) {
  const [category, setCategory] = React.useState<Filter>(initialCategory);
  const [query, setQuery] = React.useState("");
  const [diets, setDiets] = React.useState<DietFilter[]>([]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((dish) => {
      if (category !== "all" && dish.category !== category) return false;
      if (diets.length && !diets.every((d) => dish.tags.includes(d))) return false;
      if (!q) return true;
      return (
        dish.nameAr.toLowerCase().includes(q) ||
        dish.nameEn.toLowerCase().includes(q) ||
        dish.shortAr.toLowerCase().includes(q) ||
        dish.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [category, query, diets, dishes]);

  const grouped = React.useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        items: filtered.filter((d) => d.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [filtered]);

  const activeFilters = diets.length > 0 || query.length > 0;

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-1 border-b border-line/60 bg-cream/92 px-1 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 no-bar">
            {lockCategory ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/menu/${cat.id}`}
                  aria-current={cat.id === category ? "page" : undefined}
                  className={cn(
                    pillBase,
                    cat.id === category ? pillOn : pillOff,
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      "num ms-1.5 inline-flex size-4 items-center justify-center rounded-full text-[9.5px]",
                      cat.id === category
                        ? "bg-cream/20 text-cream"
                        : "bg-sand text-ink-soft",
                    )}
                  >
                    {dishes.filter((d) => d.category === cat.id).length}
                  </span>
                </Link>
              ))
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={cn(pillBase, category === "all" ? pillOn : pillOff)}
                >
                  الكل
                  <span
                    className={cn(
                      "num ms-1.5 inline-flex size-4 items-center justify-center rounded-full text-[9.5px]",
                      category === "all"
                        ? "bg-cream/20 text-cream"
                        : "bg-sand text-ink-soft",
                    )}
                  >
                    {dishes.length}
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      pillBase,
                      category === cat.id ? pillOn : pillOff,
                    )}
                  >
                    {cat.label}
                    <span
                      className={cn(
                        "num ms-1.5 inline-flex size-4 items-center justify-center rounded-full text-[9.5px]",
                        category === cat.id
                          ? "bg-cream/20 text-cream"
                          : "bg-sand text-ink-soft",
                      )}
                    >
                      {dishes.filter((d) => d.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 lg:w-72">
              <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="دوّر على طبق أو مكوّن…"
                aria-label="ابحث في المنيو"
                className="h-11 w-full rounded-full border border-line bg-paper ps-11 pe-11 text-[13px] placeholder:text-ink-soft/60 focus:border-ink/40 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-soft transition-colors hover:text-ink"
                  aria-label="امسح البحث"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="hidden items-center gap-1.5 sm:flex">
              <SlidersHorizontal className="me-1 size-3.5 text-ink-soft" />
              {(Object.keys(dietLabels) as DietFilter[]).map((diet) => (
                <button
                  key={diet}
                  type="button"
                  aria-pressed={diets.includes(diet)}
                  onClick={() =>
                    setDiets((prev) =>
                      prev.includes(diet)
                        ? prev.filter((d) => d !== diet)
                        : [...prev, diet],
                    )
                  }
                  className={cn(
                    "rounded-full border px-3 py-2 text-[11.5px] transition-all duration-300",
                    diets.includes(diet)
                      ? "border-olive bg-olive text-cream shadow-[0_8px_20px_-12px_rgba(78,92,58,0.6)]"
                      : "border-line bg-paper text-ink-soft hover:border-olive/40 hover:text-olive",
                  )}
                >
                  {dietLabels[diet]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(activeFilters || !lockCategory) && (
          <div className="mt-2 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {filtered.length} صنف
              {query && ` · نتائج "${query}"`}
            </p>
            {activeFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDiets([]);
                }}
                className="text-[11px] text-ember underline-offset-4 hover:underline"
              >
                صفّي الفلاتر
              </button>
            )}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-xl">مفيش نتيجة للبحث ده.</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-[13.5px] text-ink-soft">
            جرّب كلمة أبسط — «برجر»، «بيتزا»، «حمص». أو صفّي الفلاتر وشوف المنيو
            كله.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDiets([]);
              setCategory("all");
            }}
            className="mt-5 inline-flex h-11 items-center rounded-full border border-ink px-6 text-[12.5px] transition-colors hover:bg-ink hover:text-cream"
          >
            رجّع المنيو كامل
          </button>
        </div>
      ) : (
        <div className="space-y-16 py-10">
          {grouped.map((group) => (
            <section key={group.id} aria-labelledby={`cat-${group.id}`}>
              <div className="border-b border-line pb-3">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-soft">
                  {group.counter}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 id={`cat-${group.id}`} className="font-display text-xl">
                    {group.label}
                  </h2>
                  <p className="num text-[11px] text-ink-soft">
                    {group.items.length} أصناف
                  </p>
                </div>
              </div>
              <p className="mt-3 max-w-[58ch] text-[12.5px] leading-relaxed text-ink-soft">
                {group.blurb}
              </p>
              <div
                className={cn(
                  "mt-6 grid gap-x-6 gap-y-10",
                  gridFor(group.items.length),
                )}
              >
                {group.items.map((dish: Dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
