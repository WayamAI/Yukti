"use client";

import { useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Field = { label: string; value: number; unit: string };
type Section = { key: string; title: string; fields: Field[] };

const sections: Section[] = [
  {
    key: "weibull", title: "Weibull Model", fields: [
      { label: "Default Shape Parameter (β)", value: 1.4, unit: "" },
      { label: "Minimum Data Points", value: 30, unit: "failures" },
      { label: "Confidence Interval", value: 90, unit: "%" },
    ],
  },
  {
    key: "cost", title: "Cost Model", fields: [
      { label: "Labour Rate (Field)", value: 850, unit: "₹/hour" },
      { label: "Labour Rate (Workshop)", value: 620, unit: "₹/hour" },
      { label: "Overhead Rate", value: 18, unit: "%" },
      { label: "Contingency Reserve", value: 12, unit: "%" },
      { label: "Discount Rate", value: 8, unit: "%" },
    ],
  },
  {
    key: "risk", title: "Risk Model", fields: [
      { label: "MTBF Decline Threshold", value: 15, unit: "%" },
      { label: "Margin Floor (AMC)", value: 10, unit: "%" },
      { label: "RUL Critical Threshold", value: 3000, unit: "hours" },
    ],
  },
  {
    key: "insurance", title: "Insurance Model", fields: [
      { label: "Loss Ratio Target", value: 65, unit: "%" },
      { label: "Renegotiation Threshold", value: 15, unit: "%" },
    ],
  },
  {
    key: "quality", title: "Data Quality", fields: [
      { label: "Freshness SLA", value: 4, unit: "hours" },
      { label: "Quality Score Floor", value: 90, unit: "%" },
    ],
  },
];

export function ModelParametersView() {
  const [tab, setTab] = useState("all");

  const visibleSections = tab === "all" ? sections : sections.filter((s) => s.key === tab);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <PageHeader
        icon="controls"
          title="Model Parameters"
          subtitle="Tune reliability models, Weibull parameters, cost assumptions, and threshold configurations"
        />
        <Button>Save All Changes</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {sections.map((s) => (
            <TabsTrigger key={s.key} value={s.key}>{s.title}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleSections.map((s) => (
          <Card key={s.key}>
            <CardHeader><CardTitle className="flex items-center gap-2">
              <YuktiIcon name="metrics" size="md" />
              <span className="truncate">{s.title}</span>
            </CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {s.fields.map((f) => (
                <div key={f.label} className="space-y-1.5">
                  <Label className="text-xs  text-muted-foreground">
                    {f.label} {f.unit && <span className="normal-case">({f.unit})</span>}
                  </Label>
                  <Input type="number" defaultValue={f.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
