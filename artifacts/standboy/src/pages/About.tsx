import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 md:py-28">
        <Container className="max-w-2xl">

          {/* Header */}
          <div className="mb-16 animate-fade-in-up">
            <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">About</p>
            <h1 className="mb-0">About Standboy</h1>
          </div>

          {/* Article */}
          <div className="flex flex-col gap-14 animate-fade-in-up" style={{ animationDelay: "60ms" }}>

            <section className="flex flex-col gap-5">
              <h2>The Hidden Cost of Tiny Wait Times</h2>
              <p className="text-muted-foreground leading-relaxed">
                AI agents are fast — but not instant. A 3-second wait for a small refactor.
                A 7-second pause while a component is generated. These micro-gaps feel harmless,
                but they compound into something devastating.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When the cursor freezes, your brain starts hunting for input. You alt-tab to Twitter.
                You glance at Slack. A 5-second generation window quietly becomes a 15-minute spiral.
                Your flow state — the thing that makes 2-hour coding sessions feel like 20 minutes —
                is gone.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 py-2">
                <p className="text-foreground italic leading-relaxed">
                  "We were losing hours every week not to AI generation, but to the context switches
                  we took while waiting for it."
                </p>
              </blockquote>
            </section>

            <div className="border-t border-border/50" />

            <section className="flex flex-col gap-5">
              <h2>Keep It In The IDE</h2>
              <p className="text-muted-foreground leading-relaxed">
                Standboy is built on one simple premise: if your brain needs a break during a wait,
                that break should happen inside your editor — not on the open web.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By opening a lightweight, fully state-preserved game right in your sidebar,
                Standboy satisfies the brain's need for activity without letting it escape the
                IDE environment. When the agent finishes, the game vanishes. You're back,
                staring right at the newly generated code.
              </p>
            </section>

            <div className="border-t border-border/50" />

            <section className="flex flex-col gap-5">
              <h2>Built for Focus</h2>
              <p className="text-muted-foreground leading-relaxed">
                It sounds playful — and it is — but Standboy is a seriously technical tool.
                No internet, no feeds, no notifications. Just you, your code, and a tiny
                Game Boy screen that appears exactly when you need it and disappears exactly
                when you don't.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The goal isn't entertainment. The goal is for the next time your agent finishes,
                you look up from the game and realise you never left the zone.
              </p>
            </section>

            <div className="border-t border-border/50 pt-2">
              <Link href="/install">
                <span className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold font-mono text-sm hover:bg-primary/90 transition-colors duration-200 cursor-pointer border border-primary">
                  Install Standboy →
                </span>
              </Link>
            </div>

          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
