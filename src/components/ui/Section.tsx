import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "cream" | "sand" | "sage" | "forest";

const toneClasses: Record<SectionTone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  sage: "bg-sage-soft text-ink",
  forest: "on-dark bg-forest text-cream",
};

interface SectionProps {
  id: string;
  labelledBy: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, tone = "cream", className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-28", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
