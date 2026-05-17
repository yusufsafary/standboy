import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      <main className="flex-1">
        {/* HERO */}
        <section className="py-24 md:py-32">
          <Container className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-primary text-sm font-mono uppercase">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              Status: Ready
            </div>
            <h1 className="max-w-3xl">Your IDE sidekick that keeps you focused</h1>
            <p className="max-w-xl text-muted-foreground text-lg">
              Standboy automatically shows a Game Boy emulator while your AI agent is generating code, then hides it when done. Play during the wait, stay in the zone.
            </p>
            
            <Link href="/install" data-testid="hero-install">
              <Button size="lg" className="h-14 px-8 text-lg rounded-none border border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-bold group">
                <Play className="w-5 h-5 mr-2 fill-current group-hover:scale-110 transition-transform" />
                Install Standboy
              </Button>
            </Link>
          </Container>
        </section>

        {/* EMULATOR MOCK */}
        <section className="py-12">
          <Container>
            <div className="w-full max-w-2xl mx-auto border-2 border-border bg-card p-4 aspect-video relative flex items-center justify-center overflow-hidden">
              {/* Screen */}
              <div className="w-3/4 h-3/4 border border-border bg-background flex flex-col items-center justify-center font-mono text-primary text-xs whitespace-pre opacity-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                {`
  ___ 
 |__ \\
   / /
  |_| 
  (_) 
                `}
                <div className="mt-4 animate-pulse">PRESS START</div>
              </div>
              
              {/* Power LED */}
              <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#A8FF2E]" />
              
              {/* Lines */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="w-8 h-2 bg-border -rotate-45" />
                <div className="w-8 h-2 bg-border -rotate-45" />
              </div>
            </div>
          </Container>
        </section>

        {/* VALUE PROPS */}
        <section className="py-24 border-t border-border/50 bg-card/30">
          <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-primary font-mono text-sm border-b border-primary/30 pb-2">01 // AUTO-TRIGGER</h3>
              <div className="font-bold text-lg">Auto-show on agent activity</div>
              <p className="text-muted-foreground">Detects when Cursor or Claude is generating and pops up instantly.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-primary font-mono text-sm border-b border-primary/30 pb-2">02 // NO SWITCHING</h3>
              <div className="font-bold text-lg">Zero context switching</div>
              <p className="text-muted-foreground">Stop tabbing out to Twitter. Keep your hands on the keyboard and your eyes on the IDE.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-primary font-mono text-sm border-b border-primary/30 pb-2">03 // SEAMLESS</h3>
              <div className="font-bold text-lg">Emulator resumes mid-frame</div>
              <p className="text-muted-foreground">Games pause the millisecond the agent finishes and resume right where you left off.</p>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
