import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/food", foodRoute);

// ✅ Test Root Route
app.get("/", (req, res) => {
  res.send("🍕 Food Delivery API is running successfully!");
});

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Start server
app.listen(port, () => console.log(`🚀 Server started on http://localhost:${port}`));
