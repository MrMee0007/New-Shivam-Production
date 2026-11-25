/**
 * BridalShowcase — Elegant horizontal scroll showcase for bridal portraits.
 * Features large portrait cards with parallax tilt on hover,
 * soft gold accents, and a cinematic feel.
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CLD = (file, w = 800) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const PORTRAITS = [
  { src: CLD("v1795497813/6M4A7818.jpg", 900), label: "Radiant Bride", orient: "portrait" },
  { src: CLD("v1795497814/2B4A4787.jpg", 1100), label: "Golden Hour", orient: "landscape" },
  { src: CLD("v1795497811/081A0161.jpg", 900), label: "Ethereal Beauty", orient: "portrait" },
  { src: CLD("v1795497814/2B4A4793.jpg", 1100), label: "Sacred Vows", orient: "landscape" },
  { src: CLD("v1795497811/081A0175.jpg", 900), label: "Graceful Poise", orient: "portrait" },
  { src: CLD("v1795497812/2B4A4767.jpg", 1100), label: "Tender Moments", orient: "landscape" },
  { src: CLD("v1795497810/081A0301.jpg", 900), label: "Regal Charm", orient: "portrait" },
  { src: CLD("v1795497813/2B4A4783.jpg", 1100), label: "Royal Celebration", orient: "landscape" },
  { src: CLD("v1795497810/6M4A8277.jpg", 900), label: "Dreamy Portrait", orient: "portrait" },
  { src: CLD("v1795497813/081A0141.jpg", 1100), label: "Joyful Connections", orient: "landscape" },
  { src: CLD("v1795497807/6M4A8185.jpg", 900), label: "Classic Beauty", orient: "portrait" },
  { src: CLD("v1795497812/2B4A4734.jpg", 1100), label: "Heritage Wedding", orient: "landscape" },
];

function Card({ img, index, inView }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: img.orient === "portrait" ? "280px" : "420px",
        height: img.orient === "portrait" ? "400px" : "300px",
        flexShrink: 0,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        border: hover ? "1.5px solid rgba(212,175,106,0.5)" : "1.5px solid rgba(245,240,232,0.08)",
        boxShadow: hover ? "0 8px 40px rgba(212,175,106,0.15), 0 0 0 1px rgba(212,175,106,0.1)" : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <img
        src={img.src}
        alt={img.label}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hover ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
          opacity: hover ? 1 : 0.6,
          transition: "opacity 0.4s",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          transform: hover ? "translateY(0)" : "translateY(6px)",
          opacity: hover ? 1 : 0.7,
          transition: "all 0.4s",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#D4AF6A",
          }}
        >
          {img.label}
        </span>
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "24px",
          height: "24px",
          borderTop: "1.5px solid rgba(212,175,106,0.4)",
          borderRight: "1.5px solid rgba(212,175,106,0.4)",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "14px",
          width: "24px",
          height: "24px",
          borderBottom: "1.5px solid rgba(212,175,106,0.4)",
          borderLeft: "1.5px solid rgba(212,175,106,0.4)",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
    </motion.div>
  );
}

export default function BridalShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ background: "#0a0a0a", padding: "80px 0 70px", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 44px" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#D4AF6A",
            marginBottom: "16px",
          }}
        >
          ◈ &nbsp; Bridal & Portrait Collection &nbsp; ◈
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            color: "#F5F0E8",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Beauty in every<br />
          <span style={{ color: "#D4AF6A" }}>frame.</span>
        </motion.h2>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: "flex",
          gap: "16px",
          padding: "0 24px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {PORTRAITS.map((img, i) => (
          <Card key={i} img={img} index={i} inView={inView} />
        ))}
        {/* End spacer */}
        <div style={{ width: "24px", flexShrink: 0 }} />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          textAlign: "center",
          marginTop: "28px",
          fontFamily: "Inter, sans-serif",
          fontSize: "9px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(245,240,232,0.2)",
        }}
      >
        ← Scroll to explore →
      </motion.div>

      {/* Hide scrollbar */}
      <style>{`
        section::-webkit-scrollbar { display: none; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
