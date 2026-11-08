import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Film, Radio, Mic, Megaphone, Camera, Video, Heart, Tv,
} from "lucide-react";

const SERVICES = [
  {
    icon: Heart,
    title: "WEDDING FILMS",
    desc: "Cinematic wedding films that immortalize your love story with emotion, beauty, and timeless elegance.",
  },
  {
    icon: Radio,
    title: "LIVE BROADCASTING",
    desc: "Professional multi-camera live streaming for events, launches, and ceremonies with studio-grade quality.",
  },
  {
    icon: Mic,
    title: "PODCAST PRODUCTION",
    desc: "End-to-end podcast production — recording, editing, sound design, and multi-platform distribution.",
  },
  {
    icon: Megaphone,
    title: "AD CAMPAIGNS",
    desc: "High-impact advertising films and digital campaigns that capture attention and drive real conversions.",
  },
  {
    icon: Camera,
    title: "TESTIMONIALS",
    desc: "Authentic, studio-quality testimonial videos that build trust and amplify your brand's credibility.",
  },
  {
    icon: Tv,
    title: "EVENT COVERAGE",
    desc: "Full-spectrum event coverage — corporate galas, launches, concerts, and cultural celebrations.",
  },
];

const STATS = [
  { num: "500+", label: "Events Filmed"     },
  { num: "12+",  label: "Years in Industry" },
  { num: "98%",  label: "Client Retention"  },
  { num: "4.9/5",label: "Client Rating"     },
];

export default function ServicesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 px-6 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-[clamp(3.5rem,10vw,8rem)] leading-none">
            <span className="text-[#F5C200]">WHAT WE DO</span>
          </h2>
          <p className="text-white/50 text-base mt-4">
            From your first look to your final cut —{" "}
            <span className="text-[#F5C200] font-semibold">every frame, perfected.</span>
          </p>
        </motion.div>

        {/* Gold underline */}
        <div className="flex justify-center mb-14">
          <div className="w-16 h-0.5 bg-[#F5C200]" />
        </div>

        {/* 6-column service grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group border border-white/10 bg-[#111] rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#F5C200]/40 hover:bg-[#141414] transition-all duration-400 cursor-default"
              >
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full border-2 border-[#F5C200] flex items-center justify-center bg-[#111] mb-4 group-hover:bg-[#F5C200]/8 transition-colors duration-300">
                  <Icon size={22} className="text-[#F5C200]" strokeWidth={1.5} />
                </div>

                {/* Gold separator */}
                <div className="w-6 h-0.5 bg-[#F5C200] mb-3" />

                {/* Title */}
                <h3 className="font-bold uppercase text-[0.7rem] tracking-[0.12em] text-white mb-3 leading-tight">
                  {svc.title}
                </h3>

                {/* Desc */}
                <p className="text-white/40 text-[0.72rem] leading-relaxed">{svc.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border border-white/10 bg-[#111] rounded-2xl px-6 py-5 flex flex-wrap items-center justify-around gap-6 mb-6"
        >
          {STATS.map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <p className="font-heading text-2xl text-[#F5C200] leading-none">{num}</p>
              <p className="text-white/40 text-[0.68rem] uppercase tracking-[0.15em] mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-white/45 text-sm tracking-wide"
        >
          <span className="text-[#F5C200] text-xl font-sans mr-2">"</span>
          We don't just film moments, we{" "}
          <span className="text-[#F5C200] font-semibold">preserve them forever.</span>
          <span className="text-[#F5C200] text-xl font-sans ml-2">"</span>
        </motion.p>
      </div>
    </section>
  );
}
