import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const iconVariants = cva(
  "transition-all duration-300 ease-in-out shrink-0",
  {
    variants: {
      animate: {
        none: "",
      },
      size: {
        xs: "w-2 h2",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-8 h-8",
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
