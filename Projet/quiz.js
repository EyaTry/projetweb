document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Tool Made Language"
            ],
            correct: 0
        },
        {
            question: "What does CSS stand for?",
            answers: [
                "Creative Style Sheets",
                "Colorful Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets"
            ],
            correct: 2
        },
        {
            question: "What does JS stand for?",
            answers: [
                "JavaStyle",
                "JavaScript",
                "JustScript",
                "JQuery Script"
            ],
            correct: 1
        },
        {
            question: "What does SQL stand for?",
            answers: [
                "Structured Query Language",
                "Stylish Query Language",
                "Simple Query Language",
                "Standard Query Language"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of the `<head>` tag in HTML?",
            answers: [
                "To define the main content of the page",
                "To store metadata and links to stylesheets or scripts",
                "To define a header section",
                "To define a title only"
            ],
            correct: 1
        },
        {
            question: "Which of the following is used for styling web pages?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],
            correct: 1
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            answers: [
                "<ul>",
                "<ol>",
                "<li>",
                "<list>"
            ],
            correct: 0
        },
        {
            question: "Which language is used for dynamic websites?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript",
                "PHP"
            ],
            correct: 2
        },
        {
            question: "Which property is used to change the font size in CSS?",
            answers: [
                "font-size",
                "font-weight",
                "text-size",
                "size-font"
            ],
            correct: 0
        },
        {
            question: "Which of the following is not a valid HTML element?",
            answers: [
                "<div>",
                "<span>",
                "<p>",
                "<footer>"
            ],
            correct: 3
        },
        {
            question: "What is the correct HTML element for inserting a line break?",
            answers: [
                "<br>",
                "<break>",
                "<lb>",
                "<line>"
            ],
            correct: 0
        },
        {
            question: "How do you insert a comment in JavaScript?",
            answers: [
                "// This is a comment",
                "/* This is a comment */",
                "<-- This is a comment -->",
                ";; This is a comment"
            ],
            correct: 0
        },
        {
            question: "Which of the following is used for database management?",
            answers: [
                "HTML",
                "CSS",
                "SQL",
                "JavaScript"
            ],
            correct: 2
        }
    ];

      // DOM Elements
      const questionEl = document.querySelector(".question-text");
      const answersEl = document.querySelector(".answers");
      const progressBarEl = document.querySelector(".progress-bar");
      const feedbackEl = document.querySelector(".feedback");
      const resultEl = document.querySelector(".result");
      const restartBtn = document.querySelector(".restart");
      const questionNumberEl = document.querySelector(".current-question");
      const totalQuestionsEl = document.querySelector(".total-questions");
      const timeLeftEl = document.querySelector(".time-left");  // Timer span element
  
      let currentQuestionIndex = 0;
      let score = 0;
      let timer;
      const timeLimit = 30; // Time limit in seconds for each question
  
      // Load a question
      function loadQuestion() {
          const currentQuestion = quizData[currentQuestionIndex];
          questionEl.textContent = currentQuestion.question;
          questionNumberEl.textContent = currentQuestionIndex + 1;
          totalQuestionsEl.textContent = quizData.length;
  
          // Clear previous answers
          answersEl.innerHTML = "";
  
          // Add answers
          currentQuestion.answers.forEach((answer, index) => {
              const button = document.createElement("button");
              button.textContent = answer;
              button.addEventListener("click", () => checkAnswer(index));
              answersEl.appendChild(button);
          });
  
          // Update progress bar
          const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
          progressBarEl.style.width = `${progress}%`;
  
          // Start or reset the timer
          startTimer();
      }
  
      // Start or reset the timer
      function startTimer() {
          let timeLeft = timeLimit;
          timeLeftEl.textContent = timeLeft;  // Set the initial time to the span
  
          // Clear any existing timer
          if (timer) {
              clearInterval(timer);
          }
  
          // Countdown timer
          timer = setInterval(() => {
              timeLeft--;
              timeLeftEl.textContent = timeLeft;  // Update the displayed time
  
              if (timeLeft <= 0) {
                  clearInterval(timer);
                  feedbackEl.textContent = "Time's up!";
                  feedbackEl.style.color = "red";
                  feedbackEl.style.display = "block";
                  setTimeout(() => {
                      feedbackEl.style.display = "none";
                      currentQuestionIndex++;
                      if (currentQuestionIndex < quizData.length) {
                          loadQuestion();
                      } else {
                          showResult();
                      }
                  }, 1000);
              }
          }, 1000);
      }
  
      // Check the selected answer
      function checkAnswer(selectedIndex) {
          const currentQuestion = quizData[currentQuestionIndex];
  
          // Stop the timer
          clearInterval(timer);
  
          // Show feedback
          if (selectedIndex === currentQuestion.correct) {
              feedbackEl.textContent = "Correct!";
              feedbackEl.style.color = "green";
              score++;
          } else {
              feedbackEl.textContent = "Wrong!";
              feedbackEl.style.color = "red";
          }
  
          feedbackEl.style.display = "block";
  
          // Move to the next question after a short delay
          setTimeout(() => {
              feedbackEl.style.display = "none";
              currentQuestionIndex++;
  
              if (currentQuestionIndex < quizData.length) {
                  loadQuestion();
              } else {
                  showResult();
              }
          }, 1000);
      }
  
      // Show the final result
      function showResult() {
          questionEl.style.display = "none";
          answersEl.style.display = "none";
          resultEl.style.display = "block";
  
          resultEl.innerHTML = `
              <p>Your Score: ${score}/${quizData.length}</p>
              <p>You answered correctly to ${score} question(s).</p>
          `;
          restartBtn.style.display = "inline-block";
      }
  
      // Restart the quiz
      restartBtn.addEventListener("click", () => {
          currentQuestionIndex = 0;
          score = 0;
          questionEl.style.display = "block";
          answersEl.style.display = "flex";
          resultEl.style.display = "none";
          restartBtn.style.display = "none";
          loadQuestion();
      });
  
      // Initialize the quiz
      loadQuestion();
  });