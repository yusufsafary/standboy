import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <Container className="max-w-3xl">
          <h1 className="mb-12">About Standboy</h1>
          
          <article className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary max-w-none">
            <h2 className="text-2xl mt-0">The Hidden Cost of Tiny Wait Times</h2>
            <p>
              AI agents are fast, but they aren't instant. A 3-second wait for a small refactor. A 7-second wait for a new component. 
              These micro-breaks are devastating to developer focus.
            </p>
            <p>
              When the cursor pauses, the brain looks for dopamine. You alt-tab to Twitter. You check Slack. Suddenly, a 5-second wait turns into a 15-minute distraction. The flow state is broken.
            </p>
            
            <div className="my-10 p-6 border-l-4 border-primary bg-primary/5 text-foreground italic">
              "We realized we were losing hours every week not to AI generation, but to the context switches we took while waiting for AI generation."
            </div>

            <h2>Keep It In The IDE</h2>
            <p>
              Standboy is built on a simple premise: if you're going to get distracted for 5 seconds, it should happen inside your editor.
            </p>
            <p>
              By popping up a lightweight, state-preserved game right in your sidebar, we satisfy the brain's need for activity without letting it escape the IDE environment. When the agent finishes, the game vanishes, and you're staring right at your newly generated code.
            </p>

            <h2>Built for Focus</h2>
            <p>
              It sounds playful—and it is—but Standboy is a deeply technical tool designed to defend your flow state. No internet browsers, no feeds, no doomscrolling. Just you, your code, and Tetris.
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
