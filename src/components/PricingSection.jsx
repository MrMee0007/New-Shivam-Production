import { Camera, Video, TrendingUp, Aperture, Star, Clock, Shield } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const PACKAGES = [
  {
    name: "ESSENTIAL",
    desc: "Perfect for intimate ceremonies and small events.",
    features: [
      "1 Cinematographer",
      "6 Hours of Coverage",
      "Cinematic Wedding Film (5–8 min)",
      "Highlight Reel (60–90 sec)",
      "Professional Color Grading",
      "Digital Delivery",
      "2 Revisions Included",
      "Online Gallery",
    ],
    featured: false,
  },
  {
    name: "SIGNATURE",
    desc: "Our most popular — full-day cinematic coverage.",
    features: [
      "2 Cinematographers",
      "Full Day Coverage (10–12 hrs)",
      "Cinematic Wedding Film (10–15 min)",
      "Highlight Reel (90–120 sec)",
      "Drone Aerial Shots",
      "Professional Color Grading & Sound",
      "Same-Day Edit Teaser",
      "3 Revisions + Priority Support",
      "USB + Online Delivery",
    ],
    featured: true,
  },
  {
    name: "GRAND",
    desc: "Complete multi-day luxury production experience.",
    features: [
      "3 Cinematographers + Director",
      "Multi-Day Coverage",
      "Feature Wedding Film (20–30 min)",
      "Multiple Highlight Reels",
      "4K Drone Coverage",
      "Live Broadcasting Option",
      "Full Post-Production Suite",
      "Unlimited Revisions",
      "Premium USB Box + Digital Archive",
      "Exclusive Behind-the-Scenes Film",
    ],
    featured: false,
  },
];

const ADDONS = [
  {
    icon: Camera,
    title: "DRONE COVERAGE",
    desc: "Breathtaking 4K aerial cinematography that adds a cinematic dimension to your film.",
    available: true,
  },
  {
    icon: Video,
    title: "LIVE STREAMING",
    desc: "Professional multi-camera live broadcast for guests who can't be there in person.",
    available: true,
  },
  {
    icon: TrendingUp,
    title: "PODCAST STUDIO",
    desc: "Full podcast production — recording, editing, sound design & distribution setup.",
    available: true,
  },
  {
    icon: Aperture,
    title: "360° VIRTUAL TOUR",
    desc: "Immersive 360° virtual walkthroughs of your venue or property. Coming soon.",
    available: false,
  },
];

const BOTTOM = [
  { icon: Star,   label: "PREMIUM QUALITY",   desc: "Cinematic excellence, always"     },
  { icon: Clock,  label: "ON-TIME DELIVERY",  desc: "Delivered when promised"          },
  { icon: Shield, label: "TRUSTED STUDIO",    desc: "12+ years of trusted memories"   },
];

export default function PricingSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-28 px-6 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-[clamp(3rem,8vw,7rem)] leading-none">
            <span className="text-[#F5C200]">OUR PACKAGES</span>
          </h2>
          <p className="text-white/45 mt-4 text-sm">Tailored to your story. Contact us for a custom quote.</p>
        </motion.div>
        <div className="flex justify-center mb-12">
          <div className="w-16 h-0.5 bg-[#F5C200]" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-20 items-start">
          {PACKAGES.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-7 flex flex-col hover:-translate-y-1.5 transition-all duration-400 ${
                plan.featured
                  ? "border-[#F5C200] bg-[#111] shadow-[0_0_60px_rgba(245,194,0,0.1)] md:-mt-4"
                  : "border-white/10 bg-[#111]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F5C200] text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading text-2xl text-white tracking-widest mb-1">{plan.name}</h3>
              <p className="text-white/35 text-xs mb-5">{plan.desc}</p>
              <div className="w-8 h-0.5 bg-[#F5C200] mb-5" />
              <p className="font-heading text-xl text-[#F5C200] mb-6">Contact Us for Pricing</p>
              <ul className="space-y-2 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[0.78rem] text-white/50">
                    <span className="text-[#F5C200] mt-0.5 flex-shrink-0">✦</span>{f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#F5C200] text-black hover:bg-[#FFD740]"
                    : "border border-white/25 hover:border-[#F5C200]/50 hover:text-[#F5C200] text-white"
                }`}
              >
                Book Now →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── ADD-ON SERVICES ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-none">
            <span className="text-[#F5C200]">ADD-ON SERVICES</span>
          </h2>
          <p className="text-white/45 mt-3 text-sm">
            Powerful add-ons to{" "}
            <span className="text-[#F5C200] font-semibold">elevate your production.</span>
          </p>
        </motion.div>
        <div className="flex justify-center mb-10">
          <div className="w-16 h-0.5 bg-[#F5C200]" />
        </div>

        {/* 4 add-on cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ADDONS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.08 }}
                className="border border-white/10 bg-[#111] rounded-2xl p-6 text-center flex flex-col items-center hover:border-[#F5C200]/50 hover:bg-[#151515] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden"
              >
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full border-2 border-[#F5C200] bg-[#F5C200]/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#F5C200]/10 transition-all duration-300">
                  <Icon size={22} className="text-[#F5C200]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-bold uppercase text-[0.8rem] tracking-[0.14em] text-white mb-2">
                  {a.title}
                </h3>

                {/* Gold separator */}
                <div className="w-8 h-0.5 bg-[#F5C200] mb-3 group-hover:w-12 transition-all duration-300" />

                {/* Description */}
                <p className="text-white/45 text-xs leading-relaxed mb-5 flex-1">
                  {a.desc}
                </p>

                {/* Availability Badge */}
                {a.available ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5C200]/10 border border-[#F5C200]/30 text-[#F5C200] text-[10px] font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(245,194,0,0.06)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C200] animate-pulse" />
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>Coming Soon</span>
                  </div>
                )}

                {/* CTA Link */}
                {a.available ? (
                  <Link
                    to="/contact"
                    className="w-full py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-black hover:bg-[#F5C200] hover:border-[#F5C200] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <span>Add to Package</span>
                    <span className="text-xs">→</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 rounded-lg border border-white/10 text-white/40 bg-white/5 text-[9px] font-bold uppercase tracking-widest cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.65 }}
          className="border border-white/8 bg-[#111] rounded-2xl px-6 py-4 flex flex-wrap items-center justify-around gap-6"
        >
          {BOTTOM.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#F5C200]/50 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-[#F5C200]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold uppercase text-[0.68rem] tracking-[0.14em] text-white">{label}</p>
                <p className="text-white/35 text-[0.7rem] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
