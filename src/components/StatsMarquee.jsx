import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const BRANDS = [
  "Wedding Films", "Live Broadcasting", "Corporate Events", "Brand Commercials",
  "Podcast Production", "Testimonial Videos", "Ad Campaigns", "Event Coverage",
  "Cinematic Shoots", "Social Media Reels", "Documentary Films", "Product Shoots",
];

const STATS = [
  { target: 500,  suffix: "+",  label: "Events Covered"    },
  { target: 12,   suffix: "+",  label: "Years Experience"  },
  { target: 98,   suffix: "%",  label: "Client Satisfaction" },
  { target: 1200, suffix: "+",  label: "Hours of Footage"  },
];

/* ─── Animated counter ───────────────────────────── */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const DURATION = 2000;
    const start    = performance.now();
    const ease     = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-0.5 font-heading text-[clamp(3rem,6.5vw,5.5rem)] leading-none text-white"
    >
      {count}
      <span className="text-[var(--brand)] text-2xl">{suffix}</span>
    </div>
  );
}

/* ─── Component ───────────────────────────────────── */
export default function StatsMarquee() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 border-y border-white/5 bg-black">

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 py-6 mb-16">
        <div className="flex animate-marquee-left whitespace-nowrap select-none">
          {doubled.map((brand, i) => (
            <span key={i} className="inline-flex items-center gap-0">
              <span className="mx-8 text-base md:text-xl lg:text-2xl uppercase tracking-[0.28em] text-white/50 font-bold">
                {brand}
              </span>

              <span className="text-[var(--brand)]/60 text-lg md:text-xl">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>


      {/* Animated stats grid */}
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[9px] uppercase tracking-[0.28em] text-white/25 mb-2">
          Trusted by families & brands across India
        </p>
        <h2 className="text-center font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none mb-10 uppercase">
          <span className="text-[#F5C200]">The Numbers.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/4">
          {STATS.map(({ target, suffix, label }) => (
            <div
              key={label}
              className="bg-black p-10 text-center group hover:bg-[#F5C200]/4 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-px h-0 group-hover:h-full bg-gradient-to-b from-[var(--brand)] to-transparent transition-all duration-700" />
              <Counter target={target} suffix={suffix} />
              <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-white/35">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
