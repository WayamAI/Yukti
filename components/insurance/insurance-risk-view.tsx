import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { insuranceRiskRows } from "@/lib/insurance-data";

export function InsuranceRiskView() {
  return (
    <div>
      <PageHeader icon="target" title="Actual vs. Assumed Risk" subtitle="Comparison of insurer assumptions against actual reliability data" />

      <div className="max-w-xs">
        <StatCard label="Total Annual Savings Opportunity" value="₹3.2 Cr/yr" tone="success" icon="finance" />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead className="text-right">Insurer&apos;s Assumed Rate</TableHead>
                <TableHead className="text-right">Actual Rate</TableHead>
                <TableHead className="text-right">Delta</TableHead>
                <TableHead className="text-right">Premium Impact</TableHead>
                <TableHead>Renegotiation Potential</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceRiskRows.map((r) => (
                <TableRow key={r.component}>
                  <TableCell className="font-medium text-foreground">{r.component}</TableCell>
                  <TableCell className="text-right">{r.assumed}/1000h</TableCell>
                  <TableCell className="text-right">{r.actual}/1000h</TableCell>
                  <TableCell className={`text-right ${r.delta > 0 ? "text-destructive" : "text-success"}`}>
                    {r.delta > 0 ? "+" : ""}{r.delta}%
                  </TableCell>
                  <TableCell className="text-right">{r.impact}</TableCell>
                  <TableCell>
                    <Badge variant={r.potential === "Exposure Risk" ? "destructive" : r.potential === "High" ? "outline" : "secondary"}>
                      {r.potential}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button>Generate Renegotiation Brief</Button>
      </div>
    </div>
  );
}
