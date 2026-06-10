import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";

export const navItemVariants = cva(
  "flex items-center w-full gap-3 rounded-md p-3 transition-all duration-300 ease-out cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-blue-base text-text-inverted fill-gray-100 hover:translate-x-1",
        false:
          "bg-transparent text-text-tertiary fill-gray-300 hover:bg-gray-500 hover:text-text-inverted hover:fill-text-inverted hover:translate-x-1",
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
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}

export default function NavItem({
  label,
  icon,
  active,
  className,
  ...props
}: NavItemProps) {
  return (
    <button className={cn(navItemVariants({ active }), className)} {...props}>
      <Icon svg={icon} size={"md"} />
      <Text as={"span"} size={"sm"} weight={active ? "bold" : "regular"}>
        {label}
      </Text>
    </button>
  );
}
