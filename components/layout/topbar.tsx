"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/ui/app-icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navItemForPath, groupForPath } from "@/lib/nav-config";
import { SidebarMenuButton } from "@/components/layout/sidebar";

/**
 * Application top bar: where you are and the global entry points. Always
 * visible — it replaces the page header's breadcrumb on every screen.
 */
export function Topbar({ onMenu }: { onMenu?: () => void }) {
  const pathname = usePathname();
  const item = navItemForPath(pathname);
  const group = groupForPath(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-muted bg-page px-4 sm:gap-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        {onMenu ? <SidebarMenuButton onClick={onMenu} /> : null}
        {group ? (
          <span className="hidden text-caption text-quaternary sm:inline">
            {group.label}
          </span>
        ) : null}
        <h1 className="truncate font-display text-display-lg text-primary">
          {item?.label ?? "Yukti"}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />

        <button
          type="button"
          aria-label="Search"
          className="flex h-8 items-center gap-2 rounded-full border border-muted bg-action px-3 text-label-sm text-tertiary outline-none transition-colors duration-[180ms] hover:border-default hover:bg-raised hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring"
        >
          <AppIcon name="search" size="sm" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-muted px-1 text-caption text-quaternary sm:inline">
            CtrlK
          </kbd>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex size-8 items-center justify-center rounded-full bg-action text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-raised hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring"
        >
          <AppIcon name="notification" size="md" />
        </button>
      </div>
    </header>
  );
}