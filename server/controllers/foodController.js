// server/controllers/foodController.js

import foodModel from '../models/foodModel.js';
import mongoose from 'mongoose';
import fs from 'fs';

// 1️⃣ Add Food
export const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    await food.save();
    res.json({ success: true, message: 'Food Added Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add food' });
  }
};

// 2️⃣ List Food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch food' });
  }
};

// 3️⃣ Remove Food
export const removeFood = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId before deleting
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid food ID' });
    }

    const food = await foodModel.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // Optional: delete the image file
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error('Failed to delete image:', err);
      });
    }

    res.json({ success: true, message: 'Food Deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete food' });
  }
};
