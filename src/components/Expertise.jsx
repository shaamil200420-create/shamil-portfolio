import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Frontend Development",
    text: "Creating smooth and user-friendly digital experiences that are clear and easy to use.",
    tag: "UI / UX & INTERACTION",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]",
    icon: (
      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    number: "02",
    title: "Backend Development",
    text: "Designing reliable application logic and services that connect users, data, and system features smoothly.",
    tag: "API & DATABASE",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]",
    icon: (
      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    )
  },
  {
    number: "03",
    title: "AI-Powered Solutions",
    text: "Using data to create intelligent features and useful insights that support better decision making.",
    tag: "INTELLIGENCE & ML",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]",
    icon: (
      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="1.5" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
      </svg>
    )
  },
  {
    number: "04",
    title: "Programming & Problem Solving",
    text: "Solving complex requirements with clear, maintainable solutions through logical thinking and good design.",
    tag: "PROGRAMMING & LOGIC",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]",
    icon: (
      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="8 6 3 12 8 18" />
        <polyline points="16 6 21 12 16 18" />
      </svg>
    )
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">EPISODE 02</span>
              <span className="text-white/40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              DIRECTOR'S CUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                TECHNICAL CAPABILITIES.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Building practical software solutions through frontend development, backend development, machine learning, and strong programming fundamentals.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-red-600/50`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)'
                }}
              ></div>

              {/* Crimson Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>

              {/* HUD decorative dot-grid (top-right) */}
              <div
                className="absolute top-6 right-6 md:right-8 w-8 h-7 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(229,9,20,0.9) 1px, transparent 1.2px)',
                  backgroundSize: '6px 6px'
                }}
                aria-hidden="true"
              ></div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center my-auto relative z-10">

                {/* Icon + Badge + Title */}
                <div className="lg:col-span-6 flex items-center gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="space-y-2 min-w-0">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-600/25">
                      {item.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:flex lg:col-span-1 justify-center self-stretch">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-red-600/40 to-transparent"></div>
                </div>

                {/* Description + Number */}
                <div className="lg:col-span-5 flex items-center justify-between gap-4">
                  <p className="text-xs md:text-sm text-white/75 font-light leading-relaxed max-w-md">
                    {item.text}
                  </p>
                  <span className="hidden sm:block shrink-0 text-3xl md:text-4xl font-mono font-black text-white/15 select-none">
                    {item.number}
                  </span>
                </div>
              </div>

              {/* Subtle Red Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-red-600 group-hover:shadow-[0_0_10px_#E50914] z-10 transition-all"></div>

              {/* Clean bottom-right diagonal corner accent */}
              <div className="absolute bottom-3.5 right-7 w-5 h-px bg-red-600/50 rotate-45 pointer-events-none z-10" aria-hidden="true"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;