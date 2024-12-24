import React from 'react'
import NewsletterBox from '../Components/NewsletterBox'
import Hero from '../Components/Hero'
import LatestFeatures from '../Components/LatestFeatures'
import BestFeature from '../Components/BestFeature'
import OurPolicy from '../Components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestFeatures />
      <BestFeature />
      <OurPolicy />
      <NewsletterBox />
    </div>
    
  )
}

export default Home