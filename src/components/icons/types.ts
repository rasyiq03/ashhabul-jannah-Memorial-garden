import type { ComponentType } from "react";

/** Cukup longgar untuk ikon lucide maupun ikon SVG buatan sendiri. */
export type IconComponent = ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}>;
