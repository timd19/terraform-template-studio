
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Template } from '../data/mockData';
import { toast } from '@/components/ui/sonner';

interface DeploymentFormProps {
  template: Template;
}

const DeploymentForm: React.FC<DeploymentFormProps> = ({ template }) => {
  const [deploymentName, setDeploymentName] = useState('');
  const [region, setRegion] = useState('');
  const [instanceType, setInstanceType] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState(false);

  const availableRegions = {
    aws: ['us-east-1', 'us-west-1', 'eu-west-1', 'ap-southeast-1'],
    azure: ['westus', 'eastus', 'westeurope', 'southeastasia'],
    gcp: ['us-central1', 'us-east1', 'europe-west1', 'asia-east1'],
  };

  const availableInstanceTypes = {
    aws: ['t2.micro', 't2.small', 't3.medium', 'm5.large'],
    azure: ['Standard_B1s', 'Standard_D2s_v3', 'Standard_F2s_v2'],
    gcp: ['e2-micro', 'e2-small', 'n2-standard-2', 'c2-standard-4']
  };

  const getRegions = () => {
    return availableRegions[template.provider] || [];
  };

  const getInstanceTypes = () => {
    return availableInstanceTypes[template.provider] || [];
  };

  const handleDeploy = () => {
    if (!deploymentName.trim()) {
      toast.error('Please enter a deployment name');
      return;
    }
    
    if (!region) {
      toast.error('Please select a region');
      return;
    }
    
    setIsDeploying(true);
    
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      toast.success(`Deployment of ${deploymentName} started successfully!`);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="deploymentName">Deployment Name</Label>
          <Input
            id="deploymentName"
            value={deploymentName}
            onChange={(e) => setDeploymentName(e.target.value)}
            placeholder="my-awesome-deployment"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {getRegions().map((reg) => (
                <SelectItem key={reg} value={reg}>
                  {reg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instanceType">Instance Type</Label>
          <Select value={instanceType} onValueChange={setInstanceType}>
            <SelectTrigger>
              <SelectValue placeholder="Select an instance type" />
            </SelectTrigger>
            <SelectContent>
              {getInstanceTypes().map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="advancedSettings" 
            checked={advancedSettings} 
            onCheckedChange={(checked) => setAdvancedSettings(checked as boolean)} 
          />
          <Label htmlFor="advancedSettings">Show advanced settings</Label>
        </div>
        
        {advancedSettings && (
          <div className="space-y-4 pt-2 border-t">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" placeholder="production, api, v1" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeout">Deployment Timeout (minutes)</Label>
              <Input id="timeout" type="number" defaultValue={30} />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="autoApprove" />
              <Label htmlFor="autoApprove">Auto-approve changes</Label>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleDeploy} disabled={isDeploying} className="w-full">
          {isDeploying ? 'Deploying...' : 'Deploy Template'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeploymentForm;
