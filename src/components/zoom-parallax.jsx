import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imageLayout = [
  { top: "8%", left: "34%", width: "32%", height: "54%", scale: 4, label: "01", category: "CREATIVE DIRECTION", title: "Ideas with intent." },
  { top: "12%", left: "6%", width: "25%", height: "32%", scale: 5, label: "02", category: "BRAND STRATEGY", title: "Built to stand out." },
  { top: "13%", left: "68%", width: "25%", height: "38%", scale: 6, label: "03", category: "VISUAL STORYTELLING", title: "Stories that stay." },
  { top: "58%", left: "12%", width: "25%", height: "30%", scale: 5, label: "04", category: "CONTENT PRODUCTION", title: "Made to move." },
  { top: "62%", left: "39%", width: "22%", height: "28%", scale: 6, label: "05", category: "DIGITAL EXPERIENCES", title: "Designed for impact." },
  { top: "55%", left: "66%", width: "26%", height: "34%", scale: 8, label: "06", category: "CAMPAIGN DESIGN", title: "Make it memorable." },
  { top: "37%", left: "42%", width: "16%", height: "20%", scale: 9, label: "07", category: "THE BIG PICTURE", title: "Think beyond." },
];

function ParallaxImage({ image, layout, index, progress }) {
  const scale = useTransform(progress, [0, 1], [1, layout.scale]);

  return (
    <motion.div
      style={{
        top: layout.top,
        left: layout.left,
        width: layout.width,
        height: layout.height,
        scale,
      }}
      className="absolute z-[2] origin-center will-change-transform"
    >
      <div className="group relative h-full w-full overflow-hidden border border-white/15 bg-[#171717]">
        <img
          src={image.src}
          alt={image.alt || layout.category}
          draggable="false"
          loading={index < 3 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

        <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
          <span className="text-[7px] font-semibold tracking-[0.2em] text-[#FFD700] sm:text-[9px]">
            {layout.label} / {layout.category}
          </span>

          <p className="mt-1 text-xs font-medium tracking-tight text-white sm:text-lg">
            {layout.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ZoomParallax({ images }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={container}
      id="creative-work"
      className="relative h-[300vh] bg-[#080808] text-white"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[65vw] w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD700]/[0.045] blur-[130px]"
        />

        <div className="absolute left-5 right-5 top-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 sm:top-9">
          <span className="text-xs font-black tracking-[-0.04em] text-[#FFD700] sm:text-sm">
            BRAND<span className="text-white">//</span>
          </span>

          <span className="text-[9px] tracking-[0.25em] text-white/50 sm:text-[10px]">
            SELECTED CREATIVE WORK
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-5">
          <div className="max-w-3xl text-center">
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#FFD700] sm:text-xs">
              Strategy meets imagination
            </p>

            <h2 className="text-[clamp(2.8rem,8vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              We make brands
              <br />
              <span className="font-sans italic text-[#FFD700]">
                impossible to ignore.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-white/55 sm:mt-7 sm:text-sm">
              From the first idea to the final frame, every detail has a
              purpose.
            </p>
          </div>
        </div>

        {images.slice(0, imageLayout.length).map((image, index) => (
          <ParallaxImage
            key={image.src || index}
            image={image}
            layout={imageLayout[index]}
            index={index}
            progress={scrollYProgress}
          />
        ))}

        <div className="absolute bottom-6 left-5 right-5 z-20 flex items-center justify-between sm:bottom-9 sm:left-10 sm:right-10">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">
            Scroll to explore
          </span>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-white/20">
              <motion.span
                className="block h-px bg-[#FFD700]"
                style={{ width: progressWidth }}
              />
            </span>

            <span className="font-mono text-[10px] text-[#FFD700]">
              01 — 07
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ZoomParallax;
