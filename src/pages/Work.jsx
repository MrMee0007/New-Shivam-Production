import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import FilmStrip       from "../components/FilmStrip";
import CameraFilmStrip from "../components/CameraFilmStrip";
import MasonryGallery  from "../components/MasonryGallery";
import ParallaxBanner  from "../components/ParallaxBanner";
import VenueGallery    from "../components/VenueGallery";

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const CATEGORIES = [
  "All",
  "Wedding",
  "Bride Portrait",
  "Maternity",
  "Candid",
  "Broadcast",
  "Podcast",
  "Commercial",
];

const CLD = (file, w = 900) => {
  if (!file) return "";
  if (file.startsWith("http")) {
    if (file.includes("/image/upload/w_")) return file;
    return file.replace("/image/upload/", `/image/upload/w_${w},q_auto,f_auto/`);
  }
  return `https://res.cloudinary.com/wqhpwm9y/image/upload/w_${w},q_auto,f_auto/${file}`;
};

const WORKS = [
  /* ── Existing Works ── */
  {
    id: 1,
    category: "Wedding",
    title: "Priya & Rohan",
    subtitle: "Leela Palace, Mathura · 3-Day Celebration",
    desc: "A three-day royal wedding captured in one breathtaking cinematic film — full ceremony, reception, and candid moments woven into a timeless story.",
    img: CLD("v1794158518/2B4A4671.jpg"),
    tag: "7 min Film",
    featured: true,
  },
  {
    id: 2,
    category: "Candid",
    title: "Smiles & Whispers",
    subtitle: "The Oberoi, New Delhi",
    desc: "Unscripted, tender moments between rituals — tears of joy, stolen smiles, and raw heartfelt emotions captured without posing.",
    img: CLD("v1794174541/6M4A7644.jpg"),
    tag: "Candid Series",
  },
  {
    id: 3,
    category: "Wedding",
    title: "Meera & Arjun",
    subtitle: "City Palace, Udaipur · Destination Wedding",
    desc: "Three days of Rajputana grandeur — temples, ghats, and golden hour moments — all captured on film.",
    img: CLD("v1794158516/2B4A4663.jpg"),
    tag: "Destination Film",
  },
  {
    id: 4,
    category: "Candid",
    title: "Baraat Beats & Euphoria",
    subtitle: "Noor Mahal, Karnal",
    desc: "High-octane energy, dancing under fireworks, and spontaneous laughs across the celebratory night.",
    img: CLD("v1794174546/6M4A7702.jpg"),
    tag: "Event Energy",
  },
  {
    id: 5,
    category: "Wedding",
    title: "Anjali & Vikram",
    subtitle: "Rambagh Palace, Jaipur",
    desc: "An intimate 2-day wedding at a heritage palace — intimate moments, grand architecture, and golden light throughout.",
    img: CLD("v1794158515/2B4A4657.jpg"),
    tag: "Heritage Wedding",
  },
  {
    id: 6,
    category: "Candid",
    title: "Sacred Rituals",
    subtitle: "ITC Grand Bharat, Mathura",
    desc: "Every subtle gesture of the pheras, the blessings of elders, and genuine human connection immortalized forever.",
    img: CLD("v1794174545/6M4A7758.jpg"),
    tag: "Ceremony Moments",
  },
  {
    id: 7,
    category: "Broadcast",
    title: "Maruti Suzuki Annual Summit",
    subtitle: "India Expo Centre, Greater Noida",
    desc: "15,000+ live viewers. 8-camera production. Zero downtime across a 6-hour flagship corporate event.",
    img: CLD("v1794158515/2B4A4650.jpg"),
    tag: "Live Broadcast · 6 hrs",
  },
  {
    id: 8,
    category: "Broadcast",
    title: "Royal Celebrations Awards Night",
    subtitle: "Hyatt Regency, Delhi",
    desc: "Full red-carpet coverage, live switching across 6 cameras, and a same-day highlight reel delivered by midnight.",
    img: CLD("v1794158515/2B4A4660.jpg"),
    tag: "Live Event",
  },
  {
    id: 9,
    category: "Podcast",
    title: "The Growth Podcast",
    subtitle: "New Shivam Studio, Mathura",
    desc: "A branded 4-camera video podcast studio built from scratch — acoustic treatment, lighting, and weekly production support.",
    img: CLD("v1794158513/2B4A4646.jpg"),
    tag: "Weekly Production",
  },
  {
    id: 10,
    category: "Commercial",
    title: "Himalaya Wellness",
    subtitle: "Mathura & Uttar Pradesh Locations",
    desc: "A 60-second ad film that generated 2M+ views and drove measurable product sales in the first week.",
    img: CLD("v1794158514/2B4A4641.jpg"),
    tag: "60s Ad Film",
  },
  {
    id: 11,
    category: "Commercial",
    title: "Samsung India — Launch",
    subtitle: "Corporate HQ, Mathura",
    desc: "A product launch film combining drone aerials, studio close-ups, and lifestyle footage into one seamless brand story.",
    img: CLD("v1794158513/2B4A4651.jpg"),
    tag: "Brand Film",
  },
  {
    id: 12,
    category: "Candid",
    title: "Stolen Glances",
    subtitle: "Taj Lake Palace, Udaipur",
    desc: "A collection of fleeting, genuine glances that tell the real story of two souls coming together.",
    img: CLD("v1794174544/6M4A7632.jpg"),
    tag: "Fine Art Candid",
  },

  /* ── Bride Portrait Images (Specific Category) ── */
  {
    id: 13,
    category: "Bride Portrait",
    title: "The Regal Solitude",
    subtitle: "Studio & Heritage Suite · Mathura",
    desc: "A majestic bridal portrait framed in timeless elegance, intricate veil detailing, and regal golden lighting.",
    img: CLD("v1794770058/WhatsApp_Image_2026-11-15_at_11.25.49_PM.jpg"),
    tag: "Bridal Portrait",
    featured: true,
  },
  {
    id: 14,
    category: "Bride Portrait",
    title: "Grace in Velvet",
    subtitle: "The Grand Ballroom Suite",
    desc: "Delicate jewellery details, traditional ornaments, and radiant poise immortalized in classical portraiture.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.49_PM_1.jpg"),
    tag: "Fine Art",
  },
  {
    id: 15,
    category: "Bride Portrait",
    title: "Veil of Dreams",
    subtitle: "ITC Grand Bharat, Mathura",
    desc: "Soft backlit glow emphasizing the delicate bridal dupatta embroidery and gentle contemplation.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.48_PM.jpg"),
    tag: "Bridal Series",
  },
  {
    id: 16,
    category: "Bride Portrait",
    title: "The Modern Royalty",
    subtitle: "The Leela Palace, New Delhi",
    desc: "A striking harmony of contemporary confidence and centuries-old bridal heritage and ornamentation.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.47_PM.jpg"),
    tag: "Royal Portrait",
  },
  {
    id: 17,
    category: "Bride Portrait",
    title: "Gaze of Eternity",
    subtitle: "Heritage Palace Studio",
    desc: "Intimate close-up portrait celebrating authentic traditional artistry, kajal accents, and bridal radiance.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.22.43_PM.jpg"),
    tag: "Portrait Study",
  },
  {
    id: 18,
    category: "Bride Portrait",
    title: "Whispers of Crimson",
    subtitle: "Roseate House, New Delhi",
    desc: "Vibrant crimson tones highlighting bridal lehenga craftsmanship and serene, timeless elegance.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.46_PM.jpg"),
    tag: "Bridal Glamour",
  },
  {
    id: 19,
    category: "Bride Portrait",
    title: "The Golden Twilight",
    subtitle: "Udaivilas Heritage Court",
    desc: "Natural warm ambient twilight kissing ornate heritage jewellery and exquisite bridal finesse.",
    img: CLD("v1794770057/WhatsApp_Image_2026-11-15_at_11.25.47_PM_1.jpg"),
    tag: "Golden Hour",
  },
  {
    id: 20,
    category: "Bride Portrait",
    title: "Heirloom & Heritage",
    subtitle: "The Oberoi Suite",
    desc: "Capturing generational family heirloom jewellery worn with effortless grace and poise.",
    img: CLD("v1794770056/WhatsApp_Image_2026-11-15_at_11.22.42_PM.jpg"),
    tag: "Heritage Portrait",
  },
  {
    id: 21,
    category: "Bride Portrait",
    title: "Poetry in Motion",
    subtitle: "Private Residence, Mathura",
    desc: "A quiet, candid breath of serenity as the bride prepares for her entrance down the aisle.",
    img: CLD("v1794770056/WhatsApp_Image_2026-11-15_at_11.22.42_PM_2.jpg"),
    tag: "Candid Portrait",
  },
  {
    id: 22,
    category: "Bride Portrait",
    title: "The Radiant Queen",
    subtitle: "Taj Palace, New Delhi",
    desc: "Grand portrait composition with dramatic cinematic lighting celebrating the essence of Indian royalty.",
    img: CLD("v1794770055/WhatsApp_Image_2026-11-15_at_11.22.41_PM.jpg"),
    tag: "Editorial",
    featured: true,
  },
  {
    id: 23,
    category: "Bride Portrait",
    title: "Intricate Splendor",
    subtitle: "Studio Heritage Session",
    desc: "Fine detail macro portraiture of handcrafted matha patti, nath, and bespoke bridal necklace.",
    img: CLD("v1794770055/WhatsApp_Image_2026-11-15_at_11.22.42_PM_1.jpg"),
    tag: "Jewellery Focus",
  },
  {
    id: 24,
    category: "Bride Portrait",
    title: "Moment of Serenity",
    subtitle: "Palace Courtyard",
    desc: "Quiet stillness captured amidst the festive grandeur and celebration of the wedding ceremonies.",
    img: CLD("v1794770055/WhatsApp_Image_2026-11-15_at_11.22.41_PM_1.jpg"),
    tag: "Bridal Solitude",
  },
  {
    id: 25,
    category: "Bride Portrait",
    title: "The Ethereal Glow",
    subtitle: "Le Meridien Studio",
    desc: "Soft diffusion lighting capturing pure natural bridal radiance, warmth, and quiet anticipation.",
    img: CLD("v1794770054/WhatsApp_Image_2026-11-15_at_11.22.39_PM_2.jpg"),
    tag: "Bridal Glow",
  },
  {
    id: 26,
    category: "Bride Portrait",
    title: "Golden Symphony",
    subtitle: "The Lodhi, New Delhi",
    desc: "Warm amber highlights catching raw silk textures and majestic gold accents.",
    img: CLD("v1794770054/WhatsApp_Image_2026-11-15_at_11.22.40_PM.jpg"),
    tag: "Editorial Portrait",
  },
  {
    id: 27,
    category: "Bride Portrait",
    title: "Velvet & Pearls",
    subtitle: "Studio Signature Series",
    desc: "Moody fine-art chiaroscuro portrait highlighting regal poise and delicate zari craftsmanship.",
    img: CLD("v1794770054/WhatsApp_Image_2026-11-15_at_11.22.40_PM_1.jpg"),
    tag: "Fine Art",
  },
  {
    id: 28,
    category: "Bride Portrait",
    title: "Shades of Devotion",
    subtitle: "ITC Maurya Suite",
    desc: "Soulful portrait capturing deep reflection and quiet anticipation moments before the pheras.",
    img: CLD("v1794770054/WhatsApp_Image_2026-11-15_at_11.22.39_PM.jpg"),
    tag: "Ceremony Series",
  },
  {
    id: 29,
    category: "Bride Portrait",
    title: "The Royal Silhouette",
    subtitle: "Heritage Haveli, NCR",
    desc: "Sculpted lighting defining exquisite traditional drape and timeless regal majesty.",
    img: CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.39_PM_1.jpg"),
    tag: "Signature Portrait",
  },
  {
    id: 30,
    category: "Bride Portrait",
    title: "Crimson Majesty",
    subtitle: "The Westin, Mathura",
    desc: "Rich tones and ornate borders reflecting the sacred beauty of North Indian bridal traditions.",
    img: CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.38_PM.jpg"),
    tag: "Bridal Portrait",
  },
  {
    id: 31,
    category: "Bride Portrait",
    title: "Quiet Anticipation",
    subtitle: "Bridal Suite, Mathura",
    desc: "A tender glance by the vintage window awaiting the joyous arrival of the baraat.",
    img: CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.35_PM.jpg"),
    tag: "Bridal Portrait",
  },
  {
    id: 32,
    category: "Bride Portrait",
    title: "Gilded Elegance",
    subtitle: "Palace Ballroom",
    desc: "Stately composition reflecting poise, dignity, and celebratory festive warmth.",
    img: CLD("v1794770053/WhatsApp_Image_2026-11-15_at_11.22.38_PM_1.jpg"),
    tag: "Editorial Series",
  },
  {
    id: 33,
    category: "Bride Portrait",
    title: "The Solitary Grace",
    subtitle: "Studio Portrait Suite",
    desc: "Pure minimalist bridal framing focusing on emotion, expressive eyes, and heirloom details.",
    img: CLD("v1794770052/WhatsApp_Image_2026-11-15_at_11.22.34_PM.jpg"),
    tag: "Bridal Portrait",
  },
  {
    id: 34,
    category: "Bride Portrait",
    title: "Timeless Allure",
    subtitle: "The Roseate, New Delhi",
    desc: "Architectural shadows and soft morning light framing exquisite bridal couture.",
    img: CLD("v1794770052/WhatsApp_Image_2026-11-15_at_11.22.32_PM.jpg"),
    tag: "Fine Art Portrait",
  },
  {
    id: 35,
    category: "Bride Portrait",
    title: "A Queen's Reflection",
    subtitle: "Palace Mirror Suite",
    desc: "Capturing beauty in reflection — symmetry, delicate pearls, and unconditional royal poise.",
    img: CLD("v1794770052/WhatsApp_Image_2026-11-15_at_11.22.33_PM.jpg"),
    tag: "Bridal Portrait",
  },

  /* ── Maternity Images (Specific Category) ── */
  {
    id: 36,
    category: "Maternity",
    title: "The Miracle Within",
    subtitle: "Studio Maternity Suite · Mathura",
    desc: "A tender, glowing celebration of motherhood and the miraculous new journey about to begin.",
    img: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM_1.jpg"),
    tag: "Maternity Portrait",
    featured: true,
  },
  {
    id: 37,
    category: "Maternity",
    title: "Embrace of Life",
    subtitle: "Golden Hour Studio Session",
    desc: "Warm golden light cradling the quiet bond and loving harmony between mother and child.",
    img: CLD("v1794769883/WhatsApp_Image_2026-11-15_at_11.29.49_PM.jpg"),
    tag: "Maternity Series",
  },
  {
    id: 38,
    category: "Maternity",
    title: "A Mother's Radiance",
    subtitle: "Minimalist Studio Session",
    desc: "Elegant studio illumination capturing natural maternal grace, strength, and quiet joy.",
    img: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM_1.jpg"),
    tag: "Fine Art Maternity",
  },
  {
    id: 39,
    category: "Maternity",
    title: "The Gentle Bond",
    subtitle: "Lifestyle Suite, Mathura",
    desc: "Intimate, warm portraiture capturing the tender anticipation of family and new beginnings.",
    img: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM.jpg"),
    tag: "Maternity Portrait",
  },
  {
    id: 40,
    category: "Maternity",
    title: "Whispers of Love",
    subtitle: "Sunlit Studio Sanctuary",
    desc: "Soft morning light celebrating maternal love with timeless simplicity and warmth.",
    img: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.51_PM.jpg"),
    tag: "Maternity Glow",
  },
  {
    id: 41,
    category: "Maternity",
    title: "Strength & Grace",
    subtitle: "Fine Art Studio Suite",
    desc: "Sculptural silhouette lighting capturing the beauty, poise, and power of pregnancy.",
    img: CLD("v1794769884/WhatsApp_Image_2026-11-15_at_11.29.50_PM_2.jpg"),
    tag: "Fine Art Silhouette",
  },
  {
    id: 42,
    category: "Maternity",
    title: "Promise of Tomorrow",
    subtitle: "Outdoor Nature Session",
    desc: "Surrounded by nature, celebrating peace, expectation, and the wonder of new life.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.46_PM.jpg"),
    tag: "Outdoor Maternity",
  },
  {
    id: 43,
    category: "Maternity",
    title: "A Sacred Chapter",
    subtitle: "Mathura Studio Session",
    desc: "Artfully composed portrait highlighting flowing fabrics, soft contours, and gentle maternal joy.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.47_PM.jpg"),
    tag: "Fine Art Portrait",
  },
  {
    id: 44,
    category: "Maternity",
    title: "Awaiting You",
    subtitle: "Home Lifestyle Session",
    desc: "Pure and authentic emotion captured in a comfortable, loving, and intimate environment.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.48_PM.jpg"),
    tag: "Lifestyle Maternity",
  },
  {
    id: 45,
    category: "Maternity",
    title: "The Glow of Creation",
    subtitle: "Studio Signature Series",
    desc: "Warm golden tones reflecting the peaceful joy and serenity of an expectant mother.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.49_PM_1.jpg"),
    tag: "Maternity Glow",
  },
  {
    id: 46,
    category: "Maternity",
    title: "Tender Horizons",
    subtitle: "Sunset Meadow Session",
    desc: "Golden hour landscape portrait celebrating the anticipation of life's greatest blessings.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.46_PM_1.jpg"),
    tag: "Outdoor Glow",
  },
  {
    id: 47,
    category: "Maternity",
    title: "Pure Maternal Love",
    subtitle: "High-Key Studio Session",
    desc: "Clean, luminous fine-art portrait celebrating unconditional love and family harmony.",
    img: CLD("v1794769882/WhatsApp_Image_2026-11-15_at_11.29.47_PM_1.jpg"),
    tag: "Maternity Portrait",
  },
];

export default function Work() {
  const [active, setActive] = useState("All");
  const [selectedIdx, setSelectedIdx] = useState(null);

  const filtered = active === "All"
    ? WORKS
    : WORKS.filter((w) => w.category === active);

  const openLightbox = (idx) => {
    setSelectedIdx(idx);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextItem = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev + 1) % filtered.length);
  }, [selectedIdx, filtered.length]);

  const prevItem = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
  }, [selectedIdx, filtered.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "ArrowLeft") prevItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, nextItem, prevItem]);

  const currentWork = selectedIdx !== null ? filtered[selectedIdx] : null;

  return (
    <main className="overflow-x-hidden" style={{ background: "#0a0a0a" }}>

      {/* ── Hero ── */}
      <section className="px-6 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.88] text-[#F5F0E8]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our <em>Work.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-lg text-sm leading-7 text-[#F5F0E8]/45"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A selection of projects we're proud of — wedding cinema, bride portraits,
            maternity stories, live broadcasts, podcasts, and brand commercials.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* ── Camera Film Strip ── */}
      <CameraFilmStrip />

      {/* ── Filter Tabs ── */}
      <section className="sticky top-16 z-30 border-b border-[#F5F0E8]/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat);
                setSelectedIdx(null);
              }}
              className={`shrink-0 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                active === cat
                  ? "bg-[#F5F0E8] text-[#0a0a0a] shadow-lg shadow-white/10"
                  : "border border-[#F5F0E8]/15 text-[#F5F0E8]/50 hover:border-[#F5F0E8]/35 hover:text-[#F5F0E8]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {cat}
              {cat === "Bride Portrait" && " (23)"}
              {cat === "Maternity" && " (12)"}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((work, i) => (
                <Reveal key={work.id} delay={Math.min(i * 0.05, 0.4)}>
                  <article
                    onClick={() => openLightbox(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111] transition-all duration-300 hover:border-[#D4AF6A]/40 hover:shadow-xl hover:shadow-black/50"
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: work.featured ? "360px" : "280px" }}
                    >
                      <img
                        src={work.img}
                        alt={work.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/15 to-transparent" />

                      {/* Category badge */}
                      <span
                        className="absolute left-4 top-4 rounded-full border border-[#F5F0E8]/20 bg-[#111111]/70 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-[#F5F0E8]/80 backdrop-blur-md"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {work.category}
                      </span>

                      {/* View / Expand overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF6A]/50 bg-[#0a0a0a]/70 text-[#F5F0E8] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                          <Maximize2 size={18} className="text-[#D4AF6A]" />
                        </div>
                      </div>
                    </div>

                  </article>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {currentWork && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-8"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 transition hover:bg-[#D4AF6A] hover:text-black hover:border-[#D4AF6A]"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition hover:bg-[#D4AF6A] hover:text-black hover:border-[#D4AF6A] md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition hover:bg-[#D4AF6A] hover:text-black hover:border-[#D4AF6A] md:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex max-h-[82vh] items-center justify-center overflow-hidden bg-black">
                <img
                  src={CLD(currentWork.img, 1800)}
                  alt={currentWork.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Info footer */}
              <div className="flex flex-col gap-2 border-t border-white/10 bg-[#111111] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="rounded-full border border-[#D4AF6A]/30 bg-[#D4AF6A]/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF6A]">
                    {currentWork.category}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-white/40">
                    {selectedIdx + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="divider" />

      {/* ── Venue Gallery — event & venue coverage ── */}
      <VenueGallery />

      <div className="divider" />

      {/* ── Masonry Gallery — behind the lens ── */}
      <MasonryGallery />

      {/* ── Parallax Quote Banner ── */}
      <ParallaxBanner
        img="https://res.cloudinary.com/wqhpwm9y/image/upload/w_1800,q_auto,f_auto/v1794174547/6M4A7534.jpg"
        quote="Behind every great shot is a team that never stops caring."
        tag="New Shivam Production House · Mathura, Uttar Pradesh, India"
      />

      {/* Divider */}
      <div className="divider" />

      {/* ── CTA ── */}
      <section className="bg-[#111111] px-6 py-20 text-center md:px-10 md:py-28">
        <Reveal>
          <p
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Start a Project
          </p>
          <h2
            className="mb-6 text-3xl font-semibold text-[#F5F0E8] md:text-4xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your story could be next.
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get in Touch
            <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </section>

    </main>
  );
}
