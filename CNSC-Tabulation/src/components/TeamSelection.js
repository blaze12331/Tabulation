import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CNSClogo from "../assets/CNSC logo.png";
import BackIcon from "../assets/back-button.png";
import "./TeamSelection.css";
import axios from "axios";

const TeamSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { panelName } = location.state || {};
  const [teams, setTeams] = useState([]);
  const teamCardsRef = useRef(null);

  // Fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teams");
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error.message);
        alert("Failed to fetch teams. Please try again later.");
      }
    };

    fetchTeams();
  }, []);

  const handleBackClick = () => {
    navigate("/panel");
  };

  const handleTeamClick = async (teamName) => {
    try {
      if (!panelName) {
        alert("Panel name is missing. Please go back and select a panel name.");
        return;
      }

      navigate("/tech-content", { state: { panelName, teamName } });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to proceed with team selection. Please try again.");
    }
  };

  const scrollLeft = () => {
    if (teamCardsRef.current) {
      teamCardsRef.current.scrollBy({
        left: -300, // Scroll left by 300px
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  const scrollRight = () => {
    if (teamCardsRef.current) {
      teamCardsRef.current.scrollBy({
        left: 300, // Scroll right by 300px
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  return (
    <div className="ts-panel-container">
      <div className="ts-rectangle-overlay"></div>
      <div className="ts-extra-rectangle"></div>

      <div className="ts-panel-nav-header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" className="back-icon" />
        </button>
        <img src={CNSClogo} alt="Left Logo" className="ts-nav-logo left-logo" />
        <div className="ts-nav-title">
          Camarines Norte State College
          <br />
          <span className="ts-nav-subtitle">
            College of Computing and Multimedia Studies
          </span>
        </div>
        <img src={CNSClogo} alt="Right Logo" className="ts-nav-logo right-logo" />
      </div>

      <div className="team-selection-content">
        <h2>Select Team</h2>
        <div className="scroll-container">
          <button className="scroll-button left" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="team-cards" ref={teamCardsRef}>
            {teams.length === 0 ? (
              <p>No teams available. Please add teams in the settings.</p>
            ) : (
              teams.map((team) => (
                <button
                  key={team.teamNumber}
                  className="team-card"
                  onClick={() => handleTeamClick(team.teamName)}
                >
                  {team.teamName}
                </button>
              ))
            )}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            &#8250;
          </button>
        </div>
      </div>

      <div className="footer-line">
        <div className="footer-text">
          Theme: From Ideas to Discovery: CCMS Students Shaping the IoT Landscape emphasizes how CCMS students are transforming their ideas into real-world IoT discoveries.
        </div>
      </div>
    </div>
  );
};

export default TeamSelection;
