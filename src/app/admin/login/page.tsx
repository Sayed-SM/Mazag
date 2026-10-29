"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Flame, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError("كلمة السر مش صحيحة");
        setBusy(false);
      }
    } catch {
      setError("مفيش اتصال بالسيرفر");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-ember/15 text-ember">
            <Flame className="size-4" />
          </span>
          <div className="leading-none">
            <p className="font-display text-[1.15rem] font-extrabold tracking-tight text-ink">
              أكله بمزاج
            </p>
            <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.3em] text-ember/80">
              Admin Area
            </p>
          </div>
        </div>

        <h1 className="mt-8 font-display text-[1.6rem] font-bold leading-tight text-ink">
          ادخل لوحة التحكم
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
          المنطقة دي مش متاحة من الموقع الأساسي — بتفتح باللينك على طول.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="password" className="mb-2 block text-[12px] font-medium text-ink-soft">
              كلمة السر
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft/70" />
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                dir="ltr"
                className="h-12 w-full rounded-xl border border-line bg-cream/50 ps-11 pe-12 text-[14px] text-ink transition-colors placeholder:text-ink-soft/60 focus:border-ink focus:bg-paper focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
                className="absolute end-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-soft/70 transition-colors hover:text-ink"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-ember/40 bg-ember/10 px-3.5 py-2.5 text-[12px] text-ember-deep">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ember text-[13.5px] font-medium text-white transition-colors hover:bg-ember-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "بلحظة…" : "دخول"}
          </button>
        </form>

        <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">
          Mazag · Internal
        </p>
      </div>
    </div>
  );
}
