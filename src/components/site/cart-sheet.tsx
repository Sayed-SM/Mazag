"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { egp } from "@/lib/utils";
import { QtyStepper } from "./qty-stepper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { lines, totals, setQty, remove, hydrated, menu: dishes } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="left"
        className="w-full gap-0 border-line bg-paper p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-line px-6 pb-5 pt-6">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="size-4 text-ember" />
            السلة
            <span className="num text-sm font-normal text-ink-soft">
              ({hydrated ? totals.count : 0})
            </span>
          </SheetTitle>
          <SheetDescription className="text-[13px]">
            بنطبخ بعد ما تأكد الطلب. الدفع عند الاستلام.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {!hydrated ? (
            <div className="space-y-4 py-6">
              {[0, 1].map((i) => (
                <div key={i} className="h-20 animate-pulse bg-sand" />
              ))}
            </div>
          ) : lines.length === 0 ? (
            <div className="flex flex-col items-start gap-3 py-10">
              <p className="font-display text-lg">السلة فاضية.</p>
              <p className="text-sm text-ink-soft">
                ابدأ من المنقل — البرجر المزدوج أكثر حاجة بتتطلب.
              </p>
              <Link
                href="/menu"
                className="link-u text-sm font-medium text-ember"
              >
                اتفرّج على المنيو
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((line) => {
                const dish = dishes.find((d) => d.id === line.dishId);
                if (!dish) return null;
                const unit = dish.price + (line.meal ? dish.mealUpgrade ?? 35 : 0);
                return (
                  <li
                    key={`${line.dishId}-${line.meal}`}
                    className="flex gap-3 py-4"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden bg-sand">
                      {dish.image ? (
                        <Image
                          src={dish.image}
                          alt={dish.nameAr}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                          {dish.category}
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug">
                          {dish.nameAr}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.dishId, line.meal)}
                          className="text-ink-soft transition-colors hover:text-ember"
                          aria-label={`شيل ${dish.nameAr}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      {line.meal && (
                        <p className="font-mono text-[10px] uppercase tracking-wider text-olive">
                          وجبة كاملة
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <QtyStepper
                          value={line.qty}
                          onChange={(next) => setQty(line.dishId, line.meal, next)}
                          size="sm"
                          label={`كمية ${dish.nameAr}`}
                        />
                        <span className="num text-sm">{egp(unit * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <SheetFooter className="border-t border-line px-6 py-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-ink-soft">المجموع</span>
              <span className="num text-base">{egp(totals.subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="flex h-11 items-center justify-center gap-2 bg-ember px-5 text-sm font-medium text-white transition-colors hover:bg-ember-deep"
            >
              كمّل الطلب
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/cart"
              className="flex h-10 items-center justify-center text-[13px] text-ink-soft underline-offset-4 hover:underline"
            >
              تعديل السلة
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
