const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// List all allowed frontend origins here
const allowedOrigins = [
  "https://frontend-roan-mu.vercel.app",
  "https://frontend-git-main-sneha-chauhans-projects.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/", tasksRouter);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
