require("dotenv").config(); // For environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors()); 

const MONGO_URI = "mongodb+srv://cuatro:1234@cluster0.lghjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// MongoDB Schemas and Models
const panelistSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}, { timestamps: true });

const Panelist = mongoose.model("Panelist", panelistSchema);

// Create a new panelist
app.post("/api/panelists", async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPanelist = new Panelist({ firstName, lastName });
    await newPanelist.save();
    res.status(201).json({ message: "Panelist created successfully", panelist: newPanelist });
  } catch (error) {
    console.error("Error saving panelist:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all panelists
app.get("/api/panelists", async (req, res) => {
  try {
    const panelists = await Panelist.find();
    res.status(200).json({ panelists });
  } catch (error) {
    console.error("Error fetching panelists:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a panelist by first name
app.delete("/api/panelists/:firstName", async (req, res) => {
  const { firstName } = req.params;

  try {
    const deletedPanelist = await Panelist.findOneAndDelete({ firstName });

    if (!deletedPanelist) {
      return res.status(404).json({ error: "Panelist not found" });
    }

    res.status(200).json({ message: "Panelist deleted successfully" });
  } catch (error) {
    console.error("Error deleting panelist:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


const EvaluationSchema = new mongoose.Schema({
  panelName: { type: String, required: true },
  teamName: { type: String, required: true },
  technicalContentRating: {
    question1: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
    question2: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
    question3: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
    question4: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
  },
  projectInnovationAndImprovementRating: {
    question1: { type: Number, required: true },
    question2: { type: Number, required: true },
  },
  presentationRating: {
    question1: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
    question2: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
  },
  evaluationRating: {
    question1: { id: { type: String, required: true }, answer: { type: mongoose.Schema.Types.Mixed, required: true } },
  },
});

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

// Panelists Endpoints

// Evaluation Endpoint
app.post("/api/evaluation", async (req, res) => {
  try {
    const {
      panelName,
      teamName,
      technicalContentRating,
      projectInnovationAndImprovementRating,
      presentationRating,
      evaluationRating,
    } = req.body;

    const evaluation = new Evaluation({
      panelName,
      teamName,
      technicalContentRating,
      projectInnovationAndImprovementRating,
      presentationRating,
      evaluationRating,
    });

    await evaluation.save();

    res.status(201).json({ message: "Evaluation data saved successfully", data: evaluation });
  } catch (error) {
    console.error("Error saving evaluation and ratings:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const teamSchema = new mongoose.Schema({
  teamNumber: { type: String, required: true },
  teamName: { type: String, required: true },
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);

// Create a new team
app.post("/api/teams", async (req, res) => {
  const { teamNumber, teamName } = req.body;

  if (!teamNumber || !teamName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newTeam = new Team({ teamNumber, teamName });
    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error("Error saving team:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all teams
app.get("/api/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a team by team number
app.delete("/api/teams/:teamNumber", async (req, res) => {
  const { teamNumber } = req.params;

  try {
    const deletedTeam = await Team.findOneAndDelete({ teamNumber });

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/api/evaluations/scores", async (req, res) => {
  try {
    const evaluations = await Evaluation.find();

    const scores = evaluations.map((evaluation) => {
      const technicalContent =
        (evaluation.technicalContentRating.question1.answer +
          evaluation.technicalContentRating.question2.answer +
          evaluation.technicalContentRating.question3.answer +
          evaluation.technicalContentRating.question4.answer) /
        4;

      const projectInnovation =
        (evaluation.projectInnovationAndImprovementRating.question1 +
          evaluation.projectInnovationAndImprovementRating.question2) /
        2;

      const presentation =
        (evaluation.presentationRating.question1.answer +
          evaluation.presentationRating.question2.answer) /
        2;

      const impactAndRelevance = evaluation.evaluationRating.question1.answer;

      const totalScore =
        technicalContent * 0.4 +
        projectInnovation * 0.3 +
        presentation * 0.2 +
        impactAndRelevance * 0.1;

      return {
        teamName: evaluation.teamName,
        totalScore: totalScore.toFixed(2),
      };
    });

    res.status(200).json({ scores });
  } catch (error) {
    console.error("Error fetching scores:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

