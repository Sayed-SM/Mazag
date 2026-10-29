import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ComboButton } from "@/components/site/combo-button";
import { combos, comboDishes } from "@/lib/offers";
import { egp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "عروض الوجبات",
  description:
    "ثلاث وجبات جاهزة بسعر أقل من مجموع أصنافها: المنقل، البخار، والكوشة.",
};

export default function OffersPage() {
  return (
    <>
      <PageHeader
        eyebrow="عروض · محدودة بالمنيو"
        title="وجبات جاهزة، بسعر أقل من مجموعها."
        note="بنحسبها بنفس سعر الأصناف المنفصل، وبنخصم الفرق. مفيش شروط مخفية، ومش بتتجمع مع كود الخصم."
        meta="٣ وجبات · متاحة طول اليوم"
      />

      <div className="shell py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {combos.map((combo) => {
            const items = comboDishes(combo);
            return (
              <article key={combo.id} className="flex flex-col border border-line bg-paper">
                <div className="relative aspect-[16/10] bg-sand">
                  {items[0]?.image && (
                    <Image
                      src={items[0].image}
                      alt={combo.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute start-3 top-3 bg-cream/95 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em]">
                    {combo.note}
                  </span>
                  <span className="absolute bottom-3 end-3 bg-ember px-2 py-1 font-mono text-[9.5px] tracking-wide text-white">
                    توفير {egp(combo.was - combo.price)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-xl">{combo.name}</h2>
                  <ul className="mt-3 space-y-2">
                    {items.map((dish) => (
                      <li
                        key={dish.id}
                        className="flex items-center justify-between gap-3 text-[12.5px]"
                      >
                        <span className="flex items-center gap-2">
                          <Check className="size-3 text-olive" />
                          {dish.nameAr}
                        </span>
                        <span className="num text-[11px] text-ink-soft">
                          {egp(dish.price)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="flex items-baseline gap-3">
                      <span className="num text-xl">{egp(combo.price)}</span>
                      <span className="num text-[12px] text-ink-soft line-through">
                        {egp(combo.was)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <ComboButton combo={combo} />
                    </div>
                    <p className="mt-2 text-[10.5px] text-ink-soft">
                      السعر لشخص واحد إلا لو مكتوب غير كده.
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 border-t border-line pt-6 text-[12px] leading-relaxed text-ink-soft">
          <p>
            <span className="text-ink">ملاحظة:</span> لو صنف في العرض خلص، بنستبدله
            بصنف من نفس المحطة بنفس السعر أو أعلى، وبنقولك قبل ما نبعت.
          </p>
        </div>
      </div>
    </>
  );
}
