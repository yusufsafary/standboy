import { Container } from "./Container";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 mt-24">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-lg text-foreground">STANDBOY</span>
          <p className="text-sm text-muted-foreground">Your IDE sidekick that keeps you focused.</p>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-features">Features</Link>
          <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-how-it-works">How It Works</Link>
          <Link href="/install" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-install">Install</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="footer-about">About</Link>
        </nav>
      </Container>
    </footer>
  );
}
