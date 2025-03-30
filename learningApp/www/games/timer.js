import config from '../js/config.js';

const usedQuestions = [];

const questions = {
    math: [
        { question: "What is 8 × 7?", options: ["58", "56", "64", "54"], correct: "56" },
        { question: "What is the square root of 144?", options: ["12", "14", "10", "16"], correct: "12" },
        { question: "What is 15% of 200?", options: ["35", "40", "30", "25"], correct: "30" },
        { question: "What is 9 × 8?", options: ["72", "70", "74", "68"], correct: "72" },
        { question: "What is 12 × 12?", options: ["128", "140", "144", "136"], correct: "144" },
        { question: "What is the square of 15?", options: ["225", "150", "180", "200"], correct: "225" },
        { question: "What is 100 ÷ 4?", options: ["30", "20", "15", "25"], correct: "25" },
        { question: "What is 3 × 5?", options: ["20", "10", "25", "15"], correct: "15" },
        { question: "What is 7 × 9?", options: ["81", "63", "72", "56"], correct: "63" },
        { question: "What is 2 × 6?", options: ["10", "8", "14", "12"], correct: "12" },
        { question: "What is 6 × 10?", options: ["55", "65", "75", "60"], correct: "60" },
        { question: "What is 25% of 200?", options: ["40", "50", "60", "70"], correct: "50" },
        { question: "What is 80 ÷ 8?", options: ["20", "12", "15", "10"], correct: "10" },
        { question: "What is 50 × 6?", options: ["300", "250", "350", "450"], correct: "300" },
        { question: "What is 9 × 9?", options: ["81", "90", "72", "60"], correct: "81" },
        { question: "What is 4 × 8?", options: ["36", "30", "34", "32"], correct: "32" },
        { question: "What is 14 × 6?", options: ["80", "92", "84", "88"], correct: "84" },
        { question: "What is the square of 20?", options: ["400", "350", "300", "250"], correct: "400" },
        { question: "What is 7 × 6?", options: ["42", "48", "44", "40"], correct: "42" },
        { question: "What is 6 ÷ 2?", options: ["3", "4", "5", "2"], correct: "3" },
        { question: "What is 18 ÷ 3?", options: ["6", "5", "4", "3"], correct: "6" },
        { question: "What is 5 × 10?", options: ["50", "55", "60", "45"], correct: "50" },
        { question: "What is 25 × 4?", options: ["100", "110", "105", "90"], correct: "100" },
        { question: "What is 5 + 15?", options: ["25", "30", "35", "20"], correct: "20" },
        { question: "What is 18 ÷ 2?", options: ["10", "8", "9", "7"], correct: "9" }
    ],
    science: [
        { question: "What is the chemical symbol for Gold?", options: ["Fe", "Cu", "Ag", "Au"], correct: "Au" },
        { question: "Which planet is closest to the Sun?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mercury" },
        { question: "What is the hardest natural substance?", options: ["Platinum", "Gold", "Diamond", "Iron"], correct: "Diamond" },
        { question: "What is the chemical symbol for Oxygen?", options: ["O", "O2", "Ox", "Oz"], correct: "O" },
        { question: "What is the atomic number of Carbon?", options: ["12", "8", "6", "14"], correct: "6" },
        { question: "Which gas do plants need for photosynthesis?", options: ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"], correct: "Carbon Dioxide" },
        { question: "What is the center of an atom called?", options: ["Neutron", "Electron", "Proton", "Nucleus"], correct: "Nucleus" },
        { question: "What is the chemical formula for water?", options: ["H2O", "O2", "CO2", "H2"], correct: "H2O" },
        { question: "How many bones are in the adult human body?", options: ["220", "205", "206", "210"], correct: "206" },
        { question: "What element does 'O' represent?", options: ["Osmium", "Ozone", "Oganesson", "Oxygen"], correct: "Oxygen" },
        { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Saturn", "Mars", "Venus"], correct: "Mars" },
        { question: "What is the boiling point of water in Celsius?", options: ["100°C", "120°C", "90°C", "150°C"], correct: "100°C" },
        { question: "What type of animal is a frog?", options: ["Amphibian", "Mammal", "Reptile", "Bird"], correct: "Amphibian" },
        { question: "What is the main source of energy for the Earth?", options: ["Wind", "The Moon", "The Sun", "Tides"], correct: "The Sun" },
        { question: "What is the chemical formula for salt?", options: ["NaOH", "NaCl", "CaCl2", "KCl"], correct: "NaCl" },
        { question: "How many planets are in our Solar System?", options: ["8", "9", "7", "6"], correct: "8" },
        { question: "What is the primary function of red blood cells?", options: ["Carrying oxygen", "Fighting disease", "Carrying carbon dioxide", "Producing energy"], correct: "Carrying oxygen" },
        { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correct: "Skin" },
        { question: "What is the main component of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], correct: "Nitrogen" },
        { question: "What is the process by which plants make their own food?", options: ["Fermentation", "Respiration", "Digestion", "Photosynthesis"], correct: "Photosynthesis" },
        { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Heart", "Lungs", "Liver"], correct: "Heart" },
        { question: "What is the chemical symbol for Silver?", options: ["Ag", "Au", "Fe", "Cu"], correct: "Ag" },
        { question: "What is the boiling point of water in Fahrenheit?", options: ["212°F", "200°F", "230°F", "220°F"], correct: "212°F" }
    ],
    history: [
        { question: "In which year did World War II end?", options: ["1944", "1946", "1945", "1943"], correct: "1945" },
        { question: "Who was the first President of the United States?", options: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"], correct: "George Washington" },
        { question: "Which empire built the pyramids?", options: ["Greek", "Roman", "Persian", "Egyptian"], correct: "Egyptian" },
        { question: "Who was the first emperor of China?", options: ["Wu Zetian", "Tang Taizong", "Qin Shi Huang", "Kangxi"], correct: "Qin Shi Huang" },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1920"], correct: "1912" },
        { question: "Who was the leader of the Soviet Union during WWII?", options: ["Mikhail Gorbachev", "Vladimir Lenin", "Leon Trotsky", "Joseph Stalin"], correct: "Joseph Stalin" },
        { question: "What ancient civilization built the Machu Picchu?", options: ["Maya", "Aztec", "Inca", "Olmec"], correct: "Inca" },
        { question: "Which war was fought between the North and South regions of the United States?", options: ["World War II", "The Revolutionary War", "The Civil War", "World War I"], correct: "The Civil War" },
        { question: "Who was the Queen of England for over 60 years?", options: ["Queen Victoria", "Queen Elizabeth II", "Queen Elizabeth I", "Mary I"], correct: "Queen Elizabeth II" },
        { question: "Who was the first man to walk on the moon?", options: ["Buzz Aldrin", "Michael Collins", "Neil Armstrong", "Yuri Gagarin"], correct: "Neil Armstrong" },
        { question: "In what year did the Berlin Wall fall?", options: ["1987", "1990", "1989", "1985"], correct: "1989" },
        { question: "Who was the first woman to fly solo across the Atlantic?", options: ["Amelia Earhart", "Bessie Coleman", "Eleanor Roosevelt", "Jacqueline Cochran"], correct: "Amelia Earhart" },
        { question: "Who was the leader of the Mongol Empire?", options: ["Attila the Hun", "Cyrus the Great", "Kublai Khan", "Genghis Khan"], correct: "Genghis Khan" },
        { question: "What was the name of the first artificial Earth satellite?", options: ["Sputnik 1", "Vanguard 1", "Explorer 1", "Apollo 11"], correct: "Sputnik 1" },
        { question: "Which ancient civilization is famous for its pyramids?", options: ["Chinese", "Roman", "Egyptian", "Greek"], correct: "Egyptian" },
        { question: "Who discovered America?", options: ["Vasco da Gama", "Christopher Columbus", "John Cabot", "Ferdinand Magellan"], correct: "Christopher Columbus" },
        { question: "When did World War I begin?", options: ["1912", "1914", "1916", "1915"], correct: "1914" },
        { question: "Which country was the first to grant women the right to vote?", options: ["USA", "France", "New Zealand", "UK"], correct: "New Zealand" },
        { question: "What year did the French Revolution start?", options: ["1790", "1776", "1800", "1789"], correct: "1789" },
        { question: "Who was the first person to circumnavigate the globe?", options: ["Marco Polo", "Sir Francis Drake", "Ferdinand Magellan", "Christopher Columbus"], correct: "Ferdinand Magellan" },
        { question: "Which empire was known for its gladiator games?", options: ["Roman Empire", "British Empire", "Mongol Empire", "Ottoman Empire"], correct: "Roman Empire" }
    ],
    english: [
        { question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: "Joyful" },
        { question: "Which word is a noun?", options: ["Run", "Quick", "Happiness", "Bright"], correct: "Happiness" },
        { question: "What is the antonym of 'difficult'?", options: ["Easy", "Challenging", "Hard", "Tough"], correct: "Easy" },
        { question: "Which is a verb?", options: ["Jump", "Beautiful", "Smart", "Quickly"], correct: "Jump" },
        { question: "What is the plural form of 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], correct: "Children" },
        { question: "Which sentence is grammatically correct?", options: ["She are happy.", "They is running.", "We was tired.", "He is tall."], correct: "He is tall." },
        { question: "What is the past tense of 'run'?", options: ["Ran", "Runned", "Running", "Runs"], correct: "Ran" },
        { question: "What type of word is 'quickly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correct: "Adverb" },
        { question: "Which word is spelled correctly?", options: ["Recieve", "Receive", "Recievee", "Reiceve"], correct: "Receive" },
        { question: "What is a synonym for 'big'?", options: ["Tiny", "Large", "Narrow", "Small"], correct: "Large" },
        { question: "Which is an example of an interjection?", options: ["Wow!", "And", "Because", "During"], correct: "Wow!" },
        { question: "What is the comparative form of 'good'?", options: ["Gooder", "Best", "Better", "Goodest"], correct: "Better" },
        { question: "Which word is a preposition?", options: ["With", "Quick", "Play", "Beautiful"], correct: "With" },
        { question: "Which sentence is in future tense?", options: ["I run fast.", "I will run fast.", "I ran fast.", "I am running fast."], correct: "I will run fast." },
        { question: "What is the subject in the sentence 'The cat is sleeping'?", options: ["Cat", "Sleeping", "Is", "The"], correct: "Cat" },
        { question: "What is the object in the sentence 'She read the book'?", options: ["She", "Read", "The", "Book"], correct: "Book" },
        { question: "Which word is a conjunction?", options: ["And", "Blue", "Quickly", "Sing"], correct: "And" },
        { question: "Which is an example of a declarative sentence?", options: ["What is your name?", "Run fast!", "She likes apples.", "Wow, that's amazing!"], correct: "She likes apples." },
        { question: "What is the superlative form of 'fast'?", options: ["Faster", "Fastest", "More fast", "Most fast"], correct: "Fastest" },
        { question: "What is the correct form of the verb in 'She _____ to school every day'?", options: ["Go", "Goes", "Going", "Went"], correct: "Goes" },
        { question: "What is a synonym for 'start'?", options: ["Finish", "Begin", "End", "Stop"], correct: "Begin" },
        { question: "What is the antonym of 'hot'?", options: ["Warm", "Cold", "Heat", "Cool"], correct: "Cold" },
        { question: "Which word is a pronoun?", options: ["She", "Run", "Blue", "Slowly"], correct: "She" },
        { question: "What type of sentence is 'Close the door!'?", options: ["Interrogative", "Imperative", "Exclamatory", "Declarative"], correct: "Imperative" },
        { question: "Which sentence uses the correct article?", options: ["I saw an eagle.", "She is a honest person.", "We bought a apple.", "He found the hourglass."], correct: "I saw an eagle." }
    ]
};

let timer;
let timeLeft;
let timeTrack;
let bestTime = 0;
let currentQuestion;

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
  

function startGame() {
    timeLeft = 30;
    timeTrack = 0;
    updateTimer();
    document.querySelector('.game-over').style.display = 'none';
    document.querySelector('.question-container').style.display = 'block';
    document.querySelector('.feedback').textContent = '';
    timer = setInterval(updateTimer, 100);
    askQuestion();
}
window.startGame = startGame;

function updateTimer() {
    timeLeft = Math.max(0, timeLeft - 0.1);
    document.querySelector('.timer').textContent = timeLeft.toFixed(1);
    let body = document.querySelector('.body');

    if (timeLeft <= 30) {
        body.style.boxShadow = '';
        body.style.animation = '';
    }
    
    if (timeLeft <= 10) {
        body.style.boxShadow = '0 0 50px 15px red';
        body.style.animation = 'blink-border 1s infinite alternate';
    }
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    const finalTime = parseFloat(30 + timeTrack);
    if (finalTime > bestTime) {
      bestTime = finalTime;
      document.querySelector('.score').textContent = `Best Time: ${bestTime} seconds`;
    }
    document.querySelector('.game-over').style.display = 'block';
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.final-time').textContent = finalTime;
    document.querySelector('.coinsEarned').textContent = finalTime;
  
    // Save final time
    recordTimerTimeOnServer(finalTime);
  
    // Award +30 XP for completing Timer Challenge
    updateXP(30);
  }
  

// 2) new function to POST finalTime to the server
function recordTimerTimeOnServer(finalTime) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found");
    return;
  }

  // Post to /timerChallenge/time
  fetch(`${config.IP}/timerChallenge/time`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ finalTime }) // must match the route's expected key
  })
  .then(response => response.json())
  .then(data => {
    console.log("Timer challenge time recorded:", data);
    // data.timerChallengeTime is the updated time in the DB
  })
  .catch(err => {
    console.error("Error recording timer challenge time:", err);
  });
}

function askQuestion() {
  // Reset the used questions if all have been shown
  if (usedQuestions.length === questions.length) {
    usedQuestions.length = 0; // Clear the array
  }

  do{
    const categories = Object.keys(questions);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryQuestions = questions[category];
    currentQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  } while (usedQuestions.includes(currentQuestion));

  // Mark the question as used
  usedQuestions.push(currentQuestion);

    document.querySelector('.question').textContent = currentQuestion.question;
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const feedback = document.querySelector('.feedback');
    const timer = document.querySelector('.timer');
    if (answer === currentQuestion.correct) {
        timeLeft += 3;
        timeTrack += 3;
        feedback.textContent = '✅ Correct! +3 seconds';
        feedback.style.color = '#4ecca3';
        timer.style.color = '#4ecca3';
        timer.style.transform = 'scale(1.5)'
        setTimeout(() => {
            timer.style.color = 'rgb(110, 211, 255)';
            timer.style.transform = 'scale(1.0)'
        }, 1000);
    } else {
        timeLeft -= 2;
        timeTrack -=2;
        feedback.textContent = '❌ Incorrect! -2 seconds. The correct answer was: ' + currentQuestion.correct;
        feedback.style.color = '#ff6b6b';
        timer.style.color = '#ff6b6b';
        timer.style.transform = 'scale(1.2)'
        setTimeout(() => {
            timer.style.color = 'rgb(110, 211, 255)';
            timer.style.transform = 'scale(1.0)'
        }, 1000);
    }
    askQuestion();
    setTimeout(() => {
        feedback.textContent = '';
    }, 1000);
}

startGame();