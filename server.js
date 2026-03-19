const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        messages: [
          { role: "system", content: req.body.system },
          ...req.body.messages
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("GROQ ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));