import { useEffect, useState, type ComponentType } from "react";
import { modules as discoveredModules } from "./.generated/mockup-components";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }
      try {
        const mod = await loader();
        if (cancelled) return;
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();
    return () => { cancelled = true; };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;
  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function XFollowSection() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 px-4">
      <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        Bridging — Ikuti untuk update terbaru
      </p>
      <p className="text-center text-sm text-muted-foreground max-w-xs">
        Dapatkan komponen terbaru, update desain, dan inspirasi UI langsung di
        timeline X Anda.
      </p>
      <a
        href="https://x.com/standboyltd"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
      >
        <XIcon />
        Follow @standboyltd
      </a>
    </div>
  );
}

function DeviceEmulator() {
  const basePath = getBasePath();
  const examplePath = `${basePath}/preview/ComponentName`;

  return (
    <div className="relative mx-auto w-[280px] select-none">
      <div className="relative rounded-[2.5rem] border-[6px] border-foreground/20 bg-foreground/5 shadow-2xl overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-[18px] w-[80px] rounded-full bg-foreground/20 z-10" />
        <div className="h-[520px] overflow-y-auto rounded-[2rem] bg-background pt-8">
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-foreground/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 12l6.75-6.75M21 12l-6.75-6.75" />
              </svg>
            </div>
            <p className="text-xs font-medium text-foreground/70">
              Preview komponen Anda di sini
            </p>
            <code className="bg-foreground/8 border border-foreground/10 text-[10px] text-foreground/60 px-3 py-1.5 rounded-lg font-mono break-all">
              {examplePath}
            </code>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[4px] w-[80px] rounded-full bg-foreground/20" />
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function PWAInstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pwa-dismissed");
    if (stored) setDismissed(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!prompt || dismissed || installed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-lg mb-3 mx-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/95 backdrop-blur-sm shadow-2xl px-4 py-3.5">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
            <svg className="w-5 h-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Pasang Standboy</p>
            <p className="text-xs text-muted-foreground">Akses lebih cepat langsung dari layar utama</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              className="rounded-lg bg-foreground text-background text-xs font-semibold px-3 py-1.5 hover:opacity-80 transition-opacity"
            >
              Pasang
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-lg text-muted-foreground text-xs px-2 py-1.5 hover:text-foreground transition-colors"
            >
              Nanti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-4 h-4 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="font-semibold text-foreground tracking-tight">Standboy</span>
          </div>
          <a
            href="https://x.com/standboyltd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <XIcon />
            <span className="hidden sm:inline">@standboyltd</span>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-2">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            Component Preview Server
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            Render dan pratinjau komponen UI secara langsung di browser Anda.
          </p>
        </div>

        <XFollowSection />

        <DeviceEmulator />

        <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs">
          Tambahkan komponen ke{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground/70 text-[10px]">
            src/components/mockups/
          </code>{" "}
          untuk melihatnya di emulator
        </p>
      </main>

      <footer className="border-t border-border/40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <span>© 2025 Standboy</span>
          <span>·</span>
          <a
            href="https://x.com/standboyltd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <XIcon />
            <span>@standboyltd</span>
          </a>
        </div>
      </footer>

      <PWAInstallBanner />
    </div>
  );
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  return <Gallery />;
}

export default App;
