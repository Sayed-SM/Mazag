"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const btn =
    "inline-flex items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line";
  const dim = size === "sm" ? "size-8" : "size-10";

  return (
    <div
      className="inline-flex items-center"
      role="group"
      aria-label={label ?? "الكمية"}
      dir="ltr"
    >
      <button
        type="button"
        className={cn(btn, dim)}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="قلل الكمية"
      >
        <Minus className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "num inline-flex items-center justify-center border-y border-line",
          size === "sm" ? "h-8 w-9 text-sm" : "h-10 w-12 text-base",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(btn, dim)}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="زود الكمية"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
