// ContactPage.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.letter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.out',
      });

      gsap.from('.contact-form', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: 0.4,
      });

      gsap.from('.contact-sidebar', {
        opacity: 0,
        x: 20,
        duration: 0.6,
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-surface-darker text-mono-50 pt-20">
      {/* Background and Overlays */}
      <div className="fixed inset-0 bg-gradient-dark from-surface-darker via-tekhelet-dark to-tekhelet-base opacity-30 z-0" />
      <div className="fixed inset-0 bg-noise opacity-5 z-[1]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16 pt-20">
          <h1 className="text-[10vw] md:text-[8vw] font-mono leading-none mb-8 tracking-tighter">
            <div className="block overflow-hidden">
              <div className="flex justify-center">
                {"nordic".split("").map((letter, index) => (
                  <span key={index} className="letter inline-block">{letter}</span>
                ))}
              </div>
            </div>
            <div className="block opacity-90 overflow-hidden">
              <div className="flex justify-center">
                {"((connect))".split("").map((letter, index) => (
                  <span key={index} className="letter inline-block text-accent-primary">{letter}</span>
                ))}
              </div>
            </div>
          </h1>
          <p className="text-2xl md:text-3xl text-mono-300 max-w-3xl mx-auto font-light">
            Ready to bring your vision to life?
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          {/* Contact Info */}
          <div className="contact-sidebar space-y-12">
            <div className="backdrop-blur-md p-8 rounded-2xl border border-mono-800/50 bg-surface-darker/50">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: 'contact@nordiccodeworks.com', href: 'mailto:contact@nordiccodeworks.com' },
                  { icon: Github, text: 'GitHub', href: 'https://github.com/nordiccodeworks' },
                  { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/company/nordiccodeworks' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-mono-300 hover:text-mono-50 transition-colors p-4 rounded-lg hover:bg-white/5"
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-md p-8 rounded-2xl border border-mono-800/50 bg-surface-darker/50">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <p className="text-mono-300">
                Monday - Friday<br />
                9:00 AM - 5:00 PM CET
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="contact-form backdrop-blur-md p-8 rounded-2xl border border-mono-800/50 bg-surface-darker/50">
            <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-surface-darker/30 border border-mono-800/50 rounded-xl px-6 py-4 text-mono-50 placeholder:text-mono-400 focus:outline-none focus:border-mono-700"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-surface-darker/30 border border-mono-800/50 rounded-xl px-6 py-4 text-mono-50 placeholder:text-mono-400 focus:outline-none focus:border-mono-700"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-surface-darker/30 border border-mono-800/50 rounded-xl px-6 py-4 text-mono-50 placeholder:text-mono-400 focus:outline-none focus:border-mono-700"
              />
              <button className="w-full group relative overflow-hidden rounded-xl bg-accent-primary px-8 py-4 text-surface-darker font-medium">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-20">
          <p className="text-mono-400">Scroll to footer</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;