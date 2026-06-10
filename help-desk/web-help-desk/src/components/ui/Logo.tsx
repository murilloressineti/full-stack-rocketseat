import React from "react";
import { Icon, Text } from "../ui";
import { LogoLight } from "@assets/images";

type UserRole = "admin" | "client" | "technician";

interface LogoProps {
  role?: UserRole;
}

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  client: "Cliente",
  technician: "Técnico",
};

export default function Logo({ role }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon svg={LogoLight} className="h-12 w-12" />

      <div className="flex flex-col gap-1">
        <Text as="span" size="lg" weight="bold" textColor="inverted">
          HelpDesk
        </Text>

        {role && (
          <Text
            as="span"
            size="xs"
            weight="bold"
            className="uppercase tracking-wider"
            textColor="blueLight"
          >
            {roleLabels[role]}
          </Text>
        )}
      </div>
    </div>
  );
}
