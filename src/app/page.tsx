import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { FloatingFoodHero } from "@/components/ui/hero-section-7";
import { DishCard } from "@/components/site/dish-card";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceRibbon } from "@/components/site/service-ribbon";
import { menuCounts, featured } from "@/lib/menu";
import { combos } from "@/lib/offers";
import { site } from "@/lib/site";
import { egp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "أكله بمزاج — تلات مناقل. مطبخ واحد.",
  description:
    "برجر على الفحم، دامبلنغ على البخار، وبيتزا من الكوشة. مطبخ توصيل في المهندسين، بنطبخ بعد ما تطلب، والدفع عند الاستلام.",
};

const heroImages = [
  {
    src: `/hero/burger.webp`,
    alt: "برجر لحم مزدوج",
    className:
      "w-36 sm:w-48 lg:w-64 top-6 left-3 sm:left-10 lg:top-16 lg:left-20 animate-float [--float-rot:5deg]",
  },
  {
    src: `/hero/dumplings.webp`,
    alt: "سلة دامبلنغ على البخار",
    className:
      "w-24 sm:w-36 lg:w-44 top-4 right-2 sm:right-10 lg:top-12 lg:right-16 animate-float [--float-rot:-4deg]",
  },
  {
    src: `/hero/pizza.webp`,
    alt: "قطعة بيتزا",
    className:
      "hidden sm:block w-28 sm:w-40 lg:w-56 bottom-8 right-6 lg:bottom-16 lg:right-24 animate-float [--float-rot:-9deg]",
  },
  {
    src: `/hero/basil.webp`,
    alt: "ورقة ريحان",
    className:
      "hidden sm:block w-9 sm:w-12 top-1/3 left-1/4 animate-float [--float-rot:14deg]",
  },
  {
    src: `/hero/tomato.webp`,
    alt: "شريحة طماطم",
    className:
      "hidden md:block w-9 bottom-1/3 right-1/4 animate-float [--float-rot:-6deg]",
  },
  {
    src: `/hero/tomato.webp`,
    alt: "شريحة طماطم",
    className:
      "hidden lg:block w-8 bottom-24 left-16 animate-float [--float-rot:22deg]",
  },
];

const steps = [
  {
    n: "01",
    title: "اختار من المنيو",
    body: "كل صنف مكتوب فيه الوزن، الحرارة، والوقت اللي بياخده. مفيش صور مبالغ فيها.",
  },
  {
    n: "02",
    title: "بنطبخ على الطلب",
    body: "الطلب بيدخل المطبخ على شاشة، بيتطبخ مرة واحدة، وبيتغلف وهو لسه سخن.",
  },
  {
    n: "03",
    title: "بيوصلك سخن",
    body: "الطيار بياخد شنطة حرارية، وبيتصل بك قبل ما يوصل. بتدفع كاش عند الباب.",
  },
];

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/hero/burger.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <div className="hero-mazag">
        <FloatingFoodHero
          title="كل ودماغك رايقة."
          images={heroImages}
          className="min-h-[62vh] lg:min-h-[78vh] [&_h1]:text-display"
        >
          <Link
            href="/menu"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ember ps-6 pe-5 text-[13.5px] font-medium text-white shadow-[0_14px_30px_-14px_rgba(190,63,38,0.65)] transition-all duration-300 hover:bg-ember-deep hover:shadow-[0_18px_36px_-14px_rgba(141,44,24,0.6)]"
          >
            اطلب من المنيو
            <span className="flex size-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:-translate-x-0.5">
              <ArrowLeft className="size-3.5" />
            </span>
          </Link>
          <Link
            href="/offers"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-cream/60 px-6 text-[13.5px] font-medium text-ink backdrop-blur-md transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream"
          >
            عروض الأسبوع
          </Link>
        </FloatingFoodHero>
      </div>

      {/* service ribbon */}
      <ServiceRibbon />

      {/* counters */}
      <section className="shell py-section">
        <SectionHeading
          eyebrow="المنيو · DROP ٠١"
          title={
            <>
              تلات مناقل.
              <br />
              كل واحد ليه شغله.
            </>
          }
          note="المنقل للحم والفراخ، البخار للدامبلنغ والرامن، والكوشة للعجين. بنفصلهم عشان كل حاجة تتعمل صح، مش عشان الشكل."
          href="/menu"
          linkLabel="المنيو كامل"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuCounts.slice(0, 3).map((cat) => (
            <Link key={cat.id} href={`/menu/${cat.id}`} className="group">
              <div className="rounded-t-full border border-line/80 bg-sand p-2 transition-colors duration-300 group-hover:border-ink/25">
                <div className="plate relative aspect-[4/5] w-full overflow-hidden rounded-t-full">
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute bottom-4 end-4 bg-cream/95 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink">
                    {cat.count} أطباق
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl group-hover:text-ember">
                    {cat.label}
                  </h3>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
                    {cat.counter}
                  </span>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:text-ember" />
              </div>
              <p className="mt-2 max-w-[38ch] text-[13px] leading-relaxed text-ink-soft">
                {cat.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* bestsellers */}
      <section className="border-t border-line bg-paper">
        <div className="shell py-section">
          <SectionHeading
            eyebrow="الأكثر طلبًا"
            title="حاجات الناس بترجع لها."
            href="/menu"
            linkLabel="شوف كل الأطباق"
          />
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} preload={index < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* editorial band */}
      <section className="bg-ink text-cream">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-[clamp(1.25rem,4vw,3rem)] py-16 lg:order-1 lg:py-24 lg:ps-[max(1.25rem,calc((100vw-1440px)/2+3rem))]">
            <p className="eyebrow !text-cream/45">المطبخ</p>
            <h2 className="mt-4 text-h1">
              من ١٢ الضهر
              <br />
              لـ ٢ بعد منتصف الليل.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[14.5px] leading-[1.9] text-cream/70">
              مطبخ واحد في المهندسين، فيه تلات محطات. بنجهّز الطلب بعد ما يوصل،
              وبنقفل الكوشة الساعة ١ ونص عشان ننضّف. لو جيت متأخر، الريش غالبًا
              بتخلص الأول.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-2 bg-cream px-5 text-[13px] font-medium text-ink transition-colors hover:bg-saffron"
              >
                جوّه المطبخ
                <ArrowLeft className="size-4" />
              </Link>
              <a
                href={`https://wa.me/${site.phone}`}
                className="link-u text-[13px] text-cream/80 hover:text-cream"
              >
                اسأل قبل ما تطلب
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
          <div className="relative order-1 min-h-[300px] lg:order-2 lg:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80"
              alt="جوّه مطبخ أكله بمزاج"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="shell py-section">
        <SectionHeading
          eyebrow="إزاي بيوصلك"
          title="تلات خطوات، ومن غير مفاجآت."
          note={`الحد الأدنى للطلب ${site.minOrder} ج.م. الشحن مجاني فوق ${site.freeDeliveryFrom} ج.م.`}
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="border-t border-ink/20 pt-5">
              <p className="num text-[11px] text-ember">{step.n}</p>
              <h3 className="mt-3 font-display text-lg">{step.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* combos */}
      <section className="border-y border-line bg-sand/40">
        <div className="shell py-section">
          <SectionHeading
            eyebrow="عروض الوجبات"
            title="الأصناف بتتجمّع… والحساب بيبقى أرحم."
            href="/offers"
            linkLabel="كل العروض"
          />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {combos.map((combo) => (
              <div
                key={combo.name}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg">{combo.name}</h3>
                    <span className="border border-olive/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-olive">
                      {combo.note}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-ink-soft">{combo.items}</p>
                </div>
                <div className="flex items-center gap-4 sm:justify-end">
                  <div className="text-end">
                    <p className="num text-lg">{egp(combo.price)}</p>
                    <p className="num text-[11px] text-ink-soft line-through">
                      {egp(combo.was)}
                    </p>
                  </div>
                  <Link
                    href="/offers"
                    className="inline-flex h-10 items-center gap-2 border border-ink px-4 text-[12.5px] font-medium transition-colors hover:bg-ink hover:text-cream"
                  >
                    اطلب
                    <ArrowLeft className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* journal */}
      <section className="shell py-section">
        <SectionHeading
          eyebrow="دفتر المطبخ"
          title="حاجات بنكتبها عشان نفضل فاكرينها."
          href="/journal"
          linkLabel="كل المقالات"
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {[
            {
              href: "/journal/rest-the-meat",
              date: "١٢ مارس ٢٠٢٦",
              title: "ليه بنسيب اللحمة تستريح دقيقتين؟",
              excerpt:
                "لو قطعت البرجر على طول، العصارة كلها هتطلع على الطبق. الحكاية كلها في الحرارة.",
              time: "٤ دقايق قراية",
            },
            {
              href: "/journal/dough-24-hours",
              date: "٢٨ فبراير ٢٠٢٦",
              title: "العجين: ٢٤ ساعة في التلاجة، وبعدين ٣٠٠ درجة.",
              excerpt:
                "التخمير البطيء مش رفاهية. هو الفرق بين قاعدة طرية وقاعدة مقرمشة من برّه.",
              time: "٦ دقايق قراية",
            },
          ].map((post) => (
            <Link key={post.href} href={post.href} className="group border-t border-ink/20 pt-5">
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                <span>{post.date}</span>
                <span className="size-1 rounded-full bg-ember" />
                <span>{post.time}</span>
              </p>
              <h3 className="mt-4 font-display text-h3 group-hover:text-ember">
                {post.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
