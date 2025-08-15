import * as React from "react";
import { cn } from "./utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "text-foreground hover:bg-accent hover:text-accent-foreground",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };