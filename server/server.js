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
const PORT = process.env.PORT || 4000;

// ======================
// MIDDLEWARE
// ======================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Only needed for multipart/form-data
app.use(multer().none());

// ======================
// HEALTH CHECK ROUTE
// ======================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "EMS Backend Running Successfully 🚀",
    });
});

// ======================
// DATABASE STATUS ROUTE
// ======================

app.get("/api/dbstatus", (req, res) => {
    try {
        const states = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        };

        const readyState = mongoose.connection.readyState;

        return res.status(200).json({
            success: true,
            dbState: states[readyState] || "unknown",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// ======================
// API ROUTES
// ======================

app.use("/api/auth", authrouter);
app.use("/api/employees", router);
app.use("/api/profile", profilerouter);
app.use("/api/attendance", attendenceRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

// ======================
// INNGEST ROUTES
// ======================

app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions,
    })
);

// ======================
// START SERVER
// ======================

const startServer = async () => {
    try {
        await connectDB();

        console.log("✅ Database Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
        process.exit(1);
    }
};

// Only start a standalone server when running locally (not on Vercel serverless)
if (!process.env.VERCEL) {
    startServer();
}

// Export the Express app so serverless platforms (Vercel) can use it as a handler
export default app;
