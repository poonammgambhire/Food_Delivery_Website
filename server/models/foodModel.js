import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String
});

const foodModel = mongoose.model('Foods', foodSchema);

export default foodModel;
