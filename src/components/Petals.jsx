import { useMemo } from "react";

const COLORS = ["#f2c4ce","#e8b4c2","#f5d0d8","#ead0c8","#f0c8d0"];

export default function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:     Math.random() * 105,
      delay:    Math.random() * 14,
      duration: 10 + Math.random() * 12,
      size:     10 + Math.random() * 18,
      drift:    (Math.random() - 0.5) * 200,
      spin:     Math.random() > 0.5 ? 270 : -270,
      color:    COLORS[i % COLORS.length],
    }))
  , []);

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position:       "fixed",
            left:           `${p.left}%`,
            top:            "-60px",
            pointerEvents:  "none",
            zIndex:         0,
            "--drift":      `${p.drift}px`,
            "--spin":       `${p.spin}deg`,
            animation:      `petalFall ${p.duration}s ${p.delay}s infinite ease-in`,
          }}
        >
          {/* Simple SVG petal — lightweight */}
          <svg width={p.size} height={p.size * 1.6} viewBox="0 0 30 48" fill="none">
            <ellipse cx="15" cy="24" rx="10" ry="22" fill={p.color} opacity="0.7" />
            <ellipse cx="15" cy="24" rx="5"  ry="15" fill="white"  opacity="0.2" />
          </svg>
        </div>
      ))}
    </>
  );
}