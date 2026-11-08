import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  MoveUpRight,
} from "lucide-react";

import siteWorker from "../assets/creator.png";
import interior from "../assets/content.jpeg";
import tower from "../assets/business.jpeg";

const highlights = [
  "Creative direction with a clear vision",
  "Content crafted with purpose",
  "Attention to every detail",
];

const images = [
  {
    src: siteWorker,
    alt: "Creative professional developing a project",
    label: "Creative Direction",
    category: "01 / STRATEGY",
    number: "01",
  },
  {
    src: interior,
    alt: "Content creation and production environment",
    label: "Content Production",
    category: "02 / PRODUCTION",
    number: "02",
  },
  {
    src: tower,
    alt: "Modern business and architectural environment",
    label: "Brand Experiences",
    category: "03 / BRANDING",
    number: "03",
  },
];

export default function StudioSection() {
  const [activeImage, setActiveImage] = useState(0);

  const active = images[activeImage];

  return (
    <section
      id="studio"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#080808] text-white"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-32 h-[500px] w-[500px] rounded-full bg-[#FFD700]/[0.035] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-[45%] h-[420px] w-[420px] rounded-full bg-[#FFD700]/[0.025] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16 lg:py-36">
        {/* Section introduction */}
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#FFD700]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#FFD700] sm:text-xs">
                The studio behind the vision
              </p>
            </div>

            <h2 className="mt-8 text-[clamp(3.4rem,8vw,8.3rem)] font-medium leading-[0.86] tracking-[-0.075em]">
              Ideas deserve
              <br />
              to make an{" "}
              <span className="font-sans font-normal italic tracking-[-0.065em] text-[#FFD700]">
                impact.
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end lg:pb-2">
            <p className="text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              We bring strategy, storytelling, and design together to build
              brands people notice, remember, and connect with.
            </p>

            <a
              href="#contact"
              className="group mt-7 inline-flex items-center gap-3 border-b border-[#FFD700]/40 pb-3 text-sm font-medium transition-colors duration-300 hover:border-[#FFD700] hover:text-[#FFD700]"
            >
              Let's create something meaningful
              <ArrowDownRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Studio showcase */}
        <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-[1.55fr_0.75fr] lg:gap-5">
          {/* Main feature image */}
          <div className="group relative min-h-[520px] overflow-hidden bg-[#151515] sm:min-h-[650px] lg:min-h-[790px]">
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={1400}
              height={1600}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
            />

            {/* Image overlays */}
            <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

            {/* Image metadata */}
            <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-8 sm:top-8">
              <div className="flex items-center gap-2.5 border border-white/20 bg-black/25 px-3.5 py-2.5 backdrop-blur-xl sm:px-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/90 sm:text-[10px]">
                  A closer look inside
                </span>
              </div>

              <span className="font-mono text-xs tracking-wider text-white/80">
                {active.number} <span className="text-white/35">/ 03</span>
              </span>
            </div>

            {/* Background number */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-20 select-none font-sans text-[clamp(8rem,22vw,19rem)] leading-none tracking-[-0.1em] text-white/[0.08] sm:right-8 sm:top-24"
            >
              {active.number}
            </div>

            {/* Main image content */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#FFD700]">
                {active.category}
              </p>

              <h3 className="mt-4 max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Make it matter.
                <br />
                Make it{" "}
                <span className="font-sans font-normal italic text-[#FFD700]">
                  memorable.
                </span>
              </h3>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-white/20 pt-5 sm:mt-10 sm:pt-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/45">
                    Currently exploring
                  </p>
                  <p className="mt-2 text-sm font-medium tracking-wide text-white sm:text-base">
                    {active.label}
                  </p>
                </div>

                <a
                  href="#contact"
                  aria-label="Discuss a creative project"
                  className="group/link flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD700] text-black transition-all duration-300 hover:rotate-45 hover:bg-white sm:h-14 sm:w-14"
                >
                  <MoveUpRight
                    size={22}
                    className="transition-transform duration-300"
                  />
                </a>
              </div>

              {/* Image navigation */}
              <div className="mt-7 flex items-center gap-2.5">
                {images.map((image, index) => (
                  <button
                    key={image.number}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show ${image.label}`}
                    aria-pressed={activeImage === index}
                    className={`h-1 transition-all duration-300 ${
                      activeImage === index
                        ? "w-12 bg-[#FFD700]"
                        : "w-6 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                ))}

                <span className="ml-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Explore our approach
                </span>
              </div>
            </div>
          </div>

          {/* Supporting content */}
          <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-col lg:gap-5">
            {images
              .filter((_, index) => index !== activeImage)
              .map((image) => {
                const originalIndex = images.findIndex(
                  (item) => item.number === image.number
                );

                return (
                  <button
                    key={image.number}
                    type="button"
                    onClick={() => setActiveImage(originalIndex)}
                    aria-label={`Explore ${image.label}`}
                    className="group relative min-h-[250px] overflow-hidden bg-[#151515] text-left sm:min-h-[300px] lg:min-h-0 lg:flex-1"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={900}
                      height={700}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/5" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/10" />

                    <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.24em] text-[#FFD700]">
                            {image.category}
                          </p>
                          <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                            {image.label}
                          </p>
                          <p className="mt-2 text-xs text-white/55">
                            Discover our approach
                          </p>
                        </div>

                        <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 group-hover:border-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black">
                          <ArrowUpRight
                            size={18}
                            className="transition-transform duration-300 group-hover:rotate-45"
                          />
                        </span>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 font-mono text-xs text-white/65"
                    >
                      {image.number}
                    </span>
                  </button>
                );
              })}

            {/* Brand philosophy card */}
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 sm:col-span-2 sm:p-8 lg:p-9">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-12 font-sans text-[170px] leading-none text-[#FFD700]/[0.055]"
              >
                “
              </span>

              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-6 bg-[#FFD700]" />
                  <p className="text-[9px] uppercase tracking-[0.28em] text-[#FFD700]">
                    What drives us
                  </p>
                </div>

                <p className="mt-5 max-w-sm text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                  Details make the difference.
                  <span className="mt-1 block font-sans font-normal italic text-white/45">
                    Purpose makes the work.
                  </span>
                </p>

                <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-[#FFD700]"
                      />
                      <span className="text-xs leading-5 text-white/65 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing signature */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/40 sm:text-[10px]">
            Thoughtful by design. Distinctive by nature.
          </p>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#FFD700]"
          >
            Your vision, our craft
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
