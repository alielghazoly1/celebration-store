import { useReveal } from "../hooks/useReveal";
import { SectionHeader } from "./Countdown";

const INFO = [
  { icon: "📅", label: "التاريخ",      value: "الخميس ١٩ مارس ٢٠٢٥" },
  { icon: "🕯️", label: "الوقت",       value: "مساءً — حفل عشاء وزفاف" },
  { icon: "🚗", label: "المواصلات",    value: "موقف سيارات مجاناً" },
  { icon: "👗", label: "كود الملابس", value: "Formal — ذهبي وعاجي" },
];

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-[rgba(184,148,60,0.1)] last:border-0">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0
                    border border-[rgba(184,148,60,0.2)]"
      style={{ background: "linear-gradient(135deg,rgba(232,213,163,0.2),rgba(242,224,216,0.2))" }}>
      {icon}
    </div>
    <div>
      <p className="font-['Cormorant_Garamond'] text-[0.6rem] tracking-[4px] uppercase
                    text-[var(--color-gold)] opacity-70 mb-0.5">
        {label}
      </p>
      <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] text-base leading-snug">
        {value}
      </p>
    </div>
  </div>
);

export default function Location() {
  const { ref, visible }       = useReveal(0.1);
  const { ref: panelRef, visible: panelVis } = useReveal(0.15);
  const { ref: mapRef,   visible: mapVis   } = useReveal(0.15);

  return (
    <section
      id="location"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,var(--color-parchment),var(--color-ivory))" }}
    >
      {/* Diamond bg pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 L38 20 L20 38 L2 20 Z' fill='none' stroke='%23b8943c' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <SectionHeader eyebrow="الموقع" title="مكان الاحتفال" icon="📍" />
        </div>

        {/* Two col — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">

          {/* Info panel */}
          <div
            ref={panelRef}
            className="glass-card rounded-2xl p-6 sm:p-8"
            style={{
              opacity:    panelVis ? 1 : 0,
              transform:  panelVis ? "none" : "translateX(-32px)",
              transition: "opacity 0.85s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.85s 0.1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Venue heading */}
            <div className="pb-5 mb-1 border-b border-[rgba(184,148,60,0.12)]">
              <p className="font-['Cormorant_Garamond'] text-[0.62rem] tracking-[5px] text-[var(--color-gold)] opacity-70 mb-1">
                قاعة الحفل
              </p>
              <h3 className="font-['Playfair_Display'] italic text-[var(--color-ink)] mb-1"
                style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)" }}>
                قاعة الوزير
              </h3>
              <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm font-light">القاهرة، مصر</p>
            </div>

            {INFO.map((r) => <InfoRow key={r.label} {...r} />)}

            {/* Open maps CTA */}
            <a
              href="https://www.google.com/maps/search/قاعة+الوزير+القاهرة"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2
                         w-full py-3.5 rounded-xl text-white font-['Tajawal'] font-bold text-sm tracking-wide
                         bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)]
                         shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              🗺️ فتح خرائط جوجل
            </a>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="rounded-2xl overflow-hidden border border-[rgba(184,148,60,0.22)] shadow-[var(--shadow-float)] relative"
            style={{
              opacity:    mapVis ? 1 : 0,
              transform:  mapVis ? "none" : "translateX(32px)",
              transition: "opacity 0.85s 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.85s 0.25s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Corner accents */}
            {[["top-2.5","right-2.5"],["top-2.5","left-2.5"],["bottom-2.5","right-2.5"],["bottom-2.5","left-2.5"]].map(([v,h], i) => (
              <div key={i} className={`absolute w-5 h-5 z-10 ${v} ${h}`} style={{
                borderTop:    v.startsWith("top")    ? "1.5px solid var(--color-gold)" : "none",
                borderBottom: v.startsWith("bottom") ? "1.5px solid var(--color-gold)" : "none",
                borderRight:  h.startsWith("right")  ? "1.5px solid var(--color-gold)" : "none",
                borderLeft:   h.startsWith("left")   ? "1.5px solid var(--color-gold)" : "none",
                opacity: 0.65,
              }} />
            ))}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.6984520343985!2d31.174388775420375!3d30.131441114443934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458415a51940daf%3A0x13865a1b6695d6f1!2z2YHZitmE2Kcg2KfZhNmI2LLZitix!5e0!3m2!1sen!2seg!4v1771966795568!5m2!1sen!2seg"
              className="w-full block"
              style={{ height: "clamp(260px,40vw,440px)", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}