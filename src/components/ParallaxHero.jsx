
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const images = [
//   {
//     src: "https://www.acfm.edu.in/_next/image?q=75&url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0ouil1yk%2Fproduction%2Fd7a7c5ec58cc486d2ff2c4ca6d758c517e6c902c-1536x1024.webp%3Fw%3D1024%26q%3D80&w=1920",
//     alt: "Cinematographer working with a cinema camera",
//   },
//   {
//     src: "https://images.squarespace-cdn.com/content/v1/5b5876cf9772ae281ce9a8ef/822fe323-5046-449f-903e-774ce4934658/film-production-team-stockcake.jpg",
//     alt: "Film production crew working together",
//   },
//   {
//     src: "https://images.squarespace-cdn.com/content/v1/61293ed44bb2be424728402e/1655543945581-VVKJ4FP9BS860I7ZP2RT/ARC-Green-Production-Services-reduced-v2.jpeg",
//     alt: "Camera operator filming at dusk",
//   },
//   {
//     src: "https://static.wixstatic.com/media/74f20f_b745a9c8d4f44b23833b241c32ca68ec~mv2.jpg/v1/fill/w_1480%2Ch_864%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/74f20f_b745a9c8d4f44b23833b241c32ca68ec~mv2.jpg",
//     alt: "Outdoor film production setup",
//   },
//   {
//     src: "https://framerusercontent.com/images/2ilIyfO5iuN5lr75VupRTZ8VJtg.jpeg?height=1280&width=1280",
//     alt: "Filmmakers collaborating behind the camera",
//   },
//   {
//     src: "https://cdn.sanity.io/images/0ouil1yk/production/b03032de92ae63ddbd6b608f517c820cae9377c9-1536x1024.webp?q=80&w=1200",
//     alt: "Film crew capturing a scene",
//   },
//   {
//     src: "https://107cine.cdn.cinehello.com/20170918/1505716873_88271.jpg",
//     alt: "Crew preparing a camera rig",
//   },
//   {
//     src: "https://relianceacademylucknow.com/assets/img/courses/Behind-the-scenes-of-a-film-set.webp",
//     alt: "Dramatic film set with cinema camera",
//   },
//   {
//     src: "https://images.squarespace-cdn.com/content/v1/61293ed44bb2be424728402e/1655543945581-VVKJ4FP9BS860I7ZP2RT/ARC-Green-Production-Services-reduced-v2.jpeg",
//     alt: "Behind the scenes of a production shoot",
//   },
// ];

// const ParallaxHero = () => {
//   const containerRef = useRef(null);
//   const gridRef = useRef(null);
//   const contentRef = useRef(null);
//   const overlayRef = useRef(null);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const grid = gridRef.current;
//     const content = contentRef.current;
//     const overlay = overlayRef.current;
//     const title = titleRef.current;

//     if (!container || !grid || !content || !overlay || !title) {
//       return;
//     }

//     const ctx = gsap.context(() => {
//       // Initial image-grid state
//       gsap.set(grid, {
//         scale: 3,
//         transformOrigin: "center center",
//         force3D: true,
//       });

//       gsap.set(overlay, { opacity: 0.78 });

//       // Pinned, scroll-controlled zoom-out
//       gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: container,
//             start: "top top",
//             end: "+=180%",
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//           },
//         })
//         .to(grid, {
//           scale: 1,
//           ease: "power2.out",
//         }, 0)
//         .to(content, {
//           opacity: 0,
//           y: -50,
//           ease: "power2.out",
//         }, 0)
//         .to(overlay, {
//           opacity: 0.2,
//           ease: "power2.out",
//         }, 0);

//       // Heading entrance
//       gsap.fromTo(
//         title.children,
//         {
//           y: 100,
//           opacity: 0,
//           rotateX: 35,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           rotateX: 0,
//           duration: 1.2,
//           ease: "power4.out",
//           stagger: 0.15,
//           delay: 0.15,
//         }
//       );

//       // Subtle floating title effect
//       const floatTween = gsap.to(title, {
//         y: -8,
//         duration: 3,
//         ease: "sine.inOut",
//         repeat: -1,
//         yoyo: true,
//       });

//       // Interactive desktop tilt
//       const handleMouseMove = (event) => {
//         const bounds = title.getBoundingClientRect();

//         if (!bounds.width || !bounds.height) return;

//         const x = event.clientX - bounds.left;
//         const y = event.clientY - bounds.top;

//         const rotateY = gsap.utils.mapRange(
//           0,
//           bounds.width,
//           -8,
//           8,
//           x
//         );

//         const rotateX = gsap.utils.mapRange(
//           0,
//           bounds.height,
//           8,
//           -8,
//           y
//         );

//         gsap.to(title, {
//           rotateX,
//           rotateY,
//           scale: 1.025,
//           transformPerspective: 1000,
//           transformOrigin: "center center",
//           duration: 0.4,
//           ease: "power3.out",
//           overwrite: "auto",
//         });
//       };

//       const resetTilt = () => {
//         gsap.to(title, {
//           rotateX: 0,
//           rotateY: 0,
//           scale: 1,
//           duration: 0.5,
//           ease: "power3.out",
//           overwrite: "auto",
//         });
//       };

//       title.addEventListener("mousemove", handleMouseMove);
//       title.addEventListener("mouseleave", resetTilt);

//       // Remove listeners and the floating tween when this
//       // component unmounts or the page changes.
//       return () => {
//         title.removeEventListener("mousemove", handleMouseMove);
//         title.removeEventListener("mouseleave", resetTilt);
//         floatTween.kill();
//       };
//     }, container);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black text-white"
//     >
//       {/* Nine-image cinematic grid */}
//       <div
//         ref={gridRef}
//         className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1.5 sm:gap-2"
//       >
//         {images.map((image, index) => (
//           <div
//             key={`${image.src}-${index}`}
//             className="relative min-h-0 min-w-0 overflow-hidden bg-neutral-900"
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               loading={index === 4 ? "eager" : "lazy"}
//               decoding="async"
//               draggable="false"
//               className="h-full w-full object-cover"
//             />

//             <div className="pointer-events-none absolute inset-0 bg-black/10" />

//             <span className="absolute bottom-2 left-2 text-[9px] font-medium tracking-[0.18em] text-white/80 sm:bottom-4 sm:left-4 sm:text-[10px]">
//               FRAME / {String(index + 1).padStart(2, "0")}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Cinematic dark overlay */}
//       <div
//         ref={overlayRef}
//         className="absolute inset-0 z-[5] bg-black"
//       />

//       {/* Warm yellow accent */}
//       <div className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5C200]/10 blur-[100px] sm:h-96 sm:w-96" />

//       {/* Main content */}
//       <div
//         ref={contentRef}
//         className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-8"
//       >
//         <div className="mb-6 flex items-center gap-3">
//           <span className="h-px w-8 bg-[#F5C200]" />

//           <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F5C200] sm:text-xs">
//              · The Art of Seeing ·
//           </span>

//           <span className="h-px w-8 bg-[#F5C200]" />
//         </div>

//         <h1
//           ref={titleRef}
//           className="max-w-6xl cursor-default select-none text-4xl font-black uppercase leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           <span className="block">Capturing the</span>

//           <span className="mt-2 block">
//             pulse of every
//           </span>

//           <span className="mt-2 block text-[#F5C200]">
//             moment<span className="text-white">.</span>
//           </span>
//         </h1>

//         <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-8 sm:text-base md:text-lg">
//           Every frame has a feeling. Every story deserves to be
//           seen. We turn moments into visual experiences through
//           cinematography, creative direction, and editing.
//         </p>

//         <div className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:mt-10 sm:text-xs">
//           <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F5C200]/60 text-[#F5C200]">
//             ↓
//           </span>

//           Scroll to explore
//         </div>
//       </div>

//       {/* Bottom gradient */}
//       <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black via-black/30 to-transparent" />

//       {/* Corner branding */}
//       <div className="pointer-events-none absolute bottom-5 left-5 z-30 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 sm:bottom-8 sm:left-10">
//         PRATIBHA / VISUAL STORIES
//       </div>

//       <div className="pointer-events-none absolute bottom-5 right-5 z-30 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5C200] sm:bottom-8 sm:right-10">
//         EST. IN CREATIVITY
//       </div>
//     </section>
//   );
// };

// export default ParallaxHero;



import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://www.acfm.edu.in/_next/image?q=75&url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0ouil1yk%2Fproduction%2Fd7a7c5ec58cc486d2ff2c4ca6d758c517e6c902c-1536x1024.webp%3Fw%3D1024%26q%3D80&w=1920",
    alt: "Film production and cinematography",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5b5876cf9772ae281ce9a8ef/822fe323-5046-449f-903e-774ce4934658/film-production-team-stockcake.jpg",
    alt: "Creative production team",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61293ed44bb2be424728402e/1655543945581-VVKJ4FP9BS860I7ZP2RT/ARC-Green-Production-Services-reduced-v2.jpeg",
    alt: "Film production environment",
  },
  {
    src: "https://static.wixstatic.com/media/74f20f_b745a9c8d4f44b23833b241c32ca68ec~mv2.jpg/v1/fill/w_1480%2Ch_864%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/74f20f_b745a9c8d4f44b23833b241c32ca68ec~mv2.jpg",
    alt: "Behind the scenes of a creative shoot",
  },
  {
    src: "https://framerusercontent.com/images/2ilIyfO5iuN5lr75VupRTZ8VJtg.jpeg?height=1280&width=1280",
    alt: "Cinematic visual storytelling",
  },
  {
    src: "https://cdn.sanity.io/images/0ouil1yk/production/b03032de92ae63ddbd6b608f517c820cae9377c9-1536x1024.webp?q=80&w=1200",
    alt: "Camera and production setup",
  },
  {
    src: "https://107cine.cdn.cinehello.com/20170918/1505716873_88271.jpg",
    alt: "Film set and cinematography",
  },
  {
    src: "https://relianceacademylucknow.com/assets/img/courses/Behind-the-scenes-of-a-film-set.webp",
    alt: "Behind the scenes on a film set",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5b5876cf9772ae281ce9a8ef/822fe323-5046-449f-903e-774ce4934658/film-production-team-stockcake.jpg",
    alt: "Production crew collaborating",
  },
];

export default function ParallaxHero() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;

    if (!section || !grid || !content || !overlay || !title) {
      return;
    }

    let removePointerListeners = null;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const isTouch = window.matchMedia(
        "(hover: none), (pointer: coarse)"
      ).matches;

      // Enlarge the entire 3x3 grid at the beginning.
      // The middle tile becomes the main full-screen image.
      gsap.set(grid, {
        scale: reduceMotion ? 1 : 3.05,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(content, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(overlay, {
        opacity: 0.78,
      });

      gsap.set(title, {
        transformPerspective: 900,
        transformOrigin: "center bottom",
      });

      if (reduceMotion) {
        gsap.set(overlay, { opacity: 0.35 });
        return;
      }

      // Scale the whole grid down together on scroll.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=160%",
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          grid,
          {
            scale: 1,
            duration: 1,
          },
          0
        )
        .to(
          overlay,
          {
            opacity: 0.32,
            duration: 0.8,
          },
          0
        )
        .to(
          content,
          {
            y: -45,
            autoAlpha: 0,
            duration: 0.65,
          },
          0.35
        );

      // Title entrance animation.
      gsap.fromTo(
        title,
        {
          y: 55,
          autoAlpha: 0,
          rotateX: 18,
        },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Mouse tilt on desktop devices.
      if (!isTouch) {
        let pointerX = 0;
        let pointerY = 0;

        const onPointerMove = (event) => {
          const bounds = section.getBoundingClientRect();

          pointerX =
            (event.clientX - bounds.left) / bounds.width - 0.5;

          pointerY =
            (event.clientY - bounds.top) / bounds.height - 0.5;

          if (rafRef.current) return;

          rafRef.current = requestAnimationFrame(() => {
            gsap.to(grid, {
              rotationY: pointerX * 2,
              rotationX: pointerY * -2,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });

            rafRef.current = 0;
          });
        };

        const onPointerLeave = () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
          }

          gsap.to(grid, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        section.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });

        section.addEventListener("pointerleave", onPointerLeave, {
          passive: true,
        });

        removePointerListeners = () => {
          section.removeEventListener("pointermove", onPointerMove);
          section.removeEventListener("pointerleave", onPointerLeave);
        };
      }
    }, sectionRef);

    // Refresh scroll measurements after images load.
    const images = section.querySelectorAll("img");
    let refreshQueued = false;

    const queueRefresh = () => {
      if (refreshQueued) return;
      refreshQueued = true;

      requestAnimationFrame(() => {
        refreshQueued = false;
        ScrollTrigger.refresh();
      });
    };

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", queueRefresh, { once: true });
        img.addEventListener("error", queueRefresh, { once: true });
      }
    });

    queueRefresh();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }

      removePointerListeners?.();

      images.forEach((img) => {
        img.removeEventListener("load", queueRefresh);
        img.removeEventListener("error", queueRefresh);
      });

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-screen min-h-[620px] w-full overflow-hidden bg-black text-white"
    >
      {/* Entire 3x3 image grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={gridRef}
          className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1.5 will-change-transform sm:gap-2"
        >
          {IMAGES.map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className="relative min-h-0 min-w-0 overflow-hidden bg-neutral-900"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 4 ? "eager" : "lazy"}
                fetchPriority={index === 4 ? "high" : "auto"}
                decoding="async"
                draggable="false"
                className="h-full w-full select-none object-cover"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[1] bg-black"
      />

      {/* Existing hero text — unchanged */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#F5C200] sm:text-sm">
          · New Shivam Production ·
        </p>

        <h1
          ref={titleRef}
          className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Capturing the pulse of every{" "}
          <span className="text-[#F5C200]">moment.</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
          From cinematic frames to powerful stories, we turn creative
          vision into visuals that stay with you.
        </p>

        <div className="mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/70">
          <span className="h-px w-8 bg-[#F5C200]" />
          Visual storytelling · Creative direction · Editing
          <span className="h-px w-8 bg-[#F5C200]" />
        </div>

        <div className="absolute bottom-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:bottom-10">
          <span className="h-8 w-px bg-[#F5C200]" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
