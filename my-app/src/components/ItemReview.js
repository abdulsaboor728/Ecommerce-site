// client/src/components/ItemReview.js
import React, { useState } from 'react';
import axios from 'axios';

function ItemReview({ itemId }) {
  const [review, setReview] = useState('');
  
  // Retrieve current user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/items/${itemId}/reviews`, {
        review,
        userId: user._id
      });
      console.log("Review updated:", response.data);
      setReview('');
      alert("Your review has been saved.");
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review.");
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Leave a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea 
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          style={{ width: '100%', height: '100px', padding: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ItemReview;
