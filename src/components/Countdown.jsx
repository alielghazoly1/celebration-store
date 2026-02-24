import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";

/* ── Single digit card ── */
const DigitCard = ({ value, label }) => {
  const [animKey, setAnimKey] = useState(0);
  const [prev, setPrev]       = useState(value);

  useEffect(() => {
    if (value !== prev) {
      setAnimKey((k) => k + 1);
      setPrev(value);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Card */}
      <div className="relative" style={{ width: "clamp(64px,14vw,96px)", height: "clamp(72px,16vw,108px)" }}>
        {/* Soft glow border */}
        <div className="absolute inset-0 rounded-2xl opacity-40"
          style={{ background: "linear-gradient(135deg,var(--color-champagne),transparent,var(--color-rose-dust))" }} />

        <div
          key={animKey}
          className="glass-card absolute inset-0 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ animation: animKey > 0 ? "scaleIn 0.3s ease" : "none" }}
        >
          {/* Top half highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-white/40"
            style={{ borderBottom: "1px solid rgba(184,148,60,0.08)" }} />
          {/* Center seam */}
          <div className="absolute inset-x-2 top-1/2 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(184,148,60,0.25),transparent)" }} />

          <span className="gold-text font-['Playfair_Display'] font-bold relative z-10"
            style={{ fontSize: "clamp(1.6rem,5vw,2.6rem)", lineHeight: 1 }}>
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>

      <p className="font-['Cormorant_Garamond'] uppercase tracking-[3px] text-[var(--color-muted)]"
        style={{ fontSize: "0.65rem" }}>
        {label}
      </p>
    </div>
  );
};

const Separator = () => (
  <div className="flex flex-col gap-1.5 pb-7 self-center">
    {[0, 1].map((i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-champagne)]"
        style={{ animation: `sparkle ${1.4 + i * 0.4}s ${i * 0.2}s ease-in-out infinite` }} />
    ))}
  </div>
);

/* ── Section header reusable ── */
export const SectionHeader = ({ eyebrow, title, icon }) => (
  <div className="text-center mb-14">
    <p className="font-['Cormorant_Garamond'] text-[0.72rem] tracking-[7px] text-[var(--color-gold)] uppercase opacity-75 mb-3">
      ✦ {eyebrow} ✦
    </p>
    <h2 className="font-['Playfair_Display'] italic font-normal text-[var(--color-ink)]"
      style={{ fontSize: "clamp(1.8rem,4.5vw,2.8rem)" }}>
      {title}
    </h2>
    {/* Divider */}
    <div className="flex items-center gap-4 max-w-[200px] mx-auto mt-4">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,var(--color-champagne))" }} />
      <span style={{ animation: "heartbeat 2.2s ease-in-out infinite" }}>{icon}</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left,transparent,var(--color-champagne))" }} />
    </div>
  </div>
);

const WEDDING = new Date("2025-03-19T20:00:00");

export default function Countdown() {
  const [time, setTime]     = useState(null);  // null = loading
  const [expired, setExpired] = useState(false);
  const { ref, visible }    = useReveal();

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setTime(null);
      } else {
        setTime({
          d: Math.floor(diff / 86_400_000),
          h: Math.floor(diff / 3_600_000) % 24,
          m: Math.floor(diff / 60_000)    % 60,
          s: Math.floor(diff / 1_000)     % 60,
        });
      }
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,var(--color-parchment),var(--color-ivory),var(--color-parchment))" }}
    >
      {/* Watermark */}
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Playfair_Display']
                    italic font-black text-[rgba(184,148,60,0.04)] whitespace-nowrap pointer-events-none select-none"
        style={{ fontSize: "clamp(3rem,12vw,9rem)" }}>
        العد التنازلي
      </p>

      <div className={`reveal ${visible ? "visible" : ""} max-w-2xl mx-auto text-center relative z-10`}>
        <SectionHeader eyebrow="حتى يتم الفرح" title="العد التنازلي" icon="⏳" />

        {/* ── Expired state ── */}
        {expired && (
          <div
            className="glass-card rounded-2xl px-8 py-10 text-center"
            style={{ animation: "fadeUp 0.7s ease both" }}
          >
            <p className="text-5xl mb-4" style={{ animation: "heartbeat 1.8s ease-in-out infinite" }}>🎉</p>
            <p className="font-['Playfair_Display'] italic text-[var(--color-gold)] mb-2"
              style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)" }}>
              تم الفرح بالفعل!
            </p>
            <p className="font-['Tajawal'] text-[var(--color-stone)] text-sm font-light leading-7">
              اتزوج أحمد وإسراء يوم ١٩ مارس ٢٠٢٥<br />
              وبحضوركم تمّ لهم الفرح والسرور 🌸
            </p>
          </div>
        )}

        {/* ── Countdown digits ── */}
        {!expired && time && (
          <div className="flex items-start justify-center gap-2 sm:gap-4 flex-wrap">
            <DigitCard value={time.d} label="يوم"    />
            <Separator />
            <DigitCard value={time.h} label="ساعة"   />
            <Separator />
            <DigitCard value={time.m} label="دقيقة"  />
            <Separator />
            <DigitCard value={time.s} label="ثانية"  />
          </div>
        )}

        {/* Placeholder while calculating */}
        {!expired && !time && (
          <p className="font-['Tajawal'] text-[var(--color-muted)] text-sm">جارٍ الحساب…</p>
        )}

        <p className="font-['Cormorant_Garamond'] italic text-[var(--color-stone)] text-base mt-12 opacity-70">
          "وبحضوركم يتم لنا الفرح والسرور"
        </p>
      </div>
    </section>
  );
}