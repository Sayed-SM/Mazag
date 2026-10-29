import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { TrackView } from "@/components/site/track-view";

export const metadata: Metadata = {
  title: "تتبّع الطلب",
  description: "اعرف طلبك وصل فين برقم الطلب والموبايل.",
  robots: { index: false, follow: true },
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="تتبّع"
        title="طلبك فين دلوقتي؟"
        note="اكتب رقم الطلب والموبايل اللي طلبت بيه. الطلبات اللي اتعملت من الجهاز ده بتظهر من غير ما تدوّر."
      />
      <div className="shell py-12">
        <TrackView />
      </div>
    </>
  );
}
