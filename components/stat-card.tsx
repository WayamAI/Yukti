import { YuktiIcon, type YuktiIconName } from "@/components/ui/yukti-icon";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";

export function StatCard({
  label,
  value,
  note,
  trend,
  tone = "default",
  icon,
}: {
  label: string;
  value: string;
  note?: string;
  trend?: "up" | "down";
  tone?: "default" | "warning" | "danger" | "success";
  /** Optional Yukti brand mark, shown beside the label. Omitted by default,
   *  so cards that do not opt in render exactly as before. */
  icon?: YuktiIconName;
}) {
  const toneClasses: Record<string, string> = {
    default: "text-muted-foreground",
    warning: "text-warning",
    danger: "text-destructive",
    success: "text-success",
  };

  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-muted bg-container px-4 py-3.5">
      {icon ? (
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-caption text-quaternary">{label}</span>
          <YuktiIcon name={icon} size="lg" />
        </span>
      ) : (
        <span className="truncate text-caption text-quaternary">
          {label}
        </span>
      )}
      <span className="font-display text-display-xl tabular text-primary sm:text-display-2xl">
        {value}
      </span>
      {note ? (
        <span className={cn("flex items-center gap-1 text-caption", toneClasses[tone])}>
          {trend === "up" && <AppIcon name="trendUp" size="xs" />}
          {trend === "down" && <AppIcon name="trendDown" size="xs" />}
          {trend === undefined && <AppIcon name="minus" size="xs" />}
          <span className="truncate">{note}</span>
        </span>
      ) : null}
    </div>
  );
}