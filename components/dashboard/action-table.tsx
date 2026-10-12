"use client";

import * as React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ActionRow } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const cellClass =
  "border-b border-muted px-3 py-[0.4375rem] align-middle first:pr-0";

const th = cn(
  "label-caps relative h-9 px-3 text-left font-medium whitespace-nowrap",
  "sticky top-0 z-10 bg-container",
  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-muted"
);

function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        ref={ref}
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "flex size-3.5 items-center justify-center rounded-[4px] border border-default bg-raised",
          "transition-colors duration-150 peer-hover:border-active",
          "peer-checked:border-action-primary peer-checked:bg-action-primary",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-container"
        )}
      >
        {indeterminate && !checked ? (
          <span className="h-px w-2 rounded-full bg-action-primary" />
        ) : (
          checked && (
            <svg viewBox="0 0 16 16" className="size-2.5" fill="none">
              <path
                d="M3 8.5 6.5 12 13 4.5"
                stroke="var(--action-primary-content)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        )}
      </span>
    </label>
  );
}

export function ActionTable({
  rows,
  onSelectRow,
  activeRowId,
}: {
  rows: ActionRow[];
  /** Fires when a row is activated — wire this to the incident panel. */
  onSelectRow?: (row: ActionRow) => void;
  activeRowId?: string;
}) {
  const [checked, setChecked] = React.useState<Set<string>>(new Set());

  // Narrows the optional prop so the row handlers below stay type-safe.
  const selectable = Boolean(onSelectRow);

  const allChecked = rows.length > 0 && checked.size === rows.length;
  const someChecked = checked.size > 0 && !allChecked;

  const toggleAll = () =>
    setChecked(allChecked ? new Set() : new Set(rows.map((r) => r.id)));

  const toggleOne = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="scrollbar-thin -mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-left">
        <caption className="sr-only">
          Assets requiring action, newest first
        </caption>
        <thead>
          <tr>
            <th scope="col" className={cn(th, "w-9 pr-0")}>
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={toggleAll}
                label="Select all rows"
              />
            </th>
            <th scope="col" className={cn(th, "w-28")}>
              Priority
            </th>
            <th scope="col" className={cn(th, "w-40")}>
              Asset
            </th>
            <th scope="col" className={th}>
              Description
            </th>
            <th scope="col" className={cn(th, "w-28")}>
              Time
            </th>
            <th scope="col" className={cn(th, "w-44")}>
              Driver
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isChecked = checked.has(row.id);
            const isActive = activeRowId === row.id;

            return (
              <tr
                key={row.id}
                // Rows only become interactive when a consumer can receive the
                // selection; otherwise they stay plain, non-focusable text.
                tabIndex={selectable ? 0 : undefined}
                onClick={onSelectRow ? () => onSelectRow(row) : undefined}
                onKeyDown={
                  onSelectRow
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectRow(row);
                        }
                      }
                    : undefined
                }
                aria-selected={selectable ? isActive : undefined}
                className={cn(
                  "group transition-colors duration-150",
                  selectable &&
                    "cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
                  isActive ? "bg-raised" : "hover:bg-raised"
                )}
              >
                <td className={cellClass}>
                  <span
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleOne(row.id)}
                      label={`Select ${row.asset}`}
                    />
                  </span>
                </td>

                <td className={cellClass}>
                  <StatusBadge status={row.priority} />
                </td>

                <td className={cellClass}>
                  <span className="type-body-md block truncate font-medium text-primary tabular-nums">
                    {row.asset}
                  </span>
                  <span className="type-caption block truncate text-tertiary">
                    {row.assetMeta}
                  </span>
                </td>

                <td className={cellClass}>
                  <span className="type-body-md block truncate text-secondary transition-colors duration-150 group-hover:text-primary">
                    {row.description}
                  </span>
                </td>

                <td className={cellClass}>
                  <span className="type-body-md block whitespace-nowrap text-secondary tabular-nums">
                    {row.time}
                  </span>
                  <span className="type-caption block text-tertiary tabular-nums">
                    {row.timeMeta}
                  </span>
                </td>

                <td className={cellClass}>
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="type-caption flex size-6 shrink-0 items-center justify-center rounded-full border border-muted bg-raised-2 font-medium text-secondary"
                    >
                      {row.driverInitials}
                    </span>
                    <span className="type-body-md truncate text-secondary">
                      {row.driver}
                    </span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
