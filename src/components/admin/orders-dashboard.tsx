"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  ReceiptText,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/orders";
import { STATUS_STEPS } from "@/lib/orders";
import { egp } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusMeta: Record<OrderStatus, { label: string; className: string }> = {
  received: { label: "جديد", className: "bg-ember text-white" },
  kitchen: { label: "في المطبخ", className: "bg-saffron text-ink" },
  courier: { label: "مع الطيار", className: "bg-sand-deep text-ink" },
  delivered: { label: "اتسلّم", className: "bg-olive text-cream" },
};

const NEXT: Record<OrderStatus, OrderStatus | null> = {
  received: "kitchen",
  kitchen: "courier",
  courier: "delivered",
  delivered: null,
};

export function OrdersDashboard() {
  const [orders, setOrders] = React.useState<Order[] | null>(null);
  const [filter, setFilter] = React.useState<"all" | OrderStatus>("all");
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [advancing, setAdvancing] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (res.status === 401) return; // proxy will bounce us to login
      const data = (await res.json()) as { orders: Order[] };
      setOrders(data.orders);
    } catch {
      setOrders((prev) => prev ?? []);
    }
  }, []);

  React.useEffect(() => {
    load();
    const t = setInterval(load, 20000); // auto-refresh every 20s
    return () => clearInterval(t);
  }, [load]);

  async function advance(order: Order) {
    const next = NEXT[order.status];
    if (!next || advancing) return;
    setAdvancing(order.id);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as {
        order: Order;
        notify: { ok: boolean; link: string };
      };
      setOrders((prev) =>
        prev ? prev.map((o) => (o.id === data.order.id ? data.order : o)) : prev,
      );
      toast.success(`الطلب ${data.order.id} → ${statusMeta[next].label}`, {
        description: data.notify.ok
          ? "رسالة واتساب اتبعتت للأدمن ✅"
          : "واتساب: الرسالة جاهزة — ابعتها من الرابط جنب الحالة",
        action: data.notify.ok
          ? undefined
          : {
              label: "افتح واتساب",
              onClick: () => window.open(data.notify.link, "_blank"),
            },
      });
    } catch {
      toast.error("مش قادرين نحدّث الحالة");
    } finally {
      setAdvancing(null);
    }
  }

  const stats = React.useMemo(() => {
    const list = orders ?? [];
    const today = new Date().toDateString();
    const todays = list.filter((o) => new Date(o.createdAt).toDateString() === today);
    return {
      total: list.length,
      today: todays.length,
      active: list.filter((o) => o.status !== "delivered").length,
      revenue: todays.reduce((sum, o) => sum + o.total, 0),
    };
  }, [orders]);

  const visible = (orders ?? []).filter((o) => filter === "all" || o.status === filter);

  return (
    <div className="space-y-8">
      {/* stats — hairline grid, 21st style */}
      <section className="grid overflow-hidden rounded-2xl border border-line bg-paper sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "طلبات النهارده", value: String(stats.today), hint: "من إجمالي " + stats.total },
          { label: "شغّالة دلوقتي", value: String(stats.active), hint: "لسه مش اتسلّمت" },
          {
            label: "مبيعات النهارده",
            value: egp(stats.revenue),
            hint: "دفع كاش عند الاستلام",
          },
          { label: "آخر تحديث", value: "٢٠ث", hint: "تحديث تلقائي" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "p-5",
              i % 2 === 1 && "sm:border-s border-line",
              i >= 2 && "sm:border-t border-line lg:border-t-0",
              i >= 1 && "lg:border-s border-line",
              i === 1 && "border-t border-line sm:border-t-0",
            )}
          >
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
              {stat.label}
            </p>
            <p className="num mt-2 font-display text-[1.9rem] font-extrabold leading-none text-ink">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[11px] text-ink-soft">{stat.hint}</p>
          </div>
        ))}
      </section>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2">
        {(["all", ...Object.keys(statusMeta)] as const).map((key) => {
          const label = key === "all" ? "الكل" : statusMeta[key as OrderStatus].label;
          const count =
            key === "all"
              ? orders?.length ?? 0
              : (orders ?? []).filter((o) => o.status === key).length;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key as "all" | OrderStatus)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[12px] transition-colors",
                filter === key
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {label}
              <span
                className={cn(
                  "num inline-flex size-4.5 items-center justify-center rounded-full text-[9.5px]",
                  filter === key ? "bg-cream/20" : "bg-sand",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={load}
          className="ms-auto inline-flex h-9 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[12px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          <RefreshCw className="size-3.5" />
          تحديث
        </button>
      </div>

      {/* orders list */}
      {orders === null ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-sand/70" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-paper/60 p-12 text-center">
          <ReceiptText className="mx-auto size-6 text-ink-soft/70" />
          <p className="mt-4 font-display text-[1.05rem] text-ink">
            {filter === "all" ? "مفيش طلبات لسه" : "مفيش طلبات بالحالة دي"}
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-soft">
            الطلبات الجديدة هتظهر هنا أول ما الزبون يطلب — والواتساب هيصوّت.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((order) => {
            const open = expanded === order.id;
            const meta = statusMeta[order.status];
            const next = NEXT[order.status];
            const date = new Date(order.createdAt);
            const waText = encodeURIComponent(
              `مرحبًا ${order.customer.name}، بخصوص الطلب ${order.id} من أكله بمزاج 🍽️`,
            );
            return (
              <li
                key={order.id}
                className="overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-ink/30"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4 sm:p-5">
                  <span
                    className={cn(
                      "inline-flex h-6 items-center rounded-full px-3 text-[10.5px] font-medium",
                      meta.className,
                    )}
                  >
                    {meta.label}
                  </span>

                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                      {order.customer.name}
                      <span className="num font-mono text-[10.5px] text-ink-soft">
                        {order.id}
                      </span>
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-soft">
                      <span className="num inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {date.toLocaleTimeString("ar-EG", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" />
                        {order.customer.area}
                      </span>
                      <span className="num inline-flex items-center gap-1">
                        <Phone className="size-3" />
                        {order.customer.phone}
                      </span>
                    </p>
                  </div>

                  <div className="ms-auto flex items-center gap-2">
                    <span className="num font-display text-[15px] font-bold text-ink">
                      {egp(order.total)}
                    </span>
                    <a
                      href={`https://wa.me/2${order.customer.phone}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`راسل ${order.customer.name} على واتساب`}
                      className="flex size-9 items-center justify-center rounded-full border border-olive/50 text-olive transition-colors hover:bg-olive hover:text-cream"
                    >
                      <MessageCircle className="size-4" />
                    </a>
                    {next && (
                      <button
                        type="button"
                        onClick={() => advance(order)}
                        disabled={advancing === order.id}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[12px] font-medium text-cream transition-colors hover:bg-ember disabled:opacity-60"
                      >
                        {advancing === order.id
                          ? "بلحظة…"
                          : statusMeta[next].label}
                        <ArrowLeft className="size-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : order.id)}
                      aria-expanded={open}
                      aria-label="تفاصيل الطلب"
                      className="flex size-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform", open && "rotate-180")}
                      />
                    </button>
                  </div>
                </div>

                {/* status track */}
                <div className="grid grid-cols-4 gap-1.5 border-t border-line px-4 pt-3 sm:px-5">
                  {STATUS_STEPS.map((step, index) => {
                    const done =
                      index <= STATUS_STEPS.findIndex((s) => s.id === order.status);
                    return (
                      <div key={step.id}>
                        <div
                          className={cn(
                            "h-1 rounded-full",
                            done ? "bg-olive" : "bg-sand-deep",
                          )}
                        />
                        <p
                          className={cn(
                            "mt-1.5 text-[9.5px]",
                            done ? "text-ink" : "text-ink-soft/60",
                          )}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {open && (
                  <div className="border-t border-line bg-sand/40 px-4 py-4 sm:px-5">
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                      <div>
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
                          الأصناف
                        </p>
                        <ul className="mt-2.5 divide-y divide-line">
                          {order.items.map((item) => (
                            <li
                              key={`${item.dishId}-${item.meal}`}
                              className="flex items-center justify-between gap-3 py-2 text-[12.5px] text-ink"
                            >
                              <span>
                                {item.nameAr}
                                {item.meal && (
                                  <span className="text-ink-soft"> · وجبة كاملة</span>
                                )}
                                <span className="num text-ink-soft"> × {item.qty}</span>
                              </span>
                              <span className="num">{egp(item.total)}</span>
                            </li>
                          ))}
                        </ul>
                        <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-[12px]">
                          <div className="flex justify-between text-ink-soft">
                            <dt>المجموع</dt>
                            <dd className="num">{egp(order.subtotal)}</dd>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-olive">
                              <dt>خصم {order.promo}</dt>
                              <dd className="num">− {egp(order.discount)}</dd>
                            </div>
                          )}
                          <div className="flex justify-between text-ink-soft">
                            <dt>التوصيل</dt>
                            <dd className="num">
                              {order.delivery === 0 ? "مجاني" : egp(order.delivery)}
                            </dd>
                          </div>
                          <div className="flex justify-between border-t border-line pt-2 text-[13.5px] font-medium text-ink">
                            <dt>الإجمالي كاش</dt>
                            <dd className="num">{egp(order.total)}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
                            العنوان
                          </p>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-ink">
                            {order.customer.address}
                            {order.customer.landmark && (
                              <span className="text-ink-soft"> — {order.customer.landmark}</span>
                            )}
                          </p>
                          <p className="num mt-1.5 text-[11.5px] text-ember">
                            وقت التسليم: {order.customer.slot} · {order.eta}
                          </p>
                        </div>
                        {order.customer.notes && (
                          <div className="rounded-xl border border-line bg-paper p-3">
                            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
                              ملاحظات الزبون
                            </p>
                            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink">
                              {order.customer.notes}
                            </p>
                          </div>
                        )}
                        <a
                          href={`tel:2${order.customer.phone}`}
                          className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[12px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                        >
                          <Phone className="size-3.5" />
                          اتصل بالزبون
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
