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

const cookieTable = [
  { name: "_ga", purpose: "Google Analytics — tracks unique visitors (aggregated, anonymized)", duration: "2 years", required: false },
  { name: "_ga_*", purpose: "Google Analytics — session identifier for analytics reporting", duration: "2 years", required: false },
  { name: "sb_pwa_prompt", purpose: "Remembers whether the PWA install prompt has been dismissed", duration: "30 days", required: false },
  { name: "sb_theme", purpose: "Stores your preferred color scheme (dark/light) if toggled", duration: "1 year", required: false },
];

export function Cookies() {
  return (
    <div className="flex-1 py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">// Cookies</p>
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-foreground tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <Section title="What are cookies?">
          <p>
            Cookies are small text files stored in your browser when you visit a website.
            They help websites remember your preferences, track anonymous usage patterns, and
            deliver a more consistent experience across visits.
          </p>
          <p>
            This policy covers cookies used on standboy.vercel.app (the "Site"). It does not
            cover the Standboy IDE Extension itself — the Extension does not use browser cookies.
          </p>
        </Section>

        <Section title="Cookies we use">
          <p>
            The Site uses only the following cookies. We do not use advertising cookies,
            tracking pixels from social networks, or fingerprinting techniques.
          </p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-foreground uppercase tracking-widest font-bold text-[10px]">Name</th>
                  <th className="text-left py-2 pr-4 text-foreground uppercase tracking-widest font-bold text-[10px]">Purpose</th>
                  <th className="text-left py-2 pr-4 text-foreground uppercase tracking-widest font-bold text-[10px]">Duration</th>
                  <th className="text-left py-2 text-foreground uppercase tracking-widest font-bold text-[10px]">Required</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((c, i) => (
                  <tr key={i} className="border-b border-border/40">
                    <td className="py-3 pr-4 font-mono text-primary text-[11px] align-top">{c.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground align-top">{c.purpose}</td>
                    <td className="py-3 pr-4 text-muted-foreground align-top whitespace-nowrap">{c.duration}</td>
                    <td className="py-3 align-top">
                      <span className={`text-[10px] uppercase tracking-widest px-1.5 py-0.5 border ${c.required ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}`}>
                        {c.required ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="How to manage cookies">
          <p>
            All cookies on this Site are optional — the Site functions without them.
            You can disable or delete cookies at any time through your browser settings:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong className="text-foreground">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong className="text-foreground">Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
            <li><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong className="text-foreground">Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
          </ul>
          <p>
            Disabling analytics cookies (
            <code className="bg-card border border-border px-1 text-[11px]">_ga</code>,{" "}
            <code className="bg-card border border-border px-1 text-[11px]">_ga_*</code>
            ) will not affect the Site's functionality in any way.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            The Site uses Google Analytics for anonymized traffic reporting.
            Google Analytics data is processed under Google's Privacy Policy.
            We have enabled IP anonymization and do not share any data with Google
            for advertising purposes.
          </p>
          <p>
            No data is sold or shared with any third-party for commercial use.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this Cookie Policy as the Site evolves. The "Last updated" date
            at the top of this page reflects the most recent change.
            Material changes will be noted on our{" "}
            <a href="https://x.com/standboyltd" target="_blank" rel="noopener noreferrer"
              className="text-primary hover:opacity-80">X account</a>.
          </p>
        </Section>

        <div className="mt-8 pt-8 border-t border-border flex gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => navigate("/legal")}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Legal & Terms →
          </button>
        </div>
      </div>
    </div>
  );
}
