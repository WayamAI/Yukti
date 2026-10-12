"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type FilterChipProps = React.ComponentProps<"button"> & {
  label: string;
  /** Optional trailing count, rendered in a dimmer weight. */
  count?: number;
  selected?: boolean;
  /** Tints the leading dot only — the chip surface itself stays neutral. */
  tone?: "neutral" | "critical" | "warning" | "info" | "success";
};

const dotTones: Record<NonNullable<FilterChipProps["tone"]>, string> = {
  neutral: "bg-neutral-icon",
  critical: "bg-error-icon",
  warning: "bg-warning-icon",
  info: "bg-neutral-icon",
  success: "bg-success-icon",
};

export function FilterChip({
  label,
  count,
  selected = false,
  tone = "neutral",
  className,
  type = "button",
  ...props
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "group inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5",
        "type-label-md leading-none whitespace-nowrap",
        "transition-[color,background-color,border-color] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-default bg-raised-2 text-primary"
          : "border-muted bg-raised text-secondary hover:bg-raised-2 hover:text-primary",
        className
      )}
      {...props}
    >
      {tone !== "neutral" && (
        <span
          aria-hidden
          className={cn("size-1.5 shrink-0 rounded-full", dotTones[tone])}
        />
      )}
      <span className="font-medium">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "tabular-nums transition-colors duration-200",
            selected ? "text-secondary" : "text-tertiary group-hover:text-secondary"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
