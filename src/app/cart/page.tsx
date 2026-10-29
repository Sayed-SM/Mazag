import type { Metadata } from "next";
import { CartView } from "@/components/site/cart-view";

export const metadata: Metadata = {
  title: "السلة",
  description: "راجع طلبك قبل الدفع عند الاستلام.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
