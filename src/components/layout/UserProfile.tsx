import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Иконка пользователя
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Моковые данные пользователя
const currentUser = {
  fullName: "Иванов Иван Иванович",
  department: "Департамент разработки",
  position: "DevOps-инженер",
  adGroups: [
    "XORB_DevOps_Engineers",
    "XORB_Platform_Users", 
    "IT_Infrastructure_Team",
    "First_Initiative_Contributors",
    "BEST_Analytics_Developers"
  ]
};

export const UserProfile: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0 hover:bg-accent transition-all duration-200 border-2 border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10"
        title="Профиль пользователя"
        onClick={() => setOpen(!open)}
      >
        <UserIcon className="h-5 w-5 text-primary" />
      </Button>
      
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />
          
          {/* Profile dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 z-50 rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentUser.fullName}</p>
                  <p className="text-sm text-muted-foreground truncate">{currentUser.position}</p>
                  <p className="text-sm text-muted-foreground truncate">{currentUser.department}</p>
                </div>
              </div>
              
              <div className="h-px bg-border mb-4" />
              
              <div>
                <h4 className="font-medium mb-3 text-sm">Группы Active Directory</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {currentUser.adGroups.map((group, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="text-xs font-mono w-full justify-start"
                    >
                      <span className="truncate">{group}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t bg-muted/30">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm h-10 rounded-none rounded-b-md text-muted-foreground hover:text-foreground"
                onClick={() => {
                  // Здесь будет логика выхода из системы
                  console.log("Выход из системы");
                  setOpen(false);
                }}
              >
                Выйти из системы
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};