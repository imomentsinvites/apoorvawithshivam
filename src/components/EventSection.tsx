import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { WeddingEvent } from "../data/events";

function getParticleStyle(index: number): CSSProperties & { "--drift": string } {
  return {
    left: `${(index * 43 + 6) % 100}%`,
    animationDelay: `${(index * 1.4) % 12}s`,
    animationDuration: `${12 + (index % 5) * 2}s`,
    "--drift": `${((index % 5) - 2) * 35}px`,
  };
}

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: .2, rootMargin: "0px 0px -10% 0px"
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const kind = event.id === "mehendi" ? "leaf" : event.id === "haldi" ? "marigold" : "rose";
  return <section ref={sectionRef} className={`event-section event-${event.id} ${active ? "event-active" : ""}`} id={event.id}>
    <div className="event-art" aria-hidden="true">
      <img src={`/images/scenes/${event.id}.svg`} alt=""/>
      <span className="event-art-vignette"/>
    </div>
    <div className="event-arch-frame" aria-hidden="true"/>
    <div className="event-content">
      <div className="event-copy">
        <span className="event-number">0{index+1}</span>
        <span className="event-eyebrow">{event.eyebrow}</span>
        <span className="event-date">{event.dateLabel}</span>
        <h2>{event.title}</h2>
        <div className="event-rule"><i>✦</i></div>
        <div className="event-times">
          <span>{event.time}</span>
          {event.secondary && <span><b>{event.secondary.title}</b> · {event.secondary.time}</span>}
        </div>
        <span className="followed-lunch">Followed by Lunch</span>
      </div>
    </div>
    <div className={`event-particles ${kind}`} aria-hidden="true">
      {Array.from({ length: 15 }, (_, i) => (
        <i key={i} style={getParticleStyle(i)} />
      ))}
    </div>
    <span className="event-side-note" aria-hidden="true">A DAY TO REMEMBER</span>
  </section>;
}
