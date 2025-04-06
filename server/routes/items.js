const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
const { MongoClient } = require('mongodb');

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('cluster0');
  cachedDb = db;
  return db;
}

export default async (req, res) => {
  const { method } = req;
  const db = await connectToDatabase(process.env.MONGODB_URI);
  
  if (method === 'GET') {
    // Example: Retrieve items
    const items = await db.collection('items').find({}).toArray();
    res.status(200).json(items);
  } else if (method === 'POST') {
    // Example: Create new item
    const newItem = req.body;
    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json(result.ops[0]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST create a new item
router.post('/', async (req, res) => {
  try {
    console.log("Received item data on server:", req.body);
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error creating item:", err); // Should log the actual error
    res.status(500).json({ error: err.message });
  }
});


// PUT: Update or add a review for an item
router.put('/:id/review', async (req, res) => {
  try {
    const { review, userId } = req.body; // Expect review text and userId in request body
    const itemId = req.params.id;
    
    // Find the item
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    // Check if the user already has a review for this item
    const reviewIndex = item.reviews.findIndex(r => r.userId.toString() === userId);
    if (reviewIndex !== -1) {
      // Update existing review
      item.reviews[reviewIndex].text = review;
    } else {
      // Add new review if not exists
      item.reviews.push({ userId, text: review });
    }
    
    const updatedItem = await item.save();
    
    // Also update the user's reviews field
    const user = await User.findById(userId);
    if (user) {
      const userReviewIndex = user.reviews.findIndex(r => r.itemId.toString() === itemId);
      if (userReviewIndex !== -1) {
        user.reviews[userReviewIndex].text = review;
      } else {
        user.reviews.push({ itemId, text: review });
      }
      await user.save();
    }
    
    res.json(updatedItem);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all reviews for a specific item
router.get('/:id/reviews', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('reviews.userId', 'username');
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item.reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST a new review for a specific item
router.post('/:id/reviews', async (req, res) => {
  try {
    const { review, userId } = req.body; // Expect review text and userId in request body
    const itemId = req.params.id;
    
    // Find the item
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    // Check if review already exists for this user for this item
    const existingReview = item.reviews.find(r => r.userId.toString() === userId);
    if (existingReview) {
      return res.status(400).json({ error: "Review already exists for this user. Use PUT to update." });
    }
    
    // Add the new review
    item.reviews.push({ userId, text: review });
    const updatedItem = await item.save();

    // Update the user's reviews field
    const user = await User.findById(userId);
    if (user) {
      user.reviews.push({ itemId, text: review });
      await user.save();
    }
    
    res.status(201).json(updatedItem);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
