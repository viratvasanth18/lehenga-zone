import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiCreditCard } from 'react-icons/fi';

export default function ShippingPage({ cartItems = [], setCartItems }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order with selected payment method
    const orderData = {
      shippingInfo: formData,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : null,
      upiId: paymentMethod === 'upi' ? upiId : null,
      items: cartItems,
      total: calculateTotal().total
    };
    
    console.log('Order placed:', orderData);
    setCartItems([]);
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price * (1 - item.discount / 100)) * item.quantity,
      0
    );
    const shippingFee = 0;
    const tax = subtotal * 0.18;
    const total = subtotal + shippingFee + tax;
    
    return { subtotal, shippingFee, tax, total };
  };

  const { subtotal, shippingFee, tax, total } = calculateTotal();

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="flex items-center mb-6">
        <Link to="/cart" className="flex items-center text-purple-600 hover:text-purple-800 mr-4">
          <FiArrowLeft className="mr-1" /> Back to Cart
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800">Shipping & Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit}>
            {/* Shipping address fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                 <label className="block text-gray-700 mb-1">Last Name</label>
                 <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
               <label className="block text-gray-700 mb-1">Address</label>
               <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>


            <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                 <label className="block text-gray-700 mb-1">State</label>
                 <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                 <label className="block text-gray-700 mb-1">Postal Code</label>     
                             <input
                   type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                 <label className="block text-gray-700 mb-1">Country</label>
                 <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>


              {/* Add all other shipping fields similarly */}
            </div>

            {/* Payment Method Selection */}
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4 mb-6">
              {/* Credit/Debit Card Option */}
              <div className="border rounded-lg p-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-purple-600"
                  />
                  <div className="flex items-center">
                    <FiCreditCard className="mr-2" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>
                
                {paymentMethod === 'card' && (
                  <div className="mt-3 space-y-3 pl-7">
                    <div>
                      <input
                        type="text"
                        name="number"
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Cardholder Name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* UPI Payment Option */}
              <div className="border rounded-lg p-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="h-4 w-4 text-purple-600"
                  />
                  <span className="font-medium">UPI Payment</span>
                </label>
                
                {paymentMethod === 'upi' && (
                  <div className="mt-3 space-y-3 pl-7">
                    <p className="text-sm text-gray-600 mb-2">
                      Enter your UPI ID (e.g. name@upi)
                    </p>
                    <input
                      type="text"
                      placeholder="UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Cash on Delivery Option */}
              <div className="border rounded-lg p-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={() => setPaymentMethod('cashOnDelivery')}
                    className="h-4 w-4 text-purple-600"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <FiCheckCircle className="mr-2" />
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Order items list */}
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center border-b pb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Qty: {item.quantity}</span>
                      <span>₹{(item.price * (1 - item.discount / 100) * item.quantity).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
              <p>Your order will be delivered in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









