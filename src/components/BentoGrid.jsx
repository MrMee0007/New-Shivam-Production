/**
 * BentoGrid — Asymmetric bento-style image grid.
 * Large featured image left + stacked smaller images right.
 * Shows a "Behind the Lens" section with studio/BTS images.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLD = (file, w = 800) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const CELLS = [
  {
    img: CLD("v1794158518/2B4A4671.jpg", 1200),
    label: "Wedding Cinema",
    span: "lg:col-span-2 lg:row-span-2",
    h: "h-72 lg:h-full",
  },
  {
    img: CLD("v1794158510/2B4A4632.jpg"),
    label: "Candid Moments",
    span: "lg:col-span-1 lg:row-span-1",
    h: "h-52",
  },
  {
    img: CLD("v1794158515/2B4A4660.jpg"),
    label: "Wedding Portraits",
    span: "lg:col-span-1 lg:row-span-1",
    h: "h-52",
  },
  {
    img: CLD("v1794158513/2B4A4651.jpg"),
    label: "Bridal Look",
    span: "lg:col-span-1 lg:row-span-1",
    h: "h-52",
  },
  {
    img: CLD("v1794158511/2B4A4674.jpg"),
    label: "Golden Hour",
    span: "lg:col-span-1 lg:row-span-1",
    h: "h-52",
  },
  {
    img: CLD("v1794158510/2B4A4629.jpg"),
    label: "Celebration",
    span: "lg:col-span-2 lg:row-span-1",
    h: "h-52",
  },
];

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
              The Portfolio
            </p>
            <h2
              className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Frames from<br /><em>our world.</em>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-7 text-[#F5F0E8]/40"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A glimpse into the weddings, events, and productions we've had
            the privilege to be part of.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3" style={{ minHeight: "680px" }}>
          {CELLS.map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              className={`group relative overflow-hidden rounded-lg ${cell.span} ${cell.h}`}
            >
              <img
                src={cell.img}
                alt={cell.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <span
                  className="inline-block rounded-full border border-[#F5F0E8]/20 bg-[#111111]/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F5F0E8]/80 backdrop-blur-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {cell.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
