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
            <a
              href="https://x.com/Standboyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              @Standboyapp
            </a>
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
          <p className="text-xs text-muted-foreground font-mono">
            v1.0.0
          </p>
        </div>
      </Container>
    </footer>
  );
}
