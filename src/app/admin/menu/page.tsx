import type { Metadata } from "next";
import { MenuManager } from "@/components/admin/menu-manager";
import { listMenu } from "@/lib/server/store";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const dishes = await listMenu();
  return <MenuManager initial={dishes} />;
}
