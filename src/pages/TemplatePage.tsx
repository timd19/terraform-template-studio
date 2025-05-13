
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../data/mockData";
import Sidebar from "@/components/Sidebar";
import TemplateEditor from "@/components/TemplateEditor";
import DeploymentForm from "@/components/DeploymentForm";
import ProviderBadge from "@/components/ProviderBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Download, Github, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const TemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);
  const [activeTab, setActiveTab] = useState("template");

  if (!template) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
            <p className="text-muted-foreground mb-6">The template you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")}>Go Back to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleTemplateUpdate = (newContent: string) => {
    // In a real app, this would update the template in the backend
    toast.success("Template saved successfully!");
  };

  const handleFork = () => {
    toast.success("Template forked to your account!");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Template Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold mr-3">{template.name}</h1>
                <ProviderBadge provider={template.provider} />
              </div>
              <p className="text-muted-foreground">{template.description}</p>
            </div>
            
            <div className="flex space-x-2 mt-4 lg:mt-0">
              <Button variant="outline" size="sm" onClick={handleFork}>
                <Github className="h-4 w-4 mr-2" />
                Fork
              </Button>
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Star
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="secondary">{template.category}</Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 mr-1" />
              {template.stars} stars
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Download className="h-4 w-4 mr-1" />
              {template.deployments} deployments
            </span>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="deploy">Deploy</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="template">
                <TemplateEditor 
                  initialContent={template.templateContent} 
                  onSave={handleTemplateUpdate} 
                />
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Related Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates
                      .filter(t => t.id !== template.id && t.provider === template.provider)
                      .slice(0, 3)
                      .map(relatedTemplate => (
                        <div 
                          key={relatedTemplate.id} 
                          className="border rounded p-4 cursor-pointer hover:border-primary"
                          onClick={() => navigate(`/template/${relatedTemplate.id}`)}
                        >
                          <h4 className="font-medium">{relatedTemplate.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedTemplate.description}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="deploy" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TemplateEditor initialContent={template.templateContent} readOnly />
                </div>
                <div>
                  <DeploymentForm template={template} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
