import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Prevent iOS Safari's address-bar show/hide from firing spurious resize-driven
// ScrollTrigger refreshes while the user scrolls — the standard fix for the
// intermittent mobile ScrollTrigger/pin glitches this causes.
ScrollTrigger.config({ ignoreMobileResize: true });

const skillCategories = [
  {
    title: 'Frontend Engineering',
    desc: 'Building responsive and interactive user interfaces using modern frontend technologies.',
    tag: 'UI / INTERACTION',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    title: 'Backend & APIs',
    desc: 'Developing backend services and REST APIs for modern web applications.',
    tag: 'API / SERVER',
    skills: ['FastAPI', 'Node.js', 'Python', 'PHP', 'REST API']
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Developing machine learning solutions to analyze data, identify patterns, and support predictive applications.',
    tag: 'INTELLIGENCE',
    skills: ['Python', 'Machine Learning', 'Predictive Models', 'Data Analysis']
  },
  {
    title: 'Database Development',
    desc: 'Designing and working with relational databases for reliable application data management.',
    tag: 'DATA / STORAGE',
    skills: ['MySQL', 'SQL', 'Database Design', 'CRUD']
  },
  {
    title: 'Programming & OOP',
    desc: 'Building structured applications and solving software problems using object-oriented and general programming concepts.',
    tag: 'PROGRAMMING / OOP',
    skills: ['Python', 'Java', 'JavaScript', 'PHP']
  },
  {
    title: 'Software Design & Systems',
    desc: 'Applying system analysis and software design concepts to plan and structure reliable software solutions.',
    tag: 'SYSTEMS / DESIGN',
    skills: ['System Analysis & Design', 'Software Design', 'Service-Oriented Computing']
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 768) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Defensive cleanup: if a desktop pinned ScrollTrigger instance for this
        // section is still active (e.g. a fast resize/orientation change crossed
        // the breakpoint before the desktop branch finished tearing down), kill it
        // now so its pin, pin-spacer, and inline transforms can never leak into
        // the mobile layout and leave cards stuck mid-3D-transform.
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current) st.kill();
        });

        // Fully reset every card/background/text element to plain CSS state first.
        // clearProps("all") — rather than the previous partial property list —
        // guarantees no residual x/y/z/rotation/scale/opacity/zIndex from the
        // desktop 3D carousel is left behind (zIndex in particular was never being
        // cleared before, which could leave one card stacked above its neighbors).
        cardsRef.current.forEach((card) => { if (card) gsap.set(card, { clearProps: "all" }); });
        bgRefs.current.forEach((bg) => { if (bg) gsap.set(bg, { clearProps: "all" }); });
        textRefs.current.forEach((txt) => { if (txt) gsap.set(txt, { clearProps: "all" }); });

        // Small entrance animation, then hand each card back to normal CSS flow —
        // no GSAP transform is left in place once it completes, so cards can never
        // remain stuck in an offset/overlapping state.
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 20, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: i === 0 ? 1 : 0.9,
              duration: 0.5,
              delay: i * 0.05,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                // Clear only the transform/positioning props that could ever cause
                // stacking; keep the intentional active/inactive scale + opacity
                // that is part of the existing card design.
                gsap.set(card, { clearProps: "x,y,z,rotation,rotationZ,position,zIndex" });
                gsap.set(card, { opacity: 1, scale: i === 0 ? 1 : 0.9 });
              }
            }
          );
        });

        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { opacity: i === 0 ? 1 : 0 });
        });

        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* Skills Section Header (static, non-animated — left-aligned, matches Expertise/Contact design language) */}
      <div className="absolute top-2 md:top-4 inset-x-0 z-20 px-6 md:px-12 pointer-events-none">
        <div className="max-w-6xl mx-auto flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[9px] md:text-[11px] leading-none font-mono font-bold uppercase tracking-widest text-white shadow-2xl whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping shrink-0"></span>
            <span className="text-red-500">EPISODE 03</span>
            <span className="text-white/40">|</span>
            <span>TECHNICAL SKILLS</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-white whitespace-nowrap">
            CORE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              SKILLS.
            </span>
          </h2>
        </div>
      </div>

      {/* Dynamic Netflix Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black"
        />
      ))}

      {/* Massive Background Typography (Netflix Red & White Outline) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)'}`,
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >
            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;