import * as React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { recentActivity } from "@/lib/dashboard-data";
import { AppIcon } from "@/components/ui/app-icon";

export function RecentActivity() {
  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="surface-card rounded-lg"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h2
          id="recent-activity-heading"
          className="type-heading-sm flex items-center gap-2 text-primary"
        >
          <YuktiIcon name="time" size="lg" />
          <span>Recent Activity</span>
        </h2>
        <button
          type="button"
          className="type-label-sm inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-tertiary transition-colors duration-150 hover:text-primary"
        >
          View all
          <AppIcon name="arrowRight" size="xs" aria-hidden />
        </button>
      </div>

      <ul className="border-t border-muted">
        {recentActivity.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 border-b border-muted px-4 py-2.5 transition-colors duration-150 last:border-b-0 hover:bg-raised"
          >
            <StatusBadge
              status={item.status}
              variant="dot"
              label=""
              className="gap-0"
            />
            <div className="min-w-0 flex-1">
              <p className="type-body-md truncate text-primary">{item.title}</p>
              <p className="type-caption truncate text-tertiary">
                {item.meta}
              </p>
            </div>
            <span className="type-caption shrink-0 whitespace-nowrap text-tertiary tabular-nums">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
