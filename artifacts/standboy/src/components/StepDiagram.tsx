const STEPS = [
  { num: 1, label: "Agent starts generating",  note: "Cursor / Claude begins output",   active: false },
  { num: 2, label: "Standboy panel expands",    note: "Sidebar opens instantly",         active: true  },
  { num: 3, label: "Emulator resumes",          note: "Game picks up mid-frame",         active: true  },
  { num: 4, label: "Agent finishes",            note: "Generation complete",             active: false },
  { num: 5, label: "Standboy collapses",        note: "Panel closes automatically",      active: false },
  { num: 6, label: "Emulator pauses",           note: "State saved for next time",       active: false },
];

export function StepDiagram() {
  return (
    <div className="flex flex-col" data-testid="step-diagram">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex gap-6 group">
          {/* Left: number + connector */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className={`w-9 h-9 flex items-center justify-center border-2 font-bold text-sm z-10 font-mono
                transition-all duration-300
                ${step.active
                  ? "border-primary text-primary bg-primary/10 shadow-[0_0_12px_rgba(168,255,46,0.15)]"
                  : "border-border text-muted-foreground bg-background"}`}
            >
              {step.num}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-px flex-1 min-h-[40px] transition-colors duration-300 ${
                  step.active ? "bg-primary/40" : "bg-border/50"
                }`}
              />
            )}
          </div>

          {/* Right: content */}
          <div className={`pb-8 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
            <p
              className={`font-mono font-bold text-sm leading-none mt-2 transition-colors duration-300 ${
                step.active ? "text-primary" : "text-foreground"
              }`}
            >
              {step.label}
            </p>
            <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed">{step.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
