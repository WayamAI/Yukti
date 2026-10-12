import * as React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricCard } from "@/components/ui/metric-card";
import { DriverCard } from "@/components/dashboard/driver-card";
import type { Incident } from "@/lib/dashboard-data";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";

const feedDot: Record<Incident["status"], string> = {
  critical: "bg-error-icon",
  warning: "bg-warning-icon",
  info: "bg-neutral-icon",
  success: "bg-success-icon",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="label-caps mb-2">{children}</h3>;
}

/** Muted stand-in for the live vehicle feed. */
function VehiclePreview({ feedTone }: { feedTone: string }) {
  return (
    <div className="surface-card relative aspect-16/9 overflow-hidden rounded-lg bg-[radial-gradient(80%_70%_at_50%_35%,var(--surface-raised)_0%,var(--surface-container)_75%)]">
      {/* Vehicle illustration — strokes come from the stroke ladder so the
          line-art follows the theme. */}
      <svg
        className="absolute inset-0 size-full p-6"
        viewBox="0 0 200 90"
        fill="none"
        aria-hidden
      >
        <g stroke="var(--stroke-default)" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M18 62 L28 34 Q31 28 38 28 L150 28 Q160 28 168 36 L182 52 Q184 55 184 60 L184 66 L18 66 Z" />
          <path d="M40 32 L44 48 L96 48 L96 32 Z" fill="var(--stroke-disabled)" />
          <path d="M104 32 L104 48 L156 48 L146 34 Q144 32 140 32 Z" fill="var(--stroke-disabled)" />
        </g>
        <g stroke="var(--stroke-active)" strokeWidth="1.5">
          <circle cx="62" cy="66" r="10" />
          <circle cx="152" cy="66" r="10" />
        </g>
        <path d="M8 74 H 192" stroke="var(--stroke-muted)" strokeWidth="2" />
      </svg>

      <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-md border border-muted bg-scrim px-1.5 py-0.5 type-caption text-secondary backdrop-blur-sm">
        <span
          aria-hidden
          className={cn(
            "size-1.5 animate-pulse rounded-full",
            feedTone
          )}
        />
        Live feed
      </span>
      <span className="absolute right-2 bottom-2 rounded-md border border-muted bg-scrim px-1.5 py-0.5 type-caption text-tertiary tabular-nums backdrop-blur-sm">
        CAM-02
      </span>
    </div>
  );
}

export function IncidentPanel({
  incident,
  className,
  onClose,
}: {
  incident: Incident;
  className?: string;
  /** Rendered as a close affordance in the drawer presentation. */
  onClose?: () => void;
}) {
  return (
    <aside
      aria-label={`Incident details for ${incident.id}`}
      className={cn(
        "flex h-full min-h-0 flex-col border-l border-muted bg-container",
        className
      )}
    >
      <header className="flex items-start justify-between gap-2 border-b border-muted px-4 py-3.5">
        <div className="min-w-0">
          <h2 className="type-heading-sm truncate text-primary">
            {incident.id}: Incident
          </h2>
          <StatusBadge status={incident.status} className="mt-1.5" />
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close incident details"
            className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-lg text-tertiary transition-colors duration-150 hover:bg-raised hover:text-primary"
          >
            <AppIcon name="close" size="md" aria-hidden />
          </button>
        )}
      </header>

      <div
        className={cn(
          "scrollbar-thin min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4",
          "[mask-image:linear-gradient(to_bottom,transparent_0,#000_1rem,#000_calc(100%-1.25rem),transparent_100%)]"
        )}
      >
        <p className="type-body-md flex items-start gap-1.5 text-secondary">
          <AppIcon name="location" className={cn( "mt-px size-3.5 shrink-0", incident.status === "critical" ? "text-error-icon" : "text-tertiary" )} aria-hidden />
          <span>
            Incident detected:{" "}
            <span className="text-primary">{incident.location}</span>
          </span>
        </p>

        <VehiclePreview feedTone={feedDot[incident.status]} />

        <section>
          <SectionLabel>Driver</SectionLabel>
          <DriverCard
            name={incident.driver.name}
            role={incident.driver.role}
            initials={incident.driver.initials}
            conciergeActive={incident.conciergeActive}
          />
        </section>

        <section>
          <SectionLabel>Telemetry Data</SectionLabel>

          <div className="surface-card mb-2 rounded-lg px-3 py-2.5">
            <p className="type-caption text-tertiary">Primary Issue:</p>
            <p className="type-body-md mt-1 text-primary">
              {incident.primaryIssue}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {incident.telemetry.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                tone={metric.tone}
                note={metric.note}
              />
            ))}
          </div>
        </section>
      </div>

      <footer className="space-y-2 border-t border-muted px-4 py-3.5">
        <button
          type="button"
          className={cn(
            "type-label-md h-9 w-full rounded-full bg-action-primary text-action-primary-content",
            "transition-[background-color,transform] duration-200 hover:bg-action-primary-hover active:bg-action-primary-focused active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-container"
          )}
        >
          {incident.primaryAction}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <SecondaryAction icon="externalLink">View Profile</SecondaryAction>
          <SecondaryAction icon="insurance">Insurance Claim</SecondaryAction>
        </div>
      </footer>
    </aside>
  );
}

function SecondaryAction({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-muted bg-raised px-2",
        "type-label-sm text-secondary transition-colors duration-200",
        "hover:border-default hover:bg-raised-2 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <AppIcon name={icon} size="sm" />
      <span className="truncate">{children}</span>
    </button>
  );
}
