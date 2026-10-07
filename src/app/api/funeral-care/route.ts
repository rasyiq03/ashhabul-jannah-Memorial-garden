import { funeralCareSchema } from "@/lib/schemas/funeral-care";
import { createSubmissionHandler } from "@/lib/server/submission-handler";
import { composeFuneralCareMessage, summarizeFuneralCare } from "@/lib/submission/summaries";

export const runtime = "nodejs";

export const POST = createSubmissionHandler({
  kind: "funeral-care",
  ticketPrefix: "PML",
  schema: funeralCareSchema,
  summarize: summarizeFuneralCare,
  composeMessage: composeFuneralCareMessage,
});
