import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Lenis from "lenis";

import { ZoomParallax } from "../components/ui/zoom-parallax";

import img1 from "../assets/parallax-1.jpg";
import img2 from "../assets/parallax-2.jpg";
import img3 from "../assets/parallax-3.jpg";
import img4 from "../assets/parallax-4.jpg";
import img5 from "../assets/parallax-5.jpg";
import img6 from "../assets/parallax-6.jpg";
import img7 from "../assets/parallax-7.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BRAND// — Creative Agency" },
      {
        name: "description",
        content:
          "We build distinctive brands through creative direction, storytelling, and digital experiences.",
      },
    ],
  }),
});

const images = [
  { src: img1, alt: "Creative direction and brand identity" },
  { src: img2, alt: "Brand strategy and campaign imagery" },
  { src: img3, alt: "Visual storytelling and design" },
  { src: img4, alt: "Content production and creative work" },
  { src: img5, alt: "Digital experience and visual design" },
  { src: img6, alt: "Campaign production and photography" },
  { src: img7, alt: "Creative ideas and brand experiences" },
];

function Index() {
  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <header className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD700]/[0.07] blur-[140px]"
        />

        <p className="relative mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#FFD700] sm:text-xs">
          Independent Creative Marketing Agency
        </p>

        <h1 className="relative max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.85] tracking-[-0.08em]">
          Make some
          <br />
          <span className="font-sans italic text-[#FFD700]">
            noise.
          </span>
        </h1>

        <p className="relative mt-7 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
          We turn bold ideas into memorable identities, powerful campaigns,
          and digital experiences that move brands forward.
        </p>

        <a
          href="#creative-work"
          className="relative mt-9 inline-flex items-center gap-4 border border-[#FFD700]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#FFD700] transition-colors hover:bg-[#FFD700] hover:text-black"
        >
          Explore our creative world
          <span aria-hidden="true">↘</span>
        </a>

        <span className="absolute bottom-8 text-[9px] uppercase tracking-[0.25em] text-white/35">
          Scroll to discover
        </span>
      </header>

      <ZoomParallax images={images} />

      <footer
        id="contact"
        className="flex min-h-[45vh] flex-col items-start justify-center border-t border-white/10 px-6 py-20 sm:px-12 lg:px-20"
      >
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#FFD700]">
          Have a good idea?
        </p>

        <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          Let's make it
          <span className="font-sans italic text-[#FFD700]">
            {" "}unforgettable.
          </span>
        </h2>

        <a
          href="mailto:hello@example.com"
          className="mt-8 border-b border-[#FFD700] pb-2 text-sm text-white transition-colors hover:text-[#FFD700]"
        >
          Start a conversation ↗
        </a>

        <p className="mt-16 text-[10px] tracking-[0.2em] text-white/35">
          BRAND// — STRATEGY · CREATIVITY · IMPACT
        </p>
      </footer>
    </main>
  );
}
