import config from '../js/config.js';

const usedQuestions = [];

const QUESTIONS = [
    // Science Questions
    { category: 'Science', question: 'What is the chemical symbol for water?', options: ['CO2', 'H2O', 'O2', 'NaCl'], correctAnswer: 'H2O' },
    { category: 'Science', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctAnswer: 'Mars' },
    { category: 'Science', question: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Liver', 'Skin'], correctAnswer: 'Skin' },
    { category: 'Science', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 'Diamond' },
    { category: 'Science', question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correctAnswer: 'Au' },
    { category: 'Science', question: 'How many bones are in the adult human body?', options: ['206', '208', '210', '204'], correctAnswer: '206' },
    { category: 'Science', question: 'What is the most abundant gas in Earth’s atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'], correctAnswer: 'Nitrogen' },
    { category: 'Science', question: 'What is the smallest planet in our solar system?', options: ['Mercury', 'Mars', 'Venus', 'Earth'], correctAnswer: 'Mercury' },
    { category: 'Science', question: 'Which of these elements is a noble gas?', options: ['Oxygen', 'Neon', 'Hydrogen', 'Nitrogen'], correctAnswer: 'Neon' },
    { category: 'Science', question: 'What is the freezing point of water in Celsius?', options: ['0°C', '32°F', '100°C', '0°F'], correctAnswer: '0°C' },
    { category: 'Science', question: 'Which of these animals is known for its ability to regenerate limbs?', options: ['Lizard', 'Starfish', 'Penguin', 'Elephant'], correctAnswer: 'Starfish' },
    { category: 'Science', question: 'What is the human body’s largest muscle?', options: ['Biceps', 'Quadriceps', 'Gluteus maximus', 'Deltoid'], correctAnswer: 'Gluteus maximus' },
    { category: 'Science', question: 'Which of these elements is a metal?', options: ['Carbon', 'Oxygen', 'Iron', 'Hydrogen'], correctAnswer: 'Iron' },
    { category: 'Science', question: 'What type of animal is a frog?', options: ['Mammal', 'Reptile', 'Amphibian', 'Fish'], correctAnswer: 'Amphibian' },
    { category: 'Science', question: 'What is the primary source of energy for the Earth?', options: ['Wind', 'Water', 'Sun', 'Geothermal'], correctAnswer: 'Sun' },
    { category: 'Science', question: 'Which vitamin is produced when a person is exposed to sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin D', 'Vitamin C'], correctAnswer: 'Vitamin D' },
    { category: 'Science', question: 'Which part of the plant conducts photosynthesis?', options: ['Roots', 'Stem', 'Leaves', 'Flowers'], correctAnswer: 'Leaves' },
    { category: 'Science', question: 'What is the most common element in the Earth’s crust?', options: ['Oxygen', 'Silicon', 'Iron', 'Magnesium'], correctAnswer: 'Oxygen' },
    { category: 'Science', question: 'Which of these animals can fly?', options: ['Penguin', 'Bat', 'Tiger', 'Kangaroo'], correctAnswer: 'Bat' },
    { category: 'Science', question: 'What is the chemical symbol for sodium?', options: ['Na', 'Ne', 'Ni', 'Si'], correctAnswer: 'Na' },
    { category: 'Science', question: 'What is the largest planet in our solar system?', options: ['Earth', 'Venus', 'Mars', 'Jupiter'], correctAnswer: 'Jupiter' },
    { category: 'Science', question: 'Which is the hottest planet in our solar system?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correctAnswer: 'Venus' },
    { category: 'Science', question: 'What is the basic unit of life?', options: ['Atom', 'Cell', 'Molecule', 'Organ'], correctAnswer: 'Cell' },

    // History Questions
    { category: 'History', question: 'In what year did World War II end?', options: ['1943', '1945', '1939', '1950'], correctAnswer: '1945' },
    { category: 'History', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'], correctAnswer: 'George Washington' },
    { category: 'History', question: 'In which year did the Berlin Wall fall?', options: ['1987', '1989', '1991', '1985'], correctAnswer: '1989' },
    { category: 'History', question: 'Who was the first woman to win a Nobel Prize?', options: ['Mother Teresa', 'Marie Curie', 'Jane Addams', 'Pearl Buck'], correctAnswer: 'Marie Curie' },
    { category: 'History', question: 'Which event started World War I?', options: ['The assassination of Archduke Ferdinand', 'The bombing of Pearl Harbor', 'The invasion of Poland', 'The signing of the Treaty of Versailles'], correctAnswer: 'The assassination of Archduke Ferdinand' },
    { category: 'History', question: 'Who discovered America?', options: ['Christopher Columbus', 'Marco Polo', 'Leif Erikson', 'Ferdinand Magellan'], correctAnswer: 'Christopher Columbus' },
    { category: 'History', question: 'Which ancient civilization built the pyramids of Giza?', options: ['Rome', 'Greece', 'Egypt', 'Mesopotamia'], correctAnswer: 'Egypt' },
    { category: 'History', question: 'Who was the first man to step on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'], correctAnswer: 'Neil Armstrong' },
    { category: 'History', question: 'Which empire was ruled by Julius Caesar?', options: ['Roman Empire', 'Mongol Empire', 'Ottoman Empire', 'Persian Empire'], correctAnswer: 'Roman Empire' },
    { category: 'History', question: 'What year did the Titanic sink?', options: ['1905', '1912', '1898', '1920'], correctAnswer: '1912' },
    { category: 'History', question: 'What was the name of the first man-made satellite?', options: ['Sputnik 1', 'Explorer 1', 'Hubble', 'Apollo 11'], correctAnswer: 'Sputnik 1' },
    { category: 'History', question: 'Who was the first female Prime Minister of the United Kingdom?', options: ['Margaret Thatcher', 'Theresa May', 'Queen Elizabeth', 'Victoria'], correctAnswer: 'Margaret Thatcher' },
    { category: 'History', question: 'Which event led to the start of the French Revolution?', options: ['The Storming of the Bastille', 'The death of Louis XVI', 'The signing of the Declaration of Independence', 'The Battle of Waterloo'], correctAnswer: 'The Storming of the Bastille' },
    { category: 'History', question: 'Who was the first Emperor of China?', options: ['Qin Shi Huang', 'Li Shimin', 'Wudi', 'Sun Yat-sen'], correctAnswer: 'Qin Shi Huang' },
    { category: 'History', question: 'Which battle marked the turning point in the American Civil War?', options: ['Battle of Gettysburg', 'Battle of Fort Sumter', 'Battle of Antietam', 'Battle of Yorktown'], correctAnswer: 'Battle of Gettysburg' },
    { category: 'History', question: 'What year did the United States declare independence?', options: ['1776', '1781', '1790', '1800'], correctAnswer: '1776' },
    { category: 'History', question: 'Who was the last Pharaoh of Egypt?', options: ['Cleopatra', 'Ramses II', 'Tutankhamun', 'Nefertiti'], correctAnswer: 'Cleopatra' },
    { category: 'History', question: 'Who was the leader of the Soviet Union during World War II?', options: ['Joseph Stalin', 'Vladimir Lenin', 'Mikhail Gorbachev', 'Leon Trotsky'], correctAnswer: 'Joseph Stalin' },
    { category: 'History', question: 'Who was the first King of England?', options: ['Henry VIII', 'Alfred the Great', 'Edward the Confessor', 'Egbert'], correctAnswer: 'Egbert' },
    { category: 'History', question: 'Which civilization is known for its advanced aqueducts?', options: ['Romans', 'Mayans', 'Greeks', 'Egyptians'], correctAnswer: 'Romans' },
    { category: 'History', question: 'Who was the longest-reigning monarch in British history?', options: ['Queen Elizabeth I', 'Queen Victoria', 'King George III', 'Queen Elizabeth II'], correctAnswer: 'Queen Elizabeth II' },

    { category: 'English', question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: "Joyful" },
    { category: 'English', question: "Which word is a noun?", options: ["Run", "Quick", "Happiness", "Bright"], correctAnswer: "Happiness" },
    { category: 'English', question: "What is the antonym of 'difficult'?", options: ["Easy", "Challenging", "Hard", "Tough"], correctAnswer: "Easy" },
    { category: 'English', question: "Which is a verb?", options: ["Jump", "Beautiful", "Smart", "Quickly"], correctAnswer: "Jump" },
    { category: 'English', question: "What is the plural form of 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], correctAnswer: "Children" },
    { category: 'English', question: "Which sentence is grammatically correct?", options: ["She are happy.", "They is running.", "We was tired.", "He is tall."], correctAnswer: "He is tall." },
    { category: 'English', question: "What is the past tense of 'run'?", options: ["Ran", "Runned", "Running", "Runs"], correctAnswer: "Ran" },
    { category: 'English', question: "What type of word is 'quickly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb" },
    { category: 'English', question: "Which word is spelled correctly?", options: ["Recieve", "Receive", "Recievee", "Reiceve"], correctAnswer: "Receive" },
    { category: 'English', question: "What is a synonym for 'big'?", options: ["Tiny", "Large", "Narrow", "Small"], correctAnswer: "Large" },
    { category: 'English', question: "Which is an example of an interjection?", options: ["Wow!", "And", "Because", "During"], correctAnswer: "Wow!" },
    { category: 'English', question: "What is the comparative form of 'good'?", options: ["Gooder", "Best", "Better", "Goodest"], correctAnswer: "Better" },
    { category: 'English', question: "Which word is a preposition?", options: ["With", "Quick", "Play", "Beautiful"], correctAnswer: "With" },
    { category: 'English', question: "Which sentence is in future tense?", options: ["I run fast.", "I will run fast.", "I ran fast.", "I am running fast."], correctAnswer: "I will run fast." },
    { category: 'English', question: "What is the subject in the sentence 'The cat is sleeping'?", options: ["Cat", "Sleeping", "Is", "The"], correctAnswer: "Cat" },
    { category: 'English', question: "What is the object in the sentence 'She read the book'?", options: ["She", "Read", "The", "Book"], correctAnswer: "Book" },
    { category: 'English', question: "Which word is a conjunction?", options: ["And", "Blue", "Quickly", "Sing"], correctAnswer: "And" },
    { category: 'English', question: "Which is an example of a declarative sentence?", options: ["What is your name?", "Run fast!", "She likes apples.", "Wow, that's amazing!"], correctAnswer: "She likes apples." },
    { category: 'English', question: "What is the superlative form of 'fast'?", options: ["Faster", "Fastest", "More fast", "Most fast"], correctAnswer: "Fastest" },
    { category: 'English', question: "What is the correct form of the verb in 'She _____ to school every day'?", options: ["Go", "Goes", "Going", "Went"], correctAnswer: "Goes" },
    { category: 'English', question: "What is a synonym for 'start'?", options: ["Finish", "Begin", "End", "Stop"], correctAnswer: "Begin" },
    { category: 'English', question: "What is the antonym of 'hot'?", options: ["Warm", "Cold", "Heat", "Cool"], correctAnswer: "Cold" },
    { category: 'English', question: "Which word is a pronoun?", options: ["She", "Run", "Blue", "Slowly"], correctAnswer: "She" },
    { category: 'English', question: "What type of sentence is 'Close the door!'?", options: ["Interrogative", "Imperative", "Exclamatory", "Declarative"], correctAnswer: "Imperative" },
    { category: 'English', question: "Which sentence uses the correct article?", options: ["I saw an eagle.", "She is a honest person.", "We bought a apple.", "He found the hourglass."], correctAnswer: "I saw an eagle." },
    
    // Math Questions
    { category: 'Math', question: 'What is 9 x 6?', options: ['54', '42', '36', '48'], correctAnswer: '54' },
    { category: 'Math', question: 'What is the square root of 144?', options: ['10', '12', '14', '16'], correctAnswer: '12' },
    { category: 'Math', question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°' },
    { category: 'Math', question: 'What is 25% of 80?', options: ['15', '20', '25', '30'], correctAnswer: '20' },
    { category: 'Math', question: 'What is 7 x 8?', options: ['56', '48', '64', '72'], correctAnswer: '56' },
    { category: 'Math', question: 'What is the value of Pi to two decimal places?', options: ['3.14', '3.12', '3.16', '3.10'], correctAnswer: '3.14' },
    { category: 'Math', question: 'What is 15% of 200?', options: ['30', '20', '40', '50'], correctAnswer: '30' },
    { category: 'Math', question: 'How many sides does a hexagon have?', options: ['6', '7', '5', '8'], correctAnswer: '6' },
    { category: 'Math', question: 'What is the value of 5²?', options: ['25', '20', '30', '35'], correctAnswer: '25' },
    { category: 'Math', question: 'What is the next prime number after 7?', options: ['9', '11', '13', '17'], correctAnswer: '11' },
    { category: 'Math', question: 'How many degrees are in a circle?', options: ['360°', '180°', '90°', '270°'], correctAnswer: '360°' },
    { category: 'Math', question: 'What is the perimeter of a square with side length 4?', options: ['12', '16', '18', '20'], correctAnswer: '16' },
    { category: 'Math', question: 'What is the area of a triangle with a base of 10 and a height of 6?', options: ['30', '60', '40', '20'], correctAnswer: '30' },
    { category: 'Math', question: 'What is the next number in the sequence: 2, 4, 6, 8, __?', options: ['10', '9', '12', '7'], correctAnswer: '10' },
    { category: 'Math', question: 'What is the value of 10³?', options: ['100', '1000', '10000', '100000'], correctAnswer: '1000' },
    { category: 'Math', question: 'What is 5 x 5?', options: ['25', '20', '30', '35'], correctAnswer: '25' },
    { category: 'Math', question: 'What is 12 ÷ 4?', options: ['2', '3', '4', '5'], correctAnswer: '3' },
    { category: 'Math', question: 'What is the value of 7 x 7?', options: ['49', '50', '51', '48'], correctAnswer: '49' }
];

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
    const userId = getUserIdFromToken(); // your user decode
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
  

class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.humanPlayer = 'X';
        this.computerPlayer = 'O';
        this.currentPlayer = this.humanPlayer;
        this.gameActive = true;
        this.xScore = 0;
        this.oScore = 0;
        this.selectedCellIndex = null;

        this.initializeBoard();
    }

    initializeBoard() {
        const restart = document.getElementById('restart-button');
        const cells = document.querySelectorAll('.board-cell');

        restart.addEventListener('click', () => {
            this.resetGame();
        });

        cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        document.getElementById('x-score').textContent = this.xScore;
        document.getElementById('o-score').textContent = this.oScore;
        document.getElementById('current-player').textContent = 'Your Turn (X)';
    }

    displayMessage(message, type = 'info') {
        const messageDisplay = document.getElementById('game-message');
        messageDisplay.textContent = message;
        messageDisplay.className = `message ${type}`;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDisplay.textContent = '';
            messageDisplay.className = 'message';
        }, 3000);
    }

    handleCellClick(cell) {
        // Prevent interaction during computer's turn
        if (this.currentPlayer !== this.humanPlayer) return;

        const index = cell.getAttribute('data-index');
        // Check if cell is already occupied
        if (this.board[index] !== '') return;

        // Show modal with a random question
        this.selectedCellIndex = index;
        this.showQuestionModal();
    }

    showQuestionModal() {
        const modal = document.getElementById('modal');
        const questionText = document.getElementById('question-text');
        const answerButtons = document.getElementById('answer-buttons');

        // Select a random question that hasn't been used yet
        let question;
        do {
            question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        } while (usedQuestions.includes(question));

        // Mark the question as used
        usedQuestions.push(question);

        // Set question text
        questionText.textContent = question.question;

        // Clear previous answer buttons
        answerButtons.innerHTML = '';

        // Create answer buttons
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, question.correctAnswer));
            answerButtons.appendChild(button);
        });

        // Show modal
        modal.style.display = 'block';
    }

    checkAnswer(selectedAnswer, correctAnswer) {
        const modal = document.getElementById('modal');
        const answerButtons = document.getElementById('answer-buttons');
        const cells = document.querySelectorAll('.board-cell');

        // Check if answer is correct
        if (selectedAnswer === correctAnswer) {
            // Place the human player's symbol
            this.board[this.selectedCellIndex] = this.humanPlayer;
            cells[this.selectedCellIndex].textContent = this.humanPlayer;

            // Close modal
            modal.style.display = 'none';
            this.displayMessage('Correct! Nice Job.', 'success');

            // Check for win or draw
            if (this.checkWin()) {
                this.xScore++;
                document.getElementById('x-score').textContent = this.xScore;
                this.displayMessage('You win!', 'success');
                updateXP(50);   
                // 1) CALL OUR NEW FUNCTION to record the win on server
                this.recordWinOnServer();

                return;
            } else if (this.board.every(cell => cell !== '')) {
                this.displayMessage('Draw!', 'info');
                return;
            }

            // Computer's turn
            this.computerMove();
        } else {
            // Highlight wrong answers
            const buttons = answerButtons.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.textContent === selectedAnswer) {
                    button.classList.add('wrong');
                }
            });

            // Close modal
            modal.style.display = 'none';
            // Display incorrect answer message
            this.displayMessage('Wrong answer! Skipping your turn.', 'error');

            // Skip human's turn and go directly to computer's move
            this.computerMove();
        }
    }

    computerMove() {
        // Prevent further human interaction
        this.currentPlayer = this.computerPlayer;
        document.getElementById('current-player').textContent = 'Computer\'s Turn (O)';

        const winningMove = this.findWinningMove(this.computerPlayer);
        const blockingMove = this.findWinningMove(this.humanPlayer);
        const centerIndex = 4;

        let moveIndex;
        if (winningMove !== -1) {
            moveIndex = winningMove;
        } else if (blockingMove !== -1) {
            moveIndex = blockingMove;
        } else if (this.board[centerIndex] === '') {
            moveIndex = centerIndex;
        } else {
            // Find a random empty cell
            const emptyCells = this.board.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);
            moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        setTimeout(() => {
            const cells = document.querySelectorAll('.board-cell');
            this.board[moveIndex] = this.computerPlayer;
            cells[moveIndex].textContent = this.computerPlayer;

            if (this.checkWin()) {
                this.oScore++;
                document.getElementById('o-score').textContent = this.oScore;
                this.displayMessage('Computer wins!', 'error');
                return;
            } else if (this.board.every(cell => cell !== '')) {
                this.displayMessage('Draw!', 'info');
                updateXP(10);   
                return;
            }

            this.currentPlayer = this.humanPlayer;
            document.getElementById('current-player').textContent = 'Your Turn (X)';

        }, 500);
    }

    findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            // Check if two cells are filled by the same player and third is empty
            if (this.board[a] === player && this.board[b] === player && this.board[c] === '') {
                return c;
            }
            if (this.board[a] === player && this.board[c] === player && this.board[b] === '') {
                return b;
            }
            if (this.board[b] === player && this.board[c] === player && this.board[a] === '') {
                return a;
            }
        }
        return -1;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        const cells = document.querySelectorAll('.board-cell');
        cells.forEach(cell => cell.textContent = '');
        this.gameActive = true;
        this.currentPlayer = this.humanPlayer;
        document.getElementById('current-player').textContent = 'Your Turn (X)';
    }

    // 2) Function to record the TTT win on server
    recordWinOnServer() {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        fetch(`${config.IP}/tictactoe/win`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log("Win recorded on server:", data);
          // Optionally, call a function to update the home page's TTT score
          // (if user returns there next).
        })
        .catch(err => {
          console.error("Error recording Tic Tac Toe win:", err);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});
