// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        const response = await axios.post('http://localhost:5000/api/users', { username, password });
        alert("Registration successful. You can now log in.");
        setIsRegistering(false);
        setUsername('');
        setPassword('');
      } catch (error) {
        alert("Registration failed. Please try again.");
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${username}`);
        const user = response.data;
        if (user && user.password === password) {
          localStorage.setItem('user', JSON.stringify(user));
          navigate(user.isAdmin ? '/admin' : '/');
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login here." : "Don't have an account? Register here."}
      </p>
    </div>
  );
}

export default Login;
