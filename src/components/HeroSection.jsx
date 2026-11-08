
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
} from "lucide-react";
import video from "../assets/production-showreel.mp4";

const GOLD = "#F5C200";

const SHOWREEL = {video};

const SLIDES = [
  {
    eyebrow: "CINEMATIC WEDDING FILMS",
    title: ["YOUR LOVE.", "OUR LENS."],
    description:
      "We craft breathtaking wedding films that capture every emotion, every glance, and every moment you'll treasure for a lifetime.",
    category: "WEDDING CINEMATOGRAPHY",
    image:
      "https://res.cloudinary.com/n8tbvqpb/image/upload/v1792008630/Screenshot_2026-10-15_012621.webp",
  },
  {
    eyebrow: "LIVE BROADCASTING & EVENTS",
    title: ["LIVE. BOLD.", "UNFORGETTABLE."],
    description:
      "Professional multi-camera live broadcasting for corporate events, launches, and ceremonies — connecting you to audiences everywhere.",
    category: "LIVE BROADCASTING",
    image:
      "https://res.cloudinary.com/n8tbvqpb/image/upload/v1792008629/Img20.webp",
  },
  {
    eyebrow: "BRAND & COMMERCIAL PRODUCTION",
    title: ["STORIES THAT", "SELL."],
    description:
      "From podcast studios to ad campaigns — we produce content that builds brands, engages audiences and drives real results.",
    category: "COMMERCIAL PRODUCTION",
    image:
      "https://res.cloudinary.com/n8tbvqpb/image/upload/v1792008630/Screenshot_2026-10-15_012235.webp",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const slide = SLIDES[current];

  const goTo = useCallback((index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((index) => (index + 1) % SLIDES.length);
  }, []);

  const previous = useCallback(() => {
    setCurrent((index) => (index - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, paused, reduceMotion]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (nextMuted) {
      video.play().catch(() => {});
    }
  };

  const openShowreel = () => {
    // Connect this to your dedicated showreel page or modal.
    window.location.href = "/work";
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#080808] text-white"
      style={{ height: "100svh", minHeight: "650px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Film production studio introduction"
    >
      {/* CINEMATIC BACKGROUND */}

      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Static image fallback */}

        <AnimatePresence initial={false}>
          {!videoReady && (
            <motion.img
              key={slide.image}
              src={slide.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>

        {/* Replace with your own licensed showreel footage */}

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SLIDES[0].image}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />

        {/* Cinematic color grading */}

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/35" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.3'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* EDITORIAL FRAME */}

      <div className="pointer-events-none absolute inset-4 z-10 border border-white/[0.12] md:inset-7" />

      <div className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 select-none lg:block">
        <span
          className="font-heading text-[clamp(8rem,16vw,17rem)] leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.22)",
          }}
        >
          0{current + 1}
        </span>
      </div>

      {/* TOP STUDIO IDENTIFICATION */}

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 pt-10 md:px-16 md:pt-12">
        <Link
          to="/"
          className="group flex flex-col leading-none"
          aria-label="Brand home"
        >

          <span className="mt-20 text-[8px] tracking-[0.28em] text-white/55">
            FILM & CREATIVE PRODUCTION
          </span>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 mt-5"
              style={{ background: GOLD }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full mt-5"
              style={{ background: GOLD }}
            />
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/65 mt-10">
            Independent Production Studio
          </span>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className="flex mt-15 h-10 w-10 items-center justify-center border border-white/20 bg-black/20 transition-colors hover:border-[#F5C200]"
          aria-label={muted ? "Unmute showreel" : "Mute showreel"}
        >
          <Volume2
            size={16}
            className={muted ? "text-white/55" : "text-[#F5C200]"}
          />
        </button>
      </header>

      {/* MAIN STORY */}

      <div className="absolute inset-0 z-10 flex items-center px-9 pb-10 pt-32 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 35, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -18, filter: "blur(4px)" }
            }
            transition={{ duration: 0.75, ease }}
            className="w-full max-w-5xl"
          >
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <span
                className="h-px w-9"
                style={{ background: GOLD }}
              />
              <span
                className="text-[9px] font-medium uppercase tracking-[0.35em] md:text-[10px]"
                style={{ color: GOLD }}
              >
                {slide.eyebrow}
              </span>
            </div>

            <h1
              className="font-heading font-medium uppercase tracking-[-0.055em]"
              style={{
                fontSize: "clamp(3.3rem, 9.2vw, 9rem)",
                lineHeight: 0.88,
              }}
            >
              <span className="block">{slide.title[0]}</span>
              <span
                className="mt-2 block"
                style={{ color: GOLD }}
              >
                {slide.title[1]}
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/70 md:mt-9 md:text-base md:leading-8">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <button
                type="button"
                onClick={openShowreel}
                className="group inline-flex min-h-12 items-center gap-4 px-5 text-[9px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white md:px-7"
                style={{ background: GOLD }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20">
                  <Play size={12} fill="currentColor" />
                </span>
                Explore Our Films
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <Link
                to="/contact"
                className="group inline-flex min-h-12 items-center gap-3 border border-white/30 bg-black/15 px-5 text-[9px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm transition-colors hover:border-[#F5C200] hover:text-[#F5C200] md:px-7"
              >
                Discuss a Production
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM FILM NAVIGATION */}

      <footer className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/35 px-8 py-5 backdrop-blur-md md:px-16 md:py-3">
        <div className="flex items-center justify-between gap-5">
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="text-[8px] uppercase tracking-[0.3em] text-white/35">
              Currently exploring
            </p>
            <p
              className="mt-2 truncate text-[10px] uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              {slide.category}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-heading text-lg"
              style={{ color: GOLD }}
            >
              0{current + 1}
            </span>

            <div className="flex w-24 gap-1.5 md:w-40">
              {SLIDES.map((item, index) => (
                <button
                  type="button"
                  key={item.category}
                  onClick={() => goTo(index)}
                  aria-label={`View ${item.category}`}
                  aria-current={current === index ? "true" : undefined}
                  className="group relative h-8 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
                  <motion.span
                    className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left"
                    style={{
                      background: GOLD,
                      scaleX: current === index ? 1 : 0,
                    }}
                    animate={{
                      scaleX: current === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs text-white/35">
              / 0{SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors hover:border-[#F5C200] hover:bg-[#F5C200] hover:text-black"
              aria-label="Previous story"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors hover:border-[#F5C200] hover:bg-[#F5C200] hover:text-black"
              aria-label="Next story"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
