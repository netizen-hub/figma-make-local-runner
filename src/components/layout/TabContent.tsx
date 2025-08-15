import React from "react";
import { ProjectSummary } from "../ProjectSummary";
import { ProjectKeys } from "../ProjectKeys";
import { ProjectMembers } from "../ProjectMembers";
import { TeamContacts } from "../TeamContacts";
import { KnowledgeBase } from "../KnowledgeBase";
import { ProjectResources } from "../ProjectResources";
import { ReleasesAndDeliveries } from "../ReleasesAndDeliveries";
import { ProjectMetrics } from "../ProjectMetrics";
import { Support } from "../Support";
import type { TabType, ProjectKey } from "../../types/app";

interface TabContentProps {
  activeTab: TabType;
  selectedProject: ProjectKey;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab, selectedProject }) => {
  switch (activeTab) {
    case "about":
      return (
        <div className="space-y-4 lg:space-y-6">
          <ProjectSummary projectKey={selectedProject} />
          <ProjectKeys projectKey={selectedProject} />
          <ProjectMembers projectKey={selectedProject} />
          <TeamContacts />
          <KnowledgeBase />
        </div>
      );
    case "resources":
      return <ProjectResources projectKey={selectedProject} />;
    case "releases":
      return <ReleasesAndDeliveries />;
    case "metrics":
      return <ProjectMetrics />;
    case "support":
      return <Support />;
    default:
      return null;
  }
};