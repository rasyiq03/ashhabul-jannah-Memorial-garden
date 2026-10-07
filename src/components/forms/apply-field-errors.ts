import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

/** Menampilkan galat dari server di kolom yang sesuai; kunci yang tidak dikenal diabaikan. */
export function applyFieldErrors<TValues extends FieldValues>(
  fieldErrors: Record<string, string> | undefined,
  knownFields: readonly string[],
  setError: UseFormSetError<TValues>,
) {
  if (!fieldErrors) return;
  for (const [field, message] of Object.entries(fieldErrors)) {
    if (knownFields.includes(field)) setError(field as Path<TValues>, { type: "server", message });
  }
}
