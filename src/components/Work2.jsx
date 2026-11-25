import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { Play } from "lucide-react";

/* ------------------ DATA ------------------ */

const categories = ["All", "Event", "Promotion", "Invite", "Wishing"];

const works = [
  {
    id: 1,
    title: "Event Invitation Design",
    category: "Event",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292167/Copy_of_Invite_1_def2fe.png",
    desc: "Elegant and religious invitation design for a Pooja.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 2,
    title: "Event Poster Design",
    category: "Event",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292166/Copy_of_inder_sahani_final_1_xtfkk7.png",
    desc: "Bold typography and composition focused on capturing attention instantly.",
    tools: ["Canva", "InDesign"],
    year: "2023",
  },
  {
    id: 3,
    title: "Hiring Poster Design",
    category: "Invite",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292164/Copy_of_Pratibha_hiring_44.png_1_hpjd97.png",
    desc: "Minimal and user-focused interface designed for seamless interaction.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 4,
    title: "Organization Promotion Design",
    category: "Promotion",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292164/Copy_of_Kanha_International_Academy.png_1_a6gztr.png",
    desc: "Clean and modern design to promote an educational institution.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 5,
    title: "Invitation Design",
    category: "Invite",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292164/Copy_of_IMG_5757_1_u3ri1m.png",
    desc: "Promoting and inviting an Event with a focus on elegance and simplicity.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 6,
    title: "Promotional Poster Design",
    category: "Promotion",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292164/Copy_of_IMG_5758_1_uoxdsu.png",
    desc: "Clean and modern design to promote an educational institution.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 7,
    title: "Congratulatory Poster Design",
    category: "Wishing",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292162/Copy_of_IMG_5467_1_ytfckc.png",
    desc: "Creative and vibrant design to celebrate and congratulate an achievement.",
    tools: ["Canva"],
    year: "2024",
  },
  {
    id: 8,
    title: "Congratulatory Poster Design",
    category: "Wishing",
    img: "https://res.cloudinary.com/ds0y1ut9q/image/upload/v1774292161/Copy_of_IMG_1420_1_fwygul.png",
    desc: "Creative and vibrant design to celebrate and congratulate an achievement.",
    tools: ["Canva"],
    year: "2023",
  },
  {
    id: 9,
    title: "Dandia Night",
    category: "Event",
    video: "https://res.cloudinary.com/wqhpwm9y/video/upload/v1795425801/JD-612_Dandia_Night_Video_Admin.mp4",
    desc: "A lively event film capturing the color and energy of Dandia Night.",
    tools: ["Event Film"],
    year: "",
  },
  {
    id: 10,
    title: "Spandan 2024",
    category: "Event",
    video: "https://res.cloudinary.com/wqhpwm9y/video/upload/v1795425804/JD-549_Spandan_2024_Admin.mp4",
    desc: "Event highlights from Spandan 2024.",
    tools: ["Event Film"],
    year: "2024",
  },
];

/* ------------------ COMPONENTS ------------------ */

// ✅ Memoized Filter Button
const FilterButton = memo(({ cat, selected, onClick }) => {
  const handleClick = useCallback(() => onClick(cat), [cat, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
      ${
selected === cat
  ? "bg-[#C9A14A] text-black shadow-[0_0_25px_rgba(201,161,74,0.4)] scale-105"
  : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10"
      }`}
    >
      {cat}
    </button>
  );
});

// ✅ Memoized Work Card
const WorkCard = memo(
  ({ item, isActive, isDimmed, onHover, onLeave, onSelect }) => {
    return (
      <motion.div
        onHoverStart={() => onHover(item.id)}
        onHoverEnd={onLeave}
        onClick={() => onSelect(item)}
className={`relative rounded-3xl overflow-hidden
bg-white/5
backdrop-blur-xl
border border-white/10
cursor-pointer
transition-all duration-500
${isDimmed ? "opacity-40 scale-95" : ""}`}
        whileHover={{
  scale: 1.05,
  y: -10,
}}
      >
        {item.video ? (
          <>
            <motion.video
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${item.title} video preview`}
              className="w-full h-56 sm:h-64 object-cover"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/50 p-4 text-white">
              <Play size={18} fill="currentColor" />
            </span>
          </>
        ) : (
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-56 sm:h-64 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {/* Overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-end"
        >
          <h2 className="text-xl font-bold text-[#C9A14A]">{item.title}</h2>
          <p className="text-sm text-neutral-300 mt-2">{item.desc}</p>

          <div className="flex gap-2 mt-3 flex-wrap">
            {item.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs px-3 py-1 rounded-full bg-[#C9A14A]/15 text-[#C9A14A] border border-[#C9A14A]/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

/* ------------------ MODAL ------------------ */

const WorkModal = memo(({ work, onClose }) => {
  const handleKey = useCallback(
    (e) => e.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-bold"
      >
        ✕
      </button>

      {/* Image */}
      <motion.div
        className="w-full h-full flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        {work.video ? (
          <video
            src={work.video}
            controls
            playsInline
            preload="metadata"
            aria-label={work.title}
            className="max-w-full max-h-full rounded-2xl border border-[#C9A14A]/20 shadow-[0_0_60px_rgba(201,161,74,0.15)]"
          />
        ) : (
          <img
            src={work.img}
            alt={work.title}
            className="max-w-full max-h-full object-contain rounded-2xl border border-[#C9A14A]/20 shadow-[0_0_60px_rgba(201,161,74,0.15)]"
          />
        )}
      </motion.div>

      {/* Info */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
       <h2 className="text-3xl font-bold text-[#C9A14A]">
  {work.title}
</h2>

{work.year && (
  <p className="text-neutral-400 mt-2">
    {work.year}
  </p>
)}
      </div>
    </motion.div>
  );
});

/* ------------------ MAIN ------------------ */

export default function DesignerShowcase() {
  const [active, setActive] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState(null);

  // ✅ Stable handlers
  const handleHover = useCallback((id) => setActive(id), []);
  const handleLeave = useCallback(() => setActive(null), []);
  const handleSelect = useCallback((item) => setSelectedWork(item), []);
  const handleClose = useCallback(() => setSelectedWork(null), []);

  // ✅ Memoized filtering
  const filteredWorks = useMemo(() => {
    if (selectedCategory === "All") return works;
    return works.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  return (
<div className="relative bg-[#0A0A0A] text-white px-4 sm:px-6 py-20 overflow-hidden">

  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#C9A14A]/10 blur-[180px] rounded-full" />

      {/* HERO */}
  <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">

  <p className="text-[#C9A14A] uppercase tracking-[0.35em] text-xs mb-6">
    Brand Monk Portfolio
  </p>

  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
    Graphic Design
    <br />
    <span className="italic bg-gradient-to-r from-[#C9A14A] via-[#F4D06F] to-[#C9A14A] bg-clip-text text-transparent">
      That Builds Brands
    </span>
  </h1>

  <p className="max-w-3xl mx-auto mt-8 text-neutral-400 text-lg">
    Strategic visuals, creative storytelling, and impactful design
    crafted to elevate brands and create lasting impressions.
  </p>

</div>

      {/* FILTERS */}
      <div className="flex gap-4 flex-wrap justify-center mb-12">
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            cat={cat}
            selected={selectedCategory}
            onClick={setSelectedCategory}
          />
        ))}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {filteredWorks.map((item) => {
          const isActive = active === item.id;
          const isDimmed = active && active !== item.id;

          return (
            <WorkCard
              key={item.id}
              item={item}
              isActive={isActive}
              isDimmed={isDimmed}
              onHover={handleHover}
              onLeave={handleLeave}
              onSelect={handleSelect}
            />
          );
        })}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedWork && (
          <WorkModal work={selectedWork} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}