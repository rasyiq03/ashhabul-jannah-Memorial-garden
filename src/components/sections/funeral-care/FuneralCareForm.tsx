"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm, useWatch, type DefaultValues } from "react-hook-form";
import { isCarePackageId, site } from "@/config/site";
import {
  bodyLocationLabels,
  funeralFormCopy,
  funeralReceiptCopy,
  genderLabels,
  relationshipLabels,
} from "@/content/funeral-care";
import { applyFieldErrors } from "@/components/forms/apply-field-errors";
import {
  CheckboxField,
  ChoiceGroup,
  FormGroup,
  HoneypotField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { FormAlert, SubmitButton, ValidationSummary } from "@/components/forms/FormFeedback";
import { SubmissionReceipt } from "@/components/forms/SubmissionReceipt";
import { useSubmission } from "@/hooks/use-submission";
import { useTodayInWib } from "@/hooks/use-today-wib";
import { addDays } from "@/lib/datetime";
import { usePrefillListener } from "@/lib/form-prefill";
import { PREFILL_EVENTS } from "@/lib/prefill-events";
import { formatRupiah } from "@/lib/format";
import { FIELD_LIMITS } from "@/lib/schemas/fields";
import {
  funeralCareSchema,
  type BodyLocation,
  type FuneralCareInput,
  type FuneralCareRequest,
} from "@/lib/schemas/funeral-care";

const relationshipOptions = Object.entries(relationshipLabels).map(([value, label]) => ({ value, label }));
const genderOptions = Object.entries(genderLabels).map(([value, label]) => ({
  value,
  label,
  description: value === "perempuan" ? "Diurus petugas perempuan" : "Diurus petugas laki-laki",
}));
const locationOptions = Object.entries(bodyLocationLabels).map(([value, label]) => ({ value, label }));
const packageOptions = Object.entries(site.funeralCare.packages).map(([value, carePackage]) => ({
  value,
  label: carePackage.label,
  description: carePackage.price === 0 ? "Tanpa biaya, dengan syarat" : formatRupiah(carePackage.price),
}));
const vehicleOptions = Object.entries(site.ambulance.vehicles).map(([value, vehicle]) => ({ value, label: vehicle.label }));

const addressCopy: Record<BodyLocation, { label: string; hint: string }> = {
  rumah: { label: "Alamat rumah", hint: "Nama jalan, nomor rumah, RT/RW, dan patokan terdekat." },
  "rumah-sakit": { label: "Nama rumah sakit dan ruangan", hint: "Contoh: RS Al Islam Bandung, kamar jenazah lantai dasar." },
  lainnya: { label: "Alamat lokasi jenazah", hint: "Tulis alamat selengkap mungkin beserta patokannya." },
};

const defaultValues: DefaultValues<FuneralCareInput> = {
  applicantName: "",
  whatsapp: "",
  deceasedName: "",
  deceasedAge: "",
  deathDate: "",
  deathTime: "",
  bodyLocationType: "rumah",
  bodyAddress: "",
  needsAmbulance: false,
  ambulanceVehicleId: "",
  burialDestination: "",
  notes: "",
  companySite: "",
};

const knownFields = Object.keys(funeralCareSchema.shape);

export function FuneralCareForm() {
  const today = useTodayInWib();
  const { state, submit, reset: resetSubmission } = useSubmission("/api/funeral-care");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset: resetForm,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<FuneralCareInput, unknown, FuneralCareRequest>({
    resolver: zodResolver(funeralCareSchema),
    defaultValues,
    mode: "onTouched",
  });

  const [bodyLocationType, needsAmbulance] = useWatch({ control, name: ["bodyLocationType", "needsAmbulance"] });
  const address = addressCopy[bodyLocationType] ?? addressCopy.lainnya;

  const selectPackage = useCallback(
    (value: string) => {
      if (isCarePackageId(value)) setValue("packageId", value, { shouldDirty: true, shouldValidate: true });
    },
    [setValue],
  );
  usePrefillListener(PREFILL_EVENTS.carePackage, selectPackage);

  const onSubmit = handleSubmit(async (request) => {
    const fieldErrors = await submit(request);
    applyFieldErrors(fieldErrors, knownFields, setError);
  });

  function startOver() {
    resetForm(defaultValues);
    resetSubmission();
  }

  if (state.status === "success") {
    return <SubmissionReceipt result={state.result} copy={funeralReceiptCopy} onReset={startOver} />;
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative">
      <HoneypotField registration={register("companySite")} />

      <fieldset disabled={isSubmitting} className="min-w-0 space-y-12">
        <FormGroup title="Data pemohon">
          <TextField
            label="Nama pemohon"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            error={errors.applicantName?.message}
            {...register("applicantName")}
          />
          <SelectField
            label="Hubungan dengan almarhum/ah"
            placeholder="Pilih hubungan"
            options={relationshipOptions}
            error={errors.relationship?.message}
            {...register("relationship")}
          />
          <TextField
            label="Nomor WhatsApp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0812-3456-7890"
            maxLength={20}
            error={errors.whatsapp?.message}
            {...register("whatsapp")}
          />
        </FormGroup>

        <FormGroup title="Data almarhum/ah">
          <TextField
            label="Nama almarhum/ah"
            className="sm:col-span-2"
            maxLength={FIELD_LIMITS.name}
            error={errors.deceasedName?.message}
            {...register("deceasedName")}
          />
          <ChoiceGroup
            label="Jenis kelamin almarhum/ah"
            className="sm:col-span-2"
            options={genderOptions}
            registration={register("deceasedGender")}
            error={errors.deceasedGender?.message}
          />
          <TextField
            label="Perkiraan usia (tahun)"
            type="number"
            inputMode="numeric"
            min={0}
            max={130}
            hint="Untuk bayi di bawah satu tahun, tulis 0."
            error={errors.deceasedAge?.message}
            {...register("deceasedAge")}
          />
          <div aria-hidden="true" className="hidden sm:block" />
          <TextField
            label="Tanggal wafat"
            type="date"
            max={today}
            min={today ? addDays(today, -7) : undefined}
            error={errors.deathDate?.message}
            {...register("deathDate")}
          />
          <TextField
            label="Jam wafat (WIB)"
            type="time"
            optional
            hint="Kosongkan bila tidak tahu pasti."
            error={errors.deathTime?.message}
            {...register("deathTime")}
          />
        </FormGroup>

        <FormGroup title="Lokasi jenazah saat ini">
          <ChoiceGroup
            label="Jenazah berada di"
            className="sm:col-span-2"
            columns={3}
            options={locationOptions}
            registration={register("bodyLocationType")}
            error={errors.bodyLocationType?.message}
          />
          <TextAreaField
            label={address.label}
            hint={address.hint}
            className="sm:col-span-2"
            rows={3}
            maxLength={FIELD_LIMITS.address}
            error={errors.bodyAddress?.message}
            {...register("bodyAddress")}
          />
        </FormGroup>

        <FormGroup title="Paket dan kebutuhan">
          <ChoiceGroup
            label="Paket pemulasaraan"
            className="sm:col-span-2"
            columns={3}
            options={packageOptions}
            registration={register("packageId")}
            error={errors.packageId?.message}
          />
          <CheckboxField
            label="Sekalian butuh ambulans"
            className="sm:col-span-2"
            description="Paket Lengkap dan Paket Wakaf & Dhuafa sudah termasuk ambulans dalam Bandung Raya. Tetap centang agar kami tahu tujuan pemakamannya."
            {...register("needsAmbulance")}
          />
          {needsAmbulance ? (
            <div className="grid gap-5 border-l-2 border-sage pl-4 sm:col-span-2 sm:grid-cols-2 sm:pl-6">
              <SelectField
                label="Jenis armada"
                placeholder="Pilih jenis armada"
                options={vehicleOptions}
                error={errors.ambulanceVehicleId?.message}
                {...register("ambulanceVehicleId")}
              />
              <TextField
                label="Tujuan pemakaman"
                hint="Nama pemakaman dan kotanya."
                maxLength={FIELD_LIMITS.place}
                error={errors.burialDestination?.message}
                {...register("burialDestination")}
              />
            </div>
          ) : null}
          <TextAreaField
            label="Catatan khusus"
            optional
            className="sm:col-span-2"
            hint="Misalnya: almarhum/ah pasien penyakit menular, ada wasiat tertentu, atau keluarga ingin ikut memandikan."
            maxLength={FIELD_LIMITS.notes}
            error={errors.notes?.message}
            {...register("notes")}
          />
        </FormGroup>
      </fieldset>

      <div className="mt-10 space-y-5 border-t border-line pt-8">
        <ValidationSummary count={submitCount > 0 ? Object.keys(errors).length : 0} />
        {state.status === "error" ? <FormAlert message={state.message} whatsappUrl={state.whatsappUrl} /> : null}
        <SubmitButton
          isSubmitting={isSubmitting}
          label={funeralFormCopy.submitLabel}
          submittingLabel={funeralFormCopy.submittingLabel}
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
