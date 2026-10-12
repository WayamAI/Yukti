"use client";

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
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const claimsTrend = [
  { month: "Apr 24", claims: 6 }, { month: "Jun 24", claims: 9 }, { month: "Aug 24", claims: 12 },
  { month: "Oct 24", claims: 14 }, { month: "Dec 24", claims: 17 }, { month: "Feb 25", claims: 18 },
  { month: "Apr 25", claims: 20 }, { month: "Jun 25", claims: 22 }, { month: "Aug 25", claims: 24 },
  { month: "Oct 25", claims: 25 }, { month: "Dec 25", claims: 27 }, { month: "Jan 26", claims: 28 },
];

const byFamily = [
  { name: "Traction Motor", count: 118 }, { name: "Pantograph Assembly", count: 92 },
  { name: "Suspension Damper", count: 74 }, { name: "Brake Disc Assembly", count: 61 },
  { name: "Gangway Bellows", count: 58 }, { name: "Coupler System", count: 44 },
  { name: "HVAC Compressor", count: 39 }, { name: "Speedometer Drive", count: 32 },
  { name: "Auxiliary Power Unit", count: 28 }, { name: "Battery Charger Unit", count: 21 },
  { name: "Air Brake Valve", count: 17 }, { name: "Wheel Set", count: 12 },
];

const failureModes = [
  { name: "Bearing seizure", count: 58 }, { name: "IGBT failure", count: 41 },
  { name: "Insulation breakdown", count: 33 }, { name: "Carbon strip wear", count: 27 },
  { name: "Capacitor degradation", count: 19 }, { name: "Connector corrosion", count: 12 },
  { name: "Other", count: 8 },
];

const bySupplier = [
  { name: "Knorr-Bremse India", count: 42 }, { name: "Medha Servo Drives", count: 156 },
  { name: "Bharat Heavy Electricals Ltd.", count: 38 }, { name: "Texmaco Rail & Engineering", count: 29 },
  { name: "Bharat Forge", count: 24 }, { name: "Hitachi Energy India", count: 18 },
  { name: "Titagarh Wagons", count: 14 }, { name: "Wabtec India", count: 11 },
  { name: "Siemens India Ltd.", count: 9 }, { name: "Stone India Ltd.", count: 6 },
];

const anomalies = [
  { severity: "Critical" as const, text: "Bearing failure claims for TM-450 increased 340% in Q4 vs. Q3" },
  { severity: "Critical" as const, text: "Supplier Medha Servo components account for 45% of claims but only 22% of installed base" },
  { severity: "Warning" as const, text: "Average claim resolution time increased from 4.8 to 6.2 days in last quarter" },
  { severity: "Warning" as const, text: "IGBT failure claims cost 3.2x the average claim value" },
];

export function ClaimsAnalyticsView() {
  return (
    <div>
      <PageHeader icon="analytics" title="Claims Analytics" subtitle="Analytical views across all warranty claims" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Claims (12m)" value="347" icon="checklist" />
        <StatCard label="Total Claim Value" value="₹18.4 Cr" icon="finance" />
        <StatCard label="Average Claim Value" value="₹5.3L" icon="finance" />
        <StatCard label="Avg Resolution Time" value="6.2 days" tone="warning" icon="metrics" />
        <StatCard label="Approval Rate" value="89.4%" tone="success" icon="verification" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="checklist" size="md" />
              <span className="truncate">Claims Trend (24 months)</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={claimsTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Line type="monotone" dataKey="claims" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="checklist" size="md" />
              <span className="truncate">Claims by Component Family</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byFamily} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="warning" size="md" />
              <span className="truncate">Failure Mode Pareto</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={failureModes} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="checklist" size="md" />
              <span className="truncate">Claims by Supplier</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={bySupplier} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="count" fill="var(--chart-5)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="warning" size="md" />
              <span className="truncate">AI-Detected Anomalies</span>
            </CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {anomalies.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <Badge variant={a.severity === "Critical" ? "destructive" : "secondary"} className="mt-0.5 shrink-0">
                {a.severity}
              </Badge>
              <p className="text-sm text-foreground">{a.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
