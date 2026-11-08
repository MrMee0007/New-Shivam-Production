/**
 * OurJourney
 * ───────────
 * Vertical scroll timeline showing the evolution of New Shivam Productions —
 * TV Serials → Interviews → Podcasts → Testimonials → Wedding Cinema.
 * Desktop: alternating left/right image + text. Mobile: stacked.
 * Scroll-reveal animations per milestone. Central gold timeline line.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tv, Mic2, Radio, Video, Camera } from "lucide-react";

const CLD = (file, w = 900) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const MILESTONES = [
  {
    year: "2012",
    era:  "The Beginning",
    icon: Tv,
    title: "TV Serials & Broadcast",
    desc:  "It all started with lights, cameras, and the thrill of live television. New Shivam Productions cut its teeth producing and shooting TV serials — learning every craft from set lighting to post-production, building a foundation that would last a lifetime.",
    img:  CLD("v1794169627/WhatsApp_Image_2026-10-18_at_1.35.49_PM.jpg"),
    tag:  "Television Production",
  },
  {
    year: "2016",
    era:  "Going On-Air",
    icon: Mic2,
    title: "Interviews & Panel Shows",
    desc:  "With broadcast experience under our belt, we stepped into the world of interviews, news panels, and talk shows — working alongside journalists, politicians, and public figures. Precision, poise, and storytelling became our second language.",
    img:  CLD("v1794169629/WhatsApp_Image_2026-10-18_at_1.41.59_PM.jpg"),
    tag:  "Interviews & Media",
  },
  {
    year: "2019",
    era:  "New Voices",
    icon: Radio,
    title: "Podcast & Audio-Visual",
    desc:  "As podcasting exploded in India, we were ready. Studio builds, multi-camera setups, acoustic treatment, and broadcast-quality audio — we helped creators and brands launch shows that actually sounded (and looked) world-class.",
    img:  CLD("v1794169630/WhatsApp_Image_2026-10-18_at_1.42.04_PM.jpg"),
    tag:  "Podcast Production",
  },
  {
    year: "2021",
    era:  "Building Trust",
    icon: Video,
    title: "Testimonials & Corporate Films",
    desc:  "Stories sell. We began producing testimonial videos and corporate brand films that converted — real people, real experiences, captured with cinematic warmth. From startups to established enterprises, our lens became a trust-building machine.",
    img:  CLD("v1794169631/WhatsApp_Image_2026-10-18_at_1.42.07_PM.jpg"),
    tag:  "Corporate & Testimonial",
  },
  {
    year: "2022 →",
    era:  "Our Calling",
    icon: Camera,
    title: "Wedding Cinematography",
    desc:  "And then came weddings — the most personal, emotional, and irreplaceable stories of all. Today, wedding films are the heartbeat of New Shivam Productions. Every frame is a memory that will be watched for generations. This is where craft meets love.",
    img:  CLD("v1794169632/WhatsApp_Image_2026-10-18_at_1.42.14PM.jpg"),
    tag:  "Wedding Cinema",
  },
];

function Milestone({ ms, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0; /* even → image left, text right */

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        gap: "0",
        alignItems: "center",
        marginBottom: "0",
        position: "relative",
      }}
    >
      {/* ── Left column ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ padding: "48px 32px 48px 0", display: "flex", justifyContent: "flex-end" }}
      >
        {isEven ? (
          /* Image on left for even milestones */
          <div style={{
            width: "100%", maxWidth: "460px",
            borderRadius: "8px", overflow: "hidden",
            border: "1.5px solid rgba(245,240,232,0.08)",
            aspectRatio: "4/3",
            flexShrink: 0,
          }}>
            <img src={ms.img} alt={ms.title} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ) : (
          /* Text on left for odd milestones */
          <div style={{ maxWidth: "420px", textAlign: "right" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.35em", textTransform: "uppercase", color: "#D4AF6A", marginBottom: "10px" }}>
              {ms.tag}
            </p>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              fontWeight: 700, color: "#F5F0E8", lineHeight: 1.2, marginBottom: "14px" }}>
              {ms.title}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.85,
              color: "rgba(245,240,232,0.42)" }}>
              {ms.desc}
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Centre spine ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: "#000",
            border: "2px solid #D4AF6A",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(212,175,106,0.35)",
            flexShrink: 0,
            zIndex: 3,
            position: "relative",
          }}
        >
          {(() => { const Icon = ms.icon; return <Icon size={16} color="#D4AF6A" strokeWidth={1.5} />; })()}
        </motion.div>

        {/* Year label */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#D4AF6A",
            marginTop: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {ms.year}
        </motion.span>
      </div>

      {/* ── Right column ── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ padding: "48px 0 48px 32px", display: "flex", justifyContent: "flex-start" }}
      >
        {isEven ? (
          /* Text on right for even milestones */
          <div style={{ maxWidth: "420px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.35em", textTransform: "uppercase", color: "#D4AF6A", marginBottom: "10px" }}>
              {ms.tag}
            </p>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              fontWeight: 700, color: "#F5F0E8", lineHeight: 1.2, marginBottom: "14px" }}>
              {ms.title}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.85,
              color: "rgba(245,240,232,0.42)" }}>
              {ms.desc}
            </p>
          </div>
        ) : (
          /* Image on right for odd milestones */
          <div style={{
            width: "100%", maxWidth: "460px",
            borderRadius: "8px", overflow: "hidden",
            border: "1.5px solid rgba(245,240,232,0.08)",
            aspectRatio: "4/3",
            flexShrink: 0,
          }}>
            <img src={ms.img} alt={ms.title} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function OurJourney() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0a0a0a", padding: "80px 0 60px", overflow: "hidden" }}>
      {/* ── Header ── */}
      <div ref={headerRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "#D4AF6A", marginBottom: "16px",
          }}
        >
          Our Story
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            fontWeight: 700, color: "#F5F0E8",
            lineHeight: 1.05, margin: "0 auto 20px", maxWidth: "620px",
          }}
        >
          How we grew from<br />
          <span style={{ color: "#D4AF6A" }}>sets to stories.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.8,
            color: "rgba(245,240,232,0.42)", maxWidth: "520px", margin: "0 auto",
          }}
        >
          From TV studio floors to wedding mandaps — a decade of craft, growth,
          and an unshakeable belief that every story deserves to be told beautifully.
        </motion.p>
      </div>

      {/* ── Timeline ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Vertical gold line */}
        <div style={{
          position: "absolute",
          left: "50%", top: 0, bottom: 0,
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(212,175,106,0.4) 10%, rgba(212,175,106,0.4) 90%, transparent)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }} />

        {MILESTONES.map((ms, i) => (
          <Milestone key={ms.year} ms={ms} index={i} />
        ))}
      </div>

      {/* ── Bottom stat strip ── */}
      <div style={{ maxWidth: "900px", margin: "60px auto 0", padding: "0 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px", border: "1px solid rgba(245,240,232,0.07)",
        }}>
          {[
            { num: "12+", label: "Years in the Industry" },
            { num: "5",   label: "Domains Mastered" },
            { num: "500+", label: "Productions Delivered" },
          ].map((stat) => (
            <div key={stat.label} style={{
              padding: "32px 24px", textAlign: "center",
              borderRight: "1px solid rgba(245,240,232,0.07)",
              background: "rgba(245,240,232,0.02)",
            }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 700, color: "#F5F0E8", marginBottom: "6px", lineHeight: 1 }}>
                {stat.num}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500,
                letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
