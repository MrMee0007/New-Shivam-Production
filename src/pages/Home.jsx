import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowDown, Play, Camera, Radio, Mic, Film } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ── New visual components ── */
import CameraFilmStrip    from "../components/CameraFilmStrip";
import ShowreelSection    from "../components/ShowreelSection";
import BentoGrid          from "../components/BentoGrid";
import MasonryGallery     from "../components/MasonryGallery";
import VideoGrid          from "../components/VideoGrid";
import ParallaxBanner     from "../components/ParallaxBanner";
import VenueGallery       from "../components/VenueGallery";
import CelebrityShowcase  from "../components/CelebrityShowcase";
import OurJourney         from "../components/OurJourney";

/* ── Helper: scroll-reveal ── */
function Reveal({ children, className = "", delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Services ── */
const SERVICES = [
  { icon: Camera, title: "Wedding Cinema",    desc: "Cinematic films that capture every emotion of your most precious day — beautifully, timelessly." },
  { icon: Radio,  title: "Live Broadcasting", desc: "Multi-camera broadcast production for events, conferences, and award nights — streamed worldwide." },
  { icon: Mic,    title: "Podcast Studio",    desc: "Professional podcast studios with broadcast-grade audio, multi-camera video, and full post-production." },
  { icon: Film,   title: "Commercial Films",  desc: "Brand commercials, ad films, and testimonials crafted to build trust and drive real results." },
];

/* ── Testimonials ── */
const TESTIMONIALS = [
  { quote: "New Shivam captured our wedding in a way we never imagined possible. We've watched it over a hundred times.", name: "Priya & Rohan Sharma", role: "Wedding Clients" },
  { quote: "Their live broadcasting setup was flawless. 15,000 viewers tuned in and not a single glitch. Truly professional.", name: "Events Manager", role: "Maruti Suzuki India" },
  { quote: "The podcast studio they set up for us was world-class. Our listeners noticed the difference immediately.", name: "Host & Founder", role: "The Growth Podcast" },
  { quote: "Our ad film got over 2 million views in the first week. The team delivered something that actually drove sales.", name: "Marketing Director", role: "Himalaya Wellness" },
];

/* ── Stats ── */
const STATS = [
  { num: "500+",  label: "Events Covered" },
  { num: "12+",   label: "Years of Experience" },
  { num: "98%",   label: "Client Satisfaction" },
  { num: "1200+", label: "Hours of Footage" },
];

/* ── Featured Work ── */
const CLD = (file, w = 900) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const WORKS = [
  { category: "Wedding Film",    title: "Priya & Rohan",        location: "Leela Palace, Gurgaon",    img: CLD("v1794158518/2B4A4671.jpg") },
  { category: "Wedding Film",    title: "Meera & Arjun",        location: "City Palace, Udaipur",      img: CLD("v1794158516/2B4A4663.jpg") },
  { category: "Wedding Moments", title: "Behind the Lens",      location: "New Shivam Productions",   img: CLD("v1794158515/2B4A4657.jpg") },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden" style={{ background: "#0a0a0a" }}>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">

        {/* ── Background Video ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/wqhpwm9y/image/upload/w_1800,q_auto,f_auto/v1794158518/2B4A4671.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <source
            src="https://res.cloudinary.com/wqhpwm9y/video/upload/q_auto,f_auto/v1794172074/AQPqDsiLyTttJE6Y3FRez94xxeH9k3kSSaheArJ0mq-tS6D_lKzsT0XEh2sTDX2AshiiXvBUmtgkCxKF3PwmkqMlt69zmgQRNondo8c.mp4"
            type="video/mp4"
          />
        </video>

        {/* ── Overlay layers ── */}
        {/* 1: Base dark scrim */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.60)", zIndex: 1 }} />
        {/* 2: Cinematic bottom gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, rgba(0,0,0,0.3) 40%, transparent 70%)", zIndex: 2 }} />
        {/* 3: Subtle gold radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,175,106,0.07), transparent)", zIndex: 3, pointerEvents: "none" }} />

        {/* ── Content ── */}
        <div className="relative max-w-4xl" style={{ zIndex: 10 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F5F0E8]/50"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className="h-px w-8 bg-[#D4AF6A]" />
            New Shivam Production House
            <span className="h-px w-8 bg-[#D4AF6A]" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-tight text-[#F5F0E8]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Stories worth<br />
            <em className="text-[#D4AF6A]">feeling.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mb-12 max-w-md text-base leading-7 text-[#F5F0E8]/60"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Wedding films, live broadcasts, podcast studios &amp; brand
            commercials — crafted with cinematic precision from Gurgaon, India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#D4AF6A] hover:gap-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              See Our Work <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F0E8]/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5F0E8]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#F5F0E8]/60 hover:text-[#F5F0E8]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Book a Call
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
          style={{ zIndex: 10 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#F5F0E8]/30" style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={14} className="text-[#F5F0E8]/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ CAMERA FILM STRIP — 35mm style ═══════════ */}
      <CameraFilmStrip />

      {/* ═══════════ STATS ═══════════ */}
      <section className="bg-[#111111] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px border border-[#F5F0E8]/[0.06] md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}
              className="flex flex-col items-center justify-center border border-[#F5F0E8]/[0.06] px-6 py-10 text-center"
            >
              <span className="mb-2 text-4xl font-semibold text-[#F5F0E8] md:text-5xl" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.num}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#F5F0E8]/35" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ SHOWREEL — full-width video ═══════════ */}
      <ShowreelSection />

      <div className="divider" />

      {/* ═══════════ SERVICES — 2×2 grid ═══════════ */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#0a0a0a" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>
              What We Do
            </p>
            <h2 className="max-w-sm text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl" style={{ fontFamily: "Inter, sans-serif" }}>
              Every format.<br /><em>One studio.</em>
            </h2>
          </Reveal>

          <div className="grid gap-px border border-[#F5F0E8]/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i * 0.08}
                  className="group flex flex-col border border-[#F5F0E8]/[0.06] p-8 transition-colors duration-500 hover:bg-[#F5F0E8]/[0.03]"
                >
                  <Icon size={22} className="mb-7 text-[#D4AF6A]" strokeWidth={1.5} />
                  <h3 className="mb-3 text-xl font-semibold text-[#F5F0E8]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {svc.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#F5F0E8]/45" style={{ fontFamily: "Inter, sans-serif" }}>
                    {svc.desc}
                  </p>
                  <div className="mt-7 h-px w-0 bg-[#D4AF6A]/50 transition-all duration-500 group-hover:w-10" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ BENTO GRID — portfolio frames ═══════════ */}
      <BentoGrid />

      {/* ═══════════ PARALLAX BANNER 1 — Wedding quote ═══════════ */}
      <ParallaxBanner
        img="https://res.cloudinary.com/wqhpwm9y/image/upload/w_1800,q_auto,f_auto/v1794158511/2B4A4674.jpg"
        quote="Every love story is beautiful. Let us make yours unforgettable."
        tag="Wedding Cinematography · Gurgaon"
      />

      {/* ═══════════ VIDEO GRID — 3×2 stills lightbox ═══════════ */}
      <VideoGrid />

      {/* ═══════════ PARALLAX BANNER 2 — Broadcast quote ═══════════ */}
      <ParallaxBanner
        img="https://res.cloudinary.com/wqhpwm9y/image/upload/w_1800,q_auto,f_auto/v1794158510/2B4A4633.jpg"
        quote="Live. Bold. Unforgettable. Every event deserves an audience."
        tag="Live Broadcasting · Multi-Camera Production"
      />

      {/* ═══════════ MASONRY GALLERY — behind the lens ═══════════ */}
      <MasonryGallery />

      <div className="divider" />

      {/* ═══════════ VENUE GALLERY — event & venue coverage ═══════════ */}
      <VenueGallery />

      <div className="divider" />

      {/* ═══════════ FEATURED WORK — 3 cards ═══════════ */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#0a0a0a" }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>
                Featured Work
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Stories we've<br /><em>told.</em>
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              View all work <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORKS.map((work, i) => (
              <Reveal key={work.title} delay={i * 0.1}>
                <article className="group relative overflow-hidden rounded-lg">
                  <div className="relative h-72 overflow-hidden">
                    <img src={work.img} alt={work.title} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5F0E8]/30 bg-[#F5F0E8]/10 backdrop-blur-sm">
                        <Play size={18} className="ml-0.5 text-[#F5F0E8]" fill="#F5F0E8" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-[#111111] border border-t-0 border-[#F5F0E8]/[0.06] rounded-b-lg">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.28em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {work.category}
                    </p>
                    <h3 className="text-xl font-semibold text-[#F5F0E8]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {work.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#F5F0E8]/35" style={{ fontFamily: "Inter, sans-serif" }}>
                      {work.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ OUR JOURNEY — timeline ═══════════ */}
      <OurJourney />

      <div className="divider" />

      {/* ═══════════ TESTIMONIALS — Swiper ═══════════ */}
      <section className="bg-[#111111] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Kind Words
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-[#F5F0E8] md:text-5xl" style={{ fontFamily: "Inter, sans-serif" }}>
              What our clients<br /><em>say.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={28} slidesPerView={1} loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{ 640: { slidesPerView: 1.3 }, 900: { slidesPerView: 2 }, 1200: { slidesPerView: 2.5 } }}
              className="!pb-12"
            >
              {TESTIMONIALS.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="rounded-lg border border-[#F5F0E8]/[0.07] bg-[#0a0a0a] p-8 md:p-10">
                    <span className="mb-5 block text-5xl leading-none text-[#D4AF6A]/60" style={{ fontFamily: "Inter, sans-serif" }}>"</span>
                    <p className="mb-8 text-lg leading-8 text-[#F5F0E8]/75" style={{ fontFamily: "Inter, sans-serif" }}>{t.quote}</p>
                    <div className="border-t border-[#F5F0E8]/[0.07] pt-5">
                      <p className="text-sm font-semibold text-[#F5F0E8]" style={{ fontFamily: "Inter, sans-serif" }}>{t.name}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>{t.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════ CELEBRITY SHOWCASE ═══════════ */}
      <CelebrityShowcase />

      <div className="divider" />

      {/* ═══════════ CTA ═══════════ */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: "#0a0a0a" }}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Ready to begin?
          </p>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-tight text-[#F5F0E8]" style={{ fontFamily: "Inter, sans-serif" }}>
            Let's create something<br /><em>worth remembering.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-sm text-sm leading-7 text-[#F5F0E8]/45" style={{ fontFamily: "Inter, sans-serif" }}>
            Have a story to tell? We'd love to hear it. Reach out and let's talk about your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#D4AF6A] hover:gap-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

    </main>
  );
}