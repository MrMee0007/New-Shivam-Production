import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const REELS = [
  { id: 1, tag: "Brand Film",    title: "Noir Roasters",    sub: "F&B · Delhi",           metric: "1.2M Views",    bg: "linear-gradient(145deg,#120600 0%,#5c2500 50%,#2a1000 100%)" },
  { id: 2, tag: "Fashion Reel",  title: "Luxe Collective",  sub: "Fashion · Mumbai",       metric: "+240% Engagement",bg:"linear-gradient(145deg,#0a0016 0%,#3a0060 50%,#180030 100%)" },
  { id: 3, tag: "Product",       title: "Aura Skincare",    sub: "Beauty · Mathura",       metric: "+87% Conversion",bg:"linear-gradient(145deg,#001a12 0%,#004535 50%,#001e14 100%)" },
  { id: 4, tag: "Commercial",    title: "Veloce Motors",    sub: "Auto · Pune",            metric: "4.8x ROAS",     bg: "linear-gradient(145deg,#00080f 0%,#001a35 50%,#000810 100%)" },
  { id: 5, tag: "Event Reel",    title: "Pulse Festival",   sub: "Events · Hyderabad",     metric: "8.4M Impressions",bg:"linear-gradient(145deg,#1a0010 0%,#500040 50%,#200020 100%)" },
  { id: 6, tag: "Social Reel",   title: "Indigo Kitchen",   sub: "Hospitality · Bengaluru",metric: "+312% Followers",bg:"linear-gradient(145deg,#091400 0%,#243500 50%,#0f2000 100%)" },
];

export default function ReelSection() {
  const [open, setOpen] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const openModal = (reel) => { setActiveReel(reel); setOpen(true); };

  return (
    <>
      <section className="py-20 overflow-hidden bg-black" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end gap-6 justify-between"
          >
            <div>
              <p className="text-[var(--brand)] uppercase tracking-[0.3em] text-[10px] mb-3">// The Reel Vault</p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-none uppercase">
               
                <span className="text-[#F5C200]"> Stories Captured.<br />Metrics Delivered.</span>
              </h2>
              <div className="w-10 h-0.5 bg-[#F5C200] mt-3" />
            </div>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">
              Every reel is 9:16 — built for Instagram, Reels, and TikTok. Swipe to explore.
            </p>
          </motion.div>
        </div>

        {/* Swiper — 9:16 cards */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1.4}
          spaceBetween={16}
          centeredSlides={false}
          breakpoints={{
            480:  { slidesPerView: 2.2 },
            768:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5.2 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
          loop
          className="px-6 pb-12"
        >
          {REELS.map((reel, i) => (
            <SwiperSlide key={reel.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: Math.min(i * 0.07, 0.4) }}
                className="reel-card-3d cursor-pointer"
                style={{ perspective: "800px" }}
                onClick={() => openModal(reel)}
              >
                {/* 9:16 aspect ratio */}
                <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden border border-white/8 relative group hover:border-[var(--brand)]/50 transition-all duration-400 hover:shadow-[0_0_40px_rgba(199,164,80,0.15)]">
                  <div className="absolute inset-0" style={{ background: reel.bg }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Reel-style top bar */}
                  <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-[7px] uppercase tracking-[0.2em] text-white/50">REEL</span>
                    </div>
                    <span className="text-[7px] bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded uppercase tracking-[0.15em] text-white/50">
                      {reel.tag}
                    </span>
                  </div>

                  {/* Side engagement bar (Instagram-style) */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {["♥", "💬", "↗"].map((icon, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-xs">
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[var(--brand)]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(199,164,80,0.5)] scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play size={22} fill="black" stroke="none" className="ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-heading text-lg text-[var(--brand)] leading-tight">{reel.metric}</p>
                    <h3 className="font-sans font-semibold text-sm text-white mt-0.5">{reel.title}</h3>
                    <p className="text-[9px] text-white/35 mt-0.5">{reel.sub}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white hover:bg-[var(--brand)] hover:text-black transition-all duration-200"
              aria-label="Close"
            >
              <X size={17} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="max-h-[90vh] aspect-[9/16] rounded-2xl border border-white/10 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0" style={{ background: activeReel.bg }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 flex flex-col justify-end p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--brand)] mb-2">{activeReel.tag}</span>
                <p className="font-heading text-3xl text-[var(--brand)] mb-1">{activeReel.metric}</p>
                <h3 className="font-sans font-semibold text-lg text-white">{activeReel.title}</h3>
                <p className="text-sm text-white/40 mt-1">{activeReel.sub}</p>
                <p className="text-[10px] text-white/25 mt-6 tracking-[0.15em] uppercase">Showreel coming soon</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
