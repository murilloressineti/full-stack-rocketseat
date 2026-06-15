import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { Icon, Text } from "../ui";
import { LogoLight, LogoDark } from "@assets/images";

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
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {variant === "default" ? (
        <Icon svg={LogoLight} className="h-12 w-12" />
      ) : (
        <Icon svg={LogoDark} className="h-12 w-12" />
      )}

      <div className="flex flex-col gap-1">
        <Text
          as="span"
          size={variant === "full" ? "xl" : "lg"}
          weight="bold"
          textColor={variant === "full" ? "blueDark" : "inverted"}
        >
          HelpDesk
        </Text>

        {variant === "default" && role && (
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
