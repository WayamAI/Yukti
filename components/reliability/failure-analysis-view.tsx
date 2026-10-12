"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  LineChart,
  Line,
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
import { componentFamilies } from "@/lib/component-families";
import { NUMBER_LOCALE } from "@/lib/utils";

const failureModes = [
  "Bearing seizure",
  "IGBT failure",
  "Insulation breakdown",
  "Carbon strip wear",
  "Capacitor degradation",
  "Connector corrosion",
  "Other",
];

function seededSplit(seed: number, n: number) {
  // deterministic pseudo-random shares that sum to 1
  let x = seed;
  const raw = Array.from({ length: n }, () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  });
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / sum);
}

export function FailureAnalysisView() {
  const [code, setCode] = useState(componentFamilies[0].code);
  const family = componentFamilies.find((f) => f.code === code)!;
  const seed = code.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const installedBase = 800 + (seed % 25) * 90;
  const mtbf = Math.round(1_000_000 / (family.baseFailureRate * 10));
  const totalFailures = Math.round(installedBase * family.baseFailureRate * 0.03);
  const claimsFiled = Math.round(totalFailures * 0.77);
  const totalClaimCost = (totalFailures * family.baseRepairCostLakh) / 100;

  const survival = useMemo(() => {
    const points = [];
    for (let h = 0; h <= 100000; h += 5000) {
      const pct = 100 * Math.exp(-Math.pow(h / mtbf, 1.4));
      points.push({ hours: h, pct: Number(pct.toFixed(1)) });
    }
    return points;
  }, [mtbf]);

  const paretoShares = useMemo(() => seededSplit(seed || 1, failureModes.length), [seed]);
  const pareto = failureModes
    .map((mode, i) => ({ mode, count: Math.round(totalFailures * paretoShares[i]) }))
    .sort((a, b) => b.count - a.count);

  return (
    <div>
      <PageHeader icon="warning" title="Failure Analysis" subtitle="Component Reliability / Failure Analysis" />

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Installed Base" value={installedBase.toLocaleString(NUMBER_LOCALE)} icon="package" />
        <StatCard label="MTBF" value={`${mtbf.toLocaleString(NUMBER_LOCALE)} hrs`} icon="metrics" />
        <StatCard label="Failure Rate" value={`${family.baseFailureRate.toFixed(2)}/1000h`} icon="warning" />
        <StatCard label="Total Failures (12m)" value={`${totalFailures}`} icon="warning" />
        <StatCard label="Warranty Claims Filed" value={`${claimsFiled} (${Math.round((claimsFiled / totalFailures) * 100)}%)`} icon="security" />
        <StatCard label="Total Claim Cost (12m)" value={`₹${totalClaimCost.toFixed(2)} Cr`} icon="finance" />
        <StatCard label="Avg Time to Repair" value="6.2 hours" icon="time" />
        <StatCard label="Dominant Supplier" value="Medha Servo (38%)" icon="handshake" />
        <StatCard label="Warranty Coverage Rate" value={`${Math.round((claimsFiled / totalFailures) * 100)}%`} icon="security" />
        <StatCard label="Avg Age at Failure" value={`${Math.round(mtbf * 0.5).toLocaleString(NUMBER_LOCALE)} hrs`} icon="time" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="time" size="md" />
              <span className="truncate">Weibull Survival Curve</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={survival} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="hours" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} label={{ value: "Operating Hours", position: "insideBottom", offset: -4, fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "% Surviving", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Line type="monotone" dataKey="pct" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="warning" size="md" />
              <span className="truncate">Failure Mode Breakdown (Pareto)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={pareto} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mode" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="warning" size="md" />
              <span className="truncate">Failure Mode Details</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Failure Mode</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">%</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Avg Hours to Failure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pareto.map((p) => (
                <TableRow key={p.mode}>
                  <TableCell className="font-medium text-foreground">{p.mode}</TableCell>
                  <TableCell className="text-right">{p.count}</TableCell>
                  <TableCell className="text-right">{((p.count / totalFailures) * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right">₹{(family.baseRepairCostLakh * 0.75).toFixed(1)}L</TableCell>
                  <TableCell className="text-right">{Math.round(mtbf * 0.85).toLocaleString(NUMBER_LOCALE)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
