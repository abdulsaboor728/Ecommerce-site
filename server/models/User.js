const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, hash passwords!
  isAdmin: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0 },
  reviews: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    text: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
