// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // Retrieve the logged in user from localStorage (if any)
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user from local storage and navigate to login page
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin Panel</Link>
      <Link to="/UserProfile">UserProfile</Link>
      {/* If user exists, show their name and a logout button */}
      {user && (
        <div className="user-info">
          <span>Hello, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
