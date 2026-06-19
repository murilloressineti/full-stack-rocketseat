import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const textVariants = cva("font-sans leading-snug", {
  variants: {
    size: {
      xxs: "text-[10px] uppercase",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
      xl: "text-2xl",
    },
    textColor: {
      default: "",
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      inverted: "text-text-inverted",
      blueBase: "text-blue-base",
      blueDark: "text-blue-dark",
      blueLight: "text-blue-light",
      danger: "text-feedback-danger",
      open: "text-feedback-open",
      progress: "text-feedback-progress",
      done: "text-feedback-done",
    },
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    textColor: "default",
    size: "sm",
    weight: "regular",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType; // Torna o componente flexível para renderizar como qualquer elemento HTML ou componente React (ex: as={Link}, as="h1", etc.)
}

export default function Text({
  as: Component = "p",
  size,
  textColor,
  weight,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, textColor, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
