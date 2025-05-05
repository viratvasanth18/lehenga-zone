import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const FilterProducts = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products based on query
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/search?query=${query}`
        );
        const result = Array.isArray(res.data) ? res.data : res.data.products || [];
        setFilteredProducts(result);
      } catch (err) {
        console.error("Error fetching products:", err);
        setFilteredProducts([]);
      }
    };

    if (query) fetchFiltered();
  }, [query]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart((prev) =>
      prev.find((i) => i._id === item._id) ? prev : [...prev, item]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const isFavorited = (id) => favorites.includes(id);
  const inCart = (id) => cart.find((i) => i._id === id);

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
  };

  return (
    <div className="p-4 mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Search Results</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const discountedPrice = calculateDiscountedPrice(item.price, item.discount || 0);
            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.img || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {item.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                      {item.discount}% OFF
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(item._id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 transition-colors"
                  >
                    {isFavorited(item._id) ? (
                      <FaHeart className="text-red-500 text-sm md:text-base" />
                    ) : (
                      <FaRegHeart className="text-gray-600 hover:text-red-500 text-sm md:text-base" />
                    )}
                  </button>
                </div>

                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1 truncate">
                    {item.name}
                  </h3>

                  <div className="flex items-center mb-1 md:mb-2">
                    {renderStars(item.rating)}
                    <span className="text-gray-600 text-xs md:text-sm ml-1">
                      ({item.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs md:text-sm text-gray-500 line-through">
                        ₹{item.price}
                      </span>
                      <span className="ml-2 text-base md:text-lg font-bold text-red-600">
                        ₹{discountedPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className={`flex items-center ${
                        inCart(item._id) ? "bg-green-600" : "bg-purple-600"
                      } text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm hover:bg-purple-700 transition-colors`}
                    >
                      {inCart(item._id) ? (
                        <>
                          <FaShoppingCart className="mr-1" />
                          Added
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
