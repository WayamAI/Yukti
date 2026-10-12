import { PageHeader } from "@/components/page-header";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { insuranceRiskRows } from "@/lib/insurance-data";

const opportunities = insuranceRiskRows
  .filter((r) => r.potential !== "Exposure Risk")
  .slice(0, 6);

export function InsuranceRenegotiationView() {
  return (
    <div>
      <PageHeader
        icon="handshake"
        title="Renegotiation Opportunities"
        subtitle="Identified opportunities for insurance premium optimization based on actual reliability data"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Savings Potential" value="₹3.2 Cr/yr" tone="success" icon="finance" />
        <StatCard label="Components with Lower Risk" value="6" icon="target" />
        <StatCard label="Active Policies" value="5" icon="verification" />
        <StatCard label="Avg Data Confidence" value="89%" icon="verification" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {opportunities.map((o, i) => {
          const confidence = 90 - i * 2;
          return (
            <Card key={o.component}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="package" size="md" />
              <span className="truncate">{o.component}</span>
            </CardTitle>
                  <p className="text-xs text-muted-foreground">{confidence}% data confidence</p>
                </div>
                <Badge variant="outline">{o.potential}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{o.impact}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div><p className="text-xs text-muted-foreground">Assumed Rate</p><p>{o.assumed}/1000h</p></div>
                  <div><p className="text-xs text-muted-foreground">Actual Rate</p><p>{o.actual}/1000h</p></div>
                  <div><p className="text-xs text-muted-foreground">Delta</p><p className="text-success">{o.delta}%</p></div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">Generate Brief</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6">
        <Button>Generate Combined Renegotiation Package</Button>
      </div>
    </div>
  );
}
