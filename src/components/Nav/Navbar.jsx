import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "../../data/site.js";
import { ThemeToggle } from "../ui/ThemeToggle.jsx";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#home" className="logo">
          {SITE.first}
          <span>{SITE.last}</span>
        </a>
        <div className="nav-right">
          <ThemeToggle />
          <button className="menu-btn" type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${open ? "open" : ""}`}>
            {NAV_LINKS.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile">
      {[
        ["home", "Home"],
        ["work", "Work"],
        ["skills", "Skills"],
        ["contact", "Talk"],
      ].map(([id, label]) => (
        <a key={id} href={`#${id}`}>
          {label}
        </a>
      ))}
    </nav>
  );
}
