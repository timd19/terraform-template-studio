
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProviderBadge from "./ProviderBadge";
import { Template } from "../data/mockData";
import { Database, Download, Star } from "lucide-react";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  const handleViewTemplate = () => {
    navigate(`/template/${template.id}`);
  };

  const getCategoryIcon = () => {
    switch (template.category) {
      case "Databases":
        return <Database className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="template-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
            <ProviderBadge provider={template.provider} size="sm" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <div className="mt-4">
          <Badge variant="secondary" className="flex items-center w-fit">
            {getCategoryIcon()}
            {template.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center border-t">
        <div className="flex space-x-3 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {template.stars}
          </span>
          <span className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            {template.deployments}
          </span>
        </div>
        <Button size="sm" onClick={handleViewTemplate}>View Template</Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
