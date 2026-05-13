import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const dashboardRouter = Router();

// Dashboard endpoint with DB connection status
dashboardRouter.get("/", protect, async (req, res) => {
	try {
		const states = {
			0: "disconnected",
			1: "connected",
			2: "connecting",
			3: "disconnecting",
		};

		const ready = mongoose.connection.readyState;

		return res.json({
			success: true,
			data: {
				message: "Dashboard data placeholder",
				dbState: states[ready] || ready,
			},
		});
	} catch (error) {
		console.error("Dashboard error:", error);
		return res.status(500).json({ message: "Failed to load dashboard" });
	}
});

export default dashboardRouter;