import { Link } from "wouter";
import { PixelLogo } from "./PixelLogo";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/90 backdrop-blur-sm z-50">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
          <PixelLogo className="transition-transform group-hover:scale-110" />
          <span className="font-bold text-lg tracking-tight text-foreground">STANDBOY</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-features">Features</Link>
          <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-how-it-works">How It Works</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-about">About</Link>
          <Link href="/install" data-testid="link-install">
            <Button variant="default" className="font-bold text-primary-foreground rounded-none border border-primary hover:bg-primary/90">
              Install
            </Button>
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" className="text-muted-foreground" data-testid="btn-mobile-menu">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
