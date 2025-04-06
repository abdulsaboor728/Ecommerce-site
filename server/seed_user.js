// seed_users.js
const mongoose = require('mongoose');
const User = require('C:\\Users\\PC\\Desktop\\Saboor Assignment\\server\\models\\User.js'); // adjust the path if necessary
require('dotenv').config();

const users = [
  {
    username: 'admin',
    password: 'adminpass', // For demonstration only; in production, always hash passwords!
    isAdmin: true,
    averageRating: 0,
    reviews: []
  },
  {
    username: 'user1',
    password: 'user1pass',
    isAdmin: false,
    averageRating: 0,
    reviews: []
  },
  {
    username: 'user2',
    password: 'user2pass',
    isAdmin: false,
    averageRating: 0,
    reviews: []
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    // Optionally clear existing users:
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Insert the seed users:
    await User.insertMany(users);
    console.log("Seed data inserted successfully");

    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to MongoDB Atlas", err);
  });
