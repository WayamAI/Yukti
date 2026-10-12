"use client";

import * as React from "react";
import { YuktiIcon, type YuktiIconName } from "@/components/ui/yukti-icon";

/**
 * In-page header. The top bar says where you are; this says what this screen
 * is for and carries its scope controls.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  children,
  icon,
}: {
  title: string;
  /** One-line description under the title. */
  subtitle?: string;
  /** Filters, chips or buttons aligned to the right. */
  actions?: React.ReactNode;
  /** Optional second row, typically filter chips. */
  children?: React.ReactNode;
  /** Optional Yukti brand mark, shown beside the title. Omitted by default,
   *  so screens that do not opt in render exactly as before. */
  icon?: YuktiIconName;
}) {
  return (
    <div className="shrink-0 -mx-4 mb-4 border-b border-muted px-4 py-4 sm:-mx-5 sm:mb-5 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="flex min-w-0 items-center gap-2.5 font-display text-display-lg text-primary sm:text-display-xl">
            {icon ? <YuktiIcon name={icon} size="3xl" /> : null}
            <span className="min-w-0">{title}</span>
          </h2>
          {subtitle ? (
            <p className="mt-1 max-w-[70ch] text-body-md text-tertiary">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      {children ? <div className="mt-3 min-w-0">{children}</div> : null}
    </div>
  );
}