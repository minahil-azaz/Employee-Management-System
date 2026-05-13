import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ======================
// LOGIN
// POST /api/auth/login
// ======================

export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Role check (optional)
        if (role_type && user.role !== role_type) {
            return res.status(401).json({
                message: `Unauthorized access as ${role_type.toLowerCase()}`,
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error during login",
        });
    }
};

// ======================
// GET SESSION
// GET /api/auth/session
// ======================

export const getSession = async (req, res) => {
    try {
        const user = req.user;

        return res.json({
            user: user || null,
        });
    } catch (error) {
        console.error("Session error:", error);
        return res.status(500).json({
            message: "Failed to get session",
        });
    }
};

// ======================
// CHANGE PASSWORD
// POST /api/auth/change-password
// ======================

export const changePassword = async (req, res) => {
    try {
        const userRequest = req.user;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required",
            });
        }

        const user = await User.findById(userRequest.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isValidPassword = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid current password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.json({
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({
            message: "Failed to change password",
        });
    }
};