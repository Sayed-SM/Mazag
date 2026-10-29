import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/admin-auth";
import { listOrders } from "@/lib/server/store";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ orders });
}
