"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import {
  BarChart,
  Bar,
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
import { dataSources } from "@/lib/data-sources";
import { NUMBER_LOCALE } from "@/lib/utils";

const dimensions = [
  { dimension: "Completeness", value: 93 },
  { dimension: "Accuracy", value: 96 },
  { dimension: "Timeliness", value: 91 },
  { dimension: "Consistency", value: 94 },
  { dimension: "Uniqueness", value: 98 },
  { dimension: "Validity", value: 95 },
];

const qualityTrend = [
  { month: "Apr 25", completeness: 88, accuracy: 92, timeliness: 86, consistency: 89 },
  { month: "Jun 25", completeness: 90, accuracy: 93, timeliness: 87, consistency: 90 },
  { month: "Aug 25", completeness: 91, accuracy: 94, timeliness: 88, consistency: 91 },
  { month: "Oct 25", completeness: 92, accuracy: 95, timeliness: 89, consistency: 93 },
  { month: "Dec 25", completeness: 93, accuracy: 96, timeliness: 90, consistency: 94 },
  { month: "Mar 26", completeness: 93, accuracy: 96, timeliness: 91, consistency: 95 },
];

const dimensionBreakdown = dataSources.map((s, i) => ({
  source: s.name,
  completeness: Math.max(75, s.quality - 6 + (i % 3)),
  accuracy: Math.max(80, s.quality + 1),
  timeliness: Math.max(78, s.quality - 2),
  consistency: Math.max(80, s.quality - 1),
  overall: s.quality,
}));

const issues = [
  { id: "DQ-001", source: "IBM Maximo CMMS", field: "failure_timestamp", type: "Missing values", records: 342, severity: "high", status: "investigating" },
  { id: "DQ-002", source: "Field Service Mobile", field: "resolution_notes", type: "Missing values", records: 890, severity: "medium", status: "open" },
  { id: "DQ-003", source: "Supplier Quality Portal", field: "batch_id", type: "Format mismatch", records: 128, severity: "medium", status: "open" },
  { id: "DQ-004", source: "Legacy Warranty Database", field: "component_code", type: "Duplicate records", records: 214, severity: "high", status: "open" },
  { id: "DQ-005", source: "SAP S/4HANA ERP", field: "purchase_order", type: "Referential integrity", records: 46, severity: "low", status: "resolved" },
  { id: "DQ-006", source: "IoT Sensor Platform", field: "sensor_reading", type: "Out-of-range values", records: 312, severity: "critical", status: "investigating" },
  { id: "DQ-007", source: "Siemens QMS", field: "inspection_date", type: "Stale data", records: 58, severity: "low", status: "resolved" },
  { id: "DQ-008", source: "Contract Management System", field: "renewal_date", type: "Missing values", records: 12, severity: "low", status: "open" },
  { id: "DQ-009", source: "HR & Workforce System", field: "employee_id", type: "Format mismatch", records: 9, severity: "low", status: "resolved" },
  { id: "DQ-010", source: "Insurance Portal—NIAI", field: "policy_number", type: "Duplicate records", records: 5, severity: "low", status: "open" },
];

const severityTone: Record<string, "destructive" | "secondary" | "outline"> = {
  critical: "destructive",
  high: "destructive",
  medium: "secondary",
  low: "outline",
};

export function DataQualityView() {
  const [severity, setSeverity] = useState("All Severities");
  const [status, setStatus] = useState("All Statuses");

  const filteredIssues = useMemo(
    () =>
      issues.filter((i) => {
        if (severity !== "All Severities" && i.severity !== severity.toLowerCase()) return false;
        if (status !== "All Statuses" && i.status !== status.toLowerCase()) return false;
        return true;
      }),
    [severity, status]
  );

  return (
    <div>
      <PageHeader icon="visibility" title="Data Quality Monitor" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Overall Quality Score" value="94.2%" tone="success" icon="verification" />
        <StatCard label="Open Issues" value="8" tone="warning" icon="warning" />
        <StatCard label="Critical Issues" value="1" tone="danger" icon="alert" />
        <StatCard label="Affected Records" value="2,016" icon="database" />
        <StatCard label="Data Sources" value="10" icon="database" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Quality Dimensions</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dimensions} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[80, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="dimension" type="category" width={100} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Quality Score by Source</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dataSources} margin={{ top: 8, right: 8, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} angle={-30} textAnchor="end" height={70} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="quality" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Quality Trend</span>
            </CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={qualityTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="completeness" name="Completeness" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="accuracy" name="Accuracy" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="timeliness" name="Timeliness" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="consistency" name="Consistency" stroke="var(--chart-5)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="report" size="md" />
              <span className="truncate">Dimension Breakdown</span>
            </CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data Source</TableHead>
                  <TableHead className="text-right">Completeness</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">Timeliness</TableHead>
                  <TableHead className="text-right">Consistency</TableHead>
                  <TableHead className="text-right">Overall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dimensionBreakdown.map((d) => (
                  <TableRow key={d.source}>
                    <TableCell className="font-medium text-foreground">{d.source}</TableCell>
                    <TableCell className="text-right">{d.completeness.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{d.accuracy.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{d.timeliness.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{d.consistency.toFixed(1)}%</TableCell>
                    <TableCell className="text-right font-medium">{d.overall.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="warning" size="md" />
              <span className="truncate">Active Issue Log</span>
            </CardTitle></CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <FilterTabs options={["All Severities", "Critical", "High", "Medium", "Low"]} value={severity} onChange={setSeverity} />
            <FilterTabs options={["All Statuses", "Open", "Investigating", "Resolved"]} value={status} onChange={setStatus} />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead className="text-right">Affected Records</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium text-foreground">{i.id}</TableCell>
                    <TableCell className="text-muted-foreground">{i.source}</TableCell>
                    <TableCell className="text-muted-foreground">{i.field}</TableCell>
                    <TableCell className="text-muted-foreground">{i.type}</TableCell>
                    <TableCell className="text-right">{i.records.toLocaleString(NUMBER_LOCALE)}</TableCell>
                    <TableCell><Badge variant={severityTone[i.severity]}>{i.severity}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{i.status}</TableCell>
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
