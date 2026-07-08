import { useState } from "react";

import { cn } from "@/lib/utils";

import type { AppUser, NavigationItem, UserRole } from "@/types";

import { UserMenu } from "@/components/features/userMenu";
import { Icon, Logo, NavItem } from "@/components/ui";

import { Menu, X } from "@/assets/icons";

interface MobileHeaderProps {
  role: UserRole;
  user: AppUser;
  items: NavigationItem[];

  activePath: string;

  onNavigate?: (path: string) => void;
  onProfile?: () => void;
  onLogout: () => void;
}

export default function MobileHeader({
  role,
  user,
  items,
  activePath,
  onNavigate,
  onProfile,
  onLogout,
}: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-bg-default">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-gray-500"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Icon
              svg={Menu}
              size="md"
              className={cn(
                "absolute fill-text-inverted transition-all duration-300",
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
              )}
            />

            <Icon
              svg={X}
              size="md"
              className={cn(
                "absolute fill-text-inverted transition-all duration-300",
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
              )}
            />
          </button>

          <Logo role={role} />
        </div>

        <UserMenu
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          onProfile={onProfile}
          onLogout={onLogout}
          placement="top-right"
        />
      </div>

      {/* Navegação */}
      {isOpen && (
        <nav className="flex flex-col gap-2 border-t border-gray-500 p-4">
          {items.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              active={activePath === item.href}
              onClick={() => {
                onNavigate?.(item.href);
                setIsOpen(false);
              }}
            />
          ))}
        </nav>
      )}
    </header>
  );
}
