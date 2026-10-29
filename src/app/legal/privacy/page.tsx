import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { LegalList, LegalNote, LegalSection } from "@/components/site/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "إيه البيانات اللي بنجمعها في أكله بمزاج، ليه، وفين بتتحفظ، وإزاي تقدر تطلب حذفها.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="قانوني"
        title="سياسة الخصوصية."
        note="بنجمع أقل قدر ممكن من البيانات عشان نوصّل الطلب. مفيش بيع بيانات، ومفيش إعلانات موجهة، ومفيش تتبّع بين المواقع."
        meta="آخر تحديث · ١ مارس ٢٠٢٦"
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="محتويات الصفحة" className="space-y-2">
            {[
              ["01", "اللي بنجمعه"],
              ["02", "ليه بنجمعه"],
              ["03", "التخزين المحلي"],
              ["04", "مين بيشوف البيانات"],
              ["05", "مدة الاحتفاظ"],
              ["06", "حقوقك"],
              ["07", "الأطفال"],
              ["08", "التواصل"],
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
            عايز بياناتك تتمسح؟ ابعت «حذف بياناتي» على{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </div>
        </aside>

        <div className="space-y-8">
          <LegalSection n="01" title="اللي بنجمعه">
            <p>عند الطلب، بنجمع الحاجات دي بس:</p>
            <LegalList
              items={[
                "الاسم اللي بتكتبه، ورقم الموبايل.",
                "العنوان بالتفصيل، المنطقة، وأي علامة مميزة تكتبها.",
                "الأصناف اللي طلبتها، المبالغ، وطريقة الدفع (كاش).",
                "ملاحظات المطبخ اللي بتكتبها بنفسك.",
              ]}
            />
            <p className="pt-1">
              مش بنجمع: بيانات بطاقات، رقم قومي، تاريخ ميلاد، أو أي بيانات حساسة.
              مفيش تسجيل حساب ولا كلمة سر على الموقع.
            </p>
          </LegalSection>

          <LegalSection n="02" title="ليه بنجمعه">
            <ul className="space-y-2">
              <li>
                <span className="text-ink">تنفيذ الطلب:</span> المطبخ محتاج يعرف
                يعمل إيه، والطيار محتاج يعرف يروح فين.
              </li>
              <li>
                <span className="text-ink">التواصل:</span> لو في حاجة ناقصة أو
                تأخير، بنكلّمك على نفس الرقم.
              </li>
              <li>
                <span className="text-ink">المحاسبة:</span> مراجعة الشكاوى
                والاسترجاعات.
              </li>
            </ul>
            <p>
              مش بنستخدم بياناتك في تسويق من غير موافقتك. لو اشتركت في رسالة
              الخميس، تقدر تلغي الاشتراك من أي رسالة.
            </p>
          </LegalSection>

          <LegalSection n="03" title="التخزين المحلي">
            <p>
              السلة وآخر الطلبات بتتحفظ في{" "}
              <span className="text-ink">ذاكرة المتصفح</span> على جهازك
              (localStorage)، مش على سيرفر. ده اللي بيخلي السلة تفضل موجودة لما
              تقفل الصفحة وترجع.
            </p>
            <p>
              يعني لو فتحت الموقع من جهاز تاني، مش هتلاقي طلباتك القديمة. ولو
              مسحت بيانات المتصفح، بتتمسح معاها.
            </p>
            <LegalNote>
              السلة والطلبات المحلية مش بيتشاركوا مع أي طرف تالت، ومش بيتبعتوا
              لأي خادم تحليلات.
            </LegalNote>
          </LegalSection>

          <LegalSection n="04" title="مين بيشوف البيانات">
            <p>
              فريق المطبخ والطيار المسؤول عن طلبك — وبس. مش بنبيع ولا بنأجّر
              البيانات لأي حد.
            </p>
            <p>
              بنستخدم خدمات خارجية بشكل محدود: استضافة الموقع، وواتساب لما تختار
              تكلمنا عليه. الرسالة اللي بتبعتها على واتساب بتمشي على شروط واتساب
              نفسها.
            </p>
          </LegalSection>

          <LegalSection n="05" title="مدة الاحتفاظ">
            <p>
              سجلات الطلبات بتتحفظ لغرض المحاسبة ومراجعة الشكاوى. البيانات
              المحلية على جهازك بتفضل لحد ما تمسحها إنت.
            </p>
            <p>
              لو طلبت حذف بياناتك، بنمسح الاسم والرقم والعنوان من سجلاتنا، وبنحتفظ
              بأرقام الطلبات والمبالغ بشكل مجهول للمحاسبة بس.
            </p>
          </LegalSection>

          <LegalSection n="06" title="حقوقك">
            <LegalList
              items={[
                "تعرف إيه البيانات اللي محفوظة عنك — بنبعتلك نسخة على نفس رقم الموبايل.",
                "تطلب تصحيح عنوان أو رقم غلط.",
                "تطلب حذف بياناتك من سجلاتنا.",
                "تلغي اشتراك رسالة الخميس في أي وقت.",
              ]}
            />
            <p className="pt-1">
              بنرد على أي طلب من النوع ده خلال ٧ أيام عمل. مفيش رسوم.
            </p>
          </LegalSection>

          <LegalSection n="07" title="الأطفال">
            <p>
              الموقع مش موجّه لأطفال تحت ١٦ سنة، ومش بنجمع بياناتهم عن قصد. لو
              اكتشفنا طلب معمول من طفل من غير موافقة ولي الأمر، بنلغي الطلب
              ونمسح البيانات.
            </p>
          </LegalSection>

          <LegalSection n="08" title="التواصل">
            <p>
              أي سؤال عن الخصوصية:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              أو واتساب <span className="tel">{site.phoneDisplay}</span>.
            </p>
            <p className="pt-1 text-[12px]">
              {site.address} — بنستقبل المراسلات من ١٢ الظهر لـ ٨ بالليل.
            </p>
          </LegalSection>

          <div className="border-t border-line pt-6 text-[12.5px] text-ink-soft">
            <Link href="/legal/terms" className="link-u font-medium text-ink">
              اقرأ شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
