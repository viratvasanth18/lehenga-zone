import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    { src: "./image1.jpeg", title: "", description: "" },
    { src: "./image2.jpeg", title: "", description: "" },
    { src: "./image3.jpeg", title: "", description: "" },
    { src: "./image4.jpg", title: "", description: "" },
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = (id) => {
    alert("Please login to add items to your wishlist");
    navigate("/login");
  };

  const newArrivals = [
    { id: 1, img: "./si-1.jpeg", name: "Bridal Lehenga", price: 2999, discount: 20, rating: 4 },
    { id: 2, img: "./si-2.jpeg", name: "Red Bridal Lehenga", price: 1799, discount: 15, rating: 5 },
    { id: 3, img: "./si-3.jpeg", name: "Designer Lehenga", price: 2499, discount: 10, rating: 4 },
    { id: 4, img: "./si-4.jpeg", name: "Blue Anarkali Lehenga", price: 999, discount: 5, rating: 4 },
    { id: 5, img: "./si-5.jpeg", name: "Party Wear Lehenga", price: 1299, discount: 25, rating: 5 },
    { id: 6, img: "./si-6.jpeg", name: "Traditional Lehenga", price: 3999, discount: 30, rating: 4 },
    { id: 7, img: "./si-7.jpeg", name: "Embroidered Lehenga", price: 4599, discount: 18, rating: 5 },
    { id: 8, img: "./si-8.jpeg", name: "Ethnic Lehenga", price: 1499, discount: 12, rating: 4 },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 mt-20">
      <div className="relative w-full object-cover overflow-hidden mx-auto">
        <img src={images[currentIndex].src} className="w-full h-auto sm:h-[500px] object-cover" alt="carousel" />
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2  text-white p-3 rounded-full">❮</button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2  text-white p-3 rounded-full">❯</button>
      </div>

      <h2 className="font-bold text-3xl mx-20 mt-14">New Arrivals</h2>
      <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivals.map((item) => {
          const discountedPrice = (item.price * (1 - item.discount / 100)).toFixed(0);
          return (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105 relative">
              <div className="relative group cursor-pointer">
                <img src={item.img} alt={item.name} className="w-full h-40 object-cover object-top rounded-md group-hover:scale-110 transition" />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">{item.discount}% OFF</span>
                <button onClick={() => toggleWishlist(item.id)} className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer">
                  <FaRegHeart />
                </button>
              </div>
              <h3 className="text-lg font-bold text-center mt-2">{item.name}</h3>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-yellow-400 text-lg ${i < item.rating ? "fas fa-star" : "far fa-star"}`} />
                ))}
              </div>
              <p className="text-lg font-semibold text-center mt-2">
                <span className="line-through text-gray-500">₹{item.price}</span>
                <span className="ml-2 text-red-600">₹{discountedPrice}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        <button className="px-6 py-3 text-lg bg-blue-500 text-white hover:bg-blue-700 rounded-xl mb-2" onClick={() => navigate("/collection")}>
          {`Shop Now >`}
        </button>
      </div>

     
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-gray-400">We provide high-quality ethnic wear at the best prices. Shop with us for the best deals and latest trends!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-400">Email: support@boutique.com</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-gray-400">Location: Chennai, India</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 text-xl">
              <FaFacebook className="cursor-pointer hover:text-blue-500" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaLinkedin className="cursor-pointer hover:text-blue-700" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;