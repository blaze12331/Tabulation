import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { AiOutlineDashboard } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { MdOutlineLogout, MdHelpOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle logout button click
  const handleLogout = () => {
    // You can perform any logout logic here (e.g., clearing user data, etc.)
    // After logout, redirect to the MainContent page
    navigate("/"); // This redirects to the home page (MainContent)
  };

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="profile-image"
        />
        <p className="profile-role">ADMIN</p>
        <h4 className="profile-name">Andrew Smith</h4>
      </div>
      <nav className="nav-menu">
        <ul>
          <p className="menu-heading">MAIN</p>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <AiOutlineDashboard className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/panelsettings"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <BsPerson className="icon" /> Panel
            </NavLink>
          </li>
          <li>
          <NavLink
  to="/teamsettings"
  className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
>
  <FaRegCalendarAlt className="icon" /> Teams
</NavLink>

      </li>
        </ul>
      </nav>
      <div className="settings-menu">
        <ul>
          
          
        </ul>
      </div>
      <div className="footer-menu">
        <ul>
          <li>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <MdHelpOutline className="icon-help" /> Help
            </NavLink>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          <MdOutlineLogout className="icon" /> Logout Account
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
