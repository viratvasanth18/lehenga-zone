import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Collection({ cartItems = [], setCartItems = () => {} }) {
  const [productData, setProductData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProductData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = productData.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const toggleFavorite = () => {
    alert("Please login to add items to your wishlist");
    navigate("/login");
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);

    let newCart;
    if (existingItem) {
      newCart = cartItems.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(newCart);
    setAddedItem(item);
    setShowCartAlert(true);

    setTimeout(() => {
      setShowCartAlert(false);
    }, 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm md:text-base" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-sm md:text-base" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 text-sm md:text-base" />);
      }
    }
    return stars;
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-r from-pink-50 to-purple-100 min-h-screen">
      {showCartAlert && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center">
          <FaShoppingCart className="mr-2" />
          <span>
            <strong>{addedItem?.name}</strong> added to cart!
          </span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 font-serif">
          👑 Lehenga Collection 👑
        </h1>
        <Link
          to="/cart"
          className="flex items-center bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          <FaShoppingCart className="mr-2" />
          <span>Cart ({cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)})</span>
        </Link>
      </div>

      {Object.entries(groupedProducts).map(([category, products], index) => (
        <div key={index} className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 md:mb-6 decoration-wavy">
            {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((item) => {
              const discountedPrice = (item.price * (1 - item.discount / 100)).toFixed(0);
              const isFavorited = favorites.includes(item._id);
              const inCart = cartItems.some(cartItem => cartItem._id === item._id);

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                      {item.discount}% OFF
                    </span>
                    <button
                      onClick={() => toggleFavorite(item._id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 transition-colors"
                    >
                      {isFavorited ? (
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
                        className={`flex items-center ${inCart ? 'bg-green-600' : 'bg-purple-600'} text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm hover:bg-purple-700 transition-colors`}
                      >
                        {inCart ? (
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
        </div>
      ))}
    </div>
  );
}