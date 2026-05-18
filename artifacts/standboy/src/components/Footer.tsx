import { Container } from "./Container";
import { Link } from "wouter";

const LINKS = [
  { href: "/features",     label: "Features"     },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/install",      label: "Install"      },
  { href: "/about",        label: "About"        },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-14 mt-10">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm tracking-widest text-foreground">STANDBOY</span>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Your IDE sidekick that keeps you focused. Built for Cursor + Claude.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-200"
                data-testid={`footer-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {label}
              </Link>
            ))}
          </nav>

        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Standboy. All rights reserved.
          </p>

          {/* Orynth badge */}
          <a href="https://orynth.dev/projects/standboy" target="_blank" rel="noopener">
            <img
              src="https://orynth.dev/api/badge/standboy?theme=light&style=default"
              alt="Featured on Orynth"
              width="260"
              height="80"
            />
          </a>

          <p className="text-xs text-muted-foreground font-mono">
            v1.0.0
          </p>
        </div>
      </Container>
    </footer>
  );
}
