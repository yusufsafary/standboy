import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Install() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container className="max-w-3xl">
          <h1 className="mb-8">Install Standboy</h1>
          
          <div className="flex flex-col gap-8 mb-16">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 shrink-0 bg-primary/10 border border-primary text-primary flex items-center justify-center font-bold font-mono">1</div>
              <div>
                <h3 className="mb-2">Download Extension</h3>
                <p className="text-muted-foreground">Search for "Standboy" in the Cursor extension marketplace or download the VSIX file directly.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 shrink-0 bg-primary/10 border border-primary text-primary flex items-center justify-center font-bold font-mono">2</div>
              <div>
                <h3 className="mb-2">Enable Standboy Panel</h3>
                <p className="text-muted-foreground">Open your IDE settings and configure your ROM directory.</p>
                <div className="mt-4 bg-background border border-border p-4 font-mono text-sm text-muted-foreground overflow-x-auto">
                  <code>
                    "standboy.romDirectory": "~/.standboy/roms"<br/>
                    "standboy.autoShow": true
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 shrink-0 bg-primary/10 border border-primary text-primary flex items-center justify-center font-bold font-mono">3</div>
              <div>
                <h3 className="mb-2">Start Coding</h3>
                <p className="text-muted-foreground">Ask your agent to build something complex. The panel will appear automatically when generation begins.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h2 className="mb-6">Troubleshooting</h2>
            
            <div className="space-y-6">
              <div className="bg-card border border-border p-6">
                <div className="font-bold mb-2">Panel not showing automatically?</div>
                <p className="text-muted-foreground text-sm mb-4">Make sure you have the activity listener enabled in your settings.json.</p>
                <code className="bg-background border border-border px-3 py-2 text-xs block text-primary">
                  "standboy.listener.enabled": true
                </code>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
