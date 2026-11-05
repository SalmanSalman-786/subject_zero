import { describe, it, expect } from "vitest";
import { INVESTIGATION_PROTOCOLS } from "../InvestigationBriefing";

describe("InvestigationBriefing Protocols Verification", () => {
  it("contains all required operational protocols", () => {
    expect(INVESTIGATION_PROTOCOLS.length).toBe(6);
  });

  it("includes network stability rule as protocol 01", () => {
    const p1 = INVESTIGATION_PROTOCOLS[0];
    expect(p1.number).toBe("01");
    expect(p1.title).toContain("STABLE NETWORK");
    expect(p1.tag).toBe("CRITICAL");
  });

  it("includes 10-minute round timer and auto-advance rule as protocol 02", () => {
    const p2 = INVESTIGATION_PROTOCOLS[1];
    expect(p2.number).toBe("02");
    expect(p2.title).toContain("10-MINUTE TIMER");
    expect(p2.description).toContain("auto-advance");
  });

  it("includes team communication and collective play rule as protocol 03", () => {
    const p3 = INVESTIGATION_PROTOCOLS[2];
    expect(p3.number).toBe("03");
    expect(p3.title).toContain("TEAM COMMUNICATION");
    expect(p3.description).toContain("All 4 agents");
  });

  it("includes previous answer retention rule as protocol 04", () => {
    const p4 = INVESTIGATION_PROTOCOLS[3];
    expect(p4.number).toBe("04");
    expect(p4.title).toContain("RECORD ALL PREVIOUS CODES");
    expect(p4.tag).toBe("MEMORY");
  });

  it("includes designated round leadership rule as protocol 05", () => {
    const p5 = INVESTIGATION_PROTOCOLS[4];
    expect(p5.number).toBe("05");
    expect(p5.title).toContain("DESIGNATED OPERATIVE LEADS");
    expect(p5.tag).toBe("LEADERSHIP");
  });

  it("includes simultaneous containment override for Round 5 as protocol 06", () => {
    const p6 = INVESTIGATION_PROTOCOLS[5];
    expect(p6.number).toBe("06");
    expect(p6.title).toContain("SIMULTANEOUS CONTAINMENT OVERRIDE");
    expect(p6.tag).toBe("ROUND 5");
  });
});
