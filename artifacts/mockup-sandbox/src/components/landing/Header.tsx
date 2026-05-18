import { useState, useEffect } from "react";
import { navigate } from "../../lib/navigate";
import { LogoMark } from "./Logo";

function getLocalPath(): string {
  const base = (import.meta.env.BASE_URL as string).replace(/\/$/, "");
  const { pathname } = window.location;
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
}

export function Header() {
  const [path, setPath] = useState(() => getLocalPath());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setPath(getLocalPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const links = [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "How To", href: "/how-to" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) => path === href;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
          <LogoMark size={26} />
          <span
            className="font-bold text-foreground tracking-widest text-sm uppercase"
            style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em" }}
          >
            STANDBOY
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              className={`text-xs uppercase tracking-widest transition-colors ${
                isActive(l.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Install CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/install")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Install Standboy
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-5 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => { navigate(l.href); setMenuOpen(false); }}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground text-left"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { navigate("/install"); setMenuOpen(false); }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 w-fit mt-2"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Install Standboy
          </button>
        </div>
      )}
    </header>
  );
}
