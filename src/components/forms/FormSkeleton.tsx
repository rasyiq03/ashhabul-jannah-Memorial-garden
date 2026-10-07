import { ambulanceTelHref, site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Kerangka form selama kode form dimuat. Tanpa JavaScript, arahkan ke telepon. */
export function FormSkeleton({ fields, className }: { fields: number; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden="true" className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className={cn("space-y-2", index % 3 === 2 && "sm:col-span-2")}>
            <div className="h-4 w-32 animate-pulse rounded-sm bg-line" />
            <div className="h-11 animate-pulse rounded-sm bg-sand" />
          </div>
        ))}
      </div>
      <p role="status" className="sr-only">
        Memuat formulir…
      </p>
      <noscript>
        <p className="mt-6 rounded-sm border border-line bg-paper p-4 text-ink">
          Formulir ini membutuhkan JavaScript. Silakan telepon{" "}
          <a href={ambulanceTelHref} className="font-semibold text-forest underline">
            {site.contact.ambulancePhoneDisplay}
          </a>{" "}
          atau kirim WhatsApp ke {site.contact.whatsappDisplay}.
        </p>
      </noscript>
    </div>
  );
}
