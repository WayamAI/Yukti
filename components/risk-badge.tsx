import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  red: "bg-error-badge text-badge",
  amber: "bg-warning-badge text-badge",
  green: "bg-success-badge text-badge",
};

/**
 * `tone` is the colour key; the text it prints is the severity. Callers that
 * pass no `label` used to fall back to the tone itself, which put "Red" /
 * "Amber" / "Green" on screen instead of the severity the operator reads.
 */
const severityMap: Record<string, string> = {
  red: "High",
  amber: "Medium",
  green: "Low",
};

export function RiskBadge({ tone, label }: { tone: "red" | "amber" | "green"; label?: string }) {
  return (
    <span className={cn("inline-flex max-w-full items-center truncate rounded-full px-2.5 py-0.5 text-caption font-medium", toneMap[tone])}>
      {label ?? severityMap[tone]}
    </span>
  );
}
