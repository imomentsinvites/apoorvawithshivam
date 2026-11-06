import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const celebrationBits = Array.from({ length: 18 }, (_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  delay: `${(i % 6) * 90}ms`,
  drift: `${((i % 5) - 2) * 24}px`,
  glyph: i % 3 === 0 ? "✧" : i % 3 === 1 ? "❀" : "·",
}));

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const checkReveal = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const paintCover = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#eee4d4";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = "rgba(166, 128, 76, .34)";
      ctx.lineWidth = 1;
      ctx.strokeRect(12, 12, rect.width - 24, rect.height - 24);
      ctx.fillStyle = "rgba(255,255,255,.34)";
      ctx.fillRect(14, 14, rect.width - 28, 1);
    };

    paintCover();
    const observer = new ResizeObserver(paintCover);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 54;
    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.arc(point.x, point.y, 27, 0, Math.PI * 2);
    }
    ctx.stroke();
    lastPoint.current = point;

    checkReveal.current += 1;
    if (checkReveal.current % 7 !== 0) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let samples = 0;
    for (let i = 3; i < pixels.length; i += 4 * 32) {
      samples += 1;
      if (pixels[i] < 32) cleared += 1;
    }
    if (samples && cleared / samples > 0.42) setRevealed(true);
  };

  const stopDrawing = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  return <div className={`scratch-wrap ${revealed ? "is-revealed" : ""}`}>
    <div className="scratch-under">
      <span className="scratch-flower">❀</span>
      <span className="tiny-label">SAVE THE DATE</span>
      <strong>24 NOVEMBER</strong>
      <span className="scratch-year">2026</span>
      <span className="scratch-flower bottom">❀</span>
    </div>
    {!revealed && <canvas ref={canvasRef} className="scratch-canvas"
      onPointerDown={e => {
        if (revealed) return;
        setHasScratched(true);
        drawing.current = true;
        lastPoint.current = null;
        e.currentTarget.setPointerCapture(e.pointerId);
        scratch(e);
      }}
      onPointerMove={scratch}
      onPointerUp={stopDrawing}
      onPointerCancel={stopDrawing}
      onLostPointerCapture={stopDrawing}
      aria-label="Scratch the card to reveal the wedding date" />}
    {!revealed && !hasScratched && <div className="scratch-hint" aria-hidden="true">
      <span>GENTLY SCRATCH TO REVEAL</span><i>✧</i>
    </div>}
    {revealed && <div className="scratch-celebration" aria-hidden="true">
      {celebrationBits.map((bit, i) => <span key={i} style={{
        left: bit.left, animationDelay: bit.delay, ["--drift"]: bit.drift
      } as CSSProperties}>{bit.glyph}</span>)}
    </div>}
    {revealed && <div className="scratch-again">A LITTLE MAGIC, JUST FOR YOU <span>✧</span></div>}
  </div>;
}
