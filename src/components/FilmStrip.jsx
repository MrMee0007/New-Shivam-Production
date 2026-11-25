/**
 * FilmStrip — Dual-row auto-scrolling image ticker (opposite directions)
 * Like a physical film reel running across the screen.
 */
import { motion } from "framer-motion";

const ROW_1 = [
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795497812/2B4A4767.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795497813/2B4A4783.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795497812/2B4A4693.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794770057/WhatsApp_Image_2026-11-15_at_11.25.49_PM_1.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794174544/6M4A7674.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795643194/WhatsApp_Image_2026-11-24_at_3.40.36_PM.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795505060/081A5308.jpg",
];

const ROW_2 = [
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795497811/2B4A4728.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795497810/6M4A8277.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794770056/WhatsApp_Image_2026-11-15_at_11.22.42_PM.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795643193/43.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794174544/6M4A7648.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794769882/WhatsApp_Image_2026-11-15_at_11.29.46_PM.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795506003/IMG_1240.jpg",
  "https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1795505064/081A9969.jpg",
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
