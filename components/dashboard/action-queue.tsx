"use client";

import * as React from "react";
import { FilterChip } from "@/components/ui/filter-chip";
import { IconButton } from "@/components/ui/icon-button";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { ActionTable } from "@/components/dashboard/action-table";
import { actionRows, queueFilters } from "@/lib/dashboard-data";
import type { ActionRow } from "@/lib/dashboard-data";

export function ActionQueue({
  onSelectRow,
  activeRowId,
}: {
  onSelectRow?: (row: ActionRow) => void;
  activeRowId?: string;
}) {
  const [active, setActive] = React.useState("all");

  const rows = React.useMemo(() => {
    switch (active) {
      case "critical":
      case "warning":
      case "info":
        return actionRows.filter((r) => r.priority === active);
      default:
        return actionRows;
    }
  }, [active]);

  const total = queueFilters.find((f) => f.id === "all")?.count ?? rows.length;

  return (
    <section
      aria-labelledby="action-queue-heading"
      className="surface-card rounded-lg"
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-3">
        <h2
          id="action-queue-heading"
          className="type-heading-sm flex items-center gap-2 text-primary"
        >
          <YuktiIcon name="checklist" size="lg" />
          <span>
            Action Needed Queue{" "}
            <span className="text-tertiary tabular-nums">({total})</span>
          </span>
        </h2>
        <div className="flex items-center gap-1">
          <IconButton icon="search" label="Search the queue" size="sm" />
          <IconButton icon="filters" label="Queue options" size="sm" />
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter the queue"
        className="scrollbar-thin flex items-center gap-1.5 overflow-x-auto px-4 pb-3.5"
      >
        {queueFilters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            count={filter.count}
            tone={filter.tone}
            selected={active === filter.id}
            onClick={() => setActive(filter.id)}
          />
        ))}
      </div>

      <div className="border-t border-muted px-1 pb-1">
        <ActionTable
          rows={rows}
          onSelectRow={onSelectRow}
          activeRowId={activeRowId}
        />
      </div>
    </section>
  );
}
