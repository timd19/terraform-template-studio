
import React, { useState } from "react";
import { templates, categories, providers } from "../data/mockData";
import TemplateCard from "@/components/TemplateCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    const matchesProvider = selectedProvider === "all" || template.provider === selectedProvider;
    
    return matchesSearch && matchesCategory && matchesProvider;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Templates</h1>
              <p className="text-muted-foreground">
                Deploy cloud resources across multiple providers with pre-built templates.
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button className="flex items-center">
                <Github className="mr-2 h-5 w-5" />
                Import from GitHub
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="category" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="category">Browse by Category</TabsTrigger>
                <TabsTrigger value="provider">Browse by Provider</TabsTrigger>
              </TabsList>
              
              <TabsContent value="category" className="space-x-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="mb-2 cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </TabsContent>
              
              <TabsContent value="provider" className="space-x-2">
                {providers.map((provider) => (
                  <Badge
                    key={provider.id}
                    variant={selectedProvider === provider.id ? "default" : "outline"}
                    className="mb-2 cursor-pointer"
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    {provider.name}
                  </Badge>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No templates found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
