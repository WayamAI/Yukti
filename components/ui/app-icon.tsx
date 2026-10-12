import * as React from "react";
import { icons, type IconName, type LucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Sizes reference the `--icon-size-*` tokens, so the scale has one source of
 * truth. Most interface icons belong between `sm` and `xl`; `2xl`/`3xl` are
 * for empty states and feature moments, not ordinary controls.
 */
const sizes = {
  xs: "size-[var(--icon-size-xs)]",
  sm: "size-[var(--icon-size-sm)]",
  md: "size-[var(--icon-size-md)]",
  lg: "size-[var(--icon-size-lg)]",
  xl: "size-[var(--icon-size-xl)]",
  "2xl": "size-[var(--icon-size-2xl)]",
  "3xl": "size-[var(--icon-size-3xl)]",
} as const;

/**
 * Optional tone. Omit it and the icon inherits `currentColor` from its
 * container, which is what most controls want — the button owns the colour
 * and its hover state, the icon just follows.
 */
const tones = {
  primary: "text-icon-primary",
  secondary: "text-icon-secondary",
  tertiary: "text-icon-tertiary",
  quaternary: "text-icon-quaternary",
  "on-color": "text-icon-on-color",
  success: "text-success-icon",
  info: "text-info-icon",
  warning: "text-warning-icon",
  error: "text-error-icon",
} as const;

export type IconSize = keyof typeof sizes;
export type IconTone = keyof typeof tones;

/** Remaining SVG props (data-slot, onClick on a disclosure caret, …) pass through. */
type SvgProps = Omit<
  React.ComponentProps<LucideIcon>,
  "name" | "size" | "ref" | "aria-label" | "aria-hidden" | "strokeWidth"
>;

export type AppIconProps = SvgProps & {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
  className?: string;
  /**
   * Give a label only when the icon is the sole carrier of meaning. Icons
   * beside text, or inside a labelled button, stay `aria-hidden`.
   */
  "aria-label"?: string;
  /** Accepted for clarity at call sites; unlabelled icons are hidden anyway. */
  "aria-hidden"?: boolean | "true" | "false";
};

export function AppIcon({
  name,
  size = "md",
  tone,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": _ariaHidden,
  ...rest
}: AppIconProps) {
  const Glyph = icons[name];

  return (
    <Glyph
      {...rest}
      className={cn("shrink-0", sizes[size], tone && tones[tone], className)}
      // Lucide's own stroke width, kept uniform so no glyph reads heavier
      // than its neighbours.
      strokeWidth={1.75}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      focusable="false"
    />
  );
}

export { sizes as iconSizes, tones as iconTones };
