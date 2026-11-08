/**
 * ShowreelSection — Full-screen pinned YouTube showreel with
 * scroll-triggered scale reveal and cinematic overlay.
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, X } from "lucide-react";

// Replace with the actual YouTube embed URL
const YOUTUBE_EMBED = "https://www.youtube.com/embed/EvtVVDigAtQ?si=LLTnR2v99vk0Se3g&autoplay=1&mute=0&rel=0&showinfo=0";
const THUMB = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=85";

export default function ShowreelSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [playing, setPlaying] = useState(false);

  return (
    <section
      ref={ref}
      className="relative mx-auto my-20 max-w-7xl overflow-hidden rounded-2xl px-6 md:my-28 md:px-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Thumbnail / Poster */}
        {!playing && (
          <>
            <img
              src={THUMB}
              alt="New Shivam Productions Showreel"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark cinematic overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a]/60" />

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Our Showreel
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22,1,0.36,1] }}
                className="mb-10 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-tight text-[#F5F0E8]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                See us in<br /><em>motion.</em>
              </motion.h2>

              {/* Play button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22,1,0.36,1] }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPlaying(true)}
                className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F5F0E8]/30 bg-[#F5F0E8]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#F5F0E8]/20 md:h-24 md:w-24"
                aria-label="Play showreel"
              >
                <Play size={28} className="ml-1.5 text-[#F5F0E8]" fill="#F5F0E8" />
              </motion.button>
            </div>

            {/* Film strip dots at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 py-3 opacity-30">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-4 w-5 rounded-sm border border-[#F5F0E8]/40 bg-[#F5F0E8]/10" />
              ))}
            </div>
          </>
        )}

        {/* YouTube iframe */}
        {playing && (
          <>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={YOUTUBE_EMBED}
              title="New Shivam Productions Showreel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setPlaying(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#F5F0E8]/30 bg-[#0a0a0a]/60 text-[#F5F0E8]/70 backdrop-blur-sm transition hover:text-[#F5F0E8]"
            >
              <X size={16} />
            </button>
          </>
        )}
      </motion.div>
    </section>
  );
}
