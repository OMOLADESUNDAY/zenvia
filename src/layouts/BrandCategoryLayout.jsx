import React from 'react'
import FeaturedBrands from '../components/common/FeaturedBrands'
import TopCategories from '../components/common/TopCategories'

const BrandCategoryLayout = () => {
  return (
    <section className='container '>
        <div className='flex gap-2 mt-3'>
        <FeaturedBrands  value={10}/>
        <TopCategories value={5}/>
      </div>
    </section>
  
  )
}

export default BrandCategoryLayout