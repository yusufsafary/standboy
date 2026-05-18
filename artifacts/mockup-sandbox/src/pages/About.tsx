import { navigate } from "../lib/navigate";

export function About() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// About Standboy</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            The Hidden Cost of Tiny Wait Times
          </h1>
        </div>

        <div className="flex flex-col gap-0">

          <div className="py-8 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>
              When your AI agent starts generating code, you have 10 to 60 seconds of dead time.
              Most developers fill it by opening Twitter, checking Slack, or switching to another
              task. None of these are neutral. Every tab you open is a context switch you pay for
              when the agent finishes.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ textAlign: "justify" }}>
              Cognitive science is clear on this: it takes an average of{" "}
              <strong className="text-foreground">four minutes and twelve seconds</strong>{" "}
              to fully re-engage with an interrupted task. If your agent takes 60 seconds and you
              spend that time on Twitter, you have effectively added four minutes to every generation
              cycle. Multiply that by 50 generations in a workday and you have lost three hours
              to interruptions that felt like nothing at the time.
            </p>
          </div>

          <div className="py-8 border-t border-border">
            <blockquote className="border-l-4 border-primary pl-5">
              <p className="text-base font-bold uppercase tracking-tight text-foreground leading-snug">
                "Stop tabbing out to Twitter.<br />
                Keep your hands on the keyboard<br />
                and your eyes on the IDE."
              </p>
            </blockquote>
          </div>

          <div className="py-8 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Keep It In The IDE</h2>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>
              Standboy's philosophy is simple: the best place to wait is the same place you are
              working. If you have to leave the IDE to stay entertained during generation, that
              is a design failure — of the tool, not of you.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ textAlign: "justify" }}>
              So we built a retro game emulator into the IDE. Not because games are productive,
              but because they are the highest-fidelity way to occupy your hands and attention in
              a way that is immediately reversible. A game pauses cleanly. Twitter does not.
            </p>
          </div>

          <div className="py-8 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Built for Focus</h2>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>
              Standboy is not a productivity app — it is a focus preservation system. The goal
              is not to make you more productive during the wait. It is to make re-entry into
              code review as fast and clean as possible.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ textAlign: "justify" }}>
              The emulator auto-pauses when the agent finishes. The IDE comes back to front.
              Your hands are already on the keyboard. The code is there. You review it.
              No context to reload. No tabs to close. Just code.
            </p>
          </div>

          <div className="py-8 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">By the numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { label: "Context switch cost", value: "4m 12s", sub: "average re-engagement time after an interruption" },
                { label: "Generation wait", value: "10–60s", sub: "typical agent generation time per prompt" },
                { label: "Standboy latency", value: "<80ms", sub: "from generation event to panel fully open" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 p-5 bg-background">
                  <span className="text-3xl font-bold text-primary font-mono">{stat.value}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground mt-1">{stat.label}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-8 border-t border-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Why a game emulator</h2>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ textAlign: "justify" }}>
              We considered several alternatives before landing on the emulator.
              Music — too passive, too easy to keep playing while reviewing code.
              Breathing exercises — nobody actually does them.
              News feed — exactly the problem we are trying to solve.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ textAlign: "justify" }}>
              A game works because it has a hard start and a hard stop. When the agent finishes
              and the panel collapses, the game pauses. There is no ambiguity about whether
              you should still be playing. You are done. The code is in front of you.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/how-it-works")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works →
          </button>
          <button
            onClick={() => navigate("/install")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs px-5 py-2 hover:opacity-90 transition-opacity"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
