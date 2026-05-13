import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import authrouter from "./routes/authRoutes.js";
import router from "./routes/employeeRoutes.js";
import profilerouter from "./routes/profileRoutes.js";
import attendenceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRouter.js";
import payslipRouter from "./routes/payslipRouter.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// ======================
// DB CONNECTION (CRITICAL FIX)
// ======================
let dbConnected = false;

const ensureDB = async (req, res, next) => {
  try {
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
      console.log("✅ MongoDB Connected");
    }
    next();
  } catch (err) {
    console.error("DB Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

// Apply BEFORE all routes
app.use(ensureDB);

// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EMS Backend Running 🚀",
  });
});

app.get("/api/dbstatus", (req, res) => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.json({
    success: true,
    dbState: states[mongoose.connection.readyState] || "unknown",
  });
});

app.use("/api/auth", authrouter);
app.use("/api/employees", router);
app.use("/api/profile", profilerouter);
app.use("/api/attendance", attendenceRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

// ======================
// INNGEST (FIXED)
// ======================
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// ======================
// EXPORT FOR VERCEL
// ======================
export default app;
