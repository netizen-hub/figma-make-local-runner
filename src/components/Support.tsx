import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";


// Simple SVG icons
const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const Bot = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="m12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

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



const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m22 2-7 20-4-9-9-4z"/>
    <path d="M22 2 11 13"/>
  </svg>
);



const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21 5,3"/>
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);



const HelpCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9,9a3,3 0 1,1 6,0c0,2 -3,3 -3,3"/>
    <path d="m12,17.02 .01,0"/>
  </svg>
);

export function Support() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot" as const,
      message: "Привет! Я ИИ-помощник DevOps Platform. Как дела? Чем могу помочь?",
      timestamp: new Date().toLocaleTimeString(),
      isTyping: false
    }
  ]);
  const [chatInput, setChatInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const helpResources = [
    {
      title: "Как создать задачу",
      description: "Пошаговое руководство по созданию задач в системе",
      icon: <FileText className="h-5 w-5" />,
      link: "/docs/create-task",
      type: "guide",
      readTime: "5 мин",
      isPopular: true
    },
    {
      title: "Куда обращаться за помощью",
      description: "Контакты службы поддержки и эскалационная матрица",
      icon: <MessageSquare className="h-5 w-5" />,
      link: "/docs/support-contacts",
      type: "guide",
      readTime: "3 мин",
      isPopular: false
    },
    {
      title: "База знаний DevOps",
      description: "Документация по всем процессам и инструментам",
      icon: <BookOpen className="h-5 w-5" />,
      link: "https://confluence.company.ru/devops",
      type: "external",
      readTime: "10+ мин",
      isPopular: false
    },
    {
      title: "Митапы",
      description: "События, встречи и обучающие мероприятия команды",
      icon: <Play className="h-5 w-5" />,
      link: "/docs/meetups",
      type: "events",
      readTime: "2-3 ч",
      isPopular: true
    }
  ];



  const quickQuestions = [
    { text: "Как создать пайплайн?", icon: <HelpCircle className="h-3 w-3" /> },
    { text: "Настройка мониторинга", icon: <HelpCircle className="h-3 w-3" /> },
    { text: "Проблемы с развертыванием", icon: <MessageCircle className="h-3 w-3" /> }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user" as const,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      isTyping: false
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: chatMessages.length + 2,
        type: "bot" as const,
        message: getBotResponse(chatInput),
        timestamp: new Date().toLocaleTimeString(),
        isTyping: false
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('задач') || lowerInput.includes('тикет')) {
      return "Для создания задачи перейдите в GitLab Issues или воспользуйтесь шаблоном в Confluence. Нужна помощь с конкретным процессом?";
    } else if (lowerInput.includes('пайплайн') || lowerInput.includes('ci/cd')) {
      return "Для настройки пайплайнов используйте .gitlab-ci.yml файлы. У нас есть готовые шаблоны для разных типов проектов. Какой тип проекта вас интересует?";
    } else if (lowerInput.includes('мониторинг')) {
      return "Система мониторинга настраивается через Grafana дашборды. Могу помочь с базовой конфигурацией или конкретными метриками?";
    }
    return "Понял ваш вопрос. Рекомендую ознакомиться с базой знаний или обратиться к специалисту поддержки для детальной помощи. Что конкретно вас интересует?";
  };



  return (
    <div className="space-y-8">
      {/* Help Resources */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl">Инструкции и помощь</h3>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Быстрые ответы на часто задаваемые вопросы
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpResources.map((resource, index) => (
              <div 
                key={index} 
                className="group relative p-5 border border-border/50 rounded-xl hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer bg-card hover:bg-accent/30"
              >
                {resource.isPopular && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                    Популярное
                  </Badge>
                )}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 group-hover:bg-primary/10 rounded-lg transition-colors duration-200">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium group-hover:text-primary transition-colors duration-200">
                        {resource.title}
                      </h4>
                      {resource.type === "external" && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {resource.readTime}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-primary hover:text-primary/80">
                        Открыть →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chatbot */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
              <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl">ИИ Помощник</h3>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Beta
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Задайте вопрос о DevOps процессах и получите быстрый ответ
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-96">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                    : 'bg-card border border-border/50 rounded-bl-md shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
                {msg.type === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      Я
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md shadow-sm px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-border" />
          
          {/* Quick Actions */}
          <div className="p-4 bg-muted/5">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm" 
                  onClick={() => setChatInput(question.text)}
                  className="text-xs h-7 gap-1 hover:bg-accent"
                >
                  {question.icon}
                  {question.text}
                </Button>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Спросите что-нибудь о DevOps..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-lg"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm" 
                disabled={!chatInput.trim() || isTyping}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Contacts */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <MessageCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl">Контакты поддержки</h3>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Получите помощь от команды технической поддержки
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 border border-border/50 rounded-lg bg-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Техническая поддержка</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Помощь с техническими вопросами
                  </p>
                  <a 
                    href="mailto:support@devops.company.ru" 
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-3 w-3" />
                    support@devops.company.ru
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Время работы</h4>
                  <div className="text-sm space-y-1">
                    <p>Пн-Чт: 9:00 - 18:00 (МСК)</p>
                    <p>Пт: 9:00 - 16:45 (МСК)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}