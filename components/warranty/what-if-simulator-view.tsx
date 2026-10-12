"use client";

import { useMemo, useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { componentFamilies } from "@/lib/component-families";
import { AppIcon } from "@/components/ui/app-icon";
import { NUMBER_LOCALE } from "@/lib/utils";

const supplierOptions = ["No change", "Bharat Heavy Electricals Ltd.", "Medha Servo Drives"];

function fmt(value: number) {
  if (value >= 100) return `₹${(value / 100).toFixed(2)}Cr`;
  return `₹${value.toFixed(2)}L`;
}

export function WhatIfSimulatorView() {
  const [code, setCode] = useState(componentFamilies[0].code);
  const [supplier, setSupplier] = useState(supplierOptions[0]);
  const [serviceInterval, setServiceInterval] = useState(100);
  const [duration, setDuration] = useState(5);
  const [volume, setVolume] = useState(500);

  const family = componentFamilies.find((f) => f.code === code)!;

  const baseCostPerUnit = family.baseFailureRate * duration * family.baseRepairCostLakh * 0.1;
  const baseMtbf = Math.round(1_000_000 / (family.baseFailureRate * 10));
  const baseExposure = (baseCostPerUnit * volume) / 100;

  const supplierMult = supplier === "Medha Servo Drives" ? 1.35 : supplier === "Bharat Heavy Electricals Ltd." ? 0.85 : 1;
  const intervalMult = 1 - (serviceInterval - 100) / 400; // longer intervals -> slightly higher failure cost
  const scenarioCostPerUnit = baseCostPerUnit * supplierMult * intervalMult;
  const scenarioExposure = (scenarioCostPerUnit * volume) / 100;
  const scenarioMtbf = Math.round(baseMtbf / (supplierMult * intervalMult));

  const pctChange = ((scenarioCostPerUnit - baseCostPerUnit) / baseCostPerUnit) * 100;
  const insuranceChange = (scenarioExposure - baseExposure) * 0.08;

  const changeIcon = useMemo(() => {
    if (Math.abs(pctChange) < 0.1) return <AppIcon name="minus" size="md" tone="tertiary" />;
    return pctChange > 0 ? (
      <AppIcon name="deltaUp" size="md" tone="error" />
    ) : (
      <AppIcon name="deltaDown" size="md" tone="success" />
    );
  }, [pctChange]);

  return (
    <div>
      <PageHeader icon="idea" title="What-If Simulator" subtitle="Interactive scenario planning — adjust parameters and see real-time impact" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="h-fit">
          <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="controls" size="md" />
              <span className="truncate">Scenario Parameters</span>
            </CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">Component Family</Label>
              <Select
                value={code}
                onValueChange={(v) => v && setCode(v)}
                items={componentFamilies.map((f) => ({ value: f.code, label: f.name }))}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {componentFamilies.map((f) => (
                    <SelectItem key={f.code} value={f.code}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">Swap Supplier</Label>
              <Select
                value={supplier}
                onValueChange={(v) => v && setSupplier(v)}
                items={supplierOptions.map((s) => ({ value: s, label: s }))}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {supplierOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">
                Service Interval: {serviceInterval}%
              </Label>
              <Slider min={50} max={200} step={5} value={[serviceInterval]} onValueChange={(v) => setServiceInterval(Array.isArray(v) ? v[0] : v)} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-50%</span><span>+100%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">Warranty Duration (years)</Label>
              <Input type="number" value={duration} min={1} max={10} onChange={(e) => setDuration(Number(e.target.value) || 1)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium  tracking-wide text-muted-foreground">Production Volume</Label>
              <Input type="number" value={volume} min={1} onChange={(e) => setVolume(Number(e.target.value) || 0)} />
            </div>
            <Button className="w-full">Save Scenario</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="report" size="md" />
              <span className="truncate">Current State</span>
            </CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Cost per Unit</p>
                <p className="text-2xl font-semibold text-foreground">{fmt(baseCostPerUnit)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Annual Exposure</p>
                <p className="text-2xl font-semibold text-foreground">{fmt(baseExposure)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">MTBF</p>
                <p className="text-2xl font-semibold text-foreground">{baseMtbf.toLocaleString(NUMBER_LOCALE)} hrs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/40">
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="idea" size="md" />
              <span className="truncate">Scenario Result</span>
            </CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Cost per Unit</p>
                <p className="flex items-center gap-1.5 text-2xl font-semibold text-foreground">
                  {fmt(scenarioCostPerUnit)} {changeIcon}
                  <span className="text-sm font-normal text-muted-foreground">({pctChange >= 0 ? "+" : ""}{pctChange.toFixed(1)}%)</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Annual Exposure</p>
                <p className="text-2xl font-semibold text-foreground">{fmt(scenarioExposure)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Insurance Premium Change</p>
                <p className="text-2xl font-semibold text-foreground">
                  {insuranceChange >= 0 ? "+" : ""}{fmt(Math.abs(insuranceChange))}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">MTBF</p>
                <p className="text-2xl font-semibold text-foreground">{scenarioMtbf.toLocaleString(NUMBER_LOCALE)} hrs</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
