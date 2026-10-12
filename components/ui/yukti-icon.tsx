import Image from "next/image";
import { iconSizes, type IconSize } from "@/components/ui/app-icon";
import { cn } from "@/lib/utils";

/**
 * YUKTI BRAND ICONS
 *
 *   name  →  PNG in /public/icons/yukti  →  <YuktiIcon name="…" />
 *
 * Supplied brand assets, used exactly as delivered: transparent 256px PNGs,
 * no recolouring and no substitution. Deliberately separate from the Lucide
 * registry in `lib/icons.ts` — these are illustrative marks for dashboard
 * content, not the interface glyphs used by controls and navigation.
 *
 * They sit on the same `--icon-size-*` scale as `AppIcon`, so a brand icon
 * occupies a standard icon box and leaves surrounding rhythm untouched.
 */
export const yuktiIconFiles = {
  activity: "activity.png",
  alert: "alert.png",
  analytics: "analytics.png",
  calendar: "calendar.png",
  checklist: "checklist.png",
  chip: "chip.png",
  controls: "controls.png",
  dashboard: "dashboard.png",
  database: "database.png",
  delivery: "delivery.png",
  filter: "filter.png",
  finance: "finance.png",
  globe: "globe.png",
  growth: "growth.png",
  growth_alt: "growth_alt.png",
  handshake: "handshake.png",
  hierarchy: "hierarchy.png",
  idea: "idea.png",
  layers: "layers.png",
  maintenance: "maintenance.png",
  menu: "menu.png",
  metrics: "metrics.png",
  navigation: "navigation.png",
  network: "network.png",
  notifications: "notifications.png",
  package: "package.png",
  report: "report.png",
  routing: "routing.png",
  search: "search.png",
  security: "security.png",
  security_alert: "security_alert.png",
  settings: "settings.png",
  shipment: "shipment.png",
  sustainability: "sustainability.png",
  sync: "sync.png",
  target: "target.png",
  time: "time.png",
  tools: "tools.png",
  topology: "topology.png",
  users: "users.png",
  verification: "verification.png",
  visibility: "visibility.png",
  warehouse: "warehouse.png",
  warning: "warning.png",
  workflow: "workflow.png",
} as const;

export type YuktiIconName = keyof typeof yuktiIconFiles;

export type YuktiIconProps = {
  name: YuktiIconName;
  size?: IconSize;
  className?: string;
  /**
   * Give a label only when the icon is the sole carrier of meaning. Icons
   * beside a heading or label stay decorative.
   */
  "aria-label"?: string;
};

export function YuktiIcon({
  name,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: YuktiIconProps) {
  return (
    <Image
      src={`/icons/yukti/${yuktiIconFiles[name]}`}
      // Rendered size comes from the token class below; the intrinsic size is
      // doubled so the asset stays crisp on high-density displays.
      width={40}
      height={40}
      alt={ariaLabel ?? ""}
      aria-hidden={ariaLabel ? undefined : true}
      className={cn("shrink-0 object-contain", iconSizes[size], className)}
    />
  );
}
