import { useState } from "react";
import { navigate } from "../lib/navigate";

const steps = [
  {
    num: "01",
    title: "Download Extension",
    body: 'Search for "Standboy" in the Cursor extension marketplace, or download the VSIX file directly from GitHub and install manually.',
    code: `// Option A: Cursor Marketplace
Extensions → Search "Standboy" → Install

// Option B: VSIX manual install
cursor --install-extension standboy.vsix`,
    cta: { label: "GitHub Releases →", href: "https://github.com/yusufsafary/standboy" },
  },
  {
    num: "02",
    title: "Enable Standboy Panel",
    body: "Open your IDE settings JSON and add the required configuration. The built-in Space Invaders game works immediately — no ROM file needed.",
    code: `// settings.json
{
  "standboy.enabled": true,
  "standboy.activityListener": true,
  "standboy.romDirectory": null,
  "standboy.defaultGame": "built-in",
  "standboy.expandPosition": "right",
  "standboy.panelWidth": 400
}`,
    note: 'Set "standboy.defaultGame" to "built-in" to use the included game with no additional setup.',
  },
  {
    num: "03",
    title: "Start Coding",
    body: "Ask your agent to build something complex. The panel will appear automatically when generation begins — then disappear when it is done. Nothing else to configure.",
    code: `// Try asking Claude in Cursor:
"Build a full authentication system
with JWT refresh tokens and rate limiting"

// Standboy expands automatically
// while Claude generates code`,
  },
];

const troubleshooting = [
  {
    problem: "ROM Not Found",
    solution: "The default game (Space Invaders) requires no ROM. This error appears when a custom ROM directory is set but does not contain valid ROM files.",
    fix: `// Fix: reset to built-in game
{
  "standboy.romDirectory": null,
  "standboy.defaultGame": "built-in"
}

// Or point to a valid ROM directory:
{
  "standboy.romDirectory": "/path/to/roms"
}
// Supported: .nes .sfc .gb .gba`,
  },
  {
    problem: "Panel not appearing",
    solution: 'The activity listener may not be enabled. Ensure "standboy.activityListener" is set to true. Note: Standboy detects agent generation events — not inline autocomplete.',
    fix: `// Required in settings.json:
{
  "standboy.enabled": true,
  "standboy.activityListener": true
}

// Then reload window:
Ctrl+Shift+P → "Developer: Reload Window"`,
  },
  {
    problem: "Game canvas appears blank",
    solution: "On first render, some GPU configurations require a focus event to trigger the canvas repaint. Click the panel once, then press Enter to start.",
    fix: `// Quick fix:
// 1. Click the Standboy panel once to focus
// 2. Press Enter to initialize the canvas

// If issue persists:
Ctrl+Shift+P → "Restart Extension Host"`,
  },
];

export function Install() {
  const [openTrouble, setOpenTrouble] = useState<number | null>(null);

  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Install</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            Install Standboy
          </h1>
          <p className="text-sm text-muted-foreground">
            Three steps. Under two minutes. Works immediately with the built-in game.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-0 mb-16">
          {steps.map((s) => (
            <div key={s.num} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-border">
              <div className="md:col-span-1">
                <span className="text-[10px] uppercase tracking-widest text-primary">{s.num}</span>
              </div>
              <div className="md:col-span-4">
                <h2 className="font-bold uppercase tracking-wide text-foreground text-sm mb-2">{s.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>{s.body}</p>
                {s.note && (
                  <div className="mt-3 p-3 border border-primary/30 text-xs text-muted-foreground">
                    ↳ {s.note}
                  </div>
                )}
                {s.cta && (
                  <a
                    href={s.cta.href}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                  >
                    {s.cta.label}
                  </a>
                )}
              </div>
              <div className="md:col-span-7">
                <pre className="bg-card border border-border p-4 text-[11px] text-muted-foreground overflow-x-auto leading-relaxed">
                  {s.code}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Troubleshooting */}
        <div className="border-t border-border pt-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">// Troubleshooting</p>
          <h2 className="text-lg font-bold uppercase tracking-tight text-foreground mb-8">Common Issues</h2>
          <div className="flex flex-col gap-px bg-border">
            {troubleshooting.map((t, i) => (
              <div key={i} className="bg-background">
                <button
                  onClick={() => setOpenTrouble(openTrouble === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[10px] uppercase tracking-widest text-red-400 border border-red-400/30 px-1.5 py-0.5">
                      ERR
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide text-foreground">{t.problem}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${openTrouble === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openTrouble === i && (
                  <div className="px-5 pb-6 border-t border-border pt-4 flex flex-col gap-4">
                    <p className="text-xs text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>{t.solution}</p>
                    <pre className="bg-card border border-border p-4 text-[11px] text-muted-foreground overflow-x-auto leading-relaxed">
                      {t.fix}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 border border-border">
            <p className="text-xs text-muted-foreground">
              Still having issues? Open an issue on{" "}
              <a href="https://github.com/yusufsafary/standboy" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:opacity-80">GitHub</a>
              {" "}or reach out on{" "}
              <a href="https://x.com/standboyltd" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:opacity-80">X @standboyltd</a>.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-wide text-foreground text-sm">Want a detailed walkthrough?</p>
            <p className="text-xs text-muted-foreground mt-1">Read the complete setup guide including ROM configuration.</p>
          </div>
          <button
            onClick={() => navigate("/how-to")}
            className="text-xs uppercase tracking-widest text-muted-foreground border border-border px-5 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            Complete How-To Guide →
          </button>
        </div>
      </div>
    </div>
  );
}
