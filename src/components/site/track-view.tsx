"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { getOrder, STATUS_STEPS, type Order } from "@/lib/orders";
import { egp } from "@/lib/utils";

export function TrackView() {
  const [id, setId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setState] = React.useState<"idle" | "notfound" | "ok">("idle");
  const [order, setOrder] = React.useState<Order | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const found = getOrder(id.trim());
    if (!found || found.customer.phone !== phone.trim()) {
      setState("notfound");
      setOrder(null);
      return;
    }
    setOrder(found);
    setState("ok");
  }

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={submit} className="border border-line bg-paper p-6">
        <div className="grid gap-4">
          <div>
            <label htmlFor="orderId" className="mb-1.5 block text-[12px] font-medium">
              رقم الطلب
            </label>
            <input
              id="orderId"
              dir="ltr"
              value={id}
              onChange={(e) => setId(e.target.value.toUpperCase())}
              placeholder="MZ-260312-A7K2"
              className="h-11 w-full border border-line bg-cream px-3 font-mono text-[13px] uppercase focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="trackPhone" className="mb-1.5 block text-[12px] font-medium">
              الموبايل اللي طلبت بيه
            </label>
            <input
              id="trackPhone"
              type="tel"
              inputMode="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="01xxxxxxxxx"
              className="h-11 w-full border border-line bg-cream px-3 text-start text-[13px] focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 bg-ink text-[13px] font-medium text-cream transition-colors hover:bg-ember"
        >
          <Search className="size-4" />
          دوّر على الطلب
        </button>
      </form>

      {state === "notfound" && (
        <div className="mt-5 border border-ember/40 bg-ember/5 p-4 text-[12.5px] leading-relaxed text-ember">
          ملقيناش طلب بالرقم ده على الموبايل ده. راجع الرقم، أو كلّمنا على واتساب
          وهنشوفه من عندنا.
        </div>
      )}

      {state === "ok" && order && (
        <div className="mt-5 border border-line bg-paper p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
                {order.id}
              </p>
              <p className="mt-1 font-display text-lg">
                {STATUS_STEPS.find((s) => s.id === order.status)?.label}
              </p>
            </div>
            <span className="num text-[15px]">{egp(order.total)}</span>
          </div>

          <ol className="mt-5 space-y-3 border-t border-line pt-4">
            {STATUS_STEPS.map((step, index) => {
              const current = STATUS_STEPS.findIndex((s) => s.id === order.status);
              const done = index <= current;
              return (
                <li key={step.id} className="flex items-center gap-3">
                  <span
                    className={
                      done
                        ? "size-2 rounded-full bg-olive"
                        : "size-2 rounded-full bg-line"
                    }
                  />
                  <span className={done ? "text-[12.5px]" : "text-[12.5px] text-ink-soft"}>
                    {step.label}
                  </span>
                  <span className="ms-auto font-mono text-[10px] text-ink-soft">
                    {step.hint}
                  </span>
                </li>
              );
            })}
          </ol>

          <Link
            href={`/order/${order.id}`}
            className="mt-5 flex items-center justify-center gap-2 border border-ink py-2.5 text-[12.5px] hover:bg-ink hover:text-cream"
          >
            تفاصيل الطلب
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
