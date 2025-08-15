import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Rocket, Tag, Calendar, Clock, Info, Package, FileText } from "./icons";
import { getReleaseStatusColor, getStatusColor } from "./utils";
import type { Release, Delivery } from "./types";

interface ReleaseDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  release: Release | null;
  deliveries: Delivery[];
}

export function ReleaseDetailDialog({
  isOpen,
  onOpenChange,
  release,
  deliveries
}: ReleaseDetailDialogProps) {
  if (!release) return null;

  const getIncludedDeliveries = (release: Release) => {
    return deliveries.filter(delivery => release.deliveryIds.includes(delivery.id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            {release.title}
          </DialogTitle>
          <DialogDescription>
            Подробная информация о релизе {release.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  Версия
                </Label>
                <p className="text-sm text-muted-foreground font-mono">{release.version}</p>
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Дата релиза
                </Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(release.releaseDate).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Создан
                </Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(release.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Статус
                </Label>
                <Badge className={`ml-0 mt-1 ${getReleaseStatusColor(release.status)}`}>
                  {release.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Количество поставок
                </Label>
                <p className="text-sm text-muted-foreground">
                  {release.deliveryIds.length}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <Label className="text-sm font-medium">Описание</Label>
            <p className="text-sm text-muted-foreground mt-1">{release.description}</p>
          </div>

          <Separator />

          {/* Release Notes */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Примечания к релизу
            </Label>
            <Card className="mt-2 p-4 bg-muted/20">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                {release.releaseNotes}
              </pre>
            </Card>
          </div>

          <Separator />

          {/* Included Deliveries */}
          <div>
            <Label className="text-sm font-medium mb-3 block flex items-center gap-1">
              <Package className="h-3 w-3" />
              Включенные поставки ({getIncludedDeliveries(release).length})
            </Label>
            <div className="space-y-3">
              {getIncludedDeliveries(release).length === 0 ? (
                <p className="text-sm text-muted-foreground">Поставки не включены в релиз</p>
              ) : (
                getIncludedDeliveries(release).map((delivery) => (
                  <Card key={delivery.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{delivery.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {delivery.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{delivery.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{delivery.component} v{delivery.version}</span>
                          <span>• {delivery.assignee}</span>
                          <span>• {delivery.priority} приоритет</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
            <Button variant="secondary">
              Редактировать
            </Button>
            <Button>
              Выполнить релиз
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}