import React, { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Simple SVG icons
const CalendarDays = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
);

const TrendingDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,17 13.5,8.5 8.5,13.5 2,7"/>
    <polyline points="16,17 22,17 22,11"/>
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
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

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);

const Wrench = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
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

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="m16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

const GitMerge = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="18" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <path d="m6 21V9a9 9 0 0 1 9 9"/>
  </svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="m21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M8 16H3v5"/>
  </svg>
);

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

type DateRange = {
  from: Date;
  to: Date;
}

type QuickFilter = "7d" | "30d" | "90d" | "1y" | "custom";

type FailureData = {
  name: string;
  value: number;
  color: string;
  trend: "up" | "down";
  trendValue: string;
  avgFixTime: string;
  incidents: number;
  details: FailureIncident[];
};

type FailureIncident = {
  id: string;
  timestamp: string;
  pipeline: string;
  branch: string;
  error: string;
  fixTime: string;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
  assignee?: string;
};

export function ProjectMetrics() {
  // Date filter state
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("30d");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Quick filters
  const quickFilters = [
    { value: "7d" as QuickFilter, label: "7 дней" },
    { value: "30d" as QuickFilter, label: "30 дней" },
    { value: "90d" as QuickFilter, label: "90 дней" },
    { value: "1y" as QuickFilter, label: "1 год" },
    { value: "custom" as QuickFilter, label: "Произвольный" }
  ];

  // Handle quick filter change
  const handleQuickFilter = (filter: QuickFilter) => {
    setQuickFilter(filter);
    const now = new Date();
    let from = new Date();

    switch (filter) {
      case "7d":
        from.setDate(now.getDate() - 7);
        break;
      case "30d":
        from.setDate(now.getDate() - 30);
        break;
      case "90d":
        from.setDate(now.getDate() - 90);
        break;
      case "1y":
        from.setFullYear(now.getFullYear() - 1);
        break;
      case "custom":
        return; // Don't auto-set dates for custom
    }

    if (filter !== "custom") {
      setDateRange({ from, to: now });
    }
  };

  // Format date for input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Handle date input changes
  const handleDateChange = (type: 'from' | 'to', value: string) => {
    const newDate = new Date(value);
    setDateRange(prev => ({
      ...prev,
      [type]: newDate
    }));
    setQuickFilter("custom");
  };

  // Handle click outside to close filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Get active period label
  const getActivePeriodLabel = () => {
    if (quickFilter !== "custom") {
      return quickFilters.find(f => f.value === quickFilter)?.label || "30 дней";
    }
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ru-RU', { 
        day: '2-digit', 
        month: 'short' 
      });
    };
    
    return `${formatDate(dateRange.from)} — ${formatDate(dateRange.to)}`;
  };

  // Raw data (normally would come from API)
  const rawData = {
    doraMetrics: [
      {
        name: "Deployment Frequency",
        nameRu: "Частота развертываний",
        value: "2.3",
        unit: "раза в день",
        trend: "up",
        trendValue: "+15%",
        status: "good",
        icon: <Zap className="h-5 w-5" />
      },
      {
        name: "Lead Time for Changes", 
        nameRu: "Время выполнения изменений",
        value: "4.2",
        unit: "часа",
        trend: "down",
        trendValue: "-23%",
        status: "good",
        icon: <Clock className="h-5 w-5" />
      },
      {
        name: "Change Failure Rate",
        nameRu: "Процент неудачных изменений",
        value: "2.1",
        unit: "%",
        trend: "down", 
        trendValue: "-0.8%",
        status: "excellent",
        icon: <AlertTriangle className="h-5 w-5" />
      },
      {
        name: "Mean Time to Recovery",
        nameRu: "Время восстановления сервиса", 
        value: "1.8",
        unit: "часа",
        trend: "down",
        trendValue: "-12%",
        status: "good",
        icon: <Wrench className="h-5 w-5" />
      }
    ],
    releaseData: [
      { month: 'Окт 23', releases: 3, builds: 22, deployments: 15, date: new Date('2023-10-01') },
      { month: 'Ноя 23', releases: 2, builds: 19, deployments: 12, date: new Date('2023-11-01') },
      { month: 'Дек 23', releases: 1, builds: 14, deployments: 8, date: new Date('2023-12-01') },
      { month: 'Янв 24', releases: 4, builds: 28, deployments: 20, date: new Date('2024-01-01') },
      { month: 'Фев 24', releases: 6, builds: 35, deployments: 28, date: new Date('2024-02-01') },
      { month: 'Мар 24', releases: 5, builds: 31, deployments: 26, date: new Date('2024-03-01') },
      { month: 'Апр 24', releases: 7, builds: 42, deployments: 35, date: new Date('2024-04-01') },
      { month: 'Май 24', releases: 8, builds: 46, deployments: 38, date: new Date('2024-05-01') },
      { month: 'Июн 24', releases: 9, builds: 52, deployments: 44, date: new Date('2024-06-01') },
      { month: 'Июл 24', releases: 6, builds: 38, deployments: 32, date: new Date('2024-07-01') },
      { month: 'Авг 24', releases: 11, builds: 58, deployments: 49, date: new Date('2024-08-01') },
      { month: 'Сен 24', releases: 9, builds: 48, deployments: 41, date: new Date('2024-09-01') },
      { month: 'Окт 24', releases: 12, builds: 62, deployments: 54, date: new Date('2024-10-01') },
      { month: 'Ноя 24', releases: 8, builds: 45, deployments: 38, date: new Date('2024-11-01') },
      { month: 'Дек 24', releases: 4, builds: 28, deployments: 22, date: new Date('2024-12-01') },
      { month: 'Янв 25', releases: 10, builds: 54, deployments: 46, date: new Date('2025-01-01') },
      { month: 'Фев 25', releases: 13, builds: 68, deployments: 58, date: new Date('2025-02-01') },
      { month: 'Мар 25', releases: 11, builds: 59, deployments: 51, date: new Date('2025-03-01') },
      { month: 'Апр 25', releases: 15, builds: 76, deployments: 65, date: new Date('2025-04-01') },
      { month: 'Май 25', releases: 14, builds: 72, deployments: 62, date: new Date('2025-05-01') },
      { month: 'Июн 25', releases: 16, builds: 82, deployments: 71, date: new Date('2025-06-01') },
      { month: 'Июл 25', releases: 12, builds: 64, deployments: 55, date: new Date('2025-07-01') },
      { month: 'Авг 25', releases: 18, builds: 94, deployments: 81, date: new Date('2025-08-01') }
    ],
    businessMetrics: [
      { name: "Time to Market", value: "32", unit: "дня", change: "-5", icon: <Target className="h-5 w-5" /> },
      { name: "Экономия затрат", value: "₽2.1M", unit: "в год", change: "+15%", icon: <DollarSign className="h-5 w-5" /> },
      { name: "Качество кода", value: "94", unit: "%", change: "+2%", icon: <BarChart3 className="h-5 w-5" /> }
    ],
    failureReasons: [
      { 
        name: 'Ошибки тестирования', 
        value: 35, 
        color: 'bg-red-500',
        trend: "down" as const,
        trendValue: "-8%",
        avgFixTime: "45 мин",
        incidents: 30,
        details: [
          {
            id: "TEST-001",
            timestamp: "14 авг 2025, 14:23",
            pipeline: "main-build",
            branch: "feature/auth-fix",
            error: "Unit test failed: AuthService.validateToken",
            fixTime: "32 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "А. Петров"
          },
          {
            id: "TEST-002", 
            timestamp: "14 авг 2025, 12:15",
            pipeline: "integration-test",
            branch: "develop",
            error: "Integration test timeout: API Gateway connection",
            fixTime: "1ч 15мин",
            severity: "high" as const,
            resolved: true,
            assignee: "И. Сидоров"
          },
          {
            id: "TEST-003",
            timestamp: "13 авг 2025, 16:45",
            pipeline: "e2e-test", 
            branch: "release/v1.2.3",
            error: "E2E test failed: Login flow with 2FA",
            fixTime: "25 мин",
            severity: "low" as const,
            resolved: true,
            assignee: "М. Иванова"
          },
          {
            id: "TEST-004",
            timestamp: "13 авг 2025, 09:30",
            pipeline: "feature-test",
            branch: "feature/payment-system",
            error: "Payment validation test failed: Invalid card format",
            fixTime: "48 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "Л. Кузнецова"
          },
          {
            id: "TEST-005",
            timestamp: "12 авг 2025, 18:20",
            pipeline: "performance-test",
            branch: "main",
            error: "Load test failed: Response time > 2s threshold",
            fixTime: "2ч 5мин",
            severity: "high" as const,
            resolved: true,
            assignee: "С. Волков"
          },
          {
            id: "TEST-006",
            timestamp: "12 авг 2025, 11:10",
            pipeline: "security-scan",
            branch: "feature/user-roles",
            error: "Security test failed: SQL injection vulnerability",
            fixTime: "3ч 20мин",
            severity: "critical" as const,
            resolved: true,
            assignee: "Н. Белов"
          },
          {
            id: "TEST-007",
            timestamp: "11 авг 2025, 15:45",
            pipeline: "smoke-tests",
            branch: "release/v1.2.2",
            error: "Smoke test failed: Health check endpoint not responding",
            fixTime: "15 мин",
            severity: "low" as const,
            resolved: true,
            assignee: "Д. Морозова"
          }
        ]
      },
      { 
        name: 'Проблемы сборки', 
        value: 25, 
        color: 'bg-blue-500',
        trend: "up" as const,
        trendValue: "+5%",
        avgFixTime: "28 мин",
        incidents: 22,
        details: [
          {
            id: "BUILD-001",
            timestamp: "14 авг 2025, 11:30",
            pipeline: "main-build",
            branch: "main",
            error: "Compilation failed: Missing dependency @types/node",
            fixTime: "15 мин",
            severity: "low" as const,
            resolved: true,
            assignee: "Д. Козлов"
          },
          {
            id: "BUILD-002",
            timestamp: "13 авг 2025, 20:12",
            pipeline: "frontend-build",
            branch: "feature/ui-redesign",
            error: "Webpack build failed: Memory limit exceeded",
            fixTime: "42 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "С. Новиков"
          },
          {
            id: "BUILD-003",
            timestamp: "13 авг 2025, 14:25",
            pipeline: "docker-build",
            branch: "feature/microservices",
            error: "Docker build failed: Layer size exceeded 1GB limit",
            fixTime: "1ч 8мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "Р. Смирнов"
          },
          {
            id: "BUILD-004",
            timestamp: "12 авг 2025, 16:40",
            pipeline: "mobile-build",
            branch: "feature/offline-mode",
            error: "iOS build failed: Missing provisioning profile",
            fixTime: "35 мин",
            severity: "low" as const,
            resolved: true,
            assignee: "Т. Орлова"
          },
          {
            id: "BUILD-005",
            timestamp: "12 авг 2025, 08:15",
            pipeline: "backend-build",
            branch: "feature/graphql-api",
            error: "Maven build failed: Unresolved dependency conflict",
            fixTime: "52 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "А. Федоров"
          },
          {
            id: "BUILD-006",
            timestamp: "11 авг 2025, 19:30",
            pipeline: "code-quality",
            branch: "develop",
            error: "SonarQube quality gate failed: Coverage below 80%",
            fixTime: "2ч 15мин",
            severity: "high" as const,
            resolved: true,
            assignee: "Е. Васильева"
          }
        ]
      },
      { 
        name: 'Зависимости', 
        value: 20, 
        color: 'bg-yellow-500',
        trend: "down" as const,
        trendValue: "-12%",
        avgFixTime: "1ч 5мин",
        incidents: 17,
        details: [
          {
            id: "DEP-001",
            timestamp: "12 авг 2025, 09:20",
            pipeline: "security-scan",
            branch: "develop",
            error: "Vulnerable dependency detected: lodash@4.17.20",
            fixTime: "1ч 20мин",
            severity: "high" as const,
            resolved: true,
            assignee: "О. Белова"
          },
          {
            id: "DEP-002",
            timestamp: "11 авг 2025, 15:33",
            pipeline: "dependency-check",
            branch: "main",
            error: "Outdated package: react@17.0.2 -> 18.2.0",
            fixTime: "50 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "В. Морозов"
          },
          {
            id: "DEP-003",
            timestamp: "11 авг 2025, 10:15",
            pipeline: "npm-audit",
            branch: "feature/charts",
            error: "High severity vulnerability in chart.js@2.9.4",
            fixTime: "1ч 45мин",
            severity: "high" as const,
            resolved: true,
            assignee: "И. Петрова"
          },
          {
            id: "DEP-004",
            timestamp: "10 авг 2025, 13:22",
            pipeline: "maven-verify",
            branch: "feature/auth",
            error: "Dependency conflict: spring-boot versions mismatch",
            fixTime: "2ч 10мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "Г. Сидоров"
          },
          {
            id: "DEP-005",
            timestamp: "09 авг 2025, 17:40",
            pipeline: "security-scan",
            branch: "release/v1.2.1",
            error: "Critical vulnerability in jackson-databind@2.9.10",
            fixTime: "3ч 5мин",
            severity: "critical" as const,
            resolved: true,
            assignee: "К. Николаев"
          }
        ]
      },
      { 
        name: 'Инфраструктура', 
        value: 12, 
        color: 'bg-green-500',
        trend: "down" as const,
        trendValue: "-20%",
        avgFixTime: "2ч 15мин",
        incidents: 13,
        details: [
          {
            id: "INFRA-001",
            timestamp: "10 авг 2025, 14:45",
            pipeline: "deployment",
            branch: "main",
            error: "Kubernetes pod startup timeout",
            fixTime: "3ч 10мин",
            severity: "critical" as const,
            resolved: true,
            assignee: "Р. Кузнецов"
          },
          {
            id: "INFRA-002",
            timestamp: "09 авг 2025, 08:22",
            pipeline: "staging-deploy",
            branch: "develop",
            error: "Docker registry connection failed",
            fixTime: "1ч 20мин",
            severity: "high" as const,
            resolved: true,
            assignee: "Н. Соколова"
          },
          {
            id: "INFRA-003",
            timestamp: "08 авг 2025, 16:30",
            pipeline: "monitoring-setup",
            branch: "feature/prometheus",
            error: "Prometheus configuration error: Invalid scrape config",
            fixTime: "45 мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "Ю. Лебедев"
          },
          {
            id: "INFRA-004",
            timestamp: "07 авг 2025, 11:15",
            pipeline: "backup-restore",
            branch: "main",
            error: "Database backup failed: Insufficient storage space",
            fixTime: "2ч 30мин",
            severity: "high" as const,
            resolved: true,
            assignee: "М. Зайцева"
          },
          {
            id: "INFRA-005",
            timestamp: "06 авг 2025, 20:45",
            pipeline: "load-balancer-config",
            branch: "feature/ssl-termination",
            error: "Load balancer health check failure",
            fixTime: "1ч 55мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "В. Романов"
          }
        ]
      },
      { 
        name: 'Прочие', 
        value: 8, 
        color: 'bg-purple-500',
        trend: "up" as const,
        trendValue: "+3%",
        avgFixTime: "35 мин",
        incidents: 9,
        details: [
          {
            id: "OTHER-001",
            timestamp: "08 авг 2025, 12:10",
            pipeline: "quality-gate",
            branch: "feature/performance",
            error: "Code coverage below threshold: 78% < 80%",
            fixTime: "2ч 5мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "Т. Лебедев"
          },
          {
            id: "OTHER-002",
            timestamp: "07 авг 2025, 14:35",
            pipeline: "documentation-build",
            branch: "feature/api-docs",
            error: "Documentation generation failed: Missing API schema",
            fixTime: "1ч 30мин",
            severity: "low" as const,
            resolved: true,
            assignee: "Е. Павлова"
          },
          {
            id: "OTHER-003",
            timestamp: "06 авг 2025, 09:20",
            pipeline: "license-check",
            branch: "main",
            error: "License compatibility issue: GPL vs MIT conflict",
            fixTime: "3ч 15мин",
            severity: "medium" as const,
            resolved: true,
            assignee: "А. Максимов"
          },
          {
            id: "OTHER-004",
            timestamp: "05 авг 2025, 16:50",
            pipeline: "accessibility-test",
            branch: "feature/a11y",
            error: "WCAG 2.1 AA compliance failed: Missing alt attributes",
            fixTime: "1ч 25мин",
            severity: "low" as const,
            resolved: true,
            assignee: "С. Козлова"
          }
        ]
      }
    ],
    pipelineStats: [
      { name: "main-build", success: 87, failed: 13, duration: "12m" },
      { name: "feature-test", success: 92, failed: 8, duration: "8m" },
      { name: "security-scan", success: 78, failed: 22, duration: "15m" },
      { name: "integration", success: 85, failed: 15, duration: "25m" },
      { name: "deployment", success: 94, failed: 6, duration: "18m" },
      { name: "e2e-testing", success: 82, failed: 18, duration: "35m" },
      { name: "performance-test", success: 89, failed: 11, duration: "45m" },
      { name: "code-quality", success: 95, failed: 5, duration: "6m" },
      { name: "docker-build", success: 91, failed: 9, duration: "14m" },
      { name: "staging-deploy", success: 88, failed: 12, duration: "22m" },
      { name: "prod-deploy", success: 96, failed: 4, duration: "28m" },
      { name: "smoke-tests", success: 98, failed: 2, duration: "4m" },
      { name: "backup-restore", success: 85, failed: 15, duration: "32m" },
      { name: "monitoring-setup", success: 93, failed: 7, duration: "11m" }
    ],
    gitsyncStatuses: [
      { repo: "frontend-app", status: "синхронизировано", lastSync: "2 мин назад", commits: 42 },
      { repo: "backend-api", status: "синхронизировано", lastSync: "5 мин назад", commits: 38 },
      { repo: "infrastructure", status: "ошибка", lastSync: "2 часа назад", commits: 15 },
      { repo: "documentation", status: "в процессе", lastSync: "30 сек назад", commits: 8 },
      { repo: "configs", status: "синхронизировано", lastSync: "1 мин назад", commits: 23 },
      { repo: "mobile-app", status: "синхронизировано", lastSync: "3 мин назад", commits: 56 },
      { repo: "shared-components", status: "синхронизировано", lastSync: "7 мин назад", commits: 34 },
      { repo: "testing-framework", status: "в процессе", lastSync: "45 сек назад", commits: 19 },
      { repo: "deployment-scripts", status: "синхронизировано", lastSync: "12 мин назад", commits: 28 },
      { repo: "monitoring-tools", status: "ошибка", lastSync: "4 часа назад", commits: 11 },
      { repo: "security-policies", status: "синхронизировано", lastSync: "8 мин назад", commits: 7 },
      { repo: "data-pipelines", status: "синхронизировано", lastSync: "15 мин назад", commits: 31 },
      { repo: "integration-tests", status: "в процессе", lastSync: "1 мин назад", commits: 22 },
      { repo: "performance-benchmarks", status: "синхронизировано", lastSync: "25 мин назад", commits: 14 }
    ]
  };

  // Filter data based on date range
  const filteredData = useMemo(() => {
    const filterByDate = (data: any[]) => {
      return data.filter(item => {
        if (!item.date) return true; // Keep items without dates
        return item.date >= dateRange.from && item.date <= dateRange.to;
      });
    };

    // Apply filtering logic based on selected period
    const adjustMetricsByPeriod = (value: number, days: number) => {
      const totalDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
      const ratio = totalDays / days;
      return Math.round(value * ratio * 10) / 10; // Round to 1 decimal
    };

    const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));

    return {
      doraMetrics: rawData.doraMetrics.map(metric => ({
        ...metric,
        value: metric.name === "Deployment Frequency" ? 
          String(adjustMetricsByPeriod(2.3, 30)) :
          metric.name === "Lead Time for Changes" ?
          String(adjustMetricsByPeriod(4.2, 30)) :
          metric.name === "Change Failure Rate" ?
          String(adjustMetricsByPeriod(2.1, 30)) :
          String(adjustMetricsByPeriod(1.8, 30))
      })),
      releaseData: filterByDate(rawData.releaseData),
      businessMetrics: rawData.businessMetrics.map(metric => ({
        ...metric,
        value: metric.name === "Time to Market" ?
          String(Math.round(32 * (daysDiff / 30))) :
          metric.value
      })),
      failureReasons: rawData.failureReasons,
      pipelineStats: rawData.pipelineStats,
      gitsyncStatuses: rawData.gitsyncStatuses
    };
  }, [dateRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 border-green-600";
      case "good":
        return "text-blue-600 border-blue-600";
      case "warning":
        return "text-yellow-600 border-yellow-600";
      case "poor":
        return "text-red-600 border-red-600";
      default:
        return "text-gray-600 border-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-green-600" />;
  };

  const getGitsyncStatusBadge = (status: string) => {
    switch (status) {
      case "синхронизировано":
        return <Badge variant="outline" className="text-green-600 border-green-600">{status}</Badge>;
      case "ошибка":
        return <Badge variant="outline" className="text-red-600 border-red-600">{status}</Badge>;
      case "в процессе":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Критический</Badge>;
      case "high":
        return <Badge variant="outline" className="text-red-600 border-red-600">Высокий</Badge>;
      case "medium":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Средний</Badge>;
      case "low":
        return <Badge variant="outline" className="text-green-600 border-green-600">Низкий</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  // Interactive chart component for releases
  const InteractiveBarChart = ({ data, dataKey, color = "bg-blue-500" }: { data: any[], dataKey: string, color?: string }) => {
    const maxValue = Math.max(...data.map(item => item[dataKey]), 1); // Prevent division by zero
    
    return (
      <div className="space-y-4">
        <div className="flex items-end justify-between h-40 px-2 gap-2 border-b border-border">
          {data.length > 0 ? data.map((item, index) => {
            const height = Math.max((item[dataKey] / maxValue) * 120, 4);
            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="flex items-end justify-center w-full" style={{ height: '120px' }}>
                  <div
                    className={`${color} rounded-t transition-all duration-200 group-hover:opacity-80 group-hover:scale-105 group-hover:shadow-sm`}
                    style={{ 
                      height: `${height}px`,
                      width: '100%',
                      maxWidth: '32px'
                    }}
                    title={`${item.month}: ${item[dataKey]}`}
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{item.month}</div>
                  <div className="text-xs font-medium group-hover:font-semibold transition-all">{item[dataKey]}</div>
                </div>
              </div>
            );
          }) : (
            <div className="flex items-center justify-center w-full h-32 text-muted-foreground">
              Нет данных за выбранный период
            </div>
          )}
        </div>
      </div>
    );
  };

  // Interactive pie chart component
  const InteractivePieChart = ({ data }: { data: any[] }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeOffset = 0;
    
    const getStrokeColor = (colorClass: string) => {
      const colorMap: { [key: string]: string } = {
        'bg-red-500': '#ef4444',
        'bg-blue-500': '#3b82f6',
        'bg-yellow-500': '#eab308',
        'bg-green-500': '#22c55e',
        'bg-purple-500': '#a855f7'
      };
      return colorMap[colorClass] || '#6b7280';
    };
    
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              {data.map((item, index) => {
                const angle = (item.value / total) * 360;
                const strokeDasharray = `${(angle / 360) * 251.3} 251.3`;
                const strokeDashoffset = -cumulativeOffset;
                cumulativeOffset += (angle / 360) * 251.3;
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={getStrokeColor(item.color)}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors cursor-pointer group">
              <div className={`w-3 h-3 rounded ${item.color} group-hover:scale-110 transition-transform`}></div>
              <span className="text-sm group-hover:font-medium transition-all">{item.name}</span>
              <span className="text-sm text-muted-foreground ml-auto group-hover:text-foreground transition-colors">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Advanced Failure Analysis Component
  const FailureAnalysisComponent = ({ data }: { data: FailureData[] }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCategoryClick = (categoryName: string) => {
      setSelectedCategory(categoryName);
      setIsDetailDialogOpen(true);
    };

    const selectedCategoryData = data.find(item => item.name === selectedCategory);
    const filteredIncidents = selectedCategoryData?.details.filter(incident =>
      incident.error.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.pipeline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.branch.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
      <>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="trends">Тренды</TabsTrigger>
            <TabsTrigger value="details">Детали</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div>
                <h4 className="font-medium mb-4">Распределение по категориям</h4>
                <InteractivePieChart data={data} />
              </div>
              
              {/* Category Stats */}
              <div>
                <h4 className="font-medium mb-4">Статистика категорий</h4>
                <div className="space-y-3">
                  {data.map((item, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                      onClick={() => handleCategoryClick(item.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${item.color}`}></div>
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.trend === "up" ? 
                            <TrendingUp className="h-3 w-3 text-red-500" /> : 
                            <TrendingDown className="h-3 w-3 text-green-500" />
                          }
                          <span className={`text-xs ${item.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                            {item.trendValue}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Инциденты:</span>
                          <div className="font-medium">{item.incidents}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ср. время:</span>
                          <div className="font-medium">{item.avgFixTime}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Доля:</span>
                          <div className="font-medium">{item.value}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Динамика сбоев по неделям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Неделя 1", "Неделя 2", "Неделя 3", "Неделя 4"].map((week, index) => {
                      const failures = [12, 8, 15, 6][index];
                      const maxFailures = 15;
                      const width = (failures / maxFailures) * 100;
                      return (
                        <div key={week} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{week}</span>
                            <span className="font-medium">{failures} сбоев</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recovery Time Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Время восстановления</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-green-600">42мин</div>
                        <div className="text-xs text-muted-foreground">Среднее время</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">15мин</div>
                        <div className="text-xs text-muted-foreground">Медианное время</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>&lt; 30 мин</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-[65%]" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>30-60 мин</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-[25%]" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>&gt; 60 мин</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-[10%]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${category.color}`}></div>
                        <h4 className="font-medium text-sm">{category.name}</h4>
                      </div>
                      <Badge variant="outline">{category.incidents}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Последние инциденты:</div>
                      <div className="space-y-1">
                        {category.details.slice(0, 2).map((incident, idx) => (
                          <div key={idx} className="text-xs p-2 bg-muted rounded">
                            <div className="font-medium truncate">{incident.pipeline}</div>
                            <div className="text-muted-foreground truncate">{incident.error}</div>
                            <div className="flex justify-between mt-1">
                              <span>{incident.fixTime}</span>
                              {getSeverityBadge(incident.severity)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        Подробнее ({category.details.length})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedCategoryData && (
                  <>
                    <div className={`w-4 h-4 rounded ${selectedCategoryData.color}`}></div>
                    Детальная информация: {selectedCategoryData.name}
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedCategoryData && (
                  <>
                    Всего инцидентов: {selectedCategoryData.incidents} | 
                    Среднее время устранения: {selectedCategoryData.avgFixTime} |
                    Тренд: {selectedCategoryData.trend === "up" ? "↗️ Ухудшение" : "↘️ Улучшение"} {selectedCategoryData.trendValue}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по ошибке, пайплайну или ветке..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Badge variant="secondary" className="self-start">
                  {filteredIncidents.length} из {selectedCategoryData?.details.length || 0}
                </Badge>
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <ScrollArea className="h-96">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[90px] min-w-[90px]">ID</TableHead>
                          <TableHead className="w-[140px] min-w-[140px]">Время</TableHead>
                          <TableHead className="w-[120px] min-w-[120px]">Пайплайн</TableHead>
                          <TableHead className="w-[160px] min-w-[160px]">Ветка</TableHead>
                          <TableHead className="min-w-[200px]">Ошибка</TableHead>
                          <TableHead className="w-[100px] min-w-[100px]">Время устранения</TableHead>
                          <TableHead className="w-[110px] min-w-[110px]">Серьезность</TableHead>
                          <TableHead className="w-[120px] min-w-[120px]">Исполнитель</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredIncidents.map((incident) => (
                          <TableRow key={incident.id} className="hover:bg-muted/50">
                            <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                            <TableCell className="text-xs whitespace-nowrap">{incident.timestamp}</TableCell>
                            <TableCell className="text-xs">
                              <Badge variant="outline" className="text-xs">
                                {incident.pipeline}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs font-mono">{incident.branch}</TableCell>
                            <TableCell className="text-xs">
                              <div className="max-w-[300px] truncate" title={incident.error}>
                                {incident.error}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs whitespace-nowrap">{incident.fixTime}</TableCell>
                            <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                            <TableCell className="text-xs">{incident.assignee}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden">
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {filteredIncidents.map((incident) => (
                      <div key={incident.id} className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-mono text-sm font-medium">{incident.id}</div>
                          <div className="text-xs text-muted-foreground">{incident.timestamp}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Badge variant="outline" className="text-xs w-fit">
                              {incident.pipeline}
                            </Badge>
                            <div className="text-xs font-mono text-muted-foreground">{incident.branch}</div>
                          </div>
                          
                          <div className="text-sm">
                            <div className="font-medium mb-1">Ошибка:</div>
                            <div className="text-muted-foreground break-words">{incident.error}</div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t">
                            <div className="flex items-center gap-2">
                              {getSeverityBadge(incident.severity)}
                              <span className="text-xs text-muted-foreground">{incident.fixTime}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{incident.assignee}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredIncidents.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        {searchTerm ? "Инциденты не найдены" : "Нет данных"}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Date Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              Фильтр по периоду
            </CardTitle>
            <div className="flex items-center gap-2 relative">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {getActivePeriodLabel()}
              </Badge>
              <div className="relative" ref={filterRef}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Изменить период</span>
                  <span className="sm:hidden">Период</span>
                </Button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-popover border rounded-lg shadow-lg z-50 p-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Быстрые фильтры</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {quickFilters.map((filter) => (
                            <Button
                              key={filter.value}
                              variant={quickFilter === filter.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleQuickFilter(filter.value)}
                              className="justify-start"
                            >
                              {filter.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Произвольный период</Label>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="date-from" className="text-xs">С даты</Label>
                            <Input
                              id="date-from"
                              type="date"
                              value={formatDateForInput(dateRange.from)}
                              onChange={(e) => handleDateChange('from', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="date-to" className="text-xs">По дату</Label>
                            <Input
                              id="date-to"
                              type="date"
                              value={formatDateForInput(dateRange.to)}
                              onChange={(e) => handleDateChange('to', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full"
                      >
                        Применить фильтр
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* DORA Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
            DORA Метрики
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredData.doraMetrics.map((metric, index) => (
              <div key={index} className="p-3 sm:p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-muted-foreground">
                    {React.cloneElement(metric.icon, { className: "h-4 w-4 sm:h-5 sm:w-5" })}
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(metric.status)} text-xs`}>
                    {metric.status === "excellent" ? "Отлично" : 
                     metric.status === "good" ? "Хорошо" :
                     metric.status === "warning" ? "Внимание" : "Плохо"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm line-clamp-2">{metric.name}</h4>
                    <p className="text-xs text-muted-foreground">{metric.nameRu}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-bold">{metric.value}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    {getTrendIcon(metric.trend)}
                    <span className="text-muted-foreground">{metric.trendValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Release Reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
              Динамика релизов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveBarChart data={filteredData.releaseData} dataKey="releases" color="bg-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <GitBranch className="h-4 w-4 sm:h-5 sm:w-5" />
              Сборки и развертывания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-3">Сборки</h4>
                  <InteractiveBarChart data={filteredData.releaseData} dataKey="builds" color="bg-green-500" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-3">Развертывания</h4>
                  <InteractiveBarChart data={filteredData.releaseData} dataKey="deployments" color="bg-purple-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Target className="h-4 w-4 sm:h-5 sm:w-5" />
            Бизнес-метрики
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredData.businessMetrics.map((metric, index) => (
              <div key={index} className="p-3 sm:p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-muted-foreground">
                    {React.cloneElement(metric.icon, { className: "h-4 w-4 sm:h-5 sm:w-5" })}
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm">{metric.name}</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-bold">{metric.value}</span>
                    <span className="text-xs text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-green-600">
                    {metric.change} за период
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Failure Analysis - Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Детальная аналитика сбоев сборки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FailureAnalysisComponent data={filteredData.failureReasons} />
        </CardContent>
      </Card>

      {/* Pipeline Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <GitMerge className="h-4 w-4 sm:h-5 sm:w-5" />
            Статистика пайплайнов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {filteredData.pipelineStats.map((pipeline, index) => (
              <div key={index} className="p-3 sm:p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{pipeline.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Успешных: {pipeline.success}%</span>
                      <span>Сбоев: {pipeline.failed}%</span>
                      <span>Длительность: {pipeline.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pipeline.success}%` }}
                      />
                    </div>
                    <Badge variant={pipeline.success >= 90 ? "outline" : "destructive"} className="text-xs">
                      {pipeline.success >= 90 ? "Стабильно" : "Нужно внимание"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Git Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            Статус синхронизации Git
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredData.gitsyncStatuses.map((repo, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{repo.repo}</h4>
                  {getGitsyncStatusBadge(repo.status)}
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Последняя синхронизация: {repo.lastSync}</div>
                  <div>Коммитов: {repo.commits}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}