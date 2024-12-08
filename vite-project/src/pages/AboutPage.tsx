// AboutPage.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Code, Heart, LineChart, Shield } from 'lucide-react';

interface AboutPageProps {
  pageNumber?: number;
}

const values = [
  {
    icon: <Code size={32} />,
    title: "Clean Code",
    description: "We believe in writing maintainable, scalable, and efficient code.",
  },
  {
    icon: <Shield size={32} />,
    title: "Security First",
    description: "Security is not an afterthought.",
  },
  {
    icon: <Heart size={32} />,
    title: "User Focused",
    description: "Exceptional user experiences from every line of code.",
  },
  {
    icon: <LineChart size={32} />,
    title: "Performance",
    description: "Optimized for blazing-fast performance.",
  },
];

const skills = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Architecture", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "DevOps & Cloud", level: 88 },
  { name: "Security", level: 92 },
];

const AboutPage: React.FC<AboutPageProps> = ({ pageNumber = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Letters animation
      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });

      // Skills animation
      if (pageNumber === 3) {
        gsap.from('.skill-bar', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [pageNumber]);

  // Content based on page number
  const renderContent = () => {
    switch (pageNumber) {
      case 1:
        const nordicText = 'nordic'.split('');
        const storyText = '((story))'.split('');
        return (
          <div className="text-center">
            <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
              <div className="block overflow-hidden">
                <div className="flex justify-center">
                  {nordicText.map((letter, index) => (
                    <span key={index} className="letter inline-block">{letter}</span>
                  ))}
                </div>
              </div>
              <div className="block opacity-90 overflow-hidden">
                <div className="flex justify-center">
                  {storyText.map((letter, index) => (
                    <span key={index} className="letter inline-block text-accent-primary">{letter}</span>
                  ))}
                </div>
              </div>
            </h1>
          </div>
        );

      case 2:
        return (
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="border border-mono-800 bg-surface-darker/50 backdrop-blur-sm p-8 rounded-lg hover:border-mono-700 transition-all"
                >
                  <div className="text-accent-primary mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-mono-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-4xl mx-auto px-4 w-full">
            <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-mono-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-mono-800 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-accent-primary rounded-full origin-left"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full flex items-center justify-center">
      {renderContent()}
    </div>
  );
};

export default AboutPage;