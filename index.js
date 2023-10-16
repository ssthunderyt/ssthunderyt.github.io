//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
const questions = [
    {
      question: "Subtract 2x³ – 4x² + 3x + 5 from 4x³ + x² + x + 6",
      optionA: "2x³ + 5x⁴ – 2x + 1",
      optionB: "2x³ + 5x² – 2x",
      optionC: "-2x³ - 5x² – 2x + 1",
      optionD: "2x³ + 5x² – 2x + 1",
      correctOption: "optionD"
    },

    {
question: "Add 2/3a, 3/5a, -6/5a",
optionA: "2a/21",
optionB: "a/30",
optionC: "a/15",
optionD: "15/a",
correctOption: "optionC"
    },
{
question: "Subtract 2/3y³ – 2/7y² – 5 from 1/3y³ + 5/7y² + y – 2",
optionA: "-1/3y³ + y² + y + 3",
optionB: "-1/2x³ – 1/2x + 3/2",
optionC: "2/y³ + y⁷ + y + 2",
optionD: "-2/y³ + y⁴ + y - 2",
correctOption: "optionA"
    },
{
question: "Simplify x² – 3x + 5 – 1/2(3x² – 5x + 7)",
optionA: "1/2x² – 1/2x + 3/2",
optionB: "-1/2x² + 1/2x - 3/2",
optionC: "-1/x² – 1/3x + 3/2",
optionD: "-1/2x² – 1/2x + 3/2",
correctOption: "optionA"
},
{
question: "3/2a – 5/4b + 2/5c, 2/3a – 7/2b + 7/2c, 5/3a + 5/2b – 5/4c",
optionA: "23a/6 + 9b/4 - 53c/20",
optionB: "23b/6 – 9a/4 + 53c/20",
optionC: "13a/6 – 9b/4 + 43c/20",
optionD: "23a/6 – 9b/4 + 53c/20",
correctOption: "optionD"
},
{
question: "a – b + ab, b – c + bc, c – a + ac",
optionA: "-ab-bc-ac",
optionB: "ab+bc+ac",
optionC: "ab-bc+ac",
optionD: "ab+bc-ac",
correctOption: "optionB"
    },
{
question: "2p²q² – 3pq + 4, 5 + 7pq – 3p²q²",
optionA: "2pq+7-pq²",
optionB: "9pq+4-p²q",
optionC: "4pq+9–p²q²",
optionD: "7pq+11-p²q²",
correctOption: "optionC"
    },
{
question: "Subtract 2a-b from 3a-5b",
optionA: "a-5b",
optionB: "2a-2b",
optionC: "b-4a",
optionD: "a – 4b",
correctOption: "optionD"
    },
{
question: "Add 3a²b, -4a²b, 9a²b",
optionA: "8a³b",
optionB: "8a³b2",
optionC: "8a²b",
optionD: "8b²a",
correctOption: "optionC"
    },
{
question: "Simplify [5 – 3x + 2y – (2x – y)] – (3x – 7y + 9)",
optionA: "-8x + 10y – 4",
optionB: "8x + 10y -4",
optionC: "8x - 10y + 4",
optionD: "4x + 5y - 2",
correctOption: "optionA"
    },
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    
}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
