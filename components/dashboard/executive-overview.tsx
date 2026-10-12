/**
 * The executive dashboard body: KPI tiles, trend charts, component
 * reliability, top alerts, insurance renewals and the quick actions.
 * Rendered by the dashboard route.
 */
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import { WarrantyTrendChart } from "@/components/charts/warranty-trend-chart";
import { AmcProfitabilityChart } from "@/components/charts/amc-profitability-chart";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { AppIcon } from "@/components/ui/app-icon";

const reliabilityStatus = [
  { name: "Traction Motor TM-450", mtbf: "48,200h", change: -12 },
  { name: "Brake Disc Assembly BD-R7", mtbf: "92,400h", change: 5 },
  { name: "Bogie Frame BF-2200", mtbf: "156,000h", change: 0 },
  { name: "Pantograph Assembly PA-X3", mtbf: "32,100h", change: -22 },
  { name: "Coupler System CS-900", mtbf: "68,500h", change: 3 },
  { name: "Auxiliary Power Unit APU-320", mtbf: "41,200h", change: -8 },
  { name: "Door Operating System DOS-150", mtbf: "78,900h", change: 2 },
  { name: "HVAC Compressor HC-800", mtbf: "55,600h", change: -5 },
  { name: "Wheel Set WS-1100", mtbf: "124,000h", change: 1 },
  { name: "Suspension Damper SD-650", mtbf: "62,300h", change: -3 },
];

const alerts = [
  {
    text: "Traction Motor TM-450 MTBF declined 18% over last 6 months",
    severity: "critical" as const,
    tag: "Reliability",
  },
  {
    text: "AMC Contract #AMC-2024-009 projected to go underwater in Q3 2026",
    severity: "critical" as const,
    tag: "Commercial",
  },
  {
    text: "Supplier Bharat Forge quality rejection rate spiked to 4.2%",
    severity: "warning" as const,
    tag: "Quality",
  },
];

const renewals = [
  { name: "Propulsion System Coverage", insurer: "New India Assurance", action: "Renegotiate", days: 11 },
  { name: "Braking System Coverage", insurer: "United India Insurance", action: "Renegotiate", days: 11 },
  { name: "Electrical Systems Coverage", insurer: "ICICI Lombard", action: "Review", days: 102 },
  { name: "Safety & Signalling", insurer: "HDFC ERGO", action: "Maintain", days: 11 },
];

function ChangeBadge({ value }: { value: number }) {
  if (value > 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
        <AppIcon name="deltaUp" size="xs" />
        {value}%
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-destructive">
        <AppIcon name="deltaDown" size="xs" />
        {value}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-muted-foreground">
      <AppIcon name="minus" size="xs" />
      0%
    </span>
  );
}

export function ExecutiveOverview() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Warranty Exposure" value="₹142.7 Cr" note="+8.2%" trend="up" tone="warning" icon="security" />
        <StatCard label="Provision Gap" value="₹12.3 Cr" note="Under-provisioned" tone="danger" icon="finance" />
        <StatCard label="AMC Portfolio Margin" value="23.4%" note="Below 25% target" tone="warning" icon="maintenance" />
        <StatCard label="Insurance Savings Opp." value="₹3.8 Cr/yr" note="Actionable" tone="success" icon="growth" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="metrics" size="md" />
              <span className="truncate">Warranty Cost Trend (24 months)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WarrantyTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="analytics" size="md" />
              <span className="truncate">AMC Portfolio Profitability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AmcProfitabilityChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="activity" size="md" />
              <span className="truncate">Component Reliability Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reliabilityStatus.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{c.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{c.mtbf}</span>
                  <ChangeBadge value={c.change} />
                </div>
              </div>
            ))}
            <LinkButton variant="link" className="h-auto p-0 text-primary" href="/fleet-health">
              View all components →
            </LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="alert" size="md" />
              <span className="truncate">Top Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="rounded-md border border-muted p-3">
                <p className="text-sm text-foreground">{a.text}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={a.severity === "critical" ? "destructive" : "secondary"}>
                    {a.severity}
                  </Badge>
                  <Badge variant="outline">{a.tag}</Badge>
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              Supplier Risk: 2 high-risk, 3 critical alerts
            </p>
            <LinkButton variant="link" className="h-auto p-0 text-primary" href="/supplier-risk-scorecard">
              View Risk Scorecard →
            </LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Insurance Renewal Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {renewals.map((r) => (
              <div key={r.name} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.insurer}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={r.action === "Renegotiate" ? "destructive" : r.action === "Review" ? "secondary" : "outline"}
                    className="mb-1"
                  >
                    {r.action}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{r.days}d</p>
                </div>
              </div>
            ))}
            <LinkButton variant="link" className="h-auto p-0 text-primary" href="/insurance-coverage">
              View all policies →
            </LinkButton>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href="/tender-calculator">Run new bid estimate</LinkButton>
        <LinkButton variant="outline" href="/warranty-cost-modeler">
          Review warranty provisions
        </LinkButton>
        <LinkButton variant="outline" href="/what-if-simulator">
          Explore what-if scenarios
        </LinkButton>
      </div>
    </div>
  );
}
