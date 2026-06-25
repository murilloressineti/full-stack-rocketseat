import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
import { CircleAlert } from "@assets/icons";

export const inputVariants = cva(
  "w-full border-b border-gray-200 bg-transparent px-1 py-2 outline-none transition-all duration-300 placeholder:text-gray-300",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-blue-base caret-blue-base",
        error: "border-feedback-danger caret-feedback-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  leftSection?: React.ReactNode;
}

export default function Input({
  label,
  error,
  className,
  variant,
  leftSection,
  ...props
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className="group flex w-full flex-col">
      {label && (
        <label>
          <Text
            size="xs"
            className={cn(
              "font-bold uppercase transition-colors duration-300",
              hasError
                ? "text-feedback-danger"
                : "text-text-quaternary group-focus-within:text-blue-base",
            )}
          >
            {label}
          </Text>
        </label>
      )}

      <div className="relative">
        {leftSection && (
          <div className="absolute left-1 top-1/2 -translate-y-1/2">
            {leftSection}
          </div>
        )}

        <input
          className={cn(
            inputVariants({
              variant: hasError ? "error" : variant,
            }),
            leftSection && "pl-8",
            className,
          )}
          {...props}
        />
      </div>

      {hasError && (
        <span className="mt-1.5 flex items-center gap-1">
          <Icon svg={CircleAlert} className="fill-feedback-danger" />

          <Text size="xs" className="text-feedback-danger">
            {error}
          </Text>
        </span>
      )}
    </div>
  );
}
