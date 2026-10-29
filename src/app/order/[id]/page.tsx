"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Receipt,
} from "lucide-react";
import { getOrder, STATUS_STEPS, type Order } from "@/lib/orders";
import { dishes } from "@/lib/menu";
import { site } from "@/lib/site";
import { egp } from "@/lib/utils";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = React.useState<Order | null | undefined>(undefined);

  React.useEffect(() => {
    setOrder(getOrder(params.id) ?? null);
  }, [params.id]);

  if (order === undefined) {
    return (
      <div className="shell py-20">
        <div className="h-8 w-56 animate-pulse bg-sand" />
        <div className="mt-6 h-64 w-full animate-pulse bg-sand/60" />
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="shell py-20 text-center">
        <p className="eyebrow">طلب</p>
        <h1 className="mt-3 font-display text-2xl">مش لاقيين الطلب ده.</h1>
        <p className="mx-auto mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-soft">
          الطلبات بتتحفظ على الجهاز اللي اتعمل منها الطلب. لو غيّرت المتصفح، جرّب
          صفحة تتبّع الطلب بالرقم والموبايل.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex h-11 items-center border border-ink px-5 text-[13px] hover:bg-ink hover:text-cream"
          >
            تتبّع طلب
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center bg-ember px-5 text-[13px] text-white hover:bg-ember-deep"
          >
            كلّمنا
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(order.createdAt);
  const stepIndex = STATUS_STEPS.findIndex((s) => s.id === order.status);
  const whatsappText = encodeURIComponent(
    `مرحبًا أكله بمزاج، بخصوص الطلب ${order.id}\nالاسم: ${order.customer.name}\nالإجمالي: ${order.total} ج.م\nالعنوان: ${order.customer.address}`,
  );

  return (
    <div className="shell py-10 lg:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="border border-line bg-paper p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">تم استلام الطلب</p>
              <h1 className="mt-3 text-h1">
                شكرًا يا {order.customer.name.split(" ")[0]}. الطلب في المطبخ.
              </h1>
              <p className="mt-2 text-[13px] text-ink-soft">
                هنكلّمك على {order.customer.phone} لو احتجنا نأكد أي حاجة.
              </p>
            </div>
            <div className="border border-line px-4 py-3 text-end">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                رقم الطلب
              </p>
              <p className="num mt-1 text-[15px]">{order.id}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-3 text-[12px]">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-ember" />
              {order.eta}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-ember" />
              {order.customer.area}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5 text-ember" />
              {order.customer.phone}
            </span>
            <span className="ms-auto num text-[11px] text-ink-soft">
              {date.toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-[12.5px] font-medium">حالة الطلب</p>
            <ol className="mt-3 grid gap-3 sm:grid-cols-4">
              {STATUS_STEPS.map((step, index) => {
                const done = index <= stepIndex;
                return (
                  <li key={step.id} className="flex items-start gap-2">
                    <span
                      className={
                        done
                          ? "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-olive text-cream"
                          : "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft"
                      }
                    >
                      {done ? <Check className="size-3" /> : <span className="size-1 rounded-full bg-line" />}
                    </span>
                    <span>
                      <span className="block text-[12px]">{step.label}</span>
                      <span className="block text-[10.5px] text-ink-soft">{step.hint}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-6 border border-line bg-paper p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-lg">
            <Receipt className="size-4 text-ember" />
            الطلب
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {order.items.map((item) => {
              const dish = dishes.find((d) => d.id === item.dishId);
              return (
                <li key={`${item.dishId}-${item.meal}`} className="flex gap-3 py-3">
                  <div className="relative size-14 shrink-0 overflow-hidden bg-sand">
                    {dish?.image && (
                      <Image src={dish.image} alt="" fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px]">{item.nameAr}</p>
                    <p className="num mt-0.5 text-[11px] text-ink-soft">
                      {item.qty} × {egp(item.unit)}
                      {item.meal ? " · وجبة كاملة" : ""}
                    </p>
                  </div>
                  <span className="num text-[13px]">{egp(item.total)}</span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[12.5px]">
            <div className="flex justify-between">
              <dt className="text-ink-soft">المجموع</dt>
              <dd className="num">{egp(order.subtotal)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-olive">
                <dt>خصم</dt>
                <dd className="num">− {egp(order.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-ink-soft">التوصيل</dt>
              <dd className="num">{order.delivery === 0 ? "مجاني" : egp(order.delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-[15px] font-medium">
              <dt>المطلوب عند الاستلام</dt>
              <dd className="num">{egp(order.total)}</dd>
            </div>
          </dl>

          <div className="mt-5 border border-ember/30 bg-ember/[0.04] p-3.5 text-[11.5px] leading-relaxed">
            <p className="font-medium">الدفع كاش عند الاستلام</p>
            <p className="mt-1 text-ink-soft">
              جهّز {egp(order.total)} للمندوب. لو محتاج فكة، كلّمنا على واتساب
              وبنبلغ الطيار.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={`https://wa.me/${site.phone}?text=${whatsappText}`}
            className="flex h-12 items-center justify-center gap-2 bg-olive text-[13px] font-medium text-cream transition-colors hover:bg-olive/90"
          >
            <MessageCircle className="size-4" />
            أكّد على واتساب
          </a>
          <Link
            href="/menu"
            className="flex h-12 items-center justify-center gap-2 border border-ink text-[13px] font-medium transition-colors hover:bg-ink hover:text-cream"
          >
            كمّل تسوق
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-ink-soft">
          العنوان: {order.customer.address}
          {order.customer.landmark ? ` — ${order.customer.landmark}` : ""}
          <br />
          وقت التسليم المطلوب: {order.customer.slot}
        </p>
      </div>
    </div>
  );
}
