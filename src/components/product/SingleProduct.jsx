import React, { useState } from "react";

const SingleProduct = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images);
  const [qty, setQty] = useState(1);
  const totalPrice = product.price * qty;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* FLEX CONTAINER */}
      <div className="flex flex-col lg:flex-row gap-8">
      <section className="bg-white rounded-xl w-full lg:w-2/3 flex flex-col lg:flex-row gap-4 py-15 ">

          {/* LEFT: IMAGE GALLERY */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-white rounded-xl p-6">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full max-h-105 object-contain mx-auto"
            />
          </div>
        </div>

        {/* CENTER: PRODUCT INFO */}
        <div className="w-full lg:w-1/2 space-y-4 lg:border-l border-green-500 p-6 ">
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            NEW
          </span>

          <h1 className="text-xl sm:text-2xl font-bold">
            {product.name}
          </h1>

          <p className="text-lg font-semibold text-gray-800">
            Price: <span className="text-2xl">${product.price}</span>
          </p>

          <p className="text-sm text-gray-600">
            Description: <b>{product.description}</b>
          </p>
          <p>{product.categories}</p>
        </div>

      </section>
      

        {/* RIGHT: PURCHASE CARD */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-gray-50 rounded-xl p-6 space-y-4">

            <p className="text-2xl font-bold">Total Price: ${totalPrice}</p>

            <p className="text-green-600 text-sm">✔ In stock</p>

            {/* QUANTITY */}
            <div className="flex items-center border rounded-lg w-fit">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>

            {/* ACTIONS */}
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600">
              Add to Cart
            </button>

            <div className="text-sm text-gray-600">
              🔒 Guaranteed Safe Checkout
            </div>

            <div className="border-t pt-4 text-sm">
              📦 Ships from <b>{product.shippingFrom}</b>
            </div>

            <div className="text-center pt-3">
              <p className="font-semibold">Quick Order 24/7</p>
            </div>

          </div>
        </div>

      </div>
      <section>
        
      </section>
    </section>
  );
};

export default SingleProduct;
