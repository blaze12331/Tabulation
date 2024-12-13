import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = ({ onBackClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin') {
      alert('Welcome, Admin!');
      navigate('/admin'); // Redirect to Content.js
    } else {
      alert('Invalid credentials. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login-form">
      <div className="admin-login-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-login-form-group">
            <label className="admin-login-username-label">Username</label>
            <input
              type="text"
              className="admin-login-username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="admin-login-form-group">
            <label className="admin-login-password-label">Password</label>
            <input
              type="password"
              className="admin-login-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="admin-login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button className="admin-login-back-button" onClick={onBackClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Login;
