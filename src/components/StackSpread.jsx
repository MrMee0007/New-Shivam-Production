
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

const IMG = {
  plane:
    "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=900&q=85",
  painting:
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
  breaker:
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=85",
  dog:
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=85",
  footballer:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85",
  jacket:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  meadow:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
  stripes:
    "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=900&q=85",
};

const SCALE = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};

const s = (i) => SCALE[i] ?? 1;

const CARDS = [
  {
    item: { src: IMG.stripes, alt: "Colour stripes" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: IMG.meadow, alt: "Wildflower meadow" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: IMG.jacket, alt: "Figure in a leather jacket" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: IMG.footballer, alt: "Footballer mid-kick" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: IMG.dog, alt: "Terrier in profile" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: IMG.breaker, alt: "Breakdancer holding a pose" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: IMG.painting, alt: "Renaissance fresco detail" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: IMG.plane, alt: "Vintage fighter plane" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

const SCATTER_START = 0.12;
const SCATTER_END = 0.7;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;

const PARALLAX_SPRING = {
  stiffness: 90,
  damping: 22,
  mass: 0.6,
};

const parallaxDepth = (i, total) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB =
  "Cinematic films. Distinctive visuals. Stories made to move people.";

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
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [responsive, setResponsive] = useState(
    RESPONSIVE.desktop
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const updateResponsive = () => {
      setResponsive(
        mediaQuery.matches
          ? RESPONSIVE.small
          : RESPONSIVE.desktop
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
      rawX.set(
        (event.clientX / window.innerWidth) * 2 - 1
      );

      rawY.set(
        (event.clientY / window.innerHeight) * 2 - 1
      );
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, {
      passive: true,
    });

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

  const stackOffset = card.stackOffset ?? {
    x: 0,
    y: 0,
  };

  const restScale = scaleMul ?? target.scale ?? 1;

  const smallTarget =
    isSmall && card.targetSm ? card.targetSm : null;

  const endX = smallTarget
    ? colX != null
      ? Math.sign(smallTarget.x) * colX
      : smallTarget.x
    : target.x;

  const endY = smallTarget ? smallTarget.y : target.y;

  const endRotate =
    flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      const progressValue = p ?? 0;
      const pointerX = px ?? 0;
      const pointerY = py ?? 0;

      const tx =
        stackOffset.x +
        (endX - stackOffset.x) * progressValue;

      const ty =
        stackOffset.y +
        (endY - stackOffset.y) * progressValue;

      const drift = depth * progressValue;

      const dx =
        tx - pointerX * PARALLAX_X * drift;

      const dy =
        ty - pointerY * PARALLAX_Y * drift;

      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    }
  );

  const rotate = useTransform(
    progress,
    [0, 1],
    [stackRotate, endRotate]
  );

  const scale = useTransform(
    progress,
    [0, 1],
    [stackScale, restScale]
  );

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
      className="relative h-full w-full overflow-hidden border border-white/10 bg-[#080808] shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function StackSpreadStage({
  cards,
  scrollLength = 350,
  bgColor = "#080808",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#FFFFFF",
  textFadeStart = 0.3,
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
    setSpread((was) =>
      was ? value > 0.985 : value >= 0.999
    );
  });

  const parallaxEnabled =
    reduce !== true && !isSmall;

  const pointer = usePointerParallax(
    spread,
    parallaxEnabled
  );

  const noScale = reduce === true;

  const copyOpacity = useTransform(
    progress,
    [textFadeStart, textFadeStart + 0.35],
    [0, 1]
  );

  const copyScale = useTransform(
    progress,
    [textFadeStart, 0.9],
    [0.85, 1]
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
        {/* Brand Bros headline */}

{/* Services-page typography */}
<motion.div
  className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
  style={{
    opacity: copyOpacity,
    scale: noScale ? 1 : copyScale,
  }}
>
  <p className="mb-5 font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[#F5C200] sm:text-[10px]">
    BRAND BROS / CREATIVE STUDIO
  </p>

  <h2
    className="w-full font-heading text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.87] tracking-[-0.04em]"
    style={{ color: textColor }}
  >
    Stories
    <br />
    <span className="text-[#F5C200]">That Stay.</span>
  </h2>

  <p className="mt-6 max-w-[36ch] font-sans text-xs leading-relaxed text-white/55 sm:text-sm md:text-base">
    Cinematic films. Distinctive visuals. Stories made to move people.
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
                parallaxEnabled
                  ? parallaxDepth(index, cards.length)
                  : 0
              }
            />
          ))}
        </div>

        {/* Scroll indicator */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-2 font-sans text-[9px] font-medium uppercase tracking-[0.28em] sm:text-[10px]"
            style={{
              color: "#F5C200",
              opacity: hintOpacity,
            }}
          >
            <span>Scroll to explore</span>

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
  scrollLength = 350,
  bgColor = "#080808",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "#FFFFFF",
  textFadeStart = 0.3,
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
