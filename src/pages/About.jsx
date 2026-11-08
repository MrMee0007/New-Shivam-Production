import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const STATS = [
  { num: "500+", label: "Events Covered" },
  { num: "1200+", label: "Hours of Footage" },
  { num: "12+", label: "Years Experience" },
  { num: "98%", label: "Client Satisfaction" },
];

const TEAM = [
  {
    name: "Yug Gupta",
    role: "Founder & Creative Director",
    img: "https://res.cloudinary.com/h8jkoa7d/image/upload/v1791297372/Screenshot_2026-10-06_195554.png",
    bio: "Yug Gupta is the Founder of New Shivam Production House and a passionate cinematographer with over 12 years of experience. He specialises in cinematic wedding films, live event broadcasting, and brand commercials — transforming real-life moments into timeless visual stories.",
    quote:
      "Every frame has a purpose. Every story deserves to be unforgettable.",
  },
  {
    name: "Ansh Garg",
    role: "Co-Founder & Post-Production Head",
    img: "https://res.cloudinary.com/h8jkoa7d/image/upload/v1791298020/ChatGPT_Image_Oct_6_2026_08_16_17_PM.png",
    bio: "Ansh Garg is the Co-Founder leading post-production at New Shivam. Renowned for his exceptional colour grading, sound design, and meticulous editing skills, he transforms raw footage into immersive cinematic experiences that move audiences.",
    quote: "Editing is where imagination becomes reality.",
  },
];

const VALUES = [
  {
    icon: Award,
    num: "01",
    title: "Cinematic craft first",
    desc: "We never sacrifice quality for speed. Every frame, colour grade, and edit is considered with intention — because your memories deserve the best.",
  },
  {
    icon: TrendingUp,
    num: "02",
    title: "Story-driven production",
    desc: "Great visuals without great storytelling fall flat. We engineer every project around emotion, narrative, and the story that needs to be told.",
  },
  {
    icon: Users,
    num: "03",
    title: "Client partnership always",
    desc: "We embed ourselves in your vision before we pick up a camera. Your story — captured authentically, never compromised.",
  },
];

const TIMELINE = [
  {
    year: "2012",
    title: "The beginning",
    desc: "New Shivam Production House was founded in Gurgaon with a single camera, a passionate team, and a commitment to capturing life's most meaningful moments with cinematic integrity.",
  },
  {
    year: "2015",
    title: "Wedding cinema takes off",
    desc: "Established ourselves as one of Gurgaon's most sought-after wedding cinematography studios, delivering films that couples cherish for a lifetime.",
  },
  {
    year: "2018",
    title: "Expanding into broadcast",
    desc: "Built a full live broadcasting setup, covering corporate events, award nights, and large-scale gatherings with multi-camera production and real-time streaming.",
  },
  {
    year: "2021",
    title: "Podcasts & commercial films",
    desc: "Launched a dedicated podcast production studio and expanded into ad film production, helping brands tell their stories with cinematic quality and strategic impact.",
  },
  {
    year: "Present",
    title: "500+ events. Still counting.",
    desc: "New Shivam Production House continues to grow as a full-service production studio — trusted by families, brands, and broadcasters across India for work that lasts.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "New Shivam captured our wedding in a way we never imagined possible. Every emotion, every moment — preserved forever. We've watched it over a hundred times.",
    name: "Priya & Rohan Sharma",
    org: "Wedding Clients",
  },
  {
    quote:
      "Their live broadcasting setup was flawless. 15,000 viewers tuned in for our annual awards night and not a single glitch. Truly professional.",
    name: "Events Manager",
    org: "Maruti Suzuki India",
  },
  {
    quote:
      "The podcast studio they set up for us was world-class. Sound quality, lighting, the whole experience — our listeners noticed the difference immediately.",
    name: "Host & Founder",
    org: "The Growth Podcast",
  },
  {
    quote:
      "Our ad film got over 2 million views in the first week. The team understood our brand deeply and delivered something that actually drove sales.",
    name: "Marketing Director",
    org: "Himalaya Wellness",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref, {
    once: true,
    margin: "-70px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#F5C200]">
      <span className="h-px w-8 bg-[#F5C200]" />
      {children}
    </p>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-[#080808] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pb-24 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_24%,rgba(245,194,0,0.12),transparent_34%),linear-gradient(115deg,#080808_10%,#111_60%,#080808)]" />

        <div className="absolute right-[-7rem] top-28 h-[30rem] w-[30rem] rounded-full border border-[#F5C200]/10 sm:right-[-4rem] sm:h-[42rem] sm:w-[42rem]" />

        <div className="absolute right-[-3rem] top-44 h-[22rem] w-[22rem] rounded-full border border-white/5 sm:right-0 sm:h-[32rem] sm:w-[32rem]" />

        <div className="absolute right-[8%] top-[22%] hidden h-3 w-3 rounded-full bg-[#F5C200] shadow-[0_0_40px_12px_rgba(245,194,0,0.25)] lg:block" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/65"
            >
              <Sparkles size={13} className="text-[#F5C200]" />
              Independent production studio · Gurgaon
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-[clamp(4rem,11.5vw,10.5rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]"
            >
              We capture
              <br />
              <span className="text-[#F5C200]">moments</span>
              <br />
              forever<span className="text-[#F5C200]">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-lg text-base leading-7 text-white/55 sm:text-lg">
                We turn life's most meaningful moments into cinematic
                masterpieces — through wedding films, live broadcasts,
                podcasts, and brand commercials built to last.
              </p>

              <Link
                to="/contact"
                className="group inline-flex w-fit shrink-0 items-center gap-3 border-b border-[#F5C200] pb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C200] transition-colors hover:text-white"
              >
                Start a project
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#F5C200]/25">
              <div className="absolute inset-4 rounded-full border border-white/10" />

              <div className="text-center">
                <p className="font-heading text-7xl font-black text-[#F5C200]">
                  BB<span className="text-white">.</span>
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-white/45">
                  Built to be remembered
                </p>
              </div>

              <span className="absolute -right-2 top-10 h-3 w-3 rounded-full bg-[#F5C200]" />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#F5C200]/50 to-transparent" />
      </section>

      {/* STATS */}
      <section className="border-b border-white/10 bg-[#0d0d0d] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="px-5 py-8 sm:px-8 sm:py-10"
            >
              <p className="font-heading text-4xl font-black tracking-tight text-[#F5C200] sm:text-5xl">
                {stat.num}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/40 sm:text-[10px]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND MANIFESTO */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <Reveal>
            <Eyebrow>The big idea</Eyebrow>
            <p className="max-w-xs text-sm leading-7 text-white/45">
              Not another studio. A creative partner invested in what your
              story can become.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              The world doesn't need more footage. It needs{" "}
              <span className="text-[#F5C200]">
                something worth feeling.
              </span>
            </h2>

            <div className="mt-9 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">
              <p className="text-sm leading-7 text-white/50">
                We build cinematic wedding films, broadcast-quality live
                events, and commercial productions that connect real
                audiences with real emotion.
              </p>

              <div className="space-y-3">
                {[
                  "Story before the shoot",
                  "Emotion with a clear purpose",
                  "Films built to move people",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/75"
                  >
                    <CheckCircle
                      size={15}
                      className="shrink-0 text-[#F5C200]"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#101010] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>The people behind the pixels</Eyebrow>
              <h2 className="font-heading text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Small team.
                <br />
                <span className="text-white/35">Big energy.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/45">
              A close-knit crew of visual thinkers, makers, and
              problem-solvers. Get to know the people behind the work.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.12}>
                <article className="group grid overflow-hidden border border-white/10 bg-[#080808] transition-colors duration-500 hover:border-[#F5C200]/40 sm:grid-cols-[0.82fr_1.18fr]">
                  <div className="relative min-h-[320px] overflow-hidden sm:min-h-[440px]">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/15" />

                    <span className="absolute left-5 top-5 border border-white/25 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.25em]">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
                    <div>
                      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.23em] text-[#F5C200]">
                        {member.role}
                      </p>

                      <h3 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                        {member.name}
                      </h3>

                      <p className="mt-6 text-sm leading-7 text-white/50">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-8 border-l-2 border-[#F5C200] pl-4">
                      <p className="text-sm italic leading-6 text-white/75">
                        “{member.quote}”
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-14 max-w-2xl">
            <Eyebrow>What guides us</Eyebrow>
            <h2 className="font-heading text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
              Our standards
              <br />
              are <span className="text-[#F5C200]">non-negotiable.</span>
            </h2>
          </Reveal>

          <div className="grid border-l border-t border-white/10 md:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon;

              return (
                <Reveal
                  key={value.title}
                  delay={i * 0.08}
                  className="group border-b border-r border-white/10 p-7 transition-colors duration-300 hover:bg-white/[0.025] sm:p-9 lg:p-11"
                >
                  <div className="mb-14 flex items-start justify-between">
                    <span className="font-heading text-5xl font-black text-white/15 transition-colors group-hover:text-[#F5C200]/60">
                      {value.num}
                    </span>

                    <Icon
                      size={23}
                      strokeWidth={1.4}
                      className="text-[#F5C200]"
                    />
                  </div>

                  <h3 className="mb-4 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="max-w-sm text-sm leading-7 text-white/45">
                    {value.desc}
                  </p>

                  <div className="mt-8 h-px w-10 bg-[#F5C200] transition-all duration-500 group-hover:w-full" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-y border-white/10 bg-[#0d0d0d] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>From day one</Eyebrow>

            <h2 className="font-heading text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
              The story
              <br />
              so far<span className="text-[#F5C200]">.</span>
            </h2>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/45">
              A growing studio with a clear point of view — and a lot more to
              create.
            </p>
          </Reveal>

          <div className="relative border-l border-white/10 pl-7 sm:pl-10">
            {TIMELINE.map((item, i) => (
              <Reveal
                key={item.year}
                delay={i * 0.04}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[2.05rem] top-1 h-3 w-3 rounded-full border-2 border-[#080808] bg-[#F5C200] ring-4 ring-[#F5C200]/10 sm:-left-[2.55rem]" />

                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5C200]">
                  {item.year}
                </p>

                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12 flex items-end justify-between gap-5">
            <div>
              <Eyebrow>Kind words</Eyebrow>
              <h2 className="font-heading text-4xl font-black uppercase sm:text-6xl">
                Don't take
                <br className="sm:hidden" /> our word.
              </h2>
            </div>

            <span className="hidden text-xs uppercase tracking-[0.2em] text-white/35 sm:block">
              The work speaks.
            </span>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.org} delay={i * 0.06}>
                <article className="flex h-full flex-col justify-between border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-[#F5C200]/35 sm:p-9">
                  <div>
                    <p className="font-heading text-5xl leading-none text-[#F5C200]">
                      “
                    </p>

                    <p className="mt-3 text-lg leading-8 text-white/75">
                      {t.quote}
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#F5C200]">
                        {t.org}
                      </p>
                    </div>

                    <span className="text-xs tracking-[0.2em] text-white/30">
                      0{i + 1}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#F5C200] px-5 py-24 text-black sm:px-8 sm:py-32 lg:px-14">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-black/10" />
        <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full border border-black/10" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
              Have a good one in mind?
            </p>

            <h2 className="font-heading text-[clamp(3.4rem,9vw,8rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]">
              Let's make
              <br />
              it matter<span className="text-white">.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="max-w-sm">
            <p className="mb-7 text-base leading-7 text-black/65">
              Have a brand to build, a story to tell, or an idea you can't stop
              thinking about? Let's turn it into something real.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-black px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-1"
              >
                Let's talk
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="mailto:newshivamproductions@gmail.com"
                className="inline-flex items-center border border-black/25 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-black/5"
              >
                Email us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-3 bg-[#080808] px-5 py-6 text-[9px] uppercase tracking-[0.22em] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
        <span>NEW SHIVAM PRODUCTION HOUSE © {new Date().getFullYear()}</span>
        <span>Built on passion. Driven by craft.</span>
      </footer>
    </main>
  );
}