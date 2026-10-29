import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  sessionCookieOptions,
  signSession,
  verifyPassword,
} from "@/lib/server/admin-auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "صيغة غير صحيحة" }, { status: 400 });
  }

  if (!body.password || !verifyPassword(body.password)) {
    // Same generic error either way — no hints.
    return NextResponse.json({ error: "كلمة السر مش صحيحة" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, signSession(), sessionCookieOptions);
  return response;
}
