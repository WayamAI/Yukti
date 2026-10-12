"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { MapStage } from "@/components/dashboard/map-stage";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { IncidentPanel } from "@/components/dashboard/incident-panel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  defaultIncidentId,
  getIncident,
  healthSegments,
} from "@/lib/dashboard-data";
import type { ActionRow } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";

/**
 * Command-center layout: map, health score and the action queue in the left
 * column, with the incident panel pinned beside them (a drawer below `xl`).
 * `children` render below the activity feed in the left column — that is
 * where the executive overview sits.
 */
export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeRowId, setActiveRowId] = React.useState(defaultIncidentId);

  const activeIncident = getIncident(activeRowId);

  const selectRow = React.useCallback((row: ActionRow) => {
    setActiveRowId(row.id);
    // Below `xl` the panel is a drawer, so surface it on selection.
    if (window.matchMedia("(max-width: 1279px)").matches) setDrawerOpen(true);
  }, []);

  return (
    <div className="flex min-h-full gap-5 xl:gap-6">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <PageHeader
          icon="dashboard"
          title={title}
          subtitle={subtitle}
          actions={
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border border-muted bg-action px-3",
                "type-label-md text-secondary transition-colors duration-200",
                "hover:border-default hover:bg-raised-2 hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "xl:hidden"
              )}
            >
              <AppIcon name="panelRight" size="sm" aria-hidden />
              Incident
            </button>
          }
        />

        <MapStage>
          <HealthScoreCard
            score={99}
            delta={2}
            segments={healthSegments}
            className="absolute top-4 left-4 max-w-[calc(100%-2rem)]"
          />
        </MapStage>

        <ActionQueue onSelectRow={selectRow} activeRowId={activeRowId} />

        <RecentActivity />

        {children}
      </div>

      {/* Desktop: a persistent column that scrolls with its own overflow and
          stays pinned beside the queue. */}
      <div className="hidden w-[20rem] shrink-0 xl:block 2xl:w-[21.25rem]">
        <IncidentPanel
          incident={activeIncident}
          className="sticky top-0 h-[calc(100dvh-3rem)] rounded-lg border border-muted"
        />
      </div>

      {/* Below xl: the same panel as a drawer. */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 border-muted bg-container p-0 sm:max-w-[21rem]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Incident details</SheetTitle>
          </SheetHeader>
          <IncidentPanel
            incident={activeIncident}
            className="border-l-0"
            onClose={() => setDrawerOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
