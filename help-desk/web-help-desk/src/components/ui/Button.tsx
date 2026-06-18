import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Text from "./Text";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all duration-300 cursor-pointer group antialiased rounded-md gap-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-500 text-text-inverted fill-bg-light hover:bg-gray-400",
        secondary:
          "bg-gray-200 text-text-primary fill-bg-default hover:bg-gray-300",
        link: "bg-transparent hover:bg-gray-200",
      },
      size: {
        xs: "p-2.5",
        sm: "p-3",
        md: "py-3.5 px-4",
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
          return <Text weight={"bold"}>{child}</Text>;
        }
        return child;
      })}
    </Component>
  );
}
