"use client";

import * as React from "react";
import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

function puckClass(active: boolean, disabled: boolean) {
  return [
    "flex size-9 shrink-0 items-center justify-center rounded-full",
    "transition-[background-color,color] duration-[180ms] ease-out",
    active
      ? "bg-action-primary text-icon-on-color"
      : "bg-action text-icon-tertiary group-hover:bg-raised group-hover:text-icon-secondary",
    disabled ? "bg-action-disabled text-icon-quaternary" : "",
  ].join(" ");
}

export type SidebarItemProps = {
  icon: IconName;
  /** Shown when the rail is expanded; always the aria-label when it is not. */
  label: string;
  active?: boolean;
  disabled?: boolean;
  /** Rail state. Collapsed renders a circular icon button only. */
  expanded?: boolean;
  /** Small dot on the top-right corner, for unread/attention counts. */
  indicator?: boolean;
  /** Renders a Link when set, a button otherwise. */
  href?: string;
  /** Fired after a route link is followed, to close the mobile drawer. */
  onNavigate?: () => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-expanded"?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export const SidebarItem = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SidebarItemProps
>(function SidebarItem(
  {
    icon,
    label,
    active = false,
    disabled = false,
    expanded = false,
    indicator,
    href,
    onNavigate,
    onClick,
    className,
    type = "button",
    ...props
  },
  ref
) {
  const wrapper = cn(
    "group relative flex items-center rounded-full outline-none",
    "transition-colors duration-[180ms] ease-out",
    "focus-visible:ring-2 focus-visible:ring-ring",
    expanded ? "w-full gap-3 pr-3" : "justify-center",
    disabled ? "pointer-events-none" : "",
    className
  );

  const content = (
    <>
      <span className={cn("relative", puckClass(active, disabled))}>
        <AppIcon name={icon} size="lg" />
        {indicator && (
          <span
            aria-hidden
            className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-error-icon ring-2 ring-container"
          />
        )}
      </span>
      {expanded ? (
        <span
          className={cn(
            "truncate text-label-sm transition-colors duration-[180ms]",
            active
              ? "text-primary"
              : "text-tertiary group-hover:text-secondary"
          )}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        title={expanded ? undefined : label}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        onClick={(e) => {
          onClick?.(e);
          onNavigate?.();
        }}
        className={wrapper}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={expanded ? undefined : label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={wrapper}
      {...props}
    >
      {content}
    </button>
  );
});

/** Collapsible group header — same puck language, plus a chevron when expanded. */
export function SidebarGroupTrigger({
  icon,
  label,
  active = false,
  expanded = false,
  open = false,
  onClick,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  expanded?: boolean;
  open?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={expanded ? undefined : label}
      aria-label={label}
      aria-expanded={open}
      className={cn(
        "group relative flex items-center rounded-full outline-none",
        "transition-colors duration-[180ms] ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring",
        expanded ? "w-full gap-3 pr-2" : "justify-center"
      )}
    >
      <span className={puckClass(active, false)}>
        <AppIcon name={icon} size="lg" />
      </span>
      {expanded ? (
        <>
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left text-label-sm transition-colors duration-[180ms]",
              active
                ? "text-primary"
                : "text-tertiary group-hover:text-secondary"
            )}
          >
            {label}
          </span>
          <AppIcon
            name="chevronRight"
            size="xs"
            className={cn(
              "shrink-0 text-icon-quaternary transition-transform duration-[180ms]",
              open ? "rotate-90" : ""
            )}
          />
        </>
      ) : null}
    </button>
  );
}

/** Nested leaf a short tick off the shared spine. The last leaf is an L. */
export function SidebarTreeItem({
  href,
  label,
  icon,
  active = false,
  last = false,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: IconName;
  active?: boolean;
  last?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg py-1.5 pr-2 pl-3",
        "outline-none transition-colors duration-[180ms] ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-raised-2 text-primary"
          : "text-tertiary hover:bg-action hover:text-secondary"
      )}
    >
      {last ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 -left-px h-1/2 w-2.5 rounded-bl-[3px] border-b border-l border-muted"
        />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 -left-px h-px w-2.5 bg-muted"
        />
      )}
      {icon ? (
        <AppIcon
          name={icon}
          size="sm"
          className={active ? "text-icon-secondary" : "text-icon-quaternary group-hover:text-icon-tertiary"}
        />
      ) : null}
      <span className="truncate text-label-sm">{label}</span>
    </Link>
  );
}

export function SidebarTreeLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "px-3 py-1 text-caption text-quaternary",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Spine stops at the last leaf so it cannot paint through groups below. */
export function SidebarTreeBranch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-0.5 ml-[18px] overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-4 left-0 w-px bg-muted"
      />
      {children}
    </div>
  );
}