import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
import { X } from "@assets/icons";

export const badgeTimeVariants = cva(
  "p-1.5 px-2 rounded-full w-fit inline-flex items-center justify-center transition-colors",
  {
    variants: {
      variant: {
        available:
          "bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-200 cursor-pointer active:scale-95",
        selected:
          "bg-blue-base text-text-inverted fill-text-inverted cursor-pointer active:scale-95",
        disabled: "bg-transparent border border-gray-200 text-gray-300 pointer-events-none",
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
            className=" transition-transform duration-200 group-hover:scale-110"
          />
        )}
      </div>
    </button>
  );
}
