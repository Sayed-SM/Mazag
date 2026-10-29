"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, CookingPot, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "الطلبات", icon: ClipboardList },
  { href: "/admin/menu", label: "المنيو", icon: CookingPot },
];

export function AdminBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  // No chrome on the login screen — it stands alone.
  if (pathname === "/admin/login") return null;

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-[clamp(1rem,3vw,2.5rem)]">
        <Link href="/admin" className="flex flex-col leading-none">
          <span className="font-display text-[1.1rem] font-extrabold tracking-tight text-ink">
            أكله بمزاج
          </span>
          <span className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.3em] text-ember/80">
            Admin
          </span>
        </Link>

        <nav className="flex items-center gap-1.5">
          {tabs.map((tab) => {
            const active =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12.5px] transition-colors",
                  active
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:bg-sand hover:text-ink",
                )}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[11.5px] text-ink-soft transition-colors hover:border-ink hover:text-ink sm:inline-flex"
          >
            <Store className="size-3.5" />
            الموقع
          </a>
          <button
            type="button"
            onClick={logout}
            disabled={busy}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-ember px-4 text-[12px] font-medium text-white transition-colors hover:bg-ember-deep disabled:opacity-60"
          >
            <LogOut className="size-3.5" />
            خروج
          </button>
        </div>
      </div>
    </header>
  );
}
