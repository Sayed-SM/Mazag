import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "المنيو",
    links: [
      { href: "/menu/grill", label: "المنقل" },
      { href: "/menu/steam", label: "البخار" },
      { href: "/menu/oven", label: "الكوشة" },
      { href: "/menu/sides", label: "على الجنب" },
      { href: "/menu/dessert", label: "حلو" },
    ],
  },
  {
    title: "مساعدة",
    links: [
      { href: "/faq", label: "أسئلة متكررة" },
      { href: "/shipping", label: "التوصيل والدفع" },
      { href: "/track", label: "تتبّع طلبك" },
      { href: "/contact", label: "كلّمنا" },
    ],
  },
  {
    title: "المطبخ",
    links: [
      { href: "/about", label: "عنّا" },
      { href: "/journal", label: "دفتر المطبخ" },
      { href: "/offers", label: "عروض الوجبات" },
    ],
  },
];

/* Rounded-top footer — pattern adapted from 21st "Rounded Top Footer" (footer-02, MIT),
   rethemed for MAZAG: ink surface, cream type, ember accents, RTL. */
export function SiteFooter() {
  return (
    <footer className="mt-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-t-[2.25rem] bg-ink text-cream lg:rounded-t-[3rem]">
        <div className="px-[clamp(1.25rem,4vw,3.5rem)]">
          <div className="grid gap-12 pb-14 pt-16 lg:grid-cols-[1.15fr_1.85fr] lg:gap-20 lg:pb-16 lg:pt-20">
            <div>
              <Link href="/" className="inline-flex flex-col leading-none">
                <span className="font-display text-[1.5rem] font-extrabold tracking-tight">
                  أكله بمزاج
                </span>
                <span className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.34em] text-saffron">
                  Mazag&nbsp;Kitchen
                </span>
              </Link>

              <p className="mt-8 max-w-[19ch] font-display text-h2 leading-[1.4]">
                بنطبخ على الطلب.
                <br />
                <span className="text-cream/40">مفيش تسخين.</span>
              </p>
              <p className="mt-4 max-w-[32ch] text-[13px] leading-[1.85] text-cream/55">
                مطبخ توصيل في المهندسين. منقل، بخار، وكوشة — تحت سقف واحد.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${site.phone}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-5 text-[12.5px] font-medium text-white transition-colors hover:bg-cream hover:text-ink"
                >
                  اطلب على واتساب
                  <ArrowLeft className="size-3.5" />
                </a>
                <a
                  href={`tel:+${site.phone}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/25 px-5 text-[12.5px] text-cream/85 transition-colors hover:border-cream hover:text-cream"
                >
                  <Phone className="size-3.5 text-saffron" />
                  <span className="tel">{site.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {columns.map((col, index) => (
                <div key={col.title}>
                  <p className="flex items-baseline gap-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-cream/35">
                    <span className="text-saffron/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {col.title}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-[13.5px] text-cream/70 transition-colors hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 rounded-2xl bg-white/[0.04] px-6 py-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-saffron" />
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35">
                  المطبخ
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-cream/70">
                  {site.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-saffron" />
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35">
                  المواعيد
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-cream/70">
                  {site.hours}
                </p>
              </div>
            </div>
            <a href={`mailto:${site.email}`} className="group flex items-start gap-3">
              <Mail className="mt-0.5 size-3.5 shrink-0 text-saffron" />
              <span className="min-w-0">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35">
                  البريد
                </span>
                <span className="mt-1 block text-[12.5px] text-cream/70 group-hover:text-cream">
                  {site.email}
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10">
          <div className="px-[clamp(1.25rem,4vw,3.5rem)] pb-8 pt-6">
            <div className="flex flex-col gap-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 MAZAG — كل الحقوق محفوظة</p>
              <div className="flex flex-wrap items-center gap-5">
                <span className="text-cream/55">الدفع عند الاستلام</span>
                <Link href="/legal/terms" className="transition-colors hover:text-cream">
                  الشروط
                </Link>
                <Link href="/legal/privacy" className="transition-colors hover:text-cream">
                  الخصوصية
                </Link>
                <a
                  href={site.social.instagram}
                  className="transition-colors hover:text-cream"
                  aria-label="إنستجرام"
                >
                  إنستجرام
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
