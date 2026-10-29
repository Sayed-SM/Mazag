import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { MenuBrowser } from "@/components/site/menu-browser";
import { categories } from "@/lib/menu";
import { listMenu } from "@/lib/server/store";

export const dynamic = "force-dynamic";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return { title: "قسم غير موجود" };
  return {
    title: cat.label,
    description: cat.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  // Live menu — admin additions and removals included.
  const menu = await listMenu();
  const items = menu.filter((d) => d.category === cat.id);

  return (
    <>
      <PageHeader
        eyebrow={`${cat.counter} · ${cat.label}`}
        title={cat.blurb}
        note={`${items.length} أصناف في ${cat.label}. بنطبخها على الطلب، وبنغلّفها وهي سخنة.`}
      />

      <div className="shell pb-20 pt-2">
        <MenuBrowser initialCategory={cat.id} lockCategory dishes={menu} />
        <div className="mt-14 border-t border-line pt-6">
          <Link href="/menu" className="link-u text-[13px] font-medium">
            <ArrowLeft className="size-4 rotate-180" />
            رجوع للمنيو كامل
          </Link>
        </div>
      </div>
    </>
  );
}
