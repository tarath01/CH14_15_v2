/**
 * @author Taylor Rath
 * @summary This program is a trivia game, where it provides true/false
 * questions for the user to answer.
 * @date 04/30/2026
 * @link: https://github.com/tarath01/CH14_15_v2
 */

let correctAnswer;

function checkAnswer() {
    /**
     * For true/false messages, I had some help from AI.
     * I attempted several different ways, but was still having problems.
     * @type {HTMLElement}
     */
    const result = document.getElementById("result");
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        result.textContent = "Please select True or False!";
        result.style.color = "orange";
        return;
    }

    const userAnswer = selected.value;  // "True" or "False"
    /**
     * Shows message when answer's correct
     */
    if (userAnswer === correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else {
        /**
         * shows message when answer's incorrect
         * @type {`Incorrect! The answer was: ${string}`}
         */
        result.textContent = `Incorrect! The answer was: ${correctAnswer}`;
        result.style.color = "red";
    }
}

/**
 * function to loadQuestions
 * @returns {Promise<void>}
 */

async function loadQuestion() {
    const messageEl = document.getElementById("message");
    const questionEl = document.getElementById("question");
    const result = document.getElementById("result");

    try {
        result.textContent = "";
        /**
         * message shows when messages loading
         * @type {string}
         */
        messageEl.textContent = "Loading...";
        const response = await fetch(`/trivia_api`);
        /**
         * message shows when questions not found
         */
        if (!response.ok) {
            throw new Error("Question not found!");
        }
        document.querySelectorAll('input[name="answer"]').forEach(r => r.checked = false);

        const data = await response.json();
        console.log(data);

        /**
         * Populate the card
          */
        questionEl.textContent = data.question;
        correctAnswer = data.correct_answer;
        messageEl.textContent = "Successful Load";

    } catch (error) {
        questionEl.textContent = "Failed Load";
        messageEl.textContent = "Error: " + error.message;
    }
}

/**
 * Allow pressing Enter to search
 */
loadQuestion();
