
// import { useEffect, useRef } from "react";
// import "./VideoShowcase.css";

// const clamp01 = (value) =>
//   Math.min(1, Math.max(0, value));

// const easeInOutCubic = (t) =>
//   t < 0.5
//     ? 4 * t * t * t
//     : 1 - Math.pow(-2 * t + 2, 3) / 2;

// // Replace this sample with a direct MP4 URL for your own showreel.
// const SHOWCASE_VIDEO =
//   "https://youtu.be/EvtVVDigAtQ?si=LLTnR2v99vk0Se3g";

// export default function VideoShowcase({
//   videoSrc = SHOWCASE_VIDEO,
//   scrollHeight = "300vh",
// }) {
//   const sectionRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     let rafId = 0;
//     let isReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     const update = () => {
//       rafId = 0;

//       const rect = section.getBoundingClientRect();
//       const scrollDistance =
//         rect.height - window.innerHeight;

//       if (scrollDistance <= 0 || isReducedMotion) {
//         section.style.setProperty("--p", "1");
//         section.style.setProperty("--t", "1");
//         return;
//       }

//       const progress = clamp01(
//         -rect.top / scrollDistance
//       );

//       const expansion = easeInOutCubic(
//         clamp01(progress / 0.55)
//       );

//       const copyFade = clamp01(progress / 0.14);

//       section.style.setProperty(
//         "--p",
//         expansion.toFixed(4)
//       );

//       section.style.setProperty(
//         "--t",
//         copyFade.toFixed(4)
//       );
//     };

//     const scheduleUpdate = () => {
//       if (!rafId) {
//         rafId = window.requestAnimationFrame(update);
//       }
//     };

//     const onMotionPreferenceChange = (event) => {
//       isReducedMotion = event.matches;
//       scheduleUpdate();
//     };

//     const motionQuery = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     );

//     motionQuery.addEventListener(
//       "change",
//       onMotionPreferenceChange
//     );

//     window.addEventListener(
//       "scroll",
//       scheduleUpdate,
//       { passive: true }
//     );

//     window.addEventListener(
//       "resize",
//       scheduleUpdate,
//       { passive: true }
//     );

//     update();

//     return () => {
//       window.removeEventListener(
//         "scroll",
//         scheduleUpdate
//       );

//       window.removeEventListener(
//         "resize",
//         scheduleUpdate
//       );

//       motionQuery.removeEventListener(
//         "change",
//         onMotionPreferenceChange
//       );

//       if (rafId) {
//         window.cancelAnimationFrame(rafId);
//       }
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="video-showcase"
//       style={{ height: scrollHeight }}
//       aria-label="Brand Bros cinematic showreel"
//     >
//       <div className="video-showcase__sticky">
//         <div className="video-showcase__eyebrow">
//           <span className="video-showcase__line" />
//           <span>BRAND BROS</span>
//           <span className="video-showcase__dot">/</span>
//           <span>CREATIVE STUDIO</span>
//         </div>

//         <div className="video-showcase__copy video-showcase__copy--left">
//           <span className="video-showcase__index">
//             01 / THE VISION
//           </span>

//           <h2>
//             Stories
//             <br />
//             worth <em>feeling.</em>
//           </h2>

//           <p>
//             We turn ideas into cinematic experiences
//             that stay with you long after the screen fades.
//           </p>
//         </div>

//         <div className="video-showcase__frame">
//           <video
//             ref={videoRef}
//             className="video-showcase__video"
//             src={videoSrc}
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80"
//             aria-label="Brand Bros showreel"
//           />

//           <div className="video-showcase__overlay" />

//           <div className="video-showcase__frame-label">
//             <span className="video-showcase__live-dot" />
//             <span>OUR WORLD IN MOTION</span>
//           </div>

//           <span className="video-showcase__frame-number">
//             BB — 001
//           </span>
//         </div>

//         <div className="video-showcase__copy video-showcase__copy--right">
//           <span className="video-showcase__index">
//             02 / THE CRAFT
//           </span>

//           <h2>
//             Made with
//             <br />
//             <em>intention.</em>
//           </h2>

//           <p>
//             From the first frame to the final cut,
//             every detail has a purpose. Every story
//             deserves its own visual language.
//           </p>
//         </div>

//         <div className="video-showcase__bottom">
//           <span>FILM / MOTION / STORYTELLING</span>

//           <span className="video-showcase__scroll">
//             SCROLL TO EXPLORE
//             <span aria-hidden="true">↓</span>
//           </span>

//           <span>GURUGRAM, INDIA</span>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useRef, useEffect } from "react";

const SHOWCASE_VIDEO =
  "https://www.youtube.com/embed/pMrjs8gPEd8?autoplay=1&mute=1&loop=1&playlist=pMrjs8gPEd8&controls=0&rel=0";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const easeInOutCubic = (value) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,500;1,600;1,700&display=swap');

.video-showcase {
  --bb-bg: #0b0b0a;
  --bb-gold: #d7b56d;
  --bb-ivory: #f3eee4;
  --bb-muted: rgba(243, 238, 228, 0.62);
  --p: 0;
  --t: 0;

  position: relative;
  width: 100%;
  background: var(--bb-bg);
  color: var(--bb-ivory);
  font-family: 'DM Sans', sans-serif;
}

.video-showcase *,
.video-showcase *::before,
.video-showcase *::after {
  box-sizing: border-box;
}

.video-showcase__sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  isolation: isolate;
  background: var(--bb-bg);
}

.video-showcase__eyebrow {
  position: absolute;
  top: 5%;
  left: 50%;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--bb-muted);
}

.video-showcase__line {
  display: block;
  width: 28px;
  height: 1px;
  background: var(--bb-gold);
}

.video-showcase__dot {
  color: var(--bb-gold);
}

.video-showcase__copy {
  position: absolute;
  z-index: 3;
  width: 24%;
  max-width: 330px;
  opacity: calc(1 - var(--p) * 0.95);
  transition: opacity 0.15s linear;
  pointer-events: none;
}

.video-showcase__copy--left {
  top: 30%;
  left: 6%;
  transform: translateY(calc((1 - var(--p)) * 0px));
}

.video-showcase__copy--right {
  right: 6%;
  bottom: 22%;
  text-align: right;
}

.video-showcase__index {
  display: inline-block;
  margin-bottom: 18px;
  color: var(--bb-gold);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.video-showcase__copy h2 {
  margin: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(38px, 5.2vw, 76px);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.video-showcase__copy h2 em {
  color: var(--bb-gold);
  font-family: Inter, sans-serif;
  font-weight: 500;
  text-transform: none;
  letter-spacing: -0.045em;
}

.video-showcase__copy p {
  max-width: 300px;
  margin: 22px 0 0;
  color: var(--bb-muted);
  font-size: 12px;
  line-height: 1.9;
}

.video-showcase__copy--right p {
  margin-left: auto;
}

.video-showcase__frame {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: calc(44% + var(--p) * 56%);
  height: calc(45% + var(--p) * 55%);
  max-width: 100%;
  overflow: hidden;
  border: 1px solid rgba(215, 181, 109, 0.3);
  border-radius: calc(5px + (1 - var(--p)) * 10px);
  background: #111;
  transform: translate(-50%, -50%);
  will-change: width, height, border-radius;
}

.video-showcase__video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 0;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

/* The YouTube player keeps its own aspect ratio.
   Oversize it slightly to reduce letterboxing. */
.video-showcase__frame iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.video-showcase__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.15) 0%,
    transparent 35%,
    rgba(0, 0, 0, 0.32) 100%
  );
  pointer-events: none;
}

.video-showcase__frame-label {
  position: absolute;
  left: 22px;
  bottom: 22px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--bb-ivory);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  pointer-events: none;
  opacity: calc(0.5 + var(--p) * 0.5);
}

.video-showcase__live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bb-gold);
  box-shadow: 0 0 12px rgba(215, 181, 109, 0.7);
}

.video-showcase__frame-number {
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 2;
  color: rgba(243, 238, 228, 0.7);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  pointer-events: none;
}

.video-showcase__bottom {
  position: absolute;
  right: 5%;
  bottom: 5%;
  left: 5%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--bb-muted);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  opacity: calc(1 - var(--p) * 0.75);
}

.video-showcase__scroll {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--bb-gold);
}

.video-showcase__scroll span {
  font-size: 18px;
  animation: bb-scroll-arrow 1.5s ease-in-out infinite;
}

@keyframes bb-scroll-arrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

@media (max-width: 900px) {
  .video-showcase__copy {
    width: 27%;
  }

  .video-showcase__copy--left {
    left: 3%;
  }

  .video-showcase__copy--right {
    right: 3%;
  }

  .video-showcase__copy h2 {
    font-size: clamp(32px, 5vw, 52px);
  }

  .video-showcase__copy p {
    font-size: 11px;
  }

  .video-showcase__frame {
    width: calc(40% + var(--p) * 60%);
  }
}

@media (max-width: 600px) {
  .video-showcase__sticky {
    min-height: 520px;
  }

  .video-showcase__eyebrow {
    top: 6%;
    gap: 7px;
    font-size: 8px;
    letter-spacing: 0.15em;
  }

  .video-showcase__line {
    width: 18px;
  }

  .video-showcase__copy {
    width: 42%;
    max-width: none;
  }

  .video-showcase__copy--left {
    top: 17%;
    left: 6%;
  }

  .video-showcase__copy--right {
    right: 6%;
    bottom: 17%;
  }

  .video-showcase__copy h2 {
    font-size: clamp(30px, 9vw, 46px);
  }

  .video-showcase__index {
    margin-bottom: 10px;
    font-size: 8px;
  }

  .video-showcase__copy p {
    margin-top: 10px;
    font-size: 10px;
    line-height: 1.6;
  }

  .video-showcase__frame {
    top: 50%;
    width: calc(76% + var(--p) * 24%);
    height: calc(30% + var(--p) * 70%);
  }

  .video-showcase__frame-label {
    left: 12px;
    bottom: 12px;
    font-size: 7px;
  }

  .video-showcase__frame-number {
    right: 12px;
    bottom: 12px;
    font-size: 10px;
  }

  .video-showcase__bottom {
    right: 5%;
    bottom: 4%;
    left: 5%;
    font-size: 7px;
    letter-spacing: 0.08em;
  }

  .video-showcase__scroll {
    gap: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-showcase__scroll span {
    animation: none;
  }
}
`;

export default function VideoShowcase({
  videoSrc = SHOWCASE_VIDEO,
  scrollHeight = "300vh",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const update = () => {
      rafId = 0;

      const rect = section.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;

      if (scrollDistance <= 0 || isReducedMotion) {
        section.style.setProperty("--p", "1");
        return;
      }

      const progress = clamp01(-rect.top / scrollDistance);
      const expansion = easeInOutCubic(clamp01(progress / 0.55));

      section.style.setProperty("--p", expansion.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const onMotionPreferenceChange = (event) => {
      isReducedMotion = event.matches;
      scheduleUpdate();
    };

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    motionQuery.addEventListener("change", onMotionPreferenceChange);

    update();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionQuery.removeEventListener(
        "change",
        onMotionPreferenceChange
      );

      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section
        ref={sectionRef}
        className="video-showcase"
        style={{ height: scrollHeight }}
        aria-label="New Shivam Productions cinematic showreel"
      >
        <div className="video-showcase__sticky">
          <div className="video-showcase__eyebrow">
            <span className="video-showcase__line" />
            <span>NEW SHIVAM</span>
            <span className="video-showcase__dot">/</span>
            <span>PRODUCTION HOUSE</span>
          </div>

          <div className="video-showcase__copy video-showcase__copy--left">
            <span className="video-showcase__index">
              01 / THE VISION
            </span>

            <h2>
              Stories
              <br />
              worth <em>feeling.</em>
            </h2>

            <p>
              We turn ideas into cinematic experiences
              that stay with you long after the screen fades.
            </p>
          </div>

          <div className="video-showcase__frame">
            <iframe
              className="video-showcase__video"
              src={videoSrc}
              title="New Shivam Productions cinematic showreel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <div className="video-showcase__overlay" />

            <div className="video-showcase__frame-label">
              <span className="video-showcase__live-dot" />
              <span>OUR WORLD IN MOTION</span>
            </div>

            <span className="video-showcase__frame-number">
              NS — 001
            </span>
          </div>

          <div className="video-showcase__copy video-showcase__copy--right">
            <span className="video-showcase__index">
              02 / THE CRAFT
            </span>

            <h2>
              Made with
              <br />
              <em>intention.</em>
            </h2>

            <p>
              From the first frame to the final cut,
              every detail has a purpose. Every story
              deserves its own visual language.
            </p>
          </div>

          <div className="video-showcase__bottom">
            <span>FILM / BROADCAST / STORYTELLING</span>

            <span className="video-showcase__scroll">
              SCROLL TO EXPLORE
              <span aria-hidden="true">↓</span>
            </span>

            <span>GURUGRAM, INDIA</span>
          </div>
        </div>
      </section>
    </>
  );
}

