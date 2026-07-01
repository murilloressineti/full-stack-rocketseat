import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon, Logo, NavItem } from "../ui";
import { UserMenu } from "@components/features/UserMenu";
import { Menu, X } from "@/assets/icons";
import type { AppUser, UserRole, NavigationItem } from "@/types";

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
    <header className="bg-bg-default w-full">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="w-10 h-10 bg-gray-500 rounded-md cursor-pointer flex items-center justify-center"
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
