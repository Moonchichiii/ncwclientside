// HomePage.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe } from 'lucide-react';

import CookieConsent from '../components/common/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.title-letter', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out'
      });

      // Services cards animation
      gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-surface-darker text-mono-50 pt-20">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-dark opacity-30 z-0" />
      
      {/* Dot pattern overlay */}
      <div className="fixed inset-0 opacity-5 z-[1] pointer-events-none bg-noise" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8">
              {'nordic'.split('').map((letter, index) => (
                <span key={index} className="title-letter inline-block text-mono-50">{letter}</span>
              ))}
              <br />
              {'((code)=>works)'.split('').map((letter, index) => (
                <span key={index} className="title-letter inline-block text-accent-primary">{letter}</span>
              ))}
            </h1>
            <p className="text-2xl md:text-3xl text-mono-300">
              Crafting digital solutions with Nordic precision
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-mono-50">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code className="w-8 h-8" />,
                  title: 'Full-Stack Development',
                  color: 'accent-primary'
                },
                {
                  icon: <Database className="w-8 h-8" />,
                  title: 'Backend Architecture',
                  color: 'accent-secondary'
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: 'Frontend Design',
                  color: 'accent-tertiary'
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className={`service-card backdrop-blur-sm bg-surface-darker/50 border border-mono-800 rounded-lg p-8 hover:bg-surface-lighter/10 transition-all duration-300 text-${service.color}`}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-mono-50">{service.title}</h3>
                  <p className="mt-4 text-mono-300">
                    Tailored solutions meeting the highest standards of Nordic engineering excellence.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="text-center mt-20 mb-10">
          <p className="text-mono-400">Scroll down to explore our portfolio</p>
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default HomePage;
