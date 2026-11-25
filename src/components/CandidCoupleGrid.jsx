/**
 * CandidCoupleGrid — A cinematic split-screen grid showcasing
 * candid couple photography and family moments.
 * Features a large hero image on the left with a stacked grid on the right,
 * with smooth hover reveals and gold accent animations.
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

const CLD = (file, w = 800) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const HERO = CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.35_PM.jpg", 1200);

const GRID = [
  { src: CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.34_PM.jpg"), label: "Romantic Frames" },
  { src: CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.36_PM.jpg"), label: "Together Always" },
  { src: CLD("v1795643193/12.jpg"), label: "Couple Bliss" },
  { src: CLD("v1795643193/2.jpg"), label: "Love Notes" },
  { src: CLD("v1795643193/43.jpg"), label: "Perfect Match" },
  { src: CLD("v1795643193/6.jpg"), label: "Love Story" },
];

function GridCard({ img, delay, inView }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        border: hover ? "1px solid rgba(212,175,106,0.4)" : "1px solid rgba(245,240,232,0.06)",
        transition: "border-color 0.4s",
        cursor: "pointer",
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
          transform: hover ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          opacity: hover ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "14px",
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#D4AF6A",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.3s",
        }}
      >
        {img.label}
      </div>
    </motion.div>
  );
}

export default function CandidCoupleGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [heroHover, setHeroHover] = useState(false);

  return (
    <section
      ref={ref}
      className="px-6 py-20 md:px-10 md:py-28"
      style={{ background: "#111111" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Candid Couple & Family
            </p>
            <h2
              className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Love in every<br /><em>detail.</em>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-[#D4AF6A]" />
            <p
              className="max-w-xs text-sm leading-7 text-[#F5F0E8]/40"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Unscripted moments of love, laughter, and connection — captured forever.
            </p>
          </div>
        </motion.div>

        {/* Split layout */}
        <div className="grid gap-3 lg:grid-cols-5 lg:grid-rows-3" style={{ minHeight: "580px" }}>
          {/* Hero image — spans 3 cols, 3 rows */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 lg:row-span-3"
            onMouseEnter={() => setHeroHover(true)}
            onMouseLeave={() => setHeroHover(false)}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              border: heroHover ? "1px solid rgba(212,175,106,0.4)" : "1px solid rgba(245,240,232,0.06)",
              transition: "border-color 0.4s",
              minHeight: "400px",
              cursor: "pointer",
            }}
          >
            <img
              src={HERO}
              alt="Candid couple moment"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: heroHover ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "28px",
                left: "28px",
                right: "28px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#D4AF6A",
                }}
              >
                Newly Done Project
              </span>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  marginTop: "8px",
                  lineHeight: 1.15,
                }}
              >
                Couple Goals
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "rgba(245,240,232,0.5)",
                  marginTop: "6px",
                }}
              >
                Candid couple photography at its finest
              </p>
            </div>
          </motion.div>

          {/* Right grid — 2 cols, 3 rows = 6 cells */}
          {GRID.map((img, i) => (
            <GridCard
              key={i}
              img={img}
              delay={0.15 + i * 0.07}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
