import React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon, Text } from "../ui";
import { CircleAlert } from "@assets/icons";

import { inputVariants } from "./Input";

interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className,
  variant,
  ...props
}: TextareaProps) {
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

      <textarea
        className={cn(
          inputVariants({
            variant: hasError ? "error" : variant,
          }),
          "min-h-36 resize-none",
          className,
        )}
        {...props}
      />

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
