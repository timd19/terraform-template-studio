
import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud } from "lucide-react";

interface Account {
  id: string;
  name: string;
  resourceCount: number;
  status: "active" | "inactive";
  region?: string;
  connectionDate: string;
}

const ConnectedAccounts = () => {
  const [activeTab, setActiveTab] = useState("azure");
  
  const azureAccounts: Account[] = [
    {
      id: "sub-001",
      name: "Development Subscription",
      resourceCount: 12,
      status: "active",
      region: "West US",
      connectionDate: "2025-04-15"
    },
    {
      id: "sub-002",
      name: "Production Subscription",
      resourceCount: 24,
      status: "active",
      region: "East US",
      connectionDate: "2025-04-10"
    },
    {
      id: "sub-003",
      name: "Testing Subscription",
      resourceCount: 8,
      status: "inactive",
      region: "West Europe",
      connectionDate: "2025-03-22"
    }
  ];
  
  const awsAccounts: Account[] = [
    {
      id: "acc-001",
      name: "Main AWS Account",
      resourceCount: 18,
      status: "active",
      region: "us-east-1",
      connectionDate: "2025-04-05"
    },
    {
      id: "acc-002",
      name: "Dev AWS Account",
      resourceCount: 7,
      status: "active",
      region: "us-west-2",
      connectionDate: "2025-03-28"
    }
  ];
  
  const gcpAccounts: Account[] = [
    {
      id: "prj-001",
      name: "Infrastructure Project",
      resourceCount: 9,
      status: "active",
      region: "us-central1",
      connectionDate: "2025-04-12"
    }
  ];
  
  const githubRepos: Account[] = [
    {
      id: "repo-001",
      name: "terraform-modules",
      resourceCount: 15,
      status: "active",
      connectionDate: "2025-04-20"
    },
    {
      id: "repo-002",
      name: "cloud-templates",
      resourceCount: 8,
      status: "active",
      connectionDate: "2025-04-18"
    },
    {
      id: "repo-003",
      name: "pulumi-resources",
      resourceCount: 6,
      status: "active",
      connectionDate: "2025-04-15"
    },
    {
      id: "repo-004",
      name: "cloudformation-examples",
      resourceCount: 12,
      status: "inactive",
      connectionDate: "2025-03-10"
    },
    {
      id: "repo-005",
      name: "bicep-templates",
      resourceCount: 4,
      status: "active",
      connectionDate: "2025-04-02"
    }
  ];
  
  const getAccounts = () => {
    switch(activeTab) {
      case "azure":
        return azureAccounts;
      case "aws":
        return awsAccounts;
      case "gcp":
        return gcpAccounts;
      case "github":
        return githubRepos;
      default:
        return azureAccounts;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="azure" className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
              Azure
            </TabsTrigger>
            <TabsTrigger value="aws" className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-yellow-600 mr-2"></div>
              AWS
            </TabsTrigger>
            <TabsTrigger value="gcp" className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
              GCP
            </TabsTrigger>
            <TabsTrigger value="github" className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-gray-800 mr-2"></div>
              GitHub
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="flex justify-end mb-4">
              <Button size="sm">
                {activeTab === "github" ? "Connect Repository" : "Connect Account"}
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {activeTab === "github" ? "Repository" : "Account"} Name
                  </TableHead>
                  <TableHead>
                    {activeTab === "github" ? "Templates" : "Resources"}
                  </TableHead>
                  {activeTab !== "github" && <TableHead>Region</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead>Connected On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAccounts().length > 0 ? (
                  getAccounts().map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell>{account.resourceCount}</TableCell>
                      {activeTab !== "github" && <TableCell>{account.region}</TableCell>}
                      <TableCell>
                        <Badge 
                          variant={account.status === "active" ? "default" : "outline"}
                          className={account.status === "active" ? "bg-green-500" : ""}
                        >
                          {account.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{account.connectionDate}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={activeTab !== "github" ? 6 : 5} className="text-center py-10">
                      <div className="flex flex-col items-center">
                        <Cloud className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No accounts connected</h3>
                        <p className="text-muted-foreground mb-4">
                          Connect your first {activeTab.toUpperCase()} account to get started
                        </p>
                        <Button>
                          Connect {activeTab === "github" ? "Repository" : "Account"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccounts;
