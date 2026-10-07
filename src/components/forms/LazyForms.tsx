"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FormSkeleton } from "@/components/forms/FormSkeleton";

/**
 * Kode form (react-hook-form, zod, kalkulator) baru diunduh saat form hampir
 * terlihat, agar halaman pertama lebih cepat siap di ponsel.
 */
function MountWhenNear({ placeholder, children }: { placeholder: ReactNode; children: ReactNode }) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return <div ref={markerRef}>{isNear ? children : placeholder}</div>;
}

const AmbulanceBookingForm = dynamic(
  () => import("@/components/sections/ambulance/AmbulanceBookingForm").then((module) => module.AmbulanceBookingForm),
  { ssr: false, loading: () => <FormSkeleton fields={9} /> },
);

const FuneralCareForm = dynamic(
  () => import("@/components/sections/funeral-care/FuneralCareForm").then((module) => module.FuneralCareForm),
  { ssr: false, loading: () => <FormSkeleton fields={9} /> },
);

const ContactForm = dynamic(
  () => import("@/components/sections/contact/ContactForm").then((module) => module.ContactForm),
  { ssr: false, loading: () => <FormSkeleton fields={4} className="rounded-sm border border-line bg-paper p-5 sm:p-8" /> },
);

export function LazyAmbulanceBookingForm() {
  return (
    <MountWhenNear placeholder={<FormSkeleton fields={9} />}>
      <AmbulanceBookingForm />
    </MountWhenNear>
  );
}

export function LazyFuneralCareForm() {
  return (
    <MountWhenNear placeholder={<FormSkeleton fields={9} />}>
      <FuneralCareForm />
    </MountWhenNear>
  );
}

export function LazyContactForm() {
  return (
    <MountWhenNear
      placeholder={<FormSkeleton fields={4} className="rounded-sm border border-line bg-paper p-5 sm:p-8" />}
    >
      <ContactForm />
    </MountWhenNear>
  );
}
