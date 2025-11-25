// server/routes/foodRoute.js
import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addFood);       // Add food
router.get("/list", listFood);                              // List all foods
// router.delete("/remove/:id", removeFood); 
router.delete("/remove/:id", removeFood);
                 // Remove food

export default router;
