import React from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Slider from "react-slick";
import "./herolayout.css";

const HeroLayout = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:true
  };

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/categories`;
  const { data, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (

    <section className="mt-5">

    <section className="container">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* LEFT CATEGORIES */}
        <aside className="hidden lg:flex flex-col p-4 bg-white rounded-2xl">
          <h5 className="mb-2 font-bold text-red-700">SALE 40% OFF</h5>
          {data?.map((category) => (
            <Link
              key={category._id}
              to={`/api/categories/${category.slug}`}
              className="text-sm py-1 hover:text-red-600"
            >
              {category.name}
            </Link>
          ))}
        </aside>

        {/* CENTER SLIDER */}
        <main className="lg:col-span-3 w-full overflow-hidden rounded-md border relative">
          <Slider {...settings}>
            <div className="h-60 bg-red-500 flex items-center rounded-2xl justify-center">
              Slide 1
            </div>
            <div className="h-60 bg-blue-500 flex items-center rounded-2xl justify-center">
              Slide 2
            </div>
            <div className="h-60 bg-green-500 flex items-center rounded-2xl justify-center">
              Slide 3
            </div>
          </Slider>
        </main>

        {/* RIGHT PROMOS */}
        <aside className="hidden lg:flex flex-col gap-4">
          <div className="bg-image h-[130px] rounded-xl flex justify-end">
            <div className="p-4 text-right">
              <p>Explore Our</p>
              <h4 className="text-2xl font-bold">Gadget</h4>
              <Link className="inline-block mt-2 bg-black text-white px-4 py-2 rounded-2xl">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="hero-bg-image h-[130px] rounded-xl flex justify-start">
            <div className="p-4">
              <p className="text-white">Get Here</p>
              <h4 className="text-xl text-white font-bold">Most Have</h4>
              <p className="text-white">
                From: <span className="text-blue-400">$100</span>
              </p>
            </div>
          </div>
        </aside>

      </div>
    </section>


    </section>


    
  );
};

export default HeroLayout;
