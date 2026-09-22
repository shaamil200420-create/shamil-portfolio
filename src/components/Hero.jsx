import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroPhoto from '../assets/Portfolio/hero-photo.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'FEATURE FILM // FULL-STACK ARCHITECT',
    'ORIGINAL SERIES // AI & ML SPECIALIST',
    'BLOCKBUSTER // DISTRIBUTED SYSTEMS',
    'ACCLAIMED // ALGORITHMIC PROBLEM SOLVER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-x-hidden lg:overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        @keyframes heroMobileFadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-mobile-fade-up {
          animation: heroMobileFadeUp 0.7s ease-out both;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee (giant marquee text hidden on mobile only — it crossed through readable content on small screens; desktop unchanged) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-auto lg:h-full flex flex-col justify-between pt-6 lg:pt-24 pb-12">

        {/* ===== DESKTOP HERO CONTENT (lg and up) — untouched, exact original markup/animation ===== */}
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:h-full lg:flex-1">

        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold tracking-wider">NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">FULL-STACK 4K</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI / ML CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">TOP 1%</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Software Engineer & Problem Solver</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              I AM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                SHAMIL
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-xs font-mono text-red-400 font-bold">
              <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-500 shrink-0 whitespace-nowrap">99.9% Uptime</span>
              <span className="text-white/40">•</span>
              <span className="whitespace-nowrap">React • JavaScript • Python</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 whitespace-nowrap">MySQL • ML</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              I build full-stack applications and intelligent AI systems, turning ideas and real-world problems into practical software.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={heroPhoto}
                  alt="Shamil"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="relative w-[272px] h-[264.3125px] p-5 bg-black/80 backdrop-blur-2xl border border-red-600/30 rounded-xl shadow-[0_0_45px_rgba(229,9,20,0.15)] overflow-hidden text-left flex flex-col">
              {/* Ambient red corner glow */}
              <div className="absolute -top-10 -right-8 w-32 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* HUD decorative dot-grid (top-right) */}
              <div
                className="absolute top-3.5 right-3.5 w-7 h-6 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(229,9,20,0.9) 1px, transparent 1.2px)',
                  backgroundSize: '6px 6px'
                }}
                aria-hidden="true"
              ></div>

              {/* Heading Row */}
              <div className="relative flex items-center gap-2.5 mb-5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 shadow-[0_0_8px_rgba(229,9,20,0.9)]"></span>
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] font-extrabold whitespace-nowrap">
                  <span className="text-white/90">Current</span> <span className="text-red-500">Focus</span>
                </h3>
                <span className="w-12 h-px bg-gradient-to-r from-red-600/60 to-transparent shrink-0"></span>
              </div>

              {/* Focus Items */}
              <div className="relative flex-1 flex flex-col justify-center gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="18 16 22 12 18 8" />
                      <polyline points="6 8 2 12 6 16" />
                      <line x1="14.5" y1="4" x2="9.5" y2="20" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">Full-Stack Development</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Building modern, scalable web applications</div>
                  </div>
                </div>

                <div className="ml-12 h-px bg-red-600/15"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="6" y="6" width="12" height="12" rx="1.5" />
                      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
                      <line x1="12" y1="2" x2="12" y2="4" />
                      <line x1="12" y1="20" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="4" y2="12" />
                      <line x1="20" y1="12" x2="22" y2="12" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">Machine Learning</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Turning data into real-world solutions</div>
                  </div>
                </div>

                <div className="ml-12 h-px bg-red-600/15"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      aria-hidden="true"
                    >
                      <path d="M12 3l1.4 5.2L19 10l-5.6 1.8L12 17l-1.4-5.2L5 10l5.6-1.8L12 3z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">AI-Powered Applications</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Exploring the next generation of intelligent systems</div>
                  </div>
                </div>
              </div>

              {/* Bottom-right diagonal HUD accent */}
              <div className="absolute bottom-2 right-2 w-5 h-px bg-red-600/70 rotate-45 pointer-events-none" aria-hidden="true"></div>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>

        </div>
        {/* ===== END DESKTOP HERO CONTENT ===== */}

        {/* ===== MOBILE HERO CONTENT (below lg) — natural vertical flow, redesigned for small screens ===== */}
        <div className="lg:hidden hero-mobile-fade-up flex flex-col gap-y-5 py-2">

          {/* 1. SHAMIL • + HIRE ME top row */}
          <div className="flex items-center justify-between w-full">
            <div className="text-xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
              SHAMIL<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] active:scale-95"
            >
              Hire Me
            </a>
          </div>

          {/* 2. Netflix Developer Series badge — allowed to wrap naturally, readable mobile size */}
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3.5 py-2 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[10px] font-mono uppercase tracking-widest text-white shadow-2xl w-fit max-w-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0"></span>
            <span className="text-red-500 font-bold tracking-wider">NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>

          {/* 3. TOP 1% / role */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse shrink-0">TOP 1%</span>
            <span className="text-white/80 text-[11px] font-mono tracking-widest uppercase">Software Engineer &amp; Problem Solver</span>
          </div>

          {/* 4. I AM SHAMIL */}
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
            I AM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
              SHAMIL
            </span>
          </h1>

          {/* 5. Description — full mobile width, exact original text */}
          <p className="text-sm text-white/80 font-light leading-relaxed w-full drop-shadow">
            I build full-stack applications and intelligent AI systems, turning ideas and real-world problems into practical software.
          </p>

          {/* 6. Technology row — allowed to wrap across 2 lines, readable size */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-mono font-bold">
            <span className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-500 shrink-0 whitespace-nowrap">99.9% Uptime</span>
            <span className="text-white/90 whitespace-nowrap">React</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90 whitespace-nowrap">JavaScript</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90 whitespace-nowrap">Python</span>
            <span className="text-white/30">•</span>
            <span className="text-white/70 whitespace-nowrap">MySQL</span>
            <span className="text-white/30">•</span>
            <span className="text-white/70 whitespace-nowrap">ML</span>
          </div>

          {/* 7. CTA buttons — equal width, minimum 44px touch height, single-line labels */}
          <div className="flex items-stretch gap-2.5 pt-1">
            <a
              href="#projects"
              className="flex-1 min-h-[44px] px-2 bg-white text-black font-bold text-[10px] sm:text-[11px] uppercase tracking-wide rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center justify-center gap-1 whitespace-nowrap active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              View Projects
            </a>
            <a
              href="#contact"
              className="flex-1 min-h-[44px] px-2 bg-neutral-900/80 text-white border border-white/20 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center justify-center gap-1 whitespace-nowrap active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Contact Me
            </a>
          </div>

          {/* 8. Portrait card — centered, smaller than desktop, same cinematic styling */}
          <div className="flex justify-center pt-3">
            <div className="relative group w-[78vw] max-w-[280px]">
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90"></div>
              <div className="relative w-full p-3 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                <div className="absolute top-5 left-5 z-30 px-2.5 py-1 bg-red-600 text-white font-mono text-[9px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>
                <img
                  src={heroPhoto}
                  alt="Shamil"
                  className="w-full aspect-[280/330] object-cover rounded-xl filter contrast-125 brightness-105"
                />
              </div>
            </div>
          </div>

          {/* 9. Current Focus — full mobile width, safe side margins, unchanged content */}
          <div className="w-full pt-2">
            <div className="relative w-full p-5 bg-black/80 backdrop-blur-2xl border border-red-600/30 rounded-xl shadow-[0_0_45px_rgba(229,9,20,0.15)] overflow-hidden text-left flex flex-col">
              <div className="absolute -top-10 -right-8 w-32 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

              <div
                className="absolute top-3.5 right-3.5 w-7 h-6 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(229,9,20,0.9) 1px, transparent 1.2px)',
                  backgroundSize: '6px 6px'
                }}
                aria-hidden="true"
              ></div>

              <div className="relative flex items-center gap-2.5 mb-5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 shadow-[0_0_8px_rgba(229,9,20,0.9)]"></span>
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] font-extrabold whitespace-nowrap">
                  <span className="text-white/90">Current</span> <span className="text-red-500">Focus</span>
                </h3>
                <span className="w-12 h-px bg-gradient-to-r from-red-600/60 to-transparent shrink-0"></span>
              </div>

              <div className="relative flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="18 16 22 12 18 8" />
                      <polyline points="6 8 2 12 6 16" />
                      <line x1="14.5" y1="4" x2="9.5" y2="20" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">Full-Stack Development</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Building modern, scalable web applications</div>
                  </div>
                </div>

                <div className="ml-12 h-px bg-red-600/15"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="6" y="6" width="12" height="12" rx="1.5" />
                      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
                      <line x1="12" y1="2" x2="12" y2="4" />
                      <line x1="12" y1="20" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="4" y2="12" />
                      <line x1="20" y1="12" x2="22" y2="12" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">Machine Learning</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Turning data into real-world solutions</div>
                  </div>
                </div>

                <div className="ml-12 h-px bg-red-600/15"></div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
                    <svg
                      className="w-5 h-5 text-red-500 drop-shadow-[0_0_4px_rgba(229,9,20,0.7)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      aria-hidden="true"
                    >
                      <path d="M12 3l1.4 5.2L19 10l-5.6 1.8L12 17l-1.4-5.2L5 10l5.6-1.8L12 3z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white leading-snug">AI-Powered Applications</div>
                    <div className="text-[11px] text-white/60 font-light leading-snug mt-0.5">Exploring the next generation of intelligent systems</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 w-5 h-px bg-red-600/70 rotate-45 pointer-events-none" aria-hidden="true"></div>
            </div>
          </div>

          {/* Bottom cinematic ticker */}
          <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50 tracking-widest uppercase pt-1 pb-2">
            <span>ENGINEERED FOR SCALABILITY</span>
            <span>[ PORTFOLIO RELEASE v2.6 ]</span>
          </div>

        </div>
        {/* ===== END MOBILE HERO CONTENT ===== */}

      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR (desktop only — mobile has its own top row inside the mobile content flow above) --- */}
      <header className="hidden lg:flex absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
          SHAMIL<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-red-500 transition-colors">About</a>
          <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  );
};

export default Hero;