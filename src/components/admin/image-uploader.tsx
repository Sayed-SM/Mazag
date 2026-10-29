"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePlus, Link2, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

type UploadState = "idle" | "uploading";

/**
 * Professional image picker for the admin menu form:
 * drag & drop or click to choose, instant local preview, upload with a
 * progress state, then the stored URL lands in `value`.
 * A paste-a-URL fallback stays available for remote images (Unsplash…).
 */
export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<UploadState>("idle");
  const [dragging, setDragging] = React.useState(false);
  const [showUrl, setShowUrl] = React.useState(false);
  const [urlDraft, setUrlDraft] = React.useState("");
  // Local preview while/after upload (object URL) — snappy before the file lands.
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function upload(file: File) {
    if (!ACCEPTED.includes(file.type)) {
      toast.error("النوع غير مدعوم", {
        description: "JPEG أو PNG أو WebP أو AVIF بس.",
      });
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`الصورة أكبر من ${MAX_MB} ميجا`);
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setState("uploading");

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "فشل الرفع");
      }
      onChange(data.url);
      setPreview(data.url); // swap blob preview for the stable URL
      toast.success("الصورة اترفعت", { description: "هيظهر للزباين على طول." });
    } catch (err) {
      setPreview(null);
      toast.error(err instanceof Error ? err.message : "مش قادرين نرفع الصورة");
    } finally {
      setState("idle");
    }
  }

  function pick(files: FileList | null) {
    const file = files?.[0];
    if (file) void upload(file);
  }

  function clear() {
    onChange("");
    setPreview(null);
    setShowUrl(false);
    setUrlDraft("");
  }

  const shown = preview ?? (value || null);

  return (
    <div className="space-y-2.5">
      {shown ? (
        /* ---------- uploaded / preview state ---------- */
        <div className="relative overflow-hidden rounded-xl border border-line bg-cream/50">
          <div className="flex items-center gap-4 p-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-sand">
              {shown ? (
                <Image
                  src={shown}
                  alt="معاينة الصورة"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] text-ink">
                {state === "uploading" ? "جاري الرفع…" : "الصورة جاهزة"}
              </p>
              <p
                dir="ltr"
                className="mt-1 truncate font-mono text-[10px] text-ink-soft"
              >
                {value || "…"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={state === "uploading"}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 text-[11.5px] text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
              >
                {state === "uploading" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="size-3.5" />
                )}
                تغيير
              </button>
              <button
                type="button"
                onClick={clear}
                aria-label="إزالة الصورة"
                className="flex size-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ember hover:bg-ember hover:text-white"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
          {state === "uploading" && (
            <div className="h-0.5 w-full overflow-hidden bg-sand-deep">
              <div className="h-full w-1/3 animate-pulse bg-ember" />
            </div>
          )}
        </div>
      ) : (
        /* ---------- dropzone ---------- */
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-7 text-center transition-colors",
            dragging
              ? "border-ember bg-ember/10"
              : "border-line bg-cream/50 hover:border-ink/40 hover:bg-paper",
          )}
        >
          {state === "uploading" ? (
            <Loader2 className="size-5 animate-spin text-ember" />
          ) : (
            <ImagePlus className="size-5 text-ink-soft" />
          )}
          <p className="text-[12.5px] text-ink">
            {state === "uploading"
              ? "جاري رفع الصورة…"
              : "اسحب الصورة هنا أو دوّس للاختيار"}
          </p>
          <p className="text-[10.5px] text-ink-soft">
            JPEG · PNG · WebP · AVIF — لحد {MAX_MB} ميجا
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(e) => {
          pick(e.target.files);
          e.target.value = "";
        }}
      />

      {/* ---------- URL fallback ---------- */}
      {showUrl ? (
        <div className="flex items-center gap-2">
          <input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            dir="ltr"
            placeholder="https://images.unsplash.com/…"
            className="h-10 w-full rounded-xl border border-line bg-cream/50 px-3.5 text-start text-[12.5px] text-ink transition-colors placeholder:text-ink-soft/60 focus:border-ink focus:bg-paper focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (!/^https?:\/\//.test(urlDraft.trim())) {
                toast.error("الرابط لازم يبدأ بـ https://");
                return;
              }
              onChange(urlDraft.trim());
              setPreview(urlDraft.trim());
              setShowUrl(false);
              setUrlDraft("");
            }}
            className="h-10 shrink-0 rounded-xl bg-ink px-4 text-[12px] font-medium text-cream transition-colors hover:bg-ember"
          >
            تطبيق
          </button>
          <button
            type="button"
            onClick={() => setShowUrl(false)}
            aria-label="إلغاء"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowUrl(true)}
          className="inline-flex h-8 items-center gap-1.5 text-[11.5px] text-ink-soft transition-colors hover:text-ink"
        >
          <Link2 className="size-3.5" />
          أو الصق رابط صورة من الإنترنت
        </button>
      )}
    </div>
  );
}
