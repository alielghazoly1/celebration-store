import { useState, useEffect } from "react";

export default function Cursor() {
  const [pos, setPos]   = useState({ x: -200, y: -200 });
  const [lag, setLag]   = useState({ x: -200, y: -200 });
  const [down, setDown] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let raf;
    let target = { x: -200, y: -200 };
    let current = { x: -200, y: -200 };

    const onMove = (e) => {
      target = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      // detect hoverable elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHover(!!(el && (el.closest('button') || el.closest('a') || el.closest('[data-hover]'))));
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      setLag({ x: current.x, y: current.y });
      raf = requestAnimationFrame(animate);
    };

    const onDown = () => setDown(true);
    const onUp   = () => setDown(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div style={{
        position: "fixed",
        left: pos.x, top: pos.y,
        width: down ? 6 : hover ? 0 : 8,
        height: down ? 6 : hover ? 0 : 8,
        borderRadius: "50%",
        background: "var(--color-gold)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
        transition: "width 0.2s, height 0.2s",
        mixBlendMode: "multiply",
      }} />

      {/* Ring */}
      <div style={{
        position: "fixed",
        left: lag.x, top: lag.y,
        width: hover ? 48 : down ? 24 : 36,
        height: hover ? 48 : down ? 24 : 36,
        borderRadius: "50%",
        border: `1.5px solid ${hover ? "var(--color-rose-dust)" : "var(--color-gold)"}`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99998,
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
        opacity: 0.7,
      }} />
    </>
  );
}