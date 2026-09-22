import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Compact inline technology logo marks (no external assets / no new dependency)
const TechStackIcons = {
  React: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  'Node.js': () => (
    <svg viewBox="0 0 24 24">
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5z" fill="#339933" />
    </svg>
  ),
  HTML: () => (
    <svg viewBox="0 0 24 24">
      <path d="M3 2l1.7 18.3L12 22l7.3-1.7L21 2H3z" fill="#E34F26" />
      <path d="M12 4v16.3l5.9-1.3L19.2 4H12z" fill="#EF652A" />
    </svg>
  ),
  CSS: () => (
    <svg viewBox="0 0 24 24">
      <path d="M3 2l1.7 18.3L12 22l7.3-1.7L21 2H3z" fill="#1572B6" />
      <path d="M12 4v16.3l5.9-1.3L19.2 4H12z" fill="#33A9DC" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000">JS</text>
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24">
      <path d="M11.9 2c-1 0-1.9.1-2.7.2-2.4.4-2.8 1.3-2.8 2.9v2.1h5.6v.7H4.5c-1.7 0-3.1 1-3.6 2.9-.6 2.2-.6 3.5 0 5.7.4 1.7 1.5 2.9 3.1 2.9h2v-2.6c0-1.9 1.6-3.5 3.6-3.5h5.6c1.6 0 2.9-1.3 2.9-2.9V5.1c0-1.6-1.3-2.7-2.9-3-1-.2-2-.3-3.3-.3zM9 3.6c.6 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .4-1 1-1z" fill="#3776AB" />
      <path d="M12.1 22c1 0 1.9-.1 2.7-.2 2.4-.4 2.8-1.3 2.8-2.9v-2.1h-5.6v-.7h7.5c1.7 0 3.1-1 3.6-2.9.6-2.2.6-3.5 0-5.7-.4-1.7-1.5-2.9-3.1-2.9h-2v2.6c0 1.9-1.6 3.5-3.6 3.5H8.7c-1.6 0-2.9 1.3-2.9 2.9v4.9c0 1.6 1.3 2.7 2.9 3 1 .2 2 .3 3.3.3zM15 20.4c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.4 1-1 1z" fill="#FFD43B" />
    </svg>
  ),
  Java: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 16c-1.2 1-1.1 2.1.4 2.7 2.7 1.1 8.3 1.1 11 0 1.5-.6 1.6-1.7.4-2.7" stroke="#5382A1" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M9 15.3s6.7.2 5.8-3.7c-.5-2-2.9-1.1-2.9-3" stroke="#E76F00" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="12" cy="16.6" rx="5" ry="1.4" stroke="#5382A1" strokeWidth="1.1" />
    </svg>
  ),
  PHP: () => (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
      <text x="12" y="14.8" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">php</text>
    </svg>
  ),
  MySQL: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00758F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
  Vite: () => (
    <svg viewBox="0 0 24 24">
      <defs>
        <linearGradient id="viteGradA" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="viteGradB" x1="9" y1="7" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFEA83" />
          <stop offset="1" stopColor="#FFDD35" />
        </linearGradient>
      </defs>
      <path d="M21.5 3.2 12.6 21.6c-.3.6-1.1.6-1.4 0L2.3 3.2c-.3-.7.4-1.4 1.1-1.1l8.2 3.6c.3.1.6.1.9 0l8.1-3.6c.7-.3 1.4.4 1 1.1z" fill="url(#viteGradA)" />
      <path d="M15.9 6.9 9.9 9.6c-.4.2-.5.6-.3 1l3 5.2c.3.5 1 .4 1.2-.1l2.8-8.1c.2-.5-.3-1-.7-.7z" fill="url(#viteGradB)" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24">
      <path
        fill="#ffffff"
        d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"
      />
    </svg>
  ),
  'Android Studio': () => (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="9" width="14" height="9" rx="3" fill="#3DDC84" />
      <rect x="3" y="10" width="2" height="6" rx="1" fill="#3DDC84" />
      <rect x="19" y="10" width="2" height="6" rx="1" fill="#3DDC84" />
      <rect x="8" y="18" width="2" height="4" rx="1" fill="#3DDC84" />
      <rect x="14" y="18" width="2" height="4" rx="1" fill="#3DDC84" />
      <circle cx="9" cy="13" r="1" fill="#0b3d24" />
      <circle cx="15" cy="13" r="1" fill="#0b3d24" />
      <line x1="8" y1="5" x2="9.5" y2="8" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="5" x2="14.5" y2="8" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'VS Code': () => (
    <svg viewBox="0 0 24 24">
      <path d="M20 3.5 14.8 1 8 7.3 3.8 4.1 2 5v14l1.8.9L8 16.7l6.8 6.3L20 20.5V3.5z" fill="#0078D4" />
      <path d="M20 3.5 14.8 1 8 7.3l3 2.4L20 3.5z" fill="#005A9E" />
      <path d="M20 20.5 14.8 23 8 16.7l3-2.4 9 6.2z" fill="#1BA1E2" />
    </svg>
  ),
};

const TECH_STACK = ['React', 'Node.js', 'Vite', 'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'PHP', 'MySQL', 'GitHub', 'VS Code'];

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Giant faint background numeral behind header (decorative only) */}
      <div className="absolute top-0 right-0 text-[14rem] md:text-[20rem] font-black text-white/[0.03] leading-none pointer-events-none select-none -mt-6 md:-mt-14 -mr-4">
        01
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">EPISODE 01</span>
              <span className="text-white/40">|</span>
              <span>ABOUT THE ENGINEER</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              EPISODE SYNOPSIS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
                ORIGIN & VISION.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 relative z-10 max-w-[260px]">
            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed md:text-right">
              Every developer has a beginning. Here’s mine.
            </p>
            <span className="w-10 h-[2px] rounded-full bg-red-600/60"></span>
            <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-white/30">
              // MORE THAN CODE. A BIGGER STORY.
            </span>
          </div>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-red-600/20 rounded-[1.75rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            {/* Futuristic corner accent brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 rounded-tl-[1.75rem] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/50 rounded-tr-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 rounded-br-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600/50 rounded-bl-[1.75rem] pointer-events-none"></div>

            {/* Subtle dotted grid accent */}
            <div
              className="absolute bottom-8 right-8 w-16 h-12 opacity-25 pointer-events-none hidden sm:block"
              style={{ backgroundImage: 'radial-gradient(rgba(229,9,20,0.6) 1px, transparent 1px)', backgroundSize: '6px 6px' }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-600/40 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold whitespace-normal sm:whitespace-nowrap">Cast & Background</h3>
                <span className="hidden sm:inline-block flex-1 min-w-0 overflow-hidden text-red-600/25 font-mono text-[10px] tracking-widest whitespace-nowrap select-none">
                  //////////////////////////
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I’m <span className="text-white font-bold drop-shadow">Shamil</span>, currently pursuing a BSc (Hons) in Software Engineering (Top Up) at ICBT.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                I am passionate about software development, full-stack web applications, and machine learning. I enjoy building practical solutions, solving real-world problems, and continuously improving my technical and problem-solving skills.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/40 text-xs font-mono text-white/90">AI & ML</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Full-Stack Development</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">System Architecture</span>
            </div>
          </div>

          {/* Card 2: Fellowships & Achievements (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-red-600/20 rounded-[1.75rem] shadow-2xl flex flex-col justify-between relative group hover:border-red-600/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            {/* Futuristic corner accent brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 rounded-tl-[1.75rem] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/50 rounded-tr-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 rounded-br-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600/50 rounded-bl-[1.75rem] pointer-events-none"></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-600/40 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l5-5 4 4 8-8" />
                    <path d="M15 8h5v5" />
                  </svg>
                </span>
                <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold whitespace-normal sm:whitespace-nowrap">Milestones & Achievements</h3>
                <span className="hidden sm:inline-block flex-1 min-w-0 overflow-hidden text-red-600/25 font-mono text-[10px] tracking-widest whitespace-nowrap select-none">
                  //////////////////
                </span>
              </div>

              <div className="relative space-y-5 text-sm text-white/80 font-light pl-6">
                <span className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-gradient-to-b from-red-600/70 via-red-600/30 to-transparent"></span>
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]"></span>
                  <span>Completed my Higher National Diploma in Software Engineering at ICBT.</span>
                </div>
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]"></span>
                  <span>Currently pursuing a BSc (Hons) in Software Engineering (Top Up) at ICBT.</span>
                </div>
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(229,9,20,0.8)]"></span>
                  <span>Both qualifications are awarded by Cardiff Metropolitan University.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 font-mono text-xs text-white/40 relative z-10">
              // ACADEMIC & DEVELOPMENT MILESTONES
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-red-600/20 rounded-[1.75rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-600/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)'
              }}
            ></div>

            {/* Futuristic corner accent brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 rounded-tl-[1.75rem] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/50 rounded-tr-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 rounded-br-[1.75rem] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600/50 rounded-bl-[1.75rem] pointer-events-none"></div>

            <div className="absolute top-0 right-0 p-3 text-white/[0.03] font-mono text-7xl font-black pointer-events-none">
              03
            </div>

            <div className="space-y-3 text-left relative z-10 md:min-w-[540px]">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-600/40 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="4" rx="1" />
                    <rect x="3" y="10" width="18" height="4" rx="1" />
                    <rect x="3" y="16" width="18" height="4" rx="1" />
                  </svg>
                </span>
                <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold whitespace-normal sm:whitespace-nowrap">Production Tech Stack</h3>
                <span className="hidden sm:inline-block flex-1 min-w-0 overflow-hidden text-red-600/25 font-mono text-[10px] tracking-widest whitespace-nowrap select-none">
                  //////////////////////////
                </span>
              </div>
              <p className="text-base md:text-lg font-semibold text-white">Technologies I use to build modern web applications and software solutions.</p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1.5 md:gap-[4px] relative z-10 max-w-[280px] md:max-w-full">
              {TECH_STACK.map((tech) => {
                const Icon = TechStackIcons[tech];
                return (
                  <div
                    key={tech}
                    className="flex items-center gap-1 md:gap-2.5 px-1.5 md:px-3 py-[3.5px] md:py-2 rounded-lg bg-white/[0.04] border border-white/10 shadow-inner hover:border-red-600/50 hover:shadow-[0_0_8px_rgba(229,9,20,0.3)] hover:scale-[1.04] transition-all duration-300"
                  >
                    <span className="w-3 h-3 md:w-[18px] md:h-[18px] shrink-0 flex items-center justify-center">
                      <Icon />
                    </span>
                    <span className="text-[8px] md:text-[12px] font-mono uppercase tracking-wide text-white/85 whitespace-nowrap">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;