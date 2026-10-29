import Link from "next/link";
import { ArrowLeft, Flame, Home, UtensilsCrossed } from "lucide-react";
import { categories } from "@/lib/menu";
import { site } from "@/lib/site";

/**
 * 404 — a dead link on the menu.
 * Structure follows the 21st "Not Found 404" pattern (mono eyebrow → display
 * headline → paired CTAs → suggested routes), themed to the mazag brand.
 */
export default function NotFound() {
  const suggestions = categories.slice(0, 4);

  return (
    <div className="relative flex min-h-[78dvh] items-center overflow-hidden">
      {/* faint grid backdrop — same hairline language as the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to left, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="shell relative w-full py-16 sm:py-24">
        <div className="mx-auto max-w-[58ch] text-center">
          <p className="eyebrow flex items-center justify-center gap-2">
            <Flame className="size-3 text-ember" />
            خطأ ٤٠٤ · الصفحة مش على المنيو
          </p>

          <h1 className="mt-5 text-display">
            الصفحة دي طلعت من
            <br />
            <span className="text-ember">القايمة بالغلط.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[46ch] text-[14.5px] leading-[1.9] text-ink-soft">
            يمكن اللينك قديم، أو فيه غلطة صغيرة جواه. المطبخ شغّال زي ما هو —
            اختار قسم من اللي تحت وكمّل.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ember px-7 text-[13.5px] font-medium text-white transition-colors hover:bg-ember-deep"
            >
              <UtensilsCrossed className="size-4" />
              ارجع للمنيو
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5 rtl:group-hover:-rotate-0" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 px-7 text-[13.5px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              <Home className="size-4" />
              الرئيسية
            </Link>
          </div>
        </div>

        {/* suggested routes — the four counters */}
        <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-4">
          {suggestions.map((cat, index) => (
            <li key={cat.id}>
              <Link
                href={`/menu/${cat.id}`}
                className="group flex h-full flex-col items-start rounded-2xl border border-line bg-paper/60 p-4 text-start transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                <span className="num font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft transition-colors group-hover:text-saffron">
                  {cat.counter}
                </span>
                <span className="mt-2 flex items-center gap-1.5 font-display text-[15px] font-bold">
                  {cat.label}
                  <ArrowLeft className="size-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
          أو كلّمنا على{" "}
          <a
            href={`tel:+${site.phone}`}
            className="link-u text-ink"
            dir="ltr"
          >
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}
