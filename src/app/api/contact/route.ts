import { contactSchema } from "@/lib/schemas/contact";
import { createSubmissionHandler } from "@/lib/server/submission-handler";
import { composeContactMessage, summarizeContact } from "@/lib/submission/summaries";

export const runtime = "nodejs";

export const POST = createSubmissionHandler({
  kind: "contact",
  ticketPrefix: "TNY",
  schema: contactSchema,
  summarize: summarizeContact,
  composeMessage: composeContactMessage,
});
