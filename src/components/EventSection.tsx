import { useEffect, useRef, useState } from "react";
import type { WeddingEvent } from "../data/events";

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      if (entry.isIntersecting) videoRef.current?.play().catch(() => {});
      else videoRef.current?.pause();
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`event-section event-${index + 1}`} id={event.id}>
    <div className="event-video">
      <video ref={videoRef} src={event.video} muted playsInline loop preload="none" poster="/images/event-poster.jpg" />
      <div className="video-wash" />
    </div>
    <div className={`event-content ${active ? "content-visible" : ""}`}>
      <span className="event-eyebrow">{event.eyebrow}</span>
      <span className="event-date">{event.dateLabel}</span>
      <h2>{event.title}</h2>
      <div className="event-times">
        <span>{event.time}</span>
        {event.secondary && <span><b>{event.secondary.title}</b> · {event.secondary.time}</span>}
      </div>
    </div>
    <span className="event-number">0{index + 1}</span>
  </section>;
}