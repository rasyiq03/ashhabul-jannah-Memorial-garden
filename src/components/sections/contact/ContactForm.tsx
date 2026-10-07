"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { contactContent, contactReceiptCopy, contactTopicLabels } from "@/content/contact";
import { applyFieldErrors } from "@/components/forms/apply-field-errors";
import { HoneypotField, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { FormAlert, SubmitButton } from "@/components/forms/FormFeedback";
import { SubmissionReceipt } from "@/components/forms/SubmissionReceipt";
import { useSubmission } from "@/hooks/use-submission";
import { FIELD_LIMITS } from "@/lib/schemas/fields";
import { contactSchema, type ContactInput, type ContactRequest } from "@/lib/schemas/contact";

const topicOptions = Object.entries(contactTopicLabels).map(([value, label]) => ({ value, label }));

const defaultValues: DefaultValues<ContactInput> = {
  name: "",
  email: "",
  whatsapp: "",
  message: "",
  companySite: "",
};

const knownFields = Object.keys(contactSchema.shape);

export function ContactForm() {
  const { state, submit, reset: resetSubmission } = useSubmission("/api/contact");
  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (request) => {
    const fieldErrors = await submit(request);
    applyFieldErrors(fieldErrors, knownFields, setError);
  });

  function startOver() {
    resetForm(defaultValues);
    resetSubmission();
  }

  if (state.status === "success") {
    return (
      <SubmissionReceipt result={state.result} copy={contactReceiptCopy} onReset={startOver} showEmergencyCall={false} />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative rounded-sm border border-line bg-paper p-5 sm:p-8">
      <HoneypotField registration={register("companySite")} />
      <fieldset disabled={isSubmitting} className="grid min-w-0 gap-5 sm:grid-cols-2">
        <legend className="sr-only">Formulir pertanyaan</legend>
        <TextField
          label="Nama"
          autoComplete="name"
          className="sm:col-span-2"
          maxLength={FIELD_LIMITS.name}
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nama@email.com"
          maxLength={FIELD_LIMITS.email}
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="No. WhatsApp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0812-3456-7890"
          maxLength={20}
          error={errors.whatsapp?.message}
          {...register("whatsapp")}
        />
        <SelectField
          label="Saya ingin tahu info tentang"
          className="sm:col-span-2"
          placeholder="Pilih topik"
          options={topicOptions}
          error={errors.topic?.message}
          {...register("topic")}
        />
        <TextAreaField
          label="Pertanyaan"
          optional
          className="sm:col-span-2"
          maxLength={FIELD_LIMITS.notes}
          error={errors.message?.message}
          {...register("message")}
        />
      </fieldset>
      <div className="mt-6 space-y-4">
        {state.status === "error" ? <FormAlert message={state.message} whatsappUrl={state.whatsappUrl} /> : null}
        <SubmitButton
          isSubmitting={isSubmitting}
          label={contactContent.submitLabel}
          submittingLabel={contactContent.submittingLabel}
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
