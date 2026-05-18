import { Emulator } from "../components/landing/Emulator";
import { IDEDemo } from "../components/landing/IDEDemo";
import { navigate } from "../lib/navigate";

const features = [
  {
    tag: "01",
    title: "Zero context switching",
    desc: "Standboy keeps you inside the IDE. No browser tabs, no notifications. Your hands stay on the keyboard and your eyes stay on the code — exactly where they belong.",
  },
  {
    tag: "02",
    title: "Hard focus boundary",
    desc: "When the agent generates, Standboy takes over with a deliberate boundary between waiting and reviewing. No ambiguity, no drift, no accidental Twitter spirals.",
  },
  {
    tag: "03",
    title: "Cursor integration",
    desc: "Built for Cursor. Detects agent activity natively from within the IDE using Cursor's extension API. No external app, no polling — it fires the moment generation starts.",
  },
  {
    tag: "04",
    title: "Claude integration",
    desc: "Works seamlessly with Claude in Cursor. Detects generation events automatically as soon as the model starts responding — model-agnostic by design.",
  },
  {
    tag: "05",
    title: "Auto-show on activity",
    desc: "The moment your agent starts generating, the panel appears. Zero delay. Zero manual intervention. The transition is invisible and instantaneous.",
  },
  {
    tag: "06",
    title: "Auto-hide when done",
    desc: "When generation completes, the panel collapses automatically. Your game state is preserved. The code is there. You review it. Clean handoff every time.",
  },
];

export function Home() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="pt-14 pb-10 px-5 max-w-5xl mx-auto">
        {/* STATUS badge */}
        <div className="inline-flex items-center gap-2 border border-primary/40 px-3 py-1 text-[11px] uppercase tracking-widest text-primary mb-8">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Status: Ready
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6 max-w-2xl uppercase" style={{ letterSpacing: "-0.01em" }}>
          Your IDE sidekick that keeps you focused
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl" style={{ textAlign: "justify", hyphens: "auto" }}>
          Standboy detects when your AI agent is generating code and instantly opens a
          Game Boy emulator in your sidebar — then vanishes the moment generation stops.
          Stay in the zone, always.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-3 mb-6">
          <button
            onClick={() => navigate("/install")}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-6 py-3 hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Install Standboy
          </button>
          <button
            onClick={() => navigate("/how-it-works")}
            className="inline-flex items-center gap-3 border border-border text-foreground font-bold uppercase tracking-widest text-sm px-6 py-3 hover:border-primary transition-colors"
          >
            How it works
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
          Try the demo → click START or press Enter
        </p>
      </section>

      {/* Emulator — at the top, by itself */}
      <section className="border-t border-border bg-card/40 py-10 px-5">
        <div className="max-w-xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-primary">// Live demo — playable in browser</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">↑↓ move · Space fire</span>
          </div>
          <Emulator autoPlay={false} />
          <p className="mt-3 text-[11px] text-muted-foreground text-center" style={{ textAlign: "justify" }}>
            This is what runs inside your IDE while Claude generates your code.
            Click START, play a round, and imagine it appearing automatically
            every time you trigger an AI generation — then disappearing the moment the agent is done.
          </p>
        </div>
      </section>

      {/* X bridging */}
      <section className="border-t border-border py-10 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">// Follow for updates</p>
            <p className="text-sm text-muted-foreground max-w-sm" style={{ textAlign: "justify" }}>
              Get release notes, tips, and early access to new features directly in your timeline.
            </p>
          </div>
          <a
            href="https://x.com/standboyltd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary text-primary font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            Follow @standboyltd
          </a>
        </div>
      </section>

      {/* IDE Demo */}
      <section className="border-t border-border py-16 px-5 bg-card/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Simulation</p>
            <h2 className="text-xl md:text-2xl font-bold uppercase text-foreground tracking-tight">
              A perfectly synchronized dance
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl" style={{ textAlign: "justify" }}>
              Between your AI agent and your procrastination.
              Automated, invisible, perfectly timed — every time you run a generation.
            </p>
          </div>
          <IDEDemo />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Built for focus</p>
            <h2 className="text-xl md:text-2xl font-bold uppercase text-foreground tracking-tight">
              Every feature is intentional
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {features.map((f) => (
              <div key={f.tag} className="flex flex-col gap-3 p-6 bg-background">
                <span className="text-[10px] uppercase tracking-widest text-primary">{f.tag}</span>
                <h3 className="font-bold text-sm uppercase tracking-wide text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={() => navigate("/features")}
              className="text-xs uppercase tracking-widest text-primary border border-primary/40 px-5 py-2 hover:border-primary transition-colors"
            >
              View all features →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 px-5 bg-card/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase text-foreground tracking-tight mb-2">
              Keep It In The IDE
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg" style={{ textAlign: "justify" }}>
              Every browser tab you open while waiting is a context switch you pay for
              when the agent is done. Four minutes of re-engagement time, per interruption.
              Standboy eliminates that cost.
            </p>
          </div>
          <button
            onClick={() => navigate("/install")}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-7 py-3 hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
