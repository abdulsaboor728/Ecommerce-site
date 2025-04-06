const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  seller: String,
  image: String,
  batteryLife: Number, // for GPS SportWatches
  age: Number,         // for Vinyls and Antique Furniture
  size: String,        // for Running Shoes
  material: String,    // for Antique Furniture and Running Shoes
  rating: { type: Number, default: 0 },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String
  }],
  category: { 
    type: String, 
    enum: ['Vinyls', 'Antique Furniture', 'GPS SportWatches', 'Running Shoes'], 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
