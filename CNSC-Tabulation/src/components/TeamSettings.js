import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import React Icon
import "./PanelSettings.css";
import Sidebar from "./Sidebar";
import axios from "axios";

function TeamSettings() {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teams");
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error.message);
        alert("Failed to fetch teams from the database.");
      }
    };

    fetchTeams();
  }, []);

  const handleAddClick = () => {
    setShowAddPanel(true);
  };

  const handleCancel = () => {
    setShowAddPanel(false);
    setTeamNumber("");
    setTeamName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!teamNumber || !teamName) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/teams", {
        teamNumber,
        teamName,
      });

      alert(response.data.message);

      setTeams([...teams, { teamNumber, teamName }]);
      setShowAddPanel(false);
      setTeamNumber("");
      setTeamName("");
    } catch (error) {
      console.error("Error saving team:", error.message);
      alert("Failed to save team!");
    }
  };

  const handleDelete = async (teamNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${teamNumber}`);
      alert("Team deleted successfully!");

      // Remove the deleted team from the UI
      setTeams(teams.filter((team) => team.teamNumber !== teamNumber));
    } catch (error) {
      console.error("Error deleting team:", error.message);
      alert("Failed to delete team!");
    }
  };

  return (
    <div className="panelsettings">
      <Sidebar />
      <div className="panelsettings-content">
        <div className="panelsettings-container">
          <div className="panelsettings-header">
            <h1>Team Settings</h1>
            <button
              className="panelsettings-add-button"
              onClick={handleAddClick}
            >
              Add +
            </button>
          </div>

          <div className="teams-list">
            <h2>Added Teams</h2>
            {teams.length === 0 ? (
              <p>No teams added yet.</p>
            ) : (
              <ul className="team-list">
                {teams.map((team) => (
                  <li key={team.teamNumber} className="team-list-item">
                    <div className="team-info">
                      <span className="team-number">Team {team.teamNumber}</span>
                      <span className="team-name"> - {team.teamName}</span>
                    </div>
                    <button
                      className="team-delete-button"
                      onClick={() => handleDelete(team.teamNumber)}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {showAddPanel && (
            <div className="add-panel-modal">
              <div className="add-panel-form">
                <h2>Add Team</h2>
                <form>
                  <div className="form-group">
                    <label>Team No.</label>
                    <input
                      type="text"
                      value={teamNumber}
                      onChange={(e) => setTeamNumber(e.target.value)}
                      placeholder="Team Number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Team Name</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                    />
                  </div>
                  <div className="form-buttons">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="save-button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamSettings;
