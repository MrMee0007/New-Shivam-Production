/**
 * CameraFilmStrip
 * ───────────────
 * Looks exactly like a real opened 35mm camera film roll:
 *   • Matte-black strip with punched sprocket holes on both edges
 *   • Film frames showing grayscale-tinted images
 *   • Two rows scroll in opposite directions, infinitely
 *   • Gold/silver edge sheen for that "exposed film" feel
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Images for the two strips ── */
const CLD = (file) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/${file}`;

const STRIP_1 = [
  CLD("v1795497814/2B4A4787.jpg"),
  CLD("v1795497813/6M4A7818.jpg"),
  CLD("v1794770058/WhatsApp_Image_2026-11-15_at_11.25.49_PM.jpg"),
  CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.35_PM.jpg"),
  CLD("v1794174548/6M4A7611.jpg"),
  CLD("v1795505066/081A9979.jpg"),
  CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM_1.jpg"),
  CLD("v1795497812/2B4A4734.jpg"),
  CLD("v1795497811/6M4A7808.jpg"),
  CLD("v1795506005/IMG_8369.jpg"),
  CLD("v1795643193/12.jpg"),
  CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.47_PM.jpg"),
];

const STRIP_2 = [
  CLD("v1795497814/2B4A4793.jpg"),
  CLD("v1795497811/081A0161.jpg"),
  CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.22.43_PM.jpg"),
  CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.34_PM.jpg"),
  CLD("v1794174545/6M4A7758.jpg"),
  CLD("v1795505063/081A5304.jpg"),
  CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.47_PM.jpg"),
  CLD("v1795497808/6M4A7485.jpg"),
  CLD("v1795497807/6M4A8185.jpg"),
  CLD("v1795506002/2B4A4905.jpg"),
  CLD("v1795643193/7.jpg"),
  CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.38_PM.jpg"),
];

/* ── Sprocket holes row ── */
function SprocketHoles() {
  return (
    <div className="flex items-center gap-[10px] px-2">
      {Array.from({ length: 32 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "14px",
            height: "10px",
            borderRadius: "2px",
            backgroundColor: "#000",
            flexShrink: 0,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Single scrolling strip ── */
function FilmRoll({ images, direction = -1, speed = 35, label }) {
  /* Duplicate for seamless loop */
  const frames = [...images, ...images, ...images];

  /* px per second → total width in px for one set */
  const frameW = 180; /* px — including gap */
  const totalW = images.length * frameW;
  const duration = totalW / speed;

  return (
    <div
      style={{
        background: "#0d0d0d",
        borderTop: "1.5px solid rgba(255,255,255,0.06)",
        borderBottom: "1.5px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top sprocket row */}
      <div
        style={{
          height: "24px",
          background: "#000",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <SprocketHoles />
      </div>

      {/* Film edge label */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: "12px",
            top: "32px",
            zIndex: 10,
            fontSize: "7px",
            letterSpacing: "0.3em",
            color: "rgba(212,175,106,0.5)",
            fontFamily: "monospace",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {label}
        </div>
      )}

      {/* Scrolling frames */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          padding: "6px 0",
          width: "max-content",
          animation: `filmScroll${direction > 0 ? "R" : "L"} ${duration}s linear infinite`,
        }}
      >
        {frames.map((src, i) => (
          <div
            key={i}
            style={{
              width: "174px",
              height: "116px",
              flexShrink: 0,
              borderRadius: "1px",
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.07)",
              position: "relative",
              background: "#111",
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.1) brightness(0.85)",
                display: "block",
              }}
            />
            {/* Film grain overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 3px)",
                mixBlendMode: "multiply",
              }}
            />
            {/* Frame number */}
            <span
              style={{
                position: "absolute",
                bottom: "3px",
                right: "5px",
                fontSize: "7px",
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}
            >
              {String(i % images.length + 1).padStart(2, "0")}A
            </span>
          </div>
        ))}
      </div>

      {/* Bottom sprocket row */}
      <div
        style={{
          height: "24px",
          background: "#000",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <SprocketHoles />
      </div>

      {/* Left edge fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          left: 0,
          width: "80px",
          background: "linear-gradient(to right, #0a0a0a, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      {/* Right edge fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          left: "auto",
          right: 0,
          width: "80px",
          background: "linear-gradient(to left, #0a0a0a, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}

/* ── Keyframe styles injected once ── */
const KEYFRAME_STYLE = `
  @keyframes filmScrollL {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-100% / 3)); }
  }
  @keyframes filmScrollR {
    from { transform: translateX(calc(-100% / 3)); }
    to   { transform: translateX(0); }
  }
`;

export default function CameraFilmStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        paddingTop: "0",
        paddingBottom: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Inject keyframes */}
      <style>{KEYFRAME_STYLE}</style>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          padding: "40px 0 28px",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.45em",
          color: "rgba(212,175,106,0.6)",
          textTransform: "uppercase",
        }}
      >
        ◈ &nbsp; Frames from the reel &nbsp; ◈
      </motion.div>

      {/* Strip 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "10px" }}
      >
        <FilmRoll images={STRIP_1} direction={-1} speed={32} label="NSP · 35mm · KODAK 500T" />
      </motion.div>

      {/* Strip 2 — scrolls right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <FilmRoll images={STRIP_2} direction={1} speed={28} label="NSP · 35mm · FUJI 400H" />
      </motion.div>

      {/* Bottom label */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 36px",
          fontFamily: "monospace",
          fontSize: "8px",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.12)",
          textTransform: "uppercase",
        }}
      >
        New Shivam Production House · Est. 2012 · Mathura
      </div>
    </section>
  );
}
