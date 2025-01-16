# fbla-mad-cordova-state
 Mobile Application Development for FBLA - State

### Prompt

Design a mobile application that gamifies learning for subjects like math, science, history, or
language arts, offering interactive quizzes, puzzles, and progress tracking.

The following skills are emphasized: Game development, educational content creation,
interactive design, and user feedback mechanisms.


## Table of Contents

- [Features](#features)
- [Documentation Used](#documentation)
- [Installation and Setup](#installation-and-setup)
- [Running the Project](#running-the-project)
- [Routes and API Endpoints](#routes-and-api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)
- [Authors](#Authors)
- [Models](#models)
- [Security Considerations](#security-considerations)
- [Known Issues and TODOs](#known-issues-and-todos)
- [Changelog](#changelog)
- [Credits](#credits)
## Features

- **User Authentication:**
  - Secure user registration and login using email and password.
  - Session management with authentication middleware.

- **Subject Tests:**
  - 4 subjects, Math, English, History, and Science, with 25 questions each to test the user on their knowledge
  - Scores are saved in their categories and can be viewable at any time
  - Detailed questions and multiple-choice answers

- **Gameified Learning:**
  - Three games to learn multiple concepts in: Tic-Tac-Toe, Jeopardy, and Timer Challenge
  - Tic-Tac-Toe: Putting in your X will prompt you with a question, answering correct will allow you to play your turn while getting it wrong skips your turn
  - Jeopardy: 4 subjects with 5 categories each to earn points from 100-500 points. The user has 3 lives and answering wrong removes 1 life. 
  - Timer Challenge: The user has 30 seconds to answer as many questions as they can, each correct question adds 3 seconds to the timer while getting it wrong removes 2 seconds

- **Customizable Profile:**
  - The profile allows you to showcase your own profile picture and banner through uploading (Cloudinary)
  - The profile also showcases your level and your high score along the 3 gameified learning games, along with your coins

- **Shop and Coins (TO BE MADE)**
  - The shop will showcase possible themes, character creation, border themes for names, etc..
  - Coins are obtained for finishing games, which can be used in the Shop

- **Leveling up and experience:**
  - Completing games gives the user Experience Points (XP)
  - Gatheing more XP allows your Level to go up

- **Responsive Design:**
  - Works on many phone screens and tablets
  - Consistent styling and branding across the platform.

---
## Documentation

- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [BCrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [Gradle Documentation](https://docs.gradle.org/current/userguide/userguide.html)
- [Java JDK Documentation](https://docs.oracle.com/javase/8/docs/)
- [GitHub Documentation](https://docs.github.com/en)

- **Frontend:**
  - HTML5, CSS3, JavaScript
  - Responsive design with media queries

- **Backend:**
  - Node.js
  - Express.js
  - Cordova Android
  - MongoDB with Mongoose ORM

- **Authentication:**
  - JsonWebToken for user authentication
  - bcrypt for password hashing

- **File Uploads:**
  - Cloudinary Media Storage for anytime pulls

- **Icons and Fonts:**
  - Google Fonts for typography
  - Ionicons for icons
  - Logo created by Daniel

## Installation and setup

### **Prerequisites**

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MongoDB (local instance or MongoDB Atlas)
- Java JDK
- Android SDK: installed
- Gradle: installed

### **Clone the Repository**

```bash
git clone https://github.com/DerpNerdd/fbla-mad-cordova.git
cd fbla-mad-cordova
```
### **Install Dependencies**
```bash
npm install
install dependecies in /learningApp/ /learningApp/backend/
npm i -g cordova
cordova add platform android
```
### **Environment Variables**
Create a .env file in the root directory.
For specific environment variables, email sanchez1.alan1@gmail.com

## Running the project

Start the Server
```
npm run start
```
The server will start on http://localhost:3000 or the port/ip specified in your .env/config.js file.
## Routes and API Endpoints

### Authentication Routes
**POST /auth/signup**
- Description: Register a new user.
- Access: Public
- Data: `name`, `email`, `password`

**POST /auth/login**
- Description: Authenticate user and start a session.
- Access: Public
- Data: `email`, `password`

### User Routes
**GET /users/:id**
- Description: Fetch user data (accessible only by the user).
- Access: Private (authenticated users)
- Data: `Authorization` header with a valid JWT.

**POST /users/:id/xp**
- Description: Update user's XP and level up if necessary.
- Access: Private (authenticated users)
- Data: `xpChange`

**POST /users/:id/uploadProfile**
- Description: Upload a profile picture to Cloudinary and update the user's profile picture URL.
- Access: Private (authenticated users)
- Data: `base64Image`

**POST /users/:id/uploadBanner**
- Description: Upload a banner image to Cloudinary and update the user's banner picture URL.
- Access: Private (authenticated users)
- Data: `base64Image`

### Game Routes
#### Tic Tac Toe
**POST /tictactoe/win**
- Description: Increment the user's tic-tac-toe wins and award coins.
- Access: Private (authenticated users)

#### Jeopardy
**POST /jeopardy/score**
- Description: Update the user's highest Jeopardy score and award coins.
- Access: Private (authenticated users)
- Data: `finalScore`

#### Timer Challenge
**POST /timerChallenge/time**
- Description: Update the user's best timer challenge time and award coins.
- Access: Private (authenticated users)
- Data: `finalTime`

### Test Routes
**POST /tests/score**
- Description: Add a test score to the user's record.
- Access: Private (authenticated users)
- Data: `subject`, `date`, `score`

**GET /tests**
- Description: Retrieve the user's test scores, optionally filtered by subject.
- Access: Private (authenticated users)
- Query Parameters: `subject` (optional)

### Miscellaneous
**GET /**
- Description: Root route for testing server functionality.
- Access: Public

## Project Structure

```
fbla-mad-cordova/
├── learningApp/
│   ├── backend/
│   │   ├── models/
│   │   |   ├── User.js
│   │   ├── node_modules/
│   │   ├── routes/
│   │   |   ├── auth.js
│   │   |   ├── jeopardy.js
│   │   |   ├── test.js
│   │   |   ├── ticTacToe.js
│   │   |   ├── timerChallenge.js
│   │   |   ├── user.js
│   │   ├── utils/
│   │   |   ├── CloudinaryConfig.js
│   │   ├── .env
│   │   ├── app.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   ├── node_modules/
│   ├── resources/
│   │   ├── android/...
│   │   ├── icon.png
│   ├── platforms/
│   │   ├── android/...
│   ├── www/
│   │   ├── css/
│   │   |   ├── categories.css
│   │   |   ├── games.css
│   │   |   ├── homeStyle.css
│   │   |   ├── profile.css
│   │   |   ├── shopStyle.css
│   │   |   ├── style.css
│   │   |   ├── test.css
│   │   |   ├── testPage.css
│   │   |   ├── testScores.css
│   │   ├── Fonts/
│   │   |   ├── Atop-R99O3.ttf
│   │   ├── games/
│   │   |   ├── jeopardy.html
│   │   |   ├── jeopardy.js
│   │   |   ├── jeopardy.css
│   │   |   ├── ticTacToe.html
│   │   |   ├── ticTacToe.js
│   │   |   ├── ticTacToe.css
│   │   |   ├── timer.html
│   │   |   ├── timer.js
│   │   |   ├── timer.css
│   │   ├── images/
│   │   |   ├── dusk-background.svg
│   │   |   ├── FBLA-MAD.png
│   │   |   ├── landscapemad.webp
│   │   |   ├── spectrum-gradient.png
│   │   ├── js/
│   │   |   ├── categories.js
│   │   |   ├── config.js
│   │   |   ├── home.js
│   │   |   ├── profile.js
│   │   |   ├── script.js
│   │   |   ├── testScores.js
│   │   ├── categories.html
│   │   ├── games.html
│   │   ├── homepage.html
│   │   ├── index.html
│   │   ├── profile.html
│   │   ├── shop.html
│   │   ├── test.html
│   │   ├── testPage.html
│   │   └── testScores.html
│   ├── .gitignore
│   ├── .config.xml
│   ├── package-lock.json
│   └── package.json
├── .gitattributes
├── .gitignore
├── .gitmodules
├── LICENSE
└── README.md
```
## Key Files and Directories
- app.js: The main application file where the Express app is configured.
- routes/: Contains all route handlers for different parts of the application.
- models/: Mongoose schemas and models for MongoDB collections.
- www/: Static assets like CSS, images, and fonts.

## License
This project is licensed under the GPL-3.0 License.

## Authors
For any inquiries or support, please contact:

- [Alan Sanchez](https://www.github.com/derpnerdd)
- [Daniel Freeman](https://www.github.com/DanielFreeman068)


## Models
**User Model (User.js)**
Fields:

- name (String)
- email (String, unique, required)
- password (String, hashed, required)
- xp (Number, default: 0)
- level (Number, default: 0)
- profilePicture (String, default: cloudinaryLink)
- bannerPicture (String, default: cloudinaryLink)
- jeopardyScore (Number, default: 0)
- ticTacToeWins (Number, default: 0)
- coins (Number, default: 0)
- timerChallengeTime (Number, default: 0)
- testScores:
  - subject (String, required)
  - date (Date, required)
  - score (Number, required)


## Security Considerations
- Password Security: User passwords are hashed using bcrypt before storing in the database.
Authentication: Sessions are managed securely using Express sessions and with Token Authentication
- Input Validation: All user inputs should be validated and sanitized to prevent injection attacks.
- Access Control: Middleware functions ensure that only authorized users can access certain routes.

## Known Issues and TODOs
- Testing: Implement unit and integration tests with iOS devices to make sure it works accross all platforms
- Error Handling: Improve error handling and provide user-friendly error messages.
- Shop: Implement the shop into the app to allow users to express themselves differently than others
- Avatars: Implement avatars you can create with items bought from the shop

## Changelog
v1.0.0
- Initial release with core functionalities:
- User authentication
- Gameified Learning
- Profile integration and customization
- Basic testing

## Credits
This project was developed by the hard-working developers of Alan Sanchez and Daniel Freeman, with minor design ideas from Noelle Weaver.

Thank you for contributing to the Jolt FBLA-MAD Platform!
