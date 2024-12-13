import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./ProjectInnovationAndImprovement.css";

function ProjectInnovationAndImprovement({ ratings, setRatings }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    panelName = "Default Panel",
    teamName = "Default Team",
    technicalContentRating = {},
  } = location.state || {};

  const handleButtonClick = (question, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      projectInnovation: {
        ...prevRatings.projectInnovation,
        [question]: value,
      },
    }));
  };

  const handleNext = async () => {
    // Construct the payload
    const payload = {
      panelName,
      teamName,
      technicalContentRating,
      projectInnovationAndImprovementRating: ratings.projectInnovation || {},
    };
  
    console.log("Payload for Project Innovation:", JSON.stringify(payload, null, 2));
  
    // Directly navigate to the next page and pass the necessary data
    navigate("/presentation-and-demonstration", {
      state: {
        panelName,
        teamName,
        technicalContentRating,
        projectInnovationAndImprovementRating: ratings.projectInnovation,
      },
    });
  
  };
  
  
  

  const handlePrev = () => {
    navigate("/tech-content", {
      state: {
        panelName,
        teamName,
        technicalContentRating,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="project-innovation-title">
        <h2>Project Innovation and Improvement (30%)</h2>
      </div>
      <div className="project-innovation-container">
        {[
          {
            id: "question1",
            text: "1. Innovation in Robotics (15%): How innovative is the improvement in the robotics project, especially concerning IoT applications?",
          },
          {
            id: "question2",
            text: "2. Problem-Solving and Creativity (15%): Does the project show creative problem-solving and propose practical solutions?",
          },
        ].map((question) => (
          <div key={question.id} className="project-innovation-section">
            <p className="project-innovation-question-title">{question.text}</p>
            <div className="project-innovation-rating">
              {Array.from({ length: 15 }, (_, buttonIndex) => {
                const isActive = ratings.projectInnovation?.[question.id] === buttonIndex + 1;
                return (
                  <button
                    key={buttonIndex + 1}
                    className={isActive ? "active" : ""}
                    onClick={() => handleButtonClick(question.id, buttonIndex + 1)}
                  >
                    {buttonIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="project-innovation-navigation">
        <button onClick={handlePrev} className="prev-nav-button">
          Previous
        </button>
        <button onClick={handleNext} className="next-nav-button">
          Next
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ProjectInnovationAndImprovement;