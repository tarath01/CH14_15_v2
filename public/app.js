/**
 * @author Taylor Rath
 * @class Trivia
 * @returns {Promise<void>}
 */
let correctAnswer;

function checkAnswer() {

}
async function loadQuestion() {
    const status = document.getElementById("status");
    const questionEl = document.getElementById("question");

    try {
        status.textContent = "Loading...";
        const response = await fetch(`/api`);

        if (!response.ok) {
            throw new Error("Trivia not found!");
        }

        const data = await response.json();
        console.log(data);

        // Populate the card
        questionEl.textContent = data.question;
        correctAnswer = data.correct_answer;
        status.textContent = "";

    } catch (error) {
        questionEl.textContent = "Error: " + error.message;
    }
}
// Allow pressing Enter to search
            loadQuestion();
