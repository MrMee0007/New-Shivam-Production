import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const IMAGES = [
  "https://cdn.21st.dev/assets/mirror/4d/4d1bff4ea8b9f400dff7ae405f92e15bd39ec76e9285c7d96017e64ba1de3ae1.jpg",
  "https://cdn.21st.dev/assets/mirror/ee/ee36e332fe99d7611c43b90511db08a4f84e4545caa78e7b52e9ccffe273864b.jpg",
  "https://cdn.21st.dev/assets/mirror/dd/dddeaa4e6132c65bf7ff99d197f792a30937b5cbfe97a2b1ee54a793684df52e.jpg",
  "https://cdn.21st.dev/assets/mirror/48/487977107b5011b5e1c25289f6e4393ef555e1a92daee554788e9363b233ca14.jpg",
  "https://cdn.21st.dev/assets/mirror/a1/a12509688be8c9d3b2cb26d2ea1cfce48b8a8dbf2653e17be8a3fc31bd69f162.jpg",
  "https://cdn.21st.dev/assets/mirror/05/051f9e565b5b0b221384d9c27a0760febc3fb48d190c046adfda579f3614c958.jpg",
  "https://cdn.21st.dev/assets/mirror/87/87d4f60a4465d19d14b8acefa46275df4ccd767ccea6d7f234ea5bad99cfec56.jpg",
  "https://cdn.21st.dev/assets/mirror/06/0610989e0675a12c02d35aa5464e2644bf77913214b748b73a894808d2d79877.jpg",
  "https://cdn.21st.dev/assets/mirror/fe/fe90b90751e671a9526134c4743e2fcbf6c1a24991aba273ad7418c88fc9c701.jpg",
  "https://cdn.21st.dev/assets/mirror/2e/2e0452c1994fcc2130a1b8ef68e34b5ea52d1b35b80dde09b99349ad1de54598.jpg",
  "https://cdn.21st.dev/assets/mirror/84/847dc523558808119dc4bbb5218ff862ae5f5b455f33e9a0304f2f5a4b2f0f2c.jpg",
  "https://cdn.21st.dev/assets/mirror/2f/2f128763d177d6bdda3de9f0a766693406034977082bdb542138b7b74af9697b.jpg",
  "https://cdn.21st.dev/assets/mirror/30/30f8223f1d1ecc24fc8b7a9995b8ee98449b1e9fc300c14fbccec01b6a83a0ae.jpg",
  "https://cdn.21st.dev/assets/mirror/b4/b4df0e3e425ffce3b4f62fd7bc717e4dc90b94455f4d65d64fc07fe9721b0519.jpg",
  "https://cdn.21st.dev/assets/mirror/90/90c625659f072e4a701c2e37fa4ca46f25c7ca8689d723e7802fe84cf17874e9.jpg",
  "https://cdn.21st.dev/assets/mirror/6a/6aa0befc69cc3db8f3f3558d4b5e1216a5b64ceae1b86f51acf1c3f1432a8cf7.jpg",
  "https://cdn.21st.dev/assets/mirror/dc/dc126cfd753dc217945d0ea2f915e539dfe4ffb5fdea02245d0f576b25a9c4dd.jpg",
  "https://cdn.21st.dev/assets/mirror/ab/ab5f167fcb763aee7c3247fb8af97875998a7f519a6119da7dadd9cf73ae1a2c.jpg",
  "https://cdn.21st.dev/assets/mirror/57/57d6e450f7068e5f3be04907dcc0815343e67df1dc82f2da0ff1c859afc1f700.jpg",
  "https://cdn.21st.dev/assets/mirror/e4/e491359016d1494074e287dfbb55be068cffc0110017ae2257a5d4cdec193a47.jpg",
];

const GOLD = "#D7B56D";
const FONT = "font-['Space_Grotesk']";

const clamp = (v, min = 0, max = 1) =>
  Math.min(Math.max(v, min), max);

const lerp = (a, b, t) => a + (b - a) * t;

const smooth = (v) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

function useViewport() {
  const [viewport, setViewport] = useState({
    width: 1280,
    height: 800,
  });

  useEffect(() => {
    const update = () =>
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();

    window.addEventListener("resize", update, {
      passive: true,
    });

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  return viewport;
}

function getCardSize(width) {
  if (width < 640) return { width: 64, height: 92 };
  if (width < 1024) return { width: 90, height: 126 };
  return { width: 112, height: 156 };
}

function getSemicirclePosition(
  index,
  count,
  width,
  height,
  cardWidth,
  cardHeight
) {
  const angle =
    Math.PI + (Math.PI * index) / (count - 1);

  const radiusX = Math.max(
    0,
    Math.min(
      width / 2 - cardWidth / 2 - 12,
      width * 0.46
    )
  );

  const radiusY = Math.min(height * 0.43, 300);

  const centerY = Math.min(
    height * 0.88,
    height - cardHeight * 0.52 - 8 + radiusY * 0.05
  );

  return {
    x: Math.cos(angle) * radiusX,
    y: centerY + Math.sin(angle) * radiusY - height / 2,
    rotation: 0,
  };
}

const FilmCard = memo(function FilmCard({
  src,
  index,
  position,
  reduceMotion,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: position.x,
        y: position.y,
        rotate: position.rotation,
        scale: position.scale,
        opacity: position.opacity,
        zIndex: position.zIndex,
        width: position.cardWidth,
        height: position.cardHeight,
        marginLeft: -position.cardWidth / 2,
        marginTop: -position.cardHeight / 2,
        willChange: "transform, opacity",
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { scale: 1.06, zIndex: 100 }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
      }}
      aria-label={`Production portfolio image ${index + 1}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/20 bg-[#171511] shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#30291e] via-[#171511] to-black" />
        )}

        <img
          src={src}
          alt={`Cinematic production still ${index + 1}`}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/[0.05]" />

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[7px] uppercase tracking-[0.14em] text-white/85 sm:text-[8px]">
            BB / FILM
          </span>

          <span className="text-[8px] tabular-nums text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

function ScrollCard({
  src,
  index,
  count,
  progress,
  viewport,
  reduceMotion,
}) {
  const { width, height } = viewport;
  const card = getCardSize(width);

  const gap =
    width < 640 ? 8 : width < 1024 ? 12 : 16;

  const finalPosition = useMemo(
    () =>
      getSemicirclePosition(
        index,
        count,
        width,
        height,
        card.width,
        card.height
      ),
    [index, count, width, height, card.width, card.height]
  );

  const initial = useMemo(() => {
    const angle = index * 2.399;

    return {
      x:
        Math.cos(angle) *
        width *
        (0.28 + ((index * 17) % 30) / 100),
      y:
        Math.sin(angle) *
        height *
        (0.28 + ((index * 13) % 28) / 100),
      rotation: ((index * 47) % 80) - 40,
    };
  }, [index, width, height]);

  const circle = useMemo(() => {
    const angle =
      (index / count) * Math.PI * 2 - Math.PI / 2;

    const radius = Math.min(
      width * 0.25,
      height * 0.23,
      230
    );

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotation: (index / count) * 360,
    };
  }, [index, count, width, height]);

  const line = useMemo(
    () => ({
      x: (index - (count - 1) / 2) * (card.width + gap),
      y: 0,
      rotation: 0,
    }),
    [index, count, card.width, gap]
  );

  const positionAt = (rawProgress) => {
    const p = clamp(rawProgress);

    let from;
    let to;
    let t;

    if (p < 0.16) {
      from = initial;
      to = circle;
      t = smooth(p / 0.16);
    } else if (p < 0.38) {
      from = circle;
      to = line;
      t = smooth((p - 0.16) / 0.22);
    } else if (p < 0.76) {
      from = line;
      to = finalPosition;
      t = smooth((p - 0.38) / 0.38);
    } else {
      return {
        ...finalPosition,
        scale: 1,
        opacity: 1,
        zIndex:
          20 +
          Math.round(
            10 *
              Math.sin(
                (index / (count - 1)) * Math.PI
              )
          ),
      };
    }

    return {
      x: lerp(from.x, to.x, t),
      y: lerp(from.y, to.y, t),
      rotation: lerp(from.rotation, to.rotation, t),
      scale: lerp(0.72, 1, smooth(p / 0.4)),
      opacity: clamp(p / 0.08),
      zIndex: 10 + index,
    };
  };

  const x = useTransform(
    progress,
    (p) => positionAt(p).x
  );

  const y = useTransform(
    progress,
    (p) => positionAt(p).y
  );

  const rotation = useTransform(
    progress,
    (p) => positionAt(p).rotation
  );

  const scale = useTransform(
    progress,
    (p) => positionAt(p).scale
  );

  const opacity = useTransform(
    progress,
    (p) => positionAt(p).opacity
  );

  const zIndex = useTransform(
    progress,
    (p) => positionAt(p).zIndex
  );

  const cardPosition = useMemo(
    () => ({
      x,
      y,
      rotation,
      scale,
      opacity,
      zIndex,
      cardWidth: card.width,
      cardHeight: card.height,
    }),
    [
      x,
      y,
      rotation,
      scale,
      opacity,
      zIndex,
      card.width,
      card.height,
    ]
  );

  return (
    <FilmCard
      src={src}
      index={index}
      position={cardPosition}
      reduceMotion={reduceMotion}
    />
  );
}

export default function IntroAnimation() {
  const sectionRef = useRef(null);
  const viewport = useViewport();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const rawProgress = reduceMotion
    ? scrollYProgress
    : springProgress;

  // Delay all scroll-driven effects slightly.
  const progress = useTransform(rawProgress, (value) =>
    clamp((value - 0.06) / 0.94)
  );

  const titleOpacity = useTransform(
    progress,
    [0, 0.08, 0.18, 0.28],
    [1, 1, 0.45, 0]
  );

  const titleY = useTransform(
    progress,
    [0, 0.25],
    [0, -25]
  );

  const closingOpacity = useTransform(
    progress,
    [0.57, 0.72, 0.84],
    [0, 0.85, 1]
  );

  const closingY = useTransform(
    progress,
    [0.58, 0.76],
    [18, 0]
  );

  const progressWidth = useTransform(
    progress,
    [0, 1],
    ["0%", "100%"]
  );

  const cards = useMemo(() => IMAGES, []);

  return (
    <section
      id="intro-film"
      ref={sectionRef}
      aria-label="Brand Bros cinematic introduction"
      className={`relative h-[320vh] w-full bg-[#080807] text-white ${FONT}`}
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0 bg-[#090908]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(103,83,49,0.27)_0%,rgba(30,26,19,0.22)_36%,transparent_72%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        {/* Film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-soft-light"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.45%27/%3E%3C/svg%3E")',
          }}
        />

        {/* Brand signature */}
        <div className="absolute left-5 top-7 z-30 sm:left-10 sm:top-9 lg:left-14">
          <div className="flex items-center gap-3">
            <span className="h-8 w-px bg-[#D7B56D]" />

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#E1C586] sm:text-xs">
                Brand Bros
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40 sm:text-[9px]">
                Film · Content · Production
              </p>
            </div>
          </div>
        </div>

        {/* Opening typography */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute left-0 top-[23%] z-10 w-full px-5 text-center sm:top-[24%] sm:px-8"
        >
          <p className="mb-5 text-[8px] font-medium uppercase tracking-[0.3em] text-[#D7B56D] sm:text-[9px] sm:tracking-[0.38em]">
            A vision beyond the frame
          </p>

          <h2 className="mx-auto max-w-[900px] font-['Space_Grotesk'] text-[clamp(1.8rem,4.5vw,4.2rem)] font-bold uppercase leading-[1.05] tracking-[-0.04em] text-white">
            Stories worth feeling.
            <br />
            <span style={{ color: GOLD }}>
              Frames worth remembering.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[440px] text-[10px] font-normal leading-5 text-white/60 sm:mt-6 sm:text-xs sm:leading-6">
            Thoughtful filmmaking. Distinctive visuals.
            <br className="hidden sm:block" />
            Stories that stay with you.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7">
            <span className="h-px w-6 bg-[#D7B56D]/60" />

            <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-[8px] sm:tracking-[0.24em]">
              Film · Direction · Post-production
            </p>

            <span className="h-px w-6 bg-[#D7B56D]/60" />
          </div>
        </motion.div>

        {/* Scroll-driven image arrangement */}
        <div className="absolute inset-0 z-10">
          {cards.map((src, index) => (
            <ScrollCard
              key={src}
              src={src}
              index={index}
              count={cards.length}
              progress={progress}
              viewport={viewport}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          style={{ opacity: closingOpacity, y: closingY }}
          className="pointer-events-none absolute bottom-[10%] left-0 z-30 w-full px-5 text-center sm:bottom-[9%]"
        >
          <p className="text-[8px] uppercase tracking-[0.32em] text-[#D7B56D] sm:text-[9px]">
            The Brand Bros perspective
          </p>

          <h3 className="mt-2 text-2xl font-light tracking-[-0.035em] sm:mt-3 sm:text-4xl">
            Made to be{" "}
            <span className="font-sans italic">
              remembered.
            </span>
          </h3>

          <p className="mx-auto mt-2 max-w-md text-[9px] leading-5 text-white/55 sm:mt-3 sm:text-xs sm:leading-6">
            From the first idea to the final cut, every frame has a purpose.
          </p>
        </motion.div>

        {/* Scroll progress */}
        <div className="absolute bottom-5 left-5 right-5 z-40 flex items-center justify-between sm:bottom-8 sm:left-10 sm:right-10 lg:left-14 lg:right-14">
          <span className="text-[8px] uppercase tracking-[0.22em] text-white/35 sm:text-[9px]">
            Gurgaon · India
          </span>

          <div className="flex items-center gap-3">
            <span className="hidden text-[9px] uppercase tracking-[0.18em] text-white/45 sm:block">
              Scroll to explore
            </span>

            <div className="h-px w-16 overflow-hidden bg-white/20 sm:w-28">
              <motion.div
                className="h-full origin-left bg-[#D7B56D]"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-3 z-30 rounded-sm border border-white/[0.06] sm:inset-5" />
      </div>
    </section>
  );
}