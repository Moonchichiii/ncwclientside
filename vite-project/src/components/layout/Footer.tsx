// components/layout/Footer.tsx
import { useState, useRef, FC } from 'react';
import gsap from 'gsap';
import { Github, Linkedin } from 'lucide-react';
import PolicyModal from '../common/PolicyModal';
import { policies } from './policies.ts';

interface NavigationItem {
  href: string;
  label: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Github | typeof Linkedin;
}

const Footer: FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<{ title: string; content: string } | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const navigationItems: NavigationItem[] = [
    { href: '#intro', label: 'Home' },
    { href: '#panel-1', label: 'Portfolio' },
    { href: '#panel-3', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const legalLinks = [
    { path: 'terms', label: 'Terms of Service', key: 'terms' },
    { path: 'privacy', label: 'Privacy Policy', key: 'privacy' },
    { path: 'cookie-policy', label: 'Cookie Policy', key: 'cookies' },
  ];

  const socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: 'https://github.com/nordiccodeworks', icon: Github },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/nordiccodeworks', icon: Linkedin },
  ];

  // Footer entrance animation (moved to App.tsx gsap setup)
  const handlePolicyClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    setSelectedPolicy(policies[key as keyof typeof policies]);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative z-10">
      <footer 
        ref={footerRef} 
        className="bg-black/90 backdrop-blur-md py-8 sm:py-12 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {/* Company Description */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Nordic Code Works</h3>
              <p className="text-gray-300 text-sm sm:text-base max-w-xs">
                Crafting elegant digital solutions with Scandinavian simplicity.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Quick Links</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="anchor animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Legal</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {legalLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={(e) => handlePolicyClick(e, link.key)}
                    className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact and Social Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Connect</h3>
              <div className="flex flex-col items-center sm:items-start space-y-2">
                <a
                  href="mailto:contact@nordiccodeworks.com"
                  className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base break-all sm:break-normal"
                >
                  contact@nordiccodeworks.com
                </a>
                <div className="flex items-center gap-4 mt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200"
                      aria-label={`Visit our ${social.platform}`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-section border-t border-gray-700/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base">
            <p className="text-gray-400">© {currentYear} Nordic Code Works. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy?.title || ''}
        content={selectedPolicy?.content || ''}
      />
    </div>
  );
};

export default Footer;