"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  Check,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { deliveryZones, site } from "@/lib/site";
import { cn, egp } from "@/lib/utils";
import { saveOrder, buildOrderId, toOrderItems, type Order } from "@/lib/orders";
import type { CartLine } from "@/lib/cart-math";

const schema = z.object({
  name: z.string().trim().min(3, "اكتب الاسم الثلاثي أو الأول والأخير").max(60),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "الرقم لازم ١١ رقم ويبدأ بـ 010 أو 011 أو 012 أو 015"),
  zoneId: z.enum(["near", "giza", "cairo", "far"]),
  area: z.string().trim().min(2, "اكتب اسم المنطقة أو الشارع الرئيسي").max(40),
  address: z
    .string()
    .trim()
    .min(10, "اكتب الشارع ورقم العمارة والدور — تفاصيل أكتر من ١٠ حروف")
    .max(240),
});

type FormState = z.infer<typeof schema> & {
  landmark: string;
  notes: string;
  slot: string;
};

const slots = [
  { id: "asap", label: "في أقرب وقت", hint: "من ٣٥ لـ ٥٠ دقيقة" },
  { id: "lunch", label: "وقت محدد", hint: "اكتب الوقت في الملاحظات" },
];

export function CheckoutView() {
  const router = useRouter();
  const { lines, totals, hydrated, clear, menu: dishes } = useCart();
  const [form, setForm] = React.useState<FormState>({
    name: "",
    phone: "",
    zoneId: "near",
    area: "",
    address: "",
    landmark: "",
    notes: "",
    slot: "asap",
  });
  const [zone, setZone] = React.useState(deliveryZones[0]);
  const [promo, setPromo] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("promo");
      if (p) setPromo(p.toUpperCase());
    }
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setSubmitting(true);
    setServerError("");

    const payload = {
      lines: lines.map((l: CartLine) => ({
        dishId: l.dishId,
        qty: l.qty,
        meal: l.meal,
      })),
      zoneId: form.zoneId,
      promo: promo ?? undefined,
      customer: {
        name: form.name,
        phone: form.phone,
        area: form.area,
        address: form.address,
        landmark: form.landmark || undefined,
        notes: form.notes || undefined,
        slot: slots.find((s) => s.id === form.slot)?.label ?? form.slot,
      },
    };

    let id = buildOrderId();
    let serverTotals = totals;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          id: string;
          totals: typeof totals;
        };
        id = data.id;
        serverTotals = data.totals;
      } else if (res.status === 422) {
        const data = (await res.json()) as { error?: string };
        setServerError(data.error ?? "راجع البيانات وحاول تاني.");
        setSubmitting(false);
        return;
      }
    } catch {
      // Offline fallback — the order is still stored locally so the flow completes.
      console.warn("[mazag] order API unreachable, saving locally");
    }

    const order: Order = {
      id,
      createdAt: new Date().toISOString(),
      items: toOrderItems(lines, dishes),
      subtotal: serverTotals.subtotal,
      discount: serverTotals.discount,
      delivery: serverTotals.delivery,
      total: serverTotals.total,
      promo: promo ?? "",
      customer: {
        name: form.name,
        phone: form.phone,
        zoneId: form.zoneId,
        area: form.area,
        address: form.address,
        landmark: form.landmark,
        notes: form.notes,
        slot: slots.find((s) => s.id === form.slot)?.label ?? form.slot,
      },
      status: "received",
      eta: zone.eta,
    };

    saveOrder(order);
    clear();
    router.push(`/order/${id}`);
  }

  const field =
    "h-12 w-full rounded-xl border bg-cream/50 px-4 text-[13.5px] transition-colors focus:border-ink focus:bg-paper focus:outline-none";
  const label = "mb-2 block text-[12px] font-medium";

  const steps = [
    { label: "السلة", href: "/cart", state: "done" as const },
    { label: "الدفع", state: "current" as const },
    { label: "التأكيد", state: "todo" as const },
  ];

  return (
    <div className="shell py-10 lg:py-14">
      {/* step breadcrumb */}
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px]">
        {steps.map((step, index) => {
          const inner = (
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "num inline-flex size-6 items-center justify-center rounded-full text-[10px] transition-colors",
                  step.state === "done" && "bg-olive text-white",
                  step.state === "current" && "bg-ember text-white",
                  step.state === "todo" && "border border-line text-ink-soft",
                )}
              >
                {step.state === "done" ? <Check className="size-3" /> : index + 1}
              </span>
              <span
                className={
                  step.state === "current"
                    ? "font-medium text-ink"
                    : step.state === "done"
                      ? "text-ink-soft hover:text-ink"
                      : "text-ink-soft/60"
                }
              >
                {step.label}
              </span>
            </span>
          );
          return (
            <li key={step.label} className="flex items-center gap-3">
              {"href" in step && step.href ? (
                <Link href={step.href} className="transition-colors">
                  {inner}
                </Link>
              ) : (
                inner
              )}
              {index < steps.length - 1 && (
                <span className="h-px w-8 bg-line" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">خطوة أخيرة</p>
          <h1 className="mt-2 text-h1">العنوان، وبعدها الأكل في السكة.</h1>
        </div>
        <p className="flex items-center gap-2 rounded-full border border-olive/30 bg-olive/5 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-olive">
          <ShieldCheck className="size-3.5" />
          الدفع عند الاستلام فقط
        </p>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="space-y-6">
          {/* 01 contact */}
          <section
            aria-labelledby="step-contact"
            className="rounded-2xl border border-line bg-paper p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="num inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ember/25 bg-ember/[0.06] text-[11.5px] font-medium text-ember">
                01
              </span>
              <div>
                <h2 id="step-contact" className="font-display text-h3">
                  بياناتك
                </h2>
                <p className="mt-0.5 text-[12px] text-ink-soft">
                  بنكلم الرقم ده لو حصل أي حاجة في الطلب.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={label}>
                  الاسم
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={cn(
                    field,
                    errors.name ? "border-ember" : "border-line",
                  )}
                  placeholder="مثال: أحمد سامي"
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </div>

              <div>
                <label htmlFor="phone" className={label}>
                  الموبايل
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute start-4 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                    aria-invalid={Boolean(errors.phone)}
                    className={cn(
                      field,
                      "ps-11 text-start",
                      errors.phone ? "border-ember" : "border-line",
                    )}
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </div>
            </div>
          </section>

          {/* 02 address */}
          <section
            aria-labelledby="step-address"
            className="rounded-2xl border border-line bg-paper p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="num inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ember/25 bg-ember/[0.06] text-[11.5px] font-medium text-ember">
                02
              </span>
              <div>
                <h2 id="step-address" className="font-display text-h3">
                  العنوان
                </h2>
                <p className="mt-0.5 text-[12px] text-ink-soft">
                  كل ما العنوان يبقى أدق، الطيار يوصل أسرع.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div>
                <label htmlFor="zone" className={label}>
                  المنطقة
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute start-4 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
                  <select
                    id="zone"
                    value={form.zoneId}
                    onChange={(e) => {
                      const next = e.target.value as FormState["zoneId"];
                      update("zoneId", next);
                      setZone(deliveryZones.find((z) => z.id === next) ?? deliveryZones[0]);
                    }}
                    className={cn(
                      field,
                      "appearance-none border-line ps-11 pe-9",
                    )}
                  >
                    {deliveryZones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.label} — {z.fee} ج.م · {z.eta}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[10px] text-ink-soft">
                    ▾
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-ink-soft">{zone.areas}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="area" className={label}>
                    المنطقة / الشارع الرئيسي
                  </label>
                  <input
                    id="area"
                    value={form.area}
                    onChange={(e) => update("area", e.target.value)}
                    aria-invalid={Boolean(errors.area)}
                    className={cn(field, errors.area ? "border-ember" : "border-line")}
                    placeholder="مثال: المهندسين، شارع سوريا"
                  />
                  {errors.area && <ErrorText>{errors.area}</ErrorText>}
                </div>
                <div>
                  <label htmlFor="landmark" className={label}>
                    علامة مميزة <span className="font-normal text-ink-soft">(اختياري)</span>
                  </label>
                  <input
                    id="landmark"
                    value={form.landmark}
                    onChange={(e) => update("landmark", e.target.value)}
                    className={cn(field, "border-line")}
                    placeholder="جنب صيدلية العزبي"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className={label}>
                  العنوان بالتفصيل
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  className={cn(
                    "w-full rounded-xl border bg-cream/50 px-4 py-3 text-[13.5px] transition-colors focus:border-ink focus:bg-paper focus:outline-none",
                    errors.address ? "border-ember" : "border-line",
                  )}
                  placeholder="رقم العمارة، الدور، الشقة، أي تفاصيل تساعد الطيار"
                />
                {errors.address && <ErrorText>{errors.address}</ErrorText>}
              </div>

              <div>
                <label htmlFor="notes" className={label}>
                  ملاحظات للمطبخ <span className="font-normal text-ink-soft">(اختياري)</span>
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-[13.5px] transition-colors focus:border-ink focus:bg-paper focus:outline-none"
                  placeholder="مثال: من غير بصل، الصوص على الجنب"
                />
              </div>
            </div>
          </section>

          {/* 03 time + payment */}
          <section
            aria-labelledby="step-time"
            className="rounded-2xl border border-line bg-paper p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <span className="num inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ember/25 bg-ember/[0.06] text-[11.5px] font-medium text-ember">
                03
              </span>
              <h2 id="step-time" className="font-display text-h3">
                الوقت والدفع
              </h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => update("slot", slot.id)}
                  aria-pressed={form.slot === slot.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-start transition-colors",
                    form.slot === slot.id
                      ? "border-ink bg-cream/70"
                      : "border-line hover:border-ink/40",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      form.slot === slot.id
                        ? "border-ember bg-ember text-white"
                        : "border-line text-transparent",
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium">{slot.label}</span>
                    <span className="mt-0.5 block text-[11px] text-ink-soft">{slot.hint}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3.5 rounded-xl border border-ember/25 bg-ember/[0.05] p-4">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ember/10">
                <Banknote className="size-4 text-ember" />
              </span>
              <div>
                <p className="text-[12.5px] font-medium">الدفع عند الاستلام</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">
                  هتدفع {egp(totals.total)} كاش للمندوب. مفيش رسوم إضافية، ومفيش
                  دفع أونلاين. لو محتاج فكة، قول للمندوب قبل ما يجي.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-[15px] font-medium">ملخص الطلب</h2>
              <span className="num rounded-full bg-cream px-2.5 py-1 text-[10.5px] text-ink-soft">
                {hydrated ? totals.count : 0} أصناف
              </span>
            </div>

            <ul className="max-h-[280px] space-y-4 overflow-y-auto px-5 py-4">
              {lines.map((line) => {
                const dish = dishes.find((d) => d.id === line.dishId);
                if (!dish) return null;
                const unit = dish.price + (line.meal ? dish.mealUpgrade ?? 35 : 0);
                return (
                  <li key={`${line.dishId}-${line.meal}`} className="flex gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                      {dish.image && (
                        <Image
                          src={dish.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-medium">{dish.nameAr}</p>
                      <p className="num mt-0.5 text-[10.5px] text-ink-soft">
                        {line.qty} × {egp(unit)}
                        {line.meal ? " · وجبة" : ""}
                      </p>
                    </div>
                    <span className="num text-[12px]">{egp(unit * line.qty)}</span>
                  </li>
                );
              })}
            </ul>

            <dl className="space-y-2.5 border-t border-dashed border-line px-5 py-4 text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">المجموع</dt>
                <dd className="num">{egp(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-olive">
                  <dt>خصم</dt>
                  <dd className="num">− {egp(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-soft">التوصيل — {zone.label}</dt>
                <dd className="num">
                  {totals.delivery === 0 ? "مجاني" : egp(totals.delivery)}
                </dd>
              </div>
            </dl>

            <div className="flex items-baseline justify-between bg-ink px-5 py-4 text-cream">
              <dt className="text-[12.5px] text-cream/70">المطلوب عند الاستلام</dt>
              <dd className="num text-h3">{egp(totals.total)}</dd>
            </div>

            <div className="px-5 py-5">
              {serverError && (
                <p className="mb-3 flex items-start gap-2 rounded-lg border border-ember/40 bg-ember/5 p-2.5 text-[11.5px] text-ember">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !hydrated}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ember text-[14px] font-medium text-white transition-colors hover:bg-ember-deep disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    بنأكد الطلب…
                  </>
                ) : (
                  <>
                    أكّد الطلب
                    <ArrowLeft className="size-4" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-[10.5px] leading-relaxed text-ink-soft">
                بالضغط على «أكّد الطلب» إنت موافق على شروط الاستخدام. هنبعتلك
                رسالة واتساب للتأكيد.
              </p>

              <Link
                href="/cart"
                className="mt-4 flex items-center justify-center text-[12px] text-ink-soft transition-colors hover:text-ink"
              >
                رجوع للسلة
              </Link>
            </div>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-line bg-cream/60 px-4 py-3 text-[11px] text-ink-soft">
            <ShieldCheck className="size-3.5 text-olive" />
            بياناتك مش بتتحفظ عند أي طرف تالت.
          </p>
        </aside>
      </form>
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[11px] text-ember">
      <AlertCircle className="size-3" />
      {children}
    </p>
  );
}
