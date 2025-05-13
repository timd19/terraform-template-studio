
import React from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Download, Github, History, Server, TrendingUp } from "lucide-react";
import ProviderConnections from "@/components/ProviderConnections";
import RecentDeployments from "@/components/RecentDeployments";
import QuotaOverview from "@/components/QuotaOverview";
import ConnectedAccounts from "@/components/ConnectedAccounts";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your cloud resources, deployments, and provider connections.
            </p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Active Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">12</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Templates Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold">8</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">GitHub Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Github className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-2xl font-bold">5</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Server className="mr-2 h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold">47</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Provider Connections */}
          <div className="mb-6">
            <ProviderConnections />
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Deployments */}
            <div className="lg:col-span-2">
              <RecentDeployments />
            </div>
            
            {/* Quota Overview */}
            <div>
              <QuotaOverview />
            </div>
          </div>
          
          {/* Connected Accounts Table */}
          <div className="mt-6">
            <ConnectedAccounts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
