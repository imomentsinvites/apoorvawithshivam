import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import type { WeddingEvent } from "../data/events";

export default function EventSection({ event, index }: { event: WeddingEvent; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const video = videoRef.current;
    if (!node || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15, rootMargin: "120px 0px" });
    observer.observe(node);
    return () => { observer.disconnect(); video.pause(); };
  }, []);

  return <section ref={sectionRef} className={`event-section event-${index + 1}`} id={event.id} aria-label={`${event.title} celebration`}>
    <div className="event-video">
      <video ref={videoRef} src={event.video} muted playsInline loop preload="none" />
    </div>
    <div className="event-copy">
      <span className="event-date">{event.date}</span>
      <h2>{event.title}</h2>
      <div className="event-schedule">{event.schedule.map(line => <p className="event-time" key={line}>{line}</p>)}</div>
      {event.note && <p className="event-note">{event.note}</p>}
      <a className="event-venue-link" href={event.mapUrl} target="_blank" rel="noreferrer">
        <MapPin size={14} />
        <span><strong>{event.venueName}</strong><small>{event.venueAddress}</small></span>
        <Navigation size={14} />
      </a>
    </div>
  </section>;
}
