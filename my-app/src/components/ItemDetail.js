// components/ItemDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const itemsData = [
  {
    id: 1,
    name: 'Vinyl Record A',
    category: 'Vinyls',
    description: 'A classic vinyl record.',
    price: 20,
    image: 'https://example.com/vinyl1.jpg',
    rating: 8,
    reviews: ['Great sound quality!']
  },
  {
    id: 2,
    name: 'Antique Chair',
    category: 'Antique Furniture',
    description: 'A beautiful antique chair.',
    price: 150,
    image: 'https://example.com/chair.jpg',
    rating: 9,
    reviews: ['Very comfortable and historic.']
  },
  // add more items as needed
];

const ItemDetail = ({ user }) => {
  const { id } = useParams();
  const item = itemsData.find(i => i.id === parseInt(id));
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState(item ? item.reviews : []);

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    // Update rating logic would go here (e.g., API call)
    console.log(`User rated ${item.name} with ${rating}`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Update review logic would go here (e.g., API call)
    setReviews([...reviews, review]);
    setReview('');
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} width="300" />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Average Rating: {item.rating}</p>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((rev, index) => (
          <li key={index}>{rev}</li>
        ))}
      </ul>
      {user ? (
        <div>
          <form onSubmit={handleRatingSubmit}>
            <label>
              Rate Item (1-10):
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Rating</button>
          </form>
          <form onSubmit={handleReviewSubmit}>
            <label>
              Review Item:
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      ) : (
        <p>Please login to rate or review this item.</p>
      )}
    </div>
  );
};

export default ItemDetail;
