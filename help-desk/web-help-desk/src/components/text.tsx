import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("font-sans text-gray-200 leading-[140%]", {
  variants: {
    intent: {
      text: "",
      heading: "",
    },
    size: {
      xxs: "text-[10px] uppercase font-bold",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
    },
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    intent: "text",
    size: "sm",
    weight: "regular",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  intent,
  size,
  weight,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ intent, size, weight, className }),
      ...props,
    },
    children
  );
}
