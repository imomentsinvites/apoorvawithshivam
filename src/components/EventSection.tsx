import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import type { WeddingEvent } from "../data/events";

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        node.style.setProperty("--scroll-progress", progress.toFixed(3));
        node.classList.toggle("is-in-view", rect.top < viewport * 0.78 && rect.bottom > viewport * 0.22);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <section ref={sectionRef} className={`event-section event-${index + 1} theme-${event.theme}`} id={event.id} aria-label={`${event.title} celebration`}>
    <div className="event-art" aria-hidden="true">
      <div className="event-art-image" style={{ backgroundImage: `url("${event.artwork}")` }} />
      <div className="event-art-wash" />
      <div className="floating-petals"><i/><i/><i/><i/><i/><i/></div>
      <span className="ambient-glow glow-one"/><span className="ambient-glow glow-two"/>
    </div>
    <div className="event-copy">
      <span className="event-eyebrow">THE CELEBRATION · 0{index + 1}</span>
      <span className="event-date">{event.date}</span>
      <h2>{event.title}</h2>
      <span className="event-flourish" aria-hidden="true">✧ ─── ❀ ─── ✧</span>
      <div className="event-schedule">{event.schedule.map(line => <p className="event-time" key={line}>{line}</p>)}</div>
      {event.note && <p className="event-note">{event.note}</p>}
      <a className="event-venue-link" href={event.mapUrl} target="_blank" rel="noreferrer">
        <MapPin size={15} />
        <span><strong>{event.venueName}</strong><small>{event.venueAddress}</small></span>
        <Navigation size={14} />
      </a>
    </div>
    <div className="event-scroll-caption" aria-hidden="true">A STORY IN EVERY CELEBRATION <span>↓</span></div>
  </section>;
}
