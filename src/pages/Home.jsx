import Hero from '../components/home/Hero'
import FeaturedCategories from '../components/home/FeaturedCategories'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'
import WhyChoose from '../components/home/WhyChoose'
import PromoBanner from '../components/home/PromoBanner'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <NewArrivals />
      <WhyChoose />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default Home