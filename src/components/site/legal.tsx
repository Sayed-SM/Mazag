export function LegalSection({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-6">
      <div className="flex items-baseline gap-4">
        <span className="num shrink-0 text-[11px] text-ember">{n}</span>
        <div className="min-w-0">
          <h2 className="font-display text-[17px] leading-snug">{title}</h2>
          <div className="mt-3 space-y-3 text-[13.5px] leading-[1.95] text-ink-soft">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pt-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-ember/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-s-2 border-line ps-4 text-[12.5px] leading-[1.9] text-ink-soft">
      {children}
    </p>
  );
}
