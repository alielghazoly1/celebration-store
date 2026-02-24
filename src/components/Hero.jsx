import { useState, useEffect } from "react";

/* ── Small SVG helpers ── */
const RingsSVG = () => (
  <svg width="110" height="65" viewBox="0 0 110 65" fill="none" className="drop-shadow-sm">
    <defs>
      <linearGradient id="rg1" x1="0" y1="0" x2="90" y2="65">
        <stop offset="0%"   stopColor="#d4b870" />
        <stop offset="100%" stopColor="#8b6914" />
      </linearGradient>
      <linearGradient id="rg2" x1="110" y1="0" x2="20" y2="65">
        <stop offset="0%"   stopColor="#d4b870" />
        <stop offset="100%" stopColor="#8b6914" />
      </linearGradient>
    </defs>
    {/* Ring 1 */}
    <circle cx="42" cy="32" r="26" stroke="rgba(184,148,60,0.2)" strokeWidth="2.5" fill="none" />
    <circle cx="42" cy="32" r="26" stroke="url(#rg1)" strokeWidth="2.5" fill="none"
      strokeDasharray="164" strokeDashoffset="164"
      style={{ animation: "drawRing 1.6s 0.3s forwards ease-out" }} />
    {/* Ring 2 */}
    <circle cx="68" cy="32" r="26" stroke="rgba(184,148,60,0.2)" strokeWidth="2.5" fill="none" />
    <circle cx="68" cy="32" r="26" stroke="url(#rg2)" strokeWidth="2.5" fill="none"
      strokeDasharray="164" strokeDashoffset="164"
      style={{ animation: "drawRing 1.6s 0.6s forwards ease-out" }} />
    {/* Diamond */}
    <polygon points="42,17 47,26 42,34 37,26"
      fill="rgba(232,213,163,0.95)"
      style={{ animation: "scaleIn 0.5s 1.4s both" }} />
    <polygon points="42,17 47,26 42,22 37,26" fill="rgba(255,255,255,0.55)" />
  </svg>
);

const WreathSVG = ({ flip }) => (
  <svg
    width="70" height="140" viewBox="0 0 70 140" fill="none"
    className="opacity-50 hidden sm:block"
    style={flip ? { transform: "scaleX(-1)" } : {}}
  >
    {/* Stem */}
    <path d="M55 70 Q25 55 18 28" stroke="#b8943c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M55 70 Q22 70 14 50" stroke="#b8943c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M55 70 Q24 88 18 110" stroke="#b8943c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Leaves */}
    {[[24,30],[16,52],[20,72],[18,95],[22,112]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx="7" ry="12"
        fill={i % 2 === 0 ? "#c8d4c0" : "#b0c8a8"} opacity="0.75"
        transform={`rotate(${-25 + i * 14} ${x} ${y})`} />
    ))}
    {/* Rosebuds */}
    {[[22,35],[14,56],[22,105]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="5.5" fill={["#f2c4ce","#e8b4c2","#f5d0d8"][i]} opacity="0.85" />
        <circle cx={x} cy={y} r="3"   fill="white" opacity="0.4" />
      </g>
    ))}
  </svg>
);

const CornerDeco = ({ pos }) => (
  <div className={`absolute w-6 h-6 opacity-50 ${pos}`}
    style={{
      borderTop:    pos.includes("top")    ? "1.5px solid var(--color-gold)" : "none",
      borderBottom: pos.includes("bottom") ? "1.5px solid var(--color-gold)" : "none",
      borderRight:  pos.includes("right")  ? "1.5px solid var(--color-gold)" : "none",
      borderLeft:   pos.includes("left")   ? "1.5px solid var(--color-gold)" : "none",
    }}
  />
);

export default function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  /* Staggered entrance helpers */
  const enter = (delay) => ({
    opacity:    show ? 1 : 0,
    transform:  show ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1),
                 transform 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
      style={{
        background: "linear-gradient(160deg,#fdf8f0 0%,#faf2e4 40%,#f5ecda 70%,#fdf8f0 100%)",
      }}
    >
      {/* Decorative outer rings (desktop) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[480, 660, 840].map((sz, i) => (
          <div key={i} className="absolute rounded-full border border-[rgba(184,148,60,0.07)]"
            style={{ width: sz, height: sz, animation: `float ${18 + i * 6}s ease-in-out infinite`, animationDelay: `${i * 2}s` }} />
        ))}
      </div>

      {/* Pre-heading */}
      <div style={enter(0.1)} className="text-center mb-6">
        <p className="font-['Cormorant_Garamond'] text-xs tracking-[8px] text-[var(--color-gold)] uppercase opacity-80">
          ✦ دعوة زفاف ✦
        </p>
      </div>

      {/* Main card */}
      <div
        className="glass-card relative rounded-3xl w-full max-w-xl px-6 py-10 sm:px-10 sm:py-14 text-center"
        style={enter(0.2)}
      >
        {/* Corner ornaments */}
        <CornerDeco pos="top-4 right-4" />
        <CornerDeco pos="top-4 left-4" />
        <CornerDeco pos="bottom-4 right-4" />
        <CornerDeco pos="bottom-4 left-4" />

        {/* Top shimmer line */}
        <div className="absolute top-0 left-[20%] right-[20%] h-px opacity-60"
          style={{ background: "linear-gradient(to right,transparent,var(--color-gold),transparent)" }} />

        {/* Greeting */}
        <div style={enter(0.35)}>
          <p className="font-['Tajawal'] text-sm sm:text-base text-[var(--color-stone)] font-light leading-8 mb-6">
            بكل الود والمحبة والتقدير<br />
            <span className="opacity-60 text-sm">نتشرف بدعوتكم لحضور حفل زفاف</span>
          </p>
        </div>

        {/* Wreaths + Names */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4" style={enter(0.5)}>
          <WreathSVG />
          <div>
            <h1 className="gold-text font-['Playfair_Display'] font-black leading-none text-6xl sm:text-7xl md:text-8xl">
              أحمد
            </h1>
            {/* Rings */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-3" style={{ animation: "float 4s ease-in-out infinite" }}>
              <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(to right,transparent,var(--color-gold))" }} />
              <RingsSVG />
              <div className="h-px w-10 sm:w-16" style={{ background: "linear-gradient(to left,transparent,var(--color-gold))" }} />
            </div>
            <h1 className="gold-text font-['Playfair_Display'] font-black leading-none text-6xl sm:text-7xl md:text-8xl">
              إسراء
            </h1>
          </div>
          <WreathSVG flip />
        </div>

        {/* Tagline */}
        <div style={enter(0.65)}>
          <p className="font-['Tajawal'] text-sm text-[var(--color-ink-light)] opacity-65 mt-2">
            الداعي: أختي العروسة 💐
          </p>
        </div>

        {/* Date badge */}
        <div style={enter(0.8)} className="mt-8">
          <div className="inline-flex flex-col items-center px-8 py-4 rounded-2xl border border-[rgba(184,148,60,0.3)]"
            style={{ background: "linear-gradient(135deg,rgba(232,213,163,0.18),rgba(242,224,216,0.12))" }}>
            <p className="font-['Cormorant_Garamond'] text-[0.65rem] tracking-[6px] text-[var(--color-gold)] uppercase opacity-75 mb-1">
              موعد الفرحة
            </p>
            <p className="font-['Playfair_Display'] text-xl sm:text-2xl text-[var(--color-ink)] italic">
              الخميس، ١٩ مارس ٢٠٢٥
            </p>
            <p className="font-['Tajawal'] text-xs text-[var(--color-stone)] mt-1">🕯️ مساءً 🕯️</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={enter(1.1)} className="mt-12 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12" style={{ background: "linear-gradient(to bottom,var(--color-gold),transparent)" }} />
        <p className="font-['Cormorant_Garamond'] text-[0.65rem] tracking-[5px] text-[var(--color-muted)] italic">تابع للأسفل</p>
      </div>
    </section>
  );
}