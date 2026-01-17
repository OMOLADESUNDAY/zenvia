import { PackageOpen, ShoppingCart, Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
       <section className='flex justify-between'>
            <div className=' bg-gray-200 rounded-2xl p-6 min-w-44'>
                <p>Total Revenue</p>
                <h2 className='text-3xl font-bold text-green-500'>$10000</h2>
                <small>sales</small>
            </div>
             <div className=' bg-gray-200 rounded-2xl p-6 min-w-44'>
                <p>Active User</p>
                <h2 className='text-3xl font-bold text-green-500'><span className='flex items-center gap-2'><Users size={28} /><p> 2481</p></span></h2>
                <small>sales</small>
            </div>
             <div className=' bg-gray-200 rounded-2xl p-6 min-w-44'>
                <p>Total Orders</p>
                <h2 className='text-3xl font-bold text-green-500'> <span className='flex items-center gap-2'><ShoppingCart /> <p>1203</p></span></h2>
                <small>sales</small>
            </div>
             <div className=' bg-gray-200 rounded-2xl p-6 min-w-44'>
                <p>Total Products</p>
                <h2 className='text-3xl font-bold text-green-500'><span className='flex items-center gap-2'><PackageOpen /><p>134</p></span></h2>
                <small>sales</small>
            </div>
       </section>
       <section>
        
       </section>
    </div>
  )
}

export default Dashboard