import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import "./TechContent.css";

const TechnicalContent = ({ selectedRatings, setSelectedRatings }) => {
  const navigate = useNavigate();

  // Handle the click of a rating button
  const handleRatingClick = (question, value) => {
    setSelectedRatings({
      ...selectedRatings,
      [question]: value, // Update specific question's rating
    });
  };

  const location = useLocation();
  const { panelName } = location.state || {}; // Retrieve panelName from state
  const { teamName } = location.state || {};

  const handleNext = () => {
    // List of all expected questions
    const requiredQuestions = ["question1", "question2", "question3", "question4"];

    // Check if all required questions have a selected rating
    const allQuestionsRated = requiredQuestions.every(
      (question) => selectedRatings[question] !== null
    );

    if (!allQuestionsRated) {
      alert("Please select a rating for all questions before proceeding!");
      return; // Prevent navigation if not all questions are rated
    }

    // Navigate to the next page with the current state
    navigate("/project-innovation-and-improvement", {
      state: {
        panelName: panelName || "Default Panel",
        teamName: teamName || "Default Team",
        technicalContentRating: {
          question1: { id: "Q1", answer: selectedRatings.question1 },
          question2: { id: "Q2", answer: selectedRatings.question2 },
          question3: { id: "Q3", answer: selectedRatings.question3 },
          question4: { id: "Q4", answer: selectedRatings.question4 },
        },
      },
    });
  };

  return (
    <div className="technical-content-container">
      <Header />
      <div className="technical-content">
        <h2>Technical Content (40%)</h2>
        <div className="content-grid">
          {[
            {
              id: "question1",
              title: "1. Comprehension of IoT Trends and Characteristics (10%)",
              description:
                "How well does the project outline the current trends, key technologies, and characteristics in the IoT field?",
            },
            {
              id: "question2",
              title: "2. Challenges in IoT (10%)",
              description:
                "How well are the challenges faced in the IoT ecosystem addressed (security, scalability, interoperability, etc.)?",
            },
            {
              id: "question3",
              title: "3. Wireless Sensor Networks and IoT Integration (10%)",
              description:
                "Are the relationships between wireless sensor networks and IoT clearly defined and demonstrated?",
            },
            {
              id: "question4",
              title:
                "4. Intelligent Information Processing and Internet Operations (10%)",
              description:
                "How well does the project compare traditional Internet operations with IoT operations and integrate intelligent information processing?",
            },
          ].map((question) => (
            <div className="content-box" key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <div className="rating">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    className={`rating-button ${
                      selectedRatings[question.id] === i + 1 ? "selected" : ""
                    }`}
                    onClick={() => handleRatingClick(question.id, i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Next Button */}
        <div className="next-button-container">
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechnicalContent;
