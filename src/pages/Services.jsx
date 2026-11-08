
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Film,
  TrendingUp,
  Users,
  Star,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import weddingImg from "../assets/slide5.png";
import broadcastImg from "../assets/content.jpeg";
import podcastImg from "../assets/business.jpeg";
import commercialImg from "../assets/creator.png";

/* ── Services Data ────────────────────────────────── */
const SERVICES = [
  {
    id: "wedding",
    number: "01",
    icon: Star,
    label: "Wedding Cinema",
    title: "Wedding Cinematography",
    tagline: "Love stories told in light and motion.",
    intro:
      "Your wedding day is the most important story you'll ever live. We capture it with cinematic precision — every glance, every tear, every burst of laughter — transformed into a timeless film that you'll relive for generations. From intimate ceremonies to grand celebrations, our wedding films are works of art.",
    image: weddingImg,
    subServices: [
      {
        title: "Cinematic Wedding Films",
        desc: "Full-length feature films that capture your wedding day in breathtaking cinematic quality.",
        items: [
          "Cinematic Highlight Film (3–8 min)",
          "Full Ceremony Coverage",
          "Full Reception Coverage",
          "Same-Day Edit (SDE)",
          "Love Story / Pre-Wedding Film",
          "Drone Aerial Coverage",
        ],
      },
      {
        title: "Multi-Camera Production",
        desc: "Professional multi-camera setups for complete coverage of every important moment.",
        items: [
          "2–4 Camera Coverage",
          "Dedicated Camera Operators",
          "Steadicam & Gimbal Shots",
          "Candid & Cinematic Angles",
          "GoPro & POV Coverage",
          "Low-Light & Night Coverage",
        ],
      },
      {
        title: "Pre-Wedding & Portraits",
        desc: "Artistic pre-wedding films and portrait sessions that set the mood for your big day.",
        items: [
          "Pre-Wedding Film (Outdoor / Studio)",
          "Couple Portrait Session",
          "Location Scouting",
          "Artistic Direction & Styling",
          "Destination Pre-Wedding Shoots",
          "Social Media Reels",
        ],
      },
      {
        title: "Photo + Video Packages",
        desc: "Seamless coordination of photography and videography for a cohesive wedding story.",
        items: [
          "Dedicated Photographer",
          "Edited Photo Gallery (500+ shots)",
          "Candid & Posed Photography",
          "Print-Ready Deliverables",
          "Online Album & Downloads",
          "Coordinated Photo-Video Team",
        ],
      },
      {
        title: "Post-Production Excellence",
        desc: "World-class editing, colour grading, and sound design for every wedding film.",
        items: [
          "Professional Video Editing",
          "Cinematic Colour Grading",
          "Sound Design & Music Sync",
          "Motion Titles & Animations",
          "4K Ultra-HD Delivery",
          "Private Online Delivery Portal",
        ],
      },
      {
        title: "Destination Weddings",
        desc: "Full production services for destination weddings across India and abroad.",
        items: [
          "Pan-India Destination Coverage",
          "International Wedding Shoots",
          "Advance Location Recce",
          "Multi-Day Wedding Coverage",
          "Royal & Heritage Venue Experience",
          "Complete Production Logistics",
        ],
      },
    ],
    closer: {
      heading: "Why New Shivam for Weddings?",
      body: "With over 500 weddings captured across 12+ years, we know how to anticipate the moments that matter most. Our team blends into your celebration invisibly — only surfacing to capture the extraordinary.",
    },
  },
  {
    id: "broadcast",
    number: "02",
    icon: TrendingUp,
    label: "Live Broadcasting",
    title: "Live Broadcasting & Streaming",
    tagline: "Every screen. Every viewer. Every moment.",
    intro:
      "We bring professional broadcast-quality live production to corporate events, award nights, sports, and large-scale gatherings. With multi-camera setups, real-time graphics, and reliable streaming infrastructure, we connect your event to audiences around the world — without missing a beat.",
    image: broadcastImg,
    subServices: [
      {
        title: "Multi-Camera Live Production",
        desc: "Professional multi-camera live setups for events of any size.",
        items: [
          "2–8 Camera Live Setup",
          "Live Switching & Direction",
          "Broadcast-Grade Cameras",
          "Steadicam & PTZ Cameras",
          "Live Graphics & Lower Thirds",
          "Real-Time Replay & Clips",
        ],
      },
      {
        title: "Live Streaming Platforms",
        desc: "Reliable, high-quality streaming to all major platforms simultaneously.",
        items: [
          "YouTube Live Streaming",
          "Facebook Live",
          "Custom RTMP Streaming",
          "Zoom / Webinar Integration",
          "Multi-Platform Simultaneous Streams",
          "Password-Protected Streams",
        ],
      },
      {
        title: "Audio-Visual Production",
        desc: "Complete AV solutions for seamless event production.",
        items: [
          "Professional Audio Mixing",
          "Stage & Screen Management",
          "LED Screen Content Management",
          "In-Ear Monitor Setup",
          "Line Array Sound Systems",
          "Wireless Microphone Arrays",
        ],
      },
      {
        title: "Corporate Events & Conferences",
        desc: "Broadcast-quality coverage for corporate events and hybrid conferences.",
        items: [
          "Town Halls & AGMs",
          "Product Launches",
          "Hybrid Events (In-Person + Virtual)",
          "Panel Discussions & Fireside Chats",
          "Award Ceremonies",
          "Corporate Training Streams",
        ],
      },
    ],
    closer: {
      heading: "Broadcast that performs.",
      body: "From 50-person boardrooms to 15,000-viewer livestreams, our broadcast team delivers rock-solid reliability, stunning picture quality, and seamless production — every time.",
    },
  },
  {
    id: "podcast",
    number: "03",
    icon: Film,
    label: "Podcast Production",
    title: "Podcast Studio Production",
    tagline: "Your voice, amplified beautifully.",
    intro:
      "We set up and produce professional podcast studios that make your content sound and look incredible. From branded studio design to multi-camera video podcasts and full post-production, we handle everything so you can focus on the conversation.",
    image: podcastImg,
    subServices: [
      {
        title: "Studio Setup & Design",
        desc: "Custom podcast studio environments built for your brand identity.",
        items: [
          "Branded Studio Design",
          "Acoustic Treatment",
          "Professional Lighting Setup",
          "Camera & Lens Selection",
          "Teleprompter & Monitor Setup",
          "Green Screen / Backdrop Options",
        ],
      },
      {
        title: "Video Podcast Production",
        desc: "Multi-camera video podcast production with broadcast-quality output.",
        items: [
          "Multi-Camera Video Recording",
          "Live-Switched Director Feed",
          "Guest Camera Kits",
          "Remote Guest Integration",
          "Real-Time Monitoring",
          "Full 4K Recording",
        ],
      },
      {
        title: "Audio Engineering",
        desc: "Professional-grade audio recording and mastering for every episode.",
        items: [
          "Studio-Grade Microphones",
          "Professional Audio Interface",
          "Live Audio Mixing",
          "Noise Removal & Cleanup",
          "Mastering & Loudness Normalisation",
          "Multi-Track Recording",
        ],
      },
      {
        title: "Post-Production & Distribution",
        desc: "Full editing, branding, and distribution support for every episode.",
        items: [
          "Episode Editing & Cuts",
          "Animated Intro / Outro",
          "Chapter Markers & Timestamps",
          "Show Notes & Transcripts",
          "Platform Upload (Spotify, Apple, YouTube)",
          "Social Media Clip Cuts",
        ],
      },
    ],
    closer: {
      heading: "Studio quality. Every episode.",
      body: "Whether you're launching your first podcast or scaling to daily episodes, our team delivers the studio setup, production quality, and post-production support that makes you sound and look world-class.",
    },
  },
  {
    id: "commercial",
    number: "04",
    icon: Users,
    label: "Commercial Films",
    title: "Commercial & Ad Film Production",
    tagline: "Ads that sell. Films that inspire.",
    intro:
      "We produce commercial films, ad campaigns, brand documentaries, and testimonial videos that do what great advertising is meant to do — build trust, capture attention, and drive real results. From concept to delivery, our commercial production team handles every detail.",
    image: commercialImg,
    subServices: [
      {
        title: "Brand & Ad Films",
        desc: "High-impact brand films and advertisements for TV, digital, and social media.",
        items: [
          "30s / 60s / 90s Ad Films",
          "Brand Manifesto Films",
          "Product Launch Videos",
          "Campaign Series Production",
          "Social Media Ad Creatives",
          "YouTube Pre-Roll Ads",
        ],
      },
      {
        title: "Testimonial Videos",
        desc: "Authentic customer and client testimonial videos that build brand credibility.",
        items: [
          "Customer Story Films",
          "Client Testimonials",
          "Doctor / Expert Endorsements",
          "Before & After Case Studies",
          "Scripted & Unscripted Formats",
          "Studio & On-Location Shoots",
        ],
      },
      {
        title: "Corporate Documentaries",
        desc: "Long-form corporate films that tell your brand's story with depth and authenticity.",
        items: [
          "Company Story / Legacy Films",
          "CSR & Impact Films",
          "Employee Culture Videos",
          "Factory & Process Films",
          "Investor & Pitch Videos",
          "Annual Report Films",
        ],
      },
      {
        title: "Event Coverage & After-Movies",
        desc: "Cinematic event coverage and after-movies that capture the energy of your events.",
        items: [
          "Corporate Event Films",
          "Product Launch Coverage",
          "Conference & Summit Films",
          "Sports & Entertainment Events",
          "Same-Day Edit Deliverables",
          "Social Media Highlight Reels",
        ],
      },
    ],
    closer: {
      heading: "Content that converts.",
      body: "We don't just create visually stunning content — we create purposeful commercial films built to drive awareness, trust, and sales for your brand. Every shot is strategic. Every story is intentional.",
    },
  },
];

/* ── Sub-service card ─────────────────────────────── */
function SubCard({ sub, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.2, 0, 0, 1],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(10,10,10,0.96))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-all duration-400"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,194,0,0.15),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-heading text-base tracking-[0.2em] text-[#F5C200]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#F5C200]/30" />
        </div>

        <h3 className="mb-2 font-sans text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#F5C200]">
          {sub.title}
        </h3>

        <p className="mb-4 text-xs leading-relaxed text-white/40">
          {sub.desc}
        </p>

        <ul className="space-y-1.5">
          {sub.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-white/55"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5C200] shadow-[0_0_16px_rgba(245,194,0,0.7)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Service panel ───────────────────────────────── */
function ServiceItem({ s, isOpen, onToggle, index }) {
  const bodyRef = useRef(null);
  const inView = useInView(bodyRef, {
    once: true,
    margin: "-40px",
  });

  const Icon = s.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.2, 0, 0, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen
          ? "border-[#F5C200]/40 bg-[#0c0c0c] shadow-[0_24px_90px_rgba(245,194,0,0.07)]"
          : "border-white/10 bg-white/[0.02] hover:border-[#F5C200]/25 hover:bg-white/[0.035]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,194,0,0.09),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative z-10 grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 p-5 text-left sm:gap-6 sm:p-7 md:p-8"
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/50 transition-all duration-300 group-hover:border-[#F5C200]/40 sm:h-14 sm:w-14">
          <Icon
            size={20}
            strokeWidth={1.5}
            className="text-[#F5C200]"
          />
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="font-heading text-xs tracking-[0.25em] text-[#F5C200]">
              {s.number}
            </span>

            <span className="h-px w-7 bg-[#F5C200]/40" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
              {s.label}
            </span>
          </div>

          <h2 className="font-heading text-xl leading-tight text-white transition-colors duration-300 group-hover:text-[#F5C200] sm:text-2xl md:text-3xl">
            {s.title}
          </h2>

          <p className="mt-1 text-xs italic text-white/40 sm:text-sm">
            {s.tagline}
          </p>
        </div>

        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 ${
            isOpen
              ? "rotate-180 border-[#F5C200] bg-[#F5C200] text-black"
              : "border-white/10 text-white/50 group-hover:border-[#F5C200]/50 group-hover:text-[#F5C200]"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.2, 0, 0, 1],
            }}
            className="overflow-hidden"
          >
            <div
              ref={bodyRef}
              className="relative z-10 px-5 pb-6 sm:px-7 sm:pb-8 md:px-8 md:pb-9"
            >
              <div className="mb-7 grid items-stretch gap-5 border-t border-white/10 pt-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col justify-center"
                >
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#F5C200]/20 bg-[#F5C200]/5 px-3 py-1.5">
                    <Sparkles
                      size={12}
                      className="text-[#F5C200]"
                    />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5C200]">
                      Signature Systems
                    </span>
                  </div>

                  <p className="max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
                    {s.intro}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="relative min-h-[190px] overflow-hidden rounded-xl border border-white/10 bg-white/5 md:min-h-[230px]"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/15 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#F5C200]" />

                  <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.24em] text-white/75">
                    {s.label}
                  </span>
                </motion.div>
              </div>

              <div
                className={`grid gap-4 ${
                  s.subServices.length <= 1
                    ? "grid-cols-1"
                    : s.subServices.length <= 2
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {s.subServices.map((sub, i) => (
                  <SubCard
                    key={sub.title}
                    sub={sub}
                    index={i}
                    inView={inView}
                  />
                ))}
              </div>

              {s.closer && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="relative mt-5 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl border border-[#F5C200]/20 bg-[linear-gradient(135deg,rgba(245,194,0,0.08),rgba(17,17,17,0.96),rgba(245,194,0,0.035))] p-6 sm:p-8 md:flex-row md:items-center"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F5C200]/10 blur-3xl" />

                  <div className="relative z-10 max-w-2xl">
                    <div className="mb-3 flex items-center gap-2 text-[#F5C200]">
                      <ShieldCheck size={15} />

                      <span className="text-[9px] uppercase tracking-[0.2em]">
                        Built to perform
                      </span>
                    </div>

                    <h3 className="mb-2 font-heading text-2xl text-white sm:text-3xl">
                      {s.closer.heading}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/45">
                      {s.closer.body}
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="group/cta relative z-10 inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#F5C200] px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD740]"
                  >
                    Start a Project

                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ── Services Page ────────────────────────────────── */
export default function ServicesPage() {
  const [activeId, setActiveId] = useState("wedding");

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, {
    once: true,
  });

  const toggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-6 pb-20 pt-36 sm:pb-24 sm:pt-40"
      >
        <div className="pointer-events-none absolute -left-40 -top-32 h-[460px] w-[460px] rounded-full bg-[#F5C200]/8 blur-[150px] sm:h-[600px] sm:w-[600px]" />

        <div className="pointer-events-none absolute -right-24 top-20 h-[320px] w-[320px] rounded-full bg-[#F5C200]/5 blur-[130px]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,194,0,0.07),transparent_34%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#F5C200]/20 bg-[#F5C200]/5 px-4 py-2 shadow-[0_0_30px_rgba(245,194,0,0.08)]"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-[#F5C200]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#F5C200]">
              // What We Do
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.2, 0, 0, 1],
            }}
            className="font-heading mb-6 text-[clamp(3.5rem,11vw,9rem)] uppercase leading-[0.87]"
          >
            OUR <span className="text-[#F5C200]">SERVICES</span>
          </motion.h1>

          <div className="mb-8 h-0.5 w-16 bg-[#F5C200] shadow-[0_0_30px_rgba(245,194,0,0.7)]" />

          <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
            >
              Tap any service to explore it. We've built specialised production
              systems across wedding cinema, live broadcasting, podcast
              production, and commercial filmmaking — all from one studio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-2"
            >
              {[
                ["500+", "Events"],
                ["12+", "Years"],
                ["98%", "Satisfaction"],
                ["4.9/5", "Rating"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="min-w-[105px] rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-[#F5C200]/25"
                >
                  <p className="font-heading text-2xl text-[#F5C200] sm:text-3xl">
                    {num}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/35">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bold Animated Services Strip ── */}
      <section
        aria-label="Our creative approach"
        className="relative w-full overflow-hidden border-y border-white/10 py-10 sm:py-14 md:py-16"
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12 md:gap-16 md:pr-16"
            >
              {["FILM.", "BROADCAST.", "CREATE.", "INSPIRE."].map(
                (word) => (
                  <span
                    key={word}
                    className="whitespace-nowrap font-heading text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
                  >
                    {word}
                  </span>
                )
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Service Cards ── */}
      <section className="mx-auto max-w-7xl px-6 py-14 pb-24 sm:py-16 sm:pb-28">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#F5C200]">
              [ Explore our practices ]
            </p>

            <h2 className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              One studio.{" "}
              <span className="text-[#F5C200]">Every format.</span>
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-relaxed text-white/35 sm:text-right sm:text-sm">
            Select a service to explore the systems, deliverables, and expertise behind it.
          </p>
        </div>

        <div className="space-y-4">
          {SERVICES.map((s, index) => (
            <ServiceItem
              key={s.id}
              s={s}
              index={index}
              isOpen={activeId === s.id}
              onToggle={() => toggle(s.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/10 bg-[linear-gradient(180deg,#050505,#0a0a0a)] px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-heading text-3xl text-white sm:text-4xl">
              Ready to <span className="text-[#F5C200]">start</span> production?
            </p>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/40">
              Wedding films. Live events. Podcasts. Commercials. All from one studio.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#F5C200] px-7 py-4 text-[10px] font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(245,194,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD740]"
            >
              Book a Consultation

              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="mailto:newshivamproductions@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-7 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:border-[#F5C200]/40 hover:text-[#F5C200]"
            >
              newshivamproductions@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
