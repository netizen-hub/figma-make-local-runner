import type { Project, Tab, ProjectKey } from "../types/app";

export const PROJECTS: Project[] = [
  { key: "xorb", name: "XORB Platform", description: "Основная платформа для управления данными" },
  { key: "first", name: "First Initiative", description: "Инициатива цифровой трансформации" },
  { key: "best", name: "BEST Analytics", description: "Платформа аналитики и отчетности" },
  { key: "dmls", name: "Data Management Layer Service", description: "Сервис управления данными" },
  { key: "mlds", name: "Machine Learning Data Service", description: "Сервис машинного обучения" }
];

export const PROJECT_NAMES: Record<ProjectKey, string> = {
  "xorb": "XORB Platform",
  "first": "First Initiative", 
  "best": "BEST Analytics",
  "dmls": "Data Management Layer Service",
  "mlds": "Machine Learning Data Service"
};

export const TABS: Tab[] = [
  { id: "about", label: "О проекте", shortLabel: "О проекте" },
  { id: "resources", label: "Ресурсы проекта", shortLabel: "Ресурсы" },
  { id: "releases", label: "Релизы и поставки", shortLabel: "Релизы" },
  { id: "metrics", label: "Метрики", shortLabel: "Метрики" },
  { id: "support", label: "Поддержка", shortLabel: "Поддержка" }
];