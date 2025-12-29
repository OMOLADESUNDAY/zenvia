import React from 'react'
import HeroLayout from '../../layouts/HeroLayout'
import BrandCategoryLayout from '../../layouts/BrandCategoryLayout'
import DealOfTheDay from '../../components/common/DealOfTheDay'
import AllProduct from '../../components/product/AllProduct'
import FAQ from '../../components/common/Faq'

const Home = () => {
  return (
    <div>
        <HeroLayout/>
        <BrandCategoryLayout/>
        <DealOfTheDay/>
        <AllProduct value={8}/>
        <FAQ/>
    </div>
  )
}

export default Home