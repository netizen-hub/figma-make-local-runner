import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Home, ChevronRight, ChevronLeft, ArrowLeft, Menu, CalendarDays } from "../icons";
import { UserProfile } from "./UserProfile";
import { TABS } from "../../constants/app";
import { getPageTitle } from "../../utils/app";
import type { AppState, NavigationHandlers, TabType } from "../../types/app";

interface AppHeaderProps {
  state: AppState;
  handlers: NavigationHandlers;
  onToggleMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  state, 
  handlers, 
  onToggleMobileMenu 
}) => {
  const { state: sidebarState, toggleSidebar, isMobile } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";

  const SidebarToggleButton = () => {
    if (isMobile) {
      return <SidebarTrigger />;
    }

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="flex items-center gap-1 text-xs"
        title={isCollapsed ? "Развернуть меню" : "Свернуть меню"}
      >
        {isCollapsed ? (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="hidden lg:inline">Развернуть</span>
          </>
        ) : (
          <>
            <ChevronLeft className="h-3 w-3" />
            <span className="hidden lg:inline">Свернуть</span>
          </>
        )}
      </Button>
    );
  };

  const renderBreadcrumbs = () => {
    if (state.currentView === "dashboard") {
      return (
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
          <Home className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-foreground whitespace-nowrap">Проекты</span>
        </div>
      );
    }

    if (state.currentView === "support") {
      return (
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
          <Home className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
          <span className="text-foreground whitespace-nowrap">Поддержка</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
        <Home className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
        <button 
          onClick={handlers.handleBackToDashboard}
          className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap text-xs sm:text-sm"
        >
          Проекты
        </button>
        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
        <span className="whitespace-nowrap">{state.selectedProject}</span>
        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
        <span className="text-foreground whitespace-nowrap hidden sm:inline">{getPageTitle(state.activeTab)}</span>
        <span className="text-foreground whitespace-nowrap sm:hidden">
          {TABS.find(tab => tab.id === state.activeTab)?.shortLabel}
        </span>
      </div>
    );
  };

  const renderPageTitle = () => {
    if (state.currentView === "support") {
      return "Техническая поддержка";
    }
    if (state.currentView === "dashboard") {
      return null; // Dashboard has its own title
    }
    return getPageTitle(state.activeTab);
  };

  const renderPageDescription = () => {
    if (state.currentView === "support") {
      return "Центр поддержки DevOps платформы";
    }
    if (state.currentView === "dashboard") {
      return null; // Dashboard has its own description
    }
    // Will be implemented in parent component
    return null;
  };

  return (
    <div className="border-b bg-card">
      <div className="flex h-12 shrink-0 items-center gap-2 px-3 sm:px-4 lg:px-6">
        <SidebarTrigger />
        {renderBreadcrumbs()}
        <div className="ml-auto flex items-center gap-2">
          <UserProfile />
          {onToggleMobileMenu && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onToggleMobileMenu}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <SidebarToggleButton />
        </div>
      </div>
      
      {(state.currentView !== "dashboard") && (
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handlers.handleBackToDashboard}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">К проектам</span>
              <span className="sm:hidden">Назад</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const PageHeader: React.FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold truncate">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm sm:text-base line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            <CalendarDays className="h-3 w-3" />
            <span className="hidden sm:inline">Обновлено: 14 авг 2025</span>
            <span className="sm:hidden">14.08.25</span>
          </Badge>
          <Badge variant="secondary" className="text-xs">
            v2.1.0
          </Badge>
        </div>
      </div>
    </div>
  );
};