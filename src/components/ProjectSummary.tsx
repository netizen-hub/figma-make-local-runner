import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { GitBranch, Server, Activity, AlertCircle, CheckCircle, Edit, Save, X, ExternalLink, Copy } from "lucide-react";

interface ProjectSummaryProps {
  projectKey?: string;
}

type Repository = {
  name: string;
  branch: string;
  url: string;
};

export function ProjectSummary({ projectKey = "xorb" }: ProjectSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isBuildLogOpen, setIsBuildLogOpen] = useState(false);
  const [isDeployLogOpen, setIsDeployLogOpen] = useState(false);
  
  // Generate repositories dynamically based on project key
  const generateRepositories = (key: string): Repository[] => [
    { 
      name: `${key}-main`, 
      branch: "main",
      url: `https://gitlab.company.ru/projects/${key}-main`
    },
    { 
      name: `${key}-config`, 
      branch: "develop",
      url: `https://gitlab.company.ru/projects/${key}-config`
    },
    { 
      name: `${key}-docs`, 
      branch: "main",
      url: `https://gitlab.company.ru/projects/${key}-docs`
    }
  ];

  const [data, setData] = useState({
    repositories: generateRepositories(projectKey),
    resources: {
      cpu: "65%",
      memory: "4.2GB / 8GB",
      disk: "128GB / 500GB"
    },
    lastBuild: {
      date: "14 авг 2025, 14:23",
      status: "Успешно"
    },
    lastDeploy: {
      date: "14 авг 2025, 13:45",
      status: "Ошибка"
    }
  });

  const [editedData, setEditedData] = useState(data);

  // Mock build log data
  const buildLog = `[2025-08-14 14:20:15] INFO: Starting build process for ${projectKey}
[2025-08-14 14:20:16] INFO: Pulling latest changes from ${projectKey}-main
[2025-08-14 14:20:18] INFO: Installing dependencies...
[2025-08-14 14:20:45] INFO: npm install completed successfully
[2025-08-14 14:20:46] INFO: Running unit tests...
[2025-08-14 14:21:32] INFO: All tests passed (47/47)
[2025-08-14 14:21:33] INFO: Building production assets...
[2025-08-14 14:22:15] INFO: Assets minified and compressed
[2025-08-14 14:22:16] INFO: Docker image build started
[2025-08-14 14:22:58] INFO: Docker image tagged as registry.company.ru/${projectKey}:v1.2.3
[2025-08-14 14:23:01] INFO: Pushing image to registry...
[2025-08-14 14:23:15] SUCCESS: Build completed successfully
[2025-08-14 14:23:15] INFO: Build artifacts stored in Nexus
[2025-08-14 14:23:16] INFO: Notifying teams via Slack
[2025-08-14 14:23:17] INFO: Build process finished in 3m 2s`;

  // Mock deploy log data
  const deployLog = `[2025-08-14 13:42:30] INFO: Starting deployment to staging environment
[2025-08-14 13:42:31] INFO: Validating deployment configuration for ${projectKey}
[2025-08-14 13:42:32] INFO: Pulling image registry.company.ru/${projectKey}:v1.2.3
[2025-08-14 13:42:48] INFO: Stopping previous containers...
[2025-08-14 13:42:52] INFO: Previous containers stopped successfully
[2025-08-14 13:42:53] INFO: Starting new containers...
[2025-08-14 13:43:15] INFO: Containers started, waiting for health checks...
[2025-08-14 13:43:30] INFO: Health check: /health endpoint responding
[2025-08-14 13:43:35] WARNING: Database migration pending
[2025-08-14 13:43:36] INFO: Running database migrations...
[2025-08-14 13:44:12] ERROR: Migration failed - duplicate key constraint violation
[2025-08-14 13:44:13] ERROR: Rolling back deployment...
[2025-08-14 13:44:28] INFO: Previous version restored
[2025-08-14 13:44:30] ERROR: Deployment failed after 2m 15s
[2025-08-14 13:44:31] INFO: Sending failure notification to ops team
[2025-08-14 13:44:32] INFO: Creating incident ticket #INC-2025-0814-001`;

  // Update repositories when projectKey changes
  useState(() => {
    const newRepositories = generateRepositories(projectKey);
    setData(prev => ({ ...prev, repositories: newRepositories }));
    setEditedData(prev => ({ ...prev, repositories: newRepositories }));
  }, [projectKey]);

  const handleSave = () => {
    setData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };

  const updateRepository = (index: number, field: keyof Repository, value: string) => {
    setEditedData(prev => ({
      ...prev,
      repositories: prev.repositories.map((repo, i) => 
        i === index ? { ...repo, [field]: value } : repo
      )
    }));
  };

  const handleRepositoryClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleBuildLogClick = () => {
    setIsBuildLogOpen(true);
  };

  const handleDeployLogClick = () => {
    setIsDeployLogOpen(true);
  };

  const copyLogToClipboard = (log: string, type: string) => {
    navigator.clipboard.writeText(log).then(() => {
      // Можно добавить toast уведомление здесь
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              Техническая сводка
            </CardTitle>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="sm:inline">Редактировать</span>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel} className="flex-1 sm:flex-none">
                  <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Отмена
                </Button>
                <Button size="sm" onClick={handleSave} className="flex-1 sm:flex-none">
                  <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm sm:text-base">
                <GitBranch className="h-3 w-3 sm:h-4 sm:w-4" />
                Основные GitLab репозитории
              </h4>
              <div className="space-y-1 text-xs sm:text-sm">
                {(isEditing ? editedData : data).repositories.map((repo, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    {isEditing ? (
                      <div className="flex gap-2 flex-1 min-w-0">
                        <Input
                          value={repo.name}
                          onChange={(e) => updateRepository(index, 'name', e.target.value)}
                          className="h-8 min-w-0 flex-1"
                          placeholder="Название репозитория"
                        />
                        <Input
                          value={repo.branch}
                          onChange={(e) => updateRepository(index, 'branch', e.target.value)}
                          className="h-8 w-20 sm:w-24 flex-shrink-0"
                          placeholder="Ветка"
                        />
                        <Input
                          value={repo.url}
                          onChange={(e) => updateRepository(index, 'url', e.target.value)}
                          className="h-8 min-w-0 flex-1"
                          placeholder="URL репозитория"
                        />
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRepositoryClick(repo.url)}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors truncate group"
                          title={`Открыть ${repo.name} в GitLab`}
                        >
                          <span className="truncate">{repo.name}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">{repo.branch}</Badge>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm sm:text-base">
                <Server className="h-3 w-3 sm:h-4 sm:w-4" />
                Использование ресурсов
              </h4>
              <div className="space-y-1 text-xs sm:text-sm">
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-xs sm:text-sm">CPU:</Label>
                      <Input
                        value={editedData.resources.cpu}
                        onChange={(e) => setEditedData(prev => ({
                          ...prev,
                          resources: { ...prev.resources, cpu: e.target.value }
                        }))}
                        className="h-8 w-16 sm:w-20"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-xs sm:text-sm">Память:</Label>
                      <Input
                        value={editedData.resources.memory}
                        onChange={(e) => setEditedData(prev => ({
                          ...prev,
                          resources: { ...prev.resources, memory: e.target.value }
                        }))}
                        className="h-8 w-24 sm:w-32"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-xs sm:text-sm">Диск:</Label>
                      <Input
                        value={editedData.resources.disk}
                        onChange={(e) => setEditedData(prev => ({
                          ...prev,
                          resources: { ...prev.resources, disk: e.target.value }
                        }))}
                        className="h-8 w-24 sm:w-32"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>CPU:</span>
                      <span>{data.resources.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Память:</span>
                      <span>{data.resources.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Диск:</span>
                      <span>{data.resources.disk}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="mb-2 text-sm sm:text-base">Последняя сборка/развертывание</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* Build Block - Clickable */}
              <button
                onClick={handleBuildLogClick}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted rounded-lg gap-2 sm:gap-3 hover:bg-muted/80 transition-colors cursor-pointer text-left group"
                title="Нажмите для просмотра лога сборки"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Последняя сборка</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </div>
                  {isEditing ? (
                    <Input
                      value={editedData.lastBuild.date}
                      onChange={(e) => setEditedData(prev => ({
                        ...prev,
                        lastBuild: { ...prev.lastBuild, date: e.target.value }
                      }))}
                      className="h-8 text-xs sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{data.lastBuild.date}</p>
                  )}
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600 text-xs flex-shrink-0">
                  {(isEditing ? editedData : data).lastBuild.status}
                </Badge>
              </button>
              
              {/* Deploy Block - Clickable */}
              <button
                onClick={handleDeployLogClick}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted rounded-lg gap-2 sm:gap-3 hover:bg-muted/80 transition-colors cursor-pointer text-left group"
                title="Нажмите для просмотра лога развертывания"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Последнее развертывание</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </div>
                  {isEditing ? (
                    <Input
                      value={editedData.lastDeploy.date}
                      onChange={(e) => setEditedData(prev => ({
                        ...prev,
                        lastDeploy: { ...prev.lastDeploy, date: e.target.value }
                      }))}
                      className="h-8 text-xs sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{data.lastDeploy.date}</p>
                  )}
                </div>
                <Badge variant="outline" className="text-red-600 border-red-600 text-xs flex-shrink-0">
                  {(isEditing ? editedData : data).lastDeploy.status}
                </Badge>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Build Log Dialog */}
      <Dialog open={isBuildLogOpen} onOpenChange={setIsBuildLogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Лог сборки проекта {projectKey}
            </DialogTitle>
            <DialogDescription>
              Полный лог последней сборки от {data.lastBuild.date} — Статус: {data.lastBuild.status}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {data.lastBuild.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyLogToClipboard(buildLog, 'сборки')}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Копировать лог
              </Button>
            </div>
            <ScrollArea className="h-[400px] w-full border rounded-md p-4">
              <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">
                {buildLog}
              </pre>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deploy Log Dialog */}
      <Dialog open={isDeployLogOpen} onOpenChange={setIsDeployLogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Лог развертывания проекта {projectKey}
            </DialogTitle>
            <DialogDescription>
              Полный лог последнего развертывания от {data.lastDeploy.date} — Статус: {data.lastDeploy.status}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-red-600 border-red-600">
                {data.lastDeploy.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyLogToClipboard(deployLog, 'развертывания')}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Копировать лог
              </Button>
            </div>
            <ScrollArea className="h-[400px] w-full border rounded-md p-4">
              <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">
                {deployLog}
              </pre>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}