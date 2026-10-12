"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { NUMBER_LOCALE } from "@/lib/utils";

const riskFactors = [
  { factor: "Quality", value: 52 },
  { factor: "Delivery", value: 68 },
  { factor: "Financial", value: 61 },
  { factor: "Concentration", value: 44 },
  { factor: "Compliance", value: 72 },
];

const componentsSupplied = [
  { family: "Traction Motor TM-450", parts: "TM-450-A, TM-450-B", installed: 1420, mtbf: "44,800h", failureRate: "0.52/1000h", cost5: "₹90.0L", alternatives: "BHEL (₹56.6L), Siemens India (₹62.1L)" },
  { family: "IGBT Module IG-200", parts: "IG-200-R3", installed: 890, mtbf: "38,200h", failureRate: "0.64/1000h", cost5: "₹42.3L", alternatives: "Mitsubishi Electric (₹31.8L), Hitachi Energy (₹34.2L)" },
];

const rejectionTrend = [
  { month: "Apr 24", rejection: 1.8, threshold: 3 },
  { month: "Jul 24", rejection: 2.1, threshold: 3 },
  { month: "Oct 24", rejection: 2.6, threshold: 3 },
  { month: "Jan 25", rejection: 3.2, threshold: 3 },
  { month: "Apr 25", rejection: 2.9, threshold: 3 },
  { month: "Jul 25", rejection: 3.6, threshold: 3 },
  { month: "Oct 25", rejection: 4.0, threshold: 3 },
  { month: "Dec 25", rejection: 4.2, threshold: 3 },
];

const otdTrend = [
  { month: "Apr 24", otd: 96 },
  { month: "Jul 24", otd: 94 },
  { month: "Oct 24", otd: 91 },
  { month: "Jan 25", otd: 88 },
  { month: "Apr 25", otd: 92 },
  { month: "Jul 25", otd: 85 },
  { month: "Oct 25", otd: 82 },
  { month: "Dec 25", otd: 78 },
];

const scoreTrend = [
  { month: "Apr 25", score: 71 },
  { month: "Jun 25", score: 68 },
  { month: "Aug 25", score: 62 },
  { month: "Oct 25", score: 60 },
  { month: "Dec 25", score: 58 },
  { month: "Mar 26", score: 58 },
];

const qualityEvents = [
  { date: "2026-03-12", type: "Field Failure", severity: "critical", description: "IGBT module IG-200-R3 catastrophic failure in Vande Bharat unit VB-2024-0847 at 14,200h. Root cause: thermal cycling fatigue.", resolution: "Under Investigation" },
  { date: "2026-02-28", type: "Incoming Inspection", severity: "warning", description: "Batch #TM-2026-Q1: 6 out of 240 units failed vibration test. Rejection rate: 2.5%.", resolution: "Batch quarantined, supplier notified" },
  { date: "2026-02-15", type: "Field Failure", severity: "warning", description: "Traction motor bearing seizure in LHB unit LHB-2023-1204 at 22,800h. 3rd bearing failure from this supplier in Q1.", resolution: "Root cause analysis initiated" },
  { date: "2026-01-22", type: "Audit Finding", severity: "info", description: "Minor non-conformance in incoming material traceability documentation.", resolution: "Corrective action accepted" },
  { date: "2025-12-10", type: "Incoming Inspection", severity: "warning", description: "Batch #IG-2025-Q4: 4 out of 180 IGBT modules showed leakage current above threshold.", resolution: "Units replaced by supplier" },
  { date: "2025-11-18", type: "Field Failure", severity: "critical", description: "Traction motor TM-450-A complete winding failure at 18,400h in Metro coach MC-2024-0312.", resolution: "Warranty claim filed, ₹3.2L" },
  { date: "2025-10-05", type: "Deviation", severity: "info", description: "Process change notification: Medha switching bearing supplier from NTN to local manufacturer.", resolution: "Review in progress" },
  { date: "2025-09-14", type: "Incoming Inspection", severity: "info", description: "Batch #TM-2025-Q3: All 200 units passed inspection. Rejection rate: 0%.", resolution: "Accepted" },
  { date: "2025-08-22", type: "Audit Finding", severity: "warning", description: "Annual audit score: 62/100 (down from 71). Major finding: inadequate statistical process control on winding insulation.", resolution: "Corrective action plan due 30 days" },
  { date: "2025-07-30", type: "Field Failure", severity: "warning", description: "Cluster of 4 traction motor failures in Mumbai EMU fleet. All units from batch #TM-2024-Q2.", resolution: "Batch investigation complete" },
];

const severityTone: Record<string, "destructive" | "secondary" | "outline"> = {
  critical: "destructive",
  warning: "secondary",
  info: "outline",
};

export function SupplierDeepDiveView() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <YuktiIcon name="handshake" size="3xl" />
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Medha Servo Drives</h1>
            <Badge variant="secondary">Under Review</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Hyderabad · Tier 2 · 9 years active · Last audit: 2025-03-15 (Score: 62/100)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Calculate Blast Radius</Button>
          <Button variant="outline">View All Components</Button>
          <Button variant="outline">Compare with Alternative</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <StatCard label="Composite Risk Score" value="58/100" tone="danger" icon="target" />
        <StatCard label="Total Installed Base" value="1,420" icon="package" />
        <StatCard label="In-Warranty Units" value="1,180" icon="security" />
        <StatCard label="Warranty Exposure" value="₹8.4 Cr" tone="warning" icon="finance" />
        <StatCard label="Expected Claims (12mo)" value="₹2.8 Cr" tone="warning" icon="checklist" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="target" size="md" />
              <span className="truncate">Risk Factor Breakdown</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={riskFactors} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="factor" type="category" width={90} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="package" size="md" />
              <span className="truncate">Components Supplied</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component Family</TableHead>
                <TableHead>Part Numbers</TableHead>
                <TableHead className="text-right">Installed Base</TableHead>
                <TableHead className="text-right">MTBF</TableHead>
                <TableHead className="text-right">Failure Rate</TableHead>
                <TableHead className="text-right">Warranty Cost/Unit (5yr)</TableHead>
                <TableHead>Alternative Suppliers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentsSupplied.map((c) => (
                <TableRow key={c.family}>
                  <TableCell className="font-medium text-foreground">{c.family}</TableCell>
                  <TableCell className="text-muted-foreground">{c.parts}</TableCell>
                  <TableCell className="text-right">{c.installed.toLocaleString(NUMBER_LOCALE)}</TableCell>
                  <TableCell className="text-right">{c.mtbf}</TableCell>
                  <TableCell className="text-right">{c.failureRate}</TableCell>
                  <TableCell className="text-right">{c.cost5}</TableCell>
                  <TableCell className="text-muted-foreground">{c.alternatives}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Quality Rejection Rate</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={rejectionTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis domain={[0, 8]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Line type="monotone" dataKey="rejection" name="Rejection Rate" stroke="var(--destructive)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="threshold" name="Threshold" stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="analytics" size="md" />
              <span className="truncate">On-Time Delivery Rate</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={otdTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Line type="monotone" dataKey="otd" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="target" size="md" />
              <span className="truncate">Composite Risk Score Trend</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={scoreTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Recent Quality Events</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityEvents.map((e, i) => (
                <TableRow key={i}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{e.type}</TableCell>
                  <TableCell><Badge variant={severityTone[e.severity]}>{e.severity}</Badge></TableCell>
                  <TableCell className="max-w-md text-foreground">{e.description}</TableCell>
                  <TableCell className="text-muted-foreground">{e.resolution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="pt-6 space-y-3">
          <p className="text-sm text-foreground">
            This supplier&apos;s components cost <strong>₹33.38L</strong> more per unit in warranty exposure vs. the best alternative.
          </p>
          <p className="text-sm text-foreground">
            Switching to BHEL for TM-450 would reduce annual warranty cost by <strong>₹1.2 Cr</strong> across the current installed base.
          </p>
          <Button>Run supplier switch simulation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
