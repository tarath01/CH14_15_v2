/**
 * @author Taylor Rath
 * @class Trivia
 * @returns {Promise<void>}
 */
let correctAnswer;

function checkAnswer() {
    const result = document.getElementById("result");
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        result.textContent = "Please select True or False!";
        result.style.color = "orange";
        return;
    }

    const userAnswer = selected.value;  // "True" or "False"

    if (userAnswer === correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else {
        result.textContent = `Incorrect! The answer was: ${correctAnswer}`;
        result.style.color = "red";
    }
}
async function loadQuestion() {
    const messageEl = document.getElementById("message");
    const questionEl = document.getElementById("question");
    const result = document.getElementById("result");

    try {
        result.textContent = "";
        messageEl.textContent = "Loading...";
        const response = await fetch(`/trivia_api`);

        if (!response.ok) {
            throw new Error("Question not found!");
        }
        //found
        document.querySelectorAll('input[name="answer"]').forEach(r => r.checked = false);

        const data = await response.json();
        console.log(data);

        // Populate the card
        questionEl.textContent = data.question;
        correctAnswer = data.correct_answer;
        messageEl.textContent = "Successful Load";

    } catch (error) {
        questionEl.textContent = "Failed Load";
        messageEl.textContent = "Error: " + error.message;
    }
}
// Allow pressing Enter to search
loadQuestion();
