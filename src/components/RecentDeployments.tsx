
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, TrendingUp, TrendingDown } from "lucide-react";

interface Deployment {
  id: string;
  name: string;
  template: string;
  provider: "azure" | "aws" | "gcp";
  status: "success" | "failed" | "in-progress";
  time: string;
}

const RecentDeployments = () => {
  const deployments: Deployment[] = [
    {
      id: "dep-001",
      name: "web-app-prod",
      template: "Web App with Database",
      provider: "azure",
      status: "success",
      time: "1h ago"
    },
    {
      id: "dep-002",
      name: "static-website",
      template: "S3 Bucket with CloudFront",
      provider: "aws",
      status: "success",
      time: "3h ago"
    },
    {
      id: "dep-003",
      name: "database-cluster",
      template: "Cloud SQL Instance",
      provider: "gcp",
      status: "failed",
      time: "5h ago"
    },
    {
      id: "dep-004",
      name: "network-setup",
      template: "Virtual Network",
      provider: "azure",
      status: "in-progress",
      time: "10m ago"
    },
    {
      id: "dep-005",
      name: "container-service",
      template: "ECS Cluster",
      provider: "aws",
      status: "success",
      time: "1d ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "success":
        return <Badge variant="default" className="bg-green-500">Success</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "failed":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Server className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-semibold">Recent Deployments</CardTitle>
        <Button size="sm" variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell className="font-medium">{deployment.name}</TableCell>
                <TableCell>{deployment.template}</TableCell>
                <TableCell className="capitalize">{deployment.provider}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(deployment.status)}
                    <span>{getStatusBadge(deployment.status)}</span>
                  </div>
                </TableCell>
                <TableCell>{deployment.time}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentDeployments;
