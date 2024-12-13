import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CNSClogo from '../assets/CNSC logo.png';
import Login from './Login';
import './mainContent.css';

const MainContent = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Open the login modal
  const handleAdminClick = () => {
    setIsLoginOpen(true);
  };

  // Close the login modal
  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  // Handle successful login
  const handleLoginSuccess = (username) => {
    if (username === "admin") {
      navigate("/admin"); // Navigate to admin page
    }
    setIsLoginOpen(false); // Close login modal after success
  };

  return (
    <div className="main-container">
      {/* Rectangle overlays */}
      <div className="extra-rectangle"></div>
      <div className="footer-line">
        <div className="footer-text">
          Theme: From Ideas to Discovery: CCMS Students Shaping the IoT Landscape. Emphasizes how CCMS students are transforming their ideas into real-world IoT discoveries.
        </div>
      </div>

      {/* Main content overlay */}
      <div className="overlay">
        <div className="header-container">
          <img src={CNSClogo} alt="CNSC Logo" className="logos" />
        </div>
        <div className="button-container">
          <button className="custom-button" onClick={() => navigate('/panel')}>
            Panel
          </button>
          <button className="custom-button" onClick={handleAdminClick}>
            Admin
          </button>
        </div>
      </div>

      {/* Conditional rendering for Login popup */}
      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content">
            <Login
              onBackClick={handleCloseLogin}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
