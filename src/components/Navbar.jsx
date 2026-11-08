import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { label: "Home",    to: "/" },
  { label: "Work",    to: "/work" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="New Shivam Productions" className="h-9 w-auto" />
            <span
              className="hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F5F0E8]/80 sm:block"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              New Shivam
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `hover-underline text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#F5F0E8]"
                      : "text-[#F5F0E8]/50 hover:text-[#F5F0E8]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden rounded-full border border-[#F5F0E8]/20 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#F5F0E8] hover:text-[#111111] md:inline-flex"
            >
              Book a Call
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F0E8]/15 text-[#F5F0E8]/70 transition hover:border-[#F5F0E8]/40 hover:text-[#F5F0E8] md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[#0a0a0a] px-8 py-10 shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="mb-12 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F0E8]/15 text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
              >
                <X size={18} />
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block font-sans text-3xl font-semibold transition-colors ${
                          isActive ? "text-[#F5F0E8]" : "text-[#F5F0E8]/40 hover:text-[#F5F0E8]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom info */}
              <div className="mt-auto space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#F5F0E8]/30">Contact</p>
                <a
                  href="mailto:newshivamproductions@gmail.com"
                  className="block text-sm text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
                >
                  newshivamproductions@gmail.com
                </a>
                <p className="text-sm text-[#F5F0E8]/60">+91 88875 86830</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
