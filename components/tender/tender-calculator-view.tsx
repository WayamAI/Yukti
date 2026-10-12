"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const steps = ["Product Configuration", "Operating Profile", "Customer Requirements", "Results", "Finalize"];

const bomComponents = [
  { name: "Traction Motor TM-450", category: "Propulsion", unitCost: 18.5 },
  { name: "Traction Inverter TI-550", category: "Propulsion", unitCost: 32.0 },
  { name: "Brake Disc Assembly BD-R7", category: "Braking", unitCost: 4.2 },
  { name: "Bogie Frame BF-2200", category: "Running Gear", unitCost: 84.0 },
  { name: "Pantograph Assembly PA-X3", category: "Current Collection", unitCost: 12.0 },
  { name: "Coupler System CS-900", category: "Coupling", unitCost: 21.0 },
  { name: "Door Operating System DOS-150", category: "Doors", unitCost: 6.8 },
  { name: "HVAC Compressor HC-800", category: "Climate", unitCost: 14.5 },
  { name: "Wheel Set WS-1100", category: "Running Gear", unitCost: 18.0 },
  { name: "Suspension Damper SD-650", category: "Running Gear", unitCost: 3.8 },
  { name: "Auxiliary Power Unit APU-320", category: "Power", unitCost: 24.0 },
  { name: "Battery Charger Unit BCU-240", category: "Power", unitCost: 9.2 },
];

export function TenderCalculatorView() {
  const [step, setStep] = useState(0);
  const [qty, setQty] = useState<Record<string, number>>({
    "Traction Motor TM-450": 8,
    "Traction Inverter TI-550": 4,
    "Brake Disc Assembly BD-R7": 16,
    "Bogie Frame BF-2200": 4,
    "Pantograph Assembly PA-X3": 2,
    "Coupler System CS-900": 4,
    "Door Operating System DOS-150": 8,
    "HVAC Compressor HC-800": 4,
  });

  const selectedCount = Object.values(qty).filter((v) => v > 0).length;
  const bomCost = useMemo(
    () => bomComponents.reduce((sum, c) => sum + (qty[c.name] ?? 0) * c.unitCost, 0),
    [qty]
  );

  return (
    <div>
      <PageHeader icon="finance" title="New Bid Calculator" subtitle="Step-by-step warranty and AMC cost estimation for tender bids" />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                i === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < step
                  ? "border-primary/40 text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-xs">{i + 1}</span>
              {s}
            </button>
            {i < steps.length - 1 && <div className="h-px w-6 bg-border" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="package" size="md" />
              <span className="truncate">Component Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bomComponents.map((c) => (
                    <TableRow key={c.name}>
                      <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground">{c.category}</TableCell>
                      <TableCell className="text-right">₹{c.unitCost.toFixed(1)}L/unit</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min={0}
                          className="ml-auto w-20 text-right"
                          value={qty[c.name] ?? 0}
                          onChange={(e) => setQty((q) => ({ ...q, [c.name]: Number(e.target.value) || 0 }))}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between border-t border-border p-4 text-sm">
              <span className="text-muted-foreground">Components Selected: {selectedCount}</span>
              <span className="font-medium text-foreground">BOM Cost: ₹{bomCost.toFixed(2)} Cr</span>
            </div>
          </CardContent>
        </Card>
      )}

      {step > 0 && step < 3 && (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            {steps[step]} configuration — carried forward from Product Configuration (BOM cost ₹{bomCost.toFixed(2)} Cr).
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="report" size="md" />
              <span className="truncate">Results</span>
            </CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div><p className="text-xs text-muted-foreground">BOM Cost</p><p className="text-xl font-semibold">₹{bomCost.toFixed(2)} Cr</p></div>
            <div><p className="text-xs text-muted-foreground">Est. Warranty + AMC Cost</p><p className="text-xl font-semibold">₹{(bomCost * 0.42).toFixed(2)} Cr</p></div>
            <div><p className="text-xs text-muted-foreground">Recommended Bid Price</p><p className="text-xl font-semibold">₹{(bomCost * 1.55).toFixed(2)} Cr</p></div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Review complete. Ready to finalize and send this bid to the commercial team.
          </CardContent>
        </Card>
      )}

      <div className="mt-4 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Previous
        </Button>
        <Button disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
          Next
        </Button>
      </div>
    </div>
  );
}
