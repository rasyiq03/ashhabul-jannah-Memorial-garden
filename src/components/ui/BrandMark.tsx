import { cn } from "@/lib/cn";

/** Logo: lengkung mihrab berisi bukit dan satu nisan. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" aria-hidden="true" className={cn("h-10 w-8", className)}>
      <path d="M0 40V15.5C0 7.8 6.7 3.1 16 0c9.3 3.1 16 7.8 16 15.5V40Z" className="fill-forest" />
      <path d="M4 40V16.4c0-5.4 4.7-8.9 12-11.4 7.3 2.5 12 6 12 11.4V40Z" className="fill-cream" />
      <path d="M4 33.5c3.6-2.7 7.6-3.9 12-3.9s8.4 1.2 12 3.9V40H4Z" className="fill-sage" />
      <path d="M14.2 31.4v-5.2a1.8 1.8 0 0 1 3.6 0v5.2Z" className="fill-forest" />
      <circle cx="16" cy="13.2" r="1.6" className="fill-gold" />
    </svg>
  );
}
