import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepDiagram } from "@/components/StepDiagram";

export default function HowItWorks() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container>
          <div className="text-center mb-16">
            <h1 className="mb-4">How It Works</h1>
            <p className="text-muted-foreground">A perfectly synchronized dance between your AI agent and your procrastination.</p>
          </div>
          
          <div className="bg-card border border-border p-12 max-w-3xl mx-auto">
            <StepDiagram />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
