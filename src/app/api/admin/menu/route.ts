import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/server/admin-auth";
import { addDish, listMenu, removeDish } from "@/lib/server/store";

const dishSchema = z.object({
  nameAr: z.string().min(2).max(60),
  nameEn: z.string().min(2).max(60),
  category: z.enum(["grill", "steam", "oven", "sides", "dessert", "drinks"]),
  price: z.number().int().min(1).max(10000),
  shortAr: z.string().min(2).max(120),
  longAr: z.string().max(400).optional().default(""),
  image: z
    .string()
    .max(500)
    .refine(
      (v) =>
        v === "" ||
        v.startsWith("/uploads/") ||
        /^https?:\/\//.test(v),
      "الصورة لازم تكون رابط http أو ملف مرفوع",
    )
    .default(""),
  prepMin: z.number().int().min(1).max(180).default(10),
  spice: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).default(0),
  tags: z.array(z.enum(["bestseller", "new", "spicy", "veg", "gf"])).default([]),
  slug: z.string().max(60).optional(),
});

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return NextResponse.json({ dishes: await listMenu() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "صيغة غير صحيحة" }, { status: 400 });
  }

  const parsed = dishSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "راجع بيانات الصنف", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { image, ...rest } = parsed.data;
  const dish = await addDish({
    ...rest,
    longAr: rest.longAr || rest.shortAr,
    image: image || undefined,
    allergens: [],
    ingredients: [],
    pairsWith: [],
  });

  return NextResponse.json({ dish }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "معرّف الصنف مطلوب" }, { status: 400 });
  }

  const removed = await removeDish(id);
  if (!removed) {
    return NextResponse.json({ error: "الصنف غير موجود" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
