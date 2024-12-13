import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CNSClogo from "../assets/CNSC logo.png";
import BackIcon from "../assets/back-button.png";
import axios from "axios";
import "./Panel.css";

const Panel = () => {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("");
  const [panelists, setPanelists] = useState([]);

  // Fetch panelist data on component mount
  useEffect(() => {
    const fetchPanelists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/panelists");
        setPanelists(response.data.panelists); // Assuming response includes a "panelists" array
      } catch (error) {
        console.error("Error fetching panelists:", error.message);
        alert("Failed to fetch panelists from the database.");
      }
    };

    fetchPanelists();
  }, []);

  // Handle back button click
  const handleBackClick = () => {
    navigate("/"); // Navigate back to MainContent
  };

  // Handle confirm button click
  const handleConfirmClick = () => {
    if (!selectedName) {
      alert("Please select your name before confirming.");
      return;
    }

    // Pass the panel name to Team Selection via navigate
    navigate("/team-selection", { state: { panelName: selectedName } });
  };

  return (
    <div className="panel-container">
      {/* Navigation Header */}
      <div className="panel-nav-header">
        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" className="back-icon" />
        </button>

        <img src={CNSClogo} alt="Left Logo" className="nav-logo left-logo" />
        <div className="nav-title">
          Camarines Norte State College
          <br />
          <span className="nav-subtitle">
            College of Computing and Multimedia Studies
          </span>
        </div>
        <img src={CNSClogo} alt="Right Logo" className="nav-logo right-logo" />
      </div>

      {/* Background Rectangles */}
      <div className="rectangle-overlay"></div>
      <div className="extra-rectangle"></div>

      {/* Main Content */}
      <div className="panel-overlay">
        <div className="header-container">
          <img src={CNSClogo} alt="CNSC Logo" className="logo" />
          <h2 className="college-name">Camarines Norte State College</h2>
          <h3 className="department-name">
            College of Computing and Multimedia Studies
          </h3>
        </div>

        {/* Panel Content */}
        <div className="panel-content">
          <h1>PANEL</h1>
          <p>Please select your name</p>
          <div className="dropdown-container">
            <select
              className="name-dropdown"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            >
              <option value="">E.g., Select Your Name</option>
              {panelists.map((panelist) => (
                <option
                  key={panelist._id} // Use a unique identifier like `_id`
                  value={`${panelist.firstName} ${panelist.lastName}`}
                >
                  {panelist.firstName} {panelist.lastName}
                </option>
              ))}
            </select>
          </div>
          <button
            className="confirm-button"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>

        {/* Footer */}
        <div className="footer-line">
          <div className="footer-text">
            Theme: From Ideas to Discovery: CCMS Students Shaping the IoT
            Landscape emphasizes how CCMS students are transforming their ideas
            into real-world IoT discoveries.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
