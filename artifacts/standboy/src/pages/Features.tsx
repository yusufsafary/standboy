import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";

const FEATURES = [
  {
    title: "Auto-show on agent activity",
    description:
      "Standboy listens for generation events from Cursor and Claude. The moment your agent starts outputting code, the panel expands — no clicks, no shortcuts.",
  },
  {
    title: "Auto-hide when idle",
    description:
      "When your agent finishes, the panel collapses automatically. You're back to staring at your code within milliseconds.",
  },
  {
    title: "Emulator resumes mid-frame",
    description:
      "Your game state is fully preserved between sessions. No restarts, no save screens — exactly where you left off.",
  },
  {
    title: "Hard focus boundary",
    description:
      "Standboy keeps entertainment inside the IDE. No browser tabs open, no notification feeds, no doomscrolling escape hatch.",
  },
  {
    title: "Cursor integration",
    description:
      "Built natively for Cursor. Hooks directly into the agent activity API to detect generation start and stop events.",
  },
  {
    title: "Claude integration",
    description:
      "Works seamlessly with Claude in Cursor. Detects generation events automatically without any extra configuration.",
  },
];

export default function Features() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 md:py-28">
        <Container>

          {/* Page header */}
          <div className="mb-16 max-w-2xl animate-fade-in-up">
            <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">Features</p>
            <h1 className="mb-4">Everything you need to<br className="hidden sm:block" /> survive the wait</h1>
            <p className="text-muted-foreground leading-relaxed">
              Six features built around one idea — keep you inside the IDE, in flow,
              without wasting a single second.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} id={i + 1} title={f.title} description={f.description} />
            ))}
          </div>

        </Container>
      </main>

      <Footer />
    </div>
  );
}
