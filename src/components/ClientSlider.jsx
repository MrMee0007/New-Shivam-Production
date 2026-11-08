import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Play } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

/* ── Slide Data ─────────────────────────────────────── */
const SLIDES = [
  {
    category: "Wedding Cinema",
    title: "Priya & Rohan's Wedding",
    location: "Leela Palace, Gurgaon",
    desc: "A three-day royal celebration captured in a single breathtaking cinematic film.",
    tag: "Cinematic Film · 7 min",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    category: "Live Broadcast",
    title: "Maruti Suzuki Annual Summit",
    location: "India Expo Centre, Greater Noida",
    desc: "15,000+ live viewers. 8-camera production. Zero downtime. Full broadcast excellence.",
    tag: "Live Stream · 6 hrs",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    category: "Podcast Studio",
    title: "The Growth Podcast",
    location: "New Shivam Studio, Gurgaon",
    desc: "A branded podcast studio built from scratch — lighting, acoustic treatment, 4-camera setup.",
    tag: "Podcast Production · Weekly",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
  },
  {
    category: "Commercial Film",
    title: "Himalaya Wellness Ad Film",
    location: "Delhi & Gurgaon Locations",
    desc: "A 60-second ad film that generated 2M+ views and drove measurable product sales.",
    tag: "Ad Film · 60 sec",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=800&q=80",
  },
  {
    category: "Event Coverage",
    title: "Royal Celebrations Awards Night",
    location: "Hyatt Regency, Delhi",
    desc: "Full red-carpet coverage, live switching, and same-day highlight reel delivery.",
    tag: "Event Coverage · Full Day",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    category: "Wedding Cinema",
    title: "Meera & Arjun's Destination Wedding",
    location: "Udaipur, Rajasthan",
    desc: "Three days of Rajputana grandeur — temples, ghats, and golden hour moments — all on film.",
    tag: "Destination Wedding · 3 Days",
    color: "#F5C200",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
  },
];

/* ── Client Logos ───────────────────────────────────── */
const CLIENTS = [
  "Maruti Suzuki",
  "Himalaya Wellness",
  "Royal Celebrations",
  "The Growth Podcast",
  "Leela Palace",
  "Hyatt Regency",
  "Taj Hotels",
  "ITC Hotels",
  "Samsung India",
  "HDFC Bank",
];

export default function ClientSlider() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-20 md:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#F5C200]/6 blur-[160px]" />

      {/* Section Header */}
      <div className="mx-auto mb-14 max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#F5C200]">
              <span className="h-px w-8 bg-[#F5C200]" />
              Featured Work
            </p>
            <h2 className="font-heading text-[clamp(2.8rem,8vw,6rem)] uppercase leading-[0.88] tracking-tight text-white">
              Stories We've
              <br />
              <span className="text-[#F5C200]">Told.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-sm text-sm leading-7 text-white/45 md:text-right"
          >
            From wedding films to broadcast productions — a glimpse of
            the work we're most proud of.
          </motion.p>
        </div>
      </div>

      {/* Swiper Slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative px-6 md:px-12"
      >
        {/* Custom Nav Buttons */}
        <div className="absolute -top-16 right-6 z-10 flex gap-3 md:right-12">
          <button
            ref={prevRef}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#F5C200] hover:text-[#F5C200]"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            ref={nextRef}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#F5C200] hover:text-[#F5C200]"
            aria-label="Next slide"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 24 },
            900: { slidesPerView: 2.2, spaceBetween: 28 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="!pb-14"
        >
          {SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-500 hover:border-[#F5C200]/40">
                {/* Image */}
                <div className="relative h-[260px] overflow-hidden">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Category badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-[#F5C200]/30 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5C200] backdrop-blur-sm">
                    {slide.category}
                  </span>

                  {/* Play button */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Play size={14} className="ml-0.5 text-white" fill="white" />
                  </div>

                  {/* Tag at bottom of image */}
                  <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/60">
                    {slide.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
                    {slide.location}
                  </p>
                  <h3 className="font-heading text-xl text-white transition-colors group-hover:text-[#F5C200]">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    {slide.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F5C200] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View Project
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Client Logos Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 border-t border-white/10 pt-12"
      >
        <p className="mb-8 text-center text-[9px] uppercase tracking-[0.35em] text-white/30">
          Trusted by leading brands & families
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
              >
                {CLIENTS.map((client) => (
                  <span
                    key={client + group}
                    className="whitespace-nowrap font-heading text-lg uppercase tracking-[0.15em] text-white/20 transition-colors duration-300 hover:text-[#F5C200]/60 md:text-2xl"
                  >
                    {client}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
