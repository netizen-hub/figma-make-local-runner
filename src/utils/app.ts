import type { TabType, ProjectKey } from "../types/app";
import { PROJECT_NAMES } from "../constants/app";

export const getPageTitle = (tab: TabType): string => {
  switch (tab) {
    case "about":
      return "О проекте";
    case "resources":
      return "Ресурсы проекта";
    case "releases":
      return "Релизы и поставки";
    case "metrics":
      return "Метрики";
    case "support":
      return "Поддержка";
    default:
      return "О проекте";
  }
};

export const getPageDescription = (tab: TabType, projectKey: ProjectKey): string => {
  const projectName = PROJECT_NAMES[projectKey] || projectKey;
  switch (tab) {
    case "about":
      return `Основная информация и настройки проекта ${projectName}`;
    case "resources":
      return "DevOps инструменты, синхронизация и пайплайны проекта";
    case "releases":
      return "История релизов, развертываний и поставок";
    case "metrics":
      return "Метрики производительности и качества проекта";
    case "support":
      return "Техническая поддержка и контактная информация";
    default:
      return `Основная информация и настройки проекта ${projectName}`;
  }
};

export const filterProjects = (projects: any[], searchQuery: string) => {
  return projects.filter(project => 
    project.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};