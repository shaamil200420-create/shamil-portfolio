import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);

  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax translation for the big background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.firstName} ${formData.lastName} (${formData.email})`);
    window.location.href = `mailto:shaamil2004@gmail.com?subject=${subject}&body=${body}`;

    setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-center pt-32 pb-20 md:pb-24 border-t border-white/10 select-none">

      {/* Background Cinematic Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Huge Background Parallax Netflix Watermark Text */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Cinematic Contact Panel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-[#111111]/90 backdrop-blur-2xl border border-red-600/25 rounded-[1.75rem] shadow-[0_0_70px_rgba(229,9,20,0.1)] p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden"
        >
          {/* Subtle internal top crimson highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90 pointer-events-none"></div>

          {/* Futuristic corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 rounded-tl-[1.75rem] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 rounded-br-[1.75rem] pointer-events-none"></div>

          {/* Subtle HUD dot-grid decoration (top-right area) */}
          <div
            className="absolute top-6 right-6 w-16 h-16 opacity-20 pointer-events-none hidden md:block"
            style={{
              backgroundImage: 'radial-gradient(rgba(229,9,20,0.9) 1px, transparent 1.2px)',
              backgroundSize: '7px 7px'
            }}
            aria-hidden="true"
          ></div>

          {/* Top Row: episode badge + tagline */}
          <div className="relative flex items-center justify-between mb-10 md:mb-14 flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">EPISODE 05</span>
              <span className="text-white/40">|</span>
              <span>GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider hidden md:block">
              // LET'S BUILD SOMETHING AMAZING TOGETHER
            </span>
          </div>

          {/* Two Column Layout */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Center Divider (desktop only) */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/40 to-transparent"></div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-600 shadow-[0_0_14px_rgba(229,9,20,0.9)]"></span>
            </div>

            {/* LEFT SIDE: Heading, intro, direct contact */}
            <div className="flex flex-col gap-8 lg:pr-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-[2px] bg-red-600 shrink-0"></span>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">Let's</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-white">
                  GET IN <span className="text-red-600">TOUCH</span>
                </h2>
                <p className="mt-4 text-white/60 text-sm md:text-base font-light leading-relaxed max-w-md">
                  Have a project idea, collaboration in mind, or just want to say hello? I'd love to hear from you. Let's build something amazing together.
                </p>
              </div>

              {/* Direct Contact Panel */}
              <div className="relative border border-red-600/25 rounded-xl p-5 bg-black/30">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 mb-4">
                  Direct Contact
                </h3>

                <div className="flex flex-col gap-3">
                  <a href="mailto:shaamil2004@gmail.com" className="flex items-center gap-3 group">
                    <span className="w-9 h-9 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                        <path d="M3 6l9 7 9-7" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate">
                      shaamil2004@gmail.com
                    </span>
                  </a>

                  <a href="https://github.com/shaamil200420-create" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <span className="w-9 h-9 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.73.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.08.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate">
                      github.com/shaamil200420-create
                    </span>
                  </a>

                  <a href="https://www.linkedin.com/in/mohamed-shamil-08a61a439/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <span className="w-9 h-9 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM.5 8.98h4.96V23.5H.5V8.98zM8.98 8.98h4.76v1.98h.07c.66-1.25 2.28-2.57 4.7-2.57 5.03 0 5.96 3.31 5.96 7.62v8.49h-4.96v-7.53c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.89 1.96-2.89 3.98v7.66H8.98V8.98z" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate">
                      linkedin.com/in/mohamed-shamil-08a61a439
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
                        <circle cx="12" cy="9.5" r="2.3" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">
                      Colombo, Sri Lanka
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)] shrink-0"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                      Available For
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-white/40 font-light leading-relaxed">
                    Freelance Projects &bull; Collaborations &bull; Opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pl-4">
              <div className="flex items-center gap-3 bg-black/30 border border-white/15 rounded-lg px-4 py-3.5 focus-within:border-red-600/70 transition-colors">
                <span className="w-8 h-8 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20c1.5-4 4-6 7.5-6s6 2 7.5 6" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="flex-1 min-w-0 bg-transparent focus:outline-none placeholder-white/40 text-sm text-white"
                />
              </div>

              <div className="flex items-center gap-3 bg-black/30 border border-white/15 rounded-lg px-4 py-3.5 focus-within:border-red-600/70 transition-colors">
                <span className="w-8 h-8 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20c1.5-4 4-6 7.5-6s6 2 7.5 6" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="flex-1 min-w-0 bg-transparent focus:outline-none placeholder-white/40 text-sm text-white"
                />
              </div>

              <div className="flex items-center gap-3 bg-black/30 border border-white/15 rounded-lg px-4 py-3.5 focus-within:border-red-600/70 transition-colors">
                <span className="w-8 h-8 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="M3 6l9 7 9-7" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="flex-1 min-w-0 bg-transparent focus:outline-none placeholder-white/40 text-sm text-white"
                />
              </div>

              <div className="flex items-start gap-3 bg-black/30 border border-white/15 rounded-lg px-4 py-3.5 focus-within:border-red-600/70 transition-colors">
                <span className="w-8 h-8 shrink-0 rounded-md border border-red-600/40 bg-red-600/10 flex items-center justify-center text-red-500 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <path d="M4 4.5h16a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 4v-4H4A1.5 1.5 0 0 1 2.5 16V6A1.5 1.5 0 0 1 4 4.5z" />
                  </svg>
                </span>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="flex-1 min-w-0 min-h-[150px] bg-transparent focus:outline-none placeholder-white/40 text-sm text-white resize-none"
                ></textarea>
              </div>

              {/* Consent checkbox */}
              <label htmlFor="permission" className="flex items-start gap-3 text-xs text-white/60 font-light mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  id="permission"
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 shrink-0 rounded-sm border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  style={{ accentColor: "#E50914" }}
                />
                <span className="leading-snug">I give permission to contact me at this email address.</span>
              </label>

              {/* Privacy note + Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-2 pt-5 border-t border-white/10">
                <div className="flex items-start gap-2.5 text-[11px] text-white/40 font-light max-w-[260px] leading-relaxed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 text-red-600/70 mt-0.5" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
                    <path d="M9.5 12l1.8 1.8 3.2-3.6" />
                  </svg>
                  <span>This site is protected by security protocols and industry-standard privacy guidelines.</span>
                </div>

                <button
                  type="submit"
                  className="shrink-0 px-8 py-3.5 rounded bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-700 transition-all duration-300 group whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:scale-105"
                >
                  Send Message
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
