import type { Metadata } from "next";
import { OrdersDashboard } from "@/components/admin/orders-dashboard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return (
    <>
      <div className="mb-7">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ember/80">
          Orders · لحظة بلحظة
        </p>
        <h1 className="mt-2.5 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight text-ink">
          الطلبات الواردة
        </h1>
        <p className="mt-1.5 max-w-[60ch] text-[13px] leading-relaxed text-ink-soft">
          كل طلب جديد بيوصل هنا وبتوصلك رسالة واتساب على رقمك. دوّس &quot;التالي&quot;
          عشان تحرّك الطلب في المراحل — كل مرحلة بتبعت إشعار.
        </p>
      </div>
      <OrdersDashboard />
    </>
  );
}
