import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Navigation, Heart, Phone, MessageCircle } from "lucide-react";
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
    {units.map(([label, value]) => <div className="count-unit" key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}

export default function App() {
  return <main>
    <section className="hero" id="top">
      <video className="hero-video" src="/videos/entry.mp4" muted playsInline autoPlay loop preload="metadata" />
      <div className="hero-video-wash" />
      <div className="hero-ornament" aria-hidden="true">✦</div>
      <div className="hero-copy">
        <span className="overline">WITH THE BLESSINGS OF OUR FAMILIES</span>
        <h1>Apoorva <em>&</em> Shivam</h1>
        <p>joyfully invite you to celebrate their wedding</p>
        <span className="hero-date">22 — 24 NOVEMBER 2026</span>
      </div>
      <ScrollCue />
      <div className="hero-flower flower-one">✿</div><div className="hero-flower flower-two">❀</div>
    </section>

    <section className="reveal-section" id="reveal">
      <video className="scratch-bg-video" src="/videos/scratch-background.mp4"
        poster="/images/scratch-background.jpg" muted playsInline autoPlay loop preload="metadata" />
      <div className="scratch-bg-wash" />
      <div className="section-kicker">A LOVE STORY WORTH CELEBRATING</div>
      <h2 className="section-script">The celebration begins</h2>
      <ScratchCard />
      <p className="reveal-caption">A little surprise awaits beneath the shimmer</p>
      <a className="down-link" href="#mehendi"><ArrowDown size={18}/><span>SCROLL DOWN</span></a>
    </section>

    <div className="events-intro">
      <span className="section-kicker">BRIDE'S SIDE</span>
      <h2 className="section-script">The Wedding Festivities</h2>
      <p>Three days filled with rituals, laughter and memories.</p>
    </div>
    {events.map((event, index) => <EventSection key={event.id} event={event} index={index} />)}

    <section className="venue-section" id="venue">
      <span className="section-kicker">CELEBRATE WITH US</span>
      <h2 className="section-script">The Venue</h2>
      <div className="venue-card">
        <div className="venue-icon"><MapPin size={25}/></div>
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
        <a className="map-button" href={venue.mapUrl} target="_blank" rel="noreferrer">
          <Navigation size={16}/> GET DIRECTIONS
        </a>
      </div>
    </section>

    <section className="rsvp-section" id="rsvp">
      <span className="section-kicker">WE ARE ONLY A CALL AWAY</span>
      <h2 className="rsvp-title">R S V P</h2>
      <p className="rsvp-intro">For timings, travel, or anything at all.</p>
      <div className="rsvp-list">
        {rsvpContacts.map((contact) => (
          <div className="rsvp-row" key={contact.phone}>
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
    </section>

    <section className="countdown-section">
      <span className="section-kicker">THE MOMENT IS GETTING CLOSER</span>
      <h2 className="section-script">Counting down to</h2>
      <div className="forever">Forever</div>
      <Countdown />
      <div className="train" aria-hidden="true">🚂</div>
      <h3 className="closing-names">Apoorva <span>&</span> Shivam</h3>
      <p className="closing-date">24 NOVEMBER 2026 · DELHI</p>
      <Heart className="closing-heart" size={18}/>
    </section>

    <footer>MADE WITH LOVE · APOORVA & SHIVAM</footer>
    <a className="top-button" href="#top" aria-label="Back to top">↑</a>
  </main>;
}