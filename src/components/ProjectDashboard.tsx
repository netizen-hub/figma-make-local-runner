import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// Simple SVG icons
const Folder = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);





interface Project {
  key: string;
  name: string;
  description: string;
  userRole: string;
  status: "Активен" | "Архивный";
  lastActivity: string;
  teamSize: number;
}

interface ProjectDashboardProps {
  onProjectSelect: (projectKey: string) => void;
}

export function ProjectDashboard({ onProjectSelect }: ProjectDashboardProps) {
  const projects: Project[] = [
    {
      key: "xorb",
      name: "XORB Platform",
      description: "Основная платформа обработки данных и аналитики",
      userRole: "DevOps-инженер",
      status: "Активен",
      lastActivity: "2 часа назад",
      teamSize: 12
    },
    {
      key: "first",
      name: "First Initiative",
      description: "Пилотный проект внедрения новых технологий",
      userRole: "Руководитель разработки",
      status: "Активен",
      lastActivity: "30 мин назад",
      teamSize: 8
    },
    {
      key: "best",
      name: "BEST Analytics",
      description: "Система бизнес-аналитики и отчетности",
      userRole: "SRE",
      status: "Активен",
      lastActivity: "1 час назад",
      teamSize: 15
    },
    {
      key: "dmls",
      name: "Data Management Layer Service",
      description: "Сервис управления слоем данных и интеграций",
      userRole: "DevOps-инженер",
      status: "Активен",
      lastActivity: "4 часа назад",
      teamSize: 6
    },
    {
      key: "mlds",
      name: "Machine Learning Data Service",
      description: "Платформа данных для машинного обучения",
      userRole: "Владелец продукта",
      status: "Архивный",
      lastActivity: "1 день назад",
      teamSize: 10
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Активен") {
      return <Badge variant="outline" className="text-green-600 border-green-600 text-xs whitespace-nowrap">{status}</Badge>;
    } else {
      return <Badge variant="outline" className="text-gray-600 border-gray-600 text-xs whitespace-nowrap">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      "DevOps-инженер": "bg-purple-100 text-purple-800",
      "Руководитель разработки": "bg-blue-100 text-blue-800", 
      "SRE": "bg-green-100 text-green-800",
      "Владелец продукта": "bg-orange-100 text-orange-800"
    };
    
    const colorClass = roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800";
    
    return (
      <Badge variant="secondary" className={`${colorClass} text-xs max-w-full`}>
        <User className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{role}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Мои проекты</h1>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <Card 
            key={project.key} 
            className="hover:shadow-lg hover:bg-accent/50 transition-all cursor-pointer group overflow-hidden"
            onClick={() => onProjectSelect(project.key)}
          >
            <CardHeader className="pb-3 sm:pb-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                    {project.key}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    {getRoleBadge(project.userRole)}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground border-t border-border/50 pt-3">
                <div className="flex items-center gap-1 min-w-0">
                  <User className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{project.teamSize} участников</span>
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{project.lastActivity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}