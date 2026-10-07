import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  title: string;
  lead?: ReactNode;
  level?: "h2" | "h3";
  align?: "start" | "center";
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  title,
  lead,
  level = "h2",
  align = "start",
  inverse = false,
  className,
}: SectionHeadingProps) {
  const Heading = level;
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <Heading
        id={id}
        className={cn(
          "font-serif",
          level === "h2" ? "text-4xl leading-[1.1] md:text-5xl" : "text-3xl leading-tight md:text-4xl",
          inverse ? "text-cream" : "text-forest",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-prose text-lg leading-relaxed",
            align === "center" && "mx-auto",
            inverse ? "text-sage-200" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
