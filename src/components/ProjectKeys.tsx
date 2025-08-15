import { useState } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

// Simple SVG icons
const Key = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3L22 7l-3-3"/>
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

interface ProjectKeysProps {
  projectKey?: string;
}

export function ProjectKeys({ projectKey = "xorb" }: ProjectKeysProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [keys, setKeys] = useState({
    "etalon_drp": "ТД00000000000",
    "kod_isup": "U123456789",
    "devops_key": projectKey,
    "esis_code": "123456"
  });

  const [editedKeys, setEditedKeys] = useState(keys);

  // Обновляем ключи при изменении projectKey
  React.useEffect(() => {
    const updatedKeys = {
      "etalon_drp": "ТД00000000000",
      "kod_isup": "U123456789",
      "devops_key": projectKey,
      "esis_code": "123456"
    };
    setKeys(updatedKeys);
    setEditedKeys(updatedKeys);
  }, [projectKey]);

  const handleSave = () => {
    // Сохраняем изменения, но ключ DevOps проекта остается системным
    const updatedKeys = {
      ...editedKeys,
      devops_key: projectKey // Принудительно сохраняем системный ключ
    };
    setKeys(updatedKeys);
    setEditedKeys(updatedKeys);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // При отмене возвращаем к исходным значениям с правильным ключом проекта
    const resetKeys = {
      ...keys,
      devops_key: projectKey
    };
    setEditedKeys(resetKeys);
    setIsEditing(false);
  };

  const keyLabels = {
    "etalon_drp": "Эталон ДРП",
    "kod_isup": "Код ИСУП", 
    "devops_key": "Ключ проекта DevOps",
    "esis_code": "Код ИТ-решения в ЕСИС"
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <Key className="h-4 w-4 sm:h-5 sm:w-5" />
            Ключи проекта
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Редактировать
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
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(keyLabels).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label className="text-xs sm:text-sm">{label}</Label>
              {isEditing ? (
                <Input
                  value={editedKeys[key as keyof typeof editedKeys]}
                  onChange={(e) => setEditedKeys(prev => ({
                    ...prev,
                    [key]: e.target.value
                  }))}
                  className="text-xs sm:text-sm"
                  disabled={key === "devops_key"}
                  title={key === "devops_key" ? "Ключ проекта DevOps не может быть изменен" : undefined}
                />
              ) : (
                <div className={`px-3 py-2 bg-muted rounded-md text-xs sm:text-sm font-mono ${key === "devops_key" ? "flex items-center gap-2" : ""}`}>
                  {keys[key as keyof typeof keys]}
                  {key === "devops_key" && (
                    <span className="text-[10px] text-muted-foreground bg-muted-foreground/10 px-1.5 py-0.5 rounded">
                      системный
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}