import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Icon from "./Icon";
import Text from "./Text";

export const navItemVariants = cva(
  "flex w-full cursor-pointer items-center gap-3 rounded-md p-3 transition-all duration-300 ease-out",
  {
    variants: {
      active: {
        true: "bg-blue-base fill-gray-100 text-text-inverted hover:translate-x-1",
        false:
          "bg-transparent fill-gray-300 text-text-tertiary hover:translate-x-1 hover:bg-gray-500 hover:fill-text-inverted hover:text-text-inverted",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

interface NavItemProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

export default function NavItem({
  label,
  icon,
  active,
  className,
  ...props
}: NavItemProps) {
  const textWeight = active ? "bold" : "regular";

  return (
    <button className={cn(navItemVariants({ active }), className)} {...props}>
      <Icon svg={icon} size="md" />

      <Text as="span" size="sm" weight={textWeight}>
        {label}
      </Text>
    </button>
  );
}
