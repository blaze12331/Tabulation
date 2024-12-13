import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './PresentationAndDemonstration.css';

function PresentationAndDemonstration({ ratings, setRatings }) {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the location/state

  // Destructure values passed from the previous page
  const { panelName, teamName, technicalContentRating, projectInnovationAndImprovementRating } = location.state || {};

  // Function to handle rating button click
  const handleRatingClick = (question, rating) => {
    setRatings((prev) => ({
      ...prev,
      presentation: {
        ...prev.presentation,
        [question]: rating,
      },
    }));
  };

  // Function to handle the Next button click
  const handleNextClick = async () => {
    // Ensure all questions are answered
    const allQuestionsRated = ["question1", "question2"].every((key) => {
      const rating = ratings.presentation?.[key];
      return rating !== undefined && rating !== null && !isNaN(rating);
    });
  
    if (!allQuestionsRated) {
      alert("Please provide ratings for all questions before proceeding.");
      return;
    }
  
    // Prepare the data to be passed to the next page
    const data = {
      panelName,
      teamName,
      technicalContentRating,
      projectInnovationAndImprovementRating,
      presentationRating: {
        question1: {
          id: "Q1", // Provide the ID for question 1
          answer: ratings.presentation.question1,
        },
        question2: {
          id: "Q2", // Provide the ID for question 2
          answer: ratings.presentation.question2,
        },
      },
    };
  
    // Navigate to the next page and pass the data as state
    navigate("/evaluation", {
      state: {
        panelName,
        teamName,
        technicalContentRating,
        projectInnovationAndImprovementRating,
        presentationRating: data.presentationRating,
      },
    });
  
  };
  
  
  
  
  // Function to handle the Previous button click
  const handlePreviousClick = () => {
    navigate('/project-innovation-and-improvement'); // Navigate to the ProjectInnovationAndImprovement page
  };

  return (
    <div className="presentation-container">
      <Header />
      <div className="presentation-content">
        <h2 className="presentation-title">Presentation and Demonstration (20%)</h2>

        <div className="evaluation-card">
          <p className="evaluation-question">
            1. Clarity and Organization (10%): How clear and well-organized is the presentation and demonstration of the project?
          </p>
          <div className="rating-buttons-group">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                className={`rating-button ${
                  ratings.presentation?.question1 === i + 1 ? 'active' : ''
                }`}
                onClick={() => handleRatingClick('question1', i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="evaluation-card">
          <p className="evaluation-question">
            2. Audience Engagement and Q&A (10%): Does the presenter engage the audience effectively and handle questions confidently?
          </p>
          <div className="rating-buttons-group">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                className={`rating-button ${
                  ratings.presentation?.question2 === i + 1 ? 'active' : ''
                }`}
                onClick={() => handleRatingClick('question2', i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="navigation-buttons-container">
          <button
            className="navigation-button navigation-prev-button"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            className="navigation-button navigation-next-button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PresentationAndDemonstration;
