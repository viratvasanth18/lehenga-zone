const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL,  // Use the URL from the .env file
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };


app.use(cors(corsOptions));

// Connect Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));   // Authentication Routes
app.use("/api/users", require("./routes/user"));  


app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
