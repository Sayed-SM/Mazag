"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { categories, type CategoryId, type Dish, type Tag } from "@/lib/menu";
import { cn, egp } from "@/lib/utils";
import { ImageUploader } from "./image-uploader";

const tagLabels: Record<Tag, string> = {
  bestseller: "الأكثر طلبًا",
  new: "جديد",
  spicy: "حار",
  veg: "نباتي",
  gf: "بدون جلوتين",
};

type Draft = {
  nameAr: string;
  nameEn: string;
  category: CategoryId;
  price: string;
  shortAr: string;
  image: string;
  prepMin: string;
  spice: 0 | 1 | 2 | 3;
  tags: Tag[];
};

const emptyDraft: Draft = {
  nameAr: "",
  nameEn: "",
  category: "grill",
  price: "",
  shortAr: "",
  image: "",
  prepMin: "10",
  spice: 0,
  tags: [],
};

export function MenuManager({ initial }: { initial: Dish[] }) {
  const [dishes, setDishes] = React.useState<Dish[]>(initial);
  const [draft, setDraft] = React.useState<Draft>(emptyDraft);
  const [formOpen, setFormOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [deleting, setDeleting] = React.useState<string | null>(null);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const price = Number(draft.price);
    if (!draft.nameAr.trim() || !draft.nameEn.trim() || !price || price < 1) {
      toast.error("الاسم والسعر مطلوبين");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr: draft.nameAr.trim(),
          nameEn: draft.nameEn.trim(),
          category: draft.category,
          price,
          shortAr: draft.shortAr.trim() || `${draft.nameAr.trim()} — متاح دلوقتي.`,
          longAr: draft.shortAr.trim(),
          image: draft.image.trim(),
          prepMin: Number(draft.prepMin) || 10,
          spice: draft.spice,
          tags: draft.tags,
        }),
      });
      const data = (await res.json()) as { dish?: Dish; error?: string };
      if (!res.ok || !data.dish) {
        toast.error(data.error ?? "مش قادرين نضيف الصنف");
        return;
      }
      setDishes((prev) => [...prev, data.dish!]);
      setDraft(emptyDraft);
      setFormOpen(false);
      toast.success(`اتضاف للمنيو: ${data.dish.nameAr}`, {
        description: "هيظهر للزباين على طول — لسه مش متصل بقاعدة البيانات.",
      });
    } catch {
      toast.error("مفيش اتصال بالسيرفر");
    } finally {
      setBusy(false);
    }
  }

  async function remove(dish: Dish) {
    if (deleting) return;
    const ok = window.confirm(`تحذف "${dish.nameAr}" من المنيو؟`);
    if (!ok) return;
    setDeleting(dish.id);
    try {
      const res = await fetch(`/api/admin/menu?id=${encodeURIComponent(dish.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setDishes((prev) => prev.filter((d) => d.id !== dish.id));
      toast.success(`اتحذف: ${dish.nameAr}`);
    } catch {
      toast.error("مش قادرين نحذف الصنف");
    } finally {
      setDeleting(null);
    }
  }

  const byCategory = categories.map((cat) => ({
    cat,
    items: dishes.filter((d) => d.category === cat.id),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ember/80">
            Menu · {dishes.length} صنف
          </p>
          <h1 className="mt-2.5 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight text-ink">
            إدارة المنيو
          </h1>
          <p className="mt-1.5 max-w-[60ch] text-[13px] leading-relaxed text-ink-soft">
            ضيف صنف جديد أو احذف واحد موجود — التغيير بيتعكس على منيو الموقع على طول.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-medium transition-colors",
            formOpen
              ? "border border-line text-ink-soft hover:border-ink hover:text-ink"
              : "bg-ember text-white hover:bg-ember-deep",
          )}
        >
          <Plus className={cn("size-4 transition-transform", formOpen && "rotate-45")} />
          {formOpen ? "إقفال" : "صنف جديد"}
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-2xl border border-line bg-paper p-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Field label="الاسم بالعربي *">
            <input
              value={draft.nameAr}
              onChange={(e) => set("nameAr", e.target.value)}
              className={inputCls}
              placeholder="برجر الفحم"
              maxLength={60}
            />
          </Field>
          <Field label="الاسم بالإنجليزي *">
            <input
              value={draft.nameEn}
              onChange={(e) => set("nameEn", e.target.value)}
              dir="ltr"
              className={cn(inputCls, "text-start")}
              placeholder="Charcoal Burger"
              maxLength={60}
            />
          </Field>
          <Field label="السعر (ج.م) *">
            <input
              value={draft.price}
              onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              dir="ltr"
              className={cn(inputCls, "num text-start")}
              placeholder="95"
            />
          </Field>
          <Field label="القسم">
            <select
              value={draft.category}
              onChange={(e) => set("category", e.target.value as CategoryId)}
              className={inputCls}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-paper">
                  {cat.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="وقت التحضير (دقيقة)">
            <input
              value={draft.prepMin}
              onChange={(e) => set("prepMin", e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              dir="ltr"
              className={cn(inputCls, "num text-start")}
            />
          </Field>
          <Field label="درجة الحرارة">
            <div className="flex gap-1.5">
              {([0, 1, 2, 3] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => set("spice", level)}
                  className={cn(
                    "h-11 flex-1 rounded-xl border text-[12px] transition-colors",
                    draft.spice === level
                      ? "border-ember bg-ember/10 text-ember"
                      : "border-line text-ink-soft hover:border-ink/40",
                  )}
                >
                  {level === 0 ? "عادي" : "🌶".repeat(level)}
                </button>
              ))}
            </div>
          </Field>
          <Field label="وصف قصير">
            <input
              value={draft.shortAr}
              onChange={(e) => set("shortAr", e.target.value)}
              className={inputCls}
              placeholder="١٦٠ جرام لحم على الفحم…"
              maxLength={120}
            />
          </Field>
          <Field label="صورة الصنف (اختياري)" className="sm:col-span-2">
            <ImageUploader value={draft.image} onChange={(url) => set("image", url)} />
          </Field>
          <Field label="شارات" className="sm:col-span-2 lg:col-span-3">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(tagLabels) as Tag[]).map((tag) => {
                const on = draft.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      set(
                        "tags",
                        on ? draft.tags.filter((t) => t !== tag) : [...draft.tags, tag],
                      )
                    }
                    className={cn(
                      "h-9 rounded-full border px-4 text-[11.5px] transition-colors",
                      on
                        ? "border-olive bg-olive text-cream"
                        : "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink",
                    )}
                  >
                    {tagLabels[tag]}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-cream transition-colors hover:bg-ember disabled:opacity-60"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              اضيف للمنيو
            </button>
            <p className="text-[11px] text-ink-soft">
              الصنف هيظهر في المنيو العام وصفحته الخاصة فورًا.
            </p>
          </div>
        </form>
      )}

      {/* grouped by category */}
      <div className="space-y-7">
        {byCategory.map(({ cat, items }) => (
          <section key={cat.id}>
            <div className="flex items-baseline gap-3 border-b border-line pb-3">
              <h2 className="font-display text-[15px] font-bold text-ink">{cat.label}</h2>
              <span className="num font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                {cat.counter} · {items.length}
              </span>
            </div>
            {items.length === 0 ? (
              <p className="pt-4 text-[12.5px] text-ink-soft">القسم ده فاضي.</p>
            ) : (
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((dish) => (
                  <li
                    key={dish.id}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-paper p-3 transition-colors hover:border-ink/40"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                      {dish.image ? (
                        <Image
                          src={dish.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-[10px] text-ink-soft">
                          صورة
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{dish.nameAr}</p>
                      <p className="num mt-0.5 text-[11px] text-ink-soft">
                        {egp(dish.price)}
                        {dish.tags.length > 0 && (
                          <span className="text-ink-soft/70">
                            {" "}
                            · {dish.tags.map((t) => tagLabels[t]).join("، ")}
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(dish)}
                      disabled={deleting === dish.id}
                      aria-label={`احذف ${dish.nameAr}`}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ember hover:bg-ember hover:text-white disabled:opacity-50"
                    >
                      {deleting === dish.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-cream/50 px-4 text-[13px] text-ink transition-colors placeholder:text-ink-soft/60 focus:border-ink focus:bg-paper focus:outline-none";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[11.5px] font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
