import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Bid = {
  id: string; customer: string; productLine: string; warranty: string; amc: string;
  bidPrice: string; estCost: string; projMargin: string;
  outcome: "won" | "lost" | "pending"; actualMargin: string;
};

const bids: Bid[] = [
  { id: "BID-2023-001", customer: "Metro Rail Operator A", productLine: "Rolling Stock", warranty: "5 years full", amc: "10 years comprehensive", bidPrice: "₹42.8 Cr", estCost: "₹34.2 Cr", projMargin: "20.1%", outcome: "won", actualMargin: "18.4%" },
  { id: "BID-2023-014", customer: "Metro Rail Operator B", productLine: "EMU Coaches", warranty: "5 years repair", amc: "7 years standard", bidPrice: "₹28.4 Cr", estCost: "₹23.1 Cr", projMargin: "18.7%", outcome: "lost", actualMargin: "—" },
  { id: "BID-2023-027", customer: "Indian Railways—NR", productLine: "LHB Coaches", warranty: "5 years full", amc: "10 years comprehensive", bidPrice: "₹51.2 Cr", estCost: "₹40.8 Cr", projMargin: "20.3%", outcome: "won", actualMargin: "21.6%" },
  { id: "BID-2024-003", customer: "Metro Rail Operator C", productLine: "Metro Rolling Stock", warranty: "3 years full", amc: "5 years standard", bidPrice: "₹19.6 Cr", estCost: "₹16.9 Cr", projMargin: "13.8%", outcome: "won", actualMargin: "12.1%" },
  { id: "BID-2024-019", customer: "Vande Bharat Program", productLine: "Vande Bharat", warranty: "5 years full", amc: "10 years premium", bidPrice: "₹68.4 Cr", estCost: "₹52.6 Cr", projMargin: "23.1%", outcome: "won", actualMargin: "24.8%" },
  { id: "BID-2024-032", customer: "Metro Rail Operator D", productLine: "Metro Rolling Stock", warranty: "5 years repair", amc: "7 years standard", bidPrice: "₹24.1 Cr", estCost: "₹21.8 Cr", projMargin: "9.5%", outcome: "lost", actualMargin: "—" },
  { id: "BID-2024-045", customer: "Indian Railways—SR", productLine: "LHB Coaches", warranty: "5 years full", amc: "10 years comprehensive", bidPrice: "₹44.9 Cr", estCost: "₹35.6 Cr", projMargin: "20.7%", outcome: "won", actualMargin: "19.9%" },
  { id: "BID-2025-006", customer: "Metro Rail Operator E", productLine: "EMU Coaches", warranty: "5 years full", amc: "7 years standard", bidPrice: "₹31.7 Cr", estCost: "₹25.9 Cr", projMargin: "18.3%", outcome: "pending", actualMargin: "—" },
  { id: "BID-2025-018", customer: "Metro Rail Operator F", productLine: "Metro Rolling Stock", warranty: "3 years full", amc: "5 years standard", bidPrice: "₹16.2 Cr", estCost: "₹14.1 Cr", projMargin: "13.0%", outcome: "lost", actualMargin: "—" },
  { id: "BID-2025-029", customer: "Vande Bharat Program", productLine: "Vande Bharat", warranty: "5 years full", amc: "10 years premium", bidPrice: "₹72.9 Cr", estCost: "₹56.2 Cr", projMargin: "22.9%", outcome: "pending", actualMargin: "—" },
];

const outcomeTone: Record<Bid["outcome"], "outline" | "destructive" | "secondary"> = {
  won: "outline",
  lost: "destructive",
  pending: "secondary",
};

export function BidHistoryView() {
  return (
    <div>
      <PageHeader icon="analytics" title="Bid History & Win/Loss Analysis" subtitle="Analytical view of all past bids" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Bids" value={`${bids.length}`} icon="metrics" />
        <StatCard label="Win Rate" value="63%" tone="success" icon="analytics" />
        <StatCard label="Avg Projected Margin" value="17.5%" icon="finance" />
        <StatCard label="Pending Bids" value="2" tone="warning" icon="metrics" />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bid ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product Line</TableHead>
                  <TableHead>Warranty</TableHead>
                  <TableHead>AMC</TableHead>
                  <TableHead className="text-right">Bid Price</TableHead>
                  <TableHead className="text-right">Est. Cost</TableHead>
                  <TableHead className="text-right">Proj. Margin</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead className="text-right">Actual Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium text-foreground">{b.id}</TableCell>
                    <TableCell className="text-muted-foreground">{b.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{b.productLine}</TableCell>
                    <TableCell className="text-muted-foreground">{b.warranty}</TableCell>
                    <TableCell className="text-muted-foreground">{b.amc}</TableCell>
                    <TableCell className="text-right">{b.bidPrice}</TableCell>
                    <TableCell className="text-right">{b.estCost}</TableCell>
                    <TableCell className="text-right">{b.projMargin}</TableCell>
                    <TableCell><Badge variant={outcomeTone[b.outcome]}>{b.outcome}</Badge></TableCell>
                    <TableCell className="text-right">{b.actualMargin}</TableCell>
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
