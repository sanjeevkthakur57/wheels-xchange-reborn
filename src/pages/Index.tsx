
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarSearch from '@/components/CarSearch';
import FeaturedCars from '@/components/FeaturedCars';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import DownloadApp from '@/components/DownloadApp';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-20 mb-16">
          <CarSearch />
        </div>
        <FeaturedCars />
        <HowItWorks />
        <Testimonials />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
