import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { PixelLogo } from "./PixelLogo";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/features",     label: "Features"     },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about",        label: "About"        },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-md z-50">
      <Container className="flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
          <PixelLogo className="transition-transform duration-200 group-hover:scale-105" />
          <span className="font-bold text-base tracking-widest text-foreground">STANDBOY</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-mono transition-colors duration-200 hover:text-primary ${
                location === href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://x.com/Akarifujimoto_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Follow on X"
            data-testid="link-x"
          >
            <XIcon className="w-4 h-4" />
          </a>
          <Link href="/install" data-testid="link-install">
            <Button className="rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm px-5 transition-all duration-200">
              Install
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-testid="btn-mobile-menu"
        >
          <span className="transition-all duration-200">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </span>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border/50 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ background: "hsl(var(--background))" }}
      >
        <Container className="py-4 flex flex-col">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center py-4 px-1 font-mono text-base border-b border-border/40 transition-colors duration-200 hover:text-primary ${
                location === href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`mobile-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://x.com/Akarifujimoto_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-4 px-1 font-mono text-base border-b border-border/40 text-muted-foreground hover:text-primary transition-colors duration-200"
            data-testid="mobile-link-x"
            onClick={() => setOpen(false)}
          >
            <XIcon className="w-4 h-4" />
            @Akarifujimoto_
          </a>
          <div className="pt-5 pb-2">
            <Link href="/install" onClick={() => setOpen(false)}>
              <Button
                className="w-full h-12 text-base font-bold rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                data-testid="mobile-link-install"
              >
                Install Standboy
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
