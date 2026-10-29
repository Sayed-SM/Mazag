import { cn } from "@/lib/utils";

type Variant = "lemonade" | "cola" | "water";

function variantFor(slug: string): Variant {
  if (slug.includes("lemon")) return "lemonade";
  if (slug.includes("cola")) return "cola";
  if (slug.includes("water")) return "water";
  return "lemonade";
}

/**
 * Line-art stand-in for drinks that have no photography.
 * Keeps the menu grid visually consistent instead of showing an empty plate.
 */
export function DrinkArt({
  slug,
  nameEn,
  className,
}: {
  slug: string;
  nameEn: string;
  className?: string;
}) {
  const variant = variantFor(slug);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-sand",
        className,
      )}
      role="img"
      aria-label={nameEn}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--ink) 20%, transparent) 0.7px, transparent 0.7px)",
          backgroundSize: "15px 15px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-[78%] w-[78%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--cream) 92%, transparent) 0%, transparent 68%)",
        }}
      />

      <svg
        viewBox="0 0 160 160"
        aria-hidden="true"
        className="relative h-[74%] w-auto max-w-[80%]"
        fill="none"
      >
        {/* counter line */}
        <path
          d="M34 136h92"
          stroke="var(--ink)"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {variant === "lemonade" && (
          <g>
            <path
              d="M104 32 90 82"
              stroke="var(--ink)"
              strokeOpacity="0.55"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M57 66h46l-5 58a7 7 0 0 1-7 6H69a7 7 0 0 1-7-6Z"
              fill="var(--cream)"
              fillOpacity="0.75"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M59 88h42l-4 36a5 5 0 0 1-5 5H68a5 5 0 0 1-5-5Z"
              fill="var(--olive)"
              fillOpacity="0.5"
            />
            <rect
              x="70"
              y="96"
              width="13"
              height="13"
              rx="3"
              transform="rotate(-14 76 102)"
              fill="var(--cream)"
              fillOpacity="0.7"
            />
            <rect
              x="86"
              y="108"
              width="11"
              height="11"
              rx="3"
              transform="rotate(12 91 113)"
              fill="var(--cream)"
              fillOpacity="0.55"
            />
            <ellipse
              cx="99"
              cy="58"
              rx="9"
              ry="5"
              transform="rotate(-32 99 58)"
              fill="var(--olive)"
              fillOpacity="0.85"
            />
            <ellipse
              cx="108"
              cy="50"
              rx="8"
              ry="4.5"
              transform="rotate(18 108 50)"
              fill="var(--olive)"
              fillOpacity="0.6"
            />
            <path
              d="M63 78h34"
              stroke="var(--cream)"
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />
          </g>
        )}

        {variant === "cola" && (
          <g>
            <rect
              x="71"
              y="24"
              width="18"
              height="9"
              rx="2.5"
              fill="var(--ember)"
              fillOpacity="0.85"
            />
            <path
              d="M75 33h10v14c0 5 3 7 8 12s7 10 7 18v50a8 8 0 0 1-8 8H68a8 8 0 0 1-8-8V77c0-8 2-13 7-18s8-7 8-12Z"
              fill="var(--ink)"
              fillOpacity="0.82"
            />
            <path
              d="M66 88h28v33H66Z"
              fill="var(--cream)"
              fillOpacity="0.9"
            />
            <path
              d="M70 95h20M70 101h14M70 112h20"
              stroke="var(--ink)"
              strokeOpacity="0.3"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="79" cy="62" r="2" fill="var(--cream)" fillOpacity="0.35" />
            <circle cx="86" cy="72" r="1.4" fill="var(--cream)" fillOpacity="0.3" />
            <circle cx="88" cy="57" r="1.1" fill="var(--cream)" fillOpacity="0.28" />
            <path
              d="M73 40v6"
              stroke="var(--cream)"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {variant === "water" && (
          <g>
            <path
              d="M67 44h26l-3 86a6 6 0 0 1-6 5H76a6 6 0 0 1-6-5Z"
              fill="var(--cream)"
              fillOpacity="0.55"
              stroke="var(--ink)"
              strokeOpacity="0.42"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M68.5 66h23l-2.6 63a5 5 0 0 1-5 4.6H76a5 5 0 0 1-5-4.6Z"
              fill="var(--ink)"
              fillOpacity="0.1"
            />
            <path
              d="M68.4 78c5-4 10 4 15 0s7-3 8.6-1"
              stroke="var(--ember)"
              strokeOpacity="0.5"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="77" cy="96" r="1.6" fill="var(--ink)" fillOpacity="0.24" />
            <circle cx="84" cy="108" r="1.2" fill="var(--ink)" fillOpacity="0.2" />
            <circle cx="76" cy="118" r="1.1" fill="var(--ink)" fillOpacity="0.18" />
            <path
              d="M72 56v14"
              stroke="var(--cream)"
              strokeOpacity="0.6"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      <span className="absolute bottom-3 start-4 font-mono text-[8.5px] uppercase tracking-[0.26em] text-ink-soft/70">
        Mazag bar
      </span>
      <span className="absolute bottom-3 end-4 font-mono text-[8.5px] uppercase tracking-[0.22em] text-ink-soft/70">
        {nameEn}
      </span>
    </div>
  );
}
