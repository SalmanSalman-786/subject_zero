// Standalone WCAG 2.1 Contrast Checker for Classic Skin
// Ratios required:
// - Body text on panel >= 4.5:1
// - Muted text on panel >= 4.5:1
// - Accent for UI borders and buttons >= 3:1

function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "").trim();
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const rounds = [
  {
    name: "Round 1",
    panel: "#0e1620",
    text: "#efe8d8",
    muted: "#a9b3b0",
    accent: "#b89b5e",
  },
  {
    name: "Round 2",
    panel: "#1a0f27",
    text: "#ece8f2",
    muted: "#b4adc4",
    accent: "#a98bd1",
  },
  {
    name: "Round 3",
    panel: "#0d1f18",
    text: "#ece6d6",
    muted: "#a9b8ae",
    accent: "#6fa58f",
  },
  {
    name: "Round 4",
    panel: "#231509",
    text: "#f1e6cf",
    muted: "#baa98d",
    accent: "#c9a24a",
  },
  {
    name: "Round 5",
    panel: "#1d0b11",
    text: "#f3ece0",
    muted: "#bba9a4",
    accent: "#d1485c",
  },
];

console.log("=== SUBJECT ZERO CLASSIC SKIN WCAG CONTRAST VERIFICATION ===");
let hasFailure = false;

for (const round of rounds) {
  console.log(`\nChecking ${round.name} against panel ${round.panel}:`);
  
  const textRatio = getContrastRatio(round.text, round.panel);
  const mutedRatio = getContrastRatio(round.muted, round.panel);
  const accentRatio = getContrastRatio(round.accent, round.panel);

  const textPass = textRatio >= 4.5;
  const mutedPass = mutedRatio >= 4.5;
  const accentPass = accentRatio >= 3.0;

  console.log(`  - Text (${round.text}): ${textRatio.toFixed(2)}:1 [${textPass ? "PASS (>= 4.5)" : "FAIL"}]`);
  console.log(`  - Muted (${round.muted}): ${mutedRatio.toFixed(2)}:1 [${mutedPass ? "PASS (>= 4.5)" : "FAIL"}]`);
  console.log(`  - Accent UI (${round.accent}): ${accentRatio.toFixed(2)}:1 [${accentPass ? "PASS (>= 3.0)" : "FAIL"}]`);

  if (!textPass || !mutedPass || !accentPass) {
    hasFailure = true;
  }
}

if (hasFailure) {
  console.error("\n❌ Contrast check FAILED!");
  process.exit(1);
} else {
  console.log("\n✅ All round color contrast ratios PASSED WCAG requirements.");
  process.exit(0);
}
