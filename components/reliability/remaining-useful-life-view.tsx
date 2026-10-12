"use client";

import {
  BarChart,
  Bar,
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NUMBER_LOCALE } from "@/lib/utils";

const distribution = [
  { range: "0k-5k", critical: 60, warning: 20, healthy: 0 },
  { range: "5k-15k", critical: 180, warning: 60, healthy: 10 },
  { range: "15k-30k", critical: 40, warning: 220, healthy: 80 },
  { range: "30k-50k", critical: 10, warning: 340, healthy: 260 },
  { range: "50k-70k", critical: 0, warning: 260, healthy: 420 },
  { range: "70k-90k", critical: 0, warning: 120, healthy: 480 },
  { range: "90k-100k", critical: 0, warning: 40, healthy: 380 },
];

const ageProfile = [
  { year: "2017", propulsion: 420, braking: 380, runningGear: 310, electrical: 260 },
  { year: "2018", propulsion: 540, braking: 460, runningGear: 400, electrical: 340 },
  { year: "2019", propulsion: 620, braking: 540, runningGear: 480, electrical: 410 },
  { year: "2020", propulsion: 700, braking: 610, runningGear: 560, electrical: 480 },
  { year: "2021", propulsion: 780, braking: 690, runningGear: 640, electrical: 550 },
  { year: "2022", propulsion: 860, braking: 760, runningGear: 720, electrical: 620 },
  { year: "2023", propulsion: 940, braking: 840, runningGear: 800, electrical: 700 },
  { year: "2024", propulsion: 1020, braking: 920, runningGear: 880, electrical: 780 },
  { year: "2025", propulsion: 1120, braking: 1010, runningGear: 960, electrical: 860 },
  { year: "2026", propulsion: 1200, braking: 1080, runningGear: 1040, electrical: 940 },
];

const atRisk = [
  { serial: "TM-450-2847", type: "Traction Motor", hours: 42800, rul: 2400, prob: 82, status: "In-warranty", action: "Schedule preventive maintenance" },
  { serial: "TI-550-1089", type: "Traction Inverter", hours: 48200, rul: 1800, prob: 78, status: "AMC-covered", action: "Replace IGBT module" },
  { serial: "PA-X3-0442", type: "Pantograph Assembly", hours: 29400, rul: 2100, prob: 74, status: "Out of warranty", action: "Priority inspection" },
  { serial: "GB-300-3312", type: "Gangway Bellows", hours: 24800, rul: 1200, prob: 88, status: "In-warranty", action: "Replace bellows" },
  { serial: "SPD-90-1187", type: "Speedometer Drive", hours: 33900, rul: 2600, prob: 65, status: "AMC-covered", action: "Sensor calibration" },
  { serial: "ABV-400-2765", type: "Air Brake Valve", hours: 40200, rul: 2900, prob: 61, status: "In-warranty", action: "Diaphragm inspection" },
  { serial: "BCU-240-0891", type: "Battery Charger Unit", hours: 36700, rul: 2200, prob: 69, status: "Out of warranty", action: "Rectifier check" },
  { serial: "APU-320-1543", type: "Auxiliary Power Unit", hours: 38500, rul: 2700, prob: 58, status: "AMC-covered", action: "Capacitor replacement" },
  { serial: "SD-650-4021", type: "Suspension Damper", hours: 44100, rul: 2000, prob: 71, status: "In-warranty", action: "Seal replacement" },
  { serial: "HC-800-2298", type: "HVAC Compressor", hours: 31200, rul: 2500, prob: 63, status: "Out of warranty", action: "Refrigerant service" },
];

export function RemainingUsefulLifeView() {
  return (
    <div>
      <PageHeader icon="time" title="Remaining Useful Life" subtitle="Fleet-wide RUL predictions for all components in service" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Components Monitored" value="14,847" icon="package" />
        <StatCard label="Critical (< 3000h RUL)" value="342" tone="danger" icon="alert" />
        <StatCard label="Warning (3k-15k hrs)" value="2,184" tone="warning" icon="warning" />
        <StatCard label="Healthy (> 15k hrs)" value="12,321" tone="success" icon="metrics" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="time" size="md" />
              <span className="truncate">Predicted Remaining Life Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={distribution} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="critical" name="Critical (<30%)" stackId="a" fill="var(--destructive)" />
                <Bar dataKey="warning" name="Warning (30-70%)" stackId="a" fill="var(--chart-4)" />
                <Bar dataKey="healthy" name="Healthy (>70%)" stackId="a" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="time" size="md" />
              <span className="truncate">Fleet Age Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ageProfile} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="propulsion" name="Propulsion" stackId="a" fill="var(--chart-1)" />
                <Bar dataKey="braking" name="Braking" stackId="a" fill="var(--chart-2)" />
                <Bar dataKey="runningGear" name="Running Gear" stackId="a" fill="var(--chart-3)" />
                <Bar dataKey="electrical" name="Electrical" stackId="a" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="target" size="md" />
              <span className="truncate">Components at Risk — Next 6 Months</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial No.</TableHead>
                  <TableHead>Component Type</TableHead>
                  <TableHead className="text-right">Current Hours</TableHead>
                  <TableHead className="text-right">Predicted RUL (hrs)</TableHead>
                  <TableHead className="text-right">Failure Prob. (6m)</TableHead>
                  <TableHead>Warranty Status</TableHead>
                  <TableHead>Recommended Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atRisk.map((r) => (
                  <TableRow key={r.serial}>
                    <TableCell className="font-medium text-foreground">{r.serial}</TableCell>
                    <TableCell className="text-muted-foreground">{r.type}</TableCell>
                    <TableCell className="text-right">{r.hours.toLocaleString(NUMBER_LOCALE)}</TableCell>
                    <TableCell className="text-right">{r.rul.toLocaleString(NUMBER_LOCALE)}</TableCell>
                    <TableCell className="text-right">{r.prob}%</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Out of warranty" ? "destructive" : "outline"}>{r.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.action}</TableCell>
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
