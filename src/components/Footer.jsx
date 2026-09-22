import React from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    handle: 'github.com/shaamil200420-create',
    href: 'https://github.com/shaamil200420-create',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.73.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.08.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/mohamed-shamil-08a61a439',
    href: 'https://www.linkedin.com/in/mohamed-shamil-08a61a439/',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM.5 8.98h4.96V23.5H.5V8.98zM8.98 8.98h4.76v1.98h.07c.66-1.25 2.28-2.57 4.7-2.57 5.03 0 5.96 3.31 5.96 7.62v8.49h-4.96v-7.53c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.89 1.96-2.89 3.98v7.66H8.98V8.98z" />
      </svg>
    )
  },
  {
    name: 'Email',
    handle: 'shaamil2004@gmail.com',
    href: 'mailto:shaamil2004@gmail.com',
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="M3 6l9 7 9-7" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    handle: '@xx_shamil_yy',
    href: 'https://www.instagram.com/xx_shamil_yy/',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-14 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">

        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]">
              SHAMIL<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
              // NETFLIX DEVELOPER SERIES &bull; SEASON 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-7 md:gap-8 text-[11px] font-mono font-semibold uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-wrap items-stretch gap-3 md:gap-0 md:justify-between md:max-w-[97%] text-xs font-mono text-white/60">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-3 h-[60px] px-4 bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(229,9,20,0.15)] transition-all duration-300"
            >
              <span className="w-10 h-10 rounded-md bg-red-600 text-white flex items-center justify-center shrink-0">
                {social.icon}
              </span>
              <span className="min-w-0 flex flex-col">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white leading-tight">
                  {social.name}
                </span>
                <span className="text-[10px] font-mono text-white/50 truncate max-w-[160px] leading-tight">
                  {social.handle}
                </span>
              </span>
            </a>
          ))}

          {/* Divider */}
          <div className="hidden sm:block w-px h-[60px] self-center bg-white/10 mx-1"></div>

          {/* Location Card */}
          <div className="flex items-center gap-3 h-[60px] px-4 bg-black/40 border border-white/10 rounded-lg">
            <span className="w-10 h-10 rounded-md bg-red-600 text-white flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <span className="min-w-0 flex flex-col">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white leading-tight">
                Location:
              </span>
              <span className="text-[10px] font-mono text-white/50 whitespace-nowrap leading-tight">
                Colombo, Sri Lanka
              </span>
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-7 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Shamil. All Rights Reserved.</p>
          <p className="text-red-500/80">STREAMING WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;