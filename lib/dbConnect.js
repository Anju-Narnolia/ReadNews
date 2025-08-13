const mongoose = require("mongoose");

let isConnected = false; // Track the connection status

const dbConnect = async () => {
  if (isConnected) {
    // If already connected, use existing connection
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      // MongoDB Atlas connection options
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Atlas connection error:", error);
    throw error;
  }
};

module.exports = dbConnect;
