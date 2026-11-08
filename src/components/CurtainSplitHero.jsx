
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://cdn.21st.dev/assets/mirror/e7/e7a332af3b7d4f1d9ed407976bcbb4515dff5926b4e5e21643141559e2ca9b72.jpg",
    alt: "Brand campaign",
    label: "01 / BRANDING",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/11/1196eabb585176bc09874d358e4acb3c736f45f074651bac3008af3434aae79c.jpg",
    alt: "Creative direction",
    label: "02 / CREATIVE",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/d6/d6fdc6667dca3237659ff8d3b71bdf2fd9d8eb705098e54bf84edb2aa4d7854b.jpg",
    alt: "Campaign concept",
    label: "03 / CAMPAIGNS",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ef/efc2962ee9f3e9dc43ffbc5398e06e554ca8f08d7eef93e5b6589dc7aa5e5aee.jpg",
    alt: "Visual storytelling",
    label: "04 / STORYTELLING",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/b1/b1ff84a0e2287cc671952a2d44ecfa693a2fc16085ba564f275ab1c28db645db.jpg",
    alt: "Brand experience",
    label: "05 / EXPERIENCE",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/44/447a16d360600da40bac95afbf1210dfec0719114b797697ce877e26bca54ceb.jpg",
    alt: "Visual identity",
    label: "06 / IDENTITY",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/48/48db070b82ddcf8b658c59af85c75da59a27c6e58a5f00516c5f04e2bb56bfcc.jpg",
    alt: "Digital creativity",
    label: "07 / DIGITAL",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/03/034fafd261aa494f27831b60b82214ed41742abde84ff88545b7f0d4537a1688.jpg",
    alt: "Campaign production",
    label: "08 / PRODUCTION",
  },
];

const SPRING_CONFIG = {
  stiffness: 65,
  damping: 22,
  mass: 0.5,
};

function CurtainCard({
  item,
  index,
  total,
  progress,
  pointer,
  isSpreadActive,
  stage,
}) {
  const half = total / 2;
  const isLeft = index % 2 === 0;
  const wingIndex = Math.floor(index / 2);
  const norm = wingIndex / (half - 1) - 0.5;
  const sideMult = isLeft ? -1 : 1;

  const cardWidth = stage.isMobile ? 88 : 130;
  const cardHeight = stage.isMobile ? 116 : 170;

  const archCurve =
    Math.cos(norm * Math.PI) * (stage.width * 0.025);

  const targetX =
    sideMult *
    (stage.width * (stage.isMobile ? 0.32 : 0.34) + archCurve);

  const targetY = norm * (stage.height * 0.57);
  const targetRotate = sideMult * norm * 14;

  const initialX = sideMult * wingIndex * 3;
  const initialY = norm * 5;
  const initialRotate = sideMult * wingIndex * 1.5;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      const eased = 1 - Math.pow(1 - (p ?? 0), 3);

      const tx = initialX + (targetX - initialX) * eased;
      const ty = initialY + (targetY - initialY) * eased;

      const maxX = stage.isMobile ? 5 : 12;
      const maxY = stage.isMobile ? 4 : 10;

      const dx =
        tx +
        (px ?? 0) *
          (isLeft ? -maxX : maxX) *
          eased;

      const dy = ty + (py ?? 0) * maxY * eased;

      return `calc(-50% + ${dx}px) calc(-50% + ${dy}px)`;
    }
  );

  const rotate = useTransform(
    progress,
    [0, 0.45, 1],
    [initialRotate, isLeft ? -10 : 10, targetRotate]
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [1, 0.97, 0.94]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer select-none will-change-transform"
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex: isLeft ? index + 1 : total - index,
        translate,
        rotate,
        scale,
      }}
      whileHover={
        isSpreadActive
          ? {
              scale: 1.08,
              zIndex: 50,
              rotate: 0,
              transition: SPRING_CONFIG,
            }
          : { scale: 0.98 }
      }
      whileTap={{ scale: 1.03 }}
    >
      <div className="group relative h-full w-full overflow-hidden rounded-lg border border-black/10 bg-white shadow-xl shadow-black/15 transition-all duration-300 hover:border-[#F5C200]">
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-2 pb-2 pt-8">
          <span className="text-[8px] font-semibold tracking-[0.12em] text-[#F5C200] sm:text-[9px]">
            {item.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CurtainSplitHero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [stage, setStage] = useState({
    width: 1200,
    height: 800,
    isMobile: false,
  });

  // Progress is tied to the section's scroll position,
  // not to wheel events.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, SPRING_CONFIG);

  const [isSpreadActive, setIsSpreadActive] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setIsSpreadActive(value > 0.65);
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const pointerX = useSpring(rawX, SPRING_CONFIG);
  const pointerY = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const updateDimensions = () => {
      const rect = element.getBoundingClientRect();

      setStage({
        width: rect.width,
        height: rect.height,
        isMobile: rect.width < 768,
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const textY = useTransform(progress, [0.2, 0.65], [24, 0]);
  const textOpacity = useTransform(progress, [0.18, 0.55], [0, 1]);
  const lineScale = useTransform(progress, [0.3, 0.75], [0, 1]);

  const progressWidth = useTransform(
    progress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Our creative work"
      className="relative w-full"
      style={{ height: "200svh" }}
    >
      {/* The stage becomes full-screen and sticky.
          Animation progresses only while this section scrolls through it. */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="sticky top-0 flex h-[100svh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-[#FAFAF7] text-black"
      >
        {/* Brand pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse at center, black 15%, transparent 78%)",
          }}
        />

        {/* Yellow editorial accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-[#F5C200]/20 blur-3xl sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-[#F5C200]/15 blur-3xl sm:h-96 sm:w-96"
        />

        {/* Small brand header */}
        <div className="absolute left-5 right-5 top-5 z-30 flex items-center justify-between sm:left-10 sm:right-10 sm:top-8">
          <span className="text-sm font-black tracking-tight sm:text-base">
            BRAND<span className="text-[#C5A000]">//</span>
          </span>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50 sm:block">
            Independent Creative Agency
          </span>

          <span className="rounded-full border border-black/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] sm:text-[10px]">
            Selected Work
          </span>
        </div>

        {/* Center headline */}
        <motion.div
          className="pointer-events-none z-[5] flex max-w-[340px] flex-col items-center px-5 text-center sm:max-w-xl"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C200]" />
            Ideas that move people
          </span>

          <h2 className="text-[clamp(2.5rem,7vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            We make
            <br />
            brands
            <br />
            <span className="relative inline-block">
              impossible
              <span className="absolute bottom-[2px] left-0 -z-10 h-[25%] w-full bg-[#F5C200] sm:bottom-1" />
            </span>
            <br />
            to ignore<span className="text-[#C5A000]">.</span>
          </h2>

          <motion.div
            style={{ scaleX: lineScale }}
            className="my-4 h-[3px] w-14 origin-center bg-[#F5C200] sm:my-5 sm:w-20"
          />

          <p className="max-w-[34ch] text-xs leading-relaxed text-black/60 sm:text-sm">
            Strategy, content, and creative built to make your brand
            stand out in a crowded world.
          </p>
        </motion.div>

        {/* Split image curtain */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {IMAGES.map((item, index) => (
            <div key={item.src} className="pointer-events-auto">
              <CurtainCard
                item={item}
                index={index}
                total={IMAGES.length}
                progress={progress}
                pointer={{ x: pointerX, y: pointerY }}
                isSpreadActive={isSpreadActive}
                stage={stage}
              />
            </div>
          ))}
        </div>

        {/* Bottom instruction */}
        <div className="pointer-events-none absolute bottom-8 z-30 flex flex-col items-center gap-3 sm:bottom-9">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                isSpreadActive ? "bg-[#C5A000]" : "animate-pulse bg-black"
              }`}
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.13em] sm:text-[10px]">
              {isSpreadActive
                ? "Lets Know What BrandBros Can Do For You"
                : "Wanna Know About Us? Keep Scrolling"}
            </span>
          </div>

          <div className="h-[2px] w-24 overflow-hidden bg-black/10 sm:w-32">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#F5C200]"
            />
          </div>
        </div>

        {/* Side labels */}
        <div className="pointer-events-none absolute left-5 top-1/2 z-[4] hidden -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 sm:block">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/35">
            Think bold · Make impact
          </span>
        </div>

        <div className="pointer-events-none absolute right-5 top-1/2 z-[4] hidden -translate-y-1/2 [writing-mode:vertical-rl] sm:block">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/35">
            Strategy / Design / Content
          </span>
        </div>
      </div>
    </section>
  );
}
