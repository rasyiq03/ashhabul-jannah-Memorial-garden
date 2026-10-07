import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Lengkung runcing mihrab dalam kotak 100 × 130; diregangkan mengikuti ukuran isi. */
export const ARCH_PATH = "M0 130V50C0 25 21 10 50 0c29 10 50 25 50 50v80Z";

interface ArchFrameProps {
  children: ReactNode;
  className?: string;
  /** Kelas warna garis lengkung, misalnya text-gold. */
  strokeClassName?: string;
  /** Kelas warna isian lengkung, misalnya text-forest-deep. Kosongkan untuk tanpa isian. */
  fillClassName?: string;
}

export function ArchFrame({ children, className, strokeClassName = "text-gold", fillClassName }: ArchFrameProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="0 0 100 130"
        preserveAspectRatio="none"
      >
        {fillClassName ? <path d={ARCH_PATH} className={cn("fill-current", fillClassName)} /> : null}
        <path
          d={ARCH_PATH}
          className={cn("fill-none stroke-current", strokeClassName)}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children}
    </div>
  );
}
