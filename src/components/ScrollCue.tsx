export default function ScrollCue({ visible = false }: { visible?: boolean }) {
  return (
    <a
      className={`scroll-cue ${visible ? "scroll-cue-visible" : ""}`}
      href="#reveal"
      aria-label="Scroll to discover"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span>SCROLL TO EXPLORE</span>
      <i aria-hidden="true">⌄</i>
      <i aria-hidden="true">⌄</i>
    </a>
  );
}
