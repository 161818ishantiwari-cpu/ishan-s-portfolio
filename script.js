
/* =================================
   PART 1: DARK / LIGHT MODE
================================= */

const themeButton = document.getElementById("theme-toggle");

// Check the saved theme when the page opens
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeButton.textContent = "🌙 Dark Mode";
}

// Change theme when button is clicked
themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {

        themeButton.textContent = "🌙 Dark Mode";

        localStorage.setItem("portfolio-theme", "light");

    } else {

        themeButton.textContent = "☀️ Light Mode";

        localStorage.setItem("portfolio-theme", "dark");

    }

});


/* =================================
   PART 2: QUIZ QUESTIONS
================================= */

const questions = [

    {
        question: "Which language is used to structure a webpage?",

        options: ["CSS", "HTML", "Python", "C++"],

        answer: "HTML"
    },

    {
        question: "Which data structure follows LIFO?",

        options: ["Queue", "Array", "Stack", "Linked List"],

        answer: "Stack"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        options: ["var", "int", "define", "string"],

        answer: "var"
    },

    {
        question: "Which of these is a programming language?",

        options: ["HTML", "CSS", "Python", "HTTP"],

        answer: "Python"
    },

    {
        question: "What is the time complexity of binary search?",

        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],

        answer: "O(log n)"
    }

];


/* =================================
   PART 3: SELECT HTML ELEMENTS
================================= */

const questionNumber = document.getElementById("question-number");

const questionElement = document.getElementById("question");

const optionsContainer = document.getElementById("options-container");

const nextButton = document.getElementById("next-btn");

const feedback = document.getElementById("feedback");

const quizContent = document.getElementById("quiz-content");

const resultContainer = document.getElementById("result-container");

const scoreElement = document.getElementById("score");

const restartButton = document.getElementById("restart-btn");


/* =================================
   PART 4: QUIZ VARIABLES
================================= */

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =================================
   PART 5: DISPLAY QUESTION
================================= */

function showQuestion() {

    answered = false;

    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Finish Quiz"
        : "Next Question";

    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionElement.textContent = current.question;

    optionsContainer.innerHTML = "";

    current.options.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        button.addEventListener("click", function () {

            selectAnswer(button, option);

        });

        optionsContainer.appendChild(button);

    });

}


/* =================================
   PART 6: CHECK ANSWER
================================= */

function selectAnswer(selectedButton, selectedOption) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons =
        optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach(function (button) {

        button.disabled = true;

        if (button.textContent === correctAnswer) {

            button.classList.add("correct");

        }

    });

    if (selectedOption === correctAnswer) {

        score++;

        feedback.textContent = "Correct Answer!";

        feedback.style.color = "#16a34a";

    } else {

        selectedButton.classList.add("incorrect");

        feedback.textContent =
            "Wrong Answer! Correct answer: " + correctAnswer;

        feedback.style.color = "#ef4444";

    }

    nextButton.disabled = false;

}


/* =================================
   PART 7: NEXT QUESTION
================================= */

nextButton.addEventListener("click", function () {

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


/* =================================
   PART 8: SHOW FINAL RESULT
================================= */

function showResult() {

    quizContent.hidden = true;

    resultContainer.hidden = false;

    scoreElement.textContent =
        "You scored " + score + " out of " +
        questions.length + "!";

}


/* =================================
   PART 9: RESTART QUIZ
================================= */

restartButton.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    quizContent.hidden = false;

    resultContainer.hidden = true;

    showQuestion();

});


/* =================================
   PART 10: START QUIZ
================================= */

showQuestion();
