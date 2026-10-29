import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "أسئلة متكررة",
  description:
    "التوصيل، الدفع عند الاستلام، الحد الأدنى، الحساسية، والإلغاء — كل الأسئلة اللي بتتكرر.",
};

const faqs = [
  {
    q: "التوصيل بياخد وقت قد إيه؟",
    a: "من ٣٠ لـ ٤٠ دقيقة في المهندسين والزمالك، ومن ٤٥ لـ ٦٠ دقيقة في باقي القاهرة الكبرى. الأرقام دي وقت الذروة؛ بره الذروة بنكون أسرع. بنبعتلك رسالة واتساب لما الطيار يتحرك.",
  },
  {
    q: "الدفع إزاي؟",
    a: "كاش عند الاستلام بس. مفيش دفع أونلاين ومفيش فيزا. بتدفع للمندوب لما يوصلك، والمبلغ مكتوب في صفحة تأكيد الطلب. لو محتاج فكة، اكتبها في الملاحظات.",
  },
  {
    q: "في حد أدنى للطلب؟",
    a: `آه، ${site.minOrder} ج.م. الشحن مجاني فوق ${site.freeDeliveryFrom} ج.م، وأقل من كده بيتحسب حسب المنطقة (٣٠–٧٥ ج.م).`,
  },
  {
    q: "ممكن ألغي الطلب؟",
    a: "لو المطبخ لسه مابدأش، بنلغي فورًا. بعد ما الطبخ يبدأ، بنقدر نلغي الأصناف اللي لسه ماتعملتش بس. كلّمنا على واتساب وهنقولك الحالة بالظبط.",
  },
  {
    q: "الأكل حار؟",
    a: "كل صنف مكتوب فيه مستوى الحرارة من ٠ لـ ٣. ٠ يعني مش حار خالص، و٣ يعني حار بجد. الصوصات الحارة دايمًا على الجنب، إلا لو طلبت غير كده.",
  },
  {
    q: "في خيارات نباتية؟",
    a: "آه: بيتزا مارغريتا، فوكاتشيا، حمص، سلطات، رامن خضار، وتشيز كيك. الأصناف النباتية متعلّمة في المنيو، ومكتوب في كل صفحة إذا كانت بتلمس لحوم على نفس المنقل.",
  },
  {
    q: "بتوصلوا فين؟",
    a: "المهندسين، الزمالك، العجوزة، الدقي، الجيزة، وسط البلد، مدينة نصر، مصر الجديدة، المعادي، شبرا، المقطم، ٦ أكتوبر، الشيخ زايد، القاهرة الجديدة، وحلوان. لو منطقتك مش في القايمة، كلّمنا وهنشوف.",
  },
  {
    q: "إزاي بتحافظوا على سخونة الأكل؟",
    a: "شنطة حرارية للطيار، وعلب بفتحات تهوية للبرجر والبيتزا عشان ماتعملش بخار. الرامن بيتشحن والشوربة منفصلة. الغرض إن الأكل يوصل زي ما خرج من المطبخ، مش إنه يفضل سخن بالمعنى الحرفي.",
  },
  {
    q: "لو الطلب وصل ناقص أو غلط؟",
    a: "كلّمنا على واتساب خلال ساعة من التسليم. بنبعت الناقص فورًا أو نرجّع قيمته. بنصوّر كل طلب قبل ما يتقفل، فبنقدر نراجع بسرعة.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="أسئلة"
        title="الحاجات اللي بتتسأل كل يوم."
        note="لو سؤالك مش هنا، كلّمنا على واتساب — بنرد في أقل من ٥ دقايق أثناء العمل."
      />

      <div className="shell grid gap-12 py-12 lg:grid-cols-[1fr_300px]">
        <Accordion type="single" collapsible className="border-t border-line">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-start text-[14.5px] font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="max-w-[64ch] pb-2 text-[13.5px] leading-[1.9] text-ink-soft">
                  {faq.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <aside className="space-y-4">
          <div className="border border-line bg-paper p-5">
            <p className="font-display text-[15px]">لسه محتاج مساعدة؟</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
              واتساب أسرع وسيلة. بنرد من المطبخ نفسه، مش من كول سنتر.
            </p>
            <a
              href={`https://wa.me/${site.phone}`}
              className="mt-3 flex h-10 items-center justify-center bg-ember text-[12.5px] font-medium text-white hover:bg-ember-deep"
            >
              كلّمنا على واتساب
            </a>
            <a
              href={`tel:+${site.phone}`}
              className="mt-2 flex h-10 items-center justify-center border border-ink text-[12.5px] hover:bg-ink hover:text-cream"
            >
              <span className="tel">{site.phoneDisplay}</span>
            </a>
          </div>

          <div className="border border-line p-5 text-[12px] leading-relaxed text-ink-soft">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em]">
              ساعات العمل
            </p>
            <p className="mt-2 text-ink">{site.hours}</p>
            <p className="mt-2">
              آخر أوردر ١:١٥ ص. المطبخ بيقفل ٢ ص.
            </p>
          </div>

          <Link
            href="/shipping"
            className="block border border-line p-5 text-[12.5px] transition-colors hover:border-ink"
          >
            تفاصيل التوصيل والاسترجاع
            <span className="mt-2 block font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
              صفحة كاملة ←
            </span>
          </Link>
        </aside>
      </div>
    </>
  );
}
