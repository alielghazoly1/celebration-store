export default function Footer() {
  return (
    <footer
      className="relative py-16 px-4 text-center border-t border-[rgba(184,148,60,0.12)]"
      style={{ background: "linear-gradient(180deg,var(--color-cream),var(--color-parchment))" }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px opacity-50"
        style={{ background: "linear-gradient(to right,transparent,var(--color-gold),transparent)" }} />

      {/* Monogram */}
      <div
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative
                   border border-[rgba(184,148,60,0.32)]"
        style={{ background: "linear-gradient(135deg,rgba(232,213,163,0.25),rgba(242,224,216,0.25))" }}
      >
        {/* Orbit */}
        <div className="absolute inset-[-6px] rounded-full border border-dashed border-[rgba(184,148,60,0.18)]"
          style={{ animation: "float 12s linear infinite" }} />
        <span className="font-['Playfair_Display'] italic text-[var(--color-gold)] text-xl">A & I</span>
      </div>

      {/* Names */}
      <h3 className="gold-text font-['Playfair_Display'] italic font-black mb-2"
        style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>
        أحمد & إسراء
      </h3>
      <p className="font-['Cormorant_Garamond'] tracking-[5px] text-[var(--color-muted)] text-sm mb-7">
        ١٩ مارس ٢٠٢٥
      </p>

      {/* Floating icons */}
      <div className="flex justify-center gap-5 mb-7">
        {["🌸","💍","🌹","💍","🌸"].map((ico, i) => (
          <span key={i} className="opacity-50 text-xl"
            style={{ animation: `float ${3 + i * 0.3}s ${i * 0.2}s ease-in-out infinite` }}>
            {ico}
          </span>
        ))}
      </div>

      <p className="font-['Cormorant_Garamond'] italic text-[var(--color-muted)] text-sm opacity-60">
        "وبحضوركم يتم لنا الفرح والسرور"
      </p>
    </footer>
  );
}