import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";

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

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

type TeamMember = {
  id: string;
  role: string;
  login: string;
  fullName: string;
  email: string;
  status: string;
  initials: string;
};

export function TeamContacts() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      role: "Владелец продукта",
      login: "Petrov.AI",
      fullName: "Петров Александр Иванович",
      email: "petrov.ai@company.ru",
      status: "Активен",
      initials: "ПА"
    },
    {
      id: "2",
      role: "Эксперт ИБ", 
      login: "Sidorov.VM",
      fullName: "Сидоров Виктор Михайлович",
      email: "sidorov.vm@company.ru",
      status: "Активен",
      initials: "СВ"
    },
    {
      id: "3",
      role: "Руководитель разработки",
      login: "Kozlov.DP",
      fullName: "Козлов Дмитрий Петрович",
      email: "kozlov.dp@company.ru", 
      status: "Активен",
      initials: "КД"
    },
    {
      id: "4",
      role: "DevOps-инженер",
      login: "Volkov.AS",
      fullName: "Волков Андрей Сергеевич",
      email: "volkov.as@company.ru",
      status: "Активен",
      initials: "ВА"
    },
    {
      id: "5",
      role: "SRE",
      login: "Smirnov.EI",
      fullName: "Смирнов Евгений Игоревич",
      email: "smirnov.ei@company.ru",
      status: "В отпуске",
      initials: "СЕ"
    },
    {
      id: "6",
      role: "ЦРС",
      login: "Kuznetsov.MR",
      fullName: "Кузнецов Максим Романович",
      email: "kuznetsov.mr@company.ru",
      status: "Активен",
      initials: "КМ"
    },
    {
      id: "7",
      role: "МСП",
      login: "Mikhailov.GS",
      fullName: "Михайлов Георгий Степанович",
      email: "mikhailov.gs@company.ru",
      status: "Активен",
      initials: "МГ"
    }
  ]);

  const [editedTeamMembers, setEditedTeamMembers] = useState(teamMembers);

  const handleSave = () => {
    setTeamMembers(editedTeamMembers);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeamMembers(teamMembers);
    setIsEditing(false);
  };

  const updateMember = (index: number, field: string, value: string) => {
    setEditedTeamMembers(prev => 
      prev.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    );
  };

  // Фильтрация контактов по поисковому запросу
  const filteredMembers = (isEditing ? editedTeamMembers : teamMembers).filter(member => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return member.role.toLowerCase().includes(query) || 
           member.login.toLowerCase().includes(query) ||
           member.fullName.toLowerCase().includes(query) ||
           member.email.toLowerCase().includes(query);
  });

  const clearSearch = () => setSearchQuery("");

  const getRoleBadgeClassName = (role: string) => {
    switch (role) {
      case "Владелец продукта":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Руководитель разработки":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Эксперт ИБ":
        return "bg-red-100 text-red-800 border-red-200";
      case "DevOps-инженер":
        return "bg-green-100 text-green-800 border-green-200";
      case "SRE":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ЦРС":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "МСП":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeClassName = (status: string) => {
    switch (status) {
      case "Активен":
        return "bg-green-100 text-green-800 border-green-200";
      case "В отпуске":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Недоступен":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Контакты команды
            </CardTitle>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {editedTeamMembers.map((member, index) => (
              <div key={member.id} className="p-3 bg-muted rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs">Роль</Label>
                    <Input
                      value={member.role}
                      onChange={(e) => updateMember(index, 'role', e.target.value)}
                      className="h-8 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">ФИО</Label>
                    <Input
                      value={member.fullName}
                      onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                      className="h-8 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Email</Label>
                    <Input
                      value={member.email}
                      onChange={(e) => updateMember(index, 'email', e.target.value)}
                      className="h-8 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Статус</Label>
                    <Input
                      value={member.status}
                      onChange={(e) => updateMember(index, 'status', e.target.value)}
                      className="h-8 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Контакты команды
            {filteredMembers.length !== teamMembers.length && (
              <Badge variant="secondary" className="ml-2">
                {filteredMembers.length} из {teamMembers.length}
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Редактировать</span>
            <span className="sm:hidden">Изменить</span>
          </Button>
        </div>
        
        {/* Поисковое поле */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по роли, ФИО, логину или email..."
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
                <h3 className="text-sm font-medium">Контакты не найдены</h3>
                <p className="text-xs text-muted-foreground">
                  {searchQuery 
                    ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : "Нет контактов для отображения."
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
                    {/* Роль */}
                    <div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-1 ${getRoleBadgeClassName(member.role)}`}
                      >
                        {member.role}
                      </Badge>
                    </div>
                    
                    {/* Логин */}
                    <div>
                      <p className="font-medium text-sm leading-tight truncate">
                        {member.fullName}
                      </p>
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
                    
                    {/* Статус */}
                    <div>

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
                ? `Найдено: ${filteredMembers.length} из ${teamMembers.length} контактов`
                : `Всего контактов: ${teamMembers.length}`
              }
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span>Последнее обновление: 14 авг 2025</span>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}