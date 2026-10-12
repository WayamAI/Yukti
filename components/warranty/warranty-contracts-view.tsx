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

type Row = {
  id: string;
  customer: string;
  productLine: string;
  components: string;
  warrantyEnd: string;
  remaining: string;
  provision: string;
  claimsPaid: string;
  estRemaining: string;
  status: "On Track" | "At Risk" | "Over Budget";
};

const contracts: Row[] = [
  { id: "WC-2021-014", customer: "Delhi Metro Rail Corp.", productLine: "Rolling Stock", components: "TM-450, BD-R7, DOS-150", warrantyEnd: "2027-06-30", remaining: "1y 4m", provision: "₹18.2 Cr", claimsPaid: "₹9.4 Cr", estRemaining: "₹6.1 Cr", status: "On Track" },
  { id: "WC-2020-009", customer: "Mumbai Metro One Pvt. Ltd.", productLine: "EMU Coaches", components: "TM-450, TI-550", warrantyEnd: "2026-09-30", remaining: "7m", provision: "₹9.8 Cr", claimsPaid: "₹8.9 Cr", estRemaining: "₹2.4 Cr", status: "Over Budget" },
  { id: "WC-2022-031", customer: "Indian Railways—WR", productLine: "LHB Coaches", components: "BF-2200, WS-1100, SD-650", warrantyEnd: "2028-01-31", remaining: "1y 10m", provision: "₹14.6 Cr", claimsPaid: "₹5.2 Cr", estRemaining: "₹7.8 Cr", status: "On Track" },
  { id: "WC-2021-047", customer: "Bangalore Metro Rail Corp.", productLine: "Vande Bharat", components: "PA-X3, CS-900", warrantyEnd: "2026-12-31", remaining: "9m", provision: "₹6.4 Cr", claimsPaid: "₹5.1 Cr", estRemaining: "₹1.9 Cr", status: "At Risk" },
  { id: "WC-2023-002", customer: "Hyderabad Metro Rail Ltd.", productLine: "Metro Rolling Stock", components: "HC-800, APU-320", warrantyEnd: "2028-08-31", remaining: "2y 5m", provision: "₹8.1 Cr", claimsPaid: "₹1.8 Cr", estRemaining: "₹6.9 Cr", status: "On Track" },
  { id: "WC-2020-018", customer: "Kochi Metro Rail Ltd.", productLine: "EMU Coaches", components: "BCU-240, CSS-700", warrantyEnd: "2026-04-30", remaining: "1m", provision: "₹3.2 Cr", claimsPaid: "₹3.4 Cr", estRemaining: "₹0.4 Cr", status: "Over Budget" },
  { id: "WC-2022-055", customer: "Lucknow Metro Rail Corp.", productLine: "Metro Rolling Stock", components: "TM-450, BD-R7", warrantyEnd: "2027-11-30", remaining: "1y 8m", provision: "₹7.7 Cr", claimsPaid: "₹2.9 Cr", estRemaining: "₹5.3 Cr", status: "On Track" },
  { id: "WC-2021-063", customer: "Jaipur Metro Rail Corp.", productLine: "Metro Rolling Stock", components: "GB-300, FDS-110", warrantyEnd: "2026-10-31", remaining: "8m", provision: "₹2.4 Cr", claimsPaid: "₹1.6 Cr", estRemaining: "₹0.9 Cr", status: "At Risk" },
  { id: "WC-2023-011", customer: "Chennai Metro Rail Ltd.", productLine: "Metro Rolling Stock", components: "SPD-90, ABV-400", warrantyEnd: "2029-02-28", remaining: "2y 11m", provision: "₹6.9 Cr", claimsPaid: "₹0.9 Cr", estRemaining: "₹6.5 Cr", status: "On Track" },
  { id: "WC-2020-027", customer: "Pune Metro Rail Corp.", productLine: "EMU Coaches", components: "TA-2000", warrantyEnd: "2026-07-31", remaining: "4m", provision: "₹4.1 Cr", claimsPaid: "₹3.5 Cr", estRemaining: "₹1.0 Cr", status: "At Risk" },
  { id: "WC-2022-070", customer: "Nagpur Metro Rail Corp.", productLine: "Metro Rolling Stock", components: "DOS-150, HC-800", warrantyEnd: "2027-05-31", remaining: "1y 3m", provision: "₹3.8 Cr", claimsPaid: "₹1.1 Cr", estRemaining: "₹3.0 Cr", status: "On Track" },
  { id: "WC-2019-004", customer: "Kolkata Metro Rail Corp.", productLine: "Rolling Stock", components: "WS-1100, SD-650", warrantyEnd: "2026-05-31", remaining: "2m", provision: "₹1.9 Cr", claimsPaid: "₹1.8 Cr", estRemaining: "₹0.3 Cr", status: "Over Budget" },
];

const statusTone: Record<Row["status"], "destructive" | "secondary" | "outline"> = {
  "Over Budget": "destructive",
  "At Risk": "secondary",
  "On Track": "outline",
};

export function WarrantyContractsView() {
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () => (status === "All" ? contracts : contracts.filter((c) => c.status === status)),
    [status]
  );

  return (
    <div>
      <PageHeader icon="security" title="Active Warranty Contracts" subtitle="Financial status of all active warranty obligations" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Active Contracts" value={`${contracts.length}`} icon="verification" />
        <StatCard label="Total Exposure" value="₹59.9 Cr" icon="finance" />
        <StatCard label="Claims Paid YTD" value="₹31.8 Cr" icon="finance" />
        <StatCard label="Provision Balance" value="₹92.8 Cr" icon="finance" />
        <StatCard label="Provision Gap" value="₹1.1 Cr" tone="warning" icon="finance" />
      </div>

      <div className="mt-6">
        <FilterTabs options={["All", "On Track", "At Risk", "Over Budget"]} value={status} onChange={setStatus} />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product Line</TableHead>
                  <TableHead>Components</TableHead>
                  <TableHead>Warranty End</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead className="text-right">Provision</TableHead>
                  <TableHead className="text-right">Claims Paid</TableHead>
                  <TableHead className="text-right">Est. Remaining</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                    <TableCell className="text-muted-foreground">{c.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{c.productLine}</TableCell>
                    <TableCell className="text-muted-foreground">{c.components}</TableCell>
                    <TableCell className="text-muted-foreground">{c.warrantyEnd}</TableCell>
                    <TableCell className="text-muted-foreground">{c.remaining}</TableCell>
                    <TableCell className="text-right">{c.provision}</TableCell>
                    <TableCell className="text-right">{c.claimsPaid}</TableCell>
                    <TableCell className="text-right">{c.estRemaining}</TableCell>
                    <TableCell>
                      <Badge variant={statusTone[c.status]}>{c.status}</Badge>
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
