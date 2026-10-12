import * as React from "react";
import { cn } from "@/lib/utils";

export type Status = "critical" | "warning" | "info" | "success";

const tones: Record<Status, { chip: string; dot: string; label: string }> = {
  critical: {
    chip: "bg-error-badge text-badge",
    dot: "bg-error-icon",
    label: "Critical",
  },
  warning: {
    chip: "bg-warning-badge text-badge",
    dot: "bg-warning-icon",
    label: "Warning",
  },
  /* An "Info" priority is a severity level, not a system message. */
  info: {
    chip: "bg-info-badge text-badge",
    dot: "bg-info-icon",
    label: "Info",
  },
  success: {
    chip: "bg-success-badge text-badge",
    dot: "bg-success-icon",
    label: "Healthy",
  },
};

export type StatusBadgeProps = React.ComponentProps<"span"> & {
  status: Status;
  /** Overrides the default label ("Critical", "Warning", …). */
  label?: string;
  /** `dot` drops the pill and shows only the indicator plus text. */
  variant?: "chip" | "dot";
};

export function StatusBadge({
  status,
  label,
  variant = "chip",
  className,
  ...props
}: StatusBadgeProps) {
  const tone = tones[status];
  const text = label ?? tone.label;

  if (variant === "dot") {
    return (
      <span
        className={cn(
          "type-body-md inline-flex items-center gap-1.5 text-secondary",
          className
        )}
        {...props}
      >
        <span aria-hidden className={cn("size-1.5 rounded-full", tone.dot)} />
        {text}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full px-2.5 py-0.5",
        "text-caption font-medium text-badge",
        tone.chip,
        className
      )}
      {...props}
    >
      {text}
    </span>
  );
}
