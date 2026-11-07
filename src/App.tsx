import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDown, Heart, Phone, MessageCircle } from "lucide-react";
import ScrollCue from "./components/ScrollCue";
import ScratchCard from "./components/ScratchCard";
import EventSection from "./components/EventSection";
import { events, rsvpContacts } from "./data/events";

function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Countdown() {
  const target = new Date("2026-11-24T20:00:00+05:30").getTime();
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const safe = Math.max(0, remaining);
  const units = [
    ["DAYS", Math.floor(safe / 86400000)],
    ["HOURS", Math.floor((safe % 86400000) / 3600000)],
    ["MINUTES", Math.floor((safe % 3600000) / 60000)],
    ["SECONDS", Math.floor((safe % 60000) / 1000)],
  ] as const;

  return (
    <div className="countdown-grid">
      {units.map(([label, value], index) => (
        <div className="count-unit" data-reveal key={label} style={{ transitionDelay: `${index * 90}ms` }}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entryStarted, setEntryStarted] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (scrollEnabled) {
      root.classList.remove("entry-locked");
      body.classList.remove("entry-locked");
    } else {
      root.classList.add("entry-locked");
      body.classList.add("entry-locked");
    }
    return () => {
      root.classList.remove("entry-locked");
      body.classList.remove("entry-locked");
    };
  }, [scrollEnabled]);

  useEffect(() => {
    if (!entryStarted) return;
    const unlock = window.setTimeout(() => setScrollEnabled(true), 6000);
    return () => window.clearTimeout(unlock);
  }, [entryStarted]);

  const openInvitation = async () => {
    if (entryStarted) return;
    setEntryStarted(true);
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
      } catch {
        // Keep the poster visible if the browser blocks playback.
      }
    }
  };

  return (
    <main className="wedding-site">
      <RevealObserver />

      <section
        className={`hero ${entryStarted ? "entry-started" : ""} ${scrollEnabled ? "entry-scroll-enabled" : ""}`}
        id="top"
        onClick={openInvitation}
        role="button"
        tabIndex={0}
        aria-label="Tap to open the wedding invitation"
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !entryStarted) {
            event.preventDefault();
            void openInvitation();
          }
        }}
      >
        <img className="hero-poster" src="/images/entry-poster.jpg" alt="" />
        <video
          ref={videoRef}
          className="hero-video"
          src="/videos/entry.mp4"
          poster="/images/entry-poster.jpg"
          playsInline
          preload="none"
          onClick={(event) => event.stopPropagation()}
        />
        {!entryStarted && (
          <div className="tap-open-wrap">
            <span className="tap-open-pill">Tap to Open</span>
          </div>
        )}
        <ScrollCue visible={scrollEnabled} />
      </section>

      <section className="scratch-scene" id="reveal">
        <div className="scene-background scratch-background" aria-hidden="true" />
        <div className="scratch-scene-wash" aria-hidden="true" />
        <div className="scratch-scene-content">
          <span className="eyebrow" data-reveal>A LITTLE SURPRISE FOR YOU</span>
          <h2 className="script-heading" data-reveal>The celebration begins</h2>
          <p className="scene-subtitle" data-reveal>One beautiful date. A lifetime of memories.</p>
          <ScratchCard />
          <p className="scratch-caption" data-reveal>Gently scratch to uncover the special dates</p>
          <a className="scroll-link" href="#festivities">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={18} />
          </a>
        </div>
        <SceneParticles type="rose" count={6} />
      </section>

      <section className="festivities-intro" id="festivities">
        <div className="intro-flourish" data-reveal>❧ ✦ ❧</div>
        <span className="eyebrow" data-reveal>THREE DAYS · FIVE CELEBRATIONS</span>
        <h2 className="script-heading" data-reveal>The Wedding Festivities</h2>
        <p data-reveal>Come together for rituals, laughter, music and moments to treasure forever.</p>
      </section>

      <div className="event-story">
        {events.map((event, index) => (
          <EventSection key={event.id} event={event} index={index} />
        ))}
      </div>

      <section className="rsvp-scene" id="rsvp">
        <div className="rsvp-border" aria-hidden="true" />
        <span className="eyebrow" data-reveal>YOUR PRESENCE IS OUR PRESENT</span>
        <h2 className="script-heading" data-reveal>R S V P</h2>
        <p className="rsvp-intro" data-reveal>For timings, travel, or anything at all.</p>
        <div className="rsvp-list">
          {rsvpContacts.map((contact, index) => (
            <div className="rsvp-row" data-reveal style={{ transitionDelay: `${index * 120}ms` }} key={contact.phone}>
              <div className="rsvp-person">
                <span>{contact.name}</span>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </div>
              <div className="rsvp-actions">
                <a className="rsvp-action call" href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
                  <Phone size={17} />
                </a>
                <a className="rsvp-action whatsapp" href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.name}`}>
                  <MessageCircle size={17} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="rsvp-footnote" data-reveal><Heart size={14} /> We can't wait to celebrate with you</p>
        <SceneParticles type="rose" count={5} />
      </section>

      <section className="finale-scene">
        <div className="finale-arch" aria-hidden="true" />
        <span className="eyebrow" data-reveal>THE MOMENT IS GETTING CLOSER</span>
        <h2 className="script-heading" data-reveal>Counting down to</h2>
        <div className="forever" data-reveal>Forever</div>
        <Countdown />
        <div className="finale-divider" data-reveal>✦ ❧ ✦</div>
        <h3 className="closing-names" data-reveal>Apoorva <span>&</span> Shivam</h3>
        <p className="closing-date" data-reveal>24 NOVEMBER 2026</p>
        <Heart className="closing-heart" size={18} />
      </section>
      <footer>MADE WITH LOVE · APOORVA & SHIVAM</footer>
      <a className="top-button" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}

function SceneParticles({ type, count }: { type: "rose"; count: number }) {
  return (
    <div className={`scene-particles particles-${type}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={{
            left: `${(index * 37 + 9) % 100}%`,
            animationDelay: `${(index * 2.4) % 14}s`,
            animationDuration: `${17 + (index % 4) * 2.5}s`,
            ["--drift" as string]: `${(index % 2 === 0 ? 1 : -1) * (14 + (index % 3) * 9)}px`,
            ["--scale" as string]: `${0.5 + (index % 3) * 0.14}`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
