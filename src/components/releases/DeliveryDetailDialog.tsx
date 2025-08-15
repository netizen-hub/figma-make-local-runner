import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Package } from "./icons";
import { getReleaseStatusColor } from "./utils";
import type { Delivery } from "./types";

interface DeliveryDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: Delivery | null;
  updateEnvironmentApproval: (
    deliveryId: string, 
    environment: 'test' | 'preProd' | 'prod', 
    role: 'projectManager' | 'securityExpert', 
    approved: boolean
  ) => void;
}

export function DeliveryDetailDialog({
  isOpen,
  onOpenChange,
  delivery,
  updateEnvironmentApproval
}: DeliveryDetailDialogProps) {
  if (!delivery) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {delivery.title}
          </DialogTitle>
          <DialogDescription>
            Подробная информация о поставке {delivery.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Компонент</Label>
                <p className="text-sm text-muted-foreground">{delivery.component}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Версия</Label>
                <p className="text-sm text-muted-foreground">{delivery.version}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Исполнитель</Label>
                <p className="text-sm text-muted-foreground">{delivery.assignee}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Статус</Label>
                <Badge className={`ml-2 ${getReleaseStatusColor(delivery.status)}`}>
                  {delivery.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Приоритет</Label>
                <Badge 
                  className={`ml-2 ${
                    delivery.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    delivery.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {delivery.priority}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Срок выполнения</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(delivery.dueDate).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Описание</Label>
            <p className="text-sm text-muted-foreground mt-1">{delivery.description}</p>
          </div>

          {/* Tags */}
          {delivery.tags.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Теги</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {delivery.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Environment Approvals */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Согласования по средам</Label>
            <div className="space-y-4">
              {(['test', 'preProd', 'prod'] as const).map((env) => (
                <Card key={env} className="p-4">
                  <h4 className="font-medium mb-3">
                    {env === 'test' ? 'TEST' : env === 'preProd' ? 'PRE-PROD' : 'PROD'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Руководитель проекта</Label>
                      <Checkbox
                        checked={delivery.environmentApprovals[env].projectManager}
                        onCheckedChange={(checked) => 
                          updateEnvironmentApproval(delivery.id, env, 'projectManager', checked as boolean)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Эксперт ИБ</Label>
                      <Checkbox
                        checked={delivery.environmentApprovals[env].securityExpert}
                        onCheckedChange={(checked) => 
                          updateEnvironmentApproval(delivery.id, env, 'securityExpert', checked as boolean)
                        }
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}