// client/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemReview from './ItemReview'; // Make sure this component is created

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="container">
      <div className="home-panel panel">
        <h1>E-Commerce Home</h1>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          items.map(item => (
            <div key={item._id} className="item-card">
              {item.image && <img src={item.image} alt={item.name} />}
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              {/* Place the review form right under each item */}
              <ItemReview itemId={item._id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
