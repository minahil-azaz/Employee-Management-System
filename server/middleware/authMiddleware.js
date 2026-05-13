import jwt from "jsonwebtoken";

// ======================
// PROTECT (JWT AUTH)
// ======================

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized access - No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized access - Invalid token",
                });
            }

            // attach user to request
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Server error during authentication",
        });
    }
};

// ======================
// ADMIN PROTECT
// ======================

export const protectAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized - No user found",
            });
        }

        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Forbidden - Admins only",
            });
        }

        next();

    } catch (error) {
        console.error("Admin auth error:", error);
        return res.status(500).json({
            message: "Server error during admin authentication",
        });
    }
};