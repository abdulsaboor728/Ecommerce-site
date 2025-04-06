// seed.js
const mongoose = require('mongoose');
const Item = require('C:\\Users\\PC\\Desktop\\Saboor Assignment\\server\\models\\Item.js'); // adjust path if necessary
require('dotenv').config();

const items = [
  {
    name: 'Classic Vinyl Record',
    description: 'A classic vinyl record from the 1970s.',
    price: 29.99,
    seller: 'Vintage Shop',
    image: 'https://example.com/vinyl.jpg',
    category: 'Vinyls'
  },
  {
    name: 'Antique Chair',
    description: 'An antique chair made of wood, perfect for collectors.',
    price: 150,
    seller: 'Antique Store',
    image: 'https://example.com/chair.jpg',
    category: 'Antique Furniture'
  },
  {
    name: 'GPS Sport Watch',
    description: 'A high-tech GPS sport watch for athletes.',
    price: 199.99,
    seller: 'Sports Store',
    image: 'https://example.com/watch.jpg',
    batteryLife: 24,
    category: 'GPS SportWatches'
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes designed for performance.',
    price: 79.99,
    seller: 'Shoe Store',
    image: 'https://example.com/shoes.jpg',
    size: '10',
    material: 'Mesh',
    category: 'Running Shoes'
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    // Optionally clear existing items:
    await Item.deleteMany({});
    console.log("Cleared old items");

    // Insert the seed items:
    await Item.insertMany(items);
    console.log("Seed data inserted");

    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to MongoDB Atlas", err);
  });
