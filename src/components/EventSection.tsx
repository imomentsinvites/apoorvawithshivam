import { useEffect, useRef } from "react";
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

  return <section ref={sectionRef} className={`event-section event-${index + 1}`} id={event.id} aria-label={`Celebration film ${index + 1}`}>
    <div className="event-video">
      <video ref={videoRef} src={event.video} muted playsInline loop preload="none"/>
    </div>
    <div className="event-edge event-edge-top" aria-hidden="true"/>
    <div className="event-edge event-edge-bottom" aria-hidden="true"/>
    <span className="event-frame-mark" aria-hidden="true">✧</span>
  </section>;
}
