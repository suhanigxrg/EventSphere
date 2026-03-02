import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingEvents from "../components/TrendingEvents";
import Categories from "../components/Categories";
import CTA from "../components/CTA";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingEvents />
      <Categories />
      <CTA />
    </>
  );
}

export default Home;