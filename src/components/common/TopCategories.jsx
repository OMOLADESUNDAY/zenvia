import React from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const TopCategories = ({ value }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/categories`;
  const { data, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error...</p>;

  const limit = value ?? data.length;

  return (
    <section
      className="
        w-full
        lg:w-1/2
        bg-white
        rounded-2xl
        p-4
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-sm sm:text-base">
          Top Categories
        </p>

        <Link
          to="/categories"
          className="text-xs sm:text-sm text-green-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Categories */}
      <div
        className="
          grid gap-2
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
        "
      >
        {data.slice(0, limit).map((item) => (
          <Link
            key={item._id}
            to={`/category/${item.slug ?? item._id}`}
            className="
              text-sm
              bg-gray-100
              rounded-lg
              px-3
              py-2
              text-center
              hover:bg-green-100
              transition
            "
          >
            {item.name}
          </Link>
        ))}
      </div>
      
    </section>
  );
};

export default TopCategories;
