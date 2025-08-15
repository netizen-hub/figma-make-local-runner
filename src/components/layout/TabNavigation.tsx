import React from "react";
import { TABS } from "../../constants/app";
import type { TabType } from "../../types/app";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  isMobileMenuOpen,
  onMobileMenuToggle
}) => {
  return (
    <div className="px-3 sm:px-4 lg:px-6">
      {/* Desktop Tab navigation */}
      <div className="hidden md:flex items-center gap-6 border-b -mb-px overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-1 py-2 border-b-2 transition-colors whitespace-nowrap text-sm lg:text-base ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Tab navigation */}
      <div className="md:hidden">
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 bg-card border-b shadow-lg z-50 mt-2">
            <div className="container mx-auto px-3 py-3">
              <div className="grid grid-cols-2 gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      onMobileMenuToggle();
                    }}
                    className={`p-3 rounded-lg text-left text-sm transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {tab.shortLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile active tab indicator */}
        <div className="flex items-center justify-between py-2 border-b">
          <span className="font-medium text-sm">
            {TABS.find(tab => tab.id === activeTab)?.shortLabel}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {TABS.findIndex(tab => tab.id === activeTab) + 1} из {TABS.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};