import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ExecutiveOverview } from "@/components/dashboard/executive-overview";

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Executive Dashboard"
      subtitle="Overview as of 20 March 2026, 14:36 IST"
    >
      <ExecutiveOverview />
    </DashboardShell>
  );
}
