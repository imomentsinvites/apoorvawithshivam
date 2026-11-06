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
      if (entry.isIntersecting) {
        // Fetch only the clip approaching the viewport; don't download every film at once.
        video.preload = "auto";
        video.load();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.12, rootMargin: "350px 0px" });
    observer.observe(node);
    return () => { observer.disconnect(); video.pause(); };
  }, []);

  return <section ref={sectionRef} className={`event-section event-${index + 1}`} id={event.id}
    aria-label={`Celebration film ${index + 1}`}>
    <video ref={videoRef} className="event-film" src={event.video} muted playsInline loop preload="none" />
  </section>;
}
