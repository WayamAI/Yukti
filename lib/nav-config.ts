import type { IconName } from "@/lib/icons";

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  icon: IconName;
  href?: string;
  children?: NavLink[];
  /** "bottom" pins the group to the sidebar's utility cluster. */
  placement?: "primary" | "bottom";
};

export const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/",
  },
  {
    label: "Component Reliability",
    icon: "reliability",
    children: [
      { label: "Fleet Health Overview", href: "/fleet-health" },
      { label: "Failure Analysis", href: "/failure-analysis" },
      { label: "Supplier Comparison", href: "/supplier-comparison" },
      { label: "Remaining Useful Life", href: "/remaining-useful-life" },
    ],
  },
  {
    label: "Traceability & Risk",
    icon: "traceability",
    children: [
      { label: "Component Genealogy", href: "/component-genealogy" },
      { label: "Supplier Risk Scorecard", href: "/supplier-risk-scorecard" },
      { label: "Blast Radius Calculator", href: "/blast-radius" },
      { label: "Risk Alerts", href: "/risk-alerts" },
      { label: "Supplier Deep Dive", href: "/supplier-deep-dive" },
    ],
  },
  {
    label: "Warranty Intelligence",
    icon: "warranty",
    children: [
      { label: "Warranty Cost Modeler", href: "/warranty-cost-modeler" },
      { label: "Active Contracts", href: "/warranty-contracts" },
      { label: "Claims Analytics", href: "/claims-analytics" },
      { label: "What-If Simulator", href: "/what-if-simulator" },
    ],
  },
  {
    label: "AMC Management",
    icon: "maintenance",
    children: [
      { label: "AMC Portfolio", href: "/amc-portfolio" },
      { label: "AMC Pricing Engine", href: "/amc-pricing" },
      { label: "Service Cost Tracking", href: "/service-cost-tracking" },
    ],
  },
  {
    label: "Insurance",
    icon: "insurance",
    children: [
      { label: "Coverage Overview", href: "/insurance-coverage" },
      { label: "Actual vs. Assumed Risk", href: "/insurance-risk" },
      { label: "Renegotiation Opps", href: "/insurance-renegotiation" },
      { label: "Self-Insurance Analysis", href: "/self-insurance" },
    ],
  },
  {
    label: "Tender Support",
    icon: "tender",
    children: [
      { label: "New Bid Calculator", href: "/tender-calculator" },
      { label: "Bid History", href: "/bid-history" },
    ],
  },
  {
    label: "Data Sources",
    icon: "dataSources",
    children: [
      { label: "Connected Systems", href: "/connected-systems" },
      { label: "Data Quality Monitor", href: "/data-quality" },
      { label: "Ingestion Logs", href: "/ingestion-logs" },
    ],
  },
  {
    label: "Settings",
    icon: "settings",
    placement: "bottom",
    children: [
      { label: "User Management", href: "/user-management" },
      { label: "Alert Configuration", href: "/alert-config" },
      { label: "Model Parameters", href: "/model-parameters" },
    ],
  },
];

/** The navigation entry whose href matches `pathname`, if any. */
export function navItemForPath(pathname: string): NavLink | undefined {
  for (const group of navGroups) {
    if (group.href === pathname) return { label: group.label, href: group.href };
    const child = group.children?.find((c) => c.href === pathname);
    if (child) return child;
  }
  return undefined;
}

/** The group that owns `pathname` (used for the top bar eyebrow). */
export function groupForPath(pathname: string): NavGroup | undefined {
  return navGroups.find((group) => {
    if (group.href === pathname) return true;
    return group.children?.some((c) => c.href === pathname) ?? false;
  });
}
