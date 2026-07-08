import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const iconVariants = cva(
  "shrink-0 transition-all duration-300 ease-in-out",
  {
    variants: {
      animate: {
        none: "",
        spin: "animate-spin",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
      size: {
        xxs: "h-2 w-2",
        xs: "h-3.5 w-3.5",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-8 w-8",
      },
    },
    defaultVariants: {
      animate: "none",
      size: "sm",
    },
  },
);

interface IconProps
  extends React.SVGProps<SVGElement>, VariantProps<typeof iconVariants> {
  svg: React.ElementType;
}

export default function Icon({
  svg: SvgComponent,
  animate,
  size,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={cn(iconVariants({ animate, size, className }))}
      {...props}
    />
  );
}
