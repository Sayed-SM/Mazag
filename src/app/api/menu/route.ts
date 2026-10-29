import { NextResponse } from "next/server";
import { listMenu } from "@/lib/server/store";

/** Public live menu — the cart and checkout use it so admin additions price correctly. */
export async function GET() {
  const dishes = await listMenu();
  return NextResponse.json({ dishes });
}
