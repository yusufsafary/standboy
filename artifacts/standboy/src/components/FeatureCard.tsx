export function FeatureCard({ title, description, id }: { title: string; description: string; id: string | number }) {
  return (
    <div 
      className="bg-card border border-border p-6 flex flex-col gap-4 group hover:border-primary transition-colors"
      data-testid={`feature-card-${id}`}
    >
      <div className="text-primary font-mono text-sm border border-primary/30 w-fit px-2 py-1 bg-primary/5">
        [{id.toString().padStart(2, '0')}]
      </div>
      <h3 className="text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
