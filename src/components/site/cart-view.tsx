"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ArrowLeft, ArrowRight, Tag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { deliveryZones, site } from "@/lib/site";
import { cn, egp } from "@/lib/utils";
import { QtyStepper } from "@/components/site/qty-stepper";
import { DishCard } from "@/components/site/dish-card";

export function CartView() {
  const {
    lines,
    totals,
    hydrated,
    setQty,
    remove,
    applyPromo,
    clearPromo,
    promo,
    zoneId,
    setZone,
    menu: dishes,
  } = useCart();
  const [code, setCode] = React.useState("");

  const suggestions = React.useMemo(
    () => dishes.filter((d) => ["d13", "d12", "d17"].includes(d.id)).slice(0, 3),
    [dishes],
  );

  if (!hydrated) {
    return (
      <div className="shell py-16">
        <div className="h-8 w-48 animate-pulse bg-sand" />
        <div className="mt-8 space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse bg-sand/70" />
          ))}
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">السلة</p>
            <h1 className="mt-3 text-h1">
              السلة فاضية.
            </h1>
            <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.9] text-ink-soft">
              لسه مفيش حاجة. لو محتاج تقرر، دول أكتر ٣ حاجات بتتطلب عندنا — ولو
              مش عارف، ابدأ بالبرجر المزدوج.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="inline-flex h-11 items-center gap-2 bg-ember px-5 text-[13px] font-medium text-white transition-colors hover:bg-ember-deep"
              >
                المنيو كامل
                <ArrowLeft className="size-4" />
              </Link>
              <Link
                href="/offers"
                className="inline-flex h-11 items-center gap-2 border border-ink px-5 text-[13px] transition-colors hover:bg-ink hover:text-cream"
              >
                عروض الوجبات
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6 lg:border-t-0 lg:pt-0">
            {[
              { k: "٣٥ د", v: "متوسط التوصيل" },
              { k: "كاش", v: "عند الاستلام" },
              { k: "٤٠٠ ج.م", v: "شحن مجاني فوقها" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="num text-[15px]">{item.k}</dt>
                <dd className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-lg">ابدأ من هنا</h2>
          <Link
            href="/menu"
            className="text-[12px] text-ink-soft underline-offset-4 hover:underline"
          >
            كل الأصناف
          </Link>
        </div>
        <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    );
  }

  const progress = Math.min(100, (totals.subtotal / site.freeDeliveryFrom) * 100);
  const belowMin = totals.minOrderGap > 0;

  return (
    <div className="shell py-10 lg:py-14">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="eyebrow">السلة</p>
          <h1 className="mt-2 text-h1">
            {totals.count} حاجة جاهزة.
          </h1>
        </div>
        <Link
          href="/menu"
          className="text-[12.5px] text-ink-soft underline-offset-4 hover:underline"
        >
          زوّد حاجة
        </Link>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => {
              const dish = dishes.find((d) => d.id === line.dishId);
              if (!dish) return null;
              const unit = dish.price + (line.meal ? dish.mealUpgrade ?? 35 : 0);
              return (
                <li
                  key={`${line.dishId}-${line.meal}`}
                  className="flex gap-4 py-5"
                >
                  <Link
                    href={`/dish/${dish.slug}`}
                    className="relative size-24 shrink-0 overflow-hidden bg-sand sm:size-28"
                  >
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.nameAr}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center font-mono text-[9px] uppercase tracking-widest text-ink-soft">
                        {dish.category}
                      </span>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display text-[15px]">
                          <Link href={`/dish/${dish.slug}`} className="hover:text-ember">
                            {dish.nameAr}
                          </Link>
                        </h2>
                        {line.meal && (
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-olive">
                            وجبة كاملة · بطاطس + ليموناضة
                          </p>
                        )}
                        <p className="mt-1 num text-[11.5px] text-ink-soft">
                          {egp(unit)} للقطعة
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.dishId, line.meal)}
                        className="p-1 text-ink-soft transition-colors hover:text-ember"
                        aria-label={`شيل ${dish.nameAr} من السلة`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <QtyStepper
                        value={line.qty}
                        onChange={(next) => setQty(line.dishId, line.meal, next)}
                        size="sm"
                        label={`كمية ${dish.nameAr}`}
                      />
                      <span className="num text-[15px]">{egp(unit * line.qty)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border border-line p-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2">
              <Tag className="size-4 text-ember" />
              <label htmlFor="promo" className="text-[12.5px]">
                كود خصم
              </label>
            </div>
            {promo ? (
              <div className="flex items-center gap-3">
                <span className="border border-olive/40 bg-olive/5 px-2.5 py-1.5 font-mono text-[11px] text-olive">
                  {promo} — ١٠٪
                </span>
                <button
                  type="button"
                  onClick={clearPromo}
                  className="inline-flex items-center gap-1 text-[11.5px] text-ink-soft hover:text-ember"
                >
                  <X className="size-3" /> شيل
                </button>
              </div>
            ) : (
              <form
                className="flex flex-1 gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (applyPromo(code)) setCode("");
                }}
              >
                <input
                  id="promo"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="MAZAG10"
                  dir="ltr"
                  className="h-10 w-full border border-line bg-paper px-3 font-mono text-[12px] uppercase focus:border-ink focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 shrink-0 border border-ink px-4 text-[12px] transition-colors hover:bg-ink hover:text-cream"
                >
                  طبّق
                </button>
              </form>
            )}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg"> بتوصّل فين؟</h2>
            <p className="mt-1 text-[12.5px] text-ink-soft">
              اختار المنطقة عشان نحسب الشحن. بنحدد العنوان بالتفصيل في صفحة الدفع.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {deliveryZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setZone(zone.id)}
                  aria-pressed={zoneId === zone.id}
                  className={cn(
                    "flex items-start justify-between gap-3 border p-3 text-start transition-colors",
                    zoneId === zone.id
                      ? "border-ink bg-paper"
                      : "border-line hover:border-ink/40",
                  )}
                >
                  <span>
                    <span className="block text-[12.5px] font-medium">
                      {zone.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-ink-soft">
                      {zone.areas}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-ink-soft">
                      {zone.eta}
                    </span>
                  </span>
                  <span className="num shrink-0 text-[12px]">
                    {totals.subtotal >= site.freeDeliveryFrom ? "مجاني" : egp(zone.fee)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-line bg-paper p-5">
            <h2 className="font-display text-lg">الفاتورة</h2>

            <dl className="mt-4 space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">المجموع</dt>
                <dd className="num">{egp(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-olive">
                  <dt>خصم {promo}</dt>
                  <dd className="num">− {egp(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-soft">التوصيل</dt>
                <dd className="num">
                  {totals.delivery === 0 ? "مجاني" : egp(totals.delivery)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-[15px] font-medium">
                <dt>الإجمالي</dt>
                <dd className="num">{egp(totals.total)}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5" />
                  {totals.freeDeliveryGap > 0
                    ? `فاضل ${egp(totals.freeDeliveryGap)} لشحن مجاني`
                    : "الشحن علينا"}
                </span>
                <span className="num">{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-sand">
                <div
                  className="h-full bg-olive transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {belowMin ? (
              <>
                <button
                  type="button"
                  disabled
                  className="mt-5 flex h-12 w-full items-center justify-center bg-ink/20 text-[13px] text-ink/50"
                >
                  الحد الأدنى {egp(site.minOrder)}
                </button>
                <p className="mt-2 text-center text-[11px] text-ember">
                  ناقص {egp(totals.minOrderGap)} عشان تقدر تطلب.
                </p>
              </>
            ) : (
              <Link
                href="/checkout"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-ember text-[14px] font-medium text-white transition-colors hover:bg-ember-deep"
              >
                كمّل الطلب
                <ArrowLeft className="size-4" />
              </Link>
            )}

            <p className="mt-3 text-center text-[11px] text-ink-soft">
              الدفع كاش عند الاستلام · تأكيد على واتساب
            </p>
          </div>

          <div className="mt-4 border border-line p-4">
            <p className="text-[12.5px] font-medium">وقت التحضير</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
              {dishes
                .filter((d) => lines.some((l) => l.dishId === d.id))
                .reduce((max, d) => Math.max(max, d.prepMin), 0) + 10}{" "}
              دقيقة تقريبًا + التوصيل. بنبدأ الطبخ بعد تأكيد الطلب.
            </p>
          </div>

          <Link
            href="/menu"
            className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-ink-soft hover:text-ink"
          >
            <ArrowRight className="size-3.5" />
            كمّل تسوق
          </Link>
        </aside>
      </div>
    </div>
  );
}
