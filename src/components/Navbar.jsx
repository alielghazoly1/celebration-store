import { useState, useEffect } from "react";

const LINKS = [
  { label: "الرئيسية",    href: "#hero"      },
  { label: "التفاصيل",    href: "#details"   },
  { label: "قصتهم",       href: "#story"     },
  { label: "الموقع",      href: "#location"  },
  { label: "RSVP",        href: "#rsvp"      },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[rgba(253,248,240,0.92)] backdrop-blur-lg border-b border-[rgba(184,148,60,0.15)] shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-['Playfair_Display'] text-xl italic text-[var(--color-gold)] tracking-wide">
          A & I
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-['Cormorant_Garamond'] text-[0.75rem] tracking-[3px] uppercase
                         text-[var(--color-ink-light)] opacity-70 hover:opacity-100
                         hover:text-[var(--color-gold)] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#rsvp"
          className="hidden md:inline-block px-5 py-2 rounded-full text-sm font-bold
                     text-white font-['Tajawal'] tracking-wide
                     bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)]
                     shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
        >
          RSVP ✨
        </a>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="القائمة"
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
        >
          <span className={`block h-px w-6 bg-[var(--color-gold)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-px w-6 bg-[var(--color-gold)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[var(--color-gold)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-80 border-t border-[rgba(184,148,60,0.15)]" : "max-h-0"}`}>
        <div className="bg-[rgba(253,248,240,0.97)] backdrop-blur-lg px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className="font-['Cormorant_Garamond'] text-base tracking-[2px]
                         text-[var(--color-ink-light)] hover:text-[var(--color-gold)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={closeMenu}
            className="mt-2 text-center px-5 py-3 rounded-xl text-sm font-bold text-white
                       bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)]"
          >
            RSVP ✨
          </a>
        </div>
      </div>
    </nav>
  );
}