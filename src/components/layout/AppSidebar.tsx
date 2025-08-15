import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import { Search, Folder, LayoutGrid, BookOpen, HelpCircle } from "../icons";
import { PROJECTS } from "../../constants/app";
import { filterProjects } from "../../utils/app";
import type { AppState, NavigationHandlers } from "../../types/app";

interface AppSidebarProps {
  state: AppState;
  handlers: NavigationHandlers;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ state, handlers }) => {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  
  const filteredProjects = filterProjects(PROJECTS, state.searchQuery);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <LayoutGrid className="size-4" />
          </div>
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">X-Orb</span>
              <span className="truncate text-xs text-sidebar-foreground/70">v2.1.0</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>

          <SidebarGroupContent>
            {!isCollapsed && (
              <div className="relative">
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                <SidebarInput
                  placeholder="Поиск проектов..."
                  title="Поиск по названию проекта или ключу"
                  value={state.searchQuery}
                  onChange={(e) => handlers.setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {isCollapsed ? (
              <Folder className="size-4" />
            ) : (
              "Проекты"
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredProjects.map((project) => (
                <SidebarMenuItem key={project.key}>
                  <SidebarMenuButton
                    onClick={() => handlers.handleProjectSelect(project.key)}
                    isActive={state.selectedProject === project.key && state.currentView === "project"}
                    tooltip={isCollapsed ? `${project.key} - ${project.name}` : project.description}
                    className={isCollapsed ? "justify-center" : ""}
                  >
                    <Folder className="size-4" />
                    {!isCollapsed && (
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{project.key}</span>
                        <span className="truncate text-xs text-sidebar-foreground/70">{project.name}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {filteredProjects.length === 0 && !isCollapsed && (
                <div className="px-2 py-4 text-center text-sm text-sidebar-foreground/70">
                  Проекты не найдены
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            {isCollapsed ? (
              <LayoutGrid className="size-4" />
            ) : (
              "Навигация"
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handlers.handleBackToDashboard}
                  isActive={state.currentView === "dashboard"}
                  tooltip={isCollapsed ? "Все проекты" : "Все проекты"}
                  className={isCollapsed ? "justify-center" : ""}
                >
                  <LayoutGrid className="size-4" />
                  {!isCollapsed && <span>Все проекты</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handlers.handleKnowledgeBase}
                  tooltip={isCollapsed ? "База знаний DevOps" : "База знаний DevOps"}
                  className={isCollapsed ? "justify-center" : ""}
                >
                  <BookOpen className="size-4" />
                  {!isCollapsed && <span>База знаний</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handlers.handleSupport}
                  isActive={state.currentView === "support"}
                  tooltip={isCollapsed ? "Техническая поддержка" : "Техническая поддержка"}
                  className={isCollapsed ? "justify-center" : ""}
                >
                  <HelpCircle className="size-4" />
                  {!isCollapsed && <span>Поддержка</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  );
};