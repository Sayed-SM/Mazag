"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Site chrome (header + footer) around the public pages.
 * The admin area renders bare — no site navigation, no public entry point.
 */
export function Chrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
