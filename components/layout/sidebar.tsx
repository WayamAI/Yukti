"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, groupForPath, navItemForPath } from "@/lib/nav-config";
import type { NavGroup } from "@/lib/nav-config";
import { logout } from "@/app/login/actions";
import { AppIcon } from "@/components/ui/app-icon";
import { useTheme } from "@/components/ui/theme-toggle";
import {
  SidebarGroupTrigger,
  SidebarItem,
  SidebarTreeBranch,
  SidebarTreeItem,
} from "@/components/layout/sidebar-item";

/* Rail width is a per-viewer preference, kept in localStorage and read
   through an external store so the server render (collapsed) hydrates
   cleanly before the stored value applies. */
const EXPANDED_KEY = "yukti-sidebar-expanded";
const expandedListeners = new Set<() => void>();

function readExpanded() {
  try {
    return localStorage.getItem(EXPANDED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeExpanded(next: boolean) {
  try {
    localStorage.setItem(EXPANDED_KEY, next ? "1" : "0");
  } catch {
    /* storage unavailable — the choice lasts for this page only */
  }
  expandedListeners.forEach((notify) => notify());
}

function subscribeExpanded(onChange: () => void) {
  expandedListeners.add(onChange);
  return () => {
    expandedListeners.delete(onChange);
  };
}

/**
 * Primary navigation.
 *
 * Collapsed (68px): icon rail; groups open a flyout on hover, focus or click.
 * Expanded (252px): labels plus an accordion tree of each group's pages.
 * The mobile drawer always opens expanded.
 */
export function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const storedExpanded = React.useSyncExternalStore(
    subscribeExpanded,
    readExpanded,
    () => false
  );
  const expanded = storedExpanded || open;
  const [flyoutId, setFlyoutId] = React.useState<string | null>(null);
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({});
  const activeItem = navItemForPath(pathname);
  const activeGroup = groupForPath(pathname);
  const { theme, toggle: toggleTheme, label: themeLabel } = useTheme();

  const primaryGroups = navGroups.filter((g) => g.placement !== "bottom");
  const bottomGroups = navGroups.filter((g) => g.placement === "bottom");

  function navigate() {
    setFlyoutId(null);
    onClose?.();
  }

  // The group holding the current page starts open; manual toggles win.
  function isGroupOpen(id: string) {
    return openIds[id] ?? id === activeGroup?.label;
  }

  function renderGroup(group: NavGroup, active: boolean) {
    if (expanded) {
      const groupOpen = isGroupOpen(group.label);
      return (
        <>
          <SidebarGroupTrigger
            icon={group.icon}
            label={group.label}
            active={active}
            expanded
            open={groupOpen}
            onClick={() =>
              setOpenIds((prev) => ({ ...prev, [group.label]: !groupOpen }))
            }
          />
          {groupOpen ? (
            <SidebarTreeBranch>
              <GroupLeaves
                group={group}
                activeHref={activeItem?.href}
                onNavigate={navigate}
              />
            </SidebarTreeBranch>
          ) : null}
        </>
      );
    }

    const pinned = flyoutId === group.label;
    return (
      <>
        <SidebarGroupTrigger
          icon={group.icon}
          label={group.label}
          active={active}
          open={pinned}
          onClick={() => setFlyoutId(pinned ? null : group.label)}
        />
        <CollapsedFlyout
          group={group}
          activeHref={activeItem?.href}
          pinned={pinned}
          onNavigate={navigate}
        />
      </>
    );
  }

  const listClass = expanded
    ? "flex flex-col gap-1.5"
    : "flex flex-col items-center gap-1.5";
  const groupClass = expanded ? "relative" : "group relative";

  return (
    <aside
      aria-label="Primary"
      data-expanded={expanded}
      onMouseLeave={() => setFlyoutId(null)}
      className={[
        "flex h-full shrink-0 flex-col border-r border-muted bg-container",
        "transition-[width,transform] duration-200 ease-out",
        "fixed inset-y-0 left-0 z-50 lg:relative lg:z-30 lg:translate-x-0",
        expanded ? "w-[252px]" : "w-[68px]",
        open
          ? "translate-x-0"
          : "-translate-x-full pointer-events-none lg:pointer-events-auto lg:translate-x-0",
      ].join(" ")}
    >
      <LogoRow onNavigate={navigate} />

      <nav
        aria-label="Main navigation"
        className={[
          "min-h-0 flex-1 py-3",
          expanded
            ? "scrollbar-thin overflow-x-hidden overflow-y-auto px-4"
            : "overflow-visible px-[16px]",
        ].join(" ")}
      >
        <ul className={listClass}>
          {primaryGroups.map((group) => {
            if (!group.children?.length) {
              return (
                <li key={group.label}>
                  <SidebarItem
                    icon={group.icon}
                    label={group.label}
                    href={group.href}
                    active={group.href === pathname}
                    expanded={expanded}
                    onNavigate={navigate}
                  />
                </li>
              );
            }
            const childActive = Boolean(
              activeItem &&
                (group.href === activeItem.href ||
                  group.children.some((c) => c.href === activeItem.href))
            );
            return (
              <li key={group.label} className={groupClass}>
                {renderGroup(group, childActive)}
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={[
          "flex shrink-0 flex-col gap-1.5 border-t border-muted py-3",
          expanded ? "px-4" : "items-center px-[16px]",
        ].join(" ")}
      >
        {bottomGroups.map((group) => (
          <div key={group.label} className={groupClass}>
            {renderGroup(
              group,
              Boolean(group.children?.some((c) => c.href === pathname))
            )}
          </div>
        ))}
        <SidebarItem
          icon={theme === "light" ? "moon" : "sun"}
          label={themeLabel}
          expanded={expanded}
          onClick={toggleTheme}
        />
        <form action={logout} className="contents">
          <SidebarItem
            icon="signOut"
            label="Sign out"
            type="submit"
            expanded={expanded}
          />
        </form>
        {/* Width toggle is desktop-only; the mobile drawer closes from its scrim. */}
        <div className="hidden lg:block">
          <SidebarItem
            icon={expanded ? "panelLeftClose" : "panelLeftOpen"}
            label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            expanded={expanded}
            onClick={() => {
              setFlyoutId(null);
              writeExpanded(!storedExpanded);
            }}
          />
        </div>
      </div>
    </aside>
  );
}

function GroupLeaves({
  group,
  activeHref,
  onNavigate,
}: {
  group: NavGroup;
  activeHref?: string;
  onNavigate?: () => void;
}) {
  const items = group.children ?? [];
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li key={item.href}>
          <SidebarTreeItem
            href={item.href}
            label={item.label}
            active={activeHref === item.href}
            last={index === items.length - 1}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

/** Logo row: the Yukti brand mark, 36px square. Its height matches
 * the top bar so the two bottom borders read as one line across the app. */
function LogoRow({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center border-b border-muted">
      <Link
        href="/"
        aria-label="Yukti home"
        onClick={onNavigate}
        className="flex min-w-0 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Two marks, one per theme. Driven by `data-theme` rather than
            `prefers-color-scheme` so the logo follows the in-app toggle
            instead of drifting out of sync with it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-main-dark.svg"
          alt="Yukti"
          width={56}
          height={56}
          className={`theme-dark-only shrink-0 size-9`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-main-light.svg"
          alt="Yukti"
          width={56}
          height={56}
          className={`theme-light-only shrink-0 size-9`}
        />
      </Link>
    </div>
  );
}

/**
 * Hover panel for the collapsed rail so nested pages stay one click away
 * without expanding the rail.
 */
function CollapsedFlyout({
  group,
  activeHref,
  pinned = false,
  onNavigate,
}: {
  group: NavGroup;
  activeHref?: string;
  pinned?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={[
        "absolute top-0 left-full z-50 transition-[opacity,visibility] duration-[180ms]",
        pinned
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 focus-within:pointer-events-auto focus-within:visible focus-within:opacity-100",
      ].join(" ")}
    >
      {/* Clears the rail's 16px inset plus an 8px gap; the padding keeps the hover bridge. */}
      <div className="pl-6">
        <div className="max-h-[min(80vh,560px)] w-[228px] overflow-y-auto rounded-xl border border-default bg-raised-2 py-2 shadow-float">
          <p className="px-3 pb-1 text-caption text-quaternary">
            {group.label}
          </p>
          <SidebarTreeBranch>
            <ul className="flex flex-col">
              {(group.children ?? []).map((item, index) => {
                const items = group.children ?? [];
                const last = index === items.length - 1;
                return (
                  <li key={item.href}>
                    <SidebarTreeItem
                      href={item.href}
                      label={item.label}
                      active={activeHref === item.href}
                      last={last}
                      onNavigate={onNavigate}
                    />
                  </li>
                );
              })}
            </ul>
          </SidebarTreeBranch>
        </div>
      </div>
    </div>
  );
}

/** Mobile-only control lives in the top bar, not the rail. */
export function SidebarMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation"
      className="flex size-8 items-center justify-center rounded-full bg-action text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-raised hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
    >
      <AppIcon name="menu" size="md" />
    </button>
  );
}