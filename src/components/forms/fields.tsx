"use client";

import { CircleAlert } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

interface FieldMeta {
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
}

const controlClasses = cn(
  "w-full rounded-sm border border-line-strong bg-paper px-3.5 py-2.5 text-base text-ink",
  "placeholder:text-ink-soft/75 transition-colors hover:border-ink-soft",
  "focus:border-forest focus:outline-2 focus:outline-offset-0 focus:outline-forest/40",
  "aria-invalid:border-danger aria-invalid:bg-danger-soft/40",
  "disabled:cursor-not-allowed disabled:bg-sand disabled:text-ink-soft",
);

function describedBy(id: string, hint: unknown, error: unknown): string | undefined {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function FieldLabel({ htmlFor, label, optional }: { htmlFor?: string; label: string; optional?: boolean }) {
  const content = (
    <>
      {label}
      {optional ? <span className="ml-1.5 font-normal text-ink-soft">(opsional)</span> : null}
    </>
  );
  return htmlFor ? (
    <label htmlFor={htmlFor} className="text-[0.9375rem] font-semibold text-ink">
      {content}
    </label>
  ) : (
    <span className="text-[0.9375rem] font-semibold text-ink">{content}</span>
  );
}

function FieldHint({ id, hint }: { id: string; hint?: ReactNode }) {
  return hint ? (
    <p id={`${id}-hint`} className="text-sm leading-snug text-ink-soft">
      {hint}
    </p>
  ) : null;
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium leading-snug text-danger">
      <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={2} />
      {error}
    </p>
  ) : null;
}

type TextFieldProps = FieldMeta & Omit<ComponentPropsWithRef<"input">, "className">;

export function TextField({ label, hint, error, optional, className, id: providedId, ...inputProps }: TextFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <FieldHint id={id} hint={hint} />
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses}
        {...inputProps}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

type TextAreaFieldProps = FieldMeta & Omit<ComponentPropsWithRef<"textarea">, "className">;

export function TextAreaField({ label, hint, error, optional, className, ...textareaProps }: TextAreaFieldProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <FieldHint id={id} hint={hint} />
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, "min-h-28 resize-y leading-relaxed")}
        {...textareaProps}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

type SelectFieldProps = FieldMeta &
  Omit<ComponentPropsWithRef<"select">, "className"> & { options: SelectOption[]; placeholder: string };

export function SelectField({ label, hint, error, optional, className, options, placeholder, ...selectProps }: SelectFieldProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <FieldHint id={id} hint={hint} />
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses, "appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10")}
        style={{ backgroundImage: "url('/icons/chevron-down.svg')" }}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={id} error={error} />
    </div>
  );
}

type CheckboxFieldProps = Omit<ComponentPropsWithRef<"input">, "className" | "type"> & {
  label: string;
  description?: ReactNode;
  className?: string;
};

export function CheckboxField({ label, description, className, ...inputProps }: CheckboxFieldProps) {
  const id = useId();
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={id}
        type="checkbox"
        aria-describedby={description ? `${id}-description` : undefined}
        className="mt-1 size-5 shrink-0 cursor-pointer rounded-sm accent-forest"
        {...inputProps}
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="cursor-pointer font-semibold text-ink">
          {label}
        </label>
        {description ? (
          <p id={`${id}-description`} className="text-sm leading-snug text-ink-soft">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export interface ChoiceOption {
  value: string;
  label: string;
  description?: ReactNode;
}

interface ChoiceGroupProps extends FieldMeta {
  options: ChoiceOption[];
  registration: UseFormRegisterReturn;
  columns?: 2 | 3;
}

/** Pilihan radio berbentuk kotak; seluruh kotak bisa diklik. */
export function ChoiceGroup({ label, hint, error, optional, className, options, registration, columns = 2 }: ChoiceGroupProps) {
  const id = useId();
  return (
    <fieldset
      role="radiogroup"
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
    >
      <legend className="mb-1.5 block w-full">
        <FieldLabel label={label} optional={optional} />
      </legend>
      <FieldHint id={id} hint={hint} />
      <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-sm border bg-paper p-3.5 transition-colors",
              "hover:border-forest has-checked:border-forest has-checked:bg-sage-soft",
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest",
              error ? "border-danger" : "border-line-strong",
            )}
          >
            <input
              type="radio"
              value={option.value}
              className="mt-1 size-4 shrink-0 cursor-pointer accent-forest focus-visible:outline-none"
              {...registration}
            />
            <span className="flex flex-col">
              <span className="font-semibold leading-snug text-ink">{option.label}</span>
              {option.description ? (
                <span className="mt-0.5 text-sm leading-snug text-ink-soft">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  );
}

/** Kelompok kolom dengan judul kecil, supaya form panjang terasa bertahap. */
export function FormGroup({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-5 block w-full border-b border-line pb-3 font-serif text-2xl text-forest">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** Kolom jebakan bot: tidak terlihat, tidak bisa difokus dengan Tab, dan tidak diisi otomatis. */
export function HoneypotField({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Jangan isi kolom ini
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}
