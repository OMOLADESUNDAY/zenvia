import React from 'react';
import useAxios from '../../hooks/useAxios';
import { Link, Links } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const TopCategories = ({ value }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/categories`;
  const { data, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error...</p>;

  const limit = value ?? data.length;

  return (
    <section className='w-1/2 bg-white rounded-2xl p-2'>
      <div className="flex  justify-between text-sm font-bold ">
        <p>Top Categories</p>
        <Link className="text-sm">View All</Link>
      </div>
    <div className='flex justify-between items-center h-full '>
         {data.slice(0, limit).map((item, index) => (
        <Link key={index}>{item.name}</Link>
      ))}
    </div>
   
    </section>
  );
};


export default TopCategories;
