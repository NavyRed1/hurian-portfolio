"use client";

import { useEffect, useState } from "react";

type ProjectFormValues = {
  slug?: string;
  title?: string;
  short_description?: string;
  category?: string;
  github_url?: string;
  demo_url?: string;
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
  technologies?: string[];
};

/**
 * Shared create/edit form. Warns on navigation away with unsaved changes
 * (master prompt requirement: "unsaved-change protection").
 */
export function ProjectForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: ProjectFormValues;
  submitLabel: string;
}) {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (!dirty) return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  return (
    <form action={action} onChange={() => setDirty(true)} className="flex max-w-lg flex-col gap-4">
      <Field label="Title" name="title" defaultValue={initial?.title} required />
      <Field label="Slug" name="slug" defaultValue={initial?.slug} required pattern="[a-z0-9-]+" />
      <Field label="Short description" name="short_description" defaultValue={initial?.short_description} textarea required />
      <Field label="Category" name="category" defaultValue={initial?.category} required />
      <Field label="Technologies (comma-separated)" name="technologies" defaultValue={initial?.technologies?.join(", ")} />
      <Field label="GitHub URL" name="github_url" defaultValue={initial?.github_url} type="url" />
      <Field label="Demo URL" name="demo_url" defaultValue={initial?.demo_url} type="url" />
      <Field label="Sort order" name="sort_order" defaultValue={String(initial?.sort_order ?? 0)} type="number" />

      <label className="flex items-center gap-2 text-sm text-ink-dim">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured} />
        Featured on homepage
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-dim">
        <input type="checkbox" name="published" defaultChecked={initial?.published} />
        Published (visible to the public)
      </label>

      <button type="submit" className="glass-btn glass-btn-primary mt-2 justify-center">
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  pattern,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  pattern?: string;
  textarea?: boolean;
}) {
  const className = "rounded-btn border border-line bg-panel px-4 py-2.5 text-sm text-ink outline-none focus:border-sunset-3";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs font-medium text-ink-dim">{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} required={required} rows={3} className={className} />
      ) : (
        <input name={name} defaultValue={defaultValue} required={required} type={type} pattern={pattern} className={className} />
      )}
    </label>
  );
}
