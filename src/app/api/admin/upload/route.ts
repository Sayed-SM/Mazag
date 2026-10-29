import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/admin-auth";

/**
 * Image upload for the admin menu form.
 *
 * Files land in `public/uploads/` and are served statically at `/uploads/<name>`.
 *
 * ⇄ PRODUCTION SWAP POINT: when the database lands, replace the local write
 * with Supabase Storage / S3 / R2 — the returned URL contract stays the same
 * (`{ url: "/uploads/…" }`), so the admin form doesn't change.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED: Record<string, { ext: string; sniff: (b: Uint8Array) => boolean }> = {
  "image/jpeg": {
    ext: "jpg",
    sniff: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  "image/png": {
    ext: "png",
    sniff: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  "image/webp": {
    ext: "webp",
    sniff: (b) =>
      b.slice(0, 4).join(",") === "82,73,70,70" && // RIFF
      b.slice(8, 12).join(",") === "87,69,66,80", // WEBP
  },
  "image/avif": {
    ext: "avif",
    // ftyp box at offset 4 with an avif-compatible brand
    sniff: (b) =>
      b.slice(4, 8).join(",") === "102,116,121,112" &&
      /avif|avis/.test(new TextDecoder().decode(b.slice(8, 16))),
  },
};

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "صيغة الطلب غير صحيحة" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "مفيش ملف" }, { status: 400 });
  }

  const allowed = ALLOWED[file.type];
  if (!allowed) {
    return NextResponse.json(
      { error: "النوع غير مدعوم — JPEG أو PNG أو WebP أو AVIF بس" },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "الصورة أكبر من ٥ ميجا" },
      { status: 413 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  // Content sniffing — the declared type must match the actual bytes.
  if (!allowed.sniff(new Uint8Array(bytes.subarray(0, 16)))) {
    return NextResponse.json(
      { error: "الملف محتواه مش زي اسمه — جرّب صورة تانية" },
      { status: 415 },
    );
  }

  const name = `dish-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.${allowed.ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), bytes);

  console.info("[mazag] image uploaded", name, bytes.length);
  return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
}
