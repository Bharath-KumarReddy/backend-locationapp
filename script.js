import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Schema (same as your app)
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  timestamp: String,
});

const Location = mongoose.model("Location", locationSchema);

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const result = await Location.deleteMany({});
    console.log(`Deleted ${result.deletedCount} records`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error:", err);
  }
}

clearDatabase();
