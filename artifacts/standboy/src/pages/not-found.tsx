import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <Container className="text-center flex flex-col items-center">
          <div className="font-mono text-primary text-9xl font-bold mb-4">404</div>
          <h2 className="mb-6">ROM Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            The page you're looking for doesn't exist. Maybe the cartridge isn't inserted correctly?
          </p>
          <Link href="/">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-none">
              Return Home
            </Button>
          </Link>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
