import { useEffect, useRef, useState } from "react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{x:number;y:number}|null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#f9e8ed"); g.addColorStop(.22, "#d99aaE");
    g.addColorStop(.5, "#f8e7c8"); g.addColorStop(.76, "#c99a54"); g.addColorStop(1, "#f5dce5");
    ctx.fillStyle = g; ctx.fillRect(0,0,rect.width,rect.height);
    ctx.strokeStyle = "rgba(255,255,255,.52)"; ctx.lineWidth = 1;
    for (let x=14; x<rect.width; x+=22) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,rect.height); ctx.stroke();
    }
    for (let i=0;i<120;i++) {
      ctx.fillStyle = i%3===0 ? "rgba(255,255,255,.7)" : "rgba(139,91,66,.18)";
      ctx.beginPath(); ctx.arc(Math.random()*rect.width,Math.random()*rect.height,Math.random()*1.1+.2,0,Math.PI*2);ctx.fill();
    }
  }, []);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const point = {x:event.clientX-rect.left,y:event.clientY-rect.top};
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 42;
    ctx.beginPath();
    if (lastPoint.current) { ctx.moveTo(lastPoint.current.x,lastPoint.current.y); ctx.lineTo(point.x,point.y); }
    else { ctx.moveTo(point.x,point.y); ctx.lineTo(point.x+.1,point.y+.1); }
    ctx.stroke();
    lastPoint.current = point;
    // Sample pixels sparsely for a smooth, lightweight reveal check.
    const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let cleared=0, samples=0;
    for(let i=3;i<pixels.length;i+=160) { samples++; if(pixels[i]<30) cleared++; }
    if(cleared/samples>.43) setRevealed(true);
  };

  return <div className={`scratch-wrap ${revealed?"is-revealed":""}`}>
    <div className="scratch-under">
      <span className="scratch-flower">❀</span>
      <span className="tiny-label">SAVE THE DATE</span>
      <strong>22 — 24 NOVEMBER</strong>
      <span className="scratch-year">2026</span>
      <span className="scratch-flower bottom">❀</span>
    </div>
    {!revealed && <canvas ref={canvasRef} className="scratch-canvas"
      onPointerDown={e=>{drawing.current=true;lastPoint.current=null;e.currentTarget.setPointerCapture(e.pointerId);scratch(e);}}
      onPointerMove={scratch}
      onPointerUp={()=>{drawing.current=false;lastPoint.current=null;}}
      onPointerCancel={()=>{drawing.current=false;lastPoint.current=null;}}
      aria-label="Scratch the card to reveal the wedding dates"/>}
    {!revealed && <div className="scratch-hint"><span>SCRATCH HERE</span><i>✧</i></div>}
    {revealed && <div className="scratch-again">THE MAGIC IS REVEALED <span>♥</span></div>}
  </div>;
}
