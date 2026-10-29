import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  note,
  href,
  linkLabel = "شوف الكل",
  className,
  align = "start",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  note?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-h2">{title}</h2>
        {note && (
          <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
            {note}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="link-u shrink-0 self-start pb-1 text-[13px] font-medium sm:self-auto"
        >
          {linkLabel}
          <ArrowLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
