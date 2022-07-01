// global variables
// quesitons
var questions = [
    {
        question: `Which of the following describes the structure of a web page?
        `,
        options: [`CSS`, `HTML`, `JavaScript`, `Word`],
        answer: `HTML`
    },
    {
        question: `JavaScript is invented by 
        Brendan Eich in ____.`,
        options: [`1990`, `1985`, `1995`, `2000`],
        answer: `1995`
    },
    {
        question: `____ are used to execute a block of code a number of times.
        `,
        options: [`Loops`, `Conditional statments`, `Circles`, `Recursion functions`],
        answer: `Loops`
    },
    {
        question: `____ returns the first element that matches the specified selector.
        `,
        options: [`returnElement`, `createElement`, `addEventListener`, `querySelector`],
        answer: `querySelector`
    }
]

var currentQuestion = 0

// timeLeft
var timeLeft = 100;
var timerEl = document.getElementById(`countdown`);

// progress
var isDone = false


// scoreboard
var scoreboard = [
    {
        
    }
]

var startButton = document.querySelector(`#startQuizBtn`)
var initialPage = document.querySelector(`#initialPage`)
var quizPage = document.querySelector(`#quizPage`)
var donePage = document.querySelector(`#donePage`)
var scorePage = document.querySelector(`#scorePage`)
var multiChoice = document.querySelector(`.multipleChoice`)
var userScore = document.querySelector(`#userScore`)

// start quiz when button is clicked

function startQuiz() {
    isDone = false;
    countdown();
    showQs();
    initialPage.setAttribute(`class`, `hidden`)
    quizPage.setAttribute(`class`, ``)

}

startButton.addEventListener("click", startQuiz);


// make that question appear
// function to show question



function showQs() {
    document.querySelector(`#questions`).innerHTML = questions[currentQuestion].question 

    
    
    for (let i = 0; i <= 3; i++) {
        
        var button = document.createElement(`button`)
        button.innerHTML = questions[currentQuestion].options[i]

        button.addEventListener('click', function (event) {
            answerChecker(event)
        })

        document.querySelector(`.multipleChoice`).appendChild(button)
        

    }


}

// check if the correct answer is selected

function answerChecker(event) {
    console.log(event.target.innerHTML)
    if (event.target.innerHTML == questions[currentQuestion].answer) {
        console.log('true')
        empty();
    } else {
        console.log('false')
        // minus 10 seconds if incorrect answers are selected
        timeLeft -= 10
        empty();
    }
    
    function empty() {
        $(multiChoice).empty();
    }

    if (currentQuestion < questions.length-1) {
        currentQuestion++;
        console.log(currentQuestion)
    } else{
        isDone = true
    }
    showQs();
};



// trigger countdown timer
// function for countdown
function countdown() {
    
    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timeLeft--;
            timerEl.textContent = `Timer: ` + timeLeft;
            // all questions answered b4 timer reaches 0
            if (isDone && timeLeft > 0) {
                clearInterval(timeInterval);
                quizDone();
                recordTime();
            }
        } 
        //timer reaches 0, quiz ends
        if (timeLeft === 0) {
            // timerEl.textContent = ``;
            clearInterval(timeInterval);
            quizDone();
            recordTime();
        }
    }, 1000);

}

// check all questions answered
function checkDone() {
    if (currentQuestion == 3) {
        isDone = true;
    }
}


function quizDone() { 
    quizPage.setAttribute(`class`, `hidden`)
    donePage.setAttribute(`class`, ``)
}

//TODO: store username and score to local storage
// score

function recordTime() {
    localStorage.setItem("savedScore", timeLeft)
    userScore.textContent = `Your score is ` + timeLeft
}


//TODO: can reset score with a reset button
var clearButton = document.querySelector(`#clearButton`)

function clearScore() {
score = ``
}

clearButton.addEventListener(`click`, clearScore);
