"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useCallback, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { isVehicleId, site } from "@/config/site";
import { ambulanceReceiptCopy, bookingFormCopy } from "@/content/ambulance";
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
import { Button } from "@/components/ui/Button";
import { CostEstimatePanel } from "@/components/sections/ambulance/CostEstimatePanel";
import { useSubmission } from "@/hooks/use-submission";
import { useTodayInWib } from "@/hooks/use-today-wib";
import { addDays, dateInWib, timeInWib } from "@/lib/datetime";
import { usePrefillListener } from "@/lib/form-prefill";
import { PREFILL_EVENTS } from "@/lib/prefill-events";
import { formatRupiah } from "@/lib/format";
import { FIELD_LIMITS } from "@/lib/schemas/fields";
import {
  ambulanceBookingSchema,
  type AmbulanceBooking,
  type AmbulanceBookingInput,
} from "@/lib/schemas/ambulance-booking";
import { tryEstimate } from "@/lib/submission/summaries";

const vehicleOptions = Object.entries(site.ambulance.vehicles).map(([value, vehicle]) => ({
  value,
  label: vehicle.label,
}));

const zoneOptions = Object.entries(site.ambulance.zones).map(([value, zone]) => ({
  value,
  label: zone.label,
  description: zone.description,
}));

const coffinOptions = Object.entries(site.ambulance.coffins).map(([value, coffin]) => ({
  value,
  label: coffin.label,
  description: `+ ${formatRupiah(coffin.price)}`,
}));

const defaultValues: AmbulanceBookingInput = {
  requesterName: "",
  whatsapp: "",
  deceasedName: "",
  vehicleId: "ambulans-jenazah",
  pickupAddress: "",
  destination: "",
  pickupDate: "",
  pickupTime: "",
  escortCount: "2",
  distanceMode: "zona",
  zoneId: "dekat",
  distanceKm: "",
  needsCoffin: false,
  coffinType: "keranda",
  extraCrew: false,
  notes: "",
  companySite: "",
};

const knownFields = Object.keys(ambulanceBookingSchema.shape);

function toKilometres(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function AmbulanceBookingForm() {
  const today = useTodayInWib();
  const { state, submit, reset: resetSubmission } = useSubmission("/api/ambulance");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset: resetForm,
    control,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<AmbulanceBookingInput, unknown, AmbulanceBooking>({
    resolver: zodResolver(ambulanceBookingSchema),
    defaultValues,
    mode: "onTouched",
  });

  const [vehicleId, distanceMode, zoneId, distanceKm, needsCoffin, coffinType, extraCrew, escortCount] = useWatch({
    control,
    name: ["vehicleId", "distanceMode", "zoneId", "distanceKm", "needsCoffin", "coffinType", "extraCrew", "escortCount"],
  });

  const vehicle = isVehicleId(vehicleId) ? site.ambulance.vehicles[vehicleId] : null;
  const estimate =
    vehicle && isVehicleId(vehicleId)
      ? tryEstimate({ vehicleId, distanceMode, zoneId, distanceKm: toKilometres(distanceKm), needsCoffin, coffinType, extraCrew })
      : null;
  const escorts = Number(escortCount);
  const exceedsCapacity = vehicle !== null && Number.isFinite(escorts) && escorts > vehicle.escortCapacity;

  const selectVehicle = useCallback(
    (value: string) => {
      if (!isVehicleId(value)) return;
      setValue("vehicleId", value, { shouldDirty: true, shouldValidate: true });
      if (!site.ambulance.vehicles[value].allowsZones) setValue("distanceMode", "km", { shouldDirty: true });
    },
    [setValue],
  );
  usePrefillListener(PREFILL_EVENTS.vehicle, selectVehicle);

  const vehicleRegistration = register("vehicleId", {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => selectVehicle(event.target.value),
  });

  function fillPickupNow() {
    const now = new Date();
    setValue("pickupDate", dateInWib(now), { shouldDirty: true, shouldValidate: true });
    setValue("pickupTime", timeInWib(now), { shouldDirty: true, shouldValidate: true });
  }

  const onSubmit = handleSubmit(async (booking) => {
    const fieldErrors = await submit(booking);
    applyFieldErrors(fieldErrors, knownFields, setError);
  });

  function startOver() {
    resetForm(defaultValues);
    resetSubmission();
  }

  if (state.status === "success") {
    return <SubmissionReceipt result={state.result} copy={ambulanceReceiptCopy} onReset={startOver} />;
  }

  const distanceModeOptions = [
    ...(vehicle?.allowsZones === false ? [] : [{ value: "zona", label: "Pilih zona", description: "Bila belum tahu jarak pastinya" }]),
    { value: "km", label: "Isi jarak (km)", description: "Lebih tepat, cek di Google Maps" },
  ];

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
      <HoneypotField registration={register("companySite")} />

      <fieldset disabled={isSubmitting} className="min-w-0 space-y-12">
        <FormGroup title="Pemesan dan almarhum/ah">
          <TextField
            label="Nama pemesan"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            error={errors.requesterName?.message}
            {...register("requesterName")}
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
          <TextField
            label="Nama almarhum/ah"
            className="sm:col-span-2"
            maxLength={FIELD_LIMITS.name}
            error={errors.deceasedName?.message}
            {...register("deceasedName")}
          />
        </FormGroup>

        <FormGroup title="Penjemputan dan tujuan">
          <TextAreaField
            label="Lokasi penjemputan"
            hint="Alamat lengkap dengan patokan, atau nama rumah sakit dan ruangannya."
            className="sm:col-span-2"
            rows={3}
            maxLength={FIELD_LIMITS.address}
            error={errors.pickupAddress?.message}
            {...register("pickupAddress")}
          />
          <TextField
            label="Tujuan atau lokasi pemakaman"
            hint="Misalnya Taman Wakaf Sakinah, TPU Cikutra, atau alamat rumah duka."
            className="sm:col-span-2"
            maxLength={FIELD_LIMITS.place}
            error={errors.destination?.message}
            {...register("destination")}
          />
          <TextField
            label="Tanggal jemput"
            type="date"
            min={today}
            max={today ? addDays(today, 60) : undefined}
            error={errors.pickupDate?.message}
            {...register("pickupDate")}
          />
          <TextField
            label="Jam jemput (WIB)"
            type="time"
            error={errors.pickupTime?.message}
            {...register("pickupTime")}
          />
          <div className="sm:col-span-2">
            <Button variant="secondary" onClick={fillPickupNow}>
              <Clock aria-hidden="true" className="size-4" />
              {bookingFormCopy.nowButtonLabel}
            </Button>
          </div>
          <TextField
            label="Jumlah pengantar"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            hint={
              exceedsCapacity && vehicle
                ? `${vehicle.label} memuat ${vehicle.escortCapacity} pendamping. Pengantar lainnya mengikuti dengan kendaraan sendiri.`
                : "Orang yang ikut mengantar jenazah. Tulis 0 bila tidak ada."
            }
            error={errors.escortCount?.message}
            {...register("escortCount")}
          />
        </FormGroup>

        <FormGroup title="Armada dan jarak">
          <SelectField
            label="Jenis armada"
            className="sm:col-span-2"
            placeholder="Pilih jenis armada"
            options={vehicleOptions}
            error={errors.vehicleId?.message}
            {...vehicleRegistration}
          />
          <ChoiceGroup
            label="Cara menghitung jarak"
            className="sm:col-span-2"
            hint={vehicle?.allowsZones === false ? `${vehicle.label} dihitung per kilometer.` : undefined}
            options={distanceModeOptions}
            registration={register("distanceMode")}
            error={errors.distanceMode?.message}
          />
          {distanceMode === "km" ? (
            <TextField
              label="Perkiraan jarak (km)"
              type="number"
              inputMode="decimal"
              min={1}
              max={site.ambulance.maxDistanceKm}
              step="any"
              hint="Jarak rute dari lokasi jemput ke tujuan. Pecahan kilometer dibulatkan ke atas."
              error={errors.distanceKm?.message}
              {...register("distanceKm")}
            />
          ) : (
            <ChoiceGroup
              label="Zona jarak"
              className="sm:col-span-2"
              columns={3}
              options={zoneOptions}
              registration={register("zoneId")}
              error={errors.zoneId?.message}
            />
          )}
        </FormGroup>

        <FormGroup title="Tambahan">
          <div className="space-y-4 sm:col-span-2">
            <CheckboxField
              label="Butuh peti atau keranda"
              description="Keranda dipakai untuk pemakaman dalam kota. Peti biasanya diminta untuk perjalanan antar-kota."
              {...register("needsCoffin")}
            />
            {needsCoffin ? (
              <ChoiceGroup
                label="Pilih peti atau keranda"
                options={coffinOptions}
                registration={register("coffinType")}
                error={errors.coffinType?.message}
              />
            ) : null}
            <CheckboxField
              label={`${site.ambulance.extraCrew.label} (+ ${formatRupiah(site.ambulance.extraCrew.price)})`}
              description="Untuk rumah di gang sempit, lantai atas, atau jalan yang tidak bisa dilalui mobil."
              {...register("extraCrew")}
            />
          </div>
          <TextAreaField
            label="Catatan untuk petugas"
            optional
            className="sm:col-span-2"
            hint="Misalnya: jenazah masih di ruang ICU, atau keluarga menunggu di masjid."
            maxLength={FIELD_LIMITS.notes}
            error={errors.notes?.message}
            {...register("notes")}
          />
        </FormGroup>
      </fieldset>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-5">
          <CostEstimatePanel estimate={estimate} />
          <ValidationSummary count={submitCount > 0 ? Object.keys(errors).length : 0} />
          {state.status === "error" ? <FormAlert message={state.message} whatsappUrl={state.whatsappUrl} /> : null}
          <SubmitButton
            isSubmitting={isSubmitting}
            label={bookingFormCopy.submitLabel}
            submittingLabel={bookingFormCopy.submittingLabel}
            className="w-full"
          />
        </div>
      </aside>
    </form>
  );
}
