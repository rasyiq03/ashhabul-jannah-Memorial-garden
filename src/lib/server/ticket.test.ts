import { describe, expect, it } from "vitest";
import { nextTicket } from "@/lib/server/ticket";

// 8 Oktober 2026 pukul 23.30 UTC sudah 9 Oktober di WIB.
const lateNightUtc = new Date("2026-10-08T23:30:00Z");

describe("nextTicket", () => {
  it("memulai urutan dari 0001 dengan tanggal WIB", () => {
    expect(nextTicket("AMB", [], lateNightUtc)).toBe("AMB-20261009-0001");
  });

  it("melanjutkan urutan tertinggi pada hari dan jenis yang sama", () => {
    const existing = ["AMB-20261009-0001", "AMB-20261009-0007", "PML-20261009-0009", "AMB-20261008-0012"];
    expect(nextTicket("AMB", existing, lateNightUtc)).toBe("AMB-20261009-0008");
    expect(nextTicket("PML", existing, lateNightUtc)).toBe("PML-20261009-0010");
  });
});
