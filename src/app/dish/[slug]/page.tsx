import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, Flame, Leaf, Wheat } from "lucide-react";
import {
  categories,
  dishes,
  getDish,
} from "@/lib/menu";
import { getDishBySlug, listMenu } from "@/lib/server/store";
import { AddToCart } from "@/components/site/add-to-cart";
import { DishCard } from "@/components/site/dish-card";
import { DrinkArt } from "@/components/site/drink-art";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { egp } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = (await getDishBySlug(slug)) ?? getDish(slug);
  if (!dish) return { title: "طبق غير موجود" };
  return {
    title: dish.nameAr,
    description: dish.shortAr,
    openGraph: {
      title: `${dish.nameAr} · أكله بمزاج`,
      description: dish.shortAr,
      images: dish.image ? [{ url: dish.image }] : undefined,
    },
  };
}

export default async function DishPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  // Live menu: base dishes + anything the admin added (DB-ready data layer).
  const dish = (await getDishBySlug(slug)) ?? getDish(slug);
  if (!dish) notFound();

  const menu = await listMenu();
  const category = categories.find((c) => c.id === dish.category);
  const related = dish.pairsWith
    .map((id) => menu.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameAr,
    description: dish.longAr,
    image: dish.image,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
    },
    suitableForDiet:
      dish.tags.includes("veg")
        ? "https://schema.org/VegetarianDiet"
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="shell pt-6">
        <nav
          aria-label="مسار التنقل"
          className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-soft"
        >
          <Link href="/menu" className="hover:text-ink">
            المنيو
          </Link>
          <ChevronLeft className="size-3" />
          {category && (
            <>
              <Link href={`/menu/${category.id}`} className="hover:text-ink">
                {category.label}
              </Link>
              <ChevronLeft className="size-3" />
            </>
          )}
          <span className="text-ink">{dish.nameAr}</span>
        </nav>
      </div>

      <section className="shell grid gap-10 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-12">
        <div className="relative aspect-[5/4] w-full min-w-0 bg-sand">
          {dish.image ? (
            <Image
              src={dish.image}
              alt={dish.nameAr}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          ) : (
            <DrinkArt slug={dish.slug} nameEn={dish.nameEn} />
          )}
          <span className="absolute bottom-3 start-3 bg-cream/95 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em]">
            {category?.counter}
          </span>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            {dish.tags.includes("bestseller") && (
              <span className="bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cream">
                الأكثر طلبًا
              </span>
            )}
            {dish.tags.includes("new") && (
              <span className="bg-olive px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cream">
                جديد
              </span>
            )}
            {dish.tags.includes("veg") && (
              <span className="flex items-center gap-1 border border-olive/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-olive">
                <Leaf className="size-2.5" /> نباتي
              </span>
            )}
          </div>

          <h1 className="mt-4 text-h1">
            {dish.nameAr}
          </h1>
          <p className="mt-1 font-serif text-[15px] italic text-ink-soft">
            {dish.nameEn}
          </p>

          <p className="mt-5 max-w-[48ch] text-[14.5px] leading-[1.9] text-ink-soft">
            {dish.longAr}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-3.5 text-[12px]">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-ember" />
              {dish.prepMin} دقيقة
            </span>
            {dish.kcal && (
              <span className="num flex items-center gap-1.5">
                {dish.kcal} كالوري
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Flame className="size-3.5 text-ember" />
              {dish.spice === 0 ? "مش حار" : `حرارة ${dish.spice}/3`}
            </span>
            {dish.allergens.length > 0 && (
              <span className="flex items-center gap-1.5 text-ink-soft">
                <Wheat className="size-3.5" />
                {dish.allergens.join(" · ")}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
            <p className="num text-2xl">{egp(dish.price)}</p>
            <p className="whitespace-nowrap text-[11px] text-ink-soft">شامل الضريبة</p>
          </div>

          <div className="mt-4">
            <AddToCart dish={dish} />
          </div>

          <Accordion type="single" collapsible className="mt-6 border-t border-line">
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-[13px]">المكونات</AccordionTrigger>
              <AccordionContent>
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  {dish.ingredients.join(" · ")}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="allergens">
              <AccordionTrigger className="text-[13px]">الحساسية</AccordionTrigger>
              <AccordionContent>
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  {dish.allergens.length
                    ? `بيحتوي على: ${dish.allergens.join(" · ")}. المطبخ بيتعامل مع مكسرات وسمسم، فمفيش ضمان خالي تمامًا من التلوث.`
                    : "مفيش مسببات حساسية معروفة في الصنف ده، لكن المطبخ بيتعامل مع مكسرات وسمسم وجلوتين."}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger className="text-[13px]">
                التوصيل والدفع
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  التوصيل من ٣٠ لـ ٧٥ ج.م حسب المنطقة، ومجاني فوق ٤٠٠ ج.م. الدفع
                  كاش للمندوب عند التسليم — مفيش أي رسوم إضافية على الدفع عند
                  الاستلام.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="change">
              <AccordionTrigger className="text-[13px]">
                لو الطلب وصل ناقص
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  كلّمنا على واتساب خلال ساعة من التسليم وهنبعته تاني أو نرجّع
                  قيمته. بنصوّر كل طلب قبل ما يقفل، فالموضوع بياخد دقيقتين.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {related.length > 0 && (
        <section className="shell border-t border-line py-14">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-xl">بيتقدم مع</h2>
            <Link
              href="/menu"
              className="text-[12px] text-ink-soft underline-offset-4 hover:underline"
            >
              المنيو كامل
            </Link>
          </div>
          <div
            className={
              related.length >= 3
                ? "mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                : "mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2"
            }
          >
            {related.slice(0, 3).map((item) => (
              <DishCard key={item.id} dish={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
