import React from "react";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

const getDailyRandomItem = (data) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return data[seed % data.length];
};

const DealOfTheDay = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/product`;
  const { data, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error...</p>;
  if (!data.length) return null;

  const randomProduct = getDailyRandomItem(data);

  const getDailyRandomItems = (data, excludeId, count = 3) => {
    const filtered = data.filter(p => p._id !== excludeId);
    return filtered.slice(0, count);
  };

  const otherRandomProducts = getDailyRandomItems(
    data,
    randomProduct._id,
    3
  );

  return (
    <div className="container mx-auto px-4">
      {/* Wrapper */}
      <section className="flex flex-col lg:flex-row gap-6 mt-4 mb-4">

        {/* MAIN DEAL */}
        <section className="lg:w-2/3 w-full">
          <div className="bg-green-500 p-3 rounded-2xl mb-4">
            <p className="font-bold text-white">DEALS OF THE DAY</p>
          </div>

          <section className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden">
            {/* Image */}
            <div className="md:w-1/2 w-full p-6 flex justify-center">
              <img
                src={randomProduct.images?.[0]}
                alt={randomProduct.name}
                className="w-full max-w-sm object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 w-full p-6 flex flex-col gap-3">
              <h3 className="text-2xl md:text-3xl font-bold">
                {randomProduct.name}
              </h3>

              <p>
                Price:{" "}
                <b className="text-xl md:text-2xl text-red-700">
                  ${randomProduct.price}
                </b>
              </p>

              <p className="text-sm md:text-base">
                {randomProduct.description}
              </p>
              <Link
                    to={`/single/${randomProduct._id}`}
                    className="btn w-fit text-sm cursor-pointer"
                  >
                    Get Now
                  </Link>
              <p>
                Stock:{" "}
                <b
                  className={
                    randomProduct.stock > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {randomProduct.stock}
                </b>
              </p>
            </div>
          </section>
        </section>

        {/* SIDEBAR */}
        <section className="lg:w-1/3 w-full">
          <div className="grid gap-4">
            {otherRandomProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-3 flex gap-3 items-center"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-26 h-26 object-contain rounded"
                />

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm">
                    {product.name}
                  </p>
                  <p className="text-red-600 font-bold">
                    ${product.price}
                  </p>

                  <Link
                    to={`/single/${product._id}`}
                    className="btn w-fit text-sm cursor-pointer"
                  >
                    Get Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default DealOfTheDay;
