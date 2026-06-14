import { navigate } from "../../lib/navigate";
import { LogoMark } from "./Logo";

export function Footer() {
  const nav = [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "How To", href: "/how-to" },
    { label: "About", href: "/about" },
    { label: "Install", href: "/install" },
  ];
  const legal = [
    { label: "Legal", href: "/legal" },
    { label: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 w-fit">
            <LogoMark size={24} />
            <span className="font-bold text-foreground tracking-widest text-sm uppercase">STANDBOY</span>
          </button>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs" style={{ textAlign: "justify" }}>
            Your IDE sidekick that keeps you focused.
            Detects agent activity, opens a game, and gets out of your way
            the moment generation stops.
          </p>
          <a
            href="https://x.com/Akarifujimoto_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            @Akarifujimoto_
          </a>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Navigation</p>
          {nav.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors text-left uppercase tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Legal</p>
          {legal.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors text-left uppercase tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Standboy. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Keep your hands on the keyboard.
          </p>
        </div>
      </div>
    </footer>
  );
}
