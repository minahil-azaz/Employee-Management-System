import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// multer (ONLY if you're handling form-data globally)
app.use(multer().none());

// routes
app.get("/", (req, res) => {
  res.send("server is running 🚀");
});

// start server safely
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();