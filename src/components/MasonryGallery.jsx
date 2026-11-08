/**
 * MasonryGallery — Pinterest-style masonry grid.
 * 3 columns on desktop, 2 on tablet, 1 on mobile.
 * Mix of portrait and landscape images at different heights.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLD = (file, w = 600) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const IMAGES = [
  { src: CLD("v1794174536/6M4A7623.jpg"), h: "h-80",  alt: "Candid moment" },
  { src: CLD("v1794174537/6M4A7892.jpg"), h: "h-56",  alt: "Celebration" },
  { src: CLD("v1794174541/6M4A7644.jpg"), h: "h-72",  alt: "Wedding candid" },
  { src: CLD("v1794174540/6M4A7629.jpg"), h: "h-64",  alt: "Event energy" },
  { src: CLD("v1794174539/6M4A7621.jpg"), h: "h-80",  alt: "Joyful moment" },
  { src: CLD("v1794174541/6M4A7637.jpg"), h: "h-52",  alt: "Candid portrait" },
  { src: CLD("v1794174542/6M4A7645.jpg"), h: "h-72",  alt: "Live event" },
  { src: CLD("v1794174543/6M4A7663.jpg"), h: "h-60",  alt: "Event candid" },
  { src: CLD("v1794174544/6M4A7632.jpg"), h: "h-80",  alt: "Couple candid" },
  { src: CLD("v1794174544/6M4A7674.jpg"), h: "h-52",  alt: "Wedding dance" },
  { src: CLD("v1794174544/6M4A7648.jpg"), h: "h-68",  alt: "Golden moment" },
  { src: CLD("v1794174546/6M4A7702.jpg"), h: "h-80",  alt: "Candid joy" },
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
