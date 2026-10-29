import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { posts } from "@/content/journal";

export const metadata: Metadata = {
  title: "دفتر المطبخ",
  description:
    "ملاحظات من مطبخ أكله بمزاج: استراحة اللحمة، تخمير العجين، وتفاصيل صغيرة بتفرق في الطعم.",
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="دفتر المطبخ"
        title="ملاحظات بنكتبها عشان نفضل فاكرينها."
        note="مش مدونة وصفات. حاجات اتعلمناها بالغلط، وبنكتبها هنا عشان الفريق الجديد يقراها."
        meta={`${posts.length} مقالات`}
      />

      <div className="shell py-10">
        <div className="divide-y divide-line border-y border-line">
          {posts.map((post, index) => (
            <article key={post.slug} className="group">
              <Link
                href={`/journal/${post.slug}`}
                className="grid gap-4 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-start"
              >
                <p className="num text-[11px] text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    <span>{post.date}</span>
                    <span className="size-1 rounded-full bg-ember" />
                    <span>{post.readingTime}</span>
                  </p>
                  <h2 className="mt-3 max-w-[30ch] font-display text-h3 leading-snug group-hover:text-ember">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="hidden size-4 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:text-ember sm:block" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[12.5px] text-ink-soft">
          <p>مقالة جديدة كل أسبوعين تقريبًا. مفيش جدول ثابت.</p>
          <a
            href="https://wa.me/201001234567"
            className="text-ember underline-offset-4 hover:underline"
          >
            اقترح موضوع
          </a>
        </div>
      </div>
    </>
  );
}
