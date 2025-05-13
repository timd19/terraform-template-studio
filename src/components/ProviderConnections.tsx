
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";

interface ConnectionProps {
  provider: string;
  color: string;
  status: "connected" | "disconnected" | "error";
  details: string;
}

const ProviderConnections = () => {
  const connections: ConnectionProps[] = [
    {
      provider: "Azure",
      color: "bg-blue-600",
      status: "connected",
      details: "Connected to 3 Azure subscriptions"
    },
    {
      provider: "AWS",
      color: "bg-yellow-600",
      status: "connected",
      details: "Connected to 2 AWS accounts"
    },
    {
      provider: "GCP",
      color: "bg-red-600",
      status: "disconnected",
      details: "Not connected"
    },
    {
      provider: "GitHub",
      color: "bg-gray-800",
      status: "connected",
      details: "Connected to 5 repositories"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Provider Connections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connections.map((connection) => (
            <Card key={connection.provider} className="overflow-hidden">
              <div className={`h-1 w-full ${connection.color}`}></div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">{connection.provider}</h3>
                  </div>
                  <Badge 
                    variant={connection.status === "connected" ? "default" : "destructive"}
                  >
                    {connection.status === "connected" ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{connection.details}</p>
                <Button 
                  variant={connection.status === "connected" ? "outline" : "default"} 
                  size="sm" 
                  className="w-full mt-3"
                >
                  {connection.status === "connected" ? "Manage" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderConnections;
