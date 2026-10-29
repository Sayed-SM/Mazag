import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Lightweight session gate for the admin area.
 *
 * The admin has no entry point anywhere on the public site — they open
 * `/admin` by hand and sign in with the shared password. The cookie is
 * httpOnly + signed, so it cannot be read or forged from the browser.
 *
 * ⇄ DB SWAP POINT: when auth moves to the database, replace `verifyPassword`
 * with a real credential check and the cookie payload with a session row /
 * JWT. The gate call-sites (`requireAdmin` in API routes, the guarded layout)
 * stay exactly as they are.
 */

export const ADMIN_COOKIE = "mazag_admin_session";

/** Change via ADMIN_PASSWORD in .env.local — fallback for first run. */
const PASSWORD = process.env.ADMIN_PASSWORD ?? "mazag2026";
const SECRET = process.env.ADMIN_COOKIE_SECRET ?? "mazag-dev-cookie-secret";

export function verifyPassword(input: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function signSession(): string {
  return crypto.createHmac("sha256", SECRET).update(PASSWORD).digest("hex");
}

export function isSessionValid(token: string | undefined): boolean {
  if (!token) return false;
  const expected = signSession();
  if (token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return isSessionValid(jar.get(ADMIN_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
