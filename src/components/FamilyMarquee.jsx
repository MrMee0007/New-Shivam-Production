/**
 * FamilyMarquee — Continuous scrolling marquee of family & couple photos.
 * Two rows moving in opposite directions with elegant card styling.
 * Features rounded cards with subtle shadows, gold borders on hover,
 * and a soft parallax speed difference between rows.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLD = (file, w = 600) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const ROW_A = [
  CLD("v1795506005/IMG_8369.jpg"),
  CLD("v1795497804/2B4A4804.jpg"),
  CLD("v1794174544/6M4A7674.jpg"),
  CLD("v1795643193/4.jpg"),
  CLD("v1794174543/6M4A7663.jpg"),
  CLD("v1795506003/IMG_1252.jpg"),
  CLD("v1795497806/6M4A7429.jpg"),
  CLD("v1795643193/7.jpg"),
  CLD("v1794174542/6M4A7645.jpg"),
  CLD("v1795506000/2B4A4976.jpg"),
];

const ROW_B = [
  CLD("v1795506002/2B4A4905.jpg"),
  CLD("v1795497805/2B4A4947.jpg"),
  CLD("v1794174544/6M4A7648.jpg"),
  CLD("v1795643194/WhatsApp_Im3age_2026-11-24_at_3.40.35_PM.jpg"),
  CLD("v1794174540/6M4A7629.jpg"),
  CLD("v1795506003/IMG_1240.jpg"),
  CLD("v1795497806/6M4A7436.jpg"),
  CLD("v1794174537/6M4A7624.jpg"),
  CLD("v1795505999/2B4A4940.jpg"),
  CLD("v1795506001/IMG_1227.jpg"),
];

const CARD_W = 320;
const CARD_H = 220;
const GAP = 14;

const KEYFRAMES = `
  @keyframes familyMarqueeL {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes familyMarqueeR {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
`;

function MarqueeStrip({ images, direction = "L", speed = 40 }) {
  const tiles = [...images, ...images];
  const totalW = images.length * (CARD_W + GAP);
  const dur = totalW / speed;

  return (
    <div
      style={{ overflow: "hidden", position: "relative" }}
      onMouseEnter={(e) => {
        const inner = e.currentTarget.querySelector(".fm-inner");
        if (inner) inner.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const inner = e.currentTarget.querySelector(".fm-inner");
        if (inner) inner.style.animationPlayState = "running";
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to right, #0a0a0a, transparent)",
          zIndex: 5, pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to left, #0a0a0a, transparent)",
          zIndex: 5, pointerEvents: "none",
        }}
      />

      <div
        className="fm-inner"
        style={{
          display: "flex",
          gap: `${GAP}px`,
          width: "max-content",
          animation: `familyMarquee${direction} ${dur}s linear infinite`,
        }}
      >
        {tiles.map((src, i) => (
          <div
            key={i}
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              flexShrink: 0,
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              border: "1.5px solid rgba(245,240,232,0.06)",
              transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,106,0.5)";
              e.currentTarget.style.boxShadow = "0 4px 30px rgba(212,175,106,0.15)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,240,232,0.06)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={src}
              alt="Family & couple moment"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Soft vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FamilyMarquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#0a0a0a", padding: "80px 0 70px", overflow: "hidden" }}
    >
      <style>{KEYFRAMES}</style>

      {/* Header */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 44px", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#D4AF6A",
            marginBottom: "16px",
          }}
        >
          ◈ &nbsp; Family & Love Stories &nbsp; ◈
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 1.05,
            margin: "0 auto 20px",
            maxWidth: "700px",
          }}
        >
          Bonds that<br />
          <span style={{ color: "#D4AF6A" }}>last forever.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.45)",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          From intimate family moments to candid couple portraits —
          we capture the connections that make life beautiful.
        </motion.p>
      </div>

      {/* Row 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "14px" }}
      >
        <MarqueeStrip images={ROW_A} direction="L" speed={30} />
      </motion.div>

      {/* Row 2 — scrolls right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <MarqueeStrip images={ROW_B} direction="R" speed={25} />
      </motion.div>
    </section>
  );
}
