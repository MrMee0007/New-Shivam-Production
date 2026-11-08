/**
 * FilmStrip — Dual-row auto-scrolling image ticker (opposite directions)
 * Like a physical film reel running across the screen.
 */
import { motion } from "framer-motion";

const ROW_1 = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75",
  "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=600&q=75",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=75",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75",
];

const ROW_2 = [
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=75",
  "https://images.unsplash.com/photo-1559523161-0fc0d8b814de?w=600&q=75",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=75",
  "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=75",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=75",
  "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?w=600&q=75",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=75",
];

function Strip({ images, direction = -1, speed = 40 }) {
  const doubled = [...images, ...images];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3"
        style={{ width: "max-content" }}
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-52 w-80 shrink-0 overflow-hidden rounded-sm md:h-64 md:w-96"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function FilmStrip() {
  return (
    <section className="overflow-hidden py-4 space-y-3" style={{ background: "#111111" }}>
      <Strip images={ROW_1} direction={-1} speed={45} />
      <Strip images={ROW_2} direction={1}  speed={38} />
    </section>
  );
}
