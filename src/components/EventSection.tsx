import { useEffect, useRef, useState } from "react";
import type { WeddingEvent } from "../data/events";

const particleType: Record<string, "leaf" | "marigold" | "rose"> = {
  mehendi: "leaf",
  haldi: "marigold",
  wedding: "rose",
};

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.22, rootMargin: "0px 0px -10% 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`event-scene event-${event.id} ${active ? "is-active" : ""}`} id={event.id}>
    <div className={`scene-background event-background event-background-${event.id}`} aria-hidden="true"/>
    <div className="scene-vignette"/>
    <div className="event-ornament event-ornament-top" aria-hidden="true">✦</div>
    <div className={`event-story-content ${index % 2 ? "align-right" : "align-left"}`}>
      <span className="event-index" data-reveal>0{index + 1} / 03</span>
      <span className="eyebrow event-eyebrow" data-reveal>{event.eyebrow}</span>
      <span className="event-date" data-reveal>{event.dateLabel}</span>
      <h2 data-reveal>{event.title}</h2>
      <div className="event-divider" data-reveal><i>✦</i></div>
      <div className="event-times" data-reveal>
        <span>{event.time}</span>
        {event.secondary && <span><b>{event.secondary.title}</b> · {event.secondary.time}</span>}
      </div>
      <span className="followed-lunch" data-reveal>Followed by Lunch</span>
    </div>
    <div className={`scene-particles particles-${particleType[event.id]}`} aria-hidden="true">
      {Array.from({length: event.id === "wedding" ? 18 : 14},(_,i)=><i key={i} style={{
        left:`${(i*43+4)%100}%`, animationDelay:`${(i*1.3)%13}s`,
        animationDuration:`${11+(i%6)*2.1}s`,
        ["--drift" as string]:`${((i%2===0)?1:-1)*(16+(i%4)*12)}px`,
        ["--scale" as string]:`${.55+(i%4)*.16}`,
      }}/>)}
    </div>
    <span className="event-side-script" aria-hidden="true">{event.id === "mehendi" ? "Mehendi ki raat" : event.id === "haldi" ? "Haldi ke rang" : "Shubh vivah"}</span>
  </section>;
}
