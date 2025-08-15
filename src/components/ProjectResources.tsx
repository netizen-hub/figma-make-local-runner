import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

// Simple SVG icons
const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Server = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="4" rx="1"/>
    <rect x="2" y="9" width="20" height="4" rx="1"/>
    <rect x="2" y="15" width="20" height="4" rx="1"/>
    <line x1="6" y1="5" x2="6.01" y2="5"/>
    <line x1="6" y1="11" x2="6.01" y2="11"/>
    <line x1="6" y1="17" x2="6.01" y2="17"/>
  </svg>
);

const GitBranch = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="m18 9a9 9 0 0 1-9 9"/>
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const PlayCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10,8 16,12 10,16 10,8"/>
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
  </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const Network = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="12" cy="5" r="1"/>
    <circle cx="12" cy="19" r="1"/>
    <circle cx="5" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <line x1="12" y1="11" x2="12" y2="6"/>
    <line x1="12" y1="13" x2="12" y2="18"/>
    <line x1="11" y1="12" x2="6" y2="12"/>
    <line x1="13" y1="12" x2="18" y2="12"/>
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

type GitFlowBranch = {
  name: string;
  description: string;
  url?: string;
};

type GitFlowData = {
  description: string;
  mainBranches: GitFlowBranch[];
  supportBranches: GitFlowBranch[];
  process: string[];
};

type DevOpsTool = {
  name: string;
  description: string;
  urls: Record<string, string>;
  icon: React.ReactElement;
  status: string;
  segments: string[];
};

type GitRepository = {
  name: string;
  description: string;
  urls: Record<string, string>;
  commits: number;
  lastCommit: string;
  status: string;
  segments: string[];
};

interface ProjectResourcesProps {
  projectKey?: string;
}

export function ProjectResources({ projectKey = "xorb" }: ProjectResourcesProps) {
  const [isAddToolDialogOpen, setIsAddToolDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [isGitFlowDialogOpen, setIsGitFlowDialogOpen] = useState(false);
  
  // Git Flow state
  const [gitFlowData, setGitFlowData] = useState<GitFlowData>({
    description: "В проекте используется стандартная модель Git Flow для управления ветками и релизами.",
    mainBranches: [
      { name: "main", description: "Продакшн-готовый код", url: "" },
      { name: "develop", description: "Основная ветка разработки", url: "" }
    ],
    supportBranches: [
      { name: "feature/*", description: "Разработка новых функций", url: "" },
      { name: "release/*", description: "Подготовка релизов", url: "" },
      { name: "hotfix/*", description: "Критические исправления", url: "" }
    ],
    process: [
      "Создание feature ветки от develop",
      "Разработка и коммиты в feature ветку",
      "Создание Pull Request в develop",
      "Code Review и тестирование",
      "Слияние в develop после одобрения",
      "Создание release ветки для подготовки релиза",
      "Финальное тестирование и слияние в main"
    ]
  });
  
  const [editingGitFlow, setEditingGitFlow] = useState<GitFlowData>(gitFlowData);

  const devopsTools: DevOpsTool[] = [
    {
      name: "Jenkins",
      description: "CI/CD пайплайны и автоматизация сборки",
      urls: {
        "Мечта": `https://jenkins-mechta.company.ru/${projectKey}-project`,
        "КСПД": `https://jenkins-kspd.company.ru/${projectKey}-project`
      },
      icon: <Settings className="h-5 w-5" />,
      status: "Активен",
      segments: ["Мечта", "КСПД"]
    },
    {
      name: "GitLab",
      description: "Управление исходным кодом и Git репозиториями",
      urls: {
        "Мечта": `https://gitlab-mechta.company.ru/${projectKey}-project`,
        "КСПД": `https://gitlab-kspd.company.ru/${projectKey}-project`
      },
      icon: <GitBranch className="h-5 w-5" />,
      status: "Активен",
      segments: ["Мечта", "КСПД"]
    },
    {
      name: "Nexus",
      description: "Менеджер артефактов и репозиторий зависимостей",
      urls: {
        "Мечта": `https://nexus-mechta.company.ru/${projectKey}-project`
      },
      icon: <Package className="h-5 w-5" />,
      status: "Активен",
      segments: ["Мечта"]
    },
    {
      name: "Deckhouse",
      description: "Kubernetes платформа для оркестрации контейнеров",
      urls: {
        "КСПД": `https://deckhouse-kspd.company.ru/${projectKey}-project`
      },
      icon: <Server className="h-5 w-5" />,
      status: "Активен",
      segments: ["КСПД"]
    },
    {
      name: "DefectDojo",
      description: "Управление безопасностью и уязвимостями",
      urls: {
        "Мечта": `https://defectdojo-mechta.company.ru/${projectKey}-project`,
        "КСПД": `https://defectdojo-kspd.company.ru/${projectKey}-project`
      },
      icon: <Shield className="h-5 w-5" />,
      status: "Обслуживание",
      segments: ["Мечта", "КСПД"]
    }
  ];

  // Dynamic GitLab repositories based on project key
  const gitLabRepositories: GitRepository[] = [
    {
      name: `${projectKey}-main`,
      description: "Основной репозиторий проекта",
      urls: {
        "Мечта": `https://gitlab-mechta.company.ru/projects/${projectKey}-main`,
        "КСПД": `https://gitlab-kspd.company.ru/projects/${projectKey}-main`
      },
      commits: 1247,
      lastCommit: "2 часа назад",
      status: "Активен",
      segments: ["Мечта", "КСПД"]
    },
    {
      name: `${projectKey}-config`,
      description: "Конфигурация и настройки проекта",
      urls: {
        "КСПД": `https://gitlab-kspd.company.ru/projects/${projectKey}-config`
      },
      commits: 342,
      lastCommit: "1 день назад",
      status: "Активен",
      segments: ["КСПД"]
    },
    {
      name: `${projectKey}-docs`,
      description: "Документация проекта",
      urls: {
        "Мечта": `https://gitlab-mechta.company.ru/projects/${projectKey}-docs`
      },
      commits: 189,
      lastCommit: "3 дня назад",
      status: "Активен",
      segments: ["Мечта"]
    }
  ];

  const availableTools = [
    {
      value: "sonarqube",
      label: "SonarQube",
      description: "Статический анализ кода и проверка качества",
      availableSegments: ["Мечта", "КСПД"]
    },
    {
      value: "grafana",
      label: "Grafana",
      description: "Мониторинг и визуализация метрик",
      availableSegments: ["Мечта", "КСПД"]
    },
    {
      value: "prometheus",
      label: "Prometheus",
      description: "Сбор и хранение метрик",
      availableSegments: ["Мечта", "КСПД"]
    },
    {
      value: "harbor",
      label: "Harbor",
      description: "Реестр Docker образов",
      availableSegments: ["КСПД"]
    },
    {
      value: "vault",
      label: "HashiCorp Vault",
      description: "Управление секретами и конфиденциальными данными",
      availableSegments: ["Мечта"]
    },
    {
      value: "terraform",
      label: "Terraform",
      description: "Infrastructure as Code (IaC)",
      availableSegments: ["Мечта", "КСПД"]
    },
    {
      value: "ansible",
      label: "Ansible",
      description: "Автоматизация конфигурации и развертывания",
      availableSegments: ["Мечта"]
    },
    {
      value: "elastic",
      label: "Elastic Stack",
      description: "Поиск, анализ и визуализация логов",
      availableSegments: ["КСПД"]
    }
  ];

  const toolSyncs = [
    {
      from: "GitLab",
      to: "Jenkins",
      status: "Синхронизировано",
      lastSync: "14 авг 2025, 15:30",
      type: "success"
    },
    {
      from: "Jenkins",
      to: "Nexus",
      status: "Синхронизировано", 
      lastSync: "14 авг 2025, 15:25",
      type: "success"
    },
    {
      from: "Jenkins",
      to: "Deckhouse",
      status: "Ошибка синхронизации",
      lastSync: "14 авг 2025, 12:15",
      type: "error"
    },
    {
      from: "DefectDojo",
      to: "GitLab",
      status: "В процессе",
      lastSync: "14 авг 2025, 15:32",
      type: "pending"
    }
  ];

  const topPipelines = [
    {
      name: "main-build-deploy",
      description: "Основная сборка и развертывание",
      runs: 1247,
      lastRun: "2 мин назад",
      status: "Успешно"
    },
    {
      name: "feature-branch-test",
      description: "Тестирование feature веток",
      runs: 892,
      lastRun: "15 мин назад", 
      status: "Успешно"
    },
    {
      name: "security-scan",
      description: "Сканирование безопасности",
      runs: 654,
      lastRun: "1 час назад",
      status: "Предупреждение"
    },
    {
      name: "integration-tests",
      description: "Интеграционные тесты",
      runs: 532,
      lastRun: "30 мин назад",
      status: "Успешно"
    },
    {
      name: "release-preparation",
      description: "Подготовка релиза",
      runs: 387,
      lastRun: "3 часа назад",
      status: "Успешно"
    }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Активен" || status === "Синхронизировано" || status === "Успешно") {
      return <Badge variant="outline" className="text-green-600 border-green-600">{status}</Badge>;
    } else if (status === "Ошибка синхронизации") {
      return <Badge variant="outline" className="text-red-600 border-red-600">{status}</Badge>;
    } else if (status === "В процессе" || status === "Предупреждение") {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">{status}</Badge>;
    } else {
      return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSegmentBadge = (segment: string) => {
    if (segment === "Мечта") {
      return <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">{segment}</Badge>;
    } else if (segment === "КСПД") {
      return <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">{segment}</Badge>;
    }
    return null;
  };

  const getSegmentBadges = (segments: string[]) => {
    return segments.map(segment => (
      <span key={segment}>{getSegmentBadge(segment)}</span>
    ));
  };

  const handleSubmitRequest = () => {
    if (selectedTool && selectedSegment && requestDescription.trim()) {
      setIsRequestSubmitted(true);
      // Здесь можно добавить логику отправки заявки на сервер
      setTimeout(() => {
        setIsAddToolDialogOpen(false);
        setIsRequestSubmitted(false);
        setSelectedTool("");
        setSelectedSegment("");
        setRequestDescription("");
      }, 3000);
    }
  };

  const handleOpenKnowledgeBase = () => {
    window.open("https://confluence.company.ru/devops/tools-integration-guide", "_blank");
  };

  const handleSaveGitFlow = () => {
    setGitFlowData(editingGitFlow);
    setIsGitFlowDialogOpen(false);
  };

  const handleCancelGitFlow = () => {
    setEditingGitFlow(gitFlowData);
    setIsGitFlowDialogOpen(false);
  };

  const updateMainBranch = (index: number, field: keyof GitFlowBranch, value: string) => {
    const newBranches = [...editingGitFlow.mainBranches];
    newBranches[index] = { ...newBranches[index], [field]: value };
    setEditingGitFlow({ ...editingGitFlow, mainBranches: newBranches });
  };

  const updateSupportBranch = (index: number, field: keyof GitFlowBranch, value: string) => {
    const newBranches = [...editingGitFlow.supportBranches];
    newBranches[index] = { ...newBranches[index], [field]: value };
    setEditingGitFlow({ ...editingGitFlow, supportBranches: newBranches });
  };

  const updateProcessStep = (index: number, value: string) => {
    const newProcess = [...editingGitFlow.process];
    newProcess[index] = value;
    setEditingGitFlow({ ...editingGitFlow, process: newProcess });
  };

  const addProcessStep = () => {
    setEditingGitFlow({
      ...editingGitFlow,
      process: [...editingGitFlow.process, "Новый шаг процесса"]
    });
  };

  const removeProcessStep = (index: number) => {
    const newProcess = editingGitFlow.process.filter((_, i) => i !== index);
    setEditingGitFlow({ ...editingGitFlow, process: newProcess });
  };

  return (
    <div className="space-y-6">
      {/* Main GitLab Repositories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Основные GitLab репозитории
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gitLabRepositories.map((repo, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">{repo.name}</h4>
                    <div className="flex gap-1">
                      {getStatusBadge(repo.status)}
                      {getSegmentBadges(repo.segments)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Коммитов: {repo.commits}</span>
                    <span>Последний коммит: {repo.lastCommit}</span>
                    <div className="flex items-center gap-1">
                      <Network className="h-3 w-3" />
                      <span>Доступно в: {repo.segments.join(", ")}</span>
                    </div>
                  </div>
                </div>
                
                {/* Кнопки для каждого сегмента */}
                <div className="flex flex-col gap-1 min-w-fit">
                  {repo.segments.map((segment) => (
                    <Button 
                      key={segment}
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(repo.urls[segment], '_blank')}
                      className="whitespace-nowrap"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {segment}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DevOps Tools Links */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Инструменты DevOps
            </CardTitle>
            <Dialog open={isAddToolDialogOpen} onOpenChange={setIsAddToolDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить инструмент
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Запрос на подключение инструмента</DialogTitle>
                  <DialogDescription>
                    Выберите инструмент DevOps и сетевой сегмент для подключения к вашему проекту
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {!isRequestSubmitted ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="tool-select">Выберите инструмент</Label>
                        <Select value={selectedTool} onValueChange={(value) => {
                          setSelectedTool(value);
                          setSelectedSegment(""); // Сбросить выбранный сегмент при смене инструмента
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите инструмент для подключения" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTools.map((tool) => (
                              <SelectItem key={tool.value} value={tool.value}>
                                <div>
                                  <div className="font-medium">{tool.label}</div>
                                  <div className="text-sm text-muted-foreground">{tool.description}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Доступно в: {tool.availableSegments.join(", ")}
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedTool && (
                        <div className="space-y-2">
                          <Label htmlFor="segment-select">Сетевой сегмент</Label>
                          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите сетевой сегмент" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTools.find(t => t.value === selectedTool)?.availableSegments.map((segment) => (
                                <SelectItem key={segment} value={segment}>
                                  <div className="flex items-center gap-2">
                                    <Network className="h-4 w-4" />
                                    <span>{segment}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedSegment && (
                            <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                              <strong>Сегмент {selectedSegment}:</strong> {selectedSegment === "Мечта" ? "Внутренний контур разработки" : "Контур промышленной эксплуатации"}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Описание задачи</Label>
                        <Textarea
                          id="description"
                          placeholder="Опишите, для каких целей нужен инструмент и какие требования к настройке..."
                          value={requestDescription}
                          onChange={(e) => setRequestDescription(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={handleSubmitRequest}
                          disabled={!selectedTool || !selectedSegment || !requestDescription.trim()}
                          className="flex-1"
                        >
                          Отправить заявку
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleOpenKnowledgeBase}
                          size="sm"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Руководство
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-medium mb-2">Заявка отправлена!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ваша заявка на подключение {availableTools.find(t => t.value === selectedTool)?.label} в сегменте {selectedSegment === "Мечта" ? "Мечте" : selectedSegment} передана специалистам DevOps. 
                        Ожидайте уведомления о статусе обработки.
                      </p>
                      <Button variant="outline" size="sm" onClick={handleOpenKnowledgeBase}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Изучить процесс подключения
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devopsTools.map((tool, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {tool.icon}
                    <h4 className="font-medium">{tool.name}</h4>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {getStatusBadge(tool.status)}
                    <div className="flex gap-1">
                      {getSegmentBadges(tool.segments)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {tool.description}
                </p>
                <div className="flex items-center gap-1 mb-3 text-xs text-muted-foreground">
                  <Network className="h-3 w-3" />
                  <span>Доступно в: {tool.segments.join(", ")}</span>
                </div>
                
                {/* Кнопки для каждого сегмента */}
                <div className="space-y-2">
                  {tool.segments.map((segment) => (
                    <Button 
                      key={segment}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(tool.urls[segment], '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Открыть в {segment === "Мечта" ? "Мечте" : segment}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool Synchronization Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Статус синхронизации между инструментами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {toolSyncs.map((sync, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(sync.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{sync.from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{sync.to}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Последняя синхронизация: {sync.lastSync}
                    </p>
                  </div>
                </div>
                {getStatusBadge(sync.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Jenkins Pipelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            Часто используемые пайплайны
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPipelines.map((pipeline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-medium text-muted-foreground">#{index + 1}</span>
                    <h4 className="font-medium">{pipeline.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{pipeline.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>Запусков: {pipeline.runs}</span>
                    <span>Последний запуск: {pipeline.lastRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(pipeline.status)}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Git Flow Description */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Git Flow
            </CardTitle>
            <Dialog open={isGitFlowDialogOpen} onOpenChange={setIsGitFlowDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Редактирование Git Flow</DialogTitle>
                  <DialogDescription>
                    Настройте модель Git Flow для вашего проекта, включая ветки и процессы разработки
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="git-description">Описание Git Flow</Label>
                    <Textarea
                      id="git-description"
                      value={editingGitFlow.description}
                      onChange={(e) => setEditingGitFlow({ ...editingGitFlow, description: e.target.value })}
                      rows={3}
                      placeholder="Описание модели Git Flow для проекта..."
                    />
                  </div>

                  {/* Main Branches */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Основные ветки</h4>
                    <div className="space-y-3">
                      {editingGitFlow.mainBranches.map((branch, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label htmlFor={`main-branch-name-${index}`}>Название ветки</Label>
                            <Input
                              id={`main-branch-name-${index}`}
                              value={branch.name}
                              onChange={(e) => updateMainBranch(index, 'name', e.target.value)}
                              placeholder="main"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`main-branch-desc-${index}`}>Описание</Label>
                            <Input
                              id={`main-branch-desc-${index}`}
                              value={branch.description}
                              onChange={(e) => updateMainBranch(index, 'description', e.target.value)}
                              placeholder="Описание ветки"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`main-branch-url-${index}`}>Ссылка на ветку</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`main-branch-url-${index}`}
                                value={branch.url || ''}
                                onChange={(e) => updateMainBranch(index, 'url', e.target.value)}
                                placeholder={`https://gitlab.company.ru/${projectKey}/-/tree/main`}
                              />
                              {branch.url && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(branch.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support Branches */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Вспомогательные ветки</h4>
                    <div className="space-y-3">
                      {editingGitFlow.supportBranches.map((branch, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label htmlFor={`support-branch-name-${index}`}>Название ветки</Label>
                            <Input
                              id={`support-branch-name-${index}`}
                              value={branch.name}
                              onChange={(e) => updateSupportBranch(index, 'name', e.target.value)}
                              placeholder="feature/*"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`support-branch-desc-${index}`}>Описание</Label>
                            <Input
                              id={`support-branch-desc-${index}`}
                              value={branch.description}
                              onChange={(e) => updateSupportBranch(index, 'description', e.target.value)}
                              placeholder="Описание ветки"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`support-branch-url-${index}`}>Ссылка на ветку</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`support-branch-url-${index}`}
                                value={branch.url || ''}
                                onChange={(e) => updateSupportBranch(index, 'url', e.target.value)}
                                placeholder={`https://gitlab.company.ru/${projectKey}/-/tree/feature`}
                              />
                              {branch.url && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(branch.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Процесс разработки</h4>
                      <Button type="button" variant="outline" size="sm" onClick={addProcessStep}>
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить шаг
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {editingGitFlow.process.map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground w-8">{index + 1}.</span>
                          <Input
                            value={step}
                            onChange={(e) => updateProcessStep(index, e.target.value)}
                            placeholder="Описание шага процесса"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProcessStep(index)}
                            disabled={editingGitFlow.process.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveGitFlow} className="flex-1">
                      Сохранить изменения
                    </Button>
                    <Button variant="outline" onClick={handleCancelGitFlow}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {gitFlowData.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Основные ветки</h4>
                <div className="space-y-2">
                  {gitFlowData.mainBranches.map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{branch.name}</span>
                        <p className="text-xs text-muted-foreground">{branch.description}</p>
                      </div>
                      {branch.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(branch.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Вспомогательные ветки</h4>
                <div className="space-y-2">
                  {gitFlowData.supportBranches.map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div>
                        <span className="font-medium text-sm">{branch.name}</span>
                        <p className="text-xs text-muted-foreground">{branch.description}</p>
                      </div>
                      {branch.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(branch.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Процесс разработки</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                {gitFlowData.process.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}