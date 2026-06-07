import { useEffect, useRef, useState } from "react";

/* ─── tiny canvas game: bouncing pixel ball ─── */
function useGame(canvasRef: React.RefObject<HTMLCanvasElement | null>, running: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Pixel font characters (4×5 bitmap, index 0-9 and A-Z subset)
    const state = {
      bx: W / 2, by: H / 2,
      vx: 1.4,  vy: 1.1,
      r: 4,
      score: 0,
      paddle: { x: W / 2 - 18, w: 36, y: H - 10, h: 4 },
      particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],
    };

    let raf = 0;
    let lastTime = 0;

    function drawPixelText(text: string, x: number, y: number, color: string) {
      ctx!.fillStyle = color;
      ctx!.font = "6px monospace";
      ctx!.fillText(text, x, y);
    }

    function tick(ts: number) {
      const dt = Math.min((ts - lastTime) / 16, 3);
      lastTime = ts;

      if (!running) {
        // draw idle screen
        ctx!.fillStyle = "#0a0a0a";
        ctx!.fillRect(0, 0, W, H);
        // scanlines
        for (let sy = 0; sy < H; sy += 3) {
          ctx!.fillStyle = "rgba(0,0,0,0.25)";
          ctx!.fillRect(0, sy, W, 1);
        }
        // "PRESS START"
        ctx!.fillStyle = "#A8FF2E";
        ctx!.font = "bold 7px monospace";
        ctx!.textAlign = "center";
        ctx!.fillText("PRESS START", W / 2, H / 2 - 6);
        ctx!.fillStyle = "#555";
        ctx!.font = "6px monospace";
        ctx!.fillText("OR PRESS ENTER", W / 2, H / 2 + 6);
        ctx!.textAlign = "left";
        raf = requestAnimationFrame(tick);
        return;
      }

      // move ball
      state.bx += state.vx * dt;
      state.by += state.vy * dt;

      // bounce walls
      if (state.bx - state.r < 0)  { state.bx = state.r;      state.vx = Math.abs(state.vx);  }
      if (state.bx + state.r > W)  { state.bx = W - state.r;  state.vx = -Math.abs(state.vx); }
      if (state.by - state.r < 0)  { state.by = state.r;      state.vy = Math.abs(state.vy);  }

      // paddle hit
      const p = state.paddle;
      if (
        state.by + state.r > p.y &&
        state.by - state.r < p.y + p.h &&
        state.bx > p.x &&
        state.bx < p.x + p.w
      ) {
        state.vy = -Math.abs(state.vy) * 1.03;
        state.vx += (state.bx - (p.x + p.w / 2)) * 0.05;
        state.score++;
        // spawn particles
        for (let i = 0; i < 5; i++) {
          state.particles.push({
            x: state.bx, y: p.y,
            vx: (Math.random() - 0.5) * 3,
            vy: -(Math.random() * 2 + 1),
            life: 1,
          });
        }
      }

      // out of bounds bottom → reset
      if (state.by - state.r > H) {
        state.by = H / 2; state.bx = W / 2;
        state.vx = 1.4; state.vy = 1.1;
      }

      // update particles
      state.particles = state.particles
        .map(pt => ({ ...pt, x: pt.x + pt.vx, y: pt.y + pt.vy, vy: pt.vy + 0.15, life: pt.life - 0.05 }))
        .filter(pt => pt.life > 0);

      // auto-move paddle toward ball (simple AI)
      const center = p.x + p.w / 2;
      if (center < state.bx - 2) p.x = Math.min(p.x + 2 * dt, W - p.w);
      if (center > state.bx + 2) p.x = Math.max(p.x - 2 * dt, 0);

      // ── draw ──
      ctx!.fillStyle = "#0a0a0a";
      ctx!.fillRect(0, 0, W, H);

      // scanlines
      for (let sy = 0; sy < H; sy += 3) {
        ctx!.fillStyle = "rgba(0,0,0,0.18)";
        ctx!.fillRect(0, sy, W, 1);
      }

      // score
      drawPixelText(`SCORE ${String(state.score).padStart(4, "0")}`, 4, 10, "#A8FF2E");

      // ball
      ctx!.fillStyle = "#A8FF2E";
      ctx!.beginPath();
      ctx!.arc(state.bx, state.by, state.r, 0, Math.PI * 2);
      ctx!.fill();

      // paddle
      ctx!.fillStyle = "#A8FF2E";
      ctx!.fillRect(p.x, p.y, p.w, p.h);

      // particles
      for (const pt of state.particles) {
        ctx!.globalAlpha = pt.life;
        ctx!.fillStyle = "#A8FF2E";
        ctx!.fillRect(pt.x, pt.y, 2, 2);
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [canvasRef, running]);
}

export function GameboyEmulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);

  useGame(canvasRef, running);

  // keyboard START/ENTER
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") setRunning(r => !r);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="select-none" style={{ filter: "drop-shadow(0 0 32px rgba(168,255,46,0.18))" }}>
      {/* shell */}
      <div
        style={{
          width: 200,
          background: "linear-gradient(160deg, #1a1a1a 0%, #111 100%)",
          borderRadius: "18px 18px 40px 40px",
          border: "1.5px solid rgba(255,255,255,0.07)",
          padding: "14px 14px 22px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
        }}
      >
        {/* brand strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -4 }}>
          <span style={{ fontFamily: "monospace", fontSize: 7, letterSpacing: "0.25em", color: "#555", textTransform: "uppercase" }}>STANDBOY</span>
          <div style={{ display: "flex", gap: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: running ? "#A8FF2E" : "#333", boxShadow: running ? "0 0 6px #A8FF2E" : undefined, transition: "all 0.3s" }} />
          </div>
        </div>

        {/* screen bezel */}
        <div
          style={{
            background: "#000",
            borderRadius: 6,
            padding: 6,
            border: "1.5px solid #222",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          <canvas
            ref={canvasRef}
            width={160}
            height={120}
            style={{
              display: "block",
              width: "100%",
              imageRendering: "pixelated",
              borderRadius: 2,
            }}
          />
        </div>

        {/* d-pad + buttons row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
          {/* d-pad */}
          <div style={{ position: "relative", width: 48, height: 48 }}>
            {/* horizontal bar */}
            <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "34%", background: "#222", borderRadius: 2 }} />
            {/* vertical bar */}
            <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: "34%", background: "#222", borderRadius: 2 }} />
          </div>

          {/* A + B buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div
                  onClick={() => setRunning(r => !r)}
                  style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: running ? "#A8FF2E" : "#2a2a2a",
                    border: "1px solid #333",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: running ? "0 0 10px rgba(168,255,46,0.5)" : "none",
                  }}
                />
                <span style={{ fontSize: 6, color: "#444", fontFamily: "monospace" }}>B</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div
                  onClick={() => setRunning(r => !r)}
                  style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: running ? "#A8FF2E" : "#2a2a2a",
                    border: "1px solid #333",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: running ? "0 0 10px rgba(168,255,46,0.5)" : "none",
                  }}
                />
                <span style={{ fontSize: 6, color: "#444", fontFamily: "monospace" }}>A</span>
              </div>
            </div>
          </div>
        </div>

        {/* START / SELECT */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {[{ label: "SELECT", action: () => {} }, { label: "START", action: () => setRunning(r => !r) }].map(({ label, action }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div
                onClick={action}
                style={{
                  width: 28, height: 6, borderRadius: 3,
                  background: label === "START" && running ? "#A8FF2E" : "#222",
                  border: "1px solid #333",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: label === "START" && running ? "0 0 8px rgba(168,255,46,0.4)" : "none",
                }}
              />
              <span style={{ fontSize: 5.5, color: "#444", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
