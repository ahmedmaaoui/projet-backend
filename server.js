require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route
app.get("/", (req, res) => res.send("API is running..."));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
