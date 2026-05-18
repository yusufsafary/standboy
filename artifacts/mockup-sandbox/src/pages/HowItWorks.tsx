import { Emulator } from "../components/landing/Emulator";
import { IDEDemo } from "../components/landing/IDEDemo";
import { navigate } from "../lib/navigate";

const steps = [
  {
    num: "01",
    title: "Agent starts generating",
    detail: "You ask Claude or Cursor Agent to build something — a component, a function, a refactor. The agent begins generating. This is the trigger event.",
    code: `// You type in Cursor:
// "Build a useAuth hook with JWT refresh"
// Agent starts responding...
// [standboy.generation.start event fires]`,
  },
  {
    num: "02",
    title: "Standboy panel expands",
    detail: "Standboy detects the generation event and expands the panel in under 80ms — no clicks, no hotkeys, no manual action required.",
    code: `// standboy.config (settings.json)
{
  "standboy.activityListener": true,
  "standboy.expandPosition": "right",
  "standboy.panelWidth": 400
}`,
  },
  {
    num: "03",
    title: "Emulator resumes",
    detail: "Your game resumes mid-frame, exactly where you left it. Whether you were on level 3 or mid-battle — Standboy preserves the exact state.",
    code: `// Game state snapshot (auto-saved)
{
  "level": 3,
  "score": 4820,
  "lives": 2,
  "frameIndex": 1247,
  "entities": [...]
}`,
  },
  {
    num: "04",
    title: "Agent finishes",
    detail: "The agent completes its task. Standboy detects the generation.end event. The transition back is as fast as the transition in.",
    code: `// Event log
[11:32:14] standboy.generation.start
[11:32:47] standboy.generation.end
[11:32:47] standboy.collapse()
// 33 seconds of focused waiting`,
  },
  {
    num: "05",
    title: "Standboy collapses",
    detail: "The panel automatically collapses so you can review the generated code. No residual UI, no distraction. Clean handoff every time.",
    code: `// Transition timing
collapseDelay:    0ms
collapseDuration: 200ms
focusReturn:      "editor"
scrollPosition:   preserved`,
  },
  {
    num: "06",
    title: "Emulator pauses",
    detail: "Your game pauses immediately, preserving state between sessions. No restarts, no lost progress. Come back to it on the next generation.",
    code: `// State persisted to:
~/.cursor/standboy/game-state.json
// Auto-restored on next trigger`,
  },
];

export function HowItWorks() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// How It Works</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            A perfectly synchronized dance
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto" style={{ textAlign: "justify" }}>
            Between your AI agent and your procrastination.
            Automated, invisible, and perfectly timed — every time you trigger a generation.
          </p>
        </div>

        {/* Interactive demo */}
        <div className="mb-20">
          <IDEDemo />
        </div>

        {/* Step breakdown */}
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-0">Step by step</h2>
          <div className="flex flex-col gap-0">
            {steps.map((s) => (
              <div key={s.num} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-border">
                <div className="md:col-span-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.num}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-bold uppercase tracking-wide text-foreground text-sm">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed" style={{ textAlign: "justify" }}>{s.detail}</p>
                </div>
                <div className="md:col-span-7">
                  <pre className="bg-card border border-border p-4 text-[11px] text-muted-foreground overflow-x-auto leading-relaxed">
                    {s.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emulator demo */}
        <div className="border-t border-border pt-14">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// The Emulator</p>
              <h2 className="text-lg font-bold uppercase tracking-tight text-foreground mb-3">
                Playable. Right now.
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ textAlign: "justify" }}>
                Standboy ships with a built-in Space Invaders emulator — no ROM needed,
                no setup required. Click START, play, and imagine it appearing automatically
                every time Claude starts generating code in your IDE.
              </p>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                <p>→ Arrow keys to move</p>
                <p>→ Space to fire</p>
                <p>→ Game pauses on generation complete</p>
                <p>→ State preserved between sessions</p>
              </div>
              <div className="mt-5 p-4 bg-card border border-border">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">settings.json</p>
                <pre className="text-[11px] text-muted-foreground leading-relaxed">
{`{
  "standboy.romDirectory": "~/.roms",
  "standboy.defaultGame": "built-in",
  "standboy.activityListener": true
}`}
                </pre>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:max-w-xs">
              <Emulator autoPlay={false} />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-bold uppercase tracking-wide text-foreground text-sm">Ready to install?</p>
          <button
            onClick={() => navigate("/install")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs px-6 py-2.5 hover:opacity-90 transition-opacity"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Install Standboy
          </button>
        </div>
      </div>
    </div>
  );
}
