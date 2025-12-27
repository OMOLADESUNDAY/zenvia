import React from 'react'
import HeroLayout from '../../layouts/HeroLayout'
import BrandCategoryLayout from '../../layouts/BrandCategoryLayout'
import DealOfTheDay from '../../components/common/DealOfTheDay'

const Home = () => {
  return (
    <div>
        <HeroLayout/>
        <BrandCategoryLayout/>
        <DealOfTheDay/>
    </div>
  )
}

export default Home