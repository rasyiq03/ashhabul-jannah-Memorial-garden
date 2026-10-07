import { ImageResponse } from "next/og";
import { brandColors } from "@/config/brand-colors";
import { site } from "@/config/site";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageAlt = `${site.name}: pemakaman Muslim berbasis wakaf, ambulans jenazah 24 jam, dan pemulasaraan jenazah.`;

/** Gambar pratinjau tautan untuk WhatsApp, Facebook, dan X. */
export function renderSocialImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: brandColors.forest,
          color: brandColors.cream,
          padding: "72px 80px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 30, color: brandColors.goldSoft }}>{site.address.regency}</div>
          <div style={{ fontSize: 72, lineHeight: 1.05, marginTop: 20, fontWeight: 600 }}>{site.name}</div>
          <div style={{ fontSize: 32, lineHeight: 1.35, marginTop: 28, color: brandColors.sage200 }}>
            Pemakaman Muslim berbasis wakaf. Ambulans jenazah dan pemulasaraan siaga 24 jam.
          </div>
        </div>
        <svg width="260" height="338" viewBox="0 0 100 130">
          <path d="M0 130V50C0 25 21 10 50 0c29 10 50 25 50 50v80Z" fill={brandColors.forestDeep} />
          <path
            d="M0 130V50C0 25 21 10 50 0c29 10 50 25 50 50v80Z"
            fill="none"
            stroke={brandColors.gold}
            strokeWidth="1.2"
          />
          <path d="M0 108c16-9 33-13 50-13s34 4 50 13v22H0Z" fill={brandColors.sageDeep} />
          <path d="M45 96V82a5 5 0 0 1 10 0v14Z" fill={brandColors.cream} />
        </svg>
      </div>
    ),
    socialImageSize,
  );
}
