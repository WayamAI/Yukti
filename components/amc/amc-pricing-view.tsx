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
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const productLines = ["Vande Bharat Express", "Metro Rolling Stock", "EMU Coaches", "MEMU Coaches"];

const componentsCovered = [
  "Traction Motor (TM-450)", "Brake Disc Assembly (BD-R7)", "Bogie Frame (BF-2200)",
  "Pantograph Assembly (PA-X3)", "Coupler System (CS-900)", "Door Operating System (DOS-150)",
  "HVAC Compressor (HC-800)", "Traction Inverter (TI-550)",
];

const historicalPricing = [
  { fleet: "Delhi Metro (248 units)", duration: "5 years", level: "Premium", price: "₹7.35L", year: 2022 },
  { fleet: "Mumbai Metro (124 units)", duration: "5 years", level: "Standard", price: "₹7.81L", year: 2022 },
  { fleet: "Chennai Metro (182 units)", duration: "5 years", level: "Premium", price: "₹7.05L", year: 2023 },
  { fleet: "Bangalore Metro (156 units)", duration: "3 years", level: "Standard", price: "₹7.23L", year: 2023 },
  { fleet: "Jaipur Metro (72 units)", duration: "5 years", level: "Standard", price: "₹7.33L", year: 2024 },
];

export function AmcPricingView() {
  const [productLine, setProductLine] = useState(productLines[1]);
  const [fleetSize, setFleetSize] = useState(120);
  const [duration, setDuration] = useState(5);
  const [serviceLevel, setServiceLevel] = useState<"Standard" | "Premium">("Standard");
  const [riskProfile, setRiskProfile] = useState<"Conservative" | "Balanced" | "Aggressive">("Balanced");
  const [includeSpares, setIncludeSpares] = useState(true);
  const [escalation, setEscalation] = useState(4);
  const [targetMargin, setTargetMargin] = useState(25);

  const levelMult = serviceLevel === "Premium" ? 1.22 : 1;
  const riskMult = riskProfile === "Conservative" ? 1.12 : riskProfile === "Aggressive" ? 0.9 : 1;

  const scheduled = fleetSize * 0.0077 * levelMult;
  const unscheduled = fleetSize * 0.865 * levelMult * riskMult;
  const spares = includeSpares ? fleetSize * 0.192 * levelMult : 0;
  const overhead = fleetSize * 0.128 * levelMult;
  const totalAnnualCost = scheduled + unscheduled + spares + overhead;

  const marginFactor = 1 / (1 - targetMargin / 100);
  const recommendedPrice = totalAnnualCost * marginFactor * duration;
  const priceLow = recommendedPrice * 0.92;
  const priceHigh = recommendedPrice * 1.12;
  const perUnitPerYear = (recommendedPrice / duration / fleetSize) * 100; // in Lakh

  const projection = useMemo(() => {
    const years = [];
    for (let y = 1; y <= duration; y++) {
      const revenue = (recommendedPrice / duration) * Math.pow(1 + escalation / 100, y - 1);
      const cost = totalAnnualCost * Math.pow(1.06, y - 1); // fleet aging cost creep
      years.push({ year: `Year ${y}`, revenue: Number(revenue.toFixed(1)), cost: Number(cost.toFixed(1)) });
    }
    return years;
  }, [duration, escalation, recommendedPrice, totalAnnualCost]);

  return (
    <div>
      <PageHeader icon="finance" title="AMC Pricing Engine" subtitle="Calculator for pricing new or renewal Annual Maintenance Contracts" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="h-fit">
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="verification" size="md" />
              <span className="truncate">Fleet &amp; Contract Configuration</span>
            </CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Product Line</Label>
              <Select
                value={productLine}
                onValueChange={(v) => v && setProductLine(v)}
                items={productLines.map((p) => ({ value: p, label: p }))}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {productLines.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Fleet Size</Label>
              <Input type="number" value={fleetSize} onChange={(e) => setFleetSize(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Contract Duration (years)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Service Level</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["Standard", "Premium"] as const).map((l) => (
                  <Button key={l} type="button" variant={serviceLevel === l ? "default" : "outline"} onClick={() => setServiceLevel(l)}>{l}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Risk-Adjusted Pricing</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["Conservative", "Balanced", "Aggressive"] as const).map((l) => (
                  <Button key={l} type="button" size="sm" variant={riskProfile === l ? "default" : "outline"} onClick={() => setRiskProfile(l)}>{l}</Button>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Response SLA: 8 hours, business hours</p>
            <div className="flex items-center gap-2">
              <Checkbox id="spares" checked={includeSpares} onCheckedChange={(v) => setIncludeSpares(Boolean(v))} />
              <Label htmlFor="spares" className="text-sm font-normal">Include spare parts inventory holding cost</Label>
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Annual Escalation (%)</Label>
              <Input type="number" value={escalation} onChange={(e) => setEscalation(Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs  text-muted-foreground">Target Margin (%)</Label>
              <Input type="number" value={targetMargin} onChange={(e) => setTargetMargin(Number(e.target.value) || 0)} />
            </div>
            <div>
              <Label className="text-xs  text-muted-foreground">Components Covered</Label>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {componentsCovered.map((c) => <li key={c}>• {c}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-xs  text-muted-foreground">Recommended Annual Contract Price</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">₹{(recommendedPrice / duration).toFixed(2)} Cr</p>
              <p className="mt-1 text-sm text-muted-foreground">Range: ₹{(priceLow / duration).toFixed(2)} Cr – ₹{(priceHigh / duration).toFixed(2)} Cr</p>
              <p className="mt-1 text-xs text-muted-foreground">Per unit: ₹{perUnitPerYear.toFixed(2)}L/year · Target margin: {targetMargin}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Cost Breakdown (Annual)</span>
            </CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div><p className="text-xs text-muted-foreground">Scheduled Maintenance</p><p className="font-medium">₹{scheduled.toFixed(2)}Cr</p><p className="text-xs text-muted-foreground">{((scheduled / totalAnnualCost) * 100).toFixed(0)}%</p></div>
              <div><p className="text-xs text-muted-foreground">Unscheduled Repairs</p><p className="font-medium">₹{unscheduled.toFixed(2)}Cr</p><p className="text-xs text-muted-foreground">{((unscheduled / totalAnnualCost) * 100).toFixed(0)}%</p></div>
              <div><p className="text-xs text-muted-foreground">Spare Parts Holding</p><p className="font-medium">₹{spares.toFixed(2)}Cr</p><p className="text-xs text-muted-foreground">{((spares / totalAnnualCost) * 100).toFixed(0)}%</p></div>
              <div><p className="text-xs text-muted-foreground">Overhead &amp; Admin</p><p className="font-medium">₹{overhead.toFixed(2)}Cr</p><p className="text-xs text-muted-foreground">{((overhead / totalAnnualCost) * 100).toFixed(0)}%</p></div>
              <div className="col-span-2 sm:col-span-4 border-t border-border pt-3"><p className="text-xs text-muted-foreground">Total Annual Cost</p><p className="font-semibold text-foreground">₹{totalAnnualCost.toFixed(2)}Cr</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Margin Projection Over Contract Term</span>
            </CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={projection} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "₹ Cr", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cost" name="Cost" stroke="var(--destructive)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-2 text-xs text-muted-foreground">
                Fleet aging increases maintenance costs over time, gradually eroding margins in later years.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="finance" size="md" />
              <span className="truncate">Historical Pricing Comparison</span>
            </CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fleet</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Service Level</TableHead>
                    <TableHead className="text-right">Price/Unit/Year</TableHead>
                    <TableHead className="text-right">Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalPricing.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-foreground">{h.fleet}</TableCell>
                      <TableCell className="text-muted-foreground">{h.duration}</TableCell>
                      <TableCell className="text-muted-foreground">{h.level}</TableCell>
                      <TableCell className="text-right">{h.price}</TableCell>
                      <TableCell className="text-right">{h.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button>Save Quote</Button>
            <Button variant="outline">Export as PDF</Button>
            <Button variant="outline">Send to Commercial Team</Button>
            <Button variant="outline">Compare with Historical</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
