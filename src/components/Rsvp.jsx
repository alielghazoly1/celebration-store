import { useState, useMemo } from "react";
import { useReveal } from "../hooks/useReveal";
import { SectionHeader } from "./Countdown";

/* ── Confetti pieces (memoised so they don't change on re-render) ── */
const CONFETTI_COUNT = 70;
const COLORS = ["#b8943c","#e8d5a3","#f2c4ce","#c8d4c0","#ffffff","#d4b870","#e8b4c2"];

const Confetti = ({ active }) => {
  const pieces = useMemo(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id:     i,
      x:      15 + Math.random() * 70,
      drift:  (Math.random() - 0.5) * 400,
      spin:   Math.random() > 0.5 ? 540 : -540,
      color:  COLORS[i % COLORS.length],
      size:   5 + Math.random() * 8,
      delay:  Math.random() * 0.5,
      dur:    1.4 + Math.random() * 0.8,
      round:  Math.random() > 0.5,
    }))
  , []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left:     `${p.x}%`,
          top:      "40%",
          width:    p.size,
          height:   p.size,
          background:   p.color,
          borderRadius: p.round ? "50%" : "2px",
          "--drift":    `${p.drift}px`,
          "--spin":     `${p.spin}deg`,
          animation:    `confettiFall ${p.dur}s ${p.delay}s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
        }} />
      ))}
    </div>
  );
};

/* ── Styled input ── */
const GoldInput = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 rounded-xl font-['Tajawal'] text-[var(--color-ink)] text-base
               bg-white/70 border border-[rgba(184,148,60,0.28)] outline-none text-right
               focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[rgba(184,148,60,0.15)]
               transition-all duration-200 placeholder:text-[var(--color-muted)]"
  />
);

/* ── Guest count picker ── */
const GuestPicker = ({ value, onChange }) => (
  <div className="flex gap-2.5">
    {[1, 2, 3, 4].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className={`flex-1 py-3 rounded-xl font-['Playfair_Display'] text-lg transition-all duration-200
                    ${value === n
                      ? "bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)] text-white font-bold shadow-md"
                      : "bg-white/70 border border-[rgba(184,148,60,0.25)] text-[var(--color-ink)] hover:border-[var(--color-gold)]"
                    }`}
      >
        {n}
      </button>
    ))}
  </div>
);

export default function RSVP() {
  const [step,    setStep]    = useState("init"); // init | form | no | done
  const [name,    setName]    = useState("");
  const [guests,  setGuests]  = useState(1);
  const [confetti, setConfetti] = useState(false);
  const { ref, visible } = useReveal(0.1);

  const boom = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3200);
  };

  const handleYes    = () => { setStep("form"); boom(); };
  const handleSubmit = () => { if (name.trim()) { setStep("done"); boom(); } };
  const handleBack   = () => { setStep("init"); setName(""); setGuests(1); };

  return (
    <section
      id="rsvp"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg,var(--color-ivory),var(--color-blush),var(--color-ivory))" }}
    >
      <Confetti active={confetti} />

      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(232,213,163,0.18),transparent 70%)" }} />

      <div ref={ref} className={`reveal ${visible ? "visible" : ""} max-w-lg mx-auto relative z-10`}>
        <SectionHeader eyebrow="RSVP" title="هتيجي تفرح معانا؟" icon="🎊" />

        <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm font-light text-center -mt-6 mb-10">
          يسعدنا تأكيد حضورك لهذه الليلة الاستثنائية
        </p>

        {/* Card */}
        <div className="glass-card rounded-2xl px-6 py-8 sm:px-10 sm:py-10 relative overflow-hidden">
          {/* Top shimmer */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px opacity-50"
            style={{ background: "linear-gradient(to right,transparent,var(--color-gold),transparent)" }} />

          {/* ── INIT ── */}
          {step === "init" && (
            <div style={{ animation: "fadeUp 0.5s ease" }}>
              <p className="font-['Tajawal'] text-[var(--color-stone)] text-center text-sm mb-7">
                هل ستتشرف بحضور حفل زفاف أحمد وإسراء؟
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleYes}
                  className="flex-1 py-4 rounded-xl font-['Tajawal'] font-bold text-base text-white
                             bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)]
                             shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  ✨ بكل سرور، هحضر!
                </button>
                <button
                  type="button"
                  onClick={() => setStep("no")}
                  className="flex-1 py-4 rounded-xl font-['Tajawal'] text-base text-[var(--color-stone)]
                             bg-transparent border border-[rgba(184,148,60,0.3)]
                             hover:border-[var(--color-gold)] hover:text-[var(--color-ink)]
                             transition-all duration-300"
                >
                  😔 آسف، مش هقدر
                </button>
              </div>
            </div>
          )}

          {/* ── FORM ── */}
          {step === "form" && (
            <div style={{ animation: "fadeUp 0.5s ease" }}>
              <p className="font-['Playfair_Display'] italic text-[var(--color-gold)] text-center text-xl mb-7">
                يسعدنا حضورك! 🌸
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block font-['Cormorant_Garamond'] text-[0.62rem] tracking-[4px]
                                    text-[var(--color-gold)] uppercase opacity-75 mb-2">
                    اسمك
                  </label>
                  <GoldInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك هنا…"
                  />
                </div>

                <div>
                  <label className="block font-['Cormorant_Garamond'] text-[0.62rem] tracking-[4px]
                                    text-[var(--color-gold)] uppercase opacity-75 mb-2.5">
                    عدد الحضور معك
                  </label>
                  <GuestPicker value={guests} onChange={setGuests} />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  className={`mt-1 py-4 rounded-xl font-['Tajawal'] font-bold text-base tracking-wide transition-all duration-300
                              ${name.trim()
                                ? "bg-gradient-to-l from-[var(--color-gold-deep)] to-[var(--color-gold)] text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg"
                                : "bg-[rgba(184,148,60,0.15)] text-[var(--color-muted)] cursor-not-allowed"
                              }`}
                >
                  🌟 تأكيد الحضور
                </button>
              </div>
            </div>
          )}

          {/* ── NO ── */}
          {step === "no" && (
            <div className="text-center" style={{ animation: "scaleIn 0.5s ease" }}>
              <p className="text-4xl mb-4">💌</p>
              <p className="font-['Playfair_Display'] italic text-[var(--color-ink)] text-xl mb-2">
                هنتمنى تبقى معانا
              </p>
              <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm mb-7">
                إن شاء الله نشوفك في مناسبة تانية 🤍
              </p>
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2.5 rounded-xl font-['Tajawal'] text-sm text-[var(--color-gold)]
                           border border-[rgba(184,148,60,0.35)] hover:bg-[rgba(184,148,60,0.08)]
                           transition-all duration-200"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* ── DONE ── */}
          {step === "done" && (
            <div className="text-center" style={{ animation: "scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <div
                className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl
                           border-2 border-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg,var(--color-champagne),var(--color-rose-dust))",
                  animation:  "heartbeat 1.6s ease-in-out infinite",
                }}
              >
                🎉
              </div>
              <p className="font-['Playfair_Display'] italic text-[var(--color-gold)] mb-2"
                style={{ fontSize: "clamp(1.4rem,3.5vw,1.9rem)" }}>
                شكراً يا {name}!
              </p>
              <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm leading-8">
                في انتظارك بفارغ الصبر 🌸<br />
                {guests > 1 ? `أنت و${guests - 1} ضيوف كرام` : "حضورك وحده يكفي"}<br />
                وبحضوركم يتم لنا الفرح والسرور
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}