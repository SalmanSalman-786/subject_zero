"use client";

import React, { useState } from "react";

export interface BriefingProtocol {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
}

export const INVESTIGATION_PROTOCOLS: BriefingProtocol[] = [
  {
    id: "network",
    number: "01",
    title: "STABLE NETWORK CONNECTION REQUIRED",
    tag: "CRITICAL",
    description:
      "Maintain a reliable, uninterrupted internet connection. Live telemetry, countdown synchronization, and squad answer validation require real-time connectivity.",
  },
  {
    id: "timer",
    number: "02",
    title: "10-MINUTE TIMER PER ROUND (AUTO-ADVANCE)",
    tag: "TIMER",
    description:
      "Each investigative sector has a strict 10-minute limit. If time expires, the security terminal locks down and auto-advances the squad to the next sector.",
  },
  {
    id: "coop",
    number: "03",
    title: "TEAM COMMUNICATION IS ESSENTIAL",
    tag: "CO-OP",
    description:
      "All 4 agents investigate together. Coordinate actively through voice or chat—evidence discovered on one screen is required to unlock downstream puzzles.",
  },
  {
    id: "memory",
    number: "04",
    title: "RECORD ALL PREVIOUS CODES & ANSWERS",
    tag: "MEMORY",
    description:
      "Do not discard earlier discoveries. Key identifiers, process IDs, and decryption strings from earlier rooms resurface in later security gates and the final override.",
  },
  {
    id: "leads",
    number: "05",
    title: "DESIGNATED OPERATIVE LEADS (ROUNDS 1–4)",
    tag: "LEADERSHIP",
    description:
      "In Rounds 1 through 4, the assigned operative controls the active terminal while teammates monitor live telemetry feeds and cross-reference research documents.",
  },
  {
    id: "final-breach",
    number: "06",
    title: "SIMULTANEOUS CONTAINMENT OVERRIDE (ROUND 5)",
    tag: "ROUND 5",
    description:
      "In the final sector, individual turns end. All 4 squad members must simultaneously authenticate their assigned terminal directives to permanently contain Subject Zero.",
  },
];

interface InvestigationBriefingProps {
  className?: string;
  defaultExpanded?: boolean;
}

export function InvestigationBriefing({
  className = "",
  defaultExpanded = false,
}: InvestigationBriefingProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const displayedProtocols = isExpanded
    ? INVESTIGATION_PROTOCOLS
    : INVESTIGATION_PROTOCOLS.slice(0, 2);

  const hiddenCount = INVESTIGATION_PROTOCOLS.length - 2;

  return (
    <div
      className={`border border-[var(--panel-border)]/40 bg-[var(--panel)]/70 text-[var(--text)] font-mono p-4 sm:p-5 rounded-xs transition-all ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--panel-border)]/30 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--accent)]">
            FACILITY PROTOCOL // OPERATIVE BRIEFING
          </h2>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
          {isExpanded ? `ALL ${INVESTIGATION_PROTOCOLS.length} PROTOCOLS` : `2 OF ${INVESTIGATION_PROTOCOLS.length} PROTOCOLS`}
        </span>
      </div>

      {/* Protocol List with Fade Mask Container */}
      <div className="relative">
        <div className="space-y-2.5 transition-all duration-300">
          {displayedProtocols.map((protocol, idx) => (
            <div
              key={protocol.id}
              className={`p-3 border border-[var(--panel-border)]/20 bg-background/40 transition-colors hover:border-[var(--panel-border)]/60 ${
                idx >= 2 ? "animate-in fade-in slide-in-from-top-1 duration-200" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[var(--accent)]">
                    [{protocol.number}]
                  </span>
                  <span className="text-xs font-bold tracking-tight uppercase text-[var(--text)]">
                    {protocol.title}
                  </span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 border border-[var(--accent)]/40 text-[var(--accent)] uppercase font-semibold tracking-wider shrink-0">
                  {protocol.tag}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed pl-5 sm:pl-6">
                {protocol.description}
              </p>
            </div>
          ))}
        </div>

        {/* Atmospheric Fade Effect when Collapsed */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-[var(--panel)] via-[var(--panel)]/70 to-transparent"
          />
        )}
      </div>

      {/* Expand / Collapse Control Button */}
      <div className="mt-3 pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="group relative px-4 py-2 border border-[var(--panel-border)]/60 hover:border-[var(--accent)] bg-[var(--bg)]/90 hover:bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>{isExpanded ? "▲" : "▼"}</span>
          <span>
            {isExpanded
              ? "COLLAPSE PROTOCOLS"
              : `READ MORE PROTOCOLS (${hiddenCount} REMAINING)`}
          </span>
          <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
            {isExpanded ? "[LESS]" : "[EXPAND]"}
          </span>
        </button>
      </div>
    </div>
  );
}
