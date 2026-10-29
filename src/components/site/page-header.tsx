import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  note,
  meta,
  className,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  note?: string;
  meta?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("border-b border-line", className)}>
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="eyebrow">{eyebrow}</p>
          {meta && (
            <>
              <span aria-hidden="true" className="h-px w-7 bg-line" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {meta}
              </p>
            </>
          )}
        </div>
        <div className="mt-4">
          <h1 className="max-w-[24ch] text-display">
            {title}
          </h1>
          {note && (
            <p className="mt-4 max-w-[56ch] text-[14.5px] leading-[1.9] text-ink-soft">
              {note}
            </p>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
