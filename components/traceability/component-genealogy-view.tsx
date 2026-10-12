"use client";

import { useState } from "react";
import { YuktiIcon } from "@/components/ui/yukti-icon";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NUMBER_LOCALE } from "@/lib/utils";

const recentTraces = [
  { type: "Batch ID", timestamp: "20 Mar 2026, 09:14", identifier: "Batch #TM-2026-Q1", units: 240 },
  { type: "Supplier", timestamp: "20 Mar 2026, 08:47", identifier: "Medha Servo Drives", units: 1420 },
  { type: "Serial Number", timestamp: "19 Mar 2026, 17:02", identifier: "TM-450-2847", units: 1 },
  { type: "Purchase Order", timestamp: "19 Mar 2026, 14:35", identifier: "PO-2025-11204", units: 84 },
  { type: "Serial Number", timestamp: "19 Mar 2026, 11:18", identifier: "PA-X3-0442", units: 1 },
  { type: "Batch ID", timestamp: "18 Mar 2026, 16:50", identifier: "Batch #IG-2025-Q4", units: 180 },
];

export function ComponentGenealogyView() {
  const [tab, setTab] = useState("serial");

  return (
    <div>
      <PageHeader
        icon="hierarchy"
        title="Component Genealogy"
        subtitle="Trace any component forward or backward through the supply chain"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="hierarchy" size="md" />
              <span className="truncate">Search and trace the full genealogy</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="serial">Trace by Serial Number</TabsTrigger>
              <TabsTrigger value="supplier">Trace by Supplier</TabsTrigger>
              <TabsTrigger value="batch">Trace by Batch</TabsTrigger>
            </TabsList>
            <TabsContent value="serial" className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Serial Number</Label>
                  <Input placeholder="e.g. TM-450-2847" />
                </div>
                <div className="space-y-1.5">
                  <Label>Component ID</Label>
                  <Input placeholder="Optional" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="supplier" className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Supplier</Label>
                  <Input placeholder="e.g. Medha Servo Drives" />
                </div>
                <div className="space-y-1.5">
                  <Label>Purchase Order</Label>
                  <Input placeholder="Optional" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="batch" className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Batch ID</Label>
                  <Input placeholder="e.g. TM-2026-Q1" />
                </div>
                <div className="space-y-1.5">
                  <Label>Purchase Order</Label>
                  <Input placeholder="Optional" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Button className="mt-4">Trace Genealogy</Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <YuktiIcon name="activity" size="md" />
              <span className="truncate">Recent Traces</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trace Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Identifier</TableHead>
                <TableHead className="text-right">Units Traced</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTraces.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground">{t.type}</TableCell>
                  <TableCell className="text-muted-foreground">{t.timestamp}</TableCell>
                  <TableCell className="font-medium text-foreground">{t.identifier}</TableCell>
                  <TableCell className="text-right">{t.units.toLocaleString(NUMBER_LOCALE)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
