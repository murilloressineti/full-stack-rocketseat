import type { AppUser, NavigationItem, UserRole } from "@/types";

import { UserMenu } from "@/components/features/userMenu";
import { Logo, NavItem } from "@/components/ui";

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
    <div className="flex h-screen w-50 shrink-0 flex-col bg-bg-default">
      <Logo role={role} className="pt-9 pb-6 px-4" />

      <nav className="flex h-full flex-col gap-2 border-y border-gray-500 px-4 pt-5">
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
