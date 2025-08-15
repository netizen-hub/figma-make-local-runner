import React from "react";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../layout/AppSidebar";
import { AppHeader, PageHeader } from "../layout/AppHeader";
import { Support } from "../Support";
import type { AppState, NavigationHandlers } from "../../types/app";

interface SupportViewProps {
  state: AppState;
  handlers: NavigationHandlers;
}

export const SupportView: React.FC<SupportViewProps> = ({ state, handlers }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar state={state} handlers={handlers} />
      <SidebarInset>
        <AppHeader state={state} handlers={handlers} />
        <div className="flex-1 overflow-auto">
          <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            <PageHeader 
              title="Техническая поддержка"
              description="Центр поддержки DevOps платформы"
            />
            <Support />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};