"use client";

import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { NUMBER_LOCALE } from "@/lib/utils";

const batches = [
  "Batch #TM-2026-Q1 (240 units, Jan 2026)",
  "Batch #TM-2025-Q4 (200 units, Oct 2025)",
];

const affectedUnits = [
  { serial: "VB-2024-0847", line: "Vande Bharat", component: "Traction Motor TM-450", installed: "12 Mar 2024", hours: 14200, status: "In Warranty", location: "Chennai", risk: 12, action: "Monitor" },
  { serial: "EMU-2023-0456", line: "EMU (Mumbai)", component: "Traction Motor TM-450", installed: "05 Jun 2023", hours: 26400, status: "In Warranty", location: "Mumbai", risk: 32, action: "Priority Replacement" },
  { serial: "MC-2023-0298", line: "Metro (Bangalore)", component: "Traction Motor TM-450", installed: "08 Mar 2023", hours: 28400, status: "Out of Warranty", location: "Bangalore", risk: 35, action: "Priority Replacement" },
  { serial: "LHB-2024-1120", line: "LHB Coach", component: "Traction Motor TM-450", installed: "22 May 2024", hours: 9800, status: "In Warranty", location: "Delhi", risk: 8, action: "Monitor" },
  { serial: "VB-2023-0512", line: "Vande Bharat", component: "Traction Motor TM-450", installed: "14 Feb 2023", hours: 31200, status: "Out of Warranty", location: "Hyderabad", risk: 38, action: "Priority Replacement" },
  { serial: "EMU-2024-0089", line: "EMU (Mumbai)", component: "Traction Motor TM-450", installed: "30 Jan 2024", hours: 16800, status: "In Warranty", location: "Mumbai", risk: 18, action: "Monitor" },
];

const byLocation = [
  { location: "Chennai", count: 2 },
  { location: "Delhi", count: 1 },
  { location: "Hyderabad", count: 3 },
  { location: "Howrah", count: 1 },
  { location: "Jaipur", count: 2 },
  { location: "Pune", count: 1 },
  { location: "Varanasi", count: 1 },
];

const financialImpact = [
  { category: "Warranty claims (expected)", cost: "₹1.12 Cr", range: "±₹0.34 Cr" },
  { category: "Preventive inspection cost", cost: "₹0.28 Cr", range: "±₹0.05 Cr" },
  { category: "Proactive replacement cost", cost: "₹0.47 Cr", range: "±₹0.18 Cr" },
  { category: "Total exposure", cost: "₹1.87 Cr", range: "±₹0.57 Cr" },
];

const recentCalculations = [
  { supplier: "Medha Servo Drives", batch: "TM-2026-Q1", units: 47, cost: "₹2.3 Cr", date: "20 Mar 2026" },
  { supplier: "Delta Electronics India", batch: "APC-2025-M2", units: 128, cost: "₹4.8 Cr", date: "19 Mar 2026" },
  { supplier: "Mersen India", batch: "PA-2024-Q3", units: 82, cost: "₹1.9 Cr", date: "18 Mar 2026" },
  { supplier: "Bharat Forge", batch: "All batches", units: 1560, cost: "₹14.2 Cr", date: "17 Mar 2026" },
];

export function BlastRadiusView() {
  const [mode, setMode] = useState("supplier-batch");
  const [supplier, setSupplier] = useState(suppliers[22].name); // Medha Servo Drives
  const [batch, setBatch] = useState(batches[0]);
  const [calculated, setCalculated] = useState(false);

  return (
    <div>
      <PageHeader icon="topology" title="Blast Radius Calculator" subtitle="Assess the impact of a supplier or batch quality issue" />

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Tabs value={mode} onValueChange={setMode}>
            <TabsList>
              <TabsTrigger value="supplier-batch">By Supplier + Batch</TabsTrigger>
              <TabsTrigger value="supplier-all">By Supplier (all batches)</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              value={supplier}
              onValueChange={(v) => v && setSupplier(v)}
              items={suppliers.map((s) => ({ value: s.name, label: s.name }))}
            >
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {mode === "supplier-batch" && (
              <Select
                value={batch}
                onValueChange={(v) => v && setBatch(v)}
                items={batches.map((b) => ({ value: b, label: b }))}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {batches.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button onClick={() => setCalculated(true)}>Calculate Blast Radius</Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Affected Assemblies" value="18" icon="package" />
            <StatCard label="In Service" value="17" icon="tools" />
            <StatCard label="In Warranty" value="12" icon="security" />
            <StatCard label="Exposure" value="₹2.34 Cr" tone="warning" icon="finance" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <StatCard label="Under AMC" value="4" icon="tools" />
            <StatCard label="Unprotected" value="2" tone="danger" icon="metrics" />
            <StatCard label="Est. Recall/Rework" value="₹1.87 Cr" tone="danger" icon="metrics" />
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="package" size="md" />
              <span className="truncate">Affected Units</span>
            </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Product Line</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Installation Date</TableHead>
                      <TableHead className="text-right">Operating Hours</TableHead>
                      <TableHead>Warranty Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Failure Risk (12mo)</TableHead>
                      <TableHead>Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affectedUnits.map((u) => (
                      <TableRow key={u.serial}>
                        <TableCell className="font-medium text-foreground">{u.serial}</TableCell>
                        <TableCell className="text-muted-foreground">{u.line}</TableCell>
                        <TableCell className="text-muted-foreground">{u.component}</TableCell>
                        <TableCell className="text-muted-foreground">{u.installed}</TableCell>
                        <TableCell className="text-right">{u.hours.toLocaleString(NUMBER_LOCALE)}</TableCell>
                        <TableCell>
                          <Badge variant={u.status === "Out of Warranty" ? "destructive" : "outline"}>{u.status}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.location}</TableCell>
                        <TableCell className="text-right">{u.risk}%</TableCell>
                        <TableCell className="text-muted-foreground">{u.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="package" size="md" />
              <span className="truncate">Affected Units by Location</span>
            </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={byLocation} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <YAxis dataKey="location" type="category" width={80} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                    <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Financial Impact Breakdown</span>
            </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Impact Category</TableHead>
                      <TableHead className="text-right">Estimated Cost</TableHead>
                      <TableHead className="text-right">Confidence Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialImpact.map((f) => (
                      <TableRow key={f.category}>
                        <TableCell className={f.category === "Total exposure" ? "font-medium text-foreground" : "text-muted-foreground"}>{f.category}</TableCell>
                        <TableCell className="text-right font-medium">{f.cost}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{f.range}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline">Export Affected Units (CSV)</Button>
            <Button variant="outline">Generate Impact Report (PDF)</Button>
            <Button variant="outline">Notify Service Team</Button>
            <Button>Create Inspection Campaign</Button>
          </div>
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="activity" size="md" />
              <span className="truncate">Recent Calculations</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCalculations.map((c, i) => (
            <div key={i} className="flex items-center justify-between text-sm border-b border-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-foreground">{c.supplier}</p>
                <p className="text-xs text-muted-foreground">{c.batch} · {c.units} units</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{c.cost}</p>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
