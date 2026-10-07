import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, composeWhatsAppMessage, toWhatsAppNumber } from "@/lib/whatsapp";
import { formatMobileForDisplay, isValidIndonesianMobile, normalizeIndonesianMobile } from "@/lib/phone";

describe("toWhatsAppNumber", () => {
  it.each([
    ["6281234567890", "6281234567890"],
    ["081234567890", "6281234567890"],
    ["+62 812-3456-7890", "6281234567890"],
  ])("mengubah %s menjadi %s", (input, expected) => {
    expect(toWhatsAppNumber(input)).toBe(expected);
  });
});

describe("buildWhatsAppUrl", () => {
  it("membuat tautan wa.me tanpa pesan", () => {
    expect(buildWhatsAppUrl("6281234567890")).toBe("https://wa.me/6281234567890");
  });

  it("menyandikan pesan dengan baris baru, tanda bintang, dan karakter khusus", () => {
    const url = buildWhatsAppUrl("081234567890", "Assalamu'alaikum\n*Nomor tiket:* AMB-20261008-0001 & 50%");
    expect(url).toBe(
      "https://wa.me/6281234567890?text=Assalamu'alaikum%0A*Nomor%20tiket%3A*%20AMB-20261008-0001%20%26%2050%25",
    );
    expect(new URL(url).searchParams.get("text")).toBe("Assalamu'alaikum\n*Nomor tiket:* AMB-20261008-0001 & 50%");
  });

  it("menolak nomor yang terlalu pendek", () => {
    expect(() => buildWhatsAppUrl("0812")).toThrow();
  });
});

describe("composeWhatsAppMessage", () => {
  it("menyusun pembuka, tiket, data, dan penutup per baris", () => {
    const message = composeWhatsAppMessage({
      opening: "Assalamu'alaikum.",
      ticket: "PML-20261008-0003",
      lines: [
        { label: "Nama almarhum/ah", value: "Ahmad" },
        { label: "Catatan", value: "" },
        { label: "Lokasi", value: "RS *Sehat*" },
      ],
      closing: "Terima kasih.",
    });
    expect(message).toBe(
      [
        "Assalamu'alaikum.",
        "*Nomor tiket:* PML-20261008-0003",
        "",
        "*Nama almarhum/ah:* Ahmad",
        "*Lokasi:* RS Sehat",
        "",
        "Terima kasih.",
      ].join("\n"),
    );
  });

  it("tidak menulis baris tiket bila tiket kosong", () => {
    const message = composeWhatsAppMessage({ opening: "Halo", lines: [{ label: "Nama", value: "Rina" }] });
    expect(message).toBe("Halo\n\n*Nama:* Rina");
  });
});

describe("nomor seluler Indonesia", () => {
  it.each(["081234567890", "0812-3456-7890", "+62 812 3456 7890", "6285712345678"])("menerima %s", (input) => {
    expect(isValidIndonesianMobile(input)).toBe(true);
  });

  it.each(["0221234567", "12345", "0812", "+1 415 555 0100", "08123456789012345"])("menolak %s", (input) => {
    expect(isValidIndonesianMobile(input)).toBe(false);
  });

  it("menormalkan dan memformat nomor", () => {
    expect(normalizeIndonesianMobile("+62 812-3456-7890")).toBe("6281234567890");
    expect(formatMobileForDisplay("6281234567890")).toBe("0812-3456-7890");
  });
});
