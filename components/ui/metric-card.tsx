import * as React from "react";
import { cn } from "@/lib/utils";
import type { Status } from "@/components/ui/status-badge";

const valueTones: Record<Status | "neutral", string> = {
  neutral: "text-primary",
  critical: "text-error",
  warning: "text-warning",
  info: "text-primary",
  success: "text-success",
};

export type MetricCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  /** Tints the value only; the surface stays neutral so a grid reads calmly. */
  tone?: Status | "neutral";
  /** Small caption under the value, e.g. "above threshold". */
  note?: string;
  className?: string;
};

export function MetricCard({
  label,
  value,
  unit,
  tone = "neutral",
  note,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1.5 rounded-lg border border-muted bg-container px-4 py-3.5 transition-colors duration-200 hover:bg-raised",
        className
      )}
    >
      <p className="truncate text-caption text-quaternary">
        {label}
      </p>
      <p className="flex items-baseline gap-0.5">
        <span
          className={cn(
            "font-display text-display-xl leading-none tabular-nums sm:text-display-2xl",
            valueTones[tone]
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="text-caption leading-none text-tertiary">
            {unit}
          </span>
        )}
      </p>
      {note && (
        <p className="mt-1 truncate text-caption leading-none text-quaternary">
          {note}
        </p>
      )}
    </div>
  );
}
