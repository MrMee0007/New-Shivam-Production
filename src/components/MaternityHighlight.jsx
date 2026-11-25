/**
 * MaternityHighlight — Portrait carousel showcasing pre-maternity photography.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const CLD = (file, w = 800) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const HERO_IMG = CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM_1.jpg", 1400);

const THUMBS = [
  { src: CLD("v1794769883/WhatsApp_Image_2026-11-15_at_11.29.49_PM.jpg"), label: "Embrace of Life" },
  { src: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM_2.jpg"), label: "Strength & Grace" },
  { src: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM.jpg"), label: "Whispers of Love" },
  { src: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM.jpg"), label: "Gentle Bond" },
  { src: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM_1.jpg"), label: "Mother's Radiance" },
  { src: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.46_PM.jpg"), label: "Promise of Tomorrow" },
  { src: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.47_PM.jpg"), label: "Sacred Chapter" },
  { src: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.48_PM.jpg"), label: "Awaiting You" },
];

const SLIDES = [
  { src: HERO_IMG, label: "The Miracle Within" },
  ...THUMBS,
];

export default function MaternityHighlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeSlide = SLIDES[activeIndex];

  const showPrevious = useCallback(
    () => setActiveIndex((index) => (index - 1 + SLIDES.length) % SLIDES.length),
    [],
  );
  const showNext = useCallback(
    () => setActiveIndex((index) => (index + 1) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (isFullscreen) return undefined;
    const timer = window.setInterval(showNext, 5000);
    return () => window.clearInterval(timer);
  }, [isFullscreen, showNext]);

  useEffect(() => {
    if (!isFullscreen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsFullscreen(false);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, showNext, showPrevious]);

  return (
    <section ref={ref} style={{ background: "#0a0a0a", overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px 40px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
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
            Pre-Maternity Sessions
          </p>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "#F5F0E8",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            The miracle<br />
            <span style={{ color: "#D4AF6A" }}>within.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.4)",
            maxWidth: "360px",
          }}
        >
          Celebrating the beauty of expecting with tender, artistic pre-maternity portraits
          that families treasure for a lifetime.
        </motion.p>
      </div>

      {/* Image carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "min(520px, calc(100% - 48px))",
          aspectRatio: "3 / 4",
          maxHeight: "min(72vh, 680px)",
          overflow: "hidden",
          margin: "0 auto",
          borderRadius: "12px",
          border: "1px solid rgba(245,240,232,0.06)",
        }}
      >
        <img
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.label}
          loading="lazy"
          role="button"
          tabIndex={0}
          aria-label={`View ${activeSlide.label} full screen`}
          onClick={() => setIsFullscreen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsFullscreen(true);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            cursor: "zoom-in",
          }}
        />
        <button
          type="button"
          aria-label="Previous maternity image"
          onClick={showPrevious}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            zIndex: 2,
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(245,240,232,0.25)",
            borderRadius: "50%",
            color: "#F5F0E8",
            background: "rgba(0,0,0,0.55)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next maternity image"
          onClick={showNext}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            zIndex: 2,
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(245,240,232,0.25)",
            borderRadius: "50%",
            color: "#F5F0E8",
            background: "rgba(0,0,0,0.55)",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={22} />
        </button>
        <button
          type="button"
          aria-label="View maternity image full screen"
          onClick={() => setIsFullscreen(true)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 2,
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(245,240,232,0.25)",
            borderRadius: "50%",
            color: "#F5F0E8",
            background: "rgba(0,0,0,0.55)",
            cursor: "pointer",
          }}
        >
          <Maximize2 size={17} />
        </button>
        {/* Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Text overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "36px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#D4AF6A",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(212,175,106,0.3)",
            }}
          >
            Pre-Maternity · Featured
          </span>
        </div>
        <span
          style={{
            position: "absolute",
            right: "24px",
            bottom: "32px",
            color: "rgba(245,240,232,0.75)",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Thumbnail row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "16px 24px 80px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {SLIDES.map((thumb, i) => (
          <motion.div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Show ${thumb.label}`}
            aria-pressed={activeIndex === i}
            onClick={() => setActiveIndex(i)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveIndex(i);
              }
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
            style={{
              width: "160px",
              height: "110px",
              flexShrink: 0,
              borderRadius: "6px",
              overflow: "hidden",
              border: activeIndex === i
                ? "1.5px solid #D4AF6A"
                : "1.5px solid rgba(245,240,232,0.06)",
              cursor: "pointer",
              position: "relative",
              transition: "border-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,106,0.5)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,240,232,0.06)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={thumb.src}
              alt={thumb.label}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        ))}
      </div>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen maternity gallery"
          onClick={() => setIsFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(0,0,0,0.96)",
          }}
        >
          <button
            type="button"
            aria-label="Close full-screen view"
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 1,
              width: "44px",
              height: "44px",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(245,240,232,0.25)",
              borderRadius: "50%",
              color: "#F5F0E8",
              background: "rgba(0,0,0,0.55)",
              cursor: "pointer",
            }}
          >
            <X size={22} />
          </button>
          <img
            src={activeSlide.src}
            alt={activeSlide.label}
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Hide scrollbar */}
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
