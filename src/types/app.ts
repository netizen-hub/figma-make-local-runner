export type TabType = "about" | "resources" | "releases" | "metrics" | "support";
export type ViewType = "dashboard" | "project" | "support";
export type ProjectKey = "xorb" | "first" | "best" | "dmls" | "mlds";

export interface Project {
  key: ProjectKey;
  name: string;
  description: string;
}

export interface Tab {
  id: TabType;
  label: string;
  shortLabel: string;
}

export interface AppState {
  currentView: ViewType;
  selectedProject: ProjectKey | null;
  activeTab: TabType;
  isMobileMenuOpen: boolean;
  searchQuery: string;
}

export interface NavigationHandlers {
  handleProjectSelect: (projectKey: ProjectKey) => void;
  handleBackToDashboard: () => void;
  handleKnowledgeBase: () => void;
  handleSupport: () => void;
  setActiveTab: (tab: TabType) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}