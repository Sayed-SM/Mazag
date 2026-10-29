"use client";

import * as React from "react";

const PHRASES = [
  "بنطبخ بعد الطلب",
  "٣٥ دقيقة متوسط التوصيل",
  "دفع عند الاستلام",
  "تغليف حراري",
  "شحن مجاني فوق ٤٠٠ ج.م",
  "منيو جديد كل أسبوع",
];

/* Each half is long enough to cover an ultra-wide viewport on its own. */
const REPEATS = 4;

export function ServiceRibbon() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pausedRef = React.useRef(false);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const parts = Array.from(
      track.querySelectorAll<HTMLElement>("[data-mq-part]"),
    );
    if (parts.length < 2) return;

    const rtl = getComputedStyle(track).direction === "rtl";
    const direction = rtl ? 1 : -1;
    const speed = 42; // px per second, same pace as the reference ribbon
    let width = parts[0].getBoundingClientRect().width;
    let offset = 0;
    let last = performance.now();
    let raf = 0;

    const measure = () => {
      width = parts[0].getBoundingClientRect().width;
      offset %= width || 1;
    };

    const tick = (now: number) => {
      const delta = Math.min(now - last, 80);
      last = now;

      if (!pausedRef.current && width > 0) {
        offset = (offset + (speed * delta) / 1000) % width;
        track.style.transform = `translate3d(${direction * offset}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(parts[0]);
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      track.style.transform = "";
    };
  }, []);

  const half = Array.from({ length: REPEATS }, (_, repeat) =>
    PHRASES.map((phrase, index) => (
      <span key={`${repeat}-${index}`}>{phrase}</span>
    )),
  );

  return (
    <div
      className="ribbon-wrap"
      aria-hidden="true"
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="ribbon">
        <div className="mq" ref={trackRef}>
          <div className="mq-part" data-mq-part>
            {half}
          </div>
          <div className="mq-part" data-mq-part>
            {half}
          </div>
        </div>
      </div>
    </div>
  );
}
