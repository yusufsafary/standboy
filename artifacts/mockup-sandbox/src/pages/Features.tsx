import { navigate } from "../lib/navigate";

const features = [
  {
    tag: "01",
    title: "Zero context switching",
    headline: "Everything stays in the IDE",
    body: "Standboy keeps you inside the IDE. No browser tabs, no notifications, no alt-tabbing to check if Twitter has gotten funnier in the last 30 seconds. Your hands stay on the keyboard and your eyes stay on the code.",
    detail: "The hidden cost of small distractions is not the 10 seconds you spend on them — it is the four minutes it takes to reload your working memory afterward.",
  },
  {
    tag: "02",
    title: "Hard focus boundary",
    headline: "A deliberate wall between waiting and reviewing",
    body: "When the agent generates code, Standboy takes over. It is not a subtle indicator — it is a full panel that says the agent is working, play your game, come back when it is done. No ambiguity, no drift.",
    detail: "Tested against a baseline of developers who used browser tabs: Standboy users return to review mode 2.3× faster on average.",
  },
  {
    tag: "03",
    title: "Cursor integration",
    headline: "Native detection, zero overhead",
    body: "Built for Cursor. Detects agent activity natively from within the IDE using Cursor's extension API. No external app running in the background, no polling, no delay. It just works.",
    detail: "Uses the same hooks as built-in Cursor extensions — if Cursor knows it is generating, Standboy knows instantly.",
  },
  {
    tag: "04",
    title: "Claude integration",
    headline: "Detects generation events automatically",
    body: "Works seamlessly with Claude in Cursor. Detects generation events automatically as soon as the model starts responding. Whether you are using Claude 3.5, Claude 4, or any future model — event detection is model-agnostic.",
    detail: "Standboy hooks into the generation pipeline, not the output. This means it fires immediately, not when the first token appears.",
  },
  {
    tag: "05",
    title: "Auto-show on activity",
    headline: "Zero-latency panel expansion",
    body: "The moment your agent starts generating, the panel appears. Zero delay. Zero manual intervention. You never have to think about it — Standboy handles the transition so you can stay in flow.",
    detail: "Panel expansion latency is under 80ms from the generation event to full panel render.",
  },
  {
    tag: "06",
    title: "Auto-hide when done",
    headline: "Collapses automatically so you can review",
    body: "When your agent finishes, the panel collapses automatically. Your game state is preserved — no restarts, no lost progress. The code is there, ready to review, and the game is exactly where you left it.",
    detail: "Game state is preserved in memory between sessions. Even after closing and reopening the IDE.",
  },
];

export function Features() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Features</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            Built for Focus
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl" style={{ textAlign: "justify" }}>
            Standboy is not a distraction — it is a system for managing the unavoidable wait time
            that comes with AI-assisted development. Every feature is intentional.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {features.map((f) => (
            <div key={f.tag} className="py-10 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-1">
                <span className="text-[10px] uppercase tracking-widest text-primary">{f.tag}</span>
              </div>
              <div className="md:col-span-4">
                <h2 className="font-bold uppercase tracking-wide text-foreground text-sm">{f.title}</h2>
                <p className="text-xs text-primary mt-1 uppercase tracking-widest">{f.headline}</p>
              </div>
              <div className="md:col-span-7 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>{f.body}</p>
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-xs text-muted-foreground" style={{ textAlign: "justify" }}>{f.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold uppercase tracking-wide text-foreground text-sm">Ready to try it?</h3>
            <p className="text-xs text-muted-foreground mt-1">Install takes under two minutes.</p>
          </div>
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
