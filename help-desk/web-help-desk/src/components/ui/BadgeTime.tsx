import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Icon from "./Icon";
import Text from "./Text";

import { X } from "@/assets/icons";

export const badgeTimeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-full px-2 py-1.5 transition-colors",
  {
    variants: {
      variant: {
        available:
          "cursor-pointer border border-gray-300 bg-transparent text-gray-500 hover:bg-gray-200 active:scale-95",
        selected:
          "cursor-pointer bg-blue-base fill-text-inverted text-text-inverted active:scale-95",
        disabled:
          "pointer-events-none border border-gray-200 bg-transparent text-gray-300",
      },
    },
    defaultVariants: {
      variant: "available",
    },
  },
);

interface BadgeTimeProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeTimeVariants> {}

export default function BadgeTime({
  variant,
  className,
  children,
  ...props
}: BadgeTimeProps) {
  return (
    <button
      className={cn(badgeTimeVariants({ variant }), "group", className)}
      {...props}
    >
      <div className="flex items-center justify-center gap-1.5">
        <Text as="span" size="xs" weight="bold">
          {children}
        </Text>

        {variant === "selected" && (
          <Icon
            svg={X}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        )}
      </div>
    </button>
  );
}
