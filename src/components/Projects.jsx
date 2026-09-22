import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import crictalentaiThumbnail from '../assets/projects/crictalentai-banner.png';
import galleryCafeThumbnail from '../assets/projects/gallery-cafe-banner.png';
import heartDiseaseThumbnail from '../assets/Portfolio/heart-disease-banner.png';
import heartDiseaseFullPreview from '../assets/projects/heart-disease-full.png';
import dogFoodThumbnail from '../assets/Portfolio/dogfood-banner.png';

gsap.registerPlugin(ScrollTrigger);

// Replace each entry below with your own real projects (keep exactly 6 items — the layout above is built around that count)
const projectsData = [
  {
    title: "CricTalentAI",
    category: "AI / Machine Learning",
    description: "AI-powered cricket talent scouting and performance prediction platform for U19 T20 players.",
    tags: ["React", "FastAPI", "MySQL", "Machine Learning"],
    episode: "S01 E01",
    github: "https://github.com/shaamil200420-create/CricTalentAI",
    thumbnail: crictalentaiThumbnail,
    internalHeader: true
  },
  {
    title: "Heart Disease Prediction",
    category: "Machine Learning / Healthcare",
    description: "Machine-learning heart disease prediction system with model comparison and a Flask web interface.",
    tags: ["Python", "Flask", "scikit-learn", "Pandas"],
    episode: "S01 E02",
    github: "https://github.com/shaamil200420-create/Computational-Intelligence",
    thumbnail: heartDiseaseThumbnail,
    previewImage: heartDiseaseFullPreview
  },
  {
    title: "DogFood Mobile App",
    category: "Android / Mobile",
    description: "Native Android e-commerce app for browsing dog food, cart, checkout, reviews, and order history.",
    tags: ["Java", "Android", "SQLite", "Picasso"],
    episode: "S01 E03",
    github: "https://github.com/shaamil200420-create/dogfood-mobile-app",
    thumbnail: dogFoodThumbnail
  },
  {
    title: "Gallery Cafe",
    category: "Full-Stack / Web",
    description: "Full-stack restaurant website with menus, table reservations, food ordering, and admin/staff management.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    episode: "S01 E04",
    github: "https://github.com/shaamil200420-create/gallery-cafe",
    thumbnail: galleryCafeThumbnail
  },
  {
    title: "Ocean View Resort",
    category: "Java / Full-Stack",
    description: "Java hotel reservation system with staff authentication, automated billing, guest lookup, and reservation management.",
    tags: ["Java", "MSSQL", "Maven", "HTML/CSS"],
    episode: "S01 E05",
    github: "https://github.com/shaamil200420-create/ocean-view-resort"
  },
  {
    title: "[Project Six]",
    category: "Competitive Programming",
    description: "Replace with a short description of algorithmic or DSA work.",
    tags: ["Data Structures", "Algorithms", "C++", "JavaScript"],
    episode: "S01 E06"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);
  const [previewProject, setPreviewProject] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Desktop Featured Projects: 2 columns x 2 rows grid for 4 cards
      const getGridPos = (index) => {
        const row = Math.floor(index / 2); // 0 (top) or 1 (bottom)
        const col = index % 2; // 0 (left) or 1 (right)
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
          opacity: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              fastScrollEnd: true,
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Cinematic pause — timing spacer replacing the removed folder-open tween
          // (kept as a no-op tween so every downstream "-=" offset below resolves to the exact same absolute time as before)
          tl.to({}, { duration: 0.8 });

          // 2. Cards fade in and rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards spread out into a clean 2-column x 2-row grid
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const horizontalGap = 32;
              const { col } = getGridPos(i);
              return (col - 0.5) * (w + horizontalGap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const verticalGap = 30;
              const { row } = getGridPos(i);
              return (row - 0.5) * (h + verticalGap);
            },
            rotation: () => gsap.utils.random(-2, 2),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          // Simple, usability-first entrance: subtle fade-in + small rise + gentle scale-up,
          // then a normal native horizontal swipe/scroll-snap carousel (no permanent stacking/fanning).
          mobileCardsRef.current.forEach((card) => {
            if (card) gsap.set(card, { y: 24, scale: 0.96, opacity: 0 });
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
            }
          }).to(mobileCardsRef.current, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // CricTalentAI PREVIEW lightbox — Escape-to-close and background-scroll lock while open
  useEffect(() => {
    if (!previewProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewProject(null);
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewProject]);

  const featuredDesktopProjects = projectsData.slice(0, 4);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[1000px] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-20 select-none">

      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind the card stack */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] md:w-[70vw] md:h-[70vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Featured Projects header (desktop only), independent absolutely-positioned sibling */}
      <div className="hidden md:flex absolute top-[calc(50%_-_470px)] flex-col items-start z-20" style={{ left: 'calc(50vw - min(45vw, 700px) - 16px)', width: 'calc(2 * min(45vw, 700px) + 32px)' }}>
        <div className="w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[9px] font-mono font-bold uppercase tracking-widest text-white shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500">EPISODE 04</span>
            <span className="text-white/40">|</span>
            <span>PROJECT SHOWCASE</span>
          </div>
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-white/50 hover:text-red-500 transition-colors duration-200 cursor-default">
            Explore All Projects &rarr;
          </span>
        </div>
        <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tighter text-white">
          FEATURED{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
            PROJECTS
          </span>
        </h2>
      </div>

      {/* Mobile Projects Header + Swipeable Carousel — natural document flow (redesigned for phone-first polish) */}
      <div className="md:hidden relative z-20 w-full max-w-[520px] mx-auto flex flex-col items-start">

        {/* Mobile header — mirrors desktop badge + heading, left-aligned with card margin */}
        <div className="w-full px-4 flex flex-col items-start gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[9px] font-mono font-bold uppercase tracking-widest text-white shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500">EPISODE 04</span>
            <span className="text-white/40">|</span>
            <span>PROJECT SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-tight">
            FEATURED{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_20px_rgba(229,9,20,0.4)]">
              PROJECTS
            </span>
          </h2>
        </div>

        {/* Swipeable one-card-at-a-time carousel — same visual language as desktop, scaled for phones */}
        <div
          ref={mobileCarouselRef}
          className="w-full mt-8 flex items-stretch gap-4 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar touch-pan-x"
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          {featuredDesktopProjects.map((project, i) => (
            <div
              key={`mob-${i}`}
              ref={el => mobileCardsRef.current[i] = el}
              className="shrink-0 w-[88vw] max-w-[400px] h-[420px] snap-center will-change-transform"
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl flex flex-col shadow-[0_20px_45px_rgba(0,0,0,0.85)]">

                {/* Preview / Screenshot area — ~60% of card height */}
                <div className="relative w-full h-[60%] shrink-0 bg-gradient-to-br from-[#1c1c1c] via-[#131313] to-[#0a0a0a] border-b border-white/10 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} preview`}
                      className={`absolute inset-0 w-full h-full object-cover ${project.internalHeader ? 'object-[center_20%]' : project.title === 'Gallery Cafe' ? 'object-top' : 'object-center'}`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/15">Preview</span>
                    </div>
                  )}
                  {!project.thumbnail && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                        {project.episode}
                      </span>
                    </div>
                  )}
                  {project.thumbnail ? (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewProject(project); }}
                        aria-label={`Preview ${project.title} banner image`}
                        className="flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded px-2 py-1 leading-none text-[10px] font-mono font-bold tracking-widest uppercase text-white/70 active:text-red-500 active:border-red-600/50 transition-colors duration-200"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Preview
                      </button>
                      <span className="text-[10px] font-mono border border-white/30 px-1.5 py-1 text-white/70 bg-black/50 backdrop-blur-sm">HD</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono border border-white/30 px-1.5 py-1 text-white/70">HD</span>
                    </div>
                  )}
                </div>

                {/* Info section — remaining ~40% of card height */}
                <div className="flex-1 min-h-0 p-3.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white tracking-tight leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light leading-snug line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="flex items-center justify-center gap-1.5 w-full min-h-[40px] bg-black/40 border border-red-600/40 rounded px-3 py-2 leading-none text-[11px] font-mono font-bold tracking-widest uppercase text-white active:border-red-600 active:bg-red-600/10 transition-colors duration-200"
                      >
                        View Project
                        <span className="text-red-500">&rarr;</span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5 w-full min-h-[40px] bg-black/20 border border-white/10 rounded px-3 py-2 leading-none text-[11px] font-mono font-bold tracking-widest uppercase text-white/30">
                        View Project
                        <span className="text-white/20">&rarr;</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Perspective Container (desktop grid host — empty on mobile since all cards inside are hidden md:block, so it is hidden on mobile to let the natural-flow mobile header+carousel below lay out cleanly) */}
      <div className="mt-12 relative w-full max-w-7xl h-full hidden md:flex items-center justify-center perspective-[2000px] z-10">

        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">

          {/* Desktop Project Cards — wide/flat hybrid: preview dominant, compact info below */}
          {featuredDesktopProjects.map((project, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[45vw] max-w-[700px] h-[340px] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 flex flex-col">

                {/* Preview / Screenshot area — ~55% of card height, minus header row when present */}
                <div className={`relative w-full h-[70%] shrink-0 bg-gradient-to-br from-[#1c1c1c] via-[#131313] to-[#0a0a0a] border-b border-white/10 overflow-hidden`}>
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} preview`}
                      className={`absolute inset-0 w-full h-full object-cover ${project.internalHeader ? 'object-[center_20%]' : project.title === 'Gallery Cafe' ? 'object-top' : 'object-center'}`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/15">Preview</span>
                    </div>
                  )}
                  {!project.thumbnail && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                        {project.episode}
                      </span>
                    </div>
                  )}
                  {project.thumbnail ? (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewProject(project); }}
                        aria-label={`Preview ${project.title} banner image`}
                        className="flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded px-1.5 py-0.5 leading-none text-[9px] font-mono font-bold tracking-widest uppercase text-white/70 hover:text-red-500 hover:border-red-600/50 transition-colors duration-200 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Preview
                      </button>
                      <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70 bg-black/50 backdrop-blur-sm">HD</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                    </div>
                  )}
                </div>

                {/* Compact Info Section — remaining ~45% of card height */}
                <div className="flex-1 min-h-0 p-2.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-white/70 font-light leading-snug line-clamp-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tech Tags + Arrow */}
                  <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="flex items-center gap-1 shrink-0 bg-black/40 border border-red-600/40 rounded px-2 py-1 leading-none text-[9px] font-mono font-bold tracking-widest uppercase text-white hover:border-red-600 hover:bg-red-600/10 transition-colors duration-200 cursor-pointer"
                      >
                        View Project
                        <span className="text-red-500 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 shrink-0 bg-black/20 border border-white/10 rounded px-2 py-1 leading-none text-[9px] font-mono font-bold tracking-widest uppercase text-white/30">
                        View Project
                        <span className="text-white/20">&rarr;</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CricTalentAI PREVIEW Lightbox — portaled to document.body so it always renders truly fullscreen, */}
      {/* escaping the GSAP transform/perspective ancestors above (which would otherwise re-anchor position:fixed) */}
      {previewProject && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} banner preview`}
          onClick={() => setPreviewProject(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6 md:p-12"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreviewProject(null); }}
            aria-label="Close preview"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 flex items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 hover:text-red-500 hover:border-red-600/50 transition-colors duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={previewProject.previewImage || previewProject.thumbnail}
            alt={`${previewProject.title} full banner preview`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full w-auto h-auto object-contain select-none"
          />
        </div>,
        document.body
      )}

    </section>
  );
};

export default Projects;
