"use client";

import { useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { componentFamilies } from "@/lib/component-families";
import { NUMBER_LOCALE } from "@/lib/utils";

const suppliers = [
  { name: "Bharat Heavy Electricals Ltd.", location: "Haridwar", status: "Stable" as const, mult: 1 },
  { name: "Medha Servo Drives", location: "Hyderabad", status: "Degrading" as const, mult: 1.35 },
];

export function SupplierComparisonView() {
  const [code, setCode] = useState(componentFamilies[0].code);
  const family = componentFamilies.find((f) => f.code === code)!;
  const mtbfBase = Math.round(1_000_000 / (family.baseFailureRate * 10));

  const rows = suppliers.map((s) => {
    const units = Math.round(1200 + family.baseFailureRate * 150 * (s.mult === 1 ? 1.3 : 1));
    const mtbf = Math.round(mtbfBase / s.mult);
    const failureRate = Number((family.baseFailureRate * s.mult * 0.1).toFixed(2));
    const cost5 = family.baseRepairCostLakh * 5 * s.mult * (family.baseFailureRate / 4);
    const cost7 = cost5 * 1.4;
    return { ...s, units, mtbf, failureRate, cost5, cost7 };
  });

  const survival = Array.from({ length: 21 }, (_, i) => {
    const h = i * (mtbfBase * 2.5 / 20);
    const point: Record<string, number> = { hours: Math.round(h) };
    rows.forEach((s) => {
      point[s.name] = Number((100 * Math.exp(-Math.pow(h / s.mtbf, 1.4))).toFixed(1));
    });
    return point;
  });

  const best = rows.reduce((a, b) => (a.cost5 < b.cost5 ? a : b));

  return (
    <div>
      <PageHeader
        icon="analytics"
        title="Supplier Reliability Comparison"
        subtitle="Side-by-side supplier performance for selected component family"
      />

      <div className="mb-6 max-w-sm">
        <Select
          value={code}
          onValueChange={(v) => v && setCode(v)}
          items={componentFamilies.map((f) => ({ value: f.code, label: f.name }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {componentFamilies.map((f) => (
              <SelectItem key={f.code} value={f.code}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rows.map((s) => (
          <Card key={s.name}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="metrics" size="md" />
              <span className="truncate">{s.name}</span>
            </CardTitle>
                <p className="text-xs text-muted-foreground">{s.location}</p>
              </div>
              <Badge variant={s.status === "Stable" ? "outline" : "secondary"}>{s.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Units</p><p className="font-medium">{s.units.toLocaleString(NUMBER_LOCALE)}</p></div>
                <div><p className="text-xs text-muted-foreground">MTBF</p><p className="font-medium">{s.mtbf.toLocaleString(NUMBER_LOCALE)}h</p></div>
                <div><p className="text-xs text-muted-foreground">Failure Rate</p><p className="font-medium">{s.failureRate}/1000h</p></div>
                <div><p className="text-xs text-muted-foreground">Repair Cost</p><p className="font-medium">₹{(s.cost5 / 5).toFixed(1)}L</p></div>
                <div><p className="text-xs text-muted-foreground">Composite Score</p><p className="font-medium">{s.status === "Stable" ? 82 : 71}</p></div>
              </div>
              <LinkButton variant="link" href="/supplier-deep-dive" className="mt-3 h-auto p-0 text-primary">
                View Full Risk Profile →
              </LinkButton>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="time" size="md" />
              <span className="truncate">Overlaid Survival Curves</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={survival} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hours" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} label={{ value: "Operating Hours", position: "insideBottom", offset: -4, fontSize: 11, fill: "var(--muted-foreground)" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey={rows[0].name} stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey={rows[1].name} stroke="var(--chart-2)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Warranty Cost Impact</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Expected Cost/Unit (5-yr)</TableHead>
                <TableHead className="text-right">Expected Cost/Unit (7-yr)</TableHead>
                <TableHead className="text-right">Delta vs. Best (5-yr)</TableHead>
                <TableHead className="text-right">Delta vs. Best (7-yr)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                  <TableCell className="text-right">₹{s.cost5.toFixed(2)}L</TableCell>
                  <TableCell className="text-right">₹{s.cost7.toFixed(2)}L</TableCell>
                  <TableCell className="text-right">
                    {s.name === best.name ? "Baseline" : `+${Math.round(((s.cost5 - best.cost5) / best.cost5) * 100)}%`}
                  </TableCell>
                  <TableCell className="text-right">
                    {s.name === best.name ? "Baseline" : `+${Math.round(((s.cost7 - best.cost7) / best.cost7) * 100)}%`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
