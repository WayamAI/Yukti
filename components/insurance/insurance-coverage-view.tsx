import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { policies } from "@/lib/insurance-data";

export function InsuranceCoverageView() {
  return (
    <div>
      <PageHeader icon="verification" title="Insurance Coverage Overview" subtitle="Current insurance portfolio mapped to warranty obligations" />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Insurer</TableHead>
                  <TableHead>Components</TableHead>
                  <TableHead className="text-right">Coverage Limit</TableHead>
                  <TableHead className="text-right">Deductible</TableHead>
                  <TableHead className="text-right">Annual Premium</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Claims Filed</TableHead>
                  <TableHead className="text-right">Claims Paid</TableHead>
                  <TableHead className="text-right">Loss Ratio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((p) => (
                  <TableRow key={p.policy}>
                    <TableCell className="font-medium text-foreground">{p.policy}</TableCell>
                    <TableCell className="text-muted-foreground">{p.insurer}</TableCell>
                    <TableCell className="text-muted-foreground">{p.components}</TableCell>
                    <TableCell className="text-right">{p.limit}</TableCell>
                    <TableCell className="text-right">{p.deductible}</TableCell>
                    <TableCell className="text-right">{p.premium}</TableCell>
                    <TableCell className="text-muted-foreground">{p.period}</TableCell>
                    <TableCell className="text-right">{p.claimsFiled}</TableCell>
                    <TableCell className="text-right">{p.claimsPaid}</TableCell>
                    <TableCell className="text-right">{p.lossRatio}</TableCell>
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
