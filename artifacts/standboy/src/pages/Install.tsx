import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Download, ExternalLink, Terminal, Settings, Play } from "lucide-react";

const GITHUB_REPO    = "https://github.com/yusufsafary/standboy";
const GITHUB_RELEASES = `${GITHUB_REPO}/releases/latest`;
const MARKETPLACE_URL = "https://marketplace.visualstudio.com/items?itemName=standboy.standboy";

const STEPS = [
  {
    n: 1,
    icon: <Download className="w-4 h-4" />,
    title: "Download Extension",
    body: 'Install directly from the Cursor / VS Code marketplace, or grab the latest .vsix file from GitHub Releases.',
    code: null,
    actions: (
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <a
          href={GITHUB_RELEASES}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-primary text-primary-foreground font-bold font-mono text-sm border border-primary hover:bg-primary/90 transition-all duration-200"
          data-testid="btn-download-vsix"
        >
          <Download className="w-4 h-4" />
          Download .vsix
        </a>
        <a
          href={MARKETPLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 border border-border text-muted-foreground font-mono text-sm hover:border-primary hover:text-primary transition-all duration-200"
          data-testid="btn-marketplace"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Marketplace
        </a>
      </div>
    ),
  },
  {
    n: 2,
    icon: <Settings className="w-4 h-4" />,
    title: "Enable Standboy Panel",
    body: "Open your IDE settings (JSON) and add the following block. Point romDirectory at your local .gb / .gbc ROMs folder.",
    code: `{
  "standboy.romDirectory": "~/.standboy/roms",
  "standboy.autoShow": true,
  "standboy.autoHide": true
}`,
    actions: null,
  },
  {
    n: 3,
    icon: <Terminal className="w-4 h-4" />,
    title: "Place Your ROMs",
    body: "Drop any .gb or .gbc ROM file into the directory you configured above. Standboy will pick it up automatically — no restart needed.",
    code: "~/.standboy/roms/tetris.gb",
    actions: null,
  },
  {
    n: 4,
    icon: <Play className="w-4 h-4" />,
    title: "Start Coding",
    body: "Ask your agent to build something. The panel appears automatically when generation begins and collapses when it ends.",
    code: null,
    actions: null,
  },
];

const ISSUES = [
  {
    q: "Panel not showing automatically?",
    a: "Make sure the activity listener is enabled. Add this to your settings.json:",
    code: '"standboy.listener.enabled": true',
  },
  {
    q: "No ROM loaded on startup?",
    a: "Standboy needs at least one .gb or .gbc file in your romDirectory. Use an absolute path:",
    code: '"standboy.romDirectory": "/Users/you/.standboy/roms"',
  },
  {
    q: "Panel opens but screen is black?",
    a: "Your ROM may be incompatible. Standboy supports Game Boy (.gb) and Game Boy Color (.gbc). GBA files are not supported.",
    code: null,
  },
  {
    q: "Works in Cursor but not VS Code?",
    a: "Full agent-detection requires Cursor 0.40+. In VS Code, trigger manually via the command palette:",
    code: "> Standboy: Toggle Panel",
  },
  {
    q: "How do I update to a newer version?",
    a: "Download the latest .vsix from GitHub Releases and run Install from VSIX in your IDE, or update via the marketplace.",
    code: null,
  },
];

export default function Install() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 md:py-28">
        <Container className="max-w-3xl">

          {/* ── Page header ── */}
          <div className="mb-16 animate-fade-in-up">
            <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">Install</p>
            <h1 className="mb-4">Up and running in 2 minutes</h1>
            <p className="text-muted-foreground leading-relaxed">
              Four steps. No account required. Works on macOS, Windows, and Linux.
            </p>
          </div>

          {/* ── Download hero ── */}
          <div
            className="bg-card border border-primary/30 p-8 mb-16 flex flex-col sm:flex-row sm:items-center gap-6 animate-fade-in-up"
            style={{ animationDelay: "40ms" }}
          >
            <div className="flex-1">
              <p className="font-bold text-lg mb-1">Latest release</p>
              <p className="text-muted-foreground text-sm">
                Grab the .vsix directly from GitHub, or install via the Cursor/VS Code marketplace.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={GITHUB_RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-primary text-primary-foreground font-bold font-mono text-sm border border-primary hover:bg-primary/90 transition-all duration-200 whitespace-nowrap"
                data-testid="btn-hero-download"
              >
                <Download className="w-4 h-4" />
                Download .vsix
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 border border-border text-muted-foreground font-mono text-sm hover:border-primary hover:text-primary transition-all duration-200"
                data-testid="btn-github"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* ── Steps ── */}
          <div className="flex flex-col gap-0 mb-20 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`flex gap-6 ${i < STEPS.length - 1 ? "pb-12 border-b border-border/40 mb-12" : ""}`}
              >
                {/* Number */}
                <div className="shrink-0 w-10 h-10 bg-primary/10 border border-primary text-primary flex items-center justify-center font-bold font-mono text-sm">
                  {step.n}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">{step.icon}</span>
                    <h3 className="leading-none">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-0">{step.body}</p>
                  {step.code && (
                    <pre className="mt-4 bg-[#0b0d10] border border-border/60 p-5 font-mono text-sm text-primary overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                      {step.code}
                    </pre>
                  )}
                  {step.actions}
                </div>
              </div>
            ))}
          </div>

          {/* ── Troubleshooting ── */}
          <div className="border-t border-border pt-16 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">Troubleshooting</p>
            <h2 className="mb-10">Common issues</h2>

            <div className="flex flex-col gap-3">
              {ISSUES.map((item, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border open:border-primary/40 transition-colors duration-200"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-bold text-sm hover:text-primary transition-colors duration-200 select-none gap-4">
                    <span>{item.q}</span>
                    <span className="text-muted-foreground font-mono text-xl leading-none group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-5 border-t border-border/40">
                    <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-0">{item.a}</p>
                    {item.code && (
                      <code className="block mt-3 bg-background border border-border/60 px-4 py-3 text-xs font-mono text-primary break-all">
                        {item.code}
                      </code>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── Still stuck? ── */}
          <div className="mt-12 border border-border/50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">Still stuck?</p>
              <p className="text-muted-foreground text-sm">Open a GitHub issue and we'll get back to you.</p>
            </div>
            <a
              href={`${GITHUB_REPO}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 border border-border text-muted-foreground font-mono text-xs hover:border-primary hover:text-primary transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open an issue
            </a>
          </div>

        </Container>
      </main>

      <Footer />
    </div>
  );
}
