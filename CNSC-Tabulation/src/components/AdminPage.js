import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { Chart } from "chart.js/auto";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./AdminPage.css"; // Import the CSS file

// Legend Component for the chart
const Legend = ({ data }) => (
  <div className="legend">
    <h4>Legends</h4>
    <ul className="legend-list">
      {data.map(({ team, color }, index) => (
        <li key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: color }}
          ></span>
          {team}
        </li>
      ))}
    </ul>
  </div>
);

const AdminPage = () => {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        datasets: [
          {
            label: "Rating",
            data: [90, 40, 100, 10, 30, 70, 50, 100, 70, 10, 60, 100],
            backgroundColor: [
              ...Array(12).fill("rgba(75, 192, 192, 0.5)"),
              "rgba(255, 99, 132, 0.5)", // Highlight
            ],
            borderColor: [
              ...Array(12).fill("rgba(75, 192, 192, 1)"),
              "rgba(255, 99, 132, 1)", // Highlight border
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#333",
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#333",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#e0e0e0",
            },
            ticks: {
              color: "#333",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Legends data
  const legendData = [
    { team: "Team 1", color: "rgba(75, 192, 192, 0.5)" },
    { team: "Team 2", color: "rgba(255, 99, 132, 0.5)" },
    { team: "Team 3", color: "rgba(54, 162, 235, 0.5)" },
    { team: "Team 4", color: "rgba(255, 206, 86, 0.5)" },
    { team: "Team 5", color: "rgba(153, 102, 255, 0.5)" },
    { team: "Team 6", color: "rgba(255, 159, 64, 0.5)" },
    { team: "Team 7", color: "rgba(201, 203, 207, 0.5)" },
  ];

  const panelistData = [
    { name: "Kristin Watson", progress: 70, done: "7/10" },
    { name: "Darlene Robertson", progress: 50, done: "5/10" },
    { name: "Jenny Wilson", progress: 90, done: "9/10" },
    { name: "Wade Warren", progress: 100, done: "10/10" },
  ];

  const rankingData = [
    { team: "Team 1", score: "98%" },
    { team: "Team 2", score: "95%" },
    { team: "Team 3", score: "90%" },
    { team: "Team 4", score: "85%" },
    { team: "Team 5", score: "80%" },
  ];

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">

        {/* Chart Section */}
        <section className="chart-section">
          <div className="chart">
            <h3>Team Performance</h3>
            <canvas ref={chartRef}></canvas>
          </div>

          {/* Legends */}
          <Legend data={legendData} />
        </section>

        {/* Panels Section */}
        <section className="panels">
          {/* Panelist Progress */}
          <div className="panel progress-panel">
            <h4>Panelist Progress</h4>
            <ul>
              {panelistData.map((panelist, index) => (
                <li key={index} className="panelist-item">
                  <div className="info">
                    <span>{panelist.name}</span>
                    <span>{panelist.done} jobs done</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${panelist.progress}%` }}
                    ></div>
                    <span className="progress-text">{panelist.progress}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Ranking */}
          <div className="panel ranking-panel">
            <h4>Top 5 Rankings</h4>
            <ul className="ranking-list">
              {rankingData.map((team, index) => (
                <li key={index} className="ranking-item">
                  {/* Team Avatar */}
                  <div className="ranking-avatar"></div>

                  {/* Team Info */}
                  <div className="ranking-info">
                    <span className="ranking-team">{team.team}</span>

                    {/* Progress Bar */}
                    <div className="ranking-progress-bar-container">
                      <div
                        className="ranking-progress-bar"
                        style={{ width: team.score }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Score */}
                  <span className="ranking-score">{team.score}</span>

                  {/* Rank Badge */}
                  <div className="ranking-badge">{index + 1}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Overall Progress */}
          <div className="panel overall-progress">
  <h4>Overall Progress</h4>
  <div className="circular-progress-container">
    <CircularProgressbar
      value={75}
      text={`75`}
      styles={buildStyles({
        textSize: "16px",
        textColor: "#333",
        pathColor: "#4caf50", // Green for "Done"
        trailColor: "#f44336", // Red for "InProgress"
      })}
    />
  </div>
  <div className="progress-segments">
    <div className="progress-segment">
      <span className="segment-color segment-done"></span>
      <span>Done</span>
    </div>
    <div className="progress-segment">
      <span className="segment-color segment-in-progress"></span>
      <span>In Progress</span>
    </div>
  </div>
</div>;

        </section>
      </main>
    </div>
  );
};

export default AdminPage;
