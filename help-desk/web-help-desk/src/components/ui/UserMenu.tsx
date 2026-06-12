import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
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
  avatar?: string;

  onProfile?: () => void;
  onLogout?: () => void;
}

export default function UserMenu({
  name,
  email,
  avatar,
  onProfile,
  onLogout,
  className,
  ...props
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function getInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  return (
    <div className={cn("relative", className)} {...props}>
      <button
        className={cn(userMenuTriggerVariants({ open: isOpen }))}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-base">
          <Text as="span" size="sm" textColor={"inverted"}>
            {getInitials(name)}
          </Text>
        </div>

        <div className="hidden md:flex flex-col gap-1 items-start">
          <Text as="span" size="sm" textColor={"inverted"}>
            {name}
          </Text>

          <Text as="span" size="xs" textColor={"tertiary"}>
            {email}
          </Text>
        </div>
      </button>

      {isOpen && (
        <div
          className="
            absolute md:bottom-full left-4 rounded-lg bg-gray-500 py-5 px-4 shadow-lg"
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
              className="flex items-center gap-2 rounded-md p-2 transition-allduration-300 text-feedback-danger fill-feedback-danger hover:bg-gray-600 cursor-pointer"
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
