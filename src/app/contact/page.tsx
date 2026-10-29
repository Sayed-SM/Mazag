import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "كلّمنا",
  description:
    "واتساب، تليفون، بريد، وعنوان مطبخ أكله بمزاج في المهندسين. بنرد في أقل من ٥ دقايق.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "واتساب",
    value: site.phoneDisplay,
    hint: "أسرع وسيلة — بنرد من المطبخ",
    href: `https://wa.me/${site.phone}`,
    primary: true,
  },
  {
    icon: Phone,
    label: "تليفون",
    value: site.phoneDisplay,
    hint: "لو مش بتقدر تكتب",
    href: `tel:+${site.phone}`,
  },
  {
    icon: Mail,
    label: "بريد",
    value: site.email,
    hint: "للشكاوى والفواتير",
    href: `mailto:${site.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="كلّمنا"
        title="بنرد من المطبخ، مش من كول سنتر."
        note="أسرع حاجة واتساب. لو الطلب وصل ناقص، اكتب رقم الطلب في أول الرسالة وهنشوفه على طول."
        meta={<span className="tel">{site.phoneDisplay}</span>}
      />

      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className={
                  channel.primary
                    ? "flex flex-col gap-2 border border-ember bg-ember p-5 text-white transition-colors hover:bg-ember-deep sm:col-span-2"
                    : "flex flex-col gap-2 border border-line p-5 transition-colors hover:border-ink"
                }
              >
                <channel.icon
                  className={channel.primary ? "size-5 text-white" : "size-5 text-ember"}
                />
                <span className="text-[11px] opacity-70">{channel.label}</span>
                <span className={channel.primary ? "num text-xl" : "num text-lg"}>
                  <span className="tel">{channel.value}</span>
                </span>
                <span className="text-[11px] opacity-70">{channel.hint}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-lg">الشكاوى</h2>
            <p className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.9] text-ink-soft">
              لو حاجة وصلت غلط، اكتب رقم الطلب + وصف قصير + صورة لو ممكن. بنفتح
              الشكوى في نفس اليوم، وبنرد بقرار — مش بـ«هنشوف ونبلغك».
            </p>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li className="flex items-start gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                طلب ناقص: بنبعته تاني أو نرجّع قيمته.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                طلب بارد: بنعيده لو المشكلة من عندنا.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ember" />
                طلب متأخر أكتر من ٢٠ دقيقة: خصم على الطلب الجاي.
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-lg">طلبات الشركات</h2>
            <p className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.9] text-ink-soft">
              بنعمل بوفيهات صغيرة من ١٠ لـ ٤٠ شخص، بمنيو ثابت وسعر للفرد. محتاجين
              ٤٨ ساعة قبل الموعد. ابعت العدد والتاريخ على البريد.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="border border-line bg-paper p-5">
            <p className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
              <MapPin className="size-3.5 text-ember" />
              المطبخ
            </p>
            <p className="mt-3 text-[14px] leading-relaxed">{site.address}</p>
            <p className="mt-2 text-[12px] text-ink-soft">
              الاستلام من المطبخ متاح بموعد مسبق — كلّمنا قبلها بساعة.
            </p>
            <a
              href="https://maps.google.com/?q=El+Mohandessin,+Giza,+Egypt"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-[12px] text-ember underline-offset-4 hover:underline"
            >
              افتح على الخريطة ↗
            </a>
          </div>

          <div className="border border-line bg-paper p-5">
            <p className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
              <Clock className="size-3.5 text-ember" />
              المواعيد
            </p>
            <dl className="mt-3 space-y-2 text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">السبت — الخميس</dt>
                <dd className="num">
                  <span className="tel">١٢:٠٠ – ٢:٠٠</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">الجمعة</dt>
                <dd className="num">
                  <span className="tel">١:٣٠ – ٢:٠٠</span>
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="text-ink-soft">آخر أوردر</dt>
                <dd className="num">
                  <span className="tel">١:١٥ ص</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-line p-5 text-[12px] leading-relaxed text-ink-soft">
            <p className="text-ink">ملحوظة عن التوصيل</p>
            <p className="mt-1.5">
              الطيار بيتصل قبل الوصول بـ ٥ دقايق. لو الرقم مش متاح، الطلب بيستنى
              ١٠ دقايق وبعدها بيرجع المطبخ.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
