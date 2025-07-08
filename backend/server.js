const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
  try {
    const pistonResponse = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(pistonResponse.data);
  } catch (error) {
    console.error("Piston API error:", error.message);
    res.status(500).json({ error: "Execution failed." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
