import * as React from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";

export type HealthSegment = {
  key: "healthy" | "warning" | "critical";
  label: string;
  count: number;
};

const segmentColor: Record<HealthSegment["key"], string> = {
  healthy: "bg-success-icon",
  warning: "bg-warning-icon",
  critical: "bg-error-icon",
};

const dotColor: Record<HealthSegment["key"], string> = {
  healthy: "bg-success-icon",
  warning: "bg-warning-icon",
  critical: "bg-error-icon",
};

const TOTAL_TICKS = 44;

/**
 * Allocates ticks proportionally, but guarantees one tick to any non-empty
 * group so a single critical asset stays visible on the bar.
 */
function allocateTicks(segments: HealthSegment[]): HealthSegment["key"][] {
  const total = segments.reduce((sum, s) => sum + s.count, 0);
  if (total === 0) return [];

  const nonEmpty = segments.filter((s) => s.count > 0);
  const minor = nonEmpty.filter((s) => s.key !== "healthy");
  const reserved = minor.length;

  const ticks: HealthSegment["key"][] = [];
  for (const segment of nonEmpty) {
    const count =
      segment.key === "healthy"
        ? Math.max(1, TOTAL_TICKS - reserved)
        : Math.max(1, Math.round((segment.count / total) * TOTAL_TICKS));
    for (let i = 0; i < count && ticks.length < TOTAL_TICKS; i++) {
      ticks.push(segment.key);
    }
  }
  return ticks.slice(0, TOTAL_TICKS);
}

export function HealthScoreCard({
  score,
  delta,
  period = "Today",
  segments,
  className,
}: {
  score: number;
  /** Percentage-point change over the period; drives the up indicator. */
  delta: number;
  period?: string;
  segments: HealthSegment[];
  className?: string;
}) {
  const ticks = allocateTicks(segments);
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <article
      className={cn(
        "surface-float w-[18rem] rounded-lg p-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="type-label-md flex items-center gap-1.5 text-primary">
          <YuktiIcon name="target" size="lg" />
          Health Score
          <button
            type="button"
            aria-label="About the health score"
            className="text-tertiary transition-colors duration-150 hover:text-secondary"
          >
            <AppIcon name="info" size="sm" aria-hidden />
          </button>
        </h2>

        <button
          type="button"
          aria-haspopup="listbox"
          className={cn(
            "inline-flex h-6 items-center gap-1 rounded-md border border-muted bg-raised pr-1 pl-2",
            "type-label-sm text-secondary transition-colors duration-200",
            "hover:border-default hover:bg-raised-2 hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {period}
          <AppIcon name="chevronDown" size="xs" aria-hidden />
        </button>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <p className="type-display-metric text-primary">
          {score}
          <span className="type-heading-md text-secondary">%</span>
        </p>
        {delta !== 0 && (
          <p
            className={cn(
              "type-label-sm mb-1 inline-flex items-center gap-0.5 tabular-nums",
              delta > 0 ? "text-success-icon" : "text-error-icon"
            )}
          >
            <AppIcon name={delta < 0 ? "deltaDown" : "deltaUp"} size="sm" />
            {Math.abs(delta)}%
          </p>
        )}
      </div>

      <div
        role="img"
        aria-label={`${score}% healthy across ${total} assets`}
        className="mt-3.5 flex h-5 items-stretch gap-[3px]"
      >
        {ticks.map((key, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-[1px] opacity-80",
              segmentColor[key]
            )}
          />
        ))}
      </div>

      <dl className="mt-3.5 flex items-center gap-4">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", dotColor[segment.key])}
            />
            <dt className="type-body-sm text-tertiary">{segment.label}:</dt>
            <dd className="type-label-sm tabular-nums text-secondary">
              {segment.count}
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className={cn(
          "type-label-md mt-4 h-8 w-full rounded-lg border border-muted bg-raised text-secondary",
          "transition-colors duration-200 hover:border-default hover:bg-raised-2 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        See all assets
      </button>
    </article>
  );
}
