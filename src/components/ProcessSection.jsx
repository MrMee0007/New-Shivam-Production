import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare, CalendarCheck, Film, Send, TrendingUp,
  Target, Users, Award,
} from "lucide-react";

/* ── 5-step production workflow ── */
const STEPS = [
  {
    num: "01", icon: MessageSquare,
    title: "CONSULT",
    desc: "We listen to your vision, understand your story, and craft a personalized creative brief.",
  },
  {
    num: "02", icon: CalendarCheck,
    title: "PLAN",
    desc: "We build a detailed shoot schedule, scout locations, and prepare every detail.",
  },
  {
    num: "03", icon: Film,
    title: "SHOOT",
    desc: "Our expert crew captures every emotion, every moment, with cinematic precision.",
  },
  {
    num: "04", icon: Send,
    title: "EDIT",
    desc: "We craft a stunning film with color grading, sound design, and thoughtful storytelling.",
  },
  {
    num: "05", icon: TrendingUp,
    title: "DELIVER",
    desc: "You receive your final film — beautifully packaged and ready to share forever.",
  },
];

const BOTTOM = [
  { icon: Target, label: "STORY-FIRST",    desc: "Every project begins with your story." },
  { icon: Users,  label: "COLLABORATIVE",  desc: "We work with you, not just for you."  },
  { icon: Award,  label: "AWARD-WORTHY",   desc: "Cinematic quality in every delivery."  },
];

/* ── Dotted arrow connector ─────────────────────── */
function Arrow() {
  return (
    <div className="hidden md:flex items-center flex-shrink-0 w-10 lg:w-14 relative -mx-1">
      <div className="w-full border-t-2 border-dashed border-[#F5C200]/40" />
      <div className="absolute right-0 text-[#F5C200]/60 text-base -translate-y-[1px]">▶</div>
    </div>
  );
}

export default function ProcessSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-28 px-6 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-[clamp(3.5rem,10vw,8rem)] leading-none">
            <span className="text-[#F5C200]">OUR PROCESS</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto">
            From the first conversation to the final frame —{" "}
            <span className="text-[#F5C200] font-semibold">every step crafted with care.</span>
          </p>
        </motion.div>

        {/* Gold underline */}
        <div className="flex justify-center mb-14">
          <div className="w-16 h-0.5 bg-[#F5C200]" />
        </div>

        {/* 5-step horizontal layout */}
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col md:flex-row items-center flex-1 min-w-0">
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex-1 w-full border border-white/10 bg-[#111] rounded-2xl p-6 text-center hover:border-[#F5C200]/40 hover:bg-[#141414] transition-all duration-400 flex flex-col items-center gap-4"
                >
                  {/* Gold icon circle */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#F5C200] flex items-center justify-center bg-[#111] group-hover:bg-[#F5C200]/10 transition-colors duration-300">
                    <Icon size={26} className="text-[#F5C200]" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <span className="text-[#F5C200] font-heading text-lg tracking-widest">{step.num}</span>

                  {/* Separator */}
                  <div className="w-8 h-0.5 bg-[#F5C200]" />

                  {/* Title */}
                  <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm">{step.title}</h3>

                  {/* Description */}
                  <p className="text-white/45 text-[0.8rem] leading-relaxed">{step.desc}</p>
                </motion.div>

                {/* Arrow between cards */}
                {i < STEPS.length - 1 && <Arrow />}
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 border border-white/10 bg-[#111] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8"
        >
          {/* Left brand statement */}
          <div className="flex items-center gap-4 flex-1 pr-0 md:pr-8 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full border border-[#F5C200] flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-[#F5C200]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-bold uppercase text-[0.75rem] tracking-[0.15em] text-white">Vision. Craft. Excellence.</p>
              <p className="text-[#F5C200] font-bold uppercase text-[0.72rem] tracking-[0.12em]">That's How We Create Memories.</p>
            </div>
          </div>

          {/* Right 3 pillars */}
          {BOTTOM.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-start gap-3 flex-1 pl-0 md:pl-8 pt-4 md:pt-0 justify-center md:justify-start">
                <div className="w-9 h-9 rounded-full border border-[#F5C200]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} className="text-[#F5C200]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold uppercase text-[0.72rem] tracking-[0.12em] text-white">{b.label}</p>
                  <p className="text-white/40 text-[0.75rem] mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
