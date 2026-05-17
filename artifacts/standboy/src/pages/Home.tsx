import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GameboyEmulator } from "@/components/GameboyEmulator";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Zap, EyeOff, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1">

        {/* ── HERO — 2-column: copy left, emulator right ── */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — copy */}
              <div className="flex flex-col gap-7 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-1.5 text-primary text-xs font-mono uppercase tracking-widest w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Status: Ready
                </div>

                <h1 className="leading-tight">
                  Your IDE sidekick that keeps you focused
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  Standboy detects when your AI agent is generating code and
                  instantly opens a Game Boy emulator in your sidebar — then
                  vanishes the moment generation stops. Stay in the zone,
                  always.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/install" data-testid="hero-install">
                    <Button
                      size="lg"
                      className="h-13 px-8 text-base rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all duration-200 group"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
                      Install Standboy
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-13 px-8 text-base rounded-none border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
                    >
                      How it works
                    </Button>
                  </Link>
                </div>

                <p className="text-xs font-mono text-muted-foreground/60 tracking-wide">
                  Try the demo → click START or press Enter
                </p>
              </div>

              {/* Right — live emulator */}
              <div
                className="flex justify-center lg:justify-end animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                {/* Glow halo behind the shell */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: "#A8FF2E", transform: "scale(0.7)" }}
                  />
                  <GameboyEmulator />
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ── VALUE PROPS ── */}
        <section className="py-24 border-t border-border/40">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40">
              {[
                {
                  icon: <Zap className="w-5 h-5 text-primary" />,
                  tag: "01 // AUTO-TRIGGER",
                  title: "Auto-show on agent activity",
                  body: "Detects when Cursor or Claude is generating and expands the panel instantly — zero setup, zero clicks.",
                },
                {
                  icon: <EyeOff className="w-5 h-5 text-primary" />,
                  tag: "02 // NO SWITCHING",
                  title: "Zero context switching",
                  body: "Stop tabbing to Twitter. Keep your hands on the keyboard and your attention inside the IDE.",
                },
                {
                  icon: <Cpu className="w-5 h-5 text-primary" />,
                  tag: "03 // SEAMLESS",
                  title: "Emulator resumes mid-frame",
                  body: "Game state is preserved every session. The moment the agent finishes, the game pauses exactly where you left off.",
                },
              ].map(({ icon, tag, title, body }) => (
                <div
                  key={tag}
                  className="bg-background p-8 flex flex-col gap-4 hover:bg-card transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-primary font-mono text-xs uppercase tracking-widest">{tag}</span>
                  </div>
                  <div className="font-bold text-lg leading-snug text-foreground">{title}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── NARRATIVE ── */}
        <section className="py-24 border-t border-border/40 bg-card/30">
          <Container className="max-w-2xl">
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <p className="text-primary font-mono text-xs uppercase tracking-widest">The problem</p>
                <h2 className="leading-tight">3 seconds of waiting<br />costs 15 minutes of focus</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AI agents are fast — but they're not instant. A 3-second wait for a small refactor.
                  A 7-second wait for a new component. These micro-breaks feel harmless, but they're
                  devastating to your flow state.
                </p>
                <p>
                  When the cursor pauses, your brain hunts for dopamine. You alt-tab to Twitter.
                  You check Slack. A 5-second generation window becomes a 15-minute distraction spiral.
                </p>
                <p className="text-foreground font-medium">
                  Standboy closes that escape route — by giving your brain exactly what it needs,
                  right inside the IDE.
                </p>
              </div>
              <Link href="/about">
                <span className="text-primary font-mono text-sm hover:underline underline-offset-4 transition-all">
                  Read the full story →
                </span>
              </Link>
            </div>
          </Container>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-20 border-t border-border/40">
          <Container className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="mb-2">Ready to stay in the zone?</h2>
              <p className="text-muted-foreground">Works with Cursor and Claude out of the box.</p>
            </div>
            <Link href="/install">
              <Button size="lg" className="shrink-0 h-13 px-10 text-base rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all duration-200">
                Install Now
              </Button>
            </Link>
          </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
}
