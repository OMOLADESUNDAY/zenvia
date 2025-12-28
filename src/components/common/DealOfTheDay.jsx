import React from 'react';
import useAxios from '../../hooks/useAxios';
import LoadingSpinner from './LoadingSpinner';
import {Link} from 'react-router-dom'
const getDailyRandomItem = (data) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  // Get a number for today (e.g., 2025-12-27 → 20251227)
  const today = new Date();
  const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Deterministic "random" index
  const index = daySeed % data.length;

  return data[index];
};

const DealOfTheDay = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/product`;
  const { data, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error...</p>;
  if (!data.length) return null;

  const randomProduct = getDailyRandomItem(data);


  const getDailyRandomItems = (data, excludeId, count = 3) => {
  if (!Array.isArray(data) || data.length <= 1) return [];

  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // Remove main product
  const filtered = data.filter(item => item._id !== excludeId);

  // Deterministic shuffle
  const shuffled = [...filtered].sort((a, b) => {
    const aHash = (seed + a._id.charCodeAt(0)) % 100;
    const bHash = (seed + b._id.charCodeAt(0)) % 100;
    return aHash - bHash;
  });

  return shuffled.slice(0, count);
};



 const otherRandomProducts = getDailyRandomItems(
  data,
  randomProduct._id,
  3
);
  return (
    <div className="container">
      <section className='flex  '>
        <section className='w-5/7'>
          <div className="bg-green-500 mt-3 p-3 rounded-2xl ">
          <p><b>DEALS OF THE DAY</b> </p>
        </div>

             <section className="flex bg-white rounded-xl">
            <div className="w-1/2 p-12">
              <img className='w-full hover:scale-120 hover:translate-2'
                src={randomProduct.images[0]}
                alt={randomProduct.name}
              />
            </div>

            <div className="w-1/2 p-5 flex flex-col justify-start gap-2">
              <h3 className='text-3xl'><b>{randomProduct.name}</b></h3>
              <p>Price: <b className='text-2xl text-red-700'>${randomProduct.price}</b></p>
              <p>{randomProduct.description}</p>
              <button className="btn w-fit">Get Now</button>
              {console.log(typeof(randomProduct.stock))}
              <p>No of item in stock: <b className={randomProduct.stock > 0 ?"text-green-500":"text-red-500"}>{randomProduct.stock}</b></p>
            </div>
      </section>
      </section>
      
      <section className='w-2/7 h-full p-4'>
        {otherRandomProducts.map((randimg)=>{
          return(
            <div key={randimg._id} className='bg-white rounded-2xl m-2 flex'>
              <img className='w-1/2' src={randimg.images} alt={randimg.name} />
              <div className='flex flex-col gap-1 m-2'>
                  <p>{randimg.name}</p>
                  <p>${randimg.price}</p>
                  <Link to={`/single/${randimg._id}`} className='btn w-fit' >Get Now</Link>
              </div>
            </div>
            
          )
        })}
      </section>


      </section>
     
     
    </div>
  );
};

export default DealOfTheDay;
