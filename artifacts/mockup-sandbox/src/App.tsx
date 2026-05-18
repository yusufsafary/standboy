import { useEffect, useState, type ComponentType } from "react";
import { modules as discoveredModules } from "./.generated/mockup-components";
import { Header } from "./components/landing/Header";
import { Footer } from "./components/landing/Footer";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { HowItWorks } from "./pages/HowItWorks";
import { HowTo } from "./pages/HowTo";
import { About } from "./pages/About";
import { Install } from "./pages/Install";
import { Legal } from "./pages/Legal";
import { Cookies } from "./pages/Cookies";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(mod: Record<string, unknown>, name: string): ComponentType | undefined {
  const fns = Object.values(mod).filter((v) => typeof v === "function") as ComponentType[];
  return (mod.default as ComponentType) || (mod.Preview as ComponentType) || (mod[name] as ComponentType) || fns[fns.length - 1];
}

function PreviewRenderer({ componentPath, modules }: { componentPath: string; modules: ModuleMap }) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setComponent(null);
    setError(null);
    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) { setError(`No component found at ${componentPath}.tsx`); return; }
      try {
        const mod = await loader();
        if (cancelled) return;
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) { setError(`No exported React component found in ${componentPath}.tsx`); return; }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) return;
        setError(`Failed to load preview.\n${e instanceof Error ? e.message : String(e)}`);
      }
    }
    void loadComponent();
    return () => { cancelled = true; };
  }, [componentPath, modules]);

  if (error) return <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>{error}</pre>;
  if (!Component) return null;
  return <Component />;
}

function getBasePath(): string {
  return (import.meta.env.BASE_URL as string).replace(/\/$/, "");
}

function getLocalPath(): string {
  const basePath = getBasePath();
  const { pathname } = window.location;
  return basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
}

function useRouter() {
  const [path, setPath] = useState(() => getLocalPath());
  useEffect(() => {
    const handler = () => setPath(getLocalPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return path;
}

function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">404</span>
      <h1 className="text-xl font-bold uppercase tracking-tight text-foreground">Page not found</h1>
      <button
        onClick={() => { window.history.pushState({}, "", getBasePath() + "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}
        className="text-xs uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mt-2"
      >
        ← Return Home
      </button>
    </div>
  );
}

const LANDING_ROUTES: Record<string, ComponentType> = {
  "/": Home,
  "/features": Features,
  "/how-it-works": HowItWorks,
  "/how-to": HowTo,
  "/about": About,
  "/install": Install,
  "/legal": Legal,
  "/cookies": Cookies,
};

function LandingLayout({ path }: { path: string }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const PageComponent = LANDING_ROUTES[path] ?? NotFound;
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Header />
      <PageComponent />
      <Footer />
    </div>
  );
}

function App() {
  const path = useRouter();
  const previewMatch = path.match(/^\/preview\/(.+)$/);
  if (previewMatch) {
    return <PreviewRenderer componentPath={previewMatch[1]} modules={discoveredModules} />;
  }
  return <LandingLayout path={path} />;
}

export default App;
