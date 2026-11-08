import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0a0a0a" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-sm"
      >
        <p
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          404
        </p>
        <h1
          className="mb-5 text-5xl font-semibold text-[#F5F0E8] md:text-6xl"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Page not<br /><em>found.</em>
        </h1>
        <p
          className="mb-10 text-sm leading-7 text-[#F5F0E8]/45"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          The page you're looking for doesn't exist. Let's take you back.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#F5F0E8]/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F0E8]/70 transition-all duration-300 hover:border-[#F5F0E8]/50 hover:text-[#F5F0E8]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
