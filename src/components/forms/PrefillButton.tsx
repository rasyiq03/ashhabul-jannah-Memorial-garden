"use client";

import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { requestPrefill } from "@/lib/form-prefill";
import type { PrefillEvent } from "@/lib/prefill-events";

interface PrefillButtonProps {
  event: PrefillEvent;
  value: string;
  formAnchorId: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

export function PrefillButton({ event, value, formAnchorId, variant = "secondary", className, children }: PrefillButtonProps) {
  return (
    <Button variant={variant} className={className} onClick={() => requestPrefill(event, value, formAnchorId)}>
      {children}
    </Button>
  );
}
