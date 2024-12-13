import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./EvaluationPage.css";

function EvaluationPage({ ratings, setRatings }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { panelName, teamName, technicalContentRating, projectInnovationAndImprovementRating,presentationRating } = location.state || {};
  // Function to handle rating button click
 

  
  // Function to handle the Finish button click
  // Function to handle rating button click
const handleRatingClick = (question, rating) => {
    setRatings((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [question]: rating, // This remains the same for numeric ratings
      },
    }));
  };
  
  // Function to handle the Finish button click
  const handleFinishClick = async () => {
    try {
      // Prepare API payload
      const data = {
        panelName,
        teamName,
        technicalContentRating,
        projectInnovationAndImprovementRating,
        presentationRating,
        evaluationRating: {
          question1: {
            id: "Q1",
            answer: ratings.evaluation?.question1 || null,
          },
        },
      };
  
      // Ensure all questions have been answered
      const allQuestionsRated = Object.values(data.evaluationRating).every(
        (item) => item.answer !== null && item.answer !== ""
      );
  
      if (!allQuestionsRated) {
        alert("Please rate all evaluation questions before finishing.");
        return;
      }
  
      // Make API call to save evaluation ratings
      const response = await fetch("http://localhost:5000/api/evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Evaluation ratings saved successfully!");
        // Reset ratings and navigate to the home page
        setRatings({
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
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving evaluation ratings:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div className="evaluation-container">
      <Header />
      <div className="evaluation-content">
        <h2 className="evaluation-title">Impact and Relevance (10%)</h2>
        <div className="evaluation-card">
          <p className="evaluation-question">
            1. Real-World Application and Relevance (10%): How well does the
            project address real-world IoT applications and demonstrate its
            relevance to current industry needs?
          </p>
          <div className="rating-buttons-group">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                className={`rating-button ${
                  ratings.evaluation?.question1 === i + 1 ? "active" : ""
                }`}
                onClick={() => handleRatingClick("question1", i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <button className="finish-button" onClick={handleFinishClick}>
          FINISH
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default EvaluationPage;
