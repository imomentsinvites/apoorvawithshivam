import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Navigation, Heart, Phone, MessageCircle, Sparkles } from "lucide-react";
import ScrollCue from "./components/ScrollCue";
import ScratchCard from "./components/ScratchCard";
import EventSection from "./components/EventSection";
import { events, venue, rsvpContacts } from "./data/events";

function Countdown() {
  const target = new Date("2026-11-24T19:30:00+05:30").getTime();
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
  return <div className="countdown-grid">
    {units.map(([label, value], index) => <div className="count-unit reveal" style={{ transitionDelay: `${index * 90}ms` }} key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}

function PetalDrift() {
  return <div className="petal-field" aria-hidden="true">
    {Array.from({ length: 22 }, (_, i) => <i key={i} style={{
      left: `${(i * 47 + 7) % 100}%`,
      animationDelay: `${(i * 1.37) % 16}s`,
      animationDuration: `${13 + (i % 7) * 2}s`,
      transform: `scale(${0.55 + (i % 5) * 0.16})`,
    }} />)}
  </div>;
}

function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

export default function App() {
  return <main>
    <RevealObserver />
    <PetalDrift />
    <section className="hero" id="top">
      <video className="hero-video" src="/videos/entry.mp4" muted playsInline autoPlay loop preload="metadata" />
      <div className="hero-video-wash" />
      <div className="hero-frame" aria-hidden="true" />
      <div className="hero-ornament">✦</div>
      <div className="hero-copy">
        <span className="overline">WITH THE BLESSINGS OF OUR FAMILIES</span>
        <h1>Apoorva <em>&</em> Shivam</h1>
        <p>joyfully invite you to celebrate their wedding</p>
        <span className="hero-date">22 — 24 NOVEMBER 2026</span>
      </div>
      <ScrollCue />
      <div className="hero-flower flower-one">✿</div><div className="hero-flower flower-two">❀</div>
    </section>

    <section className="reveal-section story-section" id="reveal">
      <div className="story-arch" aria-hidden="true"><span>✿</span></div>
      <div className="section-inner">
        <span className="section-kicker reveal">A LOVE STORY WORTH CELEBRATING</span>
        <h2 className="section-script reveal">The celebration begins</h2>
        <p className="story-intro reveal">A little sparkle, a little surprise, and a lifetime of memories waiting to unfold.</p>
        <ScratchCard />
        <p className="reveal-caption reveal">A little surprise awaits beneath the shimmer</p>
        <a className="down-link" href="#festivities"><ArrowDown size={18}/><span>LET THE CELEBRATIONS BEGIN</span></a>
      </div>
      <div className="floating-lamp lamp-left" aria-hidden="true">♧</div>
      <div className="floating-lamp lamp-right" aria-hidden="true">♧</div>
    </section>

    <section className="events-intro" id="festivities">
      <div className="intro-ornament reveal">❧ ✧ ❧</div>
      <span className="section-kicker reveal">THREE DAYS · A THOUSAND MEMORIES</span>
      <h2 className="section-script reveal">The Wedding Festivities</h2>
      <p className="reveal">Join us for rituals, laughter, music and moments that become memories.</p>
      <span className="intro-divider reveal">✦</span>
    </section>

    <div className="event-flow">
      {events.map((event, index) => <EventSection key={event.id} event={event} index={index} />)}
    </div>

    <section className="venue-section" id="venue">
      <div className="venue-scenery" aria-hidden="true"><span className="palace-dome"></span><span className="palace-arch"></span></div>
      <span className="section-kicker reveal">A PLACE FOR OUR FAVOURITE PEOPLE</span>
      <h2 className="section-script reveal">The Venue</h2>
      <div className="venue-card reveal">
        <div className="venue-icon"><MapPin size={25}/></div>
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
        <a className="map-button" href={venue.mapUrl} target="_blank" rel="noreferrer">
          <Navigation size={16}/> GET DIRECTIONS
        </a>
      </div>
      <div className="venue-flower" aria-hidden="true">✿</div>
    </section>

    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-ornament reveal">❧</div>
      <span className="section-kicker reveal">YOUR PRESENCE IS OUR PRESENT</span>
      <h2 className="rsvp-title reveal">R S V P</h2>
      <p className="rsvp-intro reveal">For timings, travel, or anything at all.</p>
      <div className="rsvp-list">
        {rsvpContacts.map((contact, index) => (
          <div className="rsvp-row reveal" style={{ transitionDelay: `${index * 120}ms` }} key={contact.phone}>
            <div className="rsvp-person">
              <span>{contact.name}</span>
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </div>
            <div className="rsvp-actions">
              <a className="rsvp-action call" href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}><Phone size={17}/></a>
              <a className="rsvp-action whatsapp" href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.name}`}><MessageCircle size={17}/></a>
            </div>
          </div>
        ))}
      </div>
      <div className="rsvp-note reveal"><Heart size={15}/> We can't wait to celebrate with you</div>
    </section>

    <section className="countdown-section">
      <span className="section-kicker reveal">THE MOMENT IS GETTING CLOSER</span>
      <h2 className="section-script reveal">Counting down to</h2>
      <div className="forever reveal">Forever</div>
      <Countdown />
      <div className="train reveal" aria-hidden="true">🚂</div>
      <h3 className="closing-names reveal">Apoorva <span>&</span> Shivam</h3>
      <p className="closing-date reveal">24 NOVEMBER 2026 · DELHI</p>
      <Heart className="closing-heart reveal" size={18}/>
    </section>

    <footer>MADE WITH LOVE · APOORVA & SHIVAM</footer>
    <a className="top-button" href="#top" aria-label="Back to top">↑</a>
  </main>;
}
