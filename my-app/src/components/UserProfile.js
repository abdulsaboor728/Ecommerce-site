// components/UserProfile.js
import React, { useEffect, useState } from 'react';

const UserProfile = ({ user: propUser }) => {
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      // Attempt to get the user from localStorage if it's not passed as a prop
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [propUser]);

  if (!user) {
    return <div><p>Loading user data...</p></div>;
  }

  return (
    <div className="container panel">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Average Rating Given:</strong> {user.averageRating || 'N/A'}</p>
      <h3>Your Reviews</h3>
      <ul>
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews.map((rev, index) => (
            <li key={index}>
              {/* Adjust depending on review structure */}
              {typeof rev === 'object' && rev.text ? rev.text : rev}
            </li>
          ))
        ) : (
          <li>No reviews yet</li>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
