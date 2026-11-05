import { useEffect, useRef, useState } from "react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#d7b66e");
    gradient.addColorStop(.45, "#f3e3bd");
    gradient.addColorStop(1, "#bd9146");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,.24)";
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 21, 0, Math.PI * 2);
    ctx.fill();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 16) if (pixels[i] < 30) clear++;
    if (clear / (pixels.length / 16) > .38) setRevealed(true);
  };

  return <div className={`scratch-wrap ${revealed ? "is-revealed" : ""}`}>
    <div className="scratch-under">
      <span className="tiny-label">SAVE THE DATES</span>
      <strong>22 — 24 November</strong>
      <span>2026</span>
    </div>
    {!revealed && <canvas ref={canvasRef} className="scratch-canvas"
      onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
      onPointerMove={scratch}
      onPointerUp={() => { drawing.current = false; }}
      onPointerCancel={() => { drawing.current = false; }}
      aria-label="Scratch to reveal the wedding dates" />}
    {!revealed && <div className="scratch-hint">Gently scratch to reveal</div>}
    {revealed && <div className="scratch-again">The celebrations begin ✨</div>}
  </div>;
}