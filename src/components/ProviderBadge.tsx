
import React from "react";
import { cn } from "@/lib/utils";

interface ProviderBadgeProps {
  provider: "azure" | "aws" | "gcp";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProviderBadge: React.FC<ProviderBadgeProps> = ({ provider, size = "md", className }) => {
  const getProviderColor = () => {
    switch (provider) {
      case "azure":
        return "bg-blue-600 text-white";
      case "aws":
        return "bg-yellow-600 text-black";
      case "gcp":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getProviderName = () => {
    switch (provider) {
      case "azure":
        return "Azure";
      case "aws":
        return "AWS";
      case "gcp":
        return "GCP";
      default:
        return provider;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-base px-3 py-1.5";
      default:
        return "text-sm px-2.5 py-1";
    }
  };

  return (
    <span
      className={cn(
        "rounded font-medium inline-block",
        getProviderColor(),
        getSizeClasses(),
        className
      )}
    >
      {getProviderName()}
    </span>
  );
};

export default ProviderBadge;
