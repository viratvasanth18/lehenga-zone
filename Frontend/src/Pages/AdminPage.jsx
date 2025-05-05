import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    img: "",
    price: "",
    discount: "",
    category: "",
    rating: "",
  });
  const [editProductId, setEditProductId] = useState(null);

  const defaultCategories = ["Velvet Lehenga", "Net Lehenga", "Haldi Lehenga", "Half Saree Lehenga", "Kurti Lehenga","Bridal Lehenga","Jacket Lehenga"];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (activeTab === "products") {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
          setProducts(response.data);
        } else if (activeTab === "orders") {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`);
          setOrders(response.data);
        } else if (activeTab === "users") {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`);
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = () => {
    const payload = {
      ...newProduct,
      price: Number(newProduct.price),
      discount: Number(newProduct.discount),
      rating: Number(newProduct.rating),
    };

    if (editProductId) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${editProductId}`, payload)
        .then((response) => {
          const updated = products.map((p) =>
            p._id === editProductId ? response.data : p
          );
          setProducts(updated);
          setEditProductId(null);
          setNewProduct({ name: "", img: "", price: "", discount: "", category: "", rating: "" });
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          alert("Failed to update product. Check the console for details.");
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, payload)
        .then(() => {
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`).then((res) => setProducts(res.data));
          setNewProduct({ name: "", img: "", price: "", discount: "", category: "", rating: "" });
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          alert("Failed to add product. Check the console for details.");
        });
    }
  };

  const handleEditProduct = (product) => {
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      img: product.img,
      price: product.price,
      discount: product.discount,
      category: product.category,
      rating: product.rating || "",
    });
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm("Confirm you want to remove this product?");
    if (confirmDelete) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please check the console for details.");
        });
    }
  };

  // Get unique categories from existing products
  const allCategories = Array.from(new Set([...defaultCategories, ...products.map(p => p.category)]));

  return (
    <div className="p-6 bg-gray-100 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Admin Dashboard</h1>
      <div className="flex border-b mb-4 justify-center">
        {["products", "orders", "users"].map((tab) => (
          <button
            key={tab}
            className={`p-3 mx-2 ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "text-gray-600"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center my-10">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      ) : (
        <>
          {activeTab === "products" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Manage Products</h2>
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Discount</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Rating</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan="7" className="text-center p-3">No products found.</td></tr>
                  ) : (
                    [...new Set(products.map((p) => p.category))].map((category) => (
                      <React.Fragment key={category}>
                        <tr className="bg-blue-100">
                          <td colSpan="7" className="p-3 font-semibold text-blue-800">{category}</td>
                        </tr>
                        {products
                          .filter((p) => p.category === category)
                          .map((product) => (
                            <tr key={product._id} className="border-t hover:bg-gray-100">
                              <td className="p-3">
                                <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded" />
                              </td>
                              <td className="p-3">{product.name}</td>
                              <td className="p-3">₹{product.price}</td>
                              <td className="p-3">{product.discount}%</td>
                              <td className="p-3">{product.category}</td>
                              <td className="p-3">{product.rating || "N/A"}</td>
                              <td className="p-3 space-x-2">
                                <button onClick={() => handleEditProduct(product)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                                <button onClick={() => handleDeleteProduct(product._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                              </td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>

              <div className="bg-white p-4 shadow-md rounded-lg mt-6">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">{editProductId ? "Edit Product" : "Add Product"}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Product Name" className="p-2 border rounded" value={newProduct.name} onChange={handleInputChange} />
                  <input type="text" name="img" placeholder="Image URL" className="p-2 border rounded" value={newProduct.img} onChange={handleInputChange} />
                  <input type="number" name="price" placeholder="Price" className="p-2 border rounded" value={newProduct.price} onChange={handleInputChange} />
                  <input type="number" name="discount" placeholder="Discount (%)" className="p-2 border rounded" value={newProduct.discount} onChange={handleInputChange} />

                  <select name="category" value={newProduct.category} onChange={handleInputChange} className="p-2 border rounded">
                    <option value="">Select Category</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <input type="number" name="rating" placeholder="Star Rating (1-5)" min="1" max="5" className="p-2 border rounded" value={newProduct.rating} onChange={handleInputChange} />
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddOrUpdateProduct}>
                  {editProductId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Manage Orders</h2>
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">S.No</th>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Total Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan="5" className="text-center p-3">No orders found.</td></tr>
                  ) : (
                    orders.map((order, index) => (
                      <tr key={order._id} className="border-t hover:bg-gray-100">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{order._id}</td>
                        <td className="p-3">{order.customerName}</td>
                        <td className="p-3">₹{order.totalPrice}</td>
                        <td className="p-3">{order.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Manage Users</h2>
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">S.No</th>
                    <th className="p-3 text-left">User ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="5" className="text-center p-3">No users found.</td></tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user._id} className="border-t hover:bg-gray-100">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{user._id}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;
