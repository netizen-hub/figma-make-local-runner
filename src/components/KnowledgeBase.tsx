import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Simple SVG icons
const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
);

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export function KnowledgeBase() {
  const [isEditing, setIsEditing] = useState(false);
  
  const [knowledgeBaseLinks, setKnowledgeBaseLinks] = useState([
    {
      title: "Техническая документация",
      description: "Архитектура, развертывание, настройка",
      url: "https://confluence.company.ru/devops-project/tech-docs",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Руководство пользователя",
      description: "Инструкции по использованию системы",
      url: "https://confluence.company.ru/devops-project/user-guide",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: "DevOps процессы",
      description: "CI/CD, развертывание, мониторинг",
      url: "https://confluence.company.ru/devops-project/processes",
      icon: <Zap className="h-4 w-4" />
    },
    {
      title: "Безопасность",
      description: "Политики безопасности и соответствие",
      url: "https://confluence.company.ru/devops-project/security",
      icon: <Shield className="h-4 w-4" />
    },
    {
      title: "Конфигурация",
      description: "Настройки окружений и сервисов",
      url: "https://confluence.company.ru/devops-project/config",
      icon: <Settings className="h-4 w-4" />
    },
    {
      title: "FAQ и решение проблем",
      description: "Часто задаваемые вопросы и устранение неполадок",
      url: "https://confluence.company.ru/devops-project/troubleshooting",
      icon: <BookOpen className="h-4 w-4" />
    }
  ]);

  const [editedLinks, setEditedLinks] = useState(knowledgeBaseLinks);

  const handleSave = () => {
    setKnowledgeBaseLinks(editedLinks);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLinks(knowledgeBaseLinks);
    setIsEditing(false);
  };

  const updateLink = (index: number, field: string, value: string) => {
    setEditedLinks(prev => 
      prev.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            База знаний (Confluence)
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Редактировать
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Отмена
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(isEditing ? editedLinks : knowledgeBaseLinks).map((link, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-muted transition-colors">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Заголовок</Label>
                    <Input
                      value={link.title}
                      onChange={(e) => updateLink(index, 'title', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Описание</Label>
                    <Input
                      value={link.description}
                      onChange={(e) => updateLink(index, 'description', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{link.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}