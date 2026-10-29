import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/server/admin-auth";
import { getOrder, setOrderStatus } from "@/lib/server/store";
import { sendToAdmin } from "@/lib/server/notify";
import { STATUS_STEPS, type OrderStatus } from "@/lib/orders";

const bodySchema = z.object({ status: z.enum(["received", "kitchen", "courier", "delivered"]) });

type Params = { params: Promise<{ id: string }> };

/**
 * Advances an order's status and pings the admin's WhatsApp.
 * This is the hook the future order-status webhook will replace.
 */
export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "صيغة غير صحيحة" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "حالة غير صحيحة" }, { status: 422 });
  }

  const current = await getOrder(id);
  if (!current) {
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
  }

  const status: OrderStatus = parsed.data.status;
  const updated = await setOrderStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
  }

  // Notify the admin's WhatsApp about the transition (fire-and-forget-ish,
  // but awaited so the UI can show the fallback link when the API isn't wired).
  const notified = await sendToAdmin(updated);

  return NextResponse.json({
    order: updated,
    steps: STATUS_STEPS,
    notify: notified,
  });
}
