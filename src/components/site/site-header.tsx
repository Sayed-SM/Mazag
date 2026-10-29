"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { CartSheet } from "./cart-sheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Wordmark({
  compact = false,
  inverted = false,
}: {
  compact?: boolean;
  inverted?: boolean;
}) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display font-extrabold tracking-tight",
          compact ? "text-[1.2rem]" : "text-[1.45rem]",
          inverted ? "text-cream" : "text-ink",
        )}
      >
        أكله بمزاج
      </span>
      <span
        className={cn(
          "mt-1.5 font-mono uppercase",
          compact ? "text-[7.5px] tracking-[0.3em]" : "text-[8.5px] tracking-[0.34em]",
          inverted ? "text-saffron" : "text-ember/80",
        )}
      >
        Mazag&nbsp;Kitchen
      </span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { totals, hydrated } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <div className="hidden bg-ink text-cream md:block">
        <div className="shell flex h-9 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em]">
          <p className="flex items-center gap-3">
            <span>{site.hours}</span>
            <span className="text-cream/30">/</span>
            <span className="text-cream/70">{site.addressShort}</span>
          </p>
          <p className="flex items-center gap-2 text-cream/80">
            <Phone className="size-3" />
            <a href={`tel:+${site.phone}`} className="tel hover:text-saffron">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/92 backdrop-blur-md">
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="-ms-2 inline-flex size-10 items-center justify-center text-ink lg:hidden"
                  aria-label="افتح القائمة"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="flex w-[90%] flex-col border-line bg-paper p-0 sm:max-w-sm"
              >
                <SheetHeader className="flex flex-row items-center justify-between border-b border-line px-6 py-6">
                  <SheetTitle className="sr-only">القائمة</SheetTitle>
                  <Wordmark compact />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
                    aria-label="اقفل القائمة"
                  >
                    <X className="size-4" strokeWidth={1.75} />
                  </button>
                </SheetHeader>

                <nav
                  className="flex-1 overflow-y-auto px-6 py-2"
                  aria-label="القائمة"
                >
                  {[{ href: "/", label: "الرئيسية" }, ...nav].map(
                    (item, index) => {
                      const active =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-center justify-between border-b border-line/70 py-5"
                        >
                          <span className="flex items-baseline gap-3">
                            <span
                              className={cn(
                                "num text-[10px]",
                                active ? "text-ember" : "text-ink-soft/60",
                              )}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "font-display text-xl transition-colors duration-300",
                                active ? "text-ink" : "text-ink group-hover:text-ember",
                              )}
                            >
                              {item.label}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                              active
                                ? "border-ember bg-ember text-white"
                                : "border-ink/15 text-ink group-hover:border-ember group-hover:bg-ember group-hover:text-white",
                            )}
                          >
                            <ArrowLeft className="size-4" strokeWidth={1.75} />
                          </span>
                        </Link>
                      );
                    },
                  )}
                </nav>

                <div className="border-t border-line px-6 py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {site.hours}
                  </p>
                  <a
                    href={`https://wa.me/${site.phone}`}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center bg-ember text-sm font-medium text-white transition-colors hover:bg-ember-deep"
                  >
                    اطلب على واتساب
                  </a>
                  <a
                    href={`tel:+${site.phone}`}
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 border border-line text-[12.5px] text-ink transition-colors hover:border-ink"
                  >
                    <Phone className="size-3.5 text-ember" />
                    <span className="tel">{site.phoneDisplay}</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" aria-label="أكله بمزاج — الرئيسية">
              <Wordmark />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-[13.5px] transition-colors",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px bg-ember" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/menu"
              className="inline-flex size-10 items-center justify-center text-ink transition-colors hover:text-ember"
              aria-label="ابحث في المنيو"
            >
              <Search className="size-[18px]" />
            </Link>

            {/* cart pill with count badge — count badge pattern (21st) */}
            <CartSheet>
              <button
                type="button"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink ps-4 pe-1.5 text-[13px] font-medium text-cream transition-colors duration-300 hover:bg-ember"
                aria-label="افتح السلة"
              >
                <ShoppingBag className="size-4" />
                <span className="hidden sm:inline">افتح السلة</span>
                <span
                  className={cn(
                    "num inline-flex size-7 items-center justify-center rounded-full text-[11.5px] font-medium transition-colors duration-300",
                    hydrated && totals.count > 0
                      ? "bg-ember text-white group-hover:bg-cream group-hover:text-ember"
                      : "bg-cream/15 text-cream group-hover:bg-white/25",
                  )}
                >
                  {hydrated ? totals.count : 0}
                </span>
              </button>
            </CartSheet>
          </div>
        </div>
      </header>
    </>
  );
}
