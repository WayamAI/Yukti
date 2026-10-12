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
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const byCategory = [
  { category: "Scheduled Maintenance", cost: 84.2 },
  { category: "Unscheduled Repairs", cost: 62.8 },
  { category: "Spare Parts", cost: 41.6 },
  { category: "Labour (Field)", cost: 18.4 },
  { category: "Logistics & Transport", cost: 8.2 },
  { category: "Tooling & Equipment", cost: 4.2 },
];

const monthlyTrend = [
  { month: "Oct 24", scheduled: 5.8, unscheduled: 4.2, parts: 2.8 },
  { month: "Dec 24", scheduled: 6.1, unscheduled: 4.6, parts: 3.0 },
  { month: "Feb 25", scheduled: 6.4, unscheduled: 4.9, parts: 3.2 },
  { month: "Apr 25", scheduled: 6.7, unscheduled: 5.1, parts: 3.4 },
  { month: "Jun 25", scheduled: 7.0, unscheduled: 5.4, parts: 3.5 },
  { month: "Aug 25", scheduled: 7.2, unscheduled: 5.7, parts: 3.6 },
  { month: "Oct 25", scheduled: 7.4, unscheduled: 6.0, parts: 3.7 },
  { month: "Dec 25", scheduled: 7.6, unscheduled: 6.3, parts: 3.8 },
  { month: "Jan 26", scheduled: 7.7, unscheduled: 6.5, parts: 3.9 },
];

const byFamily = [
  { name: "Wheel Set", scheduled: 22, unscheduled: 14 },
  { name: "Traction Motor", scheduled: 18, unscheduled: 24 },
  { name: "Brake Disc Assembly", scheduled: 16, unscheduled: 10 },
  { name: "Bogie Frame", scheduled: 14, unscheduled: 8 },
  { name: "HVAC Compressor", scheduled: 12, unscheduled: 11 },
  { name: "Coupler System", scheduled: 10, unscheduled: 9 },
  { name: "Door Operating System", scheduled: 9, unscheduled: 6 },
  { name: "Suspension Damper", scheduled: 8, unscheduled: 7 },
  { name: "Auxiliary Power Unit", scheduled: 7, unscheduled: 9 },
  { name: "Pantograph Assembly", scheduled: 6, unscheduled: 13 },
];

const categoryDetails = [
  { category: "Scheduled Maintenance", cost: "₹84.2 Cr", pct: "38.4%", trend: "-2.1%" },
  { category: "Unscheduled Repairs", cost: "₹62.8 Cr", pct: "28.6%", trend: "+5.8%" },
  { category: "Spare Parts", cost: "₹41.6 Cr", pct: "19.0%", trend: "+1.2%" },
  { category: "Labour (Field)", cost: "₹18.4 Cr", pct: "8.4%", trend: "+0.4%" },
  { category: "Logistics & Transport", cost: "₹8.2 Cr", pct: "3.7%", trend: "-0.8%" },
  { category: "Tooling & Equipment", cost: "₹4.2 Cr", pct: "1.9%", trend: "+0.2%" },
];

export function ServiceCostTrackingView() {
  return (
    <div>
      <PageHeader icon="tools" title="Service Cost Tracking" subtitle="AMC Management / Service Cost Tracking" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Service Cost (YTD)" value="₹219.4 Cr" icon="finance" />
        <StatCard label="Annual Budget" value="₹248.0 Cr" icon="finance" />
        <StatCard label="Budget Variance" value="-11.5%" tone="success" icon="finance" />
        <StatCard label="Cost/Unit/Month" value="₹1.24L" icon="finance" />
        <StatCard label="Active Contracts" value="12" icon="verification" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Cost by Category</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byCategory} margin={{ top: 8, right: 8, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "₹ Cr", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Bar dataKey="cost" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Monthly Cost Trend</span>
            </CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "₹ Cr", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="unscheduled" name="Unscheduled" stroke="var(--destructive)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="parts" name="Parts" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Service Cost by Component Family</span>
            </CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={byFamily} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "₹ Cr", position: "insideBottomRight", fontSize: 11, fill: "var(--muted-foreground)" }} />
              <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="scheduled" name="Scheduled" stackId="a" fill="var(--chart-2)" />
              <Bar dataKey="unscheduled" name="Unscheduled" stackId="a" fill="var(--destructive)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="report" size="md" />
              <span className="truncate">Category Details</span>
            </CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
                <TableHead className="text-right">YoY Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryDetails.map((c) => (
                <TableRow key={c.category}>
                  <TableCell className="font-medium text-foreground">{c.category}</TableCell>
                  <TableCell className="text-right">{c.cost}</TableCell>
                  <TableCell className="text-right">{c.pct}</TableCell>
                  <TableCell className={`text-right ${c.trend.startsWith("+") ? "text-destructive" : "text-success"}`}>{c.trend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
