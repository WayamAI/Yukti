"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterTabs } from "@/components/filter-tabs";

type Alert = {
  severity: "Critical" | "Warning" | "Info";
  status: "New" | "Acknowledged" | "Investigating" | "Resolved";
  timestamp: string;
  title: string;
  description: string;
  affected: string;
};

const alerts: Alert[] = [
  { severity: "Critical", status: "New", timestamp: "20 Mar 2026, 11:30 am", title: "Supplier financial health alert — Raj Engineering Works", description: "D&B score dropped to 40/100; delayed payments reported by two other OEM customers.", affected: "Coupler Sub-assemblies • 340 units affected" },
  { severity: "Critical", status: "Investigating", timestamp: "19 Mar 2026, 4:12 pm", title: "Traction Motor TM-450 MTBF declined 18% over last 6 months", description: "Bearing seizure failure mode rate trending upward across the Medha Servo Drives batch cohort.", affected: "Traction Motor TM-450 • 1,420 units affected" },
  { severity: "Critical", status: "New", timestamp: "19 Mar 2026, 9:05 am", title: "AMC Contract #AMC-2024-009 projected to go underwater in Q3 2026", description: "Fleet aging is accelerating unscheduled repair costs beyond contracted margin floor.", affected: "Kochi Metro fleet • 72 units affected" },
  { severity: "Warning", status: "Acknowledged", timestamp: "18 Mar 2026, 2:47 pm", title: "Supplier Bharat Forge quality rejection rate spiked to 4.2%", description: "Incoming inspection rejections nearly doubled quarter-over-quarter.", affected: "Coupler System CS-900 • 1,560 units affected" },
  { severity: "Warning", status: "New", timestamp: "18 Mar 2026, 10:20 am", title: "Pantograph Assembly PA-X3 failure rate above threshold", description: "Carbon strip wear failures exceeding the 0.6/1000h risk model threshold.", affected: "Pantograph Assembly PA-X3 • 890 units affected" },
  { severity: "Warning", status: "Investigating", timestamp: "17 Mar 2026, 5:33 pm", title: "Insurance loss ratio trending above target for Electrical Systems Coverage", description: "Claims paid vs. premium ratio at 74%, above the 65% target ceiling.", affected: "Electrical Systems Coverage policy" },
  { severity: "Warning", status: "New", timestamp: "17 Mar 2026, 1:15 pm", title: "Data sync failure rate elevated for Field Service Mobile", description: "Ingestion success rate dropped to 82% over the last 24 hours.", affected: "Field Service Mobile integration" },
  { severity: "Warning", status: "Acknowledged", timestamp: "16 Mar 2026, 8:02 am", title: "Gangway Bellows GB-300 claims volume anomaly", description: "Claim count 2.4x the seasonal baseline for this component family.", affected: "Gangway Bellows GB-300 • 3,560 units affected" },
  { severity: "Info", status: "Resolved", timestamp: "15 Mar 2026, 3:40 pm", title: "Scheduled model recalibration completed", description: "Weibull shape parameters refreshed using Q1 2026 failure data.", affected: "All component families" },
  { severity: "Info", status: "New", timestamp: "15 Mar 2026, 11:00 am", title: "Insurance renewal window opening for Safety & Signalling", description: "Policy renewal due in 102 days; renegotiation brief available.", affected: "Safety & Signalling policy" },
  { severity: "Info", status: "Resolved", timestamp: "14 Mar 2026, 9:18 am", title: "New supplier onboarded: Precision Components Ltd.", description: "Initial risk scorecard generated pending 90-day performance window.", affected: "Supplier onboarding" },
];

const severityTone: Record<Alert["severity"], "destructive" | "secondary" | "outline"> = {
  Critical: "destructive",
  Warning: "secondary",
  Info: "outline",
};

export function RiskAlertsView() {
  const [severity, setSeverity] = useState("All Severities");
  const [status, setStatus] = useState("All Statuses");
  const [showResolved, setShowResolved] = useState(false);

  const filtered = useMemo(
    () =>
      alerts.filter((a) => {
        if (!showResolved && a.status === "Resolved") return false;
        if (severity !== "All Severities" && a.severity !== severity) return false;
        if (status !== "All Statuses" && a.status !== status) return false;
        return true;
      }),
    [severity, status, showResolved]
  );

  const open = alerts.filter((a) => a.status !== "Resolved");

  return (
    <div>
      <PageHeader icon="alert" title="Risk Alerts" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Open Alerts" value={`${open.length}`} icon="notifications" />
        <StatCard label="Critical" value={`${open.filter((a) => a.severity === "Critical").length}`} tone="danger" icon="alert" />
        <StatCard label="Warning" value={`${open.filter((a) => a.severity === "Warning").length}`} tone="warning" icon="warning" />
        <StatCard label="Info" value={`${open.filter((a) => a.severity === "Info").length}`} icon="notifications" />
        <StatCard label="Avg Time to Acknowledge" value="4.2 hrs" icon="time" />
        <StatCard label="Avg Time to Resolve" value="6.8 days" icon="time" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <FilterTabs options={["All Severities", "Critical", "Warning", "Info"]} value={severity} onChange={setSeverity} />
          <FilterTabs options={["All Statuses", "New", "Acknowledged", "Investigating", "Resolved"]} value={status} onChange={setStatus} />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} className="h-4 w-4 rounded border-input" />
          Show resolved
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((a, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={severityTone[a.severity]}>{a.severity}</Badge>
                <Badge variant="outline">{a.status}</Badge>
                <span className="text-xs text-muted-foreground">{a.timestamp}</span>
              </div>
              <p className="mt-2 font-medium text-foreground">{a.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.affected}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Acknowledge</Button>
                <Button size="sm" variant="outline">Investigate</Button>
                <Button size="sm" variant="outline">View Supplier</Button>
                <Button size="sm" variant="outline">Blast Radius</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
