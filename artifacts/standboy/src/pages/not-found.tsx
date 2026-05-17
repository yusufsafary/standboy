import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <Container className="text-center flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="font-mono font-bold text-primary leading-none"
            style={{ fontSize: "clamp(80px, 20vw, 140px)", lineHeight: 1, textShadow: "0 0 40px rgba(168,255,46,0.2)" }}>
            404
          </div>
          <h2 className="text-foreground">ROM Not Found</h2>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            This page doesn't exist. Maybe the cartridge isn't inserted correctly?
          </p>
          <Link href="/">
            <span className="inline-block px-8 py-3 border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors duration-200 cursor-pointer">
              ← Return Home
            </span>
          </Link>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
