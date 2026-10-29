import type { Metadata } from "next";
import { CheckoutView } from "@/components/site/checkout-view";

export const metadata: Metadata = {
  title: "الدفع",
  description: "أكّد طلبك — الدفع كاش عند الاستلام.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
