import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGSAPSetup = () => {
  useEffect(() => {
    // Get all panels and container
    const panelsSection = document.querySelector("#panels");
    const panelsContainer = document.querySelector("#panels-container");
    const header = document.querySelector("#masthead");
    
    if (!panelsSection || !panelsContainer || !header) return;

    // Header Animation with pinning after Home section
    ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      endTrigger: "#contact",
      end: "bottom bottom",
      onEnter: () => {
        gsap.to(header, {
          opacity: 1,
          duration: 0.3
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          opacity: 0,
          duration: 0.3
        });
      }
    });

    // Panels Animation
    const panels = gsap.utils.toArray(".panel");
    const tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.1 }
        },
        end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth)
      }
    });

    // Navigation clicks
    document.querySelectorAll(".anchor").forEach(anchor => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const targetElem = document.querySelector(target.getAttribute("href") || "");
        
        if (!targetElem) return;

        let y = targetElem;
        if (targetElem && panelsContainer.contains(targetElem)) {
          const totalScroll = tween.scrollTrigger?.end! - tween.scrollTrigger?.start!;
          const totalMovement = (panels.length - 1) * targetElem.offsetWidth;
          y = Math.round(tween.scrollTrigger?.start! + (targetElem.offsetLeft / totalMovement) * totalScroll);
        }

        gsap.to(window, {
          scrollTo: {
            y: y,
            autoKill: false
          },
          duration: 1
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};