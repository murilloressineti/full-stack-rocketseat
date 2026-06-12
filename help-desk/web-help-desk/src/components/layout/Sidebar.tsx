import React from "react";
import { Logo, NavItem, UserMenu } from "../ui";

interface SidebarItem {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

interface SidebarUser {
  name: string;
  email: string;
  avatar?: string;
}

interface SidebarProps {
  role: "admin" | "client" | "technician";
  user: SidebarUser;
  items: SidebarItem[];

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
      <Logo role={role} className="my-6 px-4" />

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
        className="mt-auto py-5 px-4"
      />
    </div>
  );
}
