"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { suppliers } from "@/lib/suppliers";
import { RiskBadge } from "@/components/risk-badge";
import { AppIcon } from "@/components/ui/app-icon";
import { NUMBER_LOCALE } from "@/lib/utils";

const scoreBuckets = ["30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"];

function statusTone(status: string): "red" | "amber" | "green" {
  if (status === "High") return "red";
  if (status === "Moderate") return "amber";
  return "green";
}

export function SupplierRiskScorecardView() {
  const [tier, setTier] = useState("All Tiers");
  const [risk, setRisk] = useState("All Risk Levels");

  const filtered = useMemo(
    () =>
      suppliers.filter(
        (s) => (tier === "All Tiers" || s.tier === tier) && (risk === "All Risk Levels" || s.status === risk)
      ),
    [tier, risk]
  );

  const distribution = scoreBuckets.map((bucket) => {
    const [low, high] = bucket.split("-").map(Number);
    return { bucket, count: suppliers.filter((s) => s.score >= low && s.score < high).length };
  });

  return (
    <div>
      <PageHeader icon="target" title="Supplier Risk Scorecard" subtitle="Composite risk scores across all active suppliers" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Active Suppliers" value={`${suppliers.length}`} icon="handshake" />
        <StatCard label="High Risk" value={`${suppliers.filter((s) => s.status === "High").length}`} tone="danger" icon="alert" />
        <StatCard label="Moderate Risk" value={`${suppliers.filter((s) => s.status === "Moderate").length}`} tone="warning" icon="warning" />
        <StatCard label="Low Risk" value={`${suppliers.filter((s) => s.status === "Low").length}`} tone="success" icon="verification" />
        <StatCard label="Avg Composite Score" value={`${Math.round(suppliers.reduce((a, s) => a + s.score, 0) / suppliers.length)}/100`} icon="target" />
        <StatCard label="Score Change (QoQ)" value="-2.1 pts" tone="danger" icon="analytics" />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Select
          value={tier}
          onValueChange={(v) => v && setTier(v)}
          items={["All Tiers", "Tier 1", "Tier 2", "Tier 3"].map((t) => ({ value: t, label: t }))}
        >
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["All Tiers", "Tier 1", "Tier 2", "Tier 3"].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={risk}
          onValueChange={(v) => v && setRisk(v)}
          items={["All Risk Levels", "Low", "Moderate", "High"].map((r) => ({
            value: r,
            label: r === "All Risk Levels" ? r : `${r} Risk`,
          }))}
        >
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["All Risk Levels", "Low", "Moderate", "High"].map((r) => (
              <SelectItem key={r} value={r}>{r === "All Risk Levels" ? r : `${r} Risk`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="analytics" size="md" />
              <span className="truncate">Score Distribution</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={distribution} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Bar dataKey="count" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="handshake" size="md" />
              <span className="truncate">Suppliers ({filtered.length})</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Components</TableHead>
                  <TableHead className="text-right">Installed Base</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Quality</TableHead>
                  <TableHead className="text-right">Delivery</TableHead>
                  <TableHead className="text-right">Financial</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="text-muted-foreground">{s.rank}</TableCell>
                    <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.location}</TableCell>
                    <TableCell className="text-right">{s.components}</TableCell>
                    <TableCell className="text-right">{s.installedBase.toLocaleString(NUMBER_LOCALE)}</TableCell>
                    <TableCell className="text-right font-medium">{s.score}/100</TableCell>
                    <TableCell className="text-right">{s.quality}</TableCell>
                    <TableCell className="text-right">{s.delivery}</TableCell>
                    <TableCell className="text-right">{s.financial}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-0.5 text-xs">
                        {s.trend > 0 && <AppIcon name="deltaUp" size="xs" tone="success" />}
                        {s.trend < 0 && <AppIcon name="deltaDown" size="xs" tone="error" />}
                        {s.trend === 0 && <AppIcon name="minus" size="xs" tone="tertiary" />}
                        {s.trend > 0 ? `+${s.trend}` : s.trend}
                      </span>
                    </TableCell>
                    <TableCell>
                      <RiskBadge tone={statusTone(s.status)} label={s.status} />
                    </TableCell>
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
