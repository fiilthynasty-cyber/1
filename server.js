import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/generate-prompt", (req, res) => {
  // Example prompts
  const prompts = [
    "Write a story about a robot in space.",
    "Describe a futuristic city with AI citizens.",
    "Create a dialogue between a human and an AI assistant.",
    "Invent a new tech gadget and explain how it works."
  ];
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  res.json({ prompt: randomPrompt });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
