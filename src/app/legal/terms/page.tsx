import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { LegalList, LegalNote, LegalSection } from "@/components/site/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description:
    "شروط استخدام موقع أكله بمزاج: الطلبات، الأسعار، الدفع عند الاستلام، الإلغاء، والمسؤولية.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="قانوني"
        title="شروط الاستخدام."
        note="الشروط دي بتطبّق على أي طلب بيتعمل من الموقع أو من واتساب. مكتوبة بلغة واضحة، من غير حشو."
        meta="آخر تحديث · ١ مارس ٢٠٢٦"
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="محتويات الصفحة" className="space-y-2">
            {[
              ["01", "مين إحنا"],
              ["02", "الطلب والقبول"],
              ["03", "الأسعار والدفع"],
              ["04", "التوصيل"],
              ["05", "الإلغاء والاسترجاع"],
              ["06", "الحساسية والغذاء"],
              ["07", "الملكية الفكرية"],
              ["08", "تعديل الشروط"],
            ].map(([n, label]) => (
              <p
                key={n}
                className="flex items-baseline gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft"
              >
                <span className="text-ember">{n}</span>
                {label}
              </p>
            ))}
          </nav>

          <div className="mt-6 border border-line p-4 text-[11.5px] leading-relaxed text-ink-soft">
            محتاج توضيح في نقطة معينة؟{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </aside>

        <div className="space-y-8">
          <LegalSection n="01" title="مين إحنا">
            <p>
              الموقع ده بيخص مطبخ <span className="text-ink">أكله بمزاج</span>{" "}
              (Mazag Kitchen)، ومقره {site.address}. إحنا مطبخ توصيل، مش مطعم
              بفروع — كل الطلبات بتتطبخ في مكان واحد وبعدها بتتحرك.
            </p>
            <p>
              باستخدامك للموقع أو إرسال طلب، إنت موافق على الشروط دي. لو مش
              موافق على أي جزء منها، من فضلك متكملش الطلب.
            </p>
          </LegalSection>

          <LegalSection n="02" title="الطلب والقبول">
            <p>
              الطلب اللي بيتبعت من الموقع هو <span className="text-ink">عرض</span>{" "}
              منك، مش قبول نهائي. القبول بيحصل لما المطبخ يفتح الطلب ويأكد عبر
              واتساب أو مكالمة.
            </p>
            <LegalList
              items={[
                "بنحتفظ بالحق في رفض أو إلغاء أي طلب لو الصنف خلص، أو لو العنوان بره نطاق التوصيل، أو لو فيه شك في صحة البيانات.",
                "لو رفضنا الطلب، مش هتدفع أي حاجة، ولو دفعت — بيترجّع كامل.",
                "رقم الطلب اللي بيظهر بعد التأكيد هو المرجع الوحيد في أي استفسار.",
              ]}
            />
            <LegalNote>
              الحد الأدنى للطلب {site.minOrder} ج.م. الطلبات الأقل من كده مش
              هتتقبل من الموقع.
            </LegalNote>
          </LegalSection>

          <LegalSection n="03" title="الأسعار والدفع">
            <p>
              كل الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة. سعر الشحن
              بيتحدد حسب المنطقة، وبيظهر قبل تأكيد الطلب — مفيش رسوم مخفية.
            </p>
            <ul className="space-y-2 pt-1">
              <li>
                <span className="text-ink">الدفع:</span> كاش عند الاستلام فقط. مفيش
                دفع أونلاين، ومفيش بطاقات.
              </li>
              <li>
                <span className="text-ink">الشحن:</span> مجاني للطلبات فوق{" "}
                {site.freeDeliveryFrom} ج.م بعد الخصم.
              </li>
              <li>
                <span className="text-ink">الأسعار:</span> بنحاول نحدّثها فورًا،
                لكن لو حصل خطأ واضح في سعر صنف، بنبلّغك قبل ما نبدأ الطبخ وتقدر
                تلغي من غير أي التزام.
              </li>
            </ul>
          </LegalSection>

          <LegalSection n="04" title="التوصيل">
            <p>
              بنوصّل لكل القاهرة الكبرى. أوقات التسليم المكتوبة تقديرية وبتتأثر
              بالزحمة والطقس وحجم الطلبات، ومش بنقدر نضمن وقت محدد بالدقيقة.
            </p>
            <p>
              الطيار بيتصل قبل الوصول بـ ٥ دقايق. لو الرقم مش متاح أو مفيش حد
              استلم، الطلب بيستنى ١٠ دقايق وبعدها بيرجع المطبخ، وبيتحسب عليه
              قيمة الشحن.
            </p>
            <LegalNote>
              تفاصيل المناطق والرسوم موجودة في{" "}
              <Link href="/shipping" className="text-ink underline underline-offset-4">
                صفحة التوصيل والدفع
              </Link>
              .
            </LegalNote>
          </LegalSection>

          <LegalSection n="05" title="الإلغاء والاسترجاع">
            <p>
              الأكل بيتطبخ بعد الطلب، فمفيش استرجاع بعد التسليم إلا في حالات
              الخطأ. القواعد:
            </p>
            <LegalList
              items={[
                "قبل ما المطبخ يبدأ: إلغاء كامل من غير أي رسوم.",
                "بعد ما الطبخ يبدأ: تقدر تلغي الأصناف اللي لسه ماتعملتش بس.",
                "صنف ناقص أو غلط: بنبعته تاني أو نرجّع قيمته كاش — خلال ساعة من التسليم.",
                "طلب وصل بارد بسبب التغليف أو الطريق: بنعيده على حسابنا.",
              ]}
            />
            <p>
              الشكاوى بتتفتح على واتساب{" "}
              <span className="tel">{site.phoneDisplay}</span> أو{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>{" "}
              وبتتحل في نفس اليوم.
            </p>
          </LegalSection>

          <LegalSection n="06" title="الحساسية والغذاء">
            <p>
              كل صفحة صنف مكتوب فيها مسببات الحساسية المعروفة. لكن المطبخ بيتعامل
              مع جلوتين، ألبان، بيض، سمسم، صويا، ومكسرات في نفس المساحة، فمفيش
              ضمان خالي تمامًا من التلوث المتبادل.
            </p>
            <p>
              لو عندك حساسية شديدة، كلّمنا قبل الطلب عشان نقولك بالظبط إيه اللي
              ممكن نعمله. القرار النهائي في الطلب مسؤوليتك.
            </p>
          </LegalSection>

          <LegalSection n="07" title="الملكية الفكرية">
            <p>
              الاسم، الشعار، النصوص، الصور، وتصميم الموقع ملك أكله بمزاج. ممنوع
              نسخهم أو استخدامهم في أي نشاط تجاري من غير إذن مكتوب. الاستخدام
              الشخصي (زي مشاركة رابط صنف) مسموح طبعًا.
            </p>
          </LegalSection>

          <LegalSection n="08" title="تعديل الشروط">
            <p>
              ممكن نعدّل الشروط دي في أي وقت. النسخة السارية هي اللي منشورة على
              الصفحة دي، والتاريخ فوق بيتحدّث مع كل تعديل. الطلبات اللي اتعملت قبل
              التعديل بتمشي على الشروط اللي كانت سارية وقتها.
            </p>
            <p className="pt-2 text-[12px] text-ink-soft">
              أي نزاع بيتحكّم فيه القانون المصري، ومحاكم الجيزة هي المختصة.
            </p>
          </LegalSection>

          <div className="border-t border-line pt-6 text-[12.5px] text-ink-soft">
            <Link href="/legal/privacy" className="link-u font-medium text-ink">
              اقرأ سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
