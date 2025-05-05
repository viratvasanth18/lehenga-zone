import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6 mt-10">
      <div className="max-w-6xl w-full rounded-2xl shadow-lg p-10">
        <h2 className="text-5xl font-bold text-blue-700 text-center mb-8">
          About Us
        </h2>
        <p className="text-gray-700 text-lg text-center mb-10">
          Welcome to <span className="font-semibold text-purple-700">Lehenga Zone</span>, your go-to destination for premium products at unbeatable prices. Our goal is to bring you the best shopping experience with quality, innovation, and exceptional customer service.
        </p>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Story</h3>
            <p className="text-gray-700">
              Founded with a passion for making online shopping effortless and enjoyable, ShopEase started as a small venture and has grown into a trusted brand for thousands of happy customers worldwide.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">Why Choose Us?</h3>
            <p className="text-gray-700">
              We offer a hand-picked selection of top-rated products, fast shipping, secure payments, and 24/7 customer support to ensure you have the best shopping experience.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h3>
          <p className="text-gray-700">
            At <span className="font-semibold text-blue-700">Lehenga Zone</span>, we believe in quality, affordability, and customer satisfaction. Join us on this journey and shop with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;