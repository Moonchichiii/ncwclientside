import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.portfolio-panel');
    const panelsContainer = panelsRef.current;
    
    if (!panelsContainer) return;
    
    const horizontalScroll = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: panelsContainer,
        pin: true,
        scrub: true,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
      },
    });

    return () => {
      horizontalScroll.kill();
    };
  }, []);

  return (
    <div className="portfolio-container">
      <section className="horizontal-section bg-black">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h1 className="text-6xl font-bold">Portfolio</h1>
        </div>
      </section>
      
      <section className="horizontal-section bg-gray-900">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h2 className="text-4xl font-bold">Project 1</h2>
        </div>
      </section>
      
      <section className="horizontal-section bg-gray-800">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h2 className="text-4xl font-bold">Project 2</h2>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;