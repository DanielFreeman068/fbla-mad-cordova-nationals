import config from '../js/config.js';

const questionPool = {
    Math: {
    100: [
        { q: "What is the square root of 144?", a: "12" },
        { q: "What is 7 x 8?", a: "56" },
        { q: "What is 25% of 80?", a: "20" },
        { q: "What is 100 ÷ 5?", a: "20" },
        { q: "What is 9 + 10?", a: "19" }
    ],
    200: [
        { q: "What is 15% of 200?", a: "30" },
        { q: "What is the value of π rounded to 2 decimal places?", a: "3.14" },
        { q: "What is the sum of angles in a triangle?", a: "180" },
        { q: "What is 3 x 9?", a: "27" },
        { q: "What is the product of 5 and 6?", a: "30" }
    ],
    300: [
        { q: "If a triangle has angles of 90° and 45°, what is the third angle?", a: "45" },
        { q: "What is the square root of 169?", a: "13" },
        { q: "What is 2 to the 6th power?", a: "64" },
        { q: "What is the value of 4 cubed?", a: "64" },
        { q: "What is 8 ÷ 2?", a: "4" }
    ],
    400: [
        { q: "What is 7 factorial (7!)?", a: "5040" },
        { q: "What is the area of a circle with radius 5? (Use 3.14 for π)", a: "78.5" },
        { q: "What is the cube root of 27?", a: "3" },
        { q: "What is 5 squared?", a: "25" },
        { q: "What is 2 raised to the power of 10?", a: "1024" }
    ],
    500: [
        { q: "In a right triangle, if one angle is 30°, what is the ratio of the shortest side to the hypotenuse?", a: "1/2" },
        { q: "What is the sum of the first 10 prime numbers?", a: "129" },
        { q: "What is the value of e rounded to 2 decimal places?", a: "2.72" },
        { q: "What is the square of 12?", a: "144" },
        { q: "What is the logarithm of 100?", a: "2" }
    ]
    },
    Science: {
    100: [
        { q: "What is the chemical symbol for gold?", a: "Au" },
        { q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen" },
        { q: "What is the chemical formula for water?", a: "H2O" },
        { q: "What is the atomic number of hydrogen?", a: "1" },
        { q: "What gas do we breathe in?", a: "Oxygen" }
    ],
    200: [
        { q: "Which planet is known as the Red Planet?", a: "Mars" },
        { q: "What is the largest organ in the human body?", a: "Skin" },
        { q: "What is the chemical symbol for silver?", a: "Ag" },
        { q: "What is the chemical symbol for oxygen?", a: "O" },
        { q: "What is the boiling point of water in Celsius?", a: "100" }
    ],
    300: [
        { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
        { q: "Which gas do plants absorb from the air?", a: "Carbon Dioxide" },
        { q: "What is the closest star to Earth?", a: "Sun" },
        { q: "What is the chemical formula for methane?", a: "CH4" },
        { q: "What is the primary component of the Earth's atmosphere?", a: "Nitrogen" }
    ],
    400: [
        { q: "What is the atomic number of carbon?", a: "6" },
        { q: "What is the powerhouse of the cell?", a: "Mitochondria" },
        { q: "What is the chemical symbol for lead?", a: "Pb" },
        { q: "What is the freezing point of water in Celsius?", a: "0" },
        { q: "What is the atomic number of oxygen?", a: "8" }
    ],
    500: [
        { q: "What is the speed of light in kilometers per second (rounded to nearest thousand)?", a: "300000" },
        { q: "What particle has a negative charge?", a: "Electron" },
        { q: "What is absolute zero in Celsius?", a: "-273" },
        { q: "What is the most abundant element in the universe?", a: "Hydrogen" },
        { q: "What is the chemical symbol for mercury?", a: "Hg" }
    ]
    },
    English: {
        100: [
            { q: "What word means the opposite of 'sad'?", a: "Happy" },
            { q: "What part of speech is the word 'happiness'?", a: "Noun" },
            { q: "What is the opposite of 'difficult'?", a: "Easy" },
            { q: "Which word means 'to jump' or 'to run'?", a: "Verb" },
            { q: "What is the plural form of 'child'?", a: "Children" }
        ],
        200: [
            { q: "Which sentence is correct: 'He is tall' or 'He are tall'?", a: "He is tall." },
            { q: "What is the past tense of 'run'?", a: "Ran" },
            { q: "Which part of speech describes how an action is performed?", a: "Adverb" },
            { q: "What is the correct spelling: 'Recieve' or 'Receive'?", a: "Receive" },
            { q: "Identify the verb in the following sentence: 'The quick brown fox jumps over the lazy dog.'", a: "jumps" },
        ],
        300: [
            { q: "An abrupt remark, made especially as an aside or interruption.", a: "Interjection" },
            { q: "What is the comparative form of 'good'?", a: "Better" },
            { q: "Which word is a preposition: 'With' or 'Play'?", a: "With" },
            { q: "Rewrite this sentence in future tense: 'I run fast.'", a: "I will run fast." },
            { q: "What is the subject in the sentence 'The cat is sleeping'?", a: "Cat" }
        ],
        400: [
            { q: "What is the object in the sentence 'She read the book'?", a: "Book" },
            { q: "Which word joins two clauses: 'And' or 'Blue'?", a: "And" },
            { q: "Which type of sentence states a fact: 'She likes apples.' or 'What is your name?'?", a: "She likes apples." },
            { q: "What is the superlative form of 'fast'?", a: "Fastest" },
            { q: "Select the sentence that uses a semicolon correctly:\n\nA) I have a big test tomorrow; I can't go out tonight.\nB) I have a big test tomorrow, I can't go out tonight.", a: "A" }
        ],
        500: [
            { q: "Choose the sentence with correct subject-verb agreement:\n\nA) The team are playing well.\nB) The team is playing well.", a: "B" },
            { q: "What is the opposite of 'hot'?", a: "Cold" },
            { q: "Which word replaces a noun in a sentence, such as 'she' or 'they'?", a: "Pronoun" },
            { q: "What type of sentence gives a command?", a: "Imperative" },
            { q: "True or False does this sentence properly use a hyphen 'She is a well-known author.", a: "True" }
        ]
    },
    
    
    History: {
    100: [
        { q: "In which year did World War II end?", a: "1945" },
        { q: "Who wrote the Declaration of Independence?", a: "Thomas Jefferson" },
        { q: "What ancient wonder was located in Alexandria?", a: "Lighthouse" },
        { q: "In which year was the first manned moon landing?", a: "1969" },
        { q: "Who invented the telephone?", a: "Alexander Graham Bell" }
    ],
    200: [
        { q: "Who was the first President of the United States?", a: "George Washington" },
        { q: "In which year did Columbus reach America?", a: "1492" },
        { q: "Who was the first Emperor of China?", a: "Qin Shi Huang" },
        { q: "Who was the first woman to fly solo across the Atlantic?", a: "Amelia Earhart" },
        { q: "What was the name of the ship that brought the Pilgrims to America?", a: "Mayflower" }
    ],
    300: [
        { q: "Which civilization built the pyramids of Giza?", a: "Ancient Egyptians" },
        { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
        { q: "What was the capital of the Roman Empire?", a: "Rome" },
        { q: "Who was the first human in space?", a: "Yuri Gagarin" },
        { q: "Which explorer discovered America?", a: "Christopher Columbus" }
    ],
    400: [
        { q: "In which year did the Berlin Wall fall?", a: "1989" },
        { q: "Who was the first woman to win a Nobel Prize?", a: "Marie Curie" },
        { q: "Which empire was ruled by Genghis Khan?", a: "Mongol Empire" },
        { q: "Who was the first man to circumnavigate the globe?", a: "Ferdinand Magellan" },
        { q: "What year was the first modern Olympic Games held?", a: "1896" }
    ],
    500: [
        { q: "Who was the first European explorer to reach India by sea?", a: "Vasco da Gama" },
        { q: "In which year was the Magna Carta signed?", a: "1215" },
        { q: "Who was the longest-reigning British monarch?", a: "Elizabeth II" },
        { q: "What was the name of the ship that brought the first slaves to America?", a: "The White Lion" },
        { q: "Which president abolished slavery in the United States?", a: "Abraham Lincoln" }
    ]
    }
};


let score = 0;
let lives = 3;
let answeredQuestions = new Set();
let currentQuestion = null;
let gameQuestions = {}; // Will store the randomly selected questions for the current game

function getUserIdFromToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId; 
    } catch (e) {
      console.error("Invalid token parse:", e);
      return null;
    }
  }

function updateXP(amount) {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(); // decode user ID from token
    if (!userId) return;
  
    fetch(`${config.IP}/users/${userId}/xp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ xpChange: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("XP updated:", data);
      })
      .catch((err) => console.error("Failed to update XP", err));
  }
  

function getRandomQuestion(category, points) {
const questions = questionPool[category][points];
return questions[Math.floor(Math.random() * questions.length)];
}

function initializeGameQuestions() {
gameQuestions = {};
Object.keys(questionPool).forEach(category => {
    gameQuestions[category] = [];
    Object.keys(questionPool[category]).forEach(points => {
    gameQuestions[category].push({
        points: parseInt(points),
        ...getRandomQuestion(category, points)
    });
    });
});
}

function initializeGame() {
initializeGameQuestions(); // Select random questions for this game
const gameBoard = document.getElementById('gameBoard');
gameBoard.innerHTML = '';

Object.entries(gameQuestions).forEach(([category, categoryQuestions]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);
    
    categoryQuestions.forEach((question, index) => {
    const button = document.createElement('button');
    button.className = 'question-btn';
    button.textContent = question.points;
    button.id = `${category}-${index}`;
    button.onclick = () => selectQuestion(category, index);
    categoryDiv.appendChild(button);
    });
    
    gameBoard.appendChild(categoryDiv);
});

answeredQuestions.forEach(key => {
    const button = document.getElementById(key);
    if (button) {
    button.className = 'question-btn answered';
    }
});
}

// Other functions remain the same but use gameQuestions instead of questions
function selectQuestion(category, index) {
const key = `${category}-${index}`;
if (answeredQuestions.has(key)) return;

currentQuestion = { category, index };
const question = gameQuestions[category][index];

document.getElementById('gameBoard').style.display = 'none';
document.getElementById('questionScreen').style.display = 'block';
document.getElementById('questionText').textContent = question.q;
document.getElementById('answerInput').value = '';
document.getElementById('feedback').textContent = '';
document.getElementById('feedback').className = 'feedback';
document.getElementById('submitBtn').style.display = 'inline';
document.getElementById('continueBtn').style.display = 'none';
}

function submitAnswer() {
const userAnswer = document.getElementById('answerInput').value;
const question = gameQuestions[currentQuestion.category][currentQuestion.index];
const key = `${currentQuestion.category}-${currentQuestion.index}`;

if (userAnswer.toLowerCase() === question.a.toLowerCase()) {
    score += question.points;
    document.getElementById('score').textContent = score;
    document.getElementById('feedback').textContent = 'Correct!';
    document.getElementById('feedback').className = 'feedback correct';
} else {
    lives--;
    updateLives();
    document.getElementById('feedback').textContent = `Wrong! The correct answer was: ${question.a}`;
    document.getElementById('feedback').className = 'feedback incorrect';
}

answeredQuestions.add(key);
document.getElementById('submitBtn').style.display = 'none';
document.getElementById('continueBtn').style.display = 'inline';

if (lives === 0) {
    endGame();
}
}

// Rest of the functions remain exactly the same
function updateLives() {
document.getElementById('lives').textContent = '❤️'.repeat(lives);
}

function continueGame() {
document.getElementById('questionScreen').style.display = 'none';
document.getElementById('gameBoard').style.display = 'grid';

const key = `${currentQuestion.category}-${currentQuestion.index}`;
const button = document.getElementById(key);
if (button) {
    button.className = 'question-btn answered';
    }
}

    function recordJeopardyScoreOnServer(finalScore) {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found");
          return;
        }
      
        console.log("Posting finalScore =>", finalScore, typeof finalScore);

        fetch(`${config.IP}/jeopardy/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ finalScore })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Jeopardy score recorded on server:", data);
          // data.jeopardyScore is the new or updated score in the database
        })
        .catch(err => {
          console.error("Error recording Jeopardy score:", err);
        });
      }
      
      
      function endGame() {
        document.getElementById('questionScreen').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'none';
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = score;
      
        // Save final Jeopardy score
        recordJeopardyScoreOnServer(score);
      
        // Add +30 XP for finishing Jeopardy
        updateXP(30);
      }
      

    function resetGame() {
    score = 0;
    lives = 3;
    answeredQuestions = new Set();
    currentQuestion = null;
    
    document.getElementById('score').textContent = '0';
    updateLives();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'grid';
    
    initializeGame();
    }

    // Event Listeners
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('continueBtn').addEventListener('click', continueGame);
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
    });

    // Initialize the game
    initializeGame();