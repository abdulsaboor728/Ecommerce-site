// client/src/components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
    seller: '',
    image: '',
    category: 'Vinyls',
    batteryLife: '',
    age: '',
    size: '',
    material: ''
  });

  // Retrieve the logged-in user from localStorage
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = e => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build a clean data object:
      const data = { ...itemData };

      // Convert numeric fields if provided; otherwise, remove them:
      if (itemData.price) {
        data.price = parseFloat(itemData.price);
      } else {
        delete data.price;
      }
      if (itemData.batteryLife) {
        data.batteryLife = parseFloat(itemData.batteryLife);
      } else {
        delete data.batteryLife;
      }
      if (itemData.age) {
        data.age = parseFloat(itemData.age);
      } else {
        delete data.age;
      }
      // Optionally remove empty string fields for clarity:
      Object.keys(data).forEach(key => {
        if (data[key] === '') {
          delete data[key];
        }
      });

      console.log("Submitting item data:", data);
      const response = await axios.post('http://localhost:5000/api/items', data);
      console.log("Item added:", response.data);
      alert("Item added successfully!");
      // Reset the form:
      setItemData({
        name: '',
        description: '',
        price: '',
        seller: '',
        image: '',
        category: 'Vinyls',
        batteryLife: '',
        age: '',
        size: '',
        material: ''
      });
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Check the console for errors.");
    }
  };

  // Ensure that only an admin can submit
  const isAdmin = user && user.isAdmin;

  // Style the panel based on admin status
  const containerStyle = {
    filter: isAdmin ? 'none' : 'blur(4px)',
    border: isAdmin ? '2px solid green' : 'none',
    padding: '10px',
    position: 'relative'
  };

  return (
    <div className="admin-panel panel" style={containerStyle}>
      <h1>Admin Panel</h1>
      {!isAdmin && (
        <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          You are not authorized to add items.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={itemData.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={itemData.description} onChange={handleChange} />
        <input name="price" placeholder="Price" value={itemData.price} onChange={handleChange} required />
        <input name="seller" placeholder="Seller" value={itemData.seller} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={itemData.image} onChange={handleChange} />
        <select name="category" value={itemData.category} onChange={handleChange}>
          <option value="Vinyls">Vinyls</option>
          <option value="Antique Furniture">Antique Furniture</option>
          <option value="GPS SportWatches">GPS SportWatches</option>
          <option value="Running Shoes">Running Shoes</option>
        </select>
        <input name="batteryLife" placeholder="Battery Life" value={itemData.batteryLife} onChange={handleChange} />
        <input name="age" placeholder="Age" value={itemData.age} onChange={handleChange} />
        <input name="size" placeholder="Size" value={itemData.size} onChange={handleChange} />
        <input name="material" placeholder="Material" value={itemData.material} onChange={handleChange} />
        <button type="submit" disabled={!isAdmin}>Add Item</button>
      </form>
    </div>
  );
}

export default Admin;
