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
      quaternary: "text-text-quaternary",
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
    size: "sm",
    textColor: "default",
    weight: "regular",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  // Permite renderizar o componente como qualquer elemento HTML
  // Ex.: <Text as="h1"> ou <Text as="span">
  as?: React.ElementType;
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
      className={cn(
        textVariants({
          size,
          textColor,
          weight,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
