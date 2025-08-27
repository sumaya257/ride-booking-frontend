import CallToAction from "@/components/modules/home/CallToAction";
import HeroBanner from "@/components/modules/home/HeroBanner";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Services from "@/components/modules/home/Services";
import Testimonials from "@/components/modules/home/Testimonial";


const Home = () => {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <Services />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
