import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const TEMP_PASSWORD = "Admin@123";

async function adminRegister() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if (!ADMIN_EMAIL) {
            console.error("ADMIN_EMAIL is not defined in .env");
            process.exit(1);
        }

        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({
            email: ADMIN_EMAIL,
        });

        if (existingAdmin) {
            console.log("Admin already exists:", ADMIN_EMAIL);
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(TEMP_PASSWORD, 10);

        // Create admin user
        const adminUser = new User({
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",
        });

        await adminUser.save();

        console.log("✅ Admin created successfully:", ADMIN_EMAIL);
        console.log("⚠️ Temporary password:", TEMP_PASSWORD);

        process.exit(0);

    } catch (error) {
        console.error("❌ Admin creation error:", error);
        process.exit(1);
    }
}

// Run script
adminRegister();