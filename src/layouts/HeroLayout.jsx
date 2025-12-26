import React from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Slider from "react-slick";
import "./herolayout.css";

const HeroLayout = () => {
  const settings = {
    dots: false,
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
        <main className="lg:col-span-3 w-full overflow-hidden rounded-md relative ">
          <Slider {...settings}>
            <div className="h-60 flex items-center rounded-2xl justify-center hero-slide-1">
              <div className="w-3/5 p-8 lg:h-full lg:flex lg:flex-col lg:justify-center">
                     <h1 className="text-md font-bold lg:text-3xl ">The Future in Your Hands</h1>
                    <p className="pb-4 text-sm">Discover cutting-edge tech that transforms your everyday.</p>
                    <Link className="btn lg:w-fit">Buy Now</Link>
              </div>
          
            </div>
            <div className="h-60 flex items-center rounded-2xl justify-center hero-slide-2">
              <div className="w-3/5 p-8 lg:h-full  lg:flex lg:flex-col lg:justify-center" >
                    <h1 className="text-md font-bold lg:text-3xl">Style That Speaks for You</h1>
                    <p className="pb-4 text-sm">Curate your perfect look with the latest trends and timeless classics. </p>
                    <Link className="btn lg:w-fit">Explore </Link>
              </div>
             
            </div>
            <div className="h-60 flex items-center rounded-2xl justify-center hero-slide-3">
              <div className="w-3/5 p-8 lg:h-full lg:flex lg:flex-col lg:justify-center">
                   <h1 className="text-md font-bold lg:text-3xl "> Fresh Delivered to Your Door</h1>
                  <p className="pb-4 text-sm">Quality ingredients and everyday essentials at your fingertips.</p>
                  <Link className="btn lg:w-fit">Shop Now</Link>
              </div>
            
            </div>
          </Slider>

          <div className="down-hero flex flex-col lg:flex-row gap-1 mt-2">
                <div className="ps5 h-30 rounded-xl w-full lg:w-1/2 ">
                <div className="p-4 text-left">
                 <small className="text-xl font-bold">Sony PS5</small><br />
                  <Link className="inline-block mt-2  ">
                    playstation 5
                  </Link>
                </div>
              </div>
              <div className="keyboard h-30 rounded-xl  w-1/2  ">
                <div className="p-4 text-left">
                  <small className="text-xl font-bold">best for a devices</small><br />
                  <Link className="inline-block mt-2  ">
                    keyboard
                  </Link>
                </div>
              </div>
          </div>
        </main>

        {/* RIGHT PROMOS */}
        <aside className="hidden lg:flex flex-col gap-4">
          <div className="bg-image h-1/2 rounded-xl flex justify-end">
            <div className="p-4 text-right">
              <p>Explore Our</p>
              <h4 className="text-2xl font-bold">Gadget</h4>
              <Link className="inline-block mt-2 bg-black text-white px-4 py-2 rounded-2xl">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="hero-bg-image h-1/2 rounded-xl flex justify-start">
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
