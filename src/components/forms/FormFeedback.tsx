"use client";

import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

export function FormAlert({ message, whatsappUrl }: { message: string; whatsappUrl?: string }) {
  return (
    <div role="alert" className="rounded-sm border border-danger/40 bg-danger-soft p-4">
      <p className="flex items-start gap-2.5 font-medium leading-snug text-danger">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={2} />
        {message}
      </p>
      {whatsappUrl ? (
        <ButtonLink href={whatsappUrl} external variant="primary" className="mt-4">
          Kirim data lewat WhatsApp
        </ButtonLink>
      ) : null}
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  submittingLabel: string;
  className?: string;
}

export function SubmitButton({ isSubmitting, label, submittingLabel, className }: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" disabled={isSubmitting} className={className}>
      {isSubmitting ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
          {submittingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}

/** Ringkasan galat di atas tombol kirim, agar pengguna tahu kenapa form belum terkirim. */
export function ValidationSummary({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <p role="alert" className="flex items-start gap-2 text-sm font-medium text-danger">
      <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={2} />
      {count === 1 ? "Ada 1 kolom yang perlu diperbaiki." : `Ada ${count} kolom yang perlu diperbaiki.`} Kolom tersebut
      ditandai merah di atas.
    </p>
  );
}
