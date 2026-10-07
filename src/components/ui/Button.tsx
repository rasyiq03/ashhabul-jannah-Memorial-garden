import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "inverse" | "inverse-outline";
export type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-forest text-cream hover:bg-forest-deep",
  secondary: "border border-forest text-forest hover:bg-forest hover:text-cream",
  quiet: "text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest",
  inverse: "bg-cream text-forest-deep hover:bg-gold-soft",
  "inverse-outline": "border border-cream/60 text-cream hover:border-cream hover:bg-cream hover:text-forest-deep",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-semibold leading-tight transition-colors duration-150",
    "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    variant === "quiet" ? "min-h-11 px-0 text-[0.9375rem]" : sizeClasses[size],
    variantClasses[variant],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleOptions & { href: string; external?: boolean };

/** Untuk tautan tel:, wa.me, dan jangkar di halaman yang tampil sebagai tombol. */
export function ButtonLink({ variant, size, className, external, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
