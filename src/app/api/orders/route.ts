import { NextResponse } from "next/server";
import { z } from "zod";
import { totalsFor } from "@/lib/cart-math";
import { buildOrderId, toOrderItems, type Order } from "@/lib/orders";
import { findZone } from "@/lib/cart-math";
import { site } from "@/lib/site";
import { saveOrder, listMenu, listOrders } from "@/lib/server/store";
import { sendToAdmin } from "@/lib/server/notify";

const bodySchema = z.object({
  lines: z
    .array(
      z.object({
        dishId: z.string(),
        qty: z.number().int().min(1).max(20),
        meal: z.boolean(),
      }),
    )
    .min(1),
  zoneId: z.string(),
  promo: z.string().optional().default(""),
  customer: z.object({
    name: z.string().min(3).max(60),
    phone: z.string().regex(/^01[0125][0-9]{8}$/),
    area: z.string().min(2).max(40),
    address: z.string().min(10).max(200),
    landmark: z.string().max(80).optional(),
    notes: z.string().max(300).optional(),
    slot: z.string().min(1),
  }),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "صيغة الطلب غير صحيحة" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "بيانات ناقصة أو غير صحيحة", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { lines, zoneId, promo, customer } = parsed.data;

  // Live menu from the data layer (admin additions included).
  const menu = await listMenu();

  const unknown = lines.find((l) => !menu.some((d) => d.id === l.dishId));
  if (unknown) {
    return NextResponse.json({ error: "صنف غير موجود" }, { status: 422 });
  }

  // Server recomputes every number. Client prices are never trusted.
  const totals = totalsFor(lines, menu, { zoneId, promo });

  if (totals.subtotal < site.minOrder) {
    return NextResponse.json(
      { error: `الحد الأدنى للطلب ${site.minOrder} ج.م` },
      { status: 422 },
    );
  }

  const id = buildOrderId();
  const zone = findZone(zoneId);

  // Persist to the data layer — this is what the admin dashboard reads.
  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    items: toOrderItems(lines, menu),
    subtotal: totals.subtotal,
    discount: totals.discount,
    delivery: totals.delivery,
    total: totals.total,
    promo,
    customer: { ...customer, zoneId: zone.id },
    status: "received",
    eta: zone.eta,
  };
  await saveOrder(order);

  // 🔔 WhatsApp ping to the admin's number for every new order.
  await sendToAdmin(order);

  // This is where a Supabase insert / Sheets webhook / printer job would go.
  console.info("[mazag] order created", id, totals.total);

  return NextResponse.json({
    id,
    totals,
    eta: zone.eta,
    zoneLabel: zone.label,
  });
}

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ ok: true, count: orders.length });
}
