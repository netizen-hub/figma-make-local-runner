import React from "react";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../layout/AppSidebar";
import { AppHeader, PageHeader } from "../layout/AppHeader";
import { TabNavigation } from "../layout/TabNavigation";
import { TabContent } from "../layout/TabContent";
import { getPageTitle, getPageDescription } from "../../utils/app";
import type { AppState, NavigationHandlers } from "../../types/app";

interface ProjectViewProps {
  state: AppState;
  handlers: NavigationHandlers;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ state, handlers }) => {
  if (!state.selectedProject) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar state={state} handlers={handlers} />
      <SidebarInset>
        <AppHeader 
          state={state} 
          handlers={handlers}
          onToggleMobileMenu={() => handlers.setIsMobileMenuOpen(!state.isMobileMenuOpen)}
        />
        
        <TabNavigation
          activeTab={state.activeTab}
          onTabChange={handlers.setActiveTab}
          isMobileMenuOpen={state.isMobileMenuOpen}
          onMobileMenuToggle={() => handlers.setIsMobileMenuOpen(!state.isMobileMenuOpen)}
        />

        <div className="flex-1 overflow-auto">
          <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            <PageHeader 
              title={getPageTitle(state.activeTab)}
              description={getPageDescription(state.activeTab, state.selectedProject)}
            />
            
            <div className={`${state.isMobileMenuOpen ? 'pointer-events-none opacity-50' : ''}`}>
              <TabContent 
                activeTab={state.activeTab}
                selectedProject={state.selectedProject}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {state.isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => handlers.setIsMobileMenuOpen(false)}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};