"use client";

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
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/risk-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppIcon } from "@/components/ui/app-icon";
import { NUMBER_LOCALE } from "@/lib/utils";

const reserveTrend = [
  { year: "FY 2022", reserve: 18, claims: 12 },
  { year: "FY 2023", reserve: 21, claims: 15 },
  { year: "FY 2024", reserve: 24, claims: 19 },
  { year: "FY 2025", reserve: 26, claims: 23 },
  { year: "FY 2026", reserve: 28.2, claims: 27 },
];

const uninsuredComponents = [
  { component: "Pantograph Assembly", code: "PA-X3", installedBase: 890, failureRate: "0.78/1000h", avgRepairCost: "₹2.1L", annualExposure: "₹0.13 Cr", risk: "red" as const },
  { component: "HVAC Compressor", code: "HC-800", installedBase: 2140, failureRate: "0.35/1000h", avgRepairCost: "₹2.8L", annualExposure: "₹0.18 Cr", risk: "amber" as const },
  { component: "Gangway Bellows", code: "GB-300", installedBase: 3560, failureRate: "0.84/1000h", avgRepairCost: "₹0.6L", annualExposure: "₹0.15 Cr", risk: "red" as const },
  { component: "Speedometer Drive", code: "SPD-90", installedBase: 2980, failureRate: "0.61/1000h", avgRepairCost: "₹0.9L", annualExposure: "₹0.12 Cr", risk: "amber" as const },
  { component: "Suspension Damper", code: "SD-650", installedBase: 3980, failureRate: "0.29/1000h", avgRepairCost: "₹1.9L", annualExposure: "₹0.14 Cr", risk: "amber" as const },
  { component: "Air Brake Valve", code: "ABV-400", installedBase: 4110, failureRate: "0.38/1000h", avgRepairCost: "₹1.6L", annualExposure: "₹0.16 Cr", risk: "amber" as const },
];

export function SelfInsuranceView() {
  return (
    <div>
      <PageHeader icon="finance" title="Self-Insurance Analysis" subtitle="Analysis of warranty exposure not covered by external insurance and reserve adequacy" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Self-Insured Exposure" value="₹0.8 Cr" icon="finance" />
        <StatCard label="Current Reserve" value="₹28.2 Cr" icon="finance" />
        <StatCard label="Reserve Ratio" value="3600%" tone="success" icon="finance" />
        <StatCard label="Uninsured Components" value="6" tone="warning" icon="verification" />
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="target" size="md" />
              <span className="truncate">Reserve Adequacy Trend</span>
            </CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={reserveTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
              <YAxis domain={[0, 32]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "₹ Cr", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="reserve" name="Reserve" stroke="var(--primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="claims" name="Actual/Projected Claims" stroke="var(--destructive)" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-start gap-2 rounded-md border border-warning-stroke bg-warning-background p-3 text-sm text-warning">
            <AppIcon name="warning" size="md" className="mt-0.5" />
            Reserve ratio projected to fall below 100% in FY 2026 — action recommended
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Self-Insured Components</span>
            </CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="text-right">Installed Base</TableHead>
                <TableHead className="text-right">Failure Rate</TableHead>
                <TableHead className="text-right">Avg Repair Cost</TableHead>
                <TableHead className="text-right">Annual Exposure</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uninsuredComponents.map((c) => (
                <TableRow key={c.code}>
                  <TableCell className="font-medium text-foreground">{c.component}</TableCell>
                  <TableCell className="text-muted-foreground">{c.code}</TableCell>
                  <TableCell className="text-right">{c.installedBase.toLocaleString(NUMBER_LOCALE)}</TableCell>
                  <TableCell className="text-right">{c.failureRate}</TableCell>
                  <TableCell className="text-right">{c.avgRepairCost}</TableCell>
                  <TableCell className="text-right">{c.annualExposure}</TableCell>
                  <TableCell><RiskBadge tone={c.risk} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
