import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Text from "./Text";

export const buttonVariants = cva(
  "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-md antialiased transition-all duration-300 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-500 fill-bg-light text-text-inverted hover:bg-gray-400",
        secondary:
          "bg-gray-200 fill-bg-default text-text-primary hover:bg-gray-300",
        link: "bg-transparent hover:bg-gray-200",
      },
      size: {
        xs: "p-2.5",
        sm: "p-3",
        md: "px-4 py-3.5",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  as: Component = "button",
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return <Text weight="bold">{child}</Text>;
        }

        return child;
      })}
    </Component>
  );
}
