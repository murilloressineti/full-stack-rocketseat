import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Icon from "./Icon";
import Text from "./Text";

import { CircleAlert, CircleCheckBig, CircleHelp, Clock } from "@/assets/icons";

export const badgeStatusVariants = cva(
  "inline-flex h-8 w-8 items-center justify-center rounded-full md:h-auto md:w-fit md:px-2 md:py-1.5",
  {
    variants: {
      variant: {
        open: "bg-feedback-open/20 fill-feedback-open text-feedback-open",
        progress:
          "bg-feedback-progress/20 fill-feedback-progress text-feedback-progress",
        done: "bg-feedback-done/20 fill-feedback-done text-feedback-done",
        danger:
          "bg-feedback-danger/20 fill-feedback-danger text-feedback-danger",
      },
    },
    defaultVariants: {
      variant: "open",
    },
  },
);

interface BadgeStatusProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof badgeStatusVariants> {}

export default function BadgeStatus({
  variant,
  className,
  children,
  ...props
}: BadgeStatusProps) {
  const icons = {
    open: CircleHelp,
    progress: Clock,
    done: CircleCheckBig,
    danger: CircleAlert,
  };

  const currentIcon = icons[variant ?? "open"];

  return (
    <div className={cn(badgeStatusVariants({ variant, className }))} {...props}>
      <div className="flex items-center justify-center gap-1.5">
        <Icon svg={currentIcon} />

        {React.Children.map(children, (child) => {
          if (typeof child === "string") {
            return (
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="hidden md:flex"
              >
                {child}
              </Text>
            );
          }

          return child;
        })}
      </div>
    </div>
  );
}
