import React from 'react';
import useAxios from '../../hooks/useAxios';
import LoadingSpinner from './LoadingSpinner';

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

  return (
    <div className="container">
      <div className="bg-green-500 mt-3 p-3 rounded-2xl w-5/7">
        <p>DEALS OF THE DAY</p>
      </div>

      <section className="flex">
        <div className="w-1/2">
          <img
            src={randomProduct.images[0]}
            alt={randomProduct.name}
          />
        </div>

        <div className="w-1/2">
          <p>{randomProduct.name}</p>
          <p>${randomProduct.price}</p>
        </div>
      </section>
    </div>
  );
};

export default DealOfTheDay;
