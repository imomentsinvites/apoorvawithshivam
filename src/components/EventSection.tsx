import { useEffect, useRef, useState } from "react";
import type { WeddingEvent } from "../data/events";

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.18,
      rootMargin: "0px 0px -12% 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`event-section event-${event.id} ${active ? "event-active" : ""}`} id={event.id}>
    <div className="event-art" aria-hidden="true">
      <img src={`/images/events/${event.id}.svg`} alt="" />
      <div className="art-glow" />
    </div>
    <div className="event-content">
      <span className="event-number">0{index + 1}</span>
      <div className="event-copy">
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
    <span className="event-side-note" aria-hidden="true">A DAY TO REMEMBER</span>
  </section>;
}
