import { useReveal } from "../hooks/useReveal";
import { SectionHeader } from "./Countdown";

const EVENTS = [
  { year: "البداية",         text: "أول لقاء جمعهم القدر بإرادة الله",               icon: "✨", side: "right", delay: 0 },
  { year: "التعارف",         text: "بدأت القصة تُحكى بين قلبين",                     icon: "💌", side: "left",  delay: 0.15 },
  { year: "الخطوبة",         text: 'قال لها: "أنتِ من اخترت لتعمير حياتي"',         icon: "💍", side: "right", delay: 0.3 },
  { year: "١٩ مارس ٢٠٢٥", text: "يوم اتحد فيه القلبان للأبد",                       icon: "👑", side: "left",  delay: 0.45 },
  { year: "للأبد",           text: "وبعدها… حياة مليئة بالحب والسعادة",               icon: "🌹", side: "right", delay: 0.6 },
];

/* ── Desktop: alternating left/right  ── */
const DesktopItem = ({ year, text, icon, side, delay }) => {
  const { ref, visible } = useReveal(0.25);
  const isRight = side === "right";

  return (
    <div
      ref={ref}
      className="hidden sm:grid items-center mb-10"
      style={{
        gridTemplateColumns: "1fr 56px 1fr",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : `translateX(${isRight ? 40 : -40}px)`,
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Left */}
      <div className="pr-6 text-right">
        {!isRight ? (
          <div className="glass-card inline-block rounded-2xl px-5 py-4 text-right">
            <p className="font-['Cormorant_Garamond'] text-[0.62rem] tracking-[4px] text-[var(--color-gold)] opacity-75 mb-1.5">
              {year}
            </p>
            <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] text-base leading-relaxed">
              {text}
            </p>
          </div>
        ) : (
          <p className="font-['Cormorant_Garamond'] italic text-[var(--color-muted)] text-sm tracking-[3px]">{year}</p>
        )}
      </div>

      {/* Node */}
      <div className="flex justify-center relative z-10">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg
                     border-2 border-white shadow-md"
          style={{
            background: "linear-gradient(135deg,var(--color-champagne),var(--color-rose-dust))",
            animation: `heartbeat 2.5s ${delay}s ease-in-out infinite`,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Right */}
      <div className="pl-6">
        {isRight ? (
          <div className="glass-card inline-block rounded-2xl px-5 py-4">
            <p className="font-['Cormorant_Garamond'] text-[0.62rem] tracking-[4px] text-[var(--color-gold)] opacity-75 mb-1.5">
              {year}
            </p>
            <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] text-base leading-relaxed">
              {text}
            </p>
          </div>
        ) : (
          <p className="font-['Cormorant_Garamond'] italic text-[var(--color-muted)] text-sm tracking-[3px]">{year}</p>
        )}
      </div>
    </div>
  );
};

/* ── Mobile: simple vertical list ── */
const MobileItem = ({ year, text, icon, delay }) => {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className="sm:hidden flex gap-4 mb-8"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : "translateY(24px)",
        transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Left: icon + line */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-base
                     border-2 border-white shadow-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg,var(--color-champagne),var(--color-rose-dust))" }}
        >
          {icon}
        </div>
        <div className="flex-1 w-px" style={{ background: "linear-gradient(to bottom,var(--color-rose-dust),transparent)" }} />
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl px-4 py-3 flex-1 mb-2">
        <p className="font-['Cormorant_Garamond'] text-[0.6rem] tracking-[3px] text-[var(--color-gold)] opacity-75 mb-1">
          {year}
        </p>
        <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default function LoveStory() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,var(--color-cream),var(--color-blush),var(--color-cream))" }}
    >
      {/* Watermark */}
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    font-['Playfair_Display'] italic font-black text-[rgba(184,148,60,0.04)]
                    whitespace-nowrap pointer-events-none select-none"
        style={{ fontSize: "clamp(2.5rem,10vw,8rem)" }}>
        حكاية حب
      </p>

      <div className="max-w-2xl mx-auto relative z-10">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <SectionHeader eyebrow="قصتهم" title="حكاية حب" icon="🌹" />
        </div>

        {/* Desktop timeline line */}
        <div className="relative hidden sm:block">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-40"
            style={{ background: "linear-gradient(to bottom,transparent,var(--color-champagne) 15%,var(--color-rose-dust) 85%,transparent)" }} />
          {EVENTS.map((e, i) => <DesktopItem key={i} {...e} />)}
        </div>

        {/* Mobile vertical list */}
        <div className="sm:hidden">
          {EVENTS.map((e, i) => <MobileItem key={i} {...e} />)}
        </div>
      </div>
    </section>
  );
}