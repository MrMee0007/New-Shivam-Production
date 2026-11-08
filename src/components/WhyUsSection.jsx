import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Lightbulb, Users, TrendingUp, Shield, Clock } from "lucide-react";

const BENEFITS = [
  { icon: Target,     title: "CINEMATIC VISION",    desc: "Every frame composed with artistic intention and storytelling depth."                  },
  { icon: Lightbulb,  title: "CREATIVE EXCELLENCE", desc: "Award-worthy production quality that sets your memories apart."                       },
  { icon: Users,      title: "DEDICATED TEAM",      desc: "A passionate crew of cinematographers, editors, and sound designers."                  },
  { icon: TrendingUp, title: "CUTTING-EDGE TECH",   desc: "Latest camera systems, drones, and stabilizers for stunning visuals."                 },
  { icon: Shield,     title: "TRUSTED PARTNER",     desc: "Transparent communication and unwavering commitment to your vision."                   },
  { icon: Clock,      title: "ON-TIME DELIVERY",    desc: "Your films delivered on schedule, every single time, no exceptions."                  },
];

export default function WhyUsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — big text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-2"
          >
            <p className="text-[#F5C200] uppercase tracking-[0.3em] text-[9px] font-bold mb-5">
              THE NEW SHIVAM ADVANTAGE
            </p>

            {/* Gold separator */}
            <div className="w-10 h-0.5 bg-[#F5C200] mb-6" />

            <h2 className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] uppercase mb-8">
              <span className="text-[#F5C200]">More Than<br />A Camera.<br />A Legacy.</span>
            </h2>

            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              We combine artistry, technical mastery and heartfelt dedication to create
              films that don't just document moments — they{" "}
              <span className="text-[#F5C200] font-semibold">become timeless heirlooms.</span>
            </p>
          </motion.div>

          {/* Right — 2×3 grid of benefit cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                  className="group border border-white/10 bg-[#111] rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#F5C200]/40 hover:bg-[#141414] transition-all duration-400 cursor-default"
                >
                  {/* Gold icon circle */}
                  <div className="w-[52px] h-[52px] rounded-full border-2 border-[#F5C200] flex items-center justify-center mb-4 group-hover:bg-[#F5C200]/8 transition-colors duration-300">
                    <Icon size={20} className="text-[#F5C200]" strokeWidth={1.5} />
                  </div>

                  {/* Gold separator */}
                  <div className="w-6 h-0.5 bg-[#F5C200] mb-3" />

                  <h3 className="font-bold uppercase text-[0.68rem] tracking-[0.12em] text-white mb-2 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-white/40 text-[0.72rem] leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
