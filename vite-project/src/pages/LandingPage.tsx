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
    <div className="landing-page-container">
      <div 
        id="landing-page" 
        ref={containerRef} 
        className="landing-page"
      >
        {/* Background Noise & Overlay */}
        <div className="background-noise" />
        <div className="background-overlay" />
        
        {/* Time Display and Theme Toggle */}
        <div className="time-theme-container">
          {/* Year Display */}
          <div className="year-display">
            <div className="year-line" />
            <span>2024</span>
          </div>

          {/* Theme Toggle and Time Display */}
          <div className="theme-time-container">
            <ThemeToggle position="landing" />
            <div className="time-display">
              {[
                { city: 'STOCKHOLM', timeZone: 'stockholm' },
                { city: 'NEW YORK', timeZone: 'newYork' },
                { city: 'LONDON', timeZone: 'london' },
                { city: 'TOKYO', timeZone: 'tokyo' },
              ].map((location) => (
                <div key={location.city} className="time-item">
                  <Clock size={12} className="clock-icon" />
                  <span className="city-name">{location.city}</span>
                  <span className="time">{formatTime(times[location.timeZone])}</span>
                  <div className="time-line" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={textRef} className="main-content">
          <h1 className="main-title">
            <div className="title-nordic">
              <div className="title-nordic-inner">
                {nordicText.map((letter, index) => (
                  <span key={index} className="letter">{letter}</span>
                ))}
              </div>
            </div>
            <div className="title-code">
              <div className="title-code-inner">
                {codeText.map((letter, index) => (
                  <span key={index} className="letter">{letter}</span>
                ))}
              </div>
            </div>
          </h1>

          <div className="tagline-container">
            <p className="tagline">
              Crafting digital solutions with Nordic precision
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack">
          {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
            <span key={tech} className="tech-item">
              {tech}
            </span>
          ))}
        </div>

        {/* Side Links */}
        <div ref={sideLinksRef} className="side-links">
          <a
            href="https://github.com/nordiccodeworks"
            className="side-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="side-link-text">GITHUB</span>
            <Github size={18} className="side-link-icon" />
          </a>
          <a
            href="https://linkedin.com/company/nordiccodeworks"
            className="side-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="side-link-text">LINKEDIN</span>
            <Linkedin size={18} className="side-link-icon" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="scroll-indicator">
          <ArrowDown className="scroll-arrow" />
          <span className="scroll-text">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Extra space for scroll functionality */}
      <div className="extra-scroll-space">
        <p className="extra-scroll-text">Continue scrolling to explore...</p>
      </div>
    </div>
  );
};

export default LandingPage;
