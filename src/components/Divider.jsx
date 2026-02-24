export default function Divider({ icon = "✦" }) {
  return (
    <div className="flex items-center gap-3 max-w-xs mx-auto px-4 py-2 opacity-40">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,var(--color-champagne))" }} />
      <span className="text-[var(--color-gold)] text-sm">{icon}</span>
      <span className="text-[var(--color-rose-dust)] text-[0.5rem]">✦</span>
      <span className="text-[var(--color-gold)] text-sm">{icon}</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left,transparent,var(--color-champagne))" }} />
    </div>
  );
}