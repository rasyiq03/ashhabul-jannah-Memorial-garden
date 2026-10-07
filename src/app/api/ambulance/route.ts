import { ambulanceBookingSchema } from "@/lib/schemas/ambulance-booking";
import { createSubmissionHandler } from "@/lib/server/submission-handler";
import { composeAmbulanceMessage, summarizeAmbulanceBooking } from "@/lib/submission/summaries";

export const runtime = "nodejs";

export const POST = createSubmissionHandler({
  kind: "ambulance",
  ticketPrefix: "AMB",
  schema: ambulanceBookingSchema,
  summarize: summarizeAmbulanceBooking,
  composeMessage: composeAmbulanceMessage,
});
