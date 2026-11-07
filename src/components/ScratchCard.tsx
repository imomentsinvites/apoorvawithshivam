import { useEffect, useRef, useState, type PointerEvent } from "react";

// 24 Nov 2026, 8:00 PM IST = 14:30 UTC; 3 hour block.
const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Apoorva and Shivam//Wedding//EN",
  "BEGIN:VEVENT",
  "UID:apoorva-shivam-baraat-20261124@wedding",
  "DTSTAMP:20261101T000000Z",
  "DTSTART:20261124T143000Z",
  "DTEND:20261124T173000Z",
  "SUMMARY:Apoorva & Shivam - Wedding (Baraat Swagat)",
  "LOCATION:The Sherioan by Kawatra\\, Victoria Hall",
  "BEGIN:VALARM",
  "TRIGGER:-P1D",
  "ACTION:DISPLAY",
  "DESCRIPTION:Apoorva & Shivam's wedding is tomorrow",
  "END:VALARM",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

function saveTheDate() {
  const url = URL.createObjectURL(new Blob([ICS], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "apoorva-shivam-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

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
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const gradient = ctx.createLinearGradient(0,0,rect.width,rect.height);
      gradient.addColorStop(0,"#f5d88e");
      gradient.addColorStop(.22,"#b77b35");
      gradient.addColorStop(.48,"#f8e7b9");
      gradient.addColorStop(.72,"#c18b43");
      gradient.addColorStop(1,"#f2d58c");
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle=gradient;
      ctx.fillRect(0,0,rect.width,rect.height);
      const glow=ctx.createRadialGradient(rect.width*.5,rect.height*.45,4,rect.width*.5,rect.height*.45,rect.width*.7);
      glow.addColorStop(0,"rgba(255,255,255,.46)");
      glow.addColorStop(1,"rgba(255,255,255,0)");
      ctx.fillStyle=glow;ctx.fillRect(0,0,rect.width,rect.height);
      ctx.strokeStyle="rgba(255,247,215,.78)";ctx.lineWidth=1;
      ctx.strokeRect(9,9,rect.width-18,rect.height-18);
      ctx.fillStyle="rgba(255,249,221,.55)";
      for(let i=0;i<120;i++){ctx.beginPath();ctx.arc((i*73)%rect.width,(i*47)%rect.height,(i%3)*.55+.3,0,Math.PI*2);ctx.fill();}
      ctx.font="24px Georgia";ctx.fillStyle="rgba(255,244,204,.86)";
      ctx.fillText("✧",17,35);ctx.fillText("✧",rect.width-39,35);
      ctx.fillText("❧",16,rect.height-16);ctx.fillText("❧",rect.width-38,rect.height-16);
    };
    resize();
    const observer=new ResizeObserver(resize);
    observer.observe(canvas);
    return ()=>observer.disconnect();
  },[]);

  const eraseAt=(event:PointerEvent<HTMLCanvasElement>)=>{
    if(!drawing.current||revealed)return;
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    const rect=canvas.getBoundingClientRect();
    const point={x:event.clientX-rect.left,y:event.clientY-rect.top};
    ctx.globalCompositeOperation="destination-out";
    ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=38;
    ctx.beginPath();
    if(lastPoint.current){ctx.moveTo(lastPoint.current.x,lastPoint.current.y);ctx.lineTo(point.x,point.y);}
    else{ctx.arc(point.x,point.y,19,0,Math.PI*2);}
    ctx.stroke();lastPoint.current=point;
    if(Math.random()<.18){
      const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      let clear=0;for(let i=3;i<data.length;i+=64)if(data[i]<30)clear++;
      if(clear/(data.length/64)>.43)setRevealed(true);
    }
  };

  return <div className={`scratch-card ${revealed?"scratch-revealed":""}`}>
    <div className="scratch-card-inner">
      <div className="scratch-reveal-copy">
        <span className="scratch-label">OUR WEDDING DATES</span>
        <strong>24 November 2026</strong>
        <span className="scratch-heart">♥</span>
        <small>The beginning of forever</small>
      </div>
      {!revealed&&<canvas ref={canvasRef} className="scratch-foil" aria-label="Scratch to reveal the wedding dates"
        onPointerDown={e=>{drawing.current=true;lastPoint.current=null;e.currentTarget.setPointerCapture(e.pointerId);eraseAt(e);}}
        onPointerMove={eraseAt}
        onPointerUp={()=>{drawing.current=false;lastPoint.current=null;}}
        onPointerCancel={()=>{drawing.current=false;lastPoint.current=null;}}/>}
      {!revealed&&<div className="scratch-overlay-prompt" aria-hidden="true"><span>✧</span><b>Scratch to reveal</b></div>}
    </div>
    {revealed
      ? <button type="button" className="scratch-bottom-note" onClick={saveTheDate} aria-label="A date to remember: add the wedding to your calendar">
          A date to remember ✦ <small>Add to calendar</small>
        </button>
      : <span className="scratch-bottom-note">Use your finger to gently scratch</span>}
  </div>;
}
