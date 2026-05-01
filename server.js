/**
 * @author Taylor Rath
 * @summary This program is a trivia game, where it provides true/false
 * questions for the user to answer.
 * @date 04/30/2026
 * @link: https://github.com/tarath01/CH14_15_v2
 */

/**
 * express
 * @type {e | (() => Express)}
 */
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
/**
 * API get
 */
app.get("/trivia_api",async (req, res) => {
    try {

        const response = await fetch(`https://opentdb.com/api.php?amount=1&category=9&type=boolean`);

        if (!response.ok) {
            return res.status(404).json({ error: "Question not found" });
        }

        const data = await response.json();

        /**
         * Send back only the trivia we need
         */

        res.json({
            question: data.results[0].question,
            correct_answer: data.results[0].correct_answer,
        });
        /**
         * Error Message
         */
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});
/**
 * @class server host
 */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});