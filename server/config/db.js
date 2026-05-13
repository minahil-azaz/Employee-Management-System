import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connection events
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB error:", err.message);
    });

    // connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🚀 Database connection established");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;