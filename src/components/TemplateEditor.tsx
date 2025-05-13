
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Code, Edit, Download } from "lucide-react";

interface TemplateEditorProps {
  initialContent: string;
  onSave?: (content: string) => void;
  readOnly?: boolean;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  initialContent,
  onSave,
  readOnly = false,
}) => {
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState("edit");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <Card className="border shadow-sm">
      <div className="border-b p-2 flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="edit" className="flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center">
                <Code className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              {!readOnly && (
                <Button size="sm" onClick={handleSave} className="text-xs">
                  Save
                </Button>
              )}
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      <TabsContent value="edit" className="m-0">
        <CardContent className="p-0">
          <textarea
            value={content}
            onChange={handleContentChange}
            readOnly={readOnly}
            className="editor-container w-full p-4 font-mono text-sm border-0 focus:outline-none resize-none bg-muted/30"
            style={{ minHeight: "400px" }}
          />
        </CardContent>
      </TabsContent>

      <TabsContent value="preview" className="m-0">
        <CardContent className="p-0">
          <pre className="editor-container w-full overflow-auto p-4 text-sm bg-muted/30">
            <code>{content}</code>
          </pre>
        </CardContent>
      </TabsContent>
    </Card>
  );
};

export default TemplateEditor;
