import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

import { cva } from "class-variance-authority";

import { CircleUser, LogOut } from "@/assets/icons";
import { AvatarCircle, Icon, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

export const userMenuTriggerVariants = cva(
  "bg-bg-default flex items-center gap-3 transition-all duration-300 cursor-pointer",
);

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  email: string;
  avatar?: string | null;

  onProfile?: () => void;
  onLogout?: () => void;

  placement?: "top-right" | "right";
}

export default function UserMenu({
  name,
  email,
  avatar,
  onProfile,
  onLogout,
  placement = "right",
  className,
  ...props
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dropdownPosition = {
    "top-right": "top-full right-0 mt-2",
    right: "left-full bottom-2 ml-2",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleProfile() {
    setIsOpen(false);
    onProfile?.();
  }

  function handleLogout() {
    setIsOpen(false);
    onLogout?.();
  }

  return (
    <div className={cn("relative", className)} ref={menuRef} {...props}>
      <button
        type="button"
        className={cn(
          userMenuTriggerVariants(),
          "group rounded-full transition-colors duration-300 hover:bg-gray-500 md:py-1 md:pr-3",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AvatarCircle name={name} avatar={avatar} />

        <div className="hidden flex-col items-start gap-1 md:flex">
          <Text
            as="span"
            size="sm"
            textColor="inverted"
            className="w-30 truncate text-start"
          >
            {name}
          </Text>

          <Text
            as="span"
            size="xs"
            textColor="tertiary"
            className="w-30 truncate text-start"
          >
            {email}
          </Text>
        </div>
      </button>

      <div
        className={cn(
          "absolute z-50 rounded-lg bg-gray-500 px-4 py-5 shadow-lg md:w-50",
          "origin-bottom-left transition-all duration-200 ease-out",
          isOpen
            ? "visible scale-100 opacity-100 pointer-events-auto"
            : "invisible scale-95 opacity-0 pointer-events-none",
          dropdownPosition[placement],
        )}
      >
        <Text
          size="xs"
          weight="bold"
          textColor="tertiary"
          className="mb-4 uppercase"
        >
          Opções
        </Text>

        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleProfile}
            className="flex cursor-pointer items-center gap-2 rounded-md fill-gray-100 p-2 transition-all duration-300 hover:bg-gray-600"
          >
            <Icon svg={CircleUser} size="md" />

            <Text size="md" weight="bold" textColor="inverted">
              Perfil
            </Text>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-md fill-feedback-danger p-2 text-feedback-danger transition-all duration-300 hover:bg-gray-600"
          >
            <Icon svg={LogOut} size="md" />

            <Text size="md" weight="bold">
              Sair
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
}
