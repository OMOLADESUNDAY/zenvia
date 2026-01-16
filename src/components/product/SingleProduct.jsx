import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import SmallLoadingSpinner from "../common/SmallLoadingSpinner";
import { useCartStore } from "../../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleProduct = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images);
  const [qty, setQty] = useState(1);
  const [cartAdded, setCartAdded] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const totalPrice = product.price * qty;
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const increment = useCartStore((state) => state.incrementCart);

  const payload = {
    products: [
      {
        productId: product._id,
        quantity: qty,
      },
    ],
  };

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

  const addToCart = async () => {
    if (!token) {
      // If user is not logged in, redirect to login
      setCartAdded("Please login to add items to cart");
      setTimeout(() => setCartAdded(""), 2000);
      navigate("/login"); // Redirect to login page
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        increment();
        setCartAdded("Item added to cart");
        setTimeout(() => setCartAdded(""), 1000);
      } else {
        setCartAdded("Error adding to cart");
        setTimeout(() => setCartAdded(""), 1000);
      }
    } catch (error) {
      setIsLoading(false);
      setCartAdded("Error adding to cart");
      setTimeout(() => setCartAdded(""), 1000);
    }
  };

  // Fetch related products based on category
useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`);
      const allProducts = res.data.data;

      // Filter products that share at least one category with current product
      const related = allProducts.filter((p) => 
        p._id !== product._id && 
        p.categories.some((cat) => product.categories.includes(cat))
      );

      setRelatedProducts(related);
     
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  if (product.categories && product.categories.length > 0) {
    fetchRelatedProducts();
  }
}, [product]);


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

            <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>

            <p className="text-lg font-semibold text-gray-800">
              Price: <span className="text-2xl">${product.price}</span>
            </p>

            <p className="text-sm text-gray-600">
              Description: <b>{product.description}</b>
            </p>

            {/* <p className="text-sm text-gray-500">
              Categories: {product.categories.join(", ")}
            </p> */}
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
            <button
              onClick={addToCart}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              {isLoading ? <SmallLoadingSpinner /> : "Add to Cart"}
            </button>
            <p>{cartAdded}</p>

            <div className="text-sm text-gray-600">🔒 Guaranteed Safe Checkout</div>
            <div className="border-t pt-4 text-sm">
              📦 Ships from <b>{product.shippingFrom}</b>
            </div>
            <div className="text-center pt-3">
              <p className="font-semibold">Quick Order 24/7</p>
            </div>
            <div className="w-full">
              <Link
                to="/cart"
                className="w-full block bg-green-500 text-center text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p._id} className=" bg-white rounded-lg p-4">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">${p.price}</p>
                <Link
                  to={`/single/${p._id}`}
                  className="text-green-500 text-sm mt-2 inline-block"
                >
                  Get Product
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default SingleProduct;
