import { Search } from 'lucide-react'
import React from 'react'

const SearchNav = () => {
  return (
    <div className='p-4 bg-green-500 '>
      <section className='container flex items-center justify-center lg:justify-between'>
            <div className='flex items-center bg-white rounded-3xl px-4 py-2 w-full overflow-hidden'> 
            <select name="All Categories" id="" className=' text-sm flex-shrink-0'>
               <option value="All_categories">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Phones">Phones</option>
                <option value="PC">PC</option>
                <option value="Clothes">Clothes</option>
                <option value="Shoes">Shoes</option>
            </select>
            <input type="search" name="" className='p-1 text-sm flex-1 min-w-0 outline-none' placeholder='Search Anything' id="" />
            <Search size={18} className='text-black flex-shrink-0 cursor-pointer'/>
        </div>
        <div className='hidden lg:block'><p className='text-white '>FREE SHIPPING OVER $199</p></div>
        <div className='hidden lg:block'><p className='text-white '>30 DAYS MONEY BACK</p></div>
        <div className='hidden lg:block'><p className='text-white '>100% SECURE PAYMENT</p></div>
      </section>
    </div>
  )
}

export default SearchNav