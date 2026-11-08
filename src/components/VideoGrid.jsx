/**
 * VideoGrid — 3×2 grid mixing autoplay muted videos + images.
 * Each cell loops silently. Click to open in a lightbox.
 */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const CLD = (file, w) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const MEDIA = [
  {
    type: "image",
    src:   CLD("v1794174546/6M4A7530.jpg", 1200),
    thumb: CLD("v1794174546/6M4A7530.jpg", 500),
    label: "Candid Glance",
  },
  {
    type: "image",
    src:   CLD("v1794174545/6M4A7758.jpg", 1200),
    thumb: CLD("v1794174545/6M4A7758.jpg", 500),
    label: "Sacred Moments",
  },
  {
    type: "image",
    src:   CLD("v1794174548/6M4A7611.jpg", 1200),
    thumb: CLD("v1794174548/6M4A7611.jpg", 500),
    label: "Joy & Emotion",
  },
  {
    type: "image",
    src:   CLD("v1794174547/6M4A7534.jpg", 1200),
    thumb: CLD("v1794174547/6M4A7534.jpg", 500),
    label: "Golden Hour Glow",
  },
  {
    type: "image",
    src:   CLD("v1794174534/6M4A7615.jpg", 1200),
    thumb: CLD("v1794174534/6M4A7615.jpg", 500),
    label: "Festive Spirit",
  },
  {
    type: "image",
    src:   CLD("v1794174537/6M4A7624.jpg", 1200),
    thumb: CLD("v1794174537/6M4A7624.jpg", 500),
    label: "Celebration Night",
  },
];

export default function VideoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      ref={ref}
      className="px-6 py-20 md:px-10 md:py-28"
      style={{ background: "#0a0a0a" }}
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
              Stills & Stories
            </p>
            <h2
              className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Every frame<br /><em>tells a story.</em>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-7 text-[#F5F0E8]/40"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Click any frame to view it full-screen.
          </p>
        </motion.div>

        {/* 3×2 Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEDIA.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              onClick={() => setLightbox(item)}
              className="group relative overflow-hidden rounded-lg text-left"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={item.thumb}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0a0a0a]/40 transition-opacity duration-300 group-hover:bg-[#0a0a0a]/60" />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5F0E8]/40 bg-[#F5F0E8]/15 backdrop-blur-sm">
                  <Play size={18} className="ml-0.5 text-[#F5F0E8]" fill="#F5F0E8" />
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p
                  className="text-xs font-medium text-[#F5F0E8]/90"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </p>
              </div>

              {/* Frame number */}
              <span
                className="absolute right-3 top-3 text-[9px] tabular-nums text-[#F5F0E8]/30"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
              className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.label}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-5">
                <p
                  className="text-sm text-[#F5F0E8]/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {lightbox.label}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#F5F0E8]/20 bg-black/50 text-[#F5F0E8]/70 backdrop-blur-sm transition hover:text-[#F5F0E8]"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
