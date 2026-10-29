import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { SectionHeading } from "@/components/site/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "المطبخ",
  description:
    "أكله بمزاج: مطبخ توصيل في المهندسين فيه تلات محطات — منقل، بخار، وكوشة. بنطبخ بعد الطلب ومفيش فريزر.",
};

const numbers = [
  { value: "٣", label: "محطات طبخ" },
  { value: "١٩", label: "صنف في المنيو" },
  { value: "٣٥", label: "دقيقة متوسط التوصيل" },
  { value: "١٤", label: "ساعة المطبخ شغال" },
];

const chapters = [
  {
    n: "٠١",
    title: "بدأنا بمنقل واحد.",
    body: "في ٢٠٢٤، مطبخ ٢٥ متر في المهندسين، منقل فحم وشباك واحد. كنا بنعمل برجر واحد وبنبيعه لحد ما يخلص اللحم. الفكرة كانت بسيطة: حاجة واحدة تتعمل صح، بدل عشرين حاجة نص نص.",
  },
  {
    n: "٠٢",
    title: "بعدها دخل البخار.",
    body: "الدامبلنغ محتاج عجين رقيق وصبر. جبنا سلال بخار وبدأنا نعمل ٤٠ حبة في اليوم. دلوقتي بنعملها بنفس الطريقة، بس على نار أنضف ومطبخ أكبر شوية. الرامن جه بعدها، لأنه كان بيتبهدل في التوصيل — لحد ما لقينا طريقة نفصله.",
  },
  {
    n: "٠٣",
    title: "والكوشة قفلت الدايرة.",
    body: "العجين محتاج ٢٤ ساعة في التلاجة، ومحتاج فرن بيوصل ٣٠٠ درجة. الكوشة كانت آخر حاجة دخلت، وأصعب حاجة نضبطها. لسه بنعدّل فيها كل شهر.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="عن أكله بمزاج"
        title="مطبخ صغير، تلات نارات، وقرار واحد: نطبخ بعد ما تطلب."
        note="مفيش فريزر كبير، ومفيش أكل بيتسخن. الطلب بيدخل المطبخ على شاشة، وبيتطبخ مرة واحدة. ده بيخلّي الشغل أصعب، بس الأكل بيوصل مختلف."
        meta={`${site.addressShort} · من ٢٠٢٤`}
      />

      <div className="shell py-10">
        <div className="relative aspect-[16/9] w-full bg-sand lg:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80"
            alt="جوّه مطبخ أكله بمزاج"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 start-3 bg-cream/95 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em]">
            المطبخ · المهندسين
          </span>
        </div>
      </div>

      <section className="border-y border-line bg-sand/40">
        <div className="shell grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {numbers.map((item) => (
            <div key={item.label}>
              <p className="num text-h2 leading-none">
                {item.value}
              </p>
              <p className="mt-2 text-[11.5px] text-ink-soft">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow">القصة</p>
            <h2 className="mt-4 text-h2">
              كل حاجة بدأت لأننا مللنا الأكل اللي بيتعمل قبل ما نطلبه.
            </h2>
            <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.9] text-ink-soft">
              ده مش شعار. ده السبب إن المنيو صغير، وإن أصناف بتخلص بدرى، وإن
              أحيانًا بنقفل الطلبات قبل الساعة ٢. لو بنطبخ كل حاجة على الطلب،
              مفيش طريقة تانية.
            </p>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter) => (
              <article key={chapter.n} className="border-t border-ink/15 pt-5">
                <p className="num text-[10.5px] text-ember">{chapter.n}</p>
                <h3 className="mt-2 font-display text-lg">{chapter.title}</h3>
                <p className="mt-2 max-w-[52ch] text-[13.5px] leading-[1.9] text-ink-soft">
                  {chapter.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="إزاي بنشتغل"
            title="تلات قواعد مش بنكسرها."
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              {
                title: "بنشتري قليل، كل يومين.",
                body: "اللحم والخضار بيوصلوا الصبح. لو حاجة خلصت، بتخلص — مش بنستلف من مكان تاني.",
              },
              {
                title: "المطبخ بيقفل، الأكل مايباتش.",
                body: "آخر أوردر الساعة ١ ونص. أي حاجة متطبخة زيادة بتتوزع على الفريق، مش بتتحفظ لبكرة.",
              },
              {
                title: "الشكوى بتتحل في نفس اليوم.",
                body: "لو حاجة وصلت غلط، بنبعت بدالها أو نرجّع فلوسها. مفيش نموذج طويل ولا انتظار.",
              },
            ].map((rule) => (
              <div key={rule.title} className="border-t border-ink/15 pt-5">
                <h3 className="font-display text-[16px]">{rule.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {rule.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 border border-line bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-display text-xl">عايز تسأل حاجة قبل ما تطلب؟</h2>
            <p className="mt-1.5 text-[13px] text-ink-soft">
              بنرد على واتساب في أقل من ٥ دقايق أثناء ساعات العمل.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${site.phone}`}
              className="inline-flex h-11 items-center gap-2 bg-ember px-5 text-[12.5px] font-medium text-white hover:bg-ember-deep"
            >
              واتساب
              <ArrowUpRight className="size-3.5" />
            </a>
            <Link
              href="/menu"
              className="inline-flex h-11 items-center gap-2 border border-ink px-5 text-[12.5px] font-medium hover:bg-ink hover:text-cream"
            >
              المنيو
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
