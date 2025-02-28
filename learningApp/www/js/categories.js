import config from './config.js';

// Shuffle function to randomize an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get a specified number of unique random questions from a category
function getRandomQuestions(category, count) {
    if (!questionPool[category]) {
        console.error(`Category "${category}" does not exist.`);
        return [];
    }

    const shuffledQuestions = shuffleArray([...questionPool[category]]);
    return shuffledQuestions.slice(0, count);
}

const questionPool = {
    math: [
        { question: "What is 8 × 7?", choices: ["58", "56", "64", "54"], correctAnswer: "56" },
        { question: "What is the square root of 144?", choices: ["12", "14", "10", "16"], correctAnswer: "12" },
        { question: "What is 15% of 200?", choices: ["35", "40", "30", "25"], correctAnswer: "30" },
        { question: "What is 9 × 8?", choices: ["72", "70", "74", "68"], correctAnswer: "72" },
        { question: "What is 12 × 12?", choices: ["128", "140", "144", "136"], correctAnswer: "144" },
        { question: "What is the square of 15?", choices: ["225", "150", "180", "200"], correctAnswer: "225" },
        { question: "What is 100 ÷ 4?", choices: ["30", "20", "15", "25"], correctAnswer: "25" },
        { question: "What is 3 × 5?", choices: ["20", "10", "25", "15"], correctAnswer: "15" },
        { question: "What is 7 × 9?", choices: ["81", "63", "72", "56"], correctAnswer: "63" },
        { question: "What is 2 × 6?", choices: ["10", "8", "14", "12"], correctAnswer: "12" },
        { question: "What is 6 × 10?", choices: ["55", "65", "75", "60"], correctAnswer: "60" },
        { question: "What is 25% of 200?", choices: ["40", "50", "60", "70"], correctAnswer: "50" },
        { question: "What is 80 ÷ 8?", choices: ["20", "12", "15", "10"], correctAnswer: "10" },
        { question: "What is 50 × 6?", choices: ["300", "250", "350", "450"], correctAnswer: "300" },
        { question: "What is 9 × 9?", choices: ["81", "90", "72", "60"], correctAnswer: "81" },
        { question: "What is 4 × 8?", choices: ["36", "30", "34", "32"], correctAnswer: "32" },
        { question: "What is 14 × 6?", choices: ["80", "92", "84", "88"], correctAnswer: "84" },
        { question: "What is the square of 20?", choices: ["400", "350", "300", "250"], correctAnswer: "400" },
        { question: "What is 7 × 6?", choices: ["42", "48", "44", "40"], correctAnswer: "42" },
        { question: "What is 6 ÷ 2?", choices: ["3", "4", "5", "2"], correctAnswer: "3" },
        { question: "What is 18 ÷ 3?", choices: ["6", "5", "4", "3"], correctAnswer: "6" },
        { question: "What is 5 × 10?", choices: ["50", "55", "60", "45"], correctAnswer: "50" },
        { question: "What is 25 × 4?", choices: ["100", "110", "105", "90"], correctAnswer: "100" },
        { question: "What is 5 + 15?", choices: ["25", "30", "35", "20"], correctAnswer: "20" },
        { question: "What is 18 ÷ 2?", choices: ["10", "8", "9", "7"], correctAnswer: "9" }
    ],
    science: [
        { question: "What is the chemical symbol for Gold?", choices: ["Fe", "Cu", "Ag", "Au"], correctAnswer: "Au" },
        { question: "Which planet is closest to the Sun?", choices: ["Mars", "Earth", "Venus", "Mercury"], correctAnswer: "Mercury" },
        { question: "What is the hardest natural substance?", choices: ["Platinum", "Gold", "Diamond", "Iron"], correctAnswer: "Diamond" },
        { question: "What is the chemical symbol for Oxygen?", choices: ["O", "O2", "Ox", "Oz"], correctAnswer: "O" },
        { question: "What is the atomic number of Carbon?", choices: ["12", "8", "6", "14"], correctAnswer: "6" },
        { question: "Which gas do plants need for photosynthesis?", choices: ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"], correctAnswer: "Carbon Dioxide" },
        { question: "What is the center of an atom called?", choices: ["Neutron", "Electron", "Proton", "Nucleus"], correctAnswer: "Nucleus" },
        { question: "How many bones are in the adult human body?", choices: ["220", "205", "206", "210"], correctAnswer: "206" },
        { question: "What element does 'O' represent?", choices: ["Osmium", "Ozone", "Oganesson", "Oxygen"], correctAnswer: "Oxygen" },
        { question: "What is the boiling point of water in Celsius?", choices: ["100°C", "120°C", "90°C", "150°C"], correctAnswer: "100°C" },
        { question: "What type of animal is a frog?", choices: ["Amphibian", "Mammal", "Reptile", "Bird"], correctAnswer: "Amphibian" },
        { question: "What is the chemical formula for salt?", choices: ["NaOH", "NaCl", "CaCl2", "KCl"], correctAnswer: "NaCl" },
        { question: "How many planets are in our Solar System?", choices: ["8", "9", "7", "6"], correctAnswer: "8" },
        { question: "What is the primary function of red blood cells?", choices: ["Carrying oxygen", "Fighting disease", "Carrying carbon dioxide", "Producing energy"], correctAnswer: "Carrying oxygen" },
        { question: "What is the main component of Earth's atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], correctAnswer: "Nitrogen" },
        { question: "What is the process by which plants make their own food?", choices: ["Fermentation", "Respiration", "Digestion", "Photosynthesis"], correctAnswer: "Photosynthesis" },
        { question: "What is the chemical symbol for Silver?", choices: ["Ag", "Au", "Fe", "Cu"], correctAnswer: "Ag" },
        { question: "What is the boiling point of water in Fahrenheit?", choices: ["212°F", "200°F", "230°F", "220°F"], correctAnswer: "212°F" },
        { question: "Which element is most abundant in the Earth's crust?", choices: ["Oxygen", "Silicon", "Iron", "Calcium"], correctAnswer: "Oxygen" },
        { question: "What is the main gas responsible for global warming?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"], correctAnswer: "Carbon Dioxide" },
        { question: "Which planet has the most moons?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Saturn" },
        { question: "What is the formula for calculating speed?", choices: ["Distance / Time", "Time / Distance", "Speed = Mass x Acceleration", "Force / Time"], correctAnswer: "Distance / Time" },
        { question: "Which organ in the human body is responsible for filtering blood?", choices: ["Liver", "Kidney", "Lungs", "Heart"], correctAnswer: "Kidney" },
        { question: "What is the chemical formula for methane?", choices: ["CH4", "CO2", "H2O", "C2H6"], correctAnswer: "CH4" },
        { question: "What is the largest planet in our Solar System?", choices: ["Earth", "Jupiter", "Saturn", "Neptune"], correctAnswer: "Jupiter" }
    ],    
    history: [
        { question: "In which year did World War II end?", choices: ["1944", "1946", "1945", "1943"], correctAnswer: "1945" },
        { question: "Who was the first President of the United States?", choices: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"], correctAnswer: "George Washington" },
        { question: "Which empire built the pyramids?", choices: ["Greek", "Roman", "Persian", "Egyptian"], correctAnswer: "Egyptian" },
        { question: "Who was the first emperor of China?", choices: ["Wu Zetian", "Tang Taizong", "Qin Shi Huang", "Kangxi"], correctAnswer: "Qin Shi Huang" },
        { question: "What year did the Titanic sink?", choices: ["1912", "1905", "1898", "1920"], correctAnswer: "1912" },
        { question: "Who was the leader of the Soviet Union during WWII?", choices: ["Mikhail Gorbachev", "Vladimir Lenin", "Leon Trotsky", "Joseph Stalin"], correctAnswer: "Joseph Stalin" },
        { question: "What ancient civilization built the Machu Picchu?", choices: ["Maya", "Aztec", "Inca", "Olmec"], correctAnswer: "Inca" },
        { question: "Which war was fought between the North and South regions of the United States?", choices: ["World War II", "The Revolutionary War", "The Civil War", "World War I"], correctAnswer: "The Civil War" },
        { question: "Who was the Queen of England for over 60 years?", choices: ["Queen Victoria", "Queen Elizabeth II", "Queen Elizabeth I", "Mary I"], correctAnswer: "Queen Elizabeth II" },
        { question: "Who was the first man to walk on the moon?", choices: ["Buzz Aldrin", "Michael Collins", "Neil Armstrong", "Yuri Gagarin"], correctAnswer: "Neil Armstrong" },
        { question: "In what year did the Berlin Wall fall?", choices: ["1987", "1990", "1989", "1985"], correctAnswer: "1989" },
        { question: "Who was the first woman to fly solo across the Atlantic?", choices: ["Amelia Earhart", "Bessie Coleman", "Eleanor Roosevelt", "Jacqueline Cochran"], correctAnswer: "Amelia Earhart" },
        { question: "Who was the leader of the Mongol Empire?", choices: ["Attila the Hun", "Cyrus the Great", "Kublai Khan", "Genghis Khan"], correctAnswer: "Genghis Khan" },
        { question: "What was the name of the first artificial Earth satellite?", choices: ["Sputnik 1", "Vanguard 1", "Explorer 1", "Apollo 11"], correctAnswer: "Sputnik 1" },
        { question: "Which ancient civilization is famous for its pyramids?", choices: ["Chinese", "Roman", "Egyptian", "Greek"], correctAnswer: "Egyptian" },
        { question: "Who discovered America?", choices: ["Vasco da Gama", "Christopher Columbus", "John Cabot", "Ferdinand Magellan"], correctAnswer: "Christopher Columbus" },
        { question: "When did World War I begin?", choices: ["1912", "1914", "1916", "1915"], correctAnswer: "1914" },
        { question: "Which country was the first to grant women the right to vote?", choices: ["USA", "France", "New Zealand", "UK"], correctAnswer: "New Zealand" },
        { question: "What year did the French Revolution start?", choices: ["1790", "1776", "1800", "1789"], correctAnswer: "1789" },
        { question: "Who was the first person to circumnavigate the globe?", choices: ["Marco Polo", "Sir Francis Drake", "Ferdinand Magellan", "Christopher Columbus"], correctAnswer: "Ferdinand Magellan" },
        { question: "Which empire was known for its gladiator games?", choices: ["Roman Empire", "British Empire", "Mongol Empire", "Ottoman Empire"], correctAnswer: "Roman Empire" },
        { question: "Who was the first woman Prime Minister of the United Kingdom?", choices: ["Margaret Thatcher", "Theresa May", "Queen Elizabeth II", "Nancy Astor"], correctAnswer: "Margaret Thatcher" },
        { question: "What was the name of the ship that carried the Pilgrims to America in 1620?", choices: ["Mayflower", "Santa Maria", "Endeavour", "Victory"], correctAnswer: "Mayflower" },
        { question: "Which country was formerly known as Persia?", choices: ["Turkey", "Iran", "Iraq", "Afghanistan"], correctAnswer: "Iran" },
        { question: "Who invented the telephone?", choices: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Louis Pasteur"], correctAnswer: "Alexander Graham Bell" },
    
    ],
    english: [
        { question: "What is the synonym of 'happy'?", choices: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: "Joyful" },
        { question: "Which word is a noun?", choices: ["Run", "Quick", "Happiness", "Bright"], correctAnswer: "Happiness" },
        { question: "What is the antonym of 'difficult'?", choices: ["Easy", "Challenging", "Hard", "Tough"], correctAnswer: "Easy" },
        { question: "Which is a verb?", choices: ["Jump", "Beautiful", "Smart", "Quickly"], correctAnswer: "Jump" },
        { question: "What is the plural form of 'child'?", choices: ["Childs", "Children", "Childes", "Childrens"], correctAnswer: "Children" },
        { question: "Which sentence is grammatically correct?", choices: ["She are happy.", "They is running.", "We was tired.", "He is tall."], correctAnswer: "He is tall." },
        { question: "What is the past tense of 'run'?", choices: ["Ran", "Runned", "Running", "Runs"], correctAnswer: "Ran" },
        { question: "What type of word is 'quickly'?", choices: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb" },
        { question: "Which word is spelled correctly?", choices: ["Recieve", "Receive", "Recievee", "Reiceve"], correctAnswer: "Receive" },
        { question: "What is a synonym for 'big'?", choices: ["Tiny", "Large", "Narrow", "Small"], correctAnswer: "Large" },
        { question: "Which is an example of an interjection?", choices: ["Wow!", "And", "Because", "During"], correctAnswer: "Wow!" },
        { question: "What is the comparative form of 'good'?", choices: ["Gooder", "Best", "Better", "Goodest"], correctAnswer: "Better" },
        { question: "Which word is a preposition?", choices: ["With", "Quick", "Play", "Beautiful"], correctAnswer: "With" },
        { question: "Which sentence is in future tense?", choices: ["I run fast.", "I will run fast.", "I ran fast.", "I am running fast."], correctAnswer: "I will run fast." },
        { question: "What is the subject in the sentence 'The cat is sleeping'?", choices: ["Cat", "Sleeping", "Is", "The"], correctAnswer: "Cat" },
        { question: "What is the object in the sentence 'She read the book'?", choices: ["She", "Read", "The", "Book"], correctAnswer: "Book" },
        { question: "Which word is a conjunction?", choices: ["And", "Blue", "Quickly", "Sing"], correctAnswer: "And" },
        { question: "Which is an example of a declarative sentence?", choices: ["What is your name?", "Run fast!", "She likes apples.", "Wow, that's amazing!"], correctAnswer: "She likes apples." },
        { question: "What is the superlative form of 'fast'?", choices: ["Faster", "Fastest", "More fast", "Most fast"], correctAnswer: "Fastest" },
        { question: "What is the correct form of the verb in 'She _____ to school every day'?", choices: ["Go", "Goes", "Going", "Went"], correctAnswer: "Goes" },
        { question: "What is a synonym for 'start'?", choices: ["Finish", "Begin", "End", "Stop"], correctAnswer: "Begin" },
        { question: "What is the antonym of 'hot'?", choices: ["Warm", "Cold", "Heat", "Cool"], correctAnswer: "Cold" },
        { question: "Which word is a pronoun?", choices: ["She", "Run", "Blue", "Slowly"], correctAnswer: "She" },
        { question: "What type of sentence is 'Close the door!'?", choices: ["Interrogative", "Imperative", "Exclamatory", "Declarative"], correctAnswer: "Imperative" },
        { question: "Which sentence uses the correct article?", choices: ["I saw an eagle.", "She is a honest person.", "We bought a apple.", "He found the hourglass."], correctAnswer: "I saw an eagle." }
    ]    
};

// Get category from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Display category name
const categoryHeader = document.getElementById('category-header');
categoryHeader.textContent = `${category} Test`;

const randomQuestions = getRandomQuestions(category, 25);

// Retrieve and display questions for the selected category
const quizQuestions = randomQuestions || [];

let currentQuestion = 0;
let score = 0;
let isCorrect = false;
let selectedAnswer = null;

const quizTitle = document.getElementById("quiz-title");
const quizQuestion = document.getElementById("quiz-question");
const choicesContainer = document.getElementById("quiz-choices-container");
const nextButton = document.getElementById("next-button");

const renderQuestion = () => {
    if (currentQuestion == quizQuestions.length - 1) {
        nextButton.innerText = 'End Test';
        nextButton.onclick = endTest;
    }
    nextButton.disabled = true;
    const currentQuizQuestion = quizQuestions[currentQuestion];
    quizTitle.innerText = `Question ${currentQuestion + 1} / 25`;
    quizQuestion.innerText = currentQuizQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuizQuestion.choices.forEach(choice => {
    const button = document.createElement("button");
    button.classList.add("quiz-choice-btn");
    button.innerText = choice;
    button.onclick = () => handleAnswer(choice);
    choicesContainer.appendChild(button);
    });
};

const handleAnswer = (answer) => {
    selectedAnswer = answer;
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    isCorrect = answer === correctAnswer;

    // Highlight the selected button
    const buttons = choicesContainer.querySelectorAll(".quiz-choice-btn");
    buttons.forEach(button => {
        button.classList.remove("selected-answer");
        if (button.innerText === answer) {
            button.classList.add("selected-answer");
        }
    });

    score = isCorrect ? score + 1 : score + 0;
    renderFeedback();
};

const renderFeedback = () => {
    nextButton.disabled = false;
};

const handleNext = () => {
    currentQuestion++;
    renderQuestion();
    nextButton.disabled = true;
};

const endTest = () => {
    showScorePopup();
};

const showScorePopup = () => {


    const finalScore = score; // out of 25
    const subjectName = category; // from URL param
    const dateNow = new Date().toISOString(); // or any date format

    // 1) Save to server
    recordTestScoreOnServer(subjectName, dateNow, finalScore);

    // Create the overlay to darken the background
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    // Create the score popup div
    const popup = document.createElement('div');
    popup.id = 'scorePopup';

    // Add the score message to the popup
    const scoreMessage = document.createElement('p');
    scoreMessage.innerText = `Quiz completed! Your score: ${score}/25`;
    popup.appendChild(scoreMessage);

    // Create the Exit button
    const exitButton = document.createElement('button');
    exitButton.innerText = 'Exit to Test';
    exitButton.onclick = () => {
        window.location.href = './test.html';
    };
    popup.appendChild(exitButton);

    // Append the popup to the body and show it
    document.body.appendChild(popup);
    overlay.style.display = 'block';
    popup.style.display = 'block';
};

function recordTestScoreOnServer(subject, date, score) {
    const token = localStorage.getItem("authToken");
    if (!token) {
    console.error("No auth token found");
    return;
    }

    fetch(`${config.IP}/tests/score`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ subject, date, score })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Test score saved:", data);
    })
    .catch(err => {
        console.error("Error saving test score:", err);
    });
}

nextButton.onclick = handleNext;

// Initialize the quiz
renderQuestion();

// exit button js
var modal = document.getElementById("quitModal");
var btn = document.getElementById("quitButton");
var span = document.getElementsByClassName("close")[0];
var cancelBtn = document.getElementById("cancelQuit");
var confirmBtn = document.getElementById("confirmQuit");

// When the user clicks the button, open the modal
btn.onclick = function(event) {
    event.preventDefault();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

cancelBtn.onclick = function() {
    modal.style.display = "none";
}

confirmBtn.onclick = function() {
    window.location.href = "./test.html";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
