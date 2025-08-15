import React from "react";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../layout/AppSidebar";
import { AppHeader } from "../layout/AppHeader";
import { ProjectDashboard } from "../ProjectDashboard";
import type { AppState, NavigationHandlers } from "../../types/app";

interface DashboardViewProps {
  state: AppState;
  handlers: NavigationHandlers;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ state, handlers }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar state={state} handlers={handlers} />
      <SidebarInset>
        <AppHeader state={state} handlers={handlers} />
        <div className="flex-1 overflow-auto">
          <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            <ProjectDashboard onProjectSelect={handlers.handleProjectSelect} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};