import { navigate } from "../lib/navigate";

const LAST_UPDATED = "May 18, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-border">
      <h2 className="font-bold uppercase tracking-widest text-sm text-foreground mb-4">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-3 max-w-3xl" style={{ textAlign: "justify" }}>
        {children}
      </div>
    </div>
  );
}

export function Legal() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Legal</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            Terms of Service &amp; Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By installing, accessing, or using Standboy (the "Extension"), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, do not install or use
            the Extension.
          </p>
          <p>
            Standboy is a VS Code / Cursor IDE extension. Your use of the Extension is also
            subject to the marketplace terms of the platform through which you obtained it.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            Standboy is an IDE extension that monitors AI agent generation activity within Cursor
            and VS Code environments. When generation activity is detected, the Extension opens
            a game panel within the IDE. The panel closes automatically when generation stops.
          </p>
          <p>
            The Extension operates entirely within your local IDE environment. It does not
            transmit your code, prompts, or generated output to any external server operated
            by Standboy.
          </p>
        </Section>

        <Section title="3. Data Collection &amp; Privacy">
          <p>
            Standboy collects minimal telemetry data to improve the product. This includes:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Extension activation and deactivation events (anonymized)</li>
            <li>Panel open/close counts and session durations (aggregated)</li>
            <li>Error reports (stack traces only, no code content)</li>
            <li>IDE version and OS type for compatibility tracking</li>
          </ul>
          <p>
            Standboy does <strong className="text-foreground">not</strong> collect, store, or
            transmit your source code, AI prompts, AI responses, file names, project names,
            or any identifiable personal information beyond what is described above.
          </p>
          <p>
            Telemetry is enabled by default and can be disabled at any time by setting
            <code className="bg-card border border-border px-1 mx-1 text-[11px]">standboy.telemetry: false</code>
            in your IDE settings.
          </p>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            The Standboy Extension, including its source code, design, and documentation,
            is proprietary to Standboy. All rights not expressly granted are reserved.
          </p>
          <p>
            The built-in Space Invaders-style game is an original implementation created for
            Standboy and does not use or reproduce copyrighted ROM data from third parties.
            If you configure the Extension to load your own ROM files, you are solely responsible
            for ensuring you have the right to use those files.
          </p>
        </Section>

        <Section title="5. Disclaimers &amp; Limitation of Liability">
          <p>
            The Extension is provided "as is" without warranties of any kind. Standboy does not
            warrant that the Extension will be error-free, uninterrupted, or compatible with
            all IDE configurations.
          </p>
          <p>
            To the maximum extent permitted by applicable law, Standboy shall not be liable for
            any indirect, incidental, special, or consequential damages arising from your use
            of or inability to use the Extension.
          </p>
        </Section>

        <Section title="6. Changes to These Terms">
          <p>
            Standboy may update these Terms at any time. Continued use of the Extension after
            changes constitutes acceptance of the revised Terms. The "Last updated" date at the
            top of this page reflects the most recent revision.
          </p>
        </Section>

        <Section title="7. Contact">
          <p>
            For questions about these Terms or your privacy, contact us on{" "}
            <a href="https://x.com/standboyltd" target="_blank" rel="noopener noreferrer"
              className="text-primary hover:opacity-80 transition-opacity">
              X @standboyltd
            </a>{" "}
            or open an issue on{" "}
            <a href="https://github.com/yusufsafary/standboy" target="_blank" rel="noopener noreferrer"
              className="text-primary hover:opacity-80 transition-opacity">
              GitHub
            </a>.
          </p>
        </Section>

        <div className="mt-8 pt-8 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
