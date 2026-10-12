import * as React from "react";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";

export function DriverCard({
  name,
  role,
  initials,
  /** Shows the AI Concierge status line under the identity row. */
  conciergeActive = false,
  className,
}: {
  name: string;
  role: string;
  initials: string;
  conciergeActive?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("surface-card rounded-lg p-3", className)}>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="type-caption flex size-8 shrink-0 items-center justify-center rounded-full border border-default bg-raised-2 font-medium text-secondary"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="type-body-md truncate font-medium text-primary">{name}</p>
          <p className="type-caption truncate text-tertiary">{role}</p>
        </div>
      </div>

      {conciergeActive && (
        <p className="type-caption mt-2.5 flex items-center gap-1.5 border-t border-muted pt-2.5 text-secondary">
          <AppIcon name="sparkle" size="xs" tone="success" aria-hidden />
          AI Concierge is active
          <span
            aria-hidden
            className="ml-auto size-1.5 animate-pulse rounded-full bg-success-icon"
          />
        </p>
      )}
    </div>
  );
}
