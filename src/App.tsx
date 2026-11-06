import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Phone, Music2, Music, Heart, ArrowDown, Volume2, VolumeX } from "lucide-react";
import ScratchCard from "./components/ScratchCard";
import EventSection from "./components/EventSection";
import { events, venue, rsvpContacts } from "./data/events";

function Countdown() {
  const target = new Date("2026-11-24T19:30:00+05:30").getTime();
  const [remaining, setRemaining] = useState(target - Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const safe = Math.max(0, remaining);
  const units = [
    ["Days", Math.floor(safe / 86400000)],
    ["Hours", Math.floor((safe % 86400000) / 3600000)],
    ["Minutes", Math.floor((safe % 3600000) / 60000)],
    ["Seconds", Math.floor((safe % 60000) / 1000)],
  ] as const;
  return <div className="countdown-grid">
    {units.map(([label, value]) => <div className="count-unit" key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}

export default function App() {
  const heroVideo = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [videoSound, setVideoSound] = useState(true);
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const openInvitation = async () => {
    if (started) return;
    setStarted(true);

    // Start the soundtrack and opening film from the same user gesture.
    // Browsers permit both because this handler is triggered by the first tap.
    const audio = musicRef.current;
    if (audio) {
      // Do not wait for the soundtrack to buffer before starting the film.
      audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    }

    const video = heroVideo.current;
    if (video) {
      video.muted = !videoSound;
      try { await video.play(); }
      catch {
        video.muted = true;
        await video.play().catch(() => {});
      }
    }

    // The scroll cue appears only when the opening film finishes.
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;
    if (musicOn) { audio.pause(); setMusicOn(false); }
    else { setMusicOn(true); await audio.play().catch(() => setMusicOn(false)); }
  };

  return <main>
    <audio ref={musicRef} src={asset("audio/wedding-bg-music.mp3")} loop preload="none" />
    <button className={`music-toggle ${started ? "is-visible" : ""}`} onClick={toggleMusic}
      aria-label={musicOn ? "Pause background music" : "Play background music"} title={musicOn ? "Pause music" : "Play music"}>
      {musicOn ? <Music size={17}/> : <Music2 size={17}/>}<span>{musicOn ? "MUSIC ON" : "MUSIC OFF"}</span>
    </button>
    <button className={`video-sound ${started ? "is-visible" : ""}`} onClick={() => {
      const next = !videoSound; setVideoSound(next);
      if (heroVideo.current) heroVideo.current.muted = !next;
    }} aria-label={videoSound ? "Mute opening video" : "Unmute opening video"}>
      {videoSound ? <Volume2 size={17}/> : <VolumeX size={17}/>}
    </button>

    <section className={`hero ${started ? "hero-started" : "hero-waiting"}`} id="top">
      <video ref={heroVideo} className="hero-video" src={asset("videos/entry.mp4")}
        poster={asset("images/start-image.jpg")} playsInline preload="none" muted onEnded={() => setScrollEnabled(true)} />
      <div className="hero-veil"/>
      {!started && <button className="opening-tap" onClick={openInvitation}
        aria-label="Tap to open the wedding invitation" title="Tap to open" /> }
      {started && <div className={`hero-scroll ${scrollEnabled ? "scroll-ready" : ""}`}>
        <span>{scrollEnabled ? "SCROLL TO EXPLORE" : "PLEASE ENJOY THE FILM"}</span>
        {scrollEnabled && <a href="#reveal" aria-label="Scroll to invitation"><ArrowDown size={20}/></a>}
      </div>}
    </section>

    <section className="reveal-section" id="reveal">
      <video className="scratch-bg-video" src={asset("videos/scratch-background.mp4")}
        poster={asset("images/scratch-background.jpg")} muted playsInline loop preload="none" aria-hidden="true" />
      <div className="scratch-bg-wash"/>
      <div className="ornament-line"><span>✧</span></div>
      <div className="section-kicker">A LITTLE SURPRISE</div>
      <h2 className="section-script">Scratch to reveal</h2>
      <ScratchCard/>
      <p className="reveal-caption">A touch of magic, made just for you</p>
      <a className="down-link" href="#events"><ArrowDown size={17}/><span>THE CELEBRATIONS</span></a>
    </section>

    <div className="events-intro" id="events">
      <span className="section-kicker">SAVE THE MOMENTS</span>
      <h2 className="section-script">The festivities</h2>
      <div className="ornament-line"><span>❀</span></div>
    </div>
    {events.map((event, index) => <EventSection key={event.id} event={event} index={index}/> )}

    <section className="venue-section" id="venue">
      <div className="section-kicker">WE WOULD LOVE TO WELCOME YOU</div>
      <h2 className="section-script">The venue</h2>
      <div className="venue-card">
        <div className="venue-topline">✧ &nbsp; WITH LOVE &nbsp; ✧</div>
        <div className="venue-icon"><MapPin size={24}/></div>
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
        <a className="map-button" href={venue.mapUrl} target="_blank" rel="noreferrer">
          <Navigation size={16}/> OPEN IN MAPS
        </a>
      </div>
    </section>

    <section className="rsvp-section" id="rsvp">
      <div className="section-kicker">YOUR PRESENCE IS OUR PRESENT</div>
      <h2 className="rsvp-title">R S V P</h2>
      <p className="rsvp-intro">For any assistance, please reach out to our family.</p>
      <div className="rsvp-list">
        {rsvpContacts.map(contact => <div className="rsvp-row" key={contact.phone}>
          <div className="rsvp-person"><span>{contact.name}</span><a href={`tel:${contact.phone}`}>{contact.phone}</a></div>
          <div className="rsvp-actions">
            <a className="rsvp-action call" href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}><Phone size={18}/><span>CALL</span></a>
            <a className="rsvp-action whatsapp" href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.name}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.7 1.5h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.3-6.2-3.6-8.4ZM12.1 21.8h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10a9.9 9.9 0 0 1 7.1 2.9 9.9 9.9 0 0 1 2.9 7.1c0 5.5-4.5 10-10 10Zm5.5-7.5c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2c-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z"/></svg><span>WHATSAPP</span>
            </a>
          </div>
        </div>)}
      </div>
    </section>

    <section className="countdown-section">
      <div className="countdown-orbit" aria-hidden="true"><span>✧</span><span>♥</span><span>✧</span></div>
      <div className="section-kicker">UNTIL OUR FOREVER BEGINS</div>
      <h2 className="section-script">The countdown</h2>
      <div className="forever">and then, forever</div>
      <Countdown/>
      <div className="closing-divider">✦ ───────── ♥ ───────── ✦</div>
      <h3 className="closing-names">Apoorva <span>&</span> Shivam</h3>
      <p className="closing-date">24 NOVEMBER 2026 <i>·</i> DELHI</p>
      <p className="closing-note">With love, and a lifetime of dreams.</p>
    </section>
    <footer><span>MADE WITH LOVE</span><span>APOORVA & SHIVAM</span><span>✧</span></footer>
    <a className="top-button" href="#top" aria-label="Back to top">↑</a>
  </main>;
}
