import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { MenuBrowser } from "@/components/site/menu-browser";
import { listMenu } from "@/lib/server/store";

export const metadata: Metadata = {
  title: "المنيو",
  description:
    "منيو أكله بمزاج كامل: المنقل، البخار، الكوشة، والمقبلات. أسعار شاملة الضريبة، والحد الأدنى للطلب ١٥٠ ج.م.",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const dishes = await listMenu();
  return (
    <>
      <PageHeader
        eyebrow="المنيو · DROP ٠١"
        title="كل حاجة بنطبخها، ومكتوب جنبها كل حاجة."
        note="الأسعار شاملة الضريبة. كل صنف مكتوب فيه الوزن التقريبي والوقت اللي بياخده في المطبخ. الأصناف اللي فيها مكسرات أو جلوتين متعلّمة في صفحتها."
        meta={`${dishes.length} صنف · 6 أقسام · حد أدنى 150 ج.م`}
      />
      <div className="shell pb-20">
        <MenuBrowser dishes={dishes} />
      </div>
    </>
  );
}
