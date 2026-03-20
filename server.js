import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // replace this

app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Turn this into a money-making idea: ${input}`
          }
        ],
      }),
    });

    const data = await response.json();

    res.json({
      output: data.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
