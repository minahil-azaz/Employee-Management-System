import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";

import authrouter from "./routes/authRoutes.js";
import router from "./routes/EmployeeRoutes.js";
import profilerouter from "./routes/profileRoutes.js";
import attendenceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRouter.js";
import payslipRouter from "./routes/payslipRouter.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import mongoose from "mongoose";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Only use this if you really need form-data globally
app.use(multer().none());

// Routes
app.get("/", (req, res) => {
  res.send("server is running 🚀");
});

// Public DB status endpoint for diagnostics
app.get("/api/dbstatus", (req, res) => {
  try {
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    const ready = mongoose.connection.readyState;
    return res.json({ success: true, dbState: states[ready] || ready });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/api/auth", authrouter);
app.use("/api/employees", router);
app.use("/api/profile", profilerouter);
app.use("/api/attendance", attendenceRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

// Serve Inngest functions
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();