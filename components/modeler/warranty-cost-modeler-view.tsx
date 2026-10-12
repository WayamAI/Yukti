"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { componentFamilies } from "@/lib/component-families";
import { cn } from "@/lib/utils";

const coverageScopes = [
  { key: "full", label: "Full", multiplier: 1 },
  { key: "repair", label: "Repair", multiplier: 0.65 },
  { key: "parts", label: "Parts", multiplier: 0.4 },
];

const operatingProfiles = [
  { key: "light", label: "Light", multiplier: 0.8 },
  { key: "standard", label: "Standard", multiplier: 1 },
  { key: "heavy", label: "Heavy", multiplier: 1.35 },
];

function formatLakh(value: number) {
  if (value >= 100) return `₹${(value / 100).toFixed(2)}Cr`;
  return `₹${value.toFixed(2)}L`;
}

export function WarrantyCostModelerView() {
  const [familyCode, setFamilyCode] = useState(componentFamilies[0].code);
  const [duration, setDuration] = useState(5);
  const [coverage, setCoverage] = useState("full");
  const [profile, setProfile] = useState("standard");
  const [volume, setVolume] = useState(500);
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const family = componentFamilies.find((f) => f.code === familyCode)!;
  const coverageMult = coverageScopes.find((c) => c.key === coverage)!.multiplier;
  const profileMult = operatingProfiles.find((p) => p.key === profile)!.multiplier;

  const FLEET_SCALE = 380; // scales per-unit failure probability up to a fleet-lifetime cost exposure

  const costForDuration = (years: number) => {
    const expectedFailures = (family.baseFailureRate / 1000) * years * profileMult;
    let cost = expectedFailures * family.baseRepairCostLakh * coverageMult * FLEET_SCALE;
    if (includeInsurance) cost *= 1.08;
    return cost;
  };

  const expectedCost = useMemo(() => costForDuration(duration), [
    familyCode,
    duration,
    coverage,
    profile,
    includeInsurance,
  ]);

  const ciLow = expectedCost * 0.76;
  const ciHigh = expectedCost * 1.4;

  const durationSeries = useMemo(() => {
    const points = [];
    for (let y = 1; y <= 10; y += 0.5) {
      points.push({ year: y, cost: Number(costForDuration(y).toFixed(2)) });
    }
    return points;
  }, [familyCode, coverage, profile, includeInsurance]);

  const cumulativeExposure = useMemo(() => {
    const years = Math.round(duration);
    const points = [];
    for (let y = 1; y <= years; y++) {
      const perUnit = costForDuration(y);
      const totalCr = (perUnit * volume) / 100;
      points.push({ year: `Year ${y}`, exposure: Number(totalCr.toFixed(1)) });
    }
    return points;
  }, [familyCode, duration, coverage, profile, includeInsurance, volume]);

  const sensitivity = [
    {
      variable: "Failure rate",
      low: -expectedCost * 0.35,
      high: expectedCost * 0.4,
      impact: "High" as const,
    },
    {
      variable: "Repair cost",
      low: -expectedCost * 0.25,
      high: expectedCost * 0.25,
      impact: "Medium" as const,
    },
    {
      variable: "Insurance premium",
      low: includeInsurance ? -expectedCost * 0.05 : 0,
      high: includeInsurance ? expectedCost * 0.05 : 0,
      impact: "Low" as const,
    },
  ];

  const breakdown = [
    { label: "Parts", value: expectedCost * 0.42 },
    { label: "Labor", value: expectedCost * 0.28 },
    { label: "Logistics", value: expectedCost * 0.12 },
    { label: "Insurance", value: includeInsurance ? expectedCost * 0.18 : 0 },
  ];

  return (
    <div>
      <PageHeader
        icon="metrics"
        title="Warranty Cost Modeler"
        subtitle="Interactive warranty cost calculator based on reliability data"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="controls" size="md" />
              <span className="truncate">Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Component Family
              </Label>
              <Select
                value={familyCode}
                onValueChange={(v) => v && setFamilyCode(v)}
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

            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Warranty Duration: {duration} Year{duration > 1 ? "s" : ""}
              </Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[duration]}
                onValueChange={(v) => setDuration(Array.isArray(v) ? v[0] : v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1yr</span>
                <span>10yr</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Coverage Scope
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {coverageScopes.map((c) => (
                  <Button
                    key={c.key}
                    type="button"
                    variant={coverage === c.key ? "default" : "outline"}
                    className="h-9"
                    onClick={() => setCoverage(c.key)}
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Operating Profile
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {operatingProfiles.map((p) => (
                  <Button
                    key={p.key}
                    type="button"
                    variant={profile === p.key ? "default" : "outline"}
                    className="h-9"
                    onClick={() => setProfile(p.key)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Annual Production Volume
              </Label>
              <Input
                type="number"
                value={volume}
                min={1}
                onChange={(e) => setVolume(Number(e.target.value) || 0)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="include-insurance"
                checked={includeInsurance}
                onCheckedChange={(v) => setIncludeInsurance(Boolean(v))}
              />
              <Label htmlFor="include-insurance" className="text-sm font-normal">
                Include insurance cost
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-xs font-medium  tracking-wide text-muted-foreground">
                Expected Warranty Cost Per Unit
              </p>
              <p className="mt-2 text-4xl font-semibold text-foreground">
                {formatLakh(expectedCost)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                90% CI: {formatLakh(ciLow)} – {formatLakh(ciHigh)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Cost vs. Duration</span>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={durationSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="year"
                    type="number"
                    domain={[1, 10]}
                    ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                    label={{ value: "Years", position: "insideBottom", offset: -4, fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "₹ Lakh/unit", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="cost" stroke="var(--primary)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Cost Breakdown</span>
            </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{b.label}</span>
                      <span className="text-muted-foreground">{formatLakh(b.value)}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-raised overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(100, (b.value / expectedCost) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="report" size="md" />
              <span className="truncate">Sensitivity Analysis</span>
            </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs  tracking-wide text-muted-foreground">
                      <th className="pb-2 font-medium">Variable</th>
                      <th className="pb-2 font-medium">-20%</th>
                      <th className="pb-2 font-medium">+20%</th>
                      <th className="pb-2 font-medium">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivity.map((s) => (
                      <tr key={s.variable} className="border-t border-border">
                        <td className="py-2 text-foreground">{s.variable}</td>
                        <td className="py-2 text-destructive">{formatLakh(s.low)}/unit</td>
                        <td className="py-2 text-success">+{formatLakh(s.high)}/unit</td>
                        <td className="py-2">
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              s.impact === "High" && "bg-destructive/10 text-destructive",
                              s.impact === "Medium" && "bg-accent text-accent-foreground",
                              s.impact === "Low" && "bg-raised text-muted-foreground"
                            )}
                          >
                            {s.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Annual Warranty Exposure (Cumulative)</span>
            </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cumulativeExposure} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "₹ Cr", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="exposure" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button>Save scenario</Button>
            <Button variant="outline">Compare scenarios</Button>
            <Button variant="outline">Export to PDF</Button>
            <Button variant="outline">Send to tender team</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
