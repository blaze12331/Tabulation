import React from 'react';
import './Header.css';
import logo from '../assets/CNSC logo2.png'; // Place your logo file in the "assets" folder

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="CNSC Logo" className="header-logo" />
        <div className="header-text">
          <h1>Camarines Norte State College</h1>
          <h2>College of Computing and Multimedia Studies</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
