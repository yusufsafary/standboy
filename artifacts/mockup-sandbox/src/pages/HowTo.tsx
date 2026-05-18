import { navigate } from "../lib/navigate";

function navigate_to(path: string) { navigate(path); }

function Step({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-t border-border">
      <div className="md:col-span-1">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{num}</span>
      </div>
      <div className="md:col-span-11">
        <h3 className="font-bold uppercase tracking-wide text-foreground text-sm mb-3">{title}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-3 max-w-2xl" style={{ textAlign: "justify" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function HowTo() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// How To</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            Complete Setup Guide
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl" style={{ textAlign: "justify" }}>
            Everything you need to get Standboy running — from installation to advanced
            configuration. This guide assumes you are using Cursor with an active Claude integration.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-0">Part 1 — Installation</h2>

          <Step num="1.1" title="Install the extension">
            <p>
              Open Cursor and navigate to the Extensions panel (
              <code className="bg-card border border-border px-1 text-[11px]">Ctrl+Shift+X</code> on Windows/Linux,
              <code className="bg-card border border-border px-1 text-[11px]">Cmd+Shift+X</code> on macOS).
              Search for "Standboy" and click Install.
            </p>
            <p>
              Alternatively, download the <code className="bg-card border border-border px-1 text-[11px]">.vsix</code> file
              from the{" "}
              <a href="https://github.com/yusufsafary/standboy" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:opacity-80">GitHub releases page</a>{" "}
              and install manually via:
            </p>
            <pre className="bg-card border border-border p-4 text-[11px] overflow-x-auto">
{`cursor --install-extension standboy-<version>.vsix`}
            </pre>
          </Step>

          <Step num="1.2" title="Verify installation">
            <p>
              After installation, you should see a Standboy status bar item in the bottom-right
              corner of the IDE. It will display{" "}
              <span className="text-primary font-mono text-[11px]">SB: Ready</span> when the extension
              is active and listening for agent events.
            </p>
            <p>
              If the status bar item does not appear, reload the IDE window:{" "}
              <code className="bg-card border border-border px-1 text-[11px]">Ctrl+Shift+P</code> →
              "Developer: Reload Window".
            </p>
          </Step>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-0">Part 2 — Configuration</h2>

          <Step num="2.1" title="Core settings">
            <p>
              Open your IDE settings JSON (
              <code className="bg-card border border-border px-1 text-[11px]">Ctrl+Shift+P</code> →
              "Open User Settings (JSON)") and add the following:
            </p>
            <pre className="bg-[#0d0d0d] border border-border p-4 text-[11px] text-[#d4d4d4] overflow-x-auto leading-relaxed">
{`{
  // Required: enables the extension
  "standboy.enabled": true,

  // Required: enables detection of agent generation events
  "standboy.activityListener": true,

  // Panel position: "right" (default) or "left"
  "standboy.expandPosition": "right",

  // Panel width in pixels (default: 400)
  "standboy.panelWidth": 400,

  // Delay before panel closes after generation stops (ms)
  "standboy.collapseDelay": 0,

  // Disable telemetry (optional)
  "standboy.telemetry": true
}`}
            </pre>
          </Step>

          <Step num="2.2" title="Configure your ROM directory (optional)">
            <p>
              Standboy ships with a built-in Space Invaders game — no ROM required.
              If you want to play your own retro games, point Standboy at a directory
              containing your ROM files:
            </p>
            <pre className="bg-[#0d0d0d] border border-border p-4 text-[11px] text-[#d4d4d4] overflow-x-auto leading-relaxed">
{`{
  // Path to a directory containing ROM files
  "standboy.romDirectory": "~/.roms",

  // Which game to load by default ("built-in" or a ROM filename)
  "standboy.defaultGame": "built-in"
}`}
            </pre>
            <p>
              Supported ROM formats:{" "}
              <code className="bg-card border border-border px-1 text-[11px]">.nes</code>{" "}
              <code className="bg-card border border-border px-1 text-[11px]">.sfc</code>{" "}
              <code className="bg-card border border-border px-1 text-[11px]">.gb</code>{" "}
              <code className="bg-card border border-border px-1 text-[11px]">.gba</code>.
              You are responsible for ensuring you have legal rights to any ROM files you use.
            </p>
          </Step>

          <Step num="2.3" title="Keyboard shortcuts">
            <p>
              Standboy responds to the following keyboard shortcuts while the panel is open:
            </p>
            <div className="grid grid-cols-2 gap-px bg-border text-[11px]">
              {[
                ["Arrow keys", "Move player"],
                ["Space", "Fire / shoot"],
                ["Enter", "Start / restart game"],
                ["Escape", "Manually collapse panel"],
                ["Ctrl+Shift+S", "Toggle Standboy on/off"],
                ["Ctrl+Shift+G", "Manually open game panel"],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between gap-4 bg-background px-3 py-2">
                  <code className="text-primary">{key}</code>
                  <span className="text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
          </Step>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-0">Part 3 — Troubleshooting</h2>

          <Step num="3.1" title="Panel does not appear during generation">
            <p>
              Ensure <code className="bg-card border border-border px-1 text-[11px]">standboy.activityListener</code>{" "}
              is set to <code className="bg-card border border-border px-1 text-[11px]">true</code>.
              This setting must be explicitly enabled — it is not enabled by default on fresh installs.
            </p>
            <p>
              Also verify that the Cursor agent (not just inline autocomplete) is triggering
              generation. Standboy detects agent generation events — it does not fire on
              tab-completion or ghost text events.
            </p>
          </Step>

          <Step num="3.2" title="ROM Not Found error">
            <p>
              This error appears when{" "}
              <code className="bg-card border border-border px-1 text-[11px]">standboy.romDirectory</code>{" "}
              is set to a path that does not exist, is empty, or contains no supported ROM files.
            </p>
            <p>
              Reset to the built-in game by removing the <code className="bg-card border border-border px-1 text-[11px]">romDirectory</code>{" "}
              key from your settings, or explicitly set it to null:
            </p>
            <pre className="bg-[#0d0d0d] border border-border p-4 text-[11px] text-[#d4d4d4] overflow-x-auto">
{`"standboy.romDirectory": null,
"standboy.defaultGame": "built-in"`}
            </pre>
          </Step>

          <Step num="3.3" title="Game canvas appears blank">
            <p>
              Click the panel once to focus it, then press Enter to initialize the game.
              On first render, some GPU configurations require a focus event to trigger the
              canvas repaint.
            </p>
            <p>
              If the issue persists, restart the extension host:{" "}
              <code className="bg-card border border-border px-1 text-[11px]">Ctrl+Shift+P</code> →
              "Restart Extension Host".
            </p>
          </Step>
        </section>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate_to("/install")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ← Install Guide
          </button>
          <button
            onClick={() => navigate_to("/how-it-works")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works →
          </button>
        </div>
      </div>
    </div>
  );
}
