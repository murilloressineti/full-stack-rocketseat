import { Logo, NavItem } from "../ui";
import { UserMenu } from "@components/features/UserMenu";
import type { AppUser, UserRole, NavigationItem } from "@/types";

interface SidebarProps {
  role: UserRole;
  user: AppUser;
  items: NavigationItem[];

  activePath: string;

  onNavigate?: (path: string) => void;

  onProfile?: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  role,
  user,
  items,
  activePath,
  onNavigate,
  onProfile,
  onLogout,
}: SidebarProps) {
  return (
    <div className="bg-bg-default flex h-screen flex-col w-50 ">
      <Logo role={role} className="pt-9 pb-6 px-4" />

      <nav className="pt-5 flex flex-col gap-2 h-full border-t border-b border-gray-500 px-4">
        {items.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            icon={item.icon}
            active={activePath === item.href}
            onClick={() => onNavigate?.(item.href)}
          />
        ))}
      </nav>

      <UserMenu
        name={user.name}
        email={user.email}
        avatar={user.avatar}
        onProfile={onProfile}
        onLogout={onLogout}
        placement="right"
        className="mt-auto py-5 px-4"
      />
    </div>
  );
}
