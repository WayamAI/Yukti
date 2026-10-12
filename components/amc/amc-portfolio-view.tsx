"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/filter-tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = {
  id: string; customer: string; fleetSize: number; period: string;
  revenue: number; cost: number; margin: number; status: "Healthy" | "At risk" | "Underwater"; renewal: string;
};

const contracts: Row[] = [
  { id: "AMC-2021-001", customer: "Delhi Metro Rail Corp.", fleetSize: 248, period: "2021-2031", revenue: 32, cost: 22, margin: 31.3, status: "Healthy", renewal: "2031-06-30" },
  { id: "AMC-2022-014", customer: "Mumbai Metro One Pvt. Ltd.", fleetSize: 124, period: "2022-2029", revenue: 18, cost: 14.5, margin: 19.4, status: "At risk", renewal: "2029-03-31" },
  { id: "AMC-2020-007", customer: "Indian Railways—WR", fleetSize: 312, period: "2020-2030", revenue: 41, cost: 27, margin: 34.1, status: "Healthy", renewal: "2030-01-31" },
  { id: "AMC-2024-009", customer: "Kochi Metro Rail Ltd.", fleetSize: 72, period: "2024-2031", revenue: 9.5, cost: 9.8, margin: -3.2, status: "Underwater", renewal: "2031-04-30" },
  { id: "AMC-2021-022", customer: "Bangalore Metro Rail Corp.", fleetSize: 156, period: "2021-2028", revenue: 21, cost: 16, margin: 23.8, status: "Healthy", renewal: "2028-09-30" },
  { id: "AMC-2023-005", customer: "Hyderabad Metro Rail Ltd.", fleetSize: 96, period: "2023-2030", revenue: 12.5, cost: 10.2, margin: 18.4, status: "At risk", renewal: "2030-08-31" },
  { id: "AMC-2019-003", customer: "Lucknow Metro Rail Corp.", fleetSize: 60, period: "2019-2026", revenue: 7.8, cost: 6.9, margin: 11.5, status: "At risk", renewal: "2026-11-30" },
  { id: "AMC-2022-031", customer: "Jaipur Metro Rail Corp.", fleetSize: 48, period: "2022-2029", revenue: 6.2, cost: 4.6, margin: 25.8, status: "Healthy", renewal: "2029-10-31" },
  { id: "AMC-2020-018", customer: "Chennai Metro Rail Ltd.", fleetSize: 182, period: "2020-2030", revenue: 23, cost: 17, margin: 26.1, status: "Healthy", renewal: "2030-02-28" },
  { id: "AMC-2023-041", customer: "Pune Metro Rail Corp.", fleetSize: 84, period: "2023-2031", revenue: 11, cost: 9.2, margin: 16.4, status: "At risk", renewal: "2031-07-31" },
  { id: "AMC-2021-055", customer: "Nagpur Metro Rail Corp.", fleetSize: 40, period: "2021-2028", revenue: 5.4, cost: 3.9, margin: 27.8, status: "Healthy", renewal: "2028-05-31" },
  { id: "AMC-2019-011", customer: "Kolkata Metro Rail Corp.", fleetSize: 68, period: "2019-2026", revenue: 8.6, cost: 8.9, margin: -3.5, status: "Underwater", renewal: "2026-05-31" },
];

const statusTone: Record<Row["status"], "outline" | "secondary" | "destructive"> = {
  Healthy: "outline",
  "At risk": "secondary",
  Underwater: "destructive",
};

export function AmcPortfolioView() {
  const [status, setStatus] = useState("All");
  const filtered = useMemo(
    () => (status === "All" ? contracts : contracts.filter((c) => c.status === status)),
    [status]
  );

  return (
    <div>
      <PageHeader icon="maintenance" title="AMC Portfolio" subtitle="Overview of Annual Maintenance Contracts" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Active AMCs" value={`${contracts.length}`} icon="tools" />
        <StatCard label="Total Contract Value" value="₹153 Cr" icon="finance" />
        <StatCard label="Expected Service Cost" value="₹125 Cr" icon="finance" />
        <StatCard label="Portfolio Margin" value="23.4%" tone="warning" icon="finance" />
        <StatCard label="Contracts at Risk" value="5" tone="danger" icon="target" />
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Margin Distribution</span>
            </CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" dataKey="revenue" name="Revenue" unit=" Cr" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} label={{ value: "Revenue (₹ Cr)", position: "insideBottom", offset: -4, fontSize: 11, fill: "var(--muted-foreground)" }} />
              <YAxis type="number" dataKey="margin" name="Margin" unit="%" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "Margin %", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
              <ZAxis type="number" dataKey="fleetSize" range={[60, 400]} name="Fleet Size" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Scatter data={contracts.filter((c) => c.status === "Healthy")} fill="var(--chart-2)" />
              <Scatter data={contracts.filter((c) => c.status === "At risk")} fill="var(--chart-4)" />
              <Scatter data={contracts.filter((c) => c.status === "Underwater")} fill="var(--destructive)" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="mt-1 text-xs text-muted-foreground">Bubble size = fleet size</p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <FilterTabs options={["All", "Healthy", "At risk", "Underwater"]} value={status} onChange={setStatus} />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Fleet Size</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Annual Revenue</TableHead>
                  <TableHead className="text-right">Expected Cost</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renewal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                    <TableCell className="text-muted-foreground">{c.customer}</TableCell>
                    <TableCell className="text-right">{c.fleetSize}</TableCell>
                    <TableCell className="text-muted-foreground">{c.period}</TableCell>
                    <TableCell className="text-right">₹{c.revenue}Cr</TableCell>
                    <TableCell className="text-right">₹{c.cost}Cr</TableCell>
                    <TableCell className="text-right">{c.margin.toFixed(1)}%</TableCell>
                    <TableCell><Badge variant={statusTone[c.status]}>{c.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{c.renewal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
