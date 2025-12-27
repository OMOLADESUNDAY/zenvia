import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import brand1 from '../../assets/brands-logos/Link → logo1.png.png'
import brand2 from '../../assets/brands-logos/Link → logo2.png.png'
import brand3 from '../../assets/brands-logos/Link → logo3.png.png'
import brand4 from '../../assets/brands-logos/Link → logo4.png.png'
import brand5 from '../../assets/brands-logos/Link → logo5.png.png'
import brand6 from '../../assets/brands-logos/Link → logo6.png.png'
import brand7 from '../../assets/brands-logos/Link → logo7.png.png'
import brand8 from '../../assets/brands-logos/Link → logo8.png.png'
import brand9 from '../../assets/brands-logos/Link → logo9.png.png'
import brand10 from '../../assets/brands-logos/Link → logo10.png.png'
import brand11 from '../../assets/brands-logos/sony.png'
import brand12 from '../../assets/brands-logos/tesla.png'
const brandsLogo = [
  { img: brand1 },
  { img: brand2 },
  { img: brand3 },
  { img: brand4 },
  { img: brand5 },
  { img: brand6 },
  { img: brand7 },
  { img: brand8 },
  { img: brand9 },
  { img: brand10 },
  { img: brand11 },
  { img: brand12 },
];

const FeaturedBrands = ({value}) => {
    const limit = value ?? brandsLogo.length;
  return (
    <section className='w-1/2 bg-white rounded-2xl p-2'>
        <div className='flex justify-between text-sm font-bold'> 
            <p>FeaturedBrands</p>
            <Link className='text-sm'>View All</Link>
        </div>
        <div className='flex flex-wrap justify-center gap-3 mt-3'>
           {brandsLogo.slice(0, limit).map((brsnd,index)=>{
            return(
                <img key={index} src={brsnd.img} className='w-25 h-10 object-contain' alt="zenvia" />
            )
        })}
        </div>
       
    

    </section>
  )
}

export default FeaturedBrands