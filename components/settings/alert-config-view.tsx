"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Rule = {
  id: string; name: string; condition: string; threshold: string;
  channels: string; severity: "Critical" | "Warning" | "Info"; enabled: boolean;
};

const initialRules: Rule[] = [
  { id: "AR-001", name: "MTBF decline alert", condition: "Component MTBF drops more than threshold vs. 6-month rolling average", threshold: "15%", channels: "Email, Slack", severity: "Critical", enabled: true },
  { id: "AR-002", name: "Warranty provision gap", condition: "Provision balance falls below expected claims exposure", threshold: "₹1 Cr", channels: "Email", severity: "Critical", enabled: true },
  { id: "AR-003", name: "AMC margin floor breach", condition: "Contract margin projected to fall below floor", threshold: "10%", channels: "Email, Slack", severity: "Critical", enabled: true },
  { id: "AR-004", name: "Supplier quality rejection spike", condition: "Incoming inspection rejection rate exceeds threshold", threshold: "3%", channels: "Email", severity: "Warning", enabled: true },
  { id: "AR-005", name: "Insurance renewal window", condition: "Policy renewal due within threshold days", threshold: "30 days", channels: "Email", severity: "Info", enabled: true },
  { id: "AR-006", name: "Data sync failure rate", condition: "Ingestion success rate drops below threshold", threshold: "85%", channels: "Slack, SMS", severity: "Warning", enabled: false },
  { id: "AR-007", name: "Claim volume anomaly", condition: "Claim count exceeds seasonal baseline by threshold", threshold: "2x", channels: "Email, Slack", severity: "Warning", enabled: true },
  { id: "AR-008", name: "Component RUL threshold", condition: "Predicted RUL falls below critical threshold", threshold: "3,000 hrs", channels: "Email, Slack, SMS", severity: "Critical", enabled: true },
];

const severityTone: Record<Rule["severity"], "destructive" | "secondary" | "outline"> = {
  Critical: "destructive",
  Warning: "secondary",
  Info: "outline",
};

export function AlertConfigView() {
  const [rules, setRules] = useState(initialRules);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <PageHeader icon="notifications" title="Alert Configuration" subtitle="Configure alert thresholds, notification channels, and escalation rules" />
        <Button>Add Rule</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Active Rules" value={`${rules.filter((r) => r.enabled).length}`} icon="controls" />
        <StatCard label="Critical Rules" value={`${rules.filter((r) => r.severity === "Critical").length}`} tone="danger" icon="alert" />
        <StatCard label="Channels" value="3" icon="users" />
        <StatCard label="Disabled" value={`${rules.filter((r) => !r.enabled).length}`} icon="metrics" />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Alert Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                    <TableCell className="text-foreground">{r.name}</TableCell>
                    <TableCell className="max-w-xs text-muted-foreground">{r.condition}</TableCell>
                    <TableCell className="text-muted-foreground">{r.threshold}</TableCell>
                    <TableCell className="text-muted-foreground">{r.channels}</TableCell>
                    <TableCell><Badge variant={severityTone[r.severity]}>{r.severity}</Badge></TableCell>
                    <TableCell>
                      <Switch
                        checked={r.enabled}
                        onCheckedChange={(v) =>
                          setRules((rs) => rs.map((x) => (x.id === r.id ? { ...x, enabled: v } : x)))
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Edit</Button>
                    </TableCell>
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
