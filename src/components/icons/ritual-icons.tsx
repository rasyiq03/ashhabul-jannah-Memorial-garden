import type { SVGProps } from "react";

type RitualIconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function RitualIcon({ children, strokeWidth = 1.5, ...props }: RitualIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Gayung dengan tetesan air: memandikan jenazah. */
export function BathingIcon(props: RitualIconProps) {
  return (
    <RitualIcon {...props}>
      <path d="M3.5 7.5h10v1.75a5 5 0 0 1-10 0V7.5Z" />
      <path d="M13.5 8.5h6.5" />
      <path d="M8.5 16.25c.85 1.1 1.3 1.85 1.3 2.4a1.3 1.3 0 0 1-2.6 0c0-.55.45-1.3 1.3-2.4Z" />
      <path d="M5 19.25c.6.8.95 1.35.95 1.75a.95.95 0 0 1-1.9 0c0-.4.35-.95.95-1.75Z" />
      <path d="M12 19.25c.6.8.95 1.35.95 1.75a.95.95 0 0 1-1.9 0c0-.4.35-.95.95-1.75Z" />
    </RitualIcon>
  );
}

/** Kain kafan yang diikat tiga simpul: mengkafani. */
export function ShroudIcon(props: RitualIconProps) {
  return (
    <RitualIcon {...props}>
      <rect x="2.75" y="8.5" width="18.5" height="7" rx="3.5" />
      <path d="M7.5 7.5v9M12 7.5v9M16.5 7.5v9" />
    </RitualIcon>
  );
}

/** Lengkung mihrab dengan jenazah di depannya: menyalatkan. */
export function PrayerIcon(props: RitualIconProps) {
  return (
    <RitualIcon {...props}>
      <path d="M5.5 20.5v-8.25c0-3.2 2.6-5.9 6.5-8.75 3.9 2.85 6.5 5.55 6.5 8.75v8.25" />
      <path d="M2.5 20.5h19" />
      <path d="M8.5 17h7" />
    </RitualIcon>
  );
}

/** Gundukan tanah dan nisan: memakamkan. */
export function BurialIcon(props: RitualIconProps) {
  return (
    <RitualIcon {...props}>
      <path d="M2.5 20.5h19" />
      <path d="M4 20.5c1.8-2.9 4.8-4.25 8-4.25s6.2 1.35 8 4.25" />
      <path d="M10.25 16.4V9.75a1.75 1.75 0 0 1 3.5 0v6.65" />
    </RitualIcon>
  );
}
