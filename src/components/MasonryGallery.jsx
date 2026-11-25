/**
 * MasonryGallery — Pinterest-style masonry grid.
 * 3 columns on desktop, 2 on tablet, 1 on mobile.
 * Mix of portrait and landscape images at different heights.
 */
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const CLD = (file, w = 600) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const IMAGES = [
  { src: CLD("v1795497814/2B4A4787.jpg"), h: "h-80", alt: "Golden hour portrait" },
  { src: CLD("v1795497813/081A0141.jpg"), h: "h-56", alt: "Joyful connections" },
  { src: CLD("v1795497813/6M4A7818.jpg"), h: "h-96", alt: "Radiant bride portrait" },
  { src: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.48_PM.jpg"), h: "h-72", alt: "Bridal splendor" },
  { src: CLD("v1794174548/6M4A7611.jpg"), h: "h-64", alt: "Family bonds" },
  { src: CLD("v1795643194/WhatsApp_Image_2026-11-24_at_3.40.35_PM.jpg"), h: "h-80", alt: "Couple goals" },
  { src: CLD("v1795497812/2B4A4767.jpg"), h: "h-68", alt: "Tender moments" },
  { src: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM_1.jpg"), h: "h-72", alt: "Expecting joy" },
  { src: CLD("v1795497811/081A0175.jpg"), h: "h-96", alt: "Graceful poise" },
  { src: CLD("v1795505066/081A9979.jpg"), h: "h-56", alt: "Venue grandeur" },
  { src: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.46_PM.jpg"), h: "h-80", alt: "Traditional elegance" },
  { src: CLD("v1795506005/IMG_8369.jpg"), h: "h-60", alt: "Family bliss" },
  { src: CLD("v1795497811/6M4A7808.jpg"), h: "h-72", alt: "Elegant frames" },
  { src: CLD("v1795643193/12.jpg"), h: "h-64", alt: "Couple bliss" },
  { src: CLD("v1795497810/081A0301.jpg"), h: "h-88", alt: "Regal charm" },
  { src: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.48_PM.jpg"), h: "h-72", alt: "Radiant mother" },
  { src: CLD("v1795505063/081A5304.jpg"), h: "h-56", alt: "Venue details" },
  { src: CLD("v1795506003/IMG_1252.jpg"), h: "h-68", alt: "Family magic" },
  { src: CLD("v1795497808/6M4A7485.jpg"), h: "h-80", alt: "Timeless grace" },
  { src: CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.35_PM.jpg"), h: "h-64", alt: "Bridal charm" },
  { src: CLD("v1795643193/6.jpg"), h: "h-72", alt: "Love story" },
  { src: CLD("v1795497807/6M4A8185.jpg"), h: "h-96", alt: "Classic beauty" },
  { src: CLD("v1795506000/2B4A4976.jpg"), h: "h-60", alt: "Family delight" },
  { src: CLD("v1795505058/081A5273.jpg"), h: "h-56", alt: "Venue ambiance" },
];

// Split images into 3 columns
function splitColumns(items, n) {
  return Array.from({ length: n }, (_, i) =>
    items.filter((_, idx) => idx % n === i)
  );
}

export default function MasonryGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cols = splitColumns(IMAGES, 3);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const openLightbox = (globalIdx) => setSelectedIdx(globalIdx);
  const closeLightbox = () => setSelectedIdx(null);
  const nextImage = useCallback(() => setSelectedIdx((p) => (p + 1) % IMAGES.length), []);
  const prevImage = useCallback(() => setSelectedIdx((p) => (p - 1 + IMAGES.length) % IMAGES.length), []);

  return (
    <section
      ref={ref}
      className="bg-[#111111] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Behind the Lens
          </p>
          <h2
            className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Moments we<br /><em>live for.</em>
          </h2>
        </motion.div>

        {/* Masonry columns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((img, ri) => {
                const delay = ci * 0.1 + ri * 0.07;
                return (
                  <motion.div
                    key={ri}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay, ease: [0.22,1,0.36,1] }}
                    className={`group relative overflow-hidden rounded-lg ${img.h}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      style={{ transform: "scale(1)" }}
                    />
                    <div className="absolute inset-0 bg-[#111111]/30 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
