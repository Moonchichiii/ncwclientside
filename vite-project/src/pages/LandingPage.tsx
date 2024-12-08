// LandingPage.tsx
import { FC, useEffect, useRef, useState } from 'react';
import { ArrowDown, Clock, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';

import ThemeToggle from '../components/common/ThemeToggle';

const LandingPage: FC = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const sideLinksRef = useRef<HTMLDivElement>(null);

  const nordicText = 'nordic'.split('');
  const codeText = '((code) => works)'.split('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        stockholm: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' })),
        newYork: new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })),
        london: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })),
        tokyo: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date?: Date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // GSAP animations for the landing page
  useEffect(() => {
    gsap.set('.letter', { y: 50, opacity: 0 });
    gsap.set('.tagline, .scroll-indicator', { y: 30, opacity: 0 });
    gsap.set(sideLinksRef.current, { opacity: 0, x: -20 });

    const tl = gsap.timeline();

    tl.to('.letter', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
    })
      .to(
        '.tagline',
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .to(
        scrollIndicatorRef.current,
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      .to(
        sideLinksRef.current,
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.5 },
        '-=0.8'
      );

    return () => tl.kill();
  }, []);

   return (
    <div className="min-h-[150vh] flex flex-col items-center justify-center">
      <div 
        id="landing-page" 
        ref={containerRef} 
        className="bg-gradient-tekhelet dark:bg-gradient-dark text-mono-50 overflow-hidden min-h-screen relative flex flex-col items-center justify-center w-full"
      >
        {/* Background Noise & Overlay */}
        <div className="absolute inset-0 bg-noise opacity-5" />
        <div className="absolute inset-0 bg-gradient-dark from-surface-darker via-tekhelet-dark to-tekhelet-base dark:from-mono-950 dark:via-surface-darker dark:to-tekhelet-dark opacity-30 z-0" />
        
        {/* Time Display and Theme Toggle */}
        <div className="absolute top-8 left-0 right-0 flex justify-between px-6">
          {/* Year Display */}
          <div className="flex items-center gap-2 text-xs">
            <div className="w-8 h-[1px] bg-mono-50 opacity-20" />
            <span>2024</span>
          </div>

          {/* Theme Toggle and Time Display */}
          <div className="flex items-center gap-8">
            <ThemeToggle position="landing" />
            <div className="hidden sm:flex items-center gap-6 text-xs">
              {[
                { city: 'STOCKHOLM', timeZone: 'stockholm' },
                { city: 'NEW YORK', timeZone: 'newYork' },
                { city: 'LONDON', timeZone: 'london' },
                { city: 'TOKYO', timeZone: 'tokyo' },
              ].map((location) => (
                <div key={location.city} className="flex items-center gap-2">
                  <Clock size={12} className="text-mono-300 dark:text-mono-400" />
                  <span className="text-mono-300 dark:text-mono-400 font-medium">{location.city}</span>
                  <span className="text-mono-50 font-mono font-medium">{formatTime(times[location.timeZone])}</span>
                  <div className="w-8 h-[1px] bg-mono-300 dark:bg-mono-400 opacity-30" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={textRef} className="text-center w-full max-w-[90vw] mx-auto mb-8">
          <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-mono leading-none tracking-tighter mb-4">
            <div className="block text-mono-50 dark:text-mono-100 overflow-hidden">
              <div className="flex justify-center">
                {nordicText.map((letter, index) => (
                  <span key={index} className="letter inline-block">{letter}</span>
                ))}
              </div>
            </div>
            <div className="block text-accent-primary dark:text-accent-secondary opacity-90 overflow-hidden">
              <div className="flex justify-center">
                {codeText.map((letter, index) => (
                  <span key={index} className="letter inline-block">{letter}</span>
                ))}
              </div>
            </div>
          </h1>

          <div className="overflow-hidden">
            <p className="tagline text-base sm:text-xl md:text-2xl text-mono-200 dark:text-mono-300 max-w-3xl mx-auto font-light">
              Crafting digital solutions with Nordic precision
            </p>
          </div>
        </div>

        {/* Add this after the tagline div and before the Side Links */}
{/* Tech Stack */}
<div className="flex flex-wrap justify-center gap-2 px-4 mb-8 landscape:mb-4 landscape:gap-1.5">
{['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
  <span
    key={tech}
    className="tech-item text-xs px-3 py-1 rounded-full 
      border border-mono-300/20 dark:border-mono-400/20 
      text-mono-300 dark:text-mono-400 
      hover:border-mono-300/40 dark:hover:border-mono-400/40 
      hover:text-mono-200 dark:hover:text-mono-300
      transition-colors landscape:text-xs landscape:px-2 landscape:py-0.5
      bg-surface-darker/10 dark:bg-surface-darker/20"
  >
    {tech}
  </span>
))}
</div>

        {/* Side Links */}
        <div
          ref={sideLinksRef}
          className="absolute bottom-12 left-4 flex flex-col gap-6 text-xs"
        >
          <a
            href="https://github.com/nordiccodeworks"
            className="text-mono-300 hover:text-mono-50 dark:text-mono-400 dark:hover:text-mono-100 transition-colors flex flex-row items-end"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="transform rotate-90 origin-bottom-left mb-1">GITHUB</span>
            <Github size={18} className="ml-1" />
          </a>
          <a
            href="https://linkedin.com/company/nordiccodeworks"
            className="text-mono-300 hover:text-mono-50 dark:text-mono-400 dark:hover:text-mono-100 transition-colors flex flex-row items-end"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="transform rotate-90 origin-bottom-left mb-1">LINKEDIN</span>
            <Linkedin size={18} className="ml-1" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="scroll-indicator absolute bottom-6 w-full left-0 right-0 flex flex-col items-center gap-2"
        >
          <ArrowDown className="animate-bounce text-mono-50 dark:text-mono-100 w-5 mx-auto" />
          <span className="text-xs uppercase tracking-widest text-mono-300 dark:text-mono-400 font-medium text-center w-full">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Extra space for scroll functionality */}
      <div className="h-[50vh] bg-gradient-dark from-tekhelet-base to-surface-darker dark:from-mono-950 dark:to-surface-darker flex items-center justify-center">
        <p className="text-xl text-mono-300 dark:text-mono-400">Continue scrolling to explore...</p>
      </div>
    </div>
  );
};

export default LandingPage;