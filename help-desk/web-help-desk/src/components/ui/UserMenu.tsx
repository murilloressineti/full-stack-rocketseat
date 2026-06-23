import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AvatarCircle, Icon, Text } from "../ui";
import { CircleUser, LogOut } from "@assets/icons";

export const userMenuTriggerVariants = cva(
  "bg-bg-default flex items-center gap-3 transition-all duration-300 cursor-pointer",
  {
    variants: {
      open: {
        true: "",
        false: "",
      },
    },
  },
);

interface UserMenuProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userMenuTriggerVariants> {
  name: string;
  email: string;
  avatar?: string | null;

  onProfile?: () => void;
  onLogout?: () => void;

  placement?: "top-left" | "top-right";
}

export default function UserMenu({
  name,
  email,
  avatar,
  onProfile,
  onLogout,
  placement = "top-left",
  className,
  ...props
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownPosition = {
    "top-left": "bottom-full left-4",
    "top-right": "top-full right-0 mt-2",
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <button
        className={cn(
          userMenuTriggerVariants({ open: isOpen }),
          "group rounded-full transition-colors duration-300 hover:bg-gray-500 md:py-1 md:pr-3",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <AvatarCircle name={name} avatar={avatar}/>

        <div className="hidden md:flex flex-col gap-1 items-start">
          <Text as="span" size="sm" textColor={"inverted"}>
            {name}
          </Text>

          <Text as="span" size="xs" textColor={"tertiary"} className="truncate w-30">
            {email}
          </Text>
        </div>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute rounded-lg bg-gray-500 py-5 px-4 shadow-lg",
            dropdownPosition[placement],
          )}
        >
          <Text
            size="xs"
            weight="bold"
            textColor={"tertiary"}
            className="mb-4 uppercase"
          >
            Opções
          </Text>

          <div className="flex flex-col">
            <button
              onClick={onProfile}
              className="
                flex items-center gap-2 rounded-md p-2 transition-all duration-300 fill-gray-100 hover:bg-gray-600 cursor-pointer"
            >
              <Icon svg={CircleUser} size={"md"} />

              <Text size={"md"} weight={"bold"} textColor={"inverted"}>
                Perfil
              </Text>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-md p-2 transition-all duration-300 text-feedback-danger fill-feedback-danger hover:bg-gray-600 cursor-pointer"
            >
              <Icon svg={LogOut} size={"md"} />

              <Text size={"md"} weight={"bold"}>
                Sair
              </Text>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Implementar saida do UserMenu clicando fora do menu. 