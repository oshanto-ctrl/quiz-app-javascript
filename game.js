// question
const question = document.getElementById("question");

// choices
const choices = Array.from( document.getElementsByClassName("choice-text") );
console.log(choices);

// hud displaying
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

// progress bar 
const progressBarFull = document.getElementById("progressBarFull");

// loader
const loader = document.getElementById("loader");

// game
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availabeQuestions = []; 

// fetch question form json
let questions = [];

fetch("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple").then(res => {
    // console.log(res);
    return res.json();
}).then( loadedQuestions => {
    // questions = loadedQuestions;
    // after loading questions
    // start the game
    //startGame();
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [ ... loadedQuestion.incorrect_answers];

        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.incorrect_answers);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice;
        })

        return formattedQuestion;
    });

    // start game function
    startGame();

}).catch(err =>{
    console.error(err);
});

// Constants 
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 15;

// start game function
startGame = () => {
    questionCounter = 0;
    score = 0;
    availabeQuestions = [ ... questions];
    getNewQuestion();
    // remove hidden class from after loading questions
    game.classList.remove("hidden");
    // add hidden class to loader after appering question
    loader.classList.add("hidden");
    // console.log(availabeQuestions);
}

// getNewQuestion function
getNewQuestion = () => {

    if(availabeQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        // save to local storage
        localStorage.setItem('mostRecentScore', score);

        // go to end page
        return window.location.assign("/end.html");
    }


    questionCounter++;
    // display question no / max question no.
    // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar on correct question answer
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availabeQuestions.length); // choose a random question
    currentQuestion = availabeQuestions[questionIndex];
    question.innerText = currentQuestion.question; // set question to html page

    // choices
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availabeQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers){
            return;
        }
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        // correct and incorrect class 
        // based on selectedAnswer

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply == "correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        
        getNewQuestion();
        }, 1000);
        
        // console.log(classToApply);
        // console.log(selectedAnswer == currentQuestion.answer);

        
    });
});

// Increment Score function
incrementScore = num => {
    score += num;
    scoreText.innerText = `${score}`;
}


// startGame();


























