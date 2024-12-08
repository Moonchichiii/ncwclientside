// src/components/layout/Header.tsx
import { useState, useEffect, useRef, FC } from 'react';
import gsap from 'gsap';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: '#intro', label: 'Home' },
  { href: '#panel-1', label: 'Portfolio' },
  { href: '#panel-3', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const SocialLinks: FC = () => {
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = socialLinksRef.current?.querySelectorAll('.social-link');
    if (!links) return;

    const handlers: Array<{
      el: HTMLElement;
      handleMouseEnter: () => void;
      handleMouseLeave: () => void;
    }> = [];

    links.forEach((link) => {
      const el = link as HTMLElement;
      const enterAnimation = gsap.to(el, {
        scale: 1.1,
        duration: 0.2,
        paused: true,
      });

      const handleMouseEnter = () => enterAnimation.play();
      const handleMouseLeave = () => enterAnimation.reverse();

      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);

      // Store handlers for cleanup
      handlers.push({ el, handleMouseEnter, handleMouseLeave });
    });

    // Cleanup event listeners
    return () => {
      handlers.forEach(({ el, handleMouseEnter, handleMouseLeave }) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={socialLinksRef} className="flex items-center gap-4">
      <a
        href="https://github.com/nordiccodeworks"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link text-gray-300 hover:text-white transition-colors duration-300"
        aria-label="GitHub"
      >
        <Github size={20} strokeWidth={1.5} />
      </a>
      <a
        href="https://linkedin.com/company/nordiccodeworks"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link text-gray-300 hover:text-white transition-colors duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} strokeWidth={1.5} />
      </a>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animate header on mount
  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  // Logo hover animation
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const hoverAnimation = gsap.to(logo, {
      scale: 1.05,
      duration: 0.3,
      paused: true,
    });

    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => hoverAnimation.reverse();

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      mobileMenuRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
    );

    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.2 },
          index * 0.1
        );
      }
    });

    if (isMobileMenuOpen) {
      tl.play();
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isMobileMenuOpen]);

  // Menu button click animation
  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    gsap.to(menuButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <header
      id="masthead"
      ref={headerRef}
      className={`site-header fixed top-0 left-0 w-full z-50 opacity-0 transition-opacity duration-300 bg-black/80 backdrop-blur-md border-b border-white/20 shadow-lg ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center group" aria-label="Nordic Code Works">
            <div ref={logoRef} className="relative overflow-hidden font-mono tracking-tighter flex">
              <span className="text-2xl font-bold">
                <span className="text-accent-primary">nordic</span>
                <span className="text-accent-secondary">(</span>
                <span className="text-accent-tertiary">(</span>
                <span className="text-accent-primary">code</span>
                <span className="text-accent-tertiary">)</span>
                <span className="text-accent-primary"> works</span>
                <span className="text-accent-tertiary">)</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors duration-300 hover:text-white text-gray-300"
              >
                {item.label}
              </a>
            ))}
            <div className="pl-4 border-l border-white/10 flex items-center gap-4">
              <ThemeToggle position="header" />
              <SocialLinks />
            </div>
          </nav>

          <button
            ref={menuButtonRef}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
            onClick={handleMenuButtonClick}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-20"
        >
          <nav
            className="mx-4 rounded-xl bg-black/80 backdrop-blur-md shadow-lg border border-white/10 flex flex-col p-4 space-y-4"
            aria-label="Mobile navigation"
          >
            {navigationItems.map((item, index) => (
              <div
                key={item.href}
                ref={(el) => (menuItemsRef.current[index] = el)}
              >
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium transition-colors duration-300 hover:text-white text-gray-300"
                >
                  {item.label}
                </a>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <ThemeToggle position="header" />
              <SocialLinks />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
