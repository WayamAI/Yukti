"use client";

import * as React from "react";
import { AppIcon, type IconSize } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Container size → glyph size. Sidebar-scale controls use `lg`. */
const sizes: Record<"sm" | "md" | "lg", { box: string; icon: IconSize }> = {
  sm: { box: "size-8 rounded-full", icon: "sm" },
  md: { box: "size-9 rounded-full", icon: "md" },
  lg: { box: "size-10 rounded-full", icon: "lg" },
};

const variants = {
  /* Transparent until touched — toolbars and inline controls. */
  ghost: cn(
    "bg-action-tertiary text-icon-tertiary",
    "hover:bg-action-tertiary-hover hover:text-icon-secondary",
    "active:bg-action-tertiary-focused active:text-icon-primary"
  ),
  /* A persistent quiet surface — the circular controls in the rail. */
  subtle: cn(
    "bg-action text-icon-secondary",
    "hover:bg-raised hover:text-icon-primary",
    "active:bg-raised-2"
  ),
  /* The one bright control: light surface, near-black glyph. */
  inverse: cn(
    "bg-action-primary text-icon-on-color",
    "hover:bg-action-primary-hover",
    "active:bg-action-primary-focused"
  ),
} as const;

export type IconButtonProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  icon: IconName;
  /** Accessible name — these controls carry no visible text. */
  label: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  /** Renders a corner dot, e.g. unread notifications. */
  indicator?: boolean;
};

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  indicator,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  const { box, icon: iconSize } = sizes[size];

  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        // Optical centring comes from flex, never from margins.
        "relative inline-flex shrink-0 items-center justify-center",
        "border border-transparent transition-[background-color,color,border-color] duration-[180ms] ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page",
        "disabled:pointer-events-none disabled:bg-action-disabled disabled:text-icon-quaternary",
        box,
        variants[variant],
        className
      )}
      {...props}
    >
      <AppIcon name={icon} size={iconSize} />
      {indicator && (
        <span
          aria-hidden
          className="absolute top-1 right-1 size-1.5 rounded-full bg-error-icon"
        />
      )}
    </button>
  );
}

export { sizes as iconButtonSizes, variants as iconButtonVariants };
