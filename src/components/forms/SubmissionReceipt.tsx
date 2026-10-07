"use client";

import { Check, Copy, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ambulanceTelHref, site } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { SubmissionSuccess } from "@/lib/submission/types";

interface ReceiptCopy {
  title: string;
  body: string;
  whatsappLabel: string;
  resetLabel: string;
}

interface SubmissionReceiptProps {
  result: SubmissionSuccess;
  copy: ReceiptCopy;
  onReset: () => void;
  showEmergencyCall?: boolean;
}

export function SubmissionReceipt({ result, copy, onReset, showEmergencyCall = true }: SubmissionReceiptProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  async function copyTicket() {
    try {
      await navigator.clipboard.writeText(result.ticket);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-sm border border-forest/30 bg-paper p-6 sm:p-8">
      <h3 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest focus:outline-none">
        {copy.title}
      </h3>
      <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">{copy.body}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-5">
        <div>
          <p className="text-sm text-ink-soft">Nomor tiket</p>
          <p className="font-serif text-3xl tracking-wide text-ink sm:text-4xl">{result.ticket}</p>
        </div>
        <Button variant="secondary" onClick={copyTicket} aria-live="polite">
          {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
          {copied ? "Nomor tersalin" : "Salin nomor tiket"}
        </Button>
      </div>

      <dl className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
        {result.summary
          .filter((line) => line.value.trim() !== "")
          .map((line) => (
            <div key={line.label} className="contents">
              <dt className="text-sm font-semibold text-ink-soft sm:pt-0.5">{line.label}</dt>
              <dd className="-mt-2 whitespace-pre-line break-words text-ink sm:mt-0">{line.value}</dd>
            </div>
          ))}
      </dl>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={result.whatsappUrl} external size="lg">
          <MessageCircle aria-hidden="true" className="size-5" />
          {copy.whatsappLabel}
        </ButtonLink>
        {showEmergencyCall ? (
          <ButtonLink href={ambulanceTelHref} variant="secondary" size="lg">
            <Phone aria-hidden="true" className="size-5" />
            Telepon {site.contact.ambulancePhoneDisplay}
          </ButtonLink>
        ) : null}
        <Button variant="quiet" onClick={onReset} className="sm:ml-auto">
          {copy.resetLabel}
        </Button>
      </div>
    </div>
  );
}
