
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuotaItem {
  name: string;
  used: number;
  limit: number;
  percentage: number;
}

const QuotaOverview = () => {
  const quotas: QuotaItem[] = [
    {
      name: "VM Instances",
      used: 24,
      limit: 50,
      percentage: 48
    },
    {
      name: "Storage (TB)",
      used: 3.7,
      limit: 5,
      percentage: 74
    },
    {
      name: "Network Throughput",
      used: 850,
      limit: 1000,
      percentage: 85
    },
    {
      name: "API Requests",
      used: 42500,
      limit: 50000,
      percentage: 85
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Resource Quotas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quotas.map((quota) => (
            <div key={quota.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{quota.name}</span>
                <span className="text-sm text-muted-foreground">
                  {quota.used} / {quota.limit}
                </span>
              </div>
              <Progress value={quota.percentage} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotaOverview;
