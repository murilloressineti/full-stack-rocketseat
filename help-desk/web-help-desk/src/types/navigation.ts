import type { SVGProps, FC } from "react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}
