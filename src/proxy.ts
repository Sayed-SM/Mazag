import { NextResponse, type NextRequest } from "next/server";
import { isSessionValid } from "@/lib/server/admin-auth";

/**
 * Guards the whole admin area. There is no link to `/admin` anywhere on the
 * public site — the admin opens it by hand. Anything reaching for it without
 * a valid session cookie gets bounced to the login screen.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("mazag_admin_session")?.value;
    if (!isSessionValid(session)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
