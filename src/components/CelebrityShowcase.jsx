/**
 * CelebrityShowcase
 * ──────────────────
 * High-impact dual-row auto-scroll marquee of celebrity / notable
 * personality images. Full colour, large cards, gold glow on hover,
 * rows run in opposite directions.
 * Hover over any row to pause it.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLD = (file, w = 700) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

/* ── All 13 celebrity images ── */
const ALL = [
  "v1794169610/WhatsApp_Image_2026-10-18_at_1.36.10_PM.jpg",
  "v1794169611/WhatsApp_Image_2026-10-18_at_1.40.33_PM.jpg",
  "v1794169611/WhatsApp_Image_2026-10-18_at_1.40.09_PM.jpg",
  "v1794169611/WhatsApp_Image_2026-10-18_at_1.40.35_PM.jpg",
  "v1794169613/WhatsApp_Image_2026-10-18_at_1.40.59_PM.jpg",
  "v1794169614/WhatsApp_Image_2026-10-18_at_1.41.01_PM.jpg",
  "v1794169616/WhatsApp_Image_2026-10-18_at_1.41.06_PM.jpg",
  "v1794169618/WhatsApp_Image_2026-10-18_at_1.41.16_PM.jpg",
  "v1794169621/WhatsApp_Image_2026-10-18_at_1.40.47_PM.jpg",
  "v1794169623/WhatsApp_Image_2026-10-18_at_1.41.50_PM.jpg",
  "v1794169624/WhatsApp_Image_2026-10-18_at_1.42.03_PM.jpg",
  "v1794169625/WhatsApp_Image_2026-10-18_at_1.42.10_PM.jpg",
  "v1794169626/WhatsApp_Image_2026-10-18_at_1.42.13_PM.jpg",
];

/* Split into two rows, staggered */
const ROW_1 = ALL.slice(0, 7);
const ROW_2 = ALL.slice(6);   /* slight overlap for variety */

const CARD_W = 300;  /* px */
const CARD_H = 210;  /* px */
const GAP    = 14;   /* px */

/* Inject scroll keyframes once */
const KF = `
  @keyframes marqueeL {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-50%)); }
  }
  @keyframes marqueeR {
    from { transform: translateX(calc(-50%)); }
    to   { transform: translateX(0); }
  }
`;

function MarqueeRow({ images, direction = "L", speed = 36 }) {
  /* Duplicate for seamless loop */
  const tiles = [...images, ...images];
  const totalW = images.length * (CARD_W + GAP);
  const dur = totalW / speed;

  return (
    <div
      style={{ overflow: "hidden", position: "relative", cursor: "default" }}
      /* Pause on hover */
      onMouseEnter={(e) => {
        const inner = e.currentTarget.querySelector(".marquee-inner");
        if (inner) inner.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const inner = e.currentTarget.querySelector(".marquee-inner");
        if (inner) inner.style.animationPlayState = "running";
      }}
    >
      {/* Left fade */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "100px",
        background: "linear-gradient(to right, #000, transparent)",
        zIndex: 5, pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "100px",
        background: "linear-gradient(to left, #000, transparent)",
        zIndex: 5, pointerEvents: "none",
      }} />

      <div
        className="marquee-inner"
        style={{
          display: "flex",
          gap: `${GAP}px`,
          width: "max-content",
          animation: `marquee${direction} ${dur}s linear infinite`,
        }}
      >
        {tiles.map((file, i) => (
          <div
            key={i}
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              flexShrink: 0,
              borderRadius: "6px",
              overflow: "hidden",
              position: "relative",
              border: "1.5px solid rgba(245,240,232,0.08)",
              transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#D4AF6A";
              e.currentTarget.style.boxShadow  = "0 0 28px rgba(212,175,106,0.35), 0 0 8px rgba(212,175,106,0.15)";
              e.currentTarget.style.transform  = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,240,232,0.08)";
              e.currentTarget.style.boxShadow  = "none";
              e.currentTarget.style.transform  = "scale(1)";
            }}
          >
            <img
              src={CLD(file)}
              alt="Celebrity moment"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Subtle vignette */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
              pointerEvents: "none",
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CelebrityShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#000", padding: "80px 0 70px", overflow: "hidden" }}
    >
      <style>{KF}</style>

      {/* ── Header ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
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
          ◈ &nbsp; Notable Collaborations &nbsp; ◈
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
          In the frame<br />
          <span style={{ color: "#D4AF6A" }}>with icons.</span>
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
          Over the years, we've had the privilege of working alongside India's
          most celebrated personalities — capturing moments that matter most.
        </motion.p>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "14px" }}
      >
        <MarqueeRow images={ROW_1} direction="L" speed={30} />
      </motion.div>

      {/* ── Row 2 — scrolls right ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <MarqueeRow images={ROW_2} direction="R" speed={25} />
      </motion.div>

      {/* ── Trust bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          textAlign: "center",
          marginTop: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {["Journalists", "Politicians", "Sports Stars", "Film Industry", "Business Leaders"].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.25)",
              borderLeft: "1px solid rgba(212,175,106,0.3)",
              paddingLeft: "20px",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
