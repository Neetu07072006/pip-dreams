
import { useEffect, useState } from "react";
import { Moon, Sun, Volume2, VolumeX, Sparkles } from "lucide-react";
import "./Header.css";

const links = [
  { label: "Dreams", href: "#projects" },
  { label: "Our story", href: "#story" },
  { label: "Guestbook", href: "#guestbook" },
];

export default function Header({ night, setNight, muted, setMuted, onLogoClick }) {
  const [active, setActive] = useState("#projects");

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="pip-ticker" aria-label="The Midnight Nursery is open">
        <div className="pip-ticker-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              ✦ THE MIDNIGHT NURSERY IS OPEN ✦ GOOD THINGS START SMALL ✦
              EVERY DREAM DESERVES A LITTLE LIGHT ✦
            </span>
          ))}
        </div>
      </div>

      <header className="pip-header">
        <button
          className="pip-brand"
          onClick={onLogoClick}
          aria-label="Pip's Observatory — click for a surprise"
        >
          <span className="pip-brand-star"><Sparkles size={23} /></span>
          <span>Pip's <em>Observatory</em></span>
        </button>

        <nav className="pip-nav" aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={active === href ? "pip-nav-link active" : "pip-nav-link"}
              aria-current={active === href ? "location" : undefined}
              onClick={() => setActive(href)}
            >
              {label}
              <span className="pip-nav-indicator">✦</span>
            </a>
          ))}
        </nav>

        <div className="pip-toolbar">
          <button
            className="pip-tool-button"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Enable sound" : "Mute sound"}
            title={muted ? "Enable sound" : "Mute sound"}
          >
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <span className="pip-toolbar-divider" />
          <button
            className="pip-tool-button"
            onClick={() => setNight(!night)}
            aria-label={night ? "Switch to daytime" : "Switch to nighttime"}
            title={night ? "Daytime theme" : "Nighttime theme"}
          >
            {night ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>
    </>
  );
}
