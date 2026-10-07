"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Menandai elemen [data-reveal] di dalamnya saat terlihat di layar. Gaya transisinya ada
 * di globals.css dan otomatis nonaktif bila pengguna memilih mengurangi gerak.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
