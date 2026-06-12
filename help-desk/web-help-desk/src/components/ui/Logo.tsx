import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
import { LogoLight } from "@assets/images";

type UserRole = "admin" | "client" | "technician";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: UserRole;
}

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  client: "Cliente",
  technician: "Técnico",
};

export default function Logo({ role, className, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
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

//<div className={cn("relative", className)} {...props}>