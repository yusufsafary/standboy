export function StepDiagram() {
  const steps = [
    { num: 1, title: "Agent starts generating", active: false },
    { num: 2, title: "Standboy panel expands", active: true },
    { num: 3, title: "Emulator resumes", active: true },
    { num: 4, title: "Agent finishes", active: false },
    { num: 5, title: "Standboy collapses", active: false },
    { num: 6, title: "Emulator pauses", active: false },
  ];

  return (
    <div className="flex flex-col gap-0 max-w-lg mx-auto" data-testid="step-diagram">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center border-2 font-bold text-sm z-10 bg-background
              ${step.active ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}
            `}>
              {step.num}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-[2px] h-16 ${step.active ? 'bg-primary/50' : 'bg-muted/30'}`} />
            )}
          </div>
          <div className={`mt-1 font-mono ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
}
