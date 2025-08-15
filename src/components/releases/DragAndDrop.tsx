import { useDrag, useDrop } from "react-dnd";
import type { Delivery, Release, DeliveryStatus, ReleaseStatus } from "./types";

// Drag and Drop Components for Deliveries
export const DraggableDeliveryCard = ({ 
  delivery, 
  children 
}: { 
  delivery: Delivery; 
  children: React.ReactNode 
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'delivery',
    item: { id: delivery.id, delivery },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [delivery]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {children}
    </div>
  );
};

export const DroppableDeliveryColumn = ({ 
  status, 
  children, 
  onDrop 
}: { 
  status: DeliveryStatus; 
  children: React.ReactNode; 
  onDrop: (deliveryId: string, newStatus: DeliveryStatus) => void;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'delivery',
    drop: (item: { id: string; delivery: Delivery }) => {
      onDrop(item.id, status);
    },
    canDrop: (item: { id: string; delivery: Delivery }) => {
      return item.delivery.status !== status;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [status, onDrop]);

  return (
    <div 
      ref={drop} 
      className={`min-h-[200px] rounded-lg transition-colors ${
        isOver && canDrop 
          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' 
          : isOver 
          ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800' 
          : 'border-2 border-transparent'
      }`}
    >
      {children}
    </div>
  );
};

// Drag and Drop Components for Releases
export const DraggableReleaseCard = ({ 
  release, 
  children 
}: { 
  release: Release; 
  children: React.ReactNode 
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'release',
    item: { id: release.id, release },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [release]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {children}
    </div>
  );
};

export const DroppableReleaseColumn = ({ 
  status, 
  children, 
  onDrop 
}: { 
  status: ReleaseStatus; 
  children: React.ReactNode; 
  onDrop: (releaseId: string, newStatus: ReleaseStatus) => void;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'release',
    drop: (item: { id: string; release: Release }) => {
      onDrop(item.id, status);
    },
    canDrop: (item: { id: string; release: Release }) => {
      return item.release.status !== status;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [status, onDrop]);

  return (
    <div 
      ref={drop} 
      className={`min-h-[200px] rounded-lg transition-colors ${
        isOver && canDrop 
          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' 
          : isOver 
          ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800' 
          : 'border-2 border-transparent'
      }`}
    >
      {children}
    </div>
  );
};