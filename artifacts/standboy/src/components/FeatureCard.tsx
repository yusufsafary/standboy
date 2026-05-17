export function FeatureCard({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string | number;
}) {
  return (
    <div
      className="group bg-card border border-border p-7 flex flex-col gap-5
        hover:border-primary/60 hover:bg-card/80
        transition-all duration-300 ease-out
        hover:-translate-y-0.5"
      data-testid={`feature-card-${id}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 border border-primary/40 bg-primary/5 flex items-center justify-center
          group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
          <span className="text-primary font-mono text-[10px] font-bold leading-none">
            {id.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors duration-300" />
      </div>

      <h3 className="text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
    </div>
  );
}
