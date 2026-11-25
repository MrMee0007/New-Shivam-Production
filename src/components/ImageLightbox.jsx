/**
 * ImageLightbox — Reusable full-screen image viewer modal.
 * Features:
 *  • Full-screen overlay with blur backdrop
 *  • Prev / Next navigation with arrows + keyboard
 *  • Slide counter
 *  • Close on backdrop click or Escape
 *  • Smooth enter/exit animations via framer-motion
 */
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageLightbox({ images, selectedIdx, onClose, onNext, onPrev }) {
  const isOpen = selectedIdx !== null && selectedIdx !== undefined;

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const current = isOpen ? images[selectedIdx] : null;
  if (!current) return null;

  const src = typeof current === "string" ? current : (current.src || current.img || "");
  const alt = typeof current === "string" ? "" : (current.alt || current.label || current.title || "");
  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 20,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D4AF6A";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#D4AF6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D4AF6A";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#D4AF6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D4AF6A";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#D4AF6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <motion.div
            key={selectedIdx}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default",
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "82vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 8px 60px rgba(0,0,0,0.6)",
              }}
            />

            {/* Footer info */}
            <div
              style={{
                marginTop: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {alt && (
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(245,240,232,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {alt}
                </span>
              )}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "rgba(212,175,106,0.7)",
                  letterSpacing: "0.1em",
                }}
              >
                {pad(selectedIdx)} / {pad(images.length - 1)}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
