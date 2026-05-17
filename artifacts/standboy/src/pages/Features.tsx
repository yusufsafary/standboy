import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";

export default function Features() {
  const features = [
    {
      title: "Auto-show on agent activity",
      description: "Standboy detects when your agent starts generating and instantly expands the panel."
    },
    {
      title: "Auto-hide when idle",
      description: "When your agent finishes, the panel collapses automatically so you can get back to work."
    },
    {
      title: "Emulator resumes mid-frame",
      description: "Your game state is preserved between sessions. No restarts, no lost progress."
    },
    {
      title: "Hard focus boundary",
      description: "Standboy keeps you inside the IDE. No browser tabs, no notifications."
    },
    {
      title: "Cursor integration",
      description: "Built for Cursor. Detects agent activity natively from within the IDE."
    },
    {
      title: "Claude integration",
      description: "Works seamlessly with Claude in Cursor. Detects generation events automatically."
    }
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container>
          <div className="mb-16">
            <h1 className="mb-4">Features</h1>
            <p className="text-muted-foreground max-w-2xl">Everything you need to survive those 5-second wait times without losing your mind to the timeline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} id={i + 1} title={f.title} description={f.description} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
