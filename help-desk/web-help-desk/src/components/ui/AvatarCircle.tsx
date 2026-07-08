import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Text from "./Text";

export const avatarCircleVariants = cva(
  "flex items-center justify-center overflow-hidden rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        blueBase:
          "bg-blue-base group-hover:bg-blue-light group-hover:scale-105",
        blueDark: "bg-blue-dark",
      },
      size: {
        xs: "h-6 w-6",
        sm: "h-7 w-7",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "blueBase",
      size: "md",
    },
  },
);

interface AvatarCircleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarCircleVariants> {
  name: string;
  avatar?: string | null;
}

export default function AvatarCircle({
  name,
  avatar,
  variant,
  size,
  className,
  ...props
}: AvatarCircleProps) {
  // Retorna as iniciais do nome para exibição quando não houver avatar
  function getInitials(name: string) {
    if (!name) return "?";

    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  const textSize = size === "xs" || size === "sm" ? "xs" : "sm";

  return (
    <div
      className={cn(
        avatarCircleVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {avatar?.trim() ? (
        <img
          src={avatar}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <Text as="span" size={textSize} textColor="inverted">
          {getInitials(name)}
        </Text>
      )}
    </div>
  );
}
