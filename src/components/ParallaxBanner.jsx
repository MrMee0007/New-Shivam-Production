/**
 * ParallaxBanner — Full-width sticky parallax image section.
 * A single oversized image that scrolls slower than the page,
 * creating a cinematic depth effect.
 * Shows a bold stat or quote over the image.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBanner({
  img = "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1800&q=85",
  quote = "Every love story is beautiful. Let us make yours unforgettable.",
  tag = "Wedding Cinematography",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative h-[60vh] overflow-hidden md:h-[75vh]">
      {/* Parallax image */}
      <motion.div className="absolute inset-0 h-[125%] w-full" style={{ y }}>
        <img
          src={img}
          alt={tag}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#111111]/55" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {tag}
        </p>
        <blockquote
          className="max-w-3xl text-[clamp(1.5rem,4vw,3.2rem)] font-semibold leading-tight text-[#F5F0E8]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <em>"{quote}"</em>
        </blockquote>
      </div>

      {/* Top + bottom fade to match bg */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111111] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}
