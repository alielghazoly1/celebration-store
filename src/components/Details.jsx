import { useReveal } from "../hooks/useReveal";
import { SectionHeader } from "./Countdown";

const CARDS = [
  { icon: "📅", eyebrow: "التاريخ",    title: "الخميس ١٩ مارس", sub: "٢٠٢٥ م",              accent: "from-[#f2c4ce] to-[#e8b4c2]", delay: 0 },
  { icon: "🌙", eyebrow: "الوقت",      title: "مساءً",           sub: "حفل عشاء وزفاف",      accent: "from-[#e8d5a3] to-[#d4b870]", delay: 0.1 },
  { icon: "🌹", eyebrow: "المكان",     title: "قاعة الوزير",    sub: "القاهرة، مصر",         accent: "from-[#c8d4c0] to-[#a8c0a0]", delay: 0.2 },
  { icon: "🪷", eyebrow: "كود الملابس", title: "ذهبي وعاجي",     sub: "Formal Dress Code",   accent: "from-[#ecdee0] to-[#d4c8cc]", delay: 0.3 },
];

const Card = ({ icon, eyebrow, title, sub, accent, delay }) => {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden
                 hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)] transition-all duration-300"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     box-shadow 0.3s ease`,
      }}
    >
      {/* Accent bar */}
      <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-l rounded-t-2xl ${accent}`} />

      {/* Icon */}
      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl
                      border border-[rgba(184,148,60,0.2)]"
        style={{
          background: "linear-gradient(135deg,rgba(232,213,163,0.25),rgba(242,224,216,0.25))",
          animation: `float 4s ${delay}s ease-in-out infinite`,
        }}>
        {icon}
      </div>

      <p className="font-['Cormorant_Garamond'] text-[0.62rem] tracking-[5px] text-[var(--color-gold)]
                    uppercase opacity-70 mb-2">
        {eyebrow}
      </p>
      <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] mb-1.5"
        style={{ fontSize: "clamp(1.1rem,2.5vw,1.35rem)" }}>
        {title}
      </p>
      <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm font-light">{sub}</p>
    </div>
  );
};

export default function Details() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      id="details"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,var(--color-ivory),var(--color-cream))" }}
    >
      {/* Subtle rose watermarks */}
      <p className="absolute -left-8 top-1/2 -translate-y-1/2 text-[9rem] opacity-[0.04] pointer-events-none select-none leading-none">🌸</p>
      <p className="absolute -right-8 top-1/2 -translate-y-1/2 text-[9rem] opacity-[0.04] pointer-events-none select-none leading-none scale-x-[-1]">🌸</p>

      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <SectionHeader eyebrow="تفاصيل الحفل" title="ليلة العمر" icon="🕯️" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CARDS.map((c) => <Card key={c.eyebrow} {...c} />)}
        </div>
      </div>
    </section>
  );
}