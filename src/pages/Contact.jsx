import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Youtube, CheckCircle } from "lucide-react";

const SERVICES = [
  "Wedding Cinematography",
  "Live Broadcasting",
  "Podcast Production",
  "Commercial / Ad Film",
  "Event Coverage",
  "Testimonial Video",
  "Other",
];

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventName: "",
    service: SERVICES[0], budget: BUDGETS[0], message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden" style={{ background: "#0a0a0a" }}>

      {/* ── Hero ── */}
      <section className="px-6 pb-16 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#D4AF6A]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Let's Talk
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.88] text-[#F5F0E8]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get in <em>Touch.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-lg text-sm leading-7 text-[#F5F0E8]/45"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Whether it's a wedding, a live event, a podcast, or a commercial —
            we'd love to hear about your project. Fill in the form and we'll
            be in touch within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* ── Main Content ── */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_380px]">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={onSubmit}
                  className="space-y-8"
                >
                  {/* Name + Email */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Your Name *" value={form.name} onChange={update("name")} required />
                    <Field label="Email Address *" type="email" value={form.email} onChange={update("email")} required />
                  </div>

                  {/* Phone + Event Name */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Phone Number" type="tel" value={form.phone} onChange={update("phone")} />
                    <Field label="Event / Brand Name" value={form.eventName} onChange={update("eventName")} />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid gap-7 sm:grid-cols-2">
                    <SelectField
                      label="Service Needed"
                      value={form.service}
                      onChange={update("service")}
                      options={SERVICES}
                    />
                    <SelectField
                      label="Approximate Budget"
                      value={form.budget}
                      onChange={update("budget")}
                      options={BUDGETS}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F5F0E8]/40" style={{ fontFamily: "Inter, sans-serif" }}>
                      Tell us about your project
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Date, location, style, vision — anything that helps us understand your project..."
                      className="w-full resize-none border-b border-[#F5F0E8]/15 bg-transparent py-3 text-sm text-[#F5F0E8] outline-none placeholder:text-[#F5F0E8]/20 focus:border-[#D4AF6A] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#D4AF6A] hover:gap-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Send Message
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-5 py-10"
                >
                  <CheckCircle size={40} className="text-[#D4AF6A]" />
                  <h3
                    className="text-3xl font-semibold text-[#F5F0E8]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Message received.
                  </h3>
                  <p className="max-w-sm text-sm leading-7 text-[#F5F0E8]/50" style={{ fontFamily: "Inter, sans-serif" }}>
                    Thank you, {form.name || "there"}! We'll review your project
                    details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", eventName: "", service: SERVICES[0], budget: BUDGETS[0], message: "" }); }}
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F0E8]/40 hover:text-[#F5F0E8] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 lg:pt-2"
          >
            {/* Contact info card */}
            <div className="rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111] p-7">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F5F0E8]/30" style={{ fontFamily: "Inter, sans-serif" }}>
                Contact Details
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF6A]/20 bg-[#D4AF6A]/5">
                    <Mail size={13} className="text-[#D4AF6A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#F5F0E8]/30 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Email</p>
                    <a href="mailto:newshivamproductions@gmail.com" className="text-sm text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                      newshivamproductions@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF6A]/20 bg-[#D4AF6A]/5">
                    <Phone size={13} className="text-[#D4AF6A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#F5F0E8]/30 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Phone</p>
                    <p className="text-sm text-[#F5F0E8]/70" style={{ fontFamily: "Inter, sans-serif" }}>
                      +91 88875 86830<br />+91 72488 48020
                    </p>
                    <p className="mt-1 text-[9px] text-[#F5F0E8]/30" style={{ fontFamily: "Inter, sans-serif" }}>Mon–Sat · 10 AM – 7 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF6A]/20 bg-[#D4AF6A]/5">
                    <MapPin size={13} className="text-[#D4AF6A]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#F5F0E8]/30 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Studio</p>
                    <p className="text-sm text-[#F5F0E8]/70" style={{ fontFamily: "Inter, sans-serif" }}>
                      New Shivam Production House<br />
                      Gurgaon, Haryana, India
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Availability card */}
            <div className="rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111] p-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F5F0E8]/40" style={{ fontFamily: "Inter, sans-serif" }}>
                  Currently Accepting Projects
                </p>
              </div>
              <p className="text-xs leading-6 text-[#F5F0E8]/35" style={{ fontFamily: "Inter, sans-serif" }}>
                We're booking for 2025–2026. Limited dates available for
                wedding season — enquire early to secure your date.
              </p>
            </div>

            {/* Studio preview card */}
            <div className="overflow-hidden rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111] relative group">
              <img
                src="https://res.cloudinary.com/wqhpwm9y/image/upload/w_600,q_auto,f_auto/v1794174544/6M4A7648.jpg"
                alt="New Shivam Productions candid shot"
                className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />
              <div className="p-5 relative">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF6A] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Capture What Matters
                </p>
                <p className="text-xs text-[#F5F0E8]/50 mt-1.5 leading-5" style={{ fontFamily: "Inter, sans-serif" }}>
                  From intimate wedding moments to multi-camera broadcasts, every frame is crafted with heart and precision.
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-lg border border-[#F5F0E8]/[0.07] bg-[#111111] p-7">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F5F0E8]/30" style={{ fontFamily: "Inter, sans-serif" }}>
                Follow Our Work
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F0E8]/12 text-[#F5F0E8]/40 transition-all duration-300 hover:border-[#D4AF6A]/40 hover:text-[#D4AF6A]"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}

/* ── Sub-components ── */
function Field({ label, ...props }) {
  return (
    <div>
      <label
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F5F0E8]/40"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full border-b border-[#F5F0E8]/15 bg-transparent py-3 text-sm text-[#F5F0E8] outline-none placeholder:text-[#F5F0E8]/20 focus:border-[#D4AF6A] transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F5F0E8]/40"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border-b border-[#F5F0E8]/15 bg-transparent py-3 text-sm text-[#F5F0E8]/80 outline-none focus:border-[#D4AF6A] transition-colors cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif", background: "#0a0a0a" }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#111111" }}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
