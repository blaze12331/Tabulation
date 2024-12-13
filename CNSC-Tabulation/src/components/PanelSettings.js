import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import React Icon
import "./PanelSettings.css";
import Sidebar from "./Sidebar";
import axios from "axios";

function PanelSettings() {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [panelists, setPanelists] = useState([]);

  useEffect(() => {
    const fetchPanelists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/panelists");
        setPanelists(response.data.panelists);
      } catch (error) {
        console.error("Error fetching panelists:", error.message);
        alert("Failed to fetch panelists from the database.");
      }
    };

    fetchPanelists();
  }, []);

  const handleAddClick = () => {
    setShowAddPanel(true);
  };

  const handleCancel = () => {
    setShowAddPanel(false);
    setFirstName("");
    setLastName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/panelists", {
        firstName,
        lastName,
      });

      alert(response.data.message);

      setPanelists([...panelists, { firstName, lastName }]);
      setShowAddPanel(false);
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error saving panelist:", error.message);
      alert("Failed to save panelist!");
    }
  };

  const handleDelete = async (firstName) => {
    try {
      await axios.delete(`http://localhost:5000/api/panelists/${firstName}`);
      alert("Panelist deleted successfully!");

      // Remove the deleted panelist from the UI
      setPanelists(panelists.filter((panelist) => panelist.firstName !== firstName));
    } catch (error) {
      console.error("Error deleting panelist:", error.message);
      alert("Failed to delete panelist!");
    }
  };

  return (
    <div className="panelsettings">
      <Sidebar />
      <div className="panelsettings-content">
        <div className="panelsettings-container">
          <div className="panelsettings-header">
            <h1>Panelist Settings</h1>
            <button
              className="panelsettings-add-button"
              onClick={handleAddClick}
            >
              Add +
            </button>
          </div>

          <div className="panelists-list">
            <h2>Added Panelists</h2>
            {panelists.length === 0 ? (
              <p>No panelists added yet.</p>
            ) : (
              <ul className="panelist-list">
                {panelists.map((panelist) => (
                  <li key={panelist.firstName} className="panelist-list-item">
                    <div className="panelist-info">
                      <span className="panelist-name">
                        {panelist.firstName} {panelist.lastName}
                      </span>
                    </div>
                    <button
                      className="panelist-delete-button"
                      onClick={() => handleDelete(panelist.firstName)}
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
                <h2>Add Panelist</h2>
                <form>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
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

export default PanelSettings;
