"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
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

type LogRow = {
  id: string; timestamp: string; source: string; type: string;
  records: number; duration: string; status: "success" | "warning" | "error"; message: string;
};

function buildLogs(): LogRow[] {
  const rows: LogRow[] = [];
  let hour = 23, minute = 57;
  for (let i = 0; i < 50; i++) {
    const src = dataSources[i % dataSources.length];
    const roll = (i * 37) % 100;
    const status: LogRow["status"] = roll < 6 ? "error" : roll < 20 ? "warning" : "success";
    const records = status === "error" ? 0 : Math.round(200 + ((i * 733) % 27000));
    const duration = `${(10 + ((i * 13) % 25)).toFixed(1)}s`;
    const message =
      status === "error"
        ? "Connection timeout after 30s"
        : status === "warning"
        ? `Partial sync — ${(i % 20) + 1} records skipped`
        : `${records.toLocaleString(NUMBER_LOCALE)} records synced`;
    rows.push({
      id: `ING-${10049 - i}`,
      timestamp: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
      source: src.name,
      type: src.type,
      records,
      duration,
      status,
      message,
    });
    minute -= 11;
    if (minute < 0) { minute += 60; hour -= 1; if (hour < 0) hour += 24; }
  }
  return rows;
}

const logs = buildLogs();

const statusTone: Record<LogRow["status"], "outline" | "secondary" | "destructive"> = {
  success: "outline",
  warning: "secondary",
  error: "destructive",
};

export function IngestionLogsView() {
  const [status, setStatus] = useState("All");
  const filtered = useMemo(
    () => (status === "All" ? logs : logs.filter((l) => l.status === status.toLowerCase())),
    [status]
  );

  return (
    <div>
      <PageHeader icon="database" title="Ingestion Logs" subtitle="Real-time data ingestion activity and error tracking" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Syncs (24h)" value="50" icon="sync" />
        <StatCard label="Success Rate" value="60.0%" tone="warning" icon="analytics" />
        <StatCard label="Records Synced" value="1,173,297" icon="sync" />
        <StatCard label="Errors" value="6" tone="danger" icon="warning" />
      </div>

      <div className="mt-6">
        <FilterTabs options={["All", "Success", "Warning", "Error"]} value={status} onChange={setStatus} />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Records</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium text-foreground">{l.id}</TableCell>
                    <TableCell className="text-muted-foreground">{l.timestamp}</TableCell>
                    <TableCell className="text-muted-foreground">{l.source}</TableCell>
                    <TableCell className="text-muted-foreground">{l.type}</TableCell>
                    <TableCell className="text-right">{l.records.toLocaleString(NUMBER_LOCALE)}</TableCell>
                    <TableCell className="text-right">{l.duration}</TableCell>
                    <TableCell><Badge variant={statusTone[l.status]}>{l.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{l.message}</TableCell>
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
