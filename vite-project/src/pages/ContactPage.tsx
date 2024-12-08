// ContactPage.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import './ContactPage.css'; // Import the CSS file

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
    <div ref={containerRef} className="contact-page">
      {/* Background and Overlays */}
      <div className="background-overlay" />
      <div className="background-noise" />
      
      <div className="content-container">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="title">
            <div className="title-block">
              <div className="title-flex">
                {"nordic".split("").map((letter, index) => (
                  <span key={index} className="letter">{letter}</span>
                ))}
              </div>
            </div>
            <div className="title-block opacity-90">
              <div className="title-flex">
                {"((connect))".split("").map((letter, index) => (
                  <span key={index} className="letter text-accent-primary">{letter}</span>
                ))}
              </div>
            </div>
          </h1>
          <p className="subtitle">
            Ready to bring your vision to life?
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-sidebar">
            <div className="contact-card">
              <h3 className="contact-card-title">Connect With Us</h3>
              <div className="contact-links">
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
                    className="contact-link"
                  >
                    <item.icon className="contact-icon" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-card">
              <h3 className="contact-card-title">Office Hours</h3>
              <p className="contact-hours">
                Monday - Friday<br />
                9:00 AM - 5:00 PM CET
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="contact-form">
            <h3 className="contact-form-title">Quick Message</h3>
            <div className="contact-form-fields">
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="contact-input"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="contact-textarea"
              />
              <button className="contact-button">
                <span className="contact-button-content">
                  Send Message
                  <ArrowRight className="contact-button-icon" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <p className="scroll-text">Scroll to footer</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;