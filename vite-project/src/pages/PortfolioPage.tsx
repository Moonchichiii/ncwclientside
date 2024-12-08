// src/pages/PortfolioPage.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panelsContainer = panelsRef.current;
    const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

    if (!panelsContainer) return;

    if (panels.length > 1) {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: panelsContainer,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          markers: false, // Enable for debugging
        }
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={containerRef} className="portfolio-container">
      <div ref={panelsRef} className="flex">
        <section className="portfolio-panel full-screen gradient-green">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <h1 className="text-6xl font-bold">Portfolio    it's here!!!!!!!!!!!!</h1>
          </div>
        </section>
       
        <section className="portfolio-panel full-screen gradient-blue">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <h2 className="text-4xl font-bold">Project222222 1</h2>
          </div>
        </section>
       
        <section className="portfolio-panel full-screen gradient-gray">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <h2 className="text-4xl font-bold">Project222222 2</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
