import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// Import extracted modules
import { Plus, Package, Rocket, Calendar, User } from "./releases/icons";
import { 
  statusColumns, 
  releaseStatusColumns, 
  getStatusColor, 
  getReleaseStatusColor, 
  canMoveToStatus 
} from "./releases/utils";
import {
  DraggableDeliveryCard,
  DroppableDeliveryColumn,
  DraggableReleaseCard,
  DroppableReleaseColumn
} from "./releases/DragAndDrop";
import { ReleaseDetailDialog } from "./releases/ReleaseDetailDialog";
import { DeliveryDetailDialog } from "./releases/DeliveryDetailDialog";
import type { 
  ViewType, 
  Delivery, 
  Release, 
  NewDelivery, 
  NewRelease, 
  DeliveryStatus, 
  ReleaseStatus 
} from "./releases/types";

export function ReleasesAndDeliveries() {
  const [currentView, setCurrentView] = useState<ViewType>("deliveries");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createType, setCreateType] = useState<"delivery" | "release">("delivery");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isDeliveryDetailOpen, setIsDeliveryDetailOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [isReleaseDetailOpen, setIsReleaseDetailOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  // Sample data
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL-001",
      title: "Обновление API авторизации",
      description: "Реализация новой системы JWT токенов",
      component: "auth-service",
      version: "2.1.0",
      status: "DEV",
      assignee: "Иван Петров",
      createdAt: "2025-01-10",
      dueDate: "2025-01-20",
      priority: "High",
      tags: ["API", "Security"],
      environmentApprovals: {
        test: { projectManager: false, securityExpert: false },
        preProd: { projectManager: false, securityExpert: false },
        prod: { projectManager: false, securityExpert: false }
      }
    },
    {
      id: "DEL-002", 
      title: "Рефакторинг базы данных",
      description: "Оптимизация структуры таблиц пользователей",
      component: "postgresql",
      version: "14.3.3",
      status: "TEST",
      assignee: "Мария Сидорова",
      createdAt: "2025-01-08",
      dueDate: "2025-01-18",
      priority: "Medium",
      tags: ["Database", "Performance"],
      environmentApprovals: {
        test: { projectManager: true, securityExpert: true },
        preProd: { projectManager: false, securityExpert: true },
        prod: { projectManager: false, securityExpert: false }
      }
    },
    {
      id: "DEL-003",
      title: "Интеграция с внешним API",
      description: "Подключение сервиса уведомлений",
      component: "notification-service",
      version: "1.5.2",
      status: "PRE-PROD",
      assignee: "Алексей Козлов",
      createdAt: "2025-01-05", 
      dueDate: "2025-01-15",
      priority: "Medium",
      tags: ["Integration", "Notifications"],
      environmentApprovals: {
        test: { projectManager: true, securityExpert: true },
        preProd: { projectManager: true, securityExpert: true },
        prod: { projectManager: true, securityExpert: false }
      }
    },
    {
      id: "DEL-004",
      title: "Исправление критического бага",
      description: "Устранение проблемы с памятью в модуле отчетов",
      component: "report-engine",
      version: "3.0.1",
      status: "PROD",
      assignee: "Елена Волкова",
      createdAt: "2025-01-12",
      dueDate: "2025-01-14",
      priority: "High",
      tags: ["Bugfix", "Memory"],
      environmentApprovals: {
        test: { projectManager: true, securityExpert: true },
        preProd: { projectManager: true, securityExpert: true },
        prod: { projectManager: true, securityExpert: true }
      }
    },
    {
      id: "DEL-005",
      title: "Обновление зависимостей",
      description: "Обновление библиотек до последних версий",
      component: "frontend-app",
      version: "3.2.1",
      status: "DEV",
      assignee: "Дмитрий Новиков",
      createdAt: "2025-01-15",
      dueDate: "2025-01-25",
      priority: "Low",
      tags: ["Dependencies", "Security"],
      environmentApprovals: {
        test: { projectManager: false, securityExpert: false },
        preProd: { projectManager: false, securityExpert: false },
        prod: { projectManager: false, securityExpert: false }
      }
    }
  ]);

  const [releases, setReleases] = useState<Release[]>([
    {
      id: "REL-001",
      title: "Winter Release 2025",
      version: "v2.1.0",
      description: "Большое обновление с новыми функциями безопасности",
      releaseNotes: "- Новая система авторизации\n- Улучшенная производительность\n- Исправлены критические ошибки",
      deliveryIds: ["DEL-001", "DEL-004"],
      status: "Planning",
      releaseDate: "2025-02-01",
      createdAt: "2025-01-10"
    },
    {
      id: "REL-002",
      title: "Performance Boost",
      version: "v2.0.5",
      description: "Релиз, сфокусированный на производительности",
      releaseNotes: "- Оптимизация базы данных\n- Улучшенное кэширование\n- Мониторинг производительности",
      deliveryIds: ["DEL-002", "DEL-003"],
      status: "In Progress",
      releaseDate: "2025-01-25",
      createdAt: "2025-01-05"
    },
    {
      id: "REL-003",
      title: "Security Patch",
      version: "v2.0.4",
      description: "Критические исправления безопасности",
      releaseNotes: "- Устранение уязвимостей\n- Обновление зависимостей\n- Улучшение аудита",
      deliveryIds: ["DEL-001"],
      status: "Ready",
      releaseDate: "2025-01-20",
      createdAt: "2025-01-12"
    },
    {
      id: "REL-004",
      title: "Stable Release",
      version: "v2.0.3",
      description: "Стабильная версия с исправлениями",
      releaseNotes: "- Исправлена критическая ошибка памяти\n- Улучшена стабильность\n- Мелкие исправления UI",
      deliveryIds: ["DEL-004"],
      status: "Released",
      releaseDate: "2025-01-15",
      createdAt: "2025-01-08"
    }
  ]);

  // Form states
  const [newDelivery, setNewDelivery] = useState<NewDelivery>({
    title: "",
    description: "",
    component: "",
    version: "",
    assignee: "",
    dueDate: "",
    priority: "Medium",
    tags: [],
    tagInput: ""
  });

  const [newRelease, setNewRelease] = useState<NewRelease>({
    title: "",
    version: "",
    description: "",
    releaseNotes: "",
    deliveryIds: [],
    releaseDate: ""
  });

  const handleDeliveryDrop = (deliveryId: string, newStatus: DeliveryStatus) => {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery && canMoveToStatus(delivery, newStatus)) {
      setDeliveries(deliveries.map(d => 
        d.id === deliveryId ? { ...d, status: newStatus } : d
      ));
    }
  };

  const handleReleaseDrop = (releaseId: string, newStatus: ReleaseStatus) => {
    setReleases(releases.map(r => 
      r.id === releaseId ? { ...r, status: newStatus } : r
    ));
  };

  const handleCreateDelivery = () => {
    const delivery: Delivery = {
      id: `DEL-${String(deliveries.length + 1).padStart(3, '0')}`,
      title: newDelivery.title,
      description: newDelivery.description,
      component: newDelivery.component,
      version: newDelivery.version,
      status: "DEV",
      assignee: newDelivery.assignee,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: newDelivery.dueDate,
      priority: newDelivery.priority,
      tags: newDelivery.tags,
      environmentApprovals: {
        test: { projectManager: false, securityExpert: false },
        preProd: { projectManager: false, securityExpert: false },
        prod: { projectManager: false, securityExpert: false }
      }
    };
    
    setDeliveries([...deliveries, delivery]);
    setNewDelivery({
      title: "",
      description: "",
      component: "",
      version: "",
      assignee: "",
      dueDate: "",
      priority: "Medium",
      tags: [],
      tagInput: ""
    });
    setIsCreateDialogOpen(false);
  };

  const handleCreateRelease = () => {
    const release: Release = {
      id: `REL-${String(releases.length + 1).padStart(3, '0')}`,
      title: newRelease.title,
      version: newRelease.version,
      description: newRelease.description,
      releaseNotes: newRelease.releaseNotes,
      deliveryIds: newRelease.deliveryIds,
      status: "Planning",
      releaseDate: newRelease.releaseDate,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setReleases([...releases, release]);
    setNewRelease({
      title: "",
      version: "",
      description: "",
      releaseNotes: "",
      deliveryIds: [],
      releaseDate: ""
    });
    setIsCreateDialogOpen(false);
  };

  const addTag = () => {
    if (newDelivery.tagInput.trim() && !newDelivery.tags.includes(newDelivery.tagInput.trim())) {
      setNewDelivery({
        ...newDelivery,
        tags: [...newDelivery.tags, newDelivery.tagInput.trim()],
        tagInput: ""
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewDelivery({
      ...newDelivery,
      tags: newDelivery.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleDeliverySelection = (deliveryId: string, checked: boolean) => {
    if (checked) {
      setNewRelease({
        ...newRelease,
        deliveryIds: [...newRelease.deliveryIds, deliveryId]
      });
    } else {
      setNewRelease({
        ...newRelease,
        deliveryIds: newRelease.deliveryIds.filter(id => id !== deliveryId)
      });
    }
  };

  const handleDeliveryClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsDeliveryDetailOpen(true);
  };

  const handleReleaseClick = (release: Release) => {
    setSelectedRelease(release);
    setIsReleaseDetailOpen(true);
  };

  const updateEnvironmentApproval = (deliveryId: string, environment: 'test' | 'preProd' | 'prod', role: 'projectManager' | 'securityExpert', approved: boolean) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { 
            ...delivery, 
            environmentApprovals: { 
              ...delivery.environmentApprovals,
              [environment]: {
                ...delivery.environmentApprovals[environment],
                [role]: approved
              }
            } 
          }
        : delivery
    ));
    
    if (selectedDelivery && selectedDelivery.id === deliveryId) {
      setSelectedDelivery({
        ...selectedDelivery,
        environmentApprovals: {
          ...selectedDelivery.environmentApprovals,
          [environment]: {
            ...selectedDelivery.environmentApprovals[environment],
            [role]: approved
          }
        }
      });
    }
  };

  // Filter items by date range
  const filteredDeliveries = deliveries.filter(delivery => {
    if (!dateFilter.from && !dateFilter.to) return true;
    
    const deliveryDate = new Date(delivery.createdAt);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
    
    if (fromDate && deliveryDate < fromDate) return false;
    if (toDate && deliveryDate > toDate) return false;
    
    return true;
  });

  const filteredReleases = releases.filter(release => {
    if (!dateFilter.from && !dateFilter.to) return true;
    
    const releaseDate = new Date(release.createdAt);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
    
    if (fromDate && releaseDate < fromDate) return false;
    if (toDate && releaseDate > toDate) return false;
    
    return true;
  });

  const clearDateFilter = () => {
    setDateFilter({ from: "", to: "" });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header with View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* View Toggle */}
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as ViewType)} className="w-auto">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="deliveries" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Поставки</span>
                  <span className="sm:hidden">Постав.</span>
                </TabsTrigger>
                <TabsTrigger value="releases" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Rocket className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Релизы</span>
                  <span className="sm:hidden">Релизы</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="С даты"
                value={dateFilter.from}
                onChange={(e) => setDateFilter({...dateFilter, from: e.target.value})}
                className="w-auto text-sm"
              />
              <span className="text-muted-foreground">—</span>
              <Input
                type="date"
                placeholder="До даты"
                value={dateFilter.to}
                onChange={(e) => setDateFilter({...dateFilter, to: e.target.value})}
                className="w-auto text-sm"
              />
              {(dateFilter.from || dateFilter.to) && (
                <Button variant="ghost" size="sm" onClick={clearDateFilter}>
                  Сбросить
                </Button>
              )}
            </div>
          </div>

          {/* Create Button */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setCreateType(currentView === "deliveries" ? "delivery" : "release")}
                className="flex items-center gap-2" 
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {currentView === "deliveries" ? "Создать поставку" : "Создать релиз"}
                </span>
                <span className="sm:hidden">Создать</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {createType === "delivery" ? "Создание поставки" : "Создание релиза"}
                </DialogTitle>
                <DialogDescription>
                  {createType === "delivery" 
                    ? "Заполните информацию для создания новой поставки компонента" 
                    : "Заполните информацию для создания нового релиза, включая выбор поставок"
                  }
                </DialogDescription>
              </DialogHeader>
              
              {createType === "delivery" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Название поставки *</Label>
                    <Input
                      id="title"
                      placeholder="Введите название поставки"
                      value={newDelivery.title}
                      onChange={(e) => setNewDelivery({...newDelivery, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="component">Компонент *</Label>
                      <Input
                        id="component"
                        placeholder="postgresql"
                        value={newDelivery.component}
                        onChange={(e) => setNewDelivery({...newDelivery, component: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="version">Версия *</Label>
                      <Input
                        id="version"
                        placeholder="14.3.3"
                        value={newDelivery.version}
                        onChange={(e) => setNewDelivery({...newDelivery, version: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Опишите содержание поставки"
                      value={newDelivery.description}
                      onChange={(e) => setNewDelivery({...newDelivery, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assignee">Исполнитель</Label>
                      <Input
                        id="assignee"
                        placeholder="Имя исполнителя"
                        value={newDelivery.assignee}
                        onChange={(e) => setNewDelivery({...newDelivery, assignee: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dueDate">Срок выполнения</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newDelivery.dueDate}
                        onChange={(e) => setNewDelivery({...newDelivery, dueDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Приоритет</Label>
                    <Select value={newDelivery.priority} onValueChange={(value: any) => setNewDelivery({...newDelivery, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">Высокий</SelectItem>
                        <SelectItem value="Medium">Средний</SelectItem>
                        <SelectItem value="Low">Низкий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Теги</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newDelivery.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Добавить тег"
                        value={newDelivery.tagInput}
                        onChange={(e) => setNewDelivery({...newDelivery, tagInput: e.target.value})}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        Добавить
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleCreateDelivery}
                      disabled={!newDelivery.title || !newDelivery.component || !newDelivery.version}
                      className="flex-1"
                    >
                      Создать поставку
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="releaseTitle">Название релиза *</Label>
                    <Input
                      id="releaseTitle"
                      placeholder="Введите название релиза"
                      value={newRelease.title}
                      onChange={(e) => setNewRelease({...newRelease, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="releaseVersion">Версия *</Label>
                      <Input
                        id="releaseVersion"
                        placeholder="v1.0.0"
                        value={newRelease.version}
                        onChange={(e) => setNewRelease({...newRelease, version: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="releaseDate">Дата релиза</Label>
                      <Input
                        id="releaseDate"
                        type="date"
                        value={newRelease.releaseDate}
                        onChange={(e) => setNewRelease({...newRelease, releaseDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="releaseDescription">Описание</Label>
                    <Textarea
                      id="releaseDescription"
                      placeholder="Опишите релиз"
                      value={newRelease.description}
                      onChange={(e) => setNewRelease({...newRelease, description: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="releaseNotes">Примечания к релизу</Label>
                    <Textarea
                      id="releaseNotes"
                      placeholder="- Новые функции&#10;- Исправления ошибок&#10;- Улучшения"
                      value={newRelease.releaseNotes}
                      onChange={(e) => setNewRelease({...newRelease, releaseNotes: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label>Включить поставки</Label>
                    <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                      {deliveries.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Нет доступных поставок</p>
                      ) : (
                        deliveries.map((delivery) => (
                          <div key={delivery.id} className="flex items-center space-x-2 py-2">
                            <Checkbox
                              id={delivery.id}
                              checked={newRelease.deliveryIds.includes(delivery.id)}
                              onCheckedChange={(checked) => handleDeliverySelection(delivery.id, checked as boolean)}
                            />
                            <Label htmlFor={delivery.id} className="flex-1 cursor-pointer">
                              <div className="font-medium">{delivery.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {delivery.component} v{delivery.version}
                              </div>
                            </Label>
                            <Badge variant="outline" className={getStatusColor(delivery.status)}>
                              {delivery.status}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleCreateRelease}
                      disabled={!newRelease.title || !newRelease.version}
                      className="flex-1"
                    >
                      Создать релиз
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Kanban Boards */}
        {currentView === "deliveries" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {statusColumns.map((status) => (
              <DroppableDeliveryColumn 
                key={status} 
                status={status} 
                onDrop={handleDeliveryDrop}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm lg:text-base">
                      <span>{status}</span>
                      <Badge variant="secondary" className="ml-2">
                        {filteredDeliveries.filter(d => d.status === status).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredDeliveries
                      .filter(delivery => delivery.status === status)
                      .map((delivery) => (
                        <DraggableDeliveryCard key={delivery.id} delivery={delivery}>
                          <Card 
                            className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-card"
                            onClick={() => handleDeliveryClick(delivery)}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-medium leading-none line-clamp-2">
                                  {delivery.title}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    delivery.priority === 'High' ? 'border-red-200 text-red-700 dark:border-red-800 dark:text-red-400' :
                                    delivery.priority === 'Medium' ? 'border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-400' :
                                    'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400'
                                  }`}
                                >
                                  {delivery.priority}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {delivery.description}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{delivery.component}</span>
                                <span>v{delivery.version}</span>
                              </div>
                              
                              {delivery.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {delivery.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {delivery.tags.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{delivery.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span className="text-xs">{delivery.assignee}</span>
                                </div>
                                <span className="text-xs">
                                  {new Date(delivery.dueDate).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                          </Card>
                        </DraggableDeliveryCard>
                      ))}
                  </CardContent>
                </Card>
              </DroppableDeliveryColumn>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {releaseStatusColumns.map((status) => (
              <DroppableReleaseColumn 
                key={status} 
                status={status} 
                onDrop={handleReleaseDrop}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm lg:text-base">
                      <span>{status}</span>
                      <Badge variant="secondary" className="ml-2">
                        {filteredReleases.filter(r => r.status === status).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredReleases
                      .filter(release => release.status === status)
                      .map((release) => (
                        <DraggableReleaseCard key={release.id} release={release}>
                          <Card 
                            className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-card"
                            onClick={() => handleReleaseClick(release)}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-medium leading-none line-clamp-2">
                                  {release.title}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {release.version}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {release.description}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  <span>{release.deliveryIds.length} поставок</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(release.releaseDate).toLocaleDateString('ru-RU')}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </DraggableReleaseCard>
                      ))}
                  </CardContent>
                </Card>
              </DroppableReleaseColumn>
            ))}
          </div>
        )}

        {/* Detail Dialogs */}
        <DeliveryDetailDialog
          isOpen={isDeliveryDetailOpen}
          onOpenChange={setIsDeliveryDetailOpen}
          delivery={selectedDelivery}
          updateEnvironmentApproval={updateEnvironmentApproval}
        />

        <ReleaseDetailDialog
          isOpen={isReleaseDetailOpen}
          onOpenChange={setIsReleaseDetailOpen}
          release={selectedRelease}
          deliveries={deliveries}
        />
      </div>
    </DndProvider>
  );
}