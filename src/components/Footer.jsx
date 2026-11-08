import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube,   href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">

          {/* Brand Column */}
          <div>
            <p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F5F0E8]/30"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              New Shivam Production House
            </p>
            <h2
              className="mb-5 text-3xl font-semibold leading-tight text-[#F5F0E8]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Film. Broadcast.<br />
              <em>Create.</em>
            </h2>
            <p className="max-w-xs text-sm leading-7 text-[#F5F0E8]/45">
              A full-service production studio based in Gurgaon — capturing
              life's most meaningful moments with cinematic precision.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F5F0E8]/12 text-[#F5F0E8]/40 transition-all duration-300 hover:border-[#F5F0E8]/30 hover:text-[#F5F0E8]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F5F0E8]/30">
              Pages
            </p>
            <ul className="space-y-3">
              {[
                { label: "Home",    to: "/" },
                { label: "Our Work", to: "/work" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover-underline text-sm text-[#F5F0E8]/55 transition-colors hover:text-[#F5F0E8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F5F0E8]/30">
              Get in Touch
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#F5F0E8]/55">
                <Mail size={14} className="mt-0.5 shrink-0 text-[#D4AF6A]" />
                <a href="mailto:newshivamproductions@gmail.com" className="hover:text-[#F5F0E8] transition-colors leading-5">
                  newshivamproductions@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#F5F0E8]/55">
                <Phone size={14} className="mt-0.5 shrink-0 text-[#D4AF6A]" />
                <span>+91 88875 86830<br />+91 72488 48020</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#F5F0E8]/55">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#D4AF6A]" />
                <span>Gurgaon, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-7 text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/25 sm:flex-row">
          <span>© {new Date().getFullYear()} New Shivam Production House</span>
          <span>Gurgaon · India</span>
        </div>
      </div>
    </footer>
  );
}