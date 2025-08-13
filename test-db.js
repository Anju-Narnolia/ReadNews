require("dotenv").config(); // Load .env for local testing
const dbConnect = require("./lib/dbConnect");

(async () => {
  try {
    await dbConnect();
    console.log("✅ MongoDB connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
})();
