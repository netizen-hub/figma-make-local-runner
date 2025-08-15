import { useState } from "react";
import type { ViewType, TabType, ProjectKey, AppState, NavigationHandlers } from "../types/app";

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedProject, setSelectedProject] = useState<ProjectKey | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const state: AppState = {
    currentView,
    selectedProject,
    activeTab,
    isMobileMenuOpen,
    searchQuery
  };

  const handleProjectSelect = (projectKey: ProjectKey) => {
    setSelectedProject(projectKey);
    setCurrentView("project");
    setActiveTab("about");
    setIsMobileMenuOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedProject(null);
    setIsMobileMenuOpen(false);
  };

  const handleKnowledgeBase = () => {
    window.open("https://confluence.example.com/devops", "_blank");
  };

  const handleSupport = () => {
    setCurrentView("support");
    setSelectedProject(null);
    setIsMobileMenuOpen(false);
  };

  const handlers: NavigationHandlers = {
    handleProjectSelect,
    handleBackToDashboard,
    handleKnowledgeBase,
    handleSupport,
    setActiveTab,
    setIsMobileMenuOpen,
    setSearchQuery
  };

  return {
    state,
    handlers,
    setCurrentView,
    setSelectedProject,
    setActiveTab,
    setIsMobileMenuOpen,
    setSearchQuery
  };
};