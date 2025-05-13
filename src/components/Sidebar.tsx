
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Code, 
  Database, 
  Download, 
  Folder, 
  Github, 
  List, 
  ListTree, 
  LayoutTemplate, 
  Server, 
  Settings,
  Cloud
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start mb-1",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <span>{label}</span>
      </div>
    </Button>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutTemplate className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <ListTree className="h-5 w-5" />, label: "Templates", href: "/templates" },
    { icon: <Server className="h-5 w-5" />, label: "Deployments", href: "/deployments" },
    { icon: <Github className="h-5 w-5" />, label: "Git Repositories", href: "/repositories" },
    { icon: <Database className="h-5 w-5" />, label: "Resources", href: "/resources" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar p-4 border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center mb-6 justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <Cloud className="h-6 w-6 text-sidebar-primary mr-2" />
            <h1 className="text-xl font-bold text-sidebar-foreground">CloudPortal</h1>
          </div>
        )}
        {collapsed && (
          <Cloud className="h-6 w-6 text-sidebar-primary mx-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground"
        >
          <List className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            href={item.href}
            isActive={isActive(item.href)}
            onClick={() => navigate(item.href)}
          />
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground"
          onClick={() => navigate("/help")}
        >
          <div className="flex items-center">
            <Server className="h-5 w-5 mr-3" />
            {!collapsed && <span>Help & Resources</span>}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
