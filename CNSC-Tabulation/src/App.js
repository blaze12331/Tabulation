import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./components/mainContent";
import Panel from "./components/Panel";
import TeamSelection from "./components/TeamSelection";
import TechContent from "./components/TechContent";
import ProjectInnovationAndImprovement from "./components/ProjectInnovationAndImprovement";
import PresentationAndDemonstration from "./components/PresentationAndDemonstration";
import EvaluationPage from "./components/EvaluationPage";
import AdminPage from "./components/AdminPage"; // Import AdminPage
import PanelSettings from "./components/PanelSettings"; // Import PanelSettings
import TeamSettings from "./components/TeamSettings";
import Login from "./components/Login"; // Import Login

function App() {
  // Shared state for ratings
  const [ratings, setRatings] = useState({
    techContent: {
      question1: null,
      question2: null,
      question3: null,
      question4: null,
    },
    projectInnovation: {
      question1: null,
      question2: null,
    },
    presentation: {
      question1: null,
      question2: null,
    },
    evaluation: {
      question1: null,
    },
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/team-selection" element={<TeamSelection />} />
        <Route
          path="/tech-content"
          element={
            <TechContent
              selectedRatings={ratings.techContent}
              setSelectedRatings={(newTechContent) =>
                setRatings((prev) => ({
                  ...prev,
                  techContent: newTechContent,
                }))
              }
            />
          }
        />
        <Route
          path="/project-innovation-and-improvement"
          element={
            <ProjectInnovationAndImprovement
              ratings={ratings}
              setRatings={setRatings}
            />
          }
        />
        <Route
          path="/presentation-and-demonstration"
          element={
            <PresentationAndDemonstration
              ratings={ratings}
              setRatings={setRatings}
            />
          }
        />
        <Route
          path="/evaluation"
          element={
            <EvaluationPage
              ratings={ratings}
              setRatings={setRatings}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} /> {/* AdminPage route */}
        <Route path="/dashboard" element={<AdminPage />} /> {/* Dashboard route */}
        <Route path="/panelsettings" element={<PanelSettings />} /> {/* PanelSettings route */}
        <Route path="/teamsettings" element={<TeamSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
