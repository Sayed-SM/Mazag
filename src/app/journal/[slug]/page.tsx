import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { getPost, posts } from "@/content/journal";
import { dishes } from "@/lib/menu";
import { DishCard } from "@/components/site/dish-card";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "مقال غير موجود" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedDish = dishes.find((d) => d.id === post.related);
  const other = posts.find((p) => p.slug !== post.slug);

  return (
    <>
      <div className="shell pt-6">
        <nav className="flex items-center gap-2 text-[11.5px] text-ink-soft">
          <Link href="/journal" className="hover:text-ink">
            دفتر المطبخ
          </Link>
          <ChevronLeft className="size-3" />
          <span className="line-clamp-1 text-ink">{post.title}</span>
        </nav>
      </div>

      <div className="shell">
        <article className="mx-auto max-w-[46rem] py-12">
          <header>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              <span>{post.date}</span>
              <span className="size-1 rounded-full bg-ember" />
              <span>{post.readingTime}</span>
            </p>
            <h1 className="mt-4 text-h1">
              {post.title}
            </h1>
            <p className="mt-5 border-s-2 border-line ps-4 text-[15px] leading-[1.9] text-ink-soft">
              {post.excerpt}
            </p>
          </header>

          <div className="mt-10 space-y-6 border-t border-line pt-9">
            {post.body.map((paragraph, index) => (
              <p key={index} className="text-[15.5px] leading-[2.05] text-ink/90">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="my-10 border-s-2 border-ember ps-5">
            <p className="font-display text-lead">
              {post.quote}
            </p>
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-ink-soft">
            <p className="max-w-[44ch] leading-relaxed">
              الكتابة جوه المطبخ، بين أوردر وأوردر. لو لقيت غلطة، قول لنا على
              واتساب وهنصحّحها.
            </p>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em]">
              Mazag&nbsp;/&nbsp;دفتر المطبخ
            </span>
          </div>
        </article>
      </div>

      {relatedDish && (
        <section className="border-y border-line bg-sand/35">
          <div className="shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">على المنقل</p>
              <h2 className="mt-3 max-w-[24ch] text-h2">
                الحاجة اللي بنتكلم عنها
              </h2>
              <p className="mt-4 max-w-[42ch] text-[13.5px] leading-[1.9] text-ink-soft">
                لو الموضوع فتح نفسك، الصنف ده هو أقرب حاجة ليه على المنيو — بيتطبخ
                بعد ما تطلب، مش قبلها.
              </p>
              <Link
                href={`/dish/${relatedDish.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-medium text-ember underline-offset-4 hover:underline"
              >
                شوف الصنف
                <ArrowLeft className="size-3.5" />
              </Link>
            </div>
            <div className="w-full max-w-xs lg:justify-self-end">
              <DishCard dish={relatedDish} />
            </div>
          </div>
        </section>
      )}

      <div className="shell pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link href="/journal" className="link-u text-[13px] font-medium">
            <ArrowLeft className="size-4 rotate-180" />
            كل المقالات
          </Link>
          {other && (
            <Link
              href={`/journal/${other.slug}`}
              className="max-w-[40ch] text-end text-[12.5px] text-ink-soft hover:text-ink"
            >
              المقالة التالية: <span className="text-ink">{other.title}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
