"use client";

import * as React from "react";

// Simple SVG icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

import { cn } from "./utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
  className,
  onCheckedChange,
  onChange,
  checked,
  id,
  ...props
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = React.useState(!!checked);
  
  React.useEffect(() => {
    setInternalChecked(!!checked);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setInternalChecked(isChecked);
    
    if (onChange) {
      onChange(e);
    }
    if (onCheckedChange) {
      onCheckedChange(isChecked);
    }
  };

  const handleDivClick = () => {
    if (inputRef.current && !props.disabled) {
      inputRef.current.click();
    }
  };

  const isChecked = checked !== undefined ? checked : internalChecked;

  return (
    <div className="relative inline-flex items-center">
      <input
        ref={inputRef}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
        id={id}
        {...props}
      />
      <div
        className={cn(
          "peer border bg-input-background dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-xs transition-all outline-none cursor-pointer flex items-center justify-center",
          "hover:border-ring",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isChecked && "bg-primary text-primary-foreground border-primary",
          props.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        onClick={handleDivClick}
        role="checkbox"
        aria-checked={isChecked}
      >
        {isChecked && (
          <CheckIcon className="size-3.5" />
        )}
      </div>
    </div>
  );
}

export { Checkbox };