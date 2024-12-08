// App.tsx
import { FC } from 'react';
import { useGSAPSetup } from './hooks/gsap-init';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App: FC = () => {
  useGSAPSetup();

  return (
    <div id="page" className="relative min-h-screen">
      <Header />

      <div className="relative z-0">
        <main id="content" className="site-content" role="main">
          <section id="intro" className="full-screen">
            <LandingPage />
          </section>

          <section id="home" className="full-screen">
            <HomePage />
          </section>

          <section id="panels">
            <div id="panels-container" style={{ width: '500%' }}>
              <article id="panel-1" className="panel full-screen gradient-green">
                <PortfolioPage />
              </article>
              <article id="panel-2" className="panel full-screen gradient-blue">
                <PortfolioPage pageNumber={2} />
              </article>
              <article id="panel-3" className="panel full-screen gradient-green">
                <AboutPage />
              </article>
              <article id="panel-4" className="panel full-screen gradient-blue">
                <AboutPage pageNumber={2} />
              </article>
              <article id="panel-5" className="panel full-screen gradient-green">
                <AboutPage pageNumber={3} />
              </article>
            </div>
          </section>

          <section id="contact" className="full-screen">
            <ContactPage />
          </section>
        </main>

        <footer className="relative z-10 w-full bg-black text-white">
          <div className="container mx-auto">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;