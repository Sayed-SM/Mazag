import "server-only";

import { site } from "@/lib/site";
import type { Order } from "@/lib/orders";

/**
 * WhatsApp notifications for the admin.
 *
 * ⇄ PRODUCTION SWAP POINT: `sendToAdmin` currently prepares a wa.me deep
 * link (zero-cost, works in dev and on any device with WhatsApp installed).
 * When the Meta Cloud API credentials are added to the env
 * (`WHATSAPP_TOKEN` + `WHATSAPP_PHONE_ID`), the same function sends the
 * message *server-side* automatically — callers don't change.
 */

const STATUS_LABEL: Record<Order["status"], string> = {
  received: "طلب جديد — تم الاستلام",
  kitchen: "الطلب دخل المطبخ",
  courier: "الطلب خرج مع الطيار",
  delivered: "الطلب اتسلّم",
};

/** Admin's WhatsApp number (international format, no +). */
const ADMIN_PHONE = process.env.ADMIN_WHATSAPP ?? site.phone;

export function orderMessage(order: Order): string {
  const lines = [
    `🔔 ${STATUS_LABEL[order.status]}`,
    `رقم الطلب: ${order.id}`,
    `العميل: ${order.customer.name} — ${order.customer.phone}`,
    `العنوان: ${order.customer.area} — ${order.customer.address}`,
    `الأصناف: ${order.items.map((i) => `${i.nameAr} ×${i.qty}`).join("، ")}`,
    `الإجمالي: ${order.total} ج.م (${order.customer.slot})`,
  ];
  return lines.join("\n");
}

export function waLink(text: string): string {
  return `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Sends an order status update to the admin's WhatsApp.
 * Returns the deep link so the UI can offer it as a fallback action.
 */
export async function sendToAdmin(order: Order): Promise<{ ok: boolean; link: string }> {
  const text = orderMessage(order);
  const link = waLink(text);

  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (token && phoneId) {
    try {
      const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ADMIN_PHONE,
          type: "text",
          text: { body: text },
        }),
      });
      return { ok: res.ok, link };
    } catch {
      /* fall through to the deep link */
    }
  }
  return { ok: false, link };
}
