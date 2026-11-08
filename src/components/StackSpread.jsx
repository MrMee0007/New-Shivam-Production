import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CLD = (file, w = 900) =>
  `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;

const SCALE = {
  1: 0.9,
  2: 0.82,
  3: 0.9,
  4: 0.82,
  5: 0.82,
  6: 0.9,
  7: 0.9,
  8: 0.75,
};

const s = (i) => SCALE[i] ?? 1;

const CARDS = [
  {
    item: { src: CLD("v1794158518/2B4A4671.jpg"), alt: "Royal Wedding Ceremony" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -22, y: -34, rotate: -2, scale: s(8), w: 18, h: 24 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: CLD("v1794174541/6M4A7644.jpg"), alt: "Candid Bridal Smile" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 3, scale: s(7), w: 19, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: CLD("v1794158516/2B4A4663.jpg"), alt: "Destination Udaipur Grandeur" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: -3, scale: s(6), w: 16, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: CLD("v1794174546/6M4A7702.jpg"), alt: "Baraat Celebration & Energy" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 1, scale: s(5), w: 25, h: 28 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: CLD("v1794158515/2B4A4657.jpg"), alt: "Heritage Palace Moments" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 2, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: CLD("v1794174545/6M4A7758.jpg"), alt: "Sacred Pheras & Rituals" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: -2, scale: s(3), w: 22, h: 26 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: CLD("v1794174533/6M4A7884.jpg"), alt: "Golden Hour Glow" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 1, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: CLD("v1794174534/6M4A7615.jpg"), alt: "Unscripted Joy & Festivity" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 3, scale: s(1), w: 17, h: 22 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

const SCATTER_START = 0.08;
const SCATTER_END = 0.64;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;

const PARALLAX_SPRING = {
  stiffness: 90,
  damping: 22,
  mass: 0.6,
};

const parallaxDepth = (i, total) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null,
    small: false,
    colX: null,
    card: null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 42, h: 22 },
  },
};

function useResponsive() {
  const [responsive, setResponsive] = useState(RESPONSIVE.desktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const updateResponsive = () => {
      setResponsive(
        mediaQuery.matches ? RESPONSIVE.small : RESPONSIVE.desktop
      );
    };

    updateResponsive();
    mediaQuery.addEventListener("change", updateResponsive);

    return () => {
      mediaQuery.removeEventListener("change", updateResponsive);
    };
  }, []);

  return responsive;
}

function usePointerParallax(active, enabled) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}) {
  const { item, target } = card;

  const flat = reduce === true;

  const stackRotate = flat
    ? 0
    : clusterRotation
    ? card.stackRotate ?? 0
    : 0;

  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const smallTarget = isSmall && card.targetSm ? card.targetSm : null;

  const endX = smallTarget
    ? colX != null
      ? Math.sign(smallTarget.x) * colX
      : smallTarget.x
    : target.x;

  const endY = smallTarget ? smallTarget.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      const progressValue = p ?? 0;
      const pointerX = px ?? 0;
      const pointerY = py ?? 0;

      const tx = stackOffset.x + (endX - stackOffset.x) * progressValue;
      const ty = stackOffset.y + (endY - stackOffset.y) * progressValue;
      const drift = depth * progressValue;

      const dx = tx - pointerX * PARALLAX_X * drift;
      const dy = ty - pointerY * PARALLAX_Y * drift;

      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    }
  );

  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({ item, cardRadius }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden border border-[#F5F0E8]/15 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? "New Shivam Production"}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </div>
  );
}

function StackSpreadStage({
  cards,
  scrollLength = 300,
  bgColor = "#0a0a0a",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#F5F0E8",
  textFadeStart = 0.22,
  showScrollHint = true,
}) {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();

  const {
    scale: scaleMul,
    small: isSmall,
    colX,
    card: fixedCard,
  } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1]
  );

  const [spread, setSpread] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setSpread((was) => (was ? value > 0.985 : value >= 0.999));
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);
  const noScale = reduce === true;

  const copyOpacity = useTransform(
    progress,
    [textFadeStart, textFadeStart + 0.3],
    [0, 1]
  );

  const copyScale = useTransform(
    progress,
    [textFadeStart, 0.82],
    [0.9, 1]
  );

  const hintOpacity = useTransform(
    progress,
    [0, SCATTER_START],
    [1, 0]
  );

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{
        height: `${scrollLength}vh`,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Core studio headline behind the cards */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <p
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            New Shivam Production House
          </p>

          <h2
            className="w-full text-[clamp(2.8rem,7vw,5.5rem)] font-bold tracking-tight leading-[0.92]"
            style={{ fontFamily: "Inter, sans-serif", color: textColor }}
          >
            Stories Made to
            <br />
            <span style={{ color: "#D4AF6A" }}>Stay.</span>
          </h2>

          <p
            className="mt-6 max-w-[42ch] text-xs leading-relaxed text-[#F5F0E8]/50 sm:text-sm md:text-base"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Every emotion, every glance, every celebration — immortalized into
            cinematic art.
          </p>
        </motion.div>

        {/* Scattering images */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={
                parallaxEnabled ? parallaxDepth(index, cards.length) : 0
              }
            />
          ))}
        </div>

        {/* Scroll indicator */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-20 flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{
              color: "#D4AF6A",
              fontFamily: "Inter, sans-serif",
              opacity: hintOpacity,
            }}
          >
            <span>Scroll to unfold</span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function StackSpread({
  scrollLength = 300,
  bgColor = "#0a0a0a",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#F5F0E8",
  textFadeStart = 0.22,
  showScrollHint = true,
}) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
    />
  );
}
