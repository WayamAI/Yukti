import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dataSources } from "@/lib/data-sources";

function qualityTone(q: number) {
  if (q >= 95) return "text-success";
  if (q >= 90) return "text-warning";
  return "text-destructive";
}

export function ConnectedSystemsView() {
  return (
    <div>
      <PageHeader icon="network" title="Connected Systems" subtitle="Integrated data sources and their health status" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((s) => (
          <Card key={s.name}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.category}</p>
                </div>
                <Badge variant="outline">{s.type}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Last Sync</p><p>{s.lastSync}</p></div>
                <div><p className="text-xs text-muted-foreground">Quality</p><p className={qualityTone(s.quality)}>{s.quality}%</p></div>
                <div><p className="text-xs text-muted-foreground">Total Records</p><p>{s.records}</p></div>
                <div><p className="text-xs text-muted-foreground">Last 24h</p><p>{s.last24h}</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
