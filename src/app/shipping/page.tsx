import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  Clock,
  MapPin,
  Package,
  RotateCcw,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { deliveryZones, site } from "@/lib/site";
import { egp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "التوصيل والدفع",
  description:
    "مناطق التوصيل، رسوم الشحن، مواعيد التسليم، الدفع عند الاستلام، وسياسة الاسترجاع في أكله بمزاج.",
};

const policies = [
  {
    icon: Truck,
    title: "الشحن بيتحسب حسب المنطقة",
    body: "بنقسّم القاهرة الكبرى لأربع مناطق. الرسم ثابت جوه كل منطقة، ومش بيتغير حسب حجم الطلب — إلا لو الطلب فوق ٤٠٠ ج.م، فالشحن علينا.",
  },
  {
    icon: Banknote,
    title: "كاش عند الاستلام بس",
    body: "مفيش دفع أونلاين ومفيش فيزا. بتدفع للمندوب لما يوصلك، بنفس المبلغ المكتوب في صفحة تأكيد الطلب. مفيش أي رسوم إضافية على الدفع كاش.",
  },
  {
    icon: ThermometerSnowflake,
    title: "التغليف بيحافظ على الأكل",
    body: "شنطة حرارية للطيار، وعلب بفتحات تهوية للبرجر والبيتزا عشان البخار مايرجعش للعيش. الرامن بيتشحن والشوربة منفصلة في ترمس.",
  },
  {
    icon: Clock,
    title: "الوقت تقديري، مش وعد",
    body: "الأرقام اللي بنكتبها متوسطات وقت الذروة. في أيام الزحمة ممكن تتأخر ١٠ دقايق. لو اتأخر أكتر من ٢٠ دقيقة عن المدى المكتوب، عندك خصم على الطلب الجاي.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        eyebrow="التوصيل والدفع"
        title="كل حاجة عن الشحن، الدفع، ووصول الأكل."
        note="بنوصّل لكل القاهرة الكبرى من مطبخ واحد في المهندسين. الأرقام دي محدّثة، ولو منطقتك مش موجودة كلّمنا وهنشوف نقدر نوصلها ولا لأ."
        meta={`حد أدنى ${egp(site.minOrder)} · شحن مجاني فوق ${egp(site.freeDeliveryFrom)}`}
      />

      <div className="shell py-12">
        {/* zones */}
        <section aria-labelledby="zones">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
            <div>
              <p className="eyebrow">المناطق</p>
              <h2 id="zones" className="mt-2 font-display text-xl">
                أربع مناطق، أربع رسوم.
              </h2>
            </div>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:block">
              {deliveryZones.length} zones
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-start">
              <thead>
                <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  <th className="py-3 pe-4 text-start font-normal">المنطقة</th>
                  <th className="py-3 pe-4 text-start font-normal">بتغطي</th>
                  <th className="py-3 pe-4 text-start font-normal">الوقت</th>
                  <th className="py-3 text-start font-normal">الشحن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {deliveryZones.map((zone) => (
                  <tr key={zone.id} className="align-top">
                    <td className="py-4 pe-4 text-[13.5px] font-medium">
                      {zone.label}
                    </td>
                    <td className="py-4 pe-4 text-[12.5px] leading-relaxed text-ink-soft">
                      {zone.areas}
                    </td>
                    <td className="num py-4 pe-4 text-[12.5px] text-ink-soft">
                      {zone.eta}
                    </td>
                    <td className="py-4">
                      <span className="num text-[13.5px]">{egp(zone.fee)}</span>
                      <span className="mt-0.5 block text-[10.5px] text-olive">
                        مجاني فوق {egp(site.freeDeliveryFrom)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[62ch] text-[12px] leading-relaxed text-ink-soft">
            المنطقة اللي بتختارها بتحدد الرسم. لو العنوان الحقيقي بره المنطقة
            المختارة، الطيار بيقولك الفرق قبل ما تستلم — مش بعد.
          </p>
        </section>

        {/* policy cards */}
        <section className="mt-14 grid gap-6 sm:grid-cols-2">
          {policies.map((policy) => (
            <article key={policy.title} className="border-t border-ink/15 pt-5">
              <policy.icon className="size-4 text-ember" strokeWidth={1.6} />
              <h3 className="mt-3 font-display text-[16px]">{policy.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.85] text-ink-soft">
                {policy.body}
              </p>
            </article>
          ))}
        </section>

        {/* timeline */}
        <section className="mt-14 border-y border-line bg-paper">
          <div className="px-[clamp(1rem,3vw,2rem)] py-8">
            <h2 className="font-display text-xl">من الطلب للتسليم</h2>
            <ol className="mt-6 grid gap-6 sm:grid-cols-4">
              {[
                { n: "01", t: "بتأكد الطلب", d: "بعد ملء العنوان، بنبعت رقم الطلب على الشاشة." },
                { n: "02", t: "المطبخ بيستلم", d: "الطلب بيظهر على شاشة المحطة المسؤولة." },
                { n: "03", t: "الطيار بيتحرك", d: "بنبعتلك واتساب لما الطلب يخرج من المطبخ." },
                { n: "04", t: "بتدفع وتستلم", d: "كاش للمندوب، وبعدها تقيّم لو حبيت." },
              ].map((step) => (
                <li key={step.n} className="border-t border-line pt-4">
                  <p className="num text-[10.5px] text-ember">{step.n}</p>
                  <p className="mt-2 text-[13px] font-medium">{step.t}</p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                    {step.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* returns / issues */}
        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl">
              <RotateCcw className="size-4 text-ember" />
              لو في مشكلة في الطلب
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.9] text-ink-soft">
              كلّمنا على واتساب خلال ساعة من التسليم، واكتب رقم الطلب في أول
              الرسالة. مش محتاج نموذج ولا إيميلات — بنفتح الشكوى في نفس اليوم.
            </p>
            <ul className="mt-5 space-y-3 text-[13px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                <span>
                  <span className="font-medium">صنف ناقص:</span> بنبعته تاني في
                  نفس اليوم، أو نرجّع قيمته كاش مع الطيار.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                <span>
                  <span className="font-medium">صنف غلط:</span> بنستبدله، وبناخد
                  الصنف الغلط من غير أي رسوم إضافية.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                <span>
                  <span className="font-medium">وصل بارد:</span> لو المشكلة من
                  التغليف أو الطريق، بنعيد الطلب على حسابنا.
                </span>
              </li>
            </ul>
          </div>

          <div className="border border-line bg-paper p-6">
            <h3 className="flex items-center gap-2 font-display text-lg">
              <Package className="size-4 text-ember" />
              الاستلام من المطبخ
            </h3>
            <p className="mt-3 text-[13px] leading-[1.9] text-ink-soft">
              تقدر تستلم طلبك بنفسك من المهندسين، من غير أي رسوم شحن. لازم تحجز
              قبلها بساعة على الأقل عشان المطبخ يجهّزه في وقته.
            </p>
            <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-ember" />
              {site.address}
            </p>
            <a
              href={`tel:+${site.phone}`}
              className="mt-4 inline-flex h-10 items-center border border-ink px-4 text-[12.5px] transition-colors hover:bg-ink hover:text-cream"
            >
              احجز استلام — <span className="tel">{site.phoneDisplay}</span>
            </a>
          </div>
        </section>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            لسه في سؤال عن التوصيل؟{" "}
            <Link href="/faq" className="text-ink underline underline-offset-4">
              الأسئلة المتكررة
            </Link>{" "}
            فيها أغلب الحالات.
          </p>
          <Link href="/menu" className="link-u font-medium text-ink">
            ابدأ من المنيو
          </Link>
        </div>
      </div>
    </>
  );
}
