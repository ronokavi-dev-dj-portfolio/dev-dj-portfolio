import { LanguageProvider } from './context/LanguageContext';
import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Statement } from './components/Statement/Statement';
import { About } from './components/About/About';
import { Gallery } from './components/Gallery/Gallery';
import { Videos } from './components/Videos/Videos';
import { Testimonials } from './components/Testimonials/Testimonials';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { WhatsappFab } from './components/WhatsappFab/WhatsappFab';

export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <Statement />
      <About />
      <Gallery />
      <Videos />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsappFab />
    </LanguageProvider>
  );
}
