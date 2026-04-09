import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Marquee } from './components/Marquee/Marquee';
import { StatsBar } from './components/StatsBar/StatsBar';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { Plans } from './components/Plans/Plans';
import { Calculator } from './components/Calculator/Calculator';
import { SignupForm } from './components/SignupForm/SignupForm';
import { Benefits } from './components/Benefits/Benefits';
import { Testimonials } from './components/Testimonials/Testimonials';
import { FAQ } from './components/FAQ/FAQ';

import { Footer } from './components/Footer/Footer';
import { WhatsAppButton } from './components/WhatsAppButton/WhatsAppButton';
import { SectionDivider } from './components/SectionDivider/SectionDivider';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <StatsBar />
        <SectionDivider />
        <HowItWorks />
        <Benefits />
        <SectionDivider flip />
        <Plans />
        <Testimonials />
        <Calculator />
        <FAQ />
        <SignupForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
