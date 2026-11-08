import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya & Rahul Sharma",
    org: "Wedding Couple",
    initials: "PR",
    quote:
      "New Shivam captured every emotion of our wedding day so beautifully. When we watch the film, we're transported right back to those magical moments. Truly exceptional work.",
  },
  {
    name: "Corporate Head",
    org: "Maruti Suzuki India",
    initials: "MS",
    quote:
      "Their live broadcasting setup for our national dealer conference was flawless. Crystal-clear quality, zero technical issues, and an incredibly professional team throughout.",
  },
  {
    name: "Host & Producer",
    org: "The Business Podcast",
    initials: "BP",
    quote:
      "New Shivam transformed our podcast from a basic recording into a cinematic, professional production. Our listener engagement doubled within the first month.",
  },
  {
    name: "Marketing Director",
    org: "Himalaya Wellness",
    initials: "HW",
    quote:
      "The ad films they produced for our wellness campaign exceeded all expectations. Stunning visuals, compelling storytelling, and measurable results in brand recall.",
  },
  {
    name: "Event Manager",
    org: "Royal Celebrations",
    initials: "RC",
    quote:
      "We've partnered with New Shivam for over 50 events. Their consistency, creativity, and professionalism make them the only production house we trust for our premium clients.",
  },
  {
    name: "Deepika & Arjun Verma",
    org: "Destination Wedding",
    initials: "DV",
    quote:
      "Our Goa destination wedding film is a true masterpiece. Every candid moment, every sunset, every laugh captured so authentically. We couldn't be happier.",
  },
  {
    name: "Brand Head",
    org: "Nikon India",
    initials: "NK",
    quote:
      "Exceptional production quality for our product launch testimonials. New Shivam understood our brand voice perfectly and delivered content that resonated deeply with our audience.",
  },
  {
    name: "Founder",
    org: "TechVenture Summit",
    initials: "TV",
    quote:
      "Their event coverage for our annual summit was extraordinary. From keynote streams to highlight reels, every deliverable was perfectly executed and delivered on time.",
  },
];

export default function TestimonialsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((p) => (p + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-black">

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand)]/7 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5C200]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--brand)] uppercase tracking-[0.3em] text-[10px] mb-5">Client Stories</p>
          <h2 className="font-heading text-5xl md:text-7xl leading-none">
            <span className="block text-[var(--brand)]">Heard From the Heart</span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Real words from real people whose moments we had the privilege to preserve.
          </p>
        </motion.div>

        {/* Card */}
        <div className="relative rounded-[2.5rem] border border-white/8 bg-white/[0.02] backdrop-blur-xl p-8 md:p-14 overflow-hidden">
          <Quote size={160} className="absolute right-6 top-6 text-[var(--brand)]/8 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[var(--brand)]/28 flex items-center justify-center bg-gradient-to-br from-[#111] to-[#1c1c1c] flex-shrink-0">
              <span className="font-heading text-3xl md:text-4xl text-[var(--brand)]">{t.initials}</span>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -35 }}
                  transition={{ duration: 0.45 }}
                >
                  <blockquote className="text-lg md:text-2xl text-white leading-relaxed font-light">
                    "{t.quote}"
                  </blockquote>

                  <div className="mt-7">
                    <p className="text-white font-semibold text-base">{t.name}</p>
                    <p className="text-[var(--brand)] uppercase tracking-[0.2em] text-[10px] mt-0.5">{t.org}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <span className="text-white/30 text-xs">
              {String(current + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-1.5 bg-[var(--brand)]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-[var(--brand)]/28 text-[var(--brand)] flex items-center justify-center hover:bg-[var(--brand)] hover:text-black transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-[var(--brand)]/28 text-[var(--brand)] flex items-center justify-center hover:bg-[var(--brand)] hover:text-black transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}