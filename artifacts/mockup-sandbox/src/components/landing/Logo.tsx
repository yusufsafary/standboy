const GRID = [
  [0,0,1,1,0,1,1,0,0],
  [0,1,1,1,1,1,1,1,0],
  [1,1,0,1,1,1,0,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,0,0,0,1,1,0],
  [1,0,0,0,0,0,0,0,1],
];

const CELL = 5;
const W = 9 * CELL;
const H = 7 * CELL;

export function LogoMark({ size = 28, color = "#ADFF2F" }: { size?: number; color?: string }) {
  const scale = size / H;
  const rects: React.ReactNode[] = [];
  for (let r = 0; r < GRID.length; r++) {
    for (let c = 0; c < GRID[r].length; c++) {
      if (GRID[r][c]) {
        rects.push(
          <rect key={`${r}-${c}`} x={c * CELL} y={r * CELL} width={CELL} height={CELL} fill={color} />
        );
      }
    }
  }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W * scale}
      height={H * scale}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Standboy logo"
    >
      {rects}
    </svg>
  );
}

export function LogoFull({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={size} />
      <span
        style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.12em" }}
        className="font-bold text-foreground uppercase text-base"
      >
        STANDBOY
      </span>
    </div>
  );
}
