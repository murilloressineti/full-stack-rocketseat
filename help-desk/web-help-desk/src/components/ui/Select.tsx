import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
import { CircleAlert, ChevronDown } from "@assets/icons";

export const selectVariants = cva(
  "w-full appearance-none border-b border-gray-200 bg-transparent px-1 py-2 outline-none transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-blue-base",
        error: "border-feedback-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SelectProps
  extends
    React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
}

export default function Select({
  label,
  error,
  className,
  variant,
  children,
  ...props
}: SelectProps) {
  const hasError = Boolean(error);

  return (
    <div className="group flex w-full flex-col">
      {label && (
        <label>
          <Text
            size="xs"
            weight={"bold"}
            className={cn(
              "uppercase transition-colors duration-300",
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
        <select
          className={cn(
            selectVariants({
              variant: hasError ? "error" : variant,
            }),
            className,
          )}
          {...props}
        >
          {children}
        </select>

        <Icon
          svg={ChevronDown}
          className={cn(
            "pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:rotate-180",
            hasError
              ? "fill-feedback-danger"
              : "fill-gray-400 group-focus-within:fill-blue-base",
          )}
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
