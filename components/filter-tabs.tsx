"use client";

import { cn } from "@/lib/utils";

export function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="-mx-1 flex flex-wrap gap-1.5 overflow-x-auto px-1 pb-0.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-label-sm",
            "outline-none transition-colors duration-[150ms] focus-visible:ring-2 focus-visible:ring-active",
            value === opt
              ? "border-transparent bg-action-primary text-on-color"
              : "border-muted bg-action text-tertiary hover:border-default hover:bg-raised-2 hover:text-secondary"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
