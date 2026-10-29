import type { Metadata } from "next";
import Link from "next/link";
import { AdminBar } from "@/components/admin/admin-bar";

export const metadata: Metadata = {
  title: { absolute: "لوحة التحكم · أكله بمزاج" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-dvh bg-cream text-ink">
      <AdminBar />
      <main id="admin-main" className="mx-auto max-w-[1440px] px-[clamp(1rem,3vw,2.5rem)] py-8 lg:py-10">
        {children}
      </main>
      <footer className="mx-auto max-w-[1440px] px-[clamp(1rem,3vw,2.5rem)] pb-8">
        <p className="border-t border-line pt-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-soft">
          Mazag Admin · بدون ربط قاعدة بيانات لسه — البيانات في طبقة التخزين
        </p>
      </footer>
      <Link href="/" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        العودة للموقع
      </Link>
    </div>
  );
}
