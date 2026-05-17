export function PixelLogo({ className = "" }: { className?: string }) {
  // A simple 12x12 grid representing a minimalist pixel gameboy or "SB"
  return (
    <div 
      className={`grid grid-cols-6 grid-rows-6 gap-[1px] w-8 h-8 ${className}`}
      data-testid="logo-pixel"
    >
      {Array.from({ length: 36 }).map((_, i) => {
        // Just a simple pattern
        const isFilled = [
          1, 2, 3, 4,
          6, 11,
          13, 14, 15, 16,
          20, 21, 22,
          25, 26, 27, 28,
          31, 34
        ].includes(i);
        
        return (
          <div 
            key={i} 
            className={`${isFilled ? 'bg-primary' : 'bg-transparent'} ${i === 26 || i === 27 ? 'bg-destructive' : ''}`}
          />
        );
      })}
    </div>
  );
}
