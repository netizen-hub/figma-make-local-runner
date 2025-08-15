"use client";

import * as React from "react";
import { cn } from "./utils";

interface TooltipProviderProps {
  delayDuration?: number;
  children: React.ReactNode;
}

function TooltipProvider({
  delayDuration = 0,
  children,
  ...props
}: TooltipProviderProps) {
  return <div data-slot="tooltip-provider" {...props}>{children}</div>;
}

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextType | null>(null);

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Tooltip({ children, open: controlledOpen, onOpenChange }: TooltipProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  return (
    <TooltipProvider>
      <TooltipContext.Provider value={{ open, setOpen }}>
        <div data-slot="tooltip" className="relative inline-block">
          {children}
        </div>
      </TooltipContext.Provider>
    </TooltipProvider>
  );
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

function TooltipTrigger({ asChild = false, children, ...props }: TooltipTriggerProps) {
  const context = React.useContext(TooltipContext);
  
  const handleMouseEnter = () => {
    context?.setOpen(true);
  };

  const handleMouseLeave = () => {
    context?.setOpen(false);
  };

  const handleFocus = () => {
    context?.setOpen(true);
  };

  const handleBlur = () => {
    context?.setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "data-slot": "tooltip-trigger"
    });
  }

  return (
    <div
      data-slot="tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </div>
  );
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  hidden?: boolean;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 0,
  align = "center",
  children,
  hidden = false,
  ...props
}: TooltipContentProps) {
  const context = React.useContext(TooltipContext);

  if (!context?.open || hidden) return null;

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const alignClasses = {
    start: side === "top" || side === "bottom" ? "left-0 translate-x-0" : "top-0 translate-y-0",
    center: "",
    end: side === "top" || side === "bottom" ? "right-0 translate-x-0" : "bottom-0 translate-y-0",
  };

  return (
    <div
      data-slot="tooltip-content"
      className={cn(
        "absolute z-50 w-fit rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        sideClasses[side],
        align !== "center" && alignClasses[align],
        className,
      )}
      style={{
        [side === "top" || side === "bottom" ? "marginBottom" : "marginRight"]: sideOffset,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };