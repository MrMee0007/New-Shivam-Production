import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import FilmStrip       from "../components/FilmStrip";
import CameraFilmStrip from "../components/CameraFilmStrip";
import MasonryGallery  from "../components/MasonryGallery";
import ParallaxBanner  from "../components/ParallaxBanner";
import VenueGallery    from "../components/VenueGallery";

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const CATEGORIES = ["All", "Wedding", "Broadcast", "Podcast", "Commercial"];

const CLD = (file, w = 900) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const WORKS = [
  {
    id: 1,
    category: "Wedding",
    title: "Priya & Rohan",
    subtitle: "Leela Palace, Gurgaon · 3-Day Celebration",
    desc: "A three-day royal wedding captured in one breathtaking cinematic film — full ceremony, reception, and candid moments woven into a timeless story.",
    img: CLD("v1794158518/2B4A4671.jpg"),
    tag: "7 min Film",
    featured: true,
  },
  {
    id: 2,
    category: "Wedding",
    title: "Meera & Arjun",
    subtitle: "City Palace, Udaipur · Destination Wedding",
    desc: "Three days of Rajputana grandeur — temples, ghats, and golden hour moments — all captured on film.",
    img: CLD("v1794158516/2B4A4663.jpg"),
    tag: "Destination Film",
  },
  {
    id: 3,
    category: "Wedding",
    title: "Anjali & Vikram",
    subtitle: "Rambagh Palace, Jaipur",
    desc: "An intimate 2-day wedding at a heritage palace — intimate moments, grand architecture, and golden light throughout.",
    img: CLD("v1794158515/2B4A4657.jpg"),
    tag: "Heritage Wedding",
  },
  {
    id: 4,
    category: "Wedding",
    title: "Preet & Kabir",
    subtitle: "ITC Grand Bharat, Gurgaon",
    desc: "A modern Punjabi wedding blending tradition with contemporary cinematic style — vibrant colors and pure emotion.",
    img: CLD("v1794158515/2B4A4655.jpg"),
    tag: "5 min Film",
  },
  {
    id: 5,
    category: "Broadcast",
    title: "Maruti Suzuki Annual Summit",
    subtitle: "India Expo Centre, Greater Noida",
    desc: "15,000+ live viewers. 8-camera production. Zero downtime across a 6-hour flagship corporate event.",
    img: CLD("v1794158515/2B4A4650.jpg"),
    tag: "Live Broadcast · 6 hrs",
  },
  {
    id: 6,
    category: "Broadcast",
    title: "Royal Celebrations Awards Night",
    subtitle: "Hyatt Regency, Delhi",
    desc: "Full red-carpet coverage, live switching across 6 cameras, and a same-day highlight reel delivered by midnight.",
    img: CLD("v1794158515/2B4A4660.jpg"),
    tag: "Live Event",
  },
  {
    id: 7,
    category: "Podcast",
    title: "The Growth Podcast",
    subtitle: "New Shivam Studio, Gurgaon",
    desc: "A branded 4-camera video podcast studio built from scratch — acoustic treatment, lighting, and weekly production support.",
    img: CLD("v1794158513/2B4A4646.jpg"),
    tag: "Weekly Production",
  },
  {
    id: 8,
    category: "Commercial",
    title: "Himalaya Wellness",
    subtitle: "Delhi & Gurgaon Locations",
    desc: "A 60-second ad film that generated 2M+ views and drove measurable product sales in the first week.",
    img: CLD("v1794158514/2B4A4641.jpg"),
    tag: "60s Ad Film",
  },
  {
    id: 9,
    category: "Commercial",
    title: "Samsung India — Launch",
    subtitle: "Corporate HQ, Gurugram",
    desc: "A product launch film combining drone aerials, studio close-ups, and lifestyle footage into one seamless brand story.",
    img: CLD("v1794158513/2B4A4651.jpg"),
    tag: "Brand Film",
  },
];

export default function Work() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? WORKS
    : WORKS.filter((w) => w.category === active);

  return (
    <main className="overflow-x-hidden" style={{ background: "#0a0a0a" }}>

      {/* ── Hero ── */}
      <section className="px-6 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.88] text-[#F5F0E8]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our <em>Work.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-lg text-sm leading-7 text-[#F5F0E8]/45"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A selection of projects we're proud of — wedding films, live events,
            podcasts, and brand commercials.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* ── Camera Film Strip ── */}
      <CameraFilmStrip />

      {/* ── Filter Tabs ── */}
      <section className="sticky top-16 z-30 border-b border-[#F5F0E8]/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                active === cat
                  ? "bg-[#F5F0E8] text-[#0a0a0a]"
                  : "border border-[#F5F0E8]/15 text-[#F5F0E8]/50 hover:border-[#F5F0E8]/35 hover:text-[#F5F0E8]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((work, i) => (
                <Reveal key={work.id} delay={i * 0.06}>
                  <article className="group relative overflow-hidden rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111]">
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: work.featured ? "340px" : "260px" }}>
                      <img
                        src={work.img}
                        alt={work.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/10 to-transparent" />

                      {/* Category badge */}
                      <span
                        className="absolute left-4 top-4 rounded-full border border-[#F5F0E8]/20 bg-[#111111]/60 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-[#F5F0E8]/70 backdrop-blur-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.category}
                      </span>

                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5F0E8]/30 bg-[#F5F0E8]/10 backdrop-blur-sm">
                          <Play size={16} className="ml-0.5 text-[#F5F0E8]" fill="#F5F0E8" />
                        </div>
                      </div>

                      {/* Tag */}
                      <span
                        className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.2em] text-[#F5F0E8]/40"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p
                        className="mb-1 text-[9px] uppercase tracking-[0.25em] text-[#D4AF6A]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.subtitle}
                      </p>
                      <h3
                        className="mb-3 text-xl font-semibold text-[#F5F0E8] transition-colors group-hover:text-[#D4AF6A]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.title}
                      </h3>
                      <p
                        className="text-sm leading-6 text-[#F5F0E8]/40"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.desc}
                      </p>

                      <div className="mt-5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F0E8]/30 opacity-0 transition-all duration-300 group-hover:text-[#D4AF6A] group-hover:opacity-100">
                        View Project
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* ── Venue Gallery — event & venue coverage ── */}
      <VenueGallery />

      <div className="divider" />

      {/* ── Masonry Gallery — behind the lens ── */}
      <MasonryGallery />

      {/* ── Parallax Quote Banner ── */}
      <ParallaxBanner
        img="https://res.cloudinary.com/wqhpwm9y/image/upload/w_1800,q_auto,f_auto/v1794158510/2B4A4629.jpg"
        quote="Behind every great shot is a team that never stops caring."
        tag="New Shivam Production House · Gurgaon, India"
      />

      {/* Divider */}
      <div className="divider" />

      {/* ── CTA ── */}
      <section className="bg-[#111111] px-6 py-20 text-center md:px-10 md:py-28">
        <Reveal>
          <p
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Start a Project
          </p>
          <h2
            className="mb-6 text-3xl font-semibold text-[#F5F0E8] md:text-4xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your story could be next.
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get in Touch
            <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </section>

    </main>
  );
}