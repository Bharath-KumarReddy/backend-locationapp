import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  accuracy: Number,
  timestamp: String,
});

const Location = mongoose.model("Location", locationSchema);

app.get("/", (req, res) => {
  res.send("Backend is running ✔️");
});

// Endpoint
app.post("/api/location", async (req, res) => {
  try {
    console.log("📍 Received Location Data:", req.body);

    const doc = new Location(req.body);
    await doc.save();

    res.json({ message: "Location saved" });
  } catch (err) {
    console.error("❌ Error saving location:", err);
    res.status(500).json({ error: "Database save error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));