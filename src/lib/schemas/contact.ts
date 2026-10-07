import { z } from "zod";
import {
  FIELD_LIMITS,
  emailField,
  honeypotField,
  optionalText,
  requiredText,
  whatsappField,
} from "@/lib/schemas/fields";

export const contactTopicValues = [
  "kavling-wakaf",
  "ambulans",
  "pemulasaraan",
  "makam-dhuafa",
  "ziarah-perawatan",
  "program-wakaf",
] as const;

export type ContactTopic = (typeof contactTopicValues)[number];

export const contactSchema = z.object({
  name: requiredText({ label: "Nama", required: "Tulis nama Anda.", max: FIELD_LIMITS.name }),
  email: emailField,
  whatsapp: whatsappField,
  topic: z.enum(contactTopicValues, { error: "Pilih hal yang ingin Anda ketahui." }),
  message: optionalText("Pertanyaan", FIELD_LIMITS.notes),
  companySite: honeypotField,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactRequest = z.output<typeof contactSchema>;
