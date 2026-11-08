/**
 * VenueGallery
 * ─────────────
 * Full-width cinematic Swiper for venue / event images.
 * • Large main slide at 65vh with Ken Burns zoom
 * • Custom prev/next arrows + slide counter
 * • Clickable thumbnail strip below (contact-sheet style)
 * • Autoplay, pause on hover
 */
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLD = (file, w = 1200) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const IMAGES = [
  { file: "v1794162631/6M4A7174.jpg", label: "Venue — Grand Hall" },
  { file: "v1794162628/6M4A7179.jpg", label: "Event Setup" },
  { file: "v1794162629/6M4A7171.jpg", label: "Stage & Lighting" },
  { file: "v1794162629/6M4A7180.jpg", label: "Decor Details" },
  { file: "v1794162628/6M4A7172.jpg", label: "Venue Overview" },
  { file: "v1794162628/6M4A7176.jpg", label: "Event Ambiance" },
  { file: "v1794162627/6M4A7164.jpg", label: "Live Coverage" },
  { file: "v1794162626/6M4A7161.jpg", label: "Crowd & Energy" },
  { file: "v1794162626/6M4A7168.jpg", label: "Candid Moment" },
  { file: "v1794162626/6M4A7158.jpg", label: "Event Highlight" },
  { file: "v1794162625/6M4A7157.jpg", label: "Venue Exterior" },
  { file: "v1794162624/6M4A7159.jpg", label: "Backstage" },
  { file: "v1794162625/6M4A7160.jpg", label: "Production Setup" },
  { file: "v1794162624/6M4A7187.jpg", label: "Golden Hour" },
  { file: "v1794162624/6M4A7154.jpg", label: "Wide Angle" },
  { file: "v1794162623/6M4A7151.jpg", label: "Venue Detail" },
  { file: "v1794162622/6M4A7185.jpg", label: "Night Coverage" },
];

export default function VenueGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper]     = useState(null);
  const [activeIdx, setActiveIdx]       = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <section
      ref={ref}
      style={{ background: "#000", padding: "80px 0 60px", overflow: "hidden" }}
    >
      {/* ── Header ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 36px" }}>
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
            marginBottom: "14px",
          }}
        >
          Event & Venue Coverage
        </motion.p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "#F5F0E8",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Spaces we've<br />
            <span style={{ color: "#D4AF6A" }}>brought to life.</span>
          </motion.h2>

          {/* Slide counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "Inter, monospace",
              fontSize: "12px",
              color: "rgba(245,240,232,0.35)",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ color: "#F5F0E8", fontSize: "20px", fontWeight: 500 }}>{pad(activeIdx)}</span>
            <span style={{ margin: "0 6px" }}>/</span>
            {pad(IMAGES.length - 1)}
          </motion.div>
        </div>
      </div>

      {/* ── Main Swiper ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative" }}
      >
        {/* Custom nav buttons */}
        <button
          ref={prevRef}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(245,240,232,0.15)",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.25s, border-color 0.25s",
            color: "#F5F0E8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,175,106,0.25)";
            e.currentTarget.style.borderColor = "#D4AF6A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          ref={nextRef}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(245,240,232,0.15)",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.25s, border-color 0.25s",
            color: "#F5F0E8",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,175,106,0.25)";
            e.currentTarget.style.borderColor = "#D4AF6A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
          }}
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={setMainSwiper}
          onActiveIndexChange={(swiper) => setActiveIdx(swiper.activeIndex)}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={false}
          speed={800}
          style={{ width: "100%" }}
        >
          {IMAGES.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  position: "relative",
                  height: "clamp(300px, 65vh, 680px)",
                  overflow: "hidden",
                  background: "#0d0d0d",
                }}
              >
                <img
                  src={CLD(img.file, 1600)}
                  alt={img.label}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    /* Ken Burns zoom on active slide handled via CSS class below */
                    animation: "kenBurns 8s ease-in-out infinite alternate",
                  }}
                />
                {/* Bottom label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                    padding: "40px 32px 24px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(245,240,232,0.85)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {img.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "10px",
                      color: "rgba(212,175,106,0.7)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    NSP · {pad(i)}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ── Thumbnail strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{ padding: "12px 0 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}
      >
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          spaceBetween={6}
          watchSlidesProgress
          style={{ padding: "12px 24px" }}
        >
          {IMAGES.map((img, i) => (
            <SwiperSlide
              key={i}
              style={{ width: "100px", cursor: "pointer", flexShrink: 0 }}
            >
              <div
                style={{
                  width: "100px",
                  height: "66px",
                  overflow: "hidden",
                  borderRadius: "2px",
                  border: activeIdx === i
                    ? "2px solid #D4AF6A"
                    : "2px solid rgba(245,240,232,0.08)",
                  transition: "border-color 0.25s",
                }}
              >
                <img
                  src={CLD(img.file, 200)}
                  alt={img.label}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    opacity: activeIdx === i ? 1 : 0.45,
                    transition: "opacity 0.3s",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
}
