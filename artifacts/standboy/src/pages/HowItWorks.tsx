import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepDiagram } from "@/components/StepDiagram";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 md:py-28">
        <Container>

          <div className="max-w-3xl mx-auto">

            {/* Page header */}
            <div className="mb-16 text-center animate-fade-in-up">
              <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">How It Works</p>
              <h1 className="mb-4">A 6-step loop you'll<br className="hidden sm:block" /> never have to think about</h1>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Standboy runs entirely in the background. The cycle below repeats
                automatically every time your agent generates — no configuration needed.
              </p>
            </div>

            {/* Diagram card */}
            <div
              className="bg-card border border-border p-10 md:p-14 animate-fade-in-up"
              style={{ animationDelay: "80ms" }}
            >
              <StepDiagram />
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center gap-6 justify-center animate-fade-in-up" style={{ animationDelay: "140ms" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-primary bg-primary/10" />
                <span className="text-xs text-muted-foreground font-mono">Standboy active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-border bg-background" />
                <span className="text-xs text-muted-foreground font-mono">Agent / game idle</span>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 border-t border-border/50 pt-12 text-center animate-fade-in-up" style={{ animationDelay: "160ms" }}>
              <h2 className="mb-4">Sounds good. Now install it.</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Setup takes under two minutes. Works with any ROM you already own.
              </p>
              <Link href="/install">
                <span className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold font-mono text-sm hover:bg-primary/90 transition-colors duration-200 cursor-pointer border border-primary">
                  View Install Guide →
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
