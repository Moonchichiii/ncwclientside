// App.tsx
import { FC, lazy, Suspense } from 'react';
import { useGSAPSetup } from './hooks/gsap-init';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const Header = lazy(() => import('./components/layout/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));

const App: FC = () => {
  useGSAPSetup();

  return (
    <div id="page" className="site">
      <header id="masthead" className="site-header fixed top-0 left-0 w-full z-50 opacity-0 transition-opacity duration-300">
        <nav className="anchor-nav p-4 bg-black/80 backdrop-blur-sm flex flex-wrap gap-2 md:gap-4">
    <Header />
        </nav>
      </header>

      <main id="content" className="site-content" role="main">
        {/* Landing Section */}
        <section id="intro" className="full-screen">
          <LandingPage />
        </section>

        {/* Home Section */}
        <section id="home" className="full-screen">
          <HomePage />
        </section>

        {/* Horizontal Panels Section */}
        <section id="panels">
          <div id="panels-container" style={{ width: '500%' }}>
            {/* Portfolio Panels */}
            <article id="panel-1" className="panel full-screen gradient-green">
              <div className="portfolio-section">
                <PortfolioPage />
              </div>
            </article>
            
            <article id="panel-2" className="panel full-screen gradient-blue">
              <div className="portfolio-section">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <h2 className="text-4xl font-bold">Project 2</h2>
                </div>
              </div>
            </article>

            {/* About Panels */}
            <article id="panel-3" className="panel full-screen gradient-green">
              <div className="about-section">
                <AboutPage />
              </div>
            </article>

            <article id="panel-4" className="panel full-screen gradient-blue">
              <div className="about-section">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <h2 className="text-4xl font-bold">More About</h2>
                </div>
              </div>
            </article>

            <article id="panel-5" className="panel full-screen gradient-green">
              <div className="about-section">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <h2 className="text-4xl font-bold">Experience</h2>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="full-screen">
          <ContactPage />
        </section>
      </main>

      <footer id="footer" className="w-full bg-black text-white p-8">
        <div className="container mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default App;