import React from "react";

import { cn } from "@/lib/utils";

import type { UserRole } from "@/types";

import Text from "./Text";

import { LogoDark, LogoLight } from "@/assets/images";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: UserRole;
  variant?: "default" | "full";
}

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  client: "Cliente",
  technician: "Técnico",
};

export default function Logo({
  role,
  variant = "default",
  className,
  ...props
}: LogoProps) {
  const logoSrc = variant === "default" ? LogoLight : LogoDark;
  const titleColor = variant === "full" ? "blueDark" : "inverted";
  const titleSize = variant === "full" ? "xl" : "lg";

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <img src={logoSrc} alt="HelpDesk" className="h-10 w-10" />

      <div className="flex flex-col gap-1">
        <Text as="span" size={titleSize} weight="bold" textColor={titleColor}>
          HelpDesk
        </Text>

        {variant === "default" && role && (
          <Text
            as="span"
            size="xs"
            weight="bold"
            textColor="blueLight"
            className="uppercase tracking-wider"
          >
            {roleLabels[role]}
          </Text>
        )}
      </div>
    </div>
  );
}
