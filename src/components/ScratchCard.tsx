import { useEffect, useRef, useState } from "react";

const REVEAL_THRESHOLD = 0.65;

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const lastMeasure = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const paintFoil = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // Warm champagne-gold foil to match the invitation's blush and antique-gold palette.
      const foil = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      foil.addColorStop(0, "#8e6330");
      foil.addColorStop(0.14, "#f5dfaa");
      foil.addColorStop(0.28, "#bd8d45");
      foil.addColorStop(0.44, "#fff0c8");
      foil.addColorStop(0.58, "#c69a55");
      foil.addColorStop(0.76, "#f8e4b4");
      foil.addColorStop(0.9, "#aa7938");
      foil.addColorStop(1, "#f3d99e");
      ctx.fillStyle = foil;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Fine diagonal foil grain.
      ctx.save();
      ctx.globalAlpha = 0.16;
      for (let x = -rect.height; x < rect.width + rect.height; x += 4) {
        ctx.strokeStyle = x % 8 === 0 ? "#fff9e9" : "#805522";
        ctx.lineWidth = 0.55;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + rect.height, rect.height);
        ctx.stroke();
      }
      ctx.restore();

      const sheen = ctx.createLinearGradient(0, 0, rect.width, 0);
      sheen.addColorStop(0, "rgba(255,255,255,0)");
      sheen.addColorStop(0.48, "rgba(255,250,224,.5)");
      sheen.addColorStop(0.56, "rgba(255,255,255,.08)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // A restrained inset metallic edge.
      ctx.strokeStyle = "rgba(255,249,225,.88)";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);
      ctx.strokeStyle = "rgba(91,58,20,.24)";
      ctx.strokeRect(10, 10, rect.width - 20, rect.height - 20);
    };

    paintFoil();
    const observer = new ResizeObserver(paintFoil);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const measureClearedArea = (force = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx || revealed) return;
    const now = performance.now();
    if (!force && now - lastMeasure.current < 180) return;
    lastMeasure.current = now;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Sample on a regular grid; alpha 0 means the foil has been removed.
    const stride = 4 * 12;
    let cleared = 0;
    let samples = 0;
    for (let i = 3; i < pixels.length; i += stride) {
      samples += 1;
      if (pixels[i] < 45) cleared += 1;
    }
    if (samples && cleared / samples >= REVEAL_THRESHOLD) {
      drawing.current = false;
      setRevealed(true);
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const point = { x: clientX - rect.left, y: clientY - rect.top };
    setHasStarted(true);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 46;
    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.arc(point.x, point.y, 23, 0, Math.PI * 2);
    }
    ctx.stroke();
    lastPoint.current = point;
    measureClearedArea();
  };

  const stopScratch = () => {
    drawing.current = false;
    lastPoint.current = null;
    measureClearedArea(true);
  };

  return <div className={`scratch-wrap ${revealed ? "is-revealed" : ""}`}>
    <div className="scratch-under">
      <span className="scratch-flower">✧</span>
      <span className="tiny-label">SAVE THE DATE</span>
      <strong>24 NOVEMBER</strong>
      <span className="scratch-year">2026</span>
      <span className="scratch-flower bottom">✧</span>
    </div>
    {!revealed && <canvas
      ref={canvasRef}
      className="scratch-canvas"
      onPointerDown={event => {
        drawing.current = true;
        lastPoint.current = null;
        event.currentTarget.setPointerCapture(event.pointerId);
        scratchAt(event.clientX, event.clientY);
      }}
      onPointerMove={event => {
        const points = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent];
        points.forEach(point => scratchAt(point.clientX, point.clientY));
      }}
      onPointerUp={stopScratch}
      onPointerCancel={stopScratch}
      aria-label="Scratch the golden foil with your finger or mouse to reveal the wedding date"
    />}
    {!revealed && !hasStarted && <div className="scratch-hint">
      <span className="scratch-sparkle">✧</span>
      <span>SCRATCH TO REVEAL</span>
      <small>Use your finger or mouse</small>
    </div>}
    {revealed && <div className="scratch-again">THE DATE IS REVEALED <span>✧</span></div>}
  </div>;
}
