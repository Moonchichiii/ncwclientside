// components/ThemeToggle.tsx
import { FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import gsap from 'gsap';

interface ThemeToggleProps {
  className?: string;
  position?: 'header' | 'landing';
}

const ThemeToggle: FC<ThemeToggleProps> = ({ className, position = 'landing' }) => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    gsap.to(`.theme-icon-${isDark ? 'dark' : 'light'}`, {
      rotate: -180,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        html.classList.toggle('dark');
        gsap.from(`.theme-icon-${isDark ? 'light' : 'dark'}`, {
          rotate: 180,
          opacity: 0,
          duration: 0.3,
        });
      }
    });
  };

  const positionClasses = position === 'landing' 
    ? 'absolute top-8 right-36 z-50'
    : 'relative';

  return (
    <button
      onClick={toggleTheme}
      className={`${positionClasses} ${className} w-10 h-10 rounded-full flex items-center justify-center bg-mono-800/50 backdrop-blur-sm hover:bg-mono-700/50 transition-colors`}
      aria-label="Toggle theme"
    >
      <Sun className="theme-icon-light w-5 h-5 text-mono-50 absolute" />
      <Moon className="theme-icon-dark w-5 h-5 text-mono-50 absolute hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;