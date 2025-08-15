import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";

// Simple SVG icons
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="m16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m18 6-12 12"/>
    <path d="m6 6 12 12"/>
  </svg>
);

type ProjectMember = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  initials: string;
};

type ProjectMembersProps = {
  projectKey?: string;
};

export function ProjectMembers({ projectKey = "xorb" }: ProjectMembersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Тестовые данные участников проекта
  const members: ProjectMember[] = [
    {
      id: "1",
      fullName: "Иванов Алексей Сергеевич",
      email: "a.ivanov@company.ru",
      role: "Руководитель проекта",
      initials: "ИА"
    },
    {
      id: "2", 
      fullName: "Петрова Мария Викторовна",
      email: "m.petrova@company.ru",
      role: "Руководитель разработки",
      initials: "ПМ"
    },
    {
      id: "3",
      fullName: "Сидоров Дмитрий Александрович", 
      email: "d.sidorov@company.ru",
      role: "Разработчик",
      initials: "СД"
    },
    {
      id: "4",
      fullName: "Козлова Елена Николаевна",
      email: "e.kozlova@company.ru", 
      role: "Тестировщик",
      initials: "КЕ"
    },
    {
      id: "5",
      fullName: "Морозов Владимир Петрович",
      email: "v.morozov@company.ru",
      role: "Релиз-инженер", 
      initials: "МВ"
    },
    {
      id: "6",
      fullName: "Белова Ольга Сергеевна",
      email: "o.belova@company.ru",
      role: "Специалист ИБ",
      initials: "БО"
    },
    {
      id: "7",
      fullName: "Новиков Сергей Иванович",
      email: "s.novikov@company.ru",
      role: "Разработчик",
      initials: "НС"
    },
    {
      id: "8", 
      fullName: "Лебедева Татьяна Михайловна",
      email: "t.lebedeva@company.ru",
      role: "Участник проекта",
      initials: "ЛТ"
    },
    {
      id: "9",
      fullName: "Кузнецов Роман Дмитриевич", 
      email: "r.kuznetsov@company.ru",
      role: "Разработчик",
      initials: "КР"
    },
    {
      id: "10",
      fullName: "Соколова Наталья Викторовна",
      email: "n.sokolova@company.ru",
      role: "Тестировщик",
      initials: "СН"
    },
    {
      id: "11",
      fullName: "Волков Андрей Алексеевич",
      email: "a.volkov@company.ru", 
      role: "Участник проекта",
      initials: "ВА"
    },
    {
      id: "12",
      fullName: "Захарова Анна Игоревна",
      email: "a.zakharova@company.ru",
      role: "Разработчик", 
      initials: "ЗА"
    }
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Руководитель проекта":
        return "default";
      case "Руководитель разработки":
        return "secondary"; 
      case "Специалист ИБ":
        return "destructive";
      case "Релиз-инженер":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getRoleBadgeClassName = (role: string) => {
    switch (role) {
      case "Руководитель проекта":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Руководитель разработки":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Специалист ИБ":
        return "bg-red-100 text-red-800 border-red-200";
      case "Релиз-инженер":
        return "bg-green-100 text-green-800 border-green-200";
      case "Тестировщик":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Разработчик":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Фильтрация участников по поисковому запросу
  const filteredMembers = members.filter(member => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return member.fullName.toLowerCase().includes(query) || 
           member.role.toLowerCase().includes(query);
  });

  const clearSearch = () => setSearchQuery("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Участники проекта
            {filteredMembers.length !== members.length && (
              <Badge variant="secondary" className="ml-2">
                {filteredMembers.length} из {members.length}
              </Badge>
            )}
          </CardTitle>
        </div>
        
        {/* Поисковое поле */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или роли..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              title="Очистить поиск"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredMembers.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex flex-col items-center gap-3">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Участники не найдены</h3>
                <p className="text-xs text-muted-foreground">
                  {searchQuery 
                    ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : "Нет участников для отображения."
                  }
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-xs text-primary hover:underline"
                >
                  Очистить поиск
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
            <div 
              key={member.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="text-sm font-medium">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Имя */}
                  <div>
                    <h4 className="font-medium text-sm leading-tight line-clamp-2">
                      {member.fullName}
                    </h4>
                  </div>
                  
                  {/* Роль */}
                  <div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-2 py-1 ${getRoleBadgeClassName(member.role)}`}
                    >
                      {member.role}
                    </Badge>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                      title={member.email}
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground">
            <span>
              {searchQuery 
                ? `Найдено: ${filteredMembers.length} из ${members.length} участников`
                : `Всего участников: ${members.length}`
              }
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span>Последнее обновление: 14 авг 2025</span>
              <Badge variant="outline" className="text-xs">
                Проект: {projectKey.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}