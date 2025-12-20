import React, { useState } from 'react'
import useAxios from '../hooks/useAxios';
import { Link } from "react-router-dom";
import LoadingSpinner from '../components/common/LoadingSpinner';
// import "./herolayout.css"
const HeroLayout = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/categories`
    console.log(url)
    const { data, loading, error } = useAxios({url});
    if(loading){
      return(
        <LoadingSpinner/>
      )
    }
    if(error){
      return(
        <div>{error}</div>
      )
    }
  return (
    <section className='container'>
        <section className='flex gap-1 mt-5'>
        <aside className='hidden lg:flex lg:flex-col lg:p-2 lg:pl-6 lg:w-1/5 lg:bg-white lg:rounded-2xl'>
            <h5><b className='text-red-700'>SALE 40% OFF</b></h5>
            {data?.map((category)=>{
              return(
                <Link className='m-1 text' key={category._id} to={`/api/categories/${category.slug}`}>{category.name}</Link>
              )
            })}

          
        </aside>
        <main>
            <div></div>
            <div>
                <div></div>
                <div></div>
            </div>
        </main>
        <aside className='w-1/5'>
            <div className="bg-[url('../assets/heroo.png')] bg-center bg-cover bg-no-repeat w-full h-96">

            </div>
            <div></div>
        </aside>
    </section>
    </section>
    
  )
}

export default HeroLayout