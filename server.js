const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/trivia_api",async (req, res) => {
    try {

        const response = await fetch(`https://opentdb.com/api.php?amount=1&category=9&type=boolean`);

        if (!response.ok) {
            return res.status(404).json({ error: "Question not found" });
        }

        const data = await response.json();

        // Send back only the trivia we need
        res.json({
            question: data.results[0].question,
            correct_answer: data.results[0].correct_answer,
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});