
let score = 0;
let questionNumber = 0;
    //generates questions until STORE length is reached
function generateQuestion() {
    console.log(questionNumber);
    console.log(STORE[0].question);
    if (questionNumber < STORE.length){
        return createString(questionNumber);
    }
    else {
        $('.questionBox').hide();
        finalResult();
        $('.questionNumber').text(7);
    }
}

function createString(questionIndex){
    let formCreator = $(`<form><fieldset><legend class = "questionText">${STORE[questionIndex].question}</legend></fieldset></form>`);
    let fieldSelector = $(formCreator).find('fieldset');
    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex){
        $(`<label class = "questionDisplay" for = "${answerIndex}">
        <input class = "radio" type = "radio" id = "${answerIndex}" value = "${answerValue}" name = "answer" required>
        <span>${answerValue}</span></label>`).appendTo(fieldSelector);
    });
    $(`<button type = "submit" class = "submitButton button">Submit</button>`).appendTo(fieldSelector);
    return formCreator;
}
function updateScore(){
    score++;
    $('.score').text(score);
}

function updateQuestionNumber(){
    questionNumber++;
    $('.questionNumber').text(questionNumber +1);
}

function resetResults(){
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
}
    //Defines functions to be called once quiz begins
function beginTest(){
    $('.altBox').hide();
    $('.beginTest').on('click', '.startButton', function(event){
        $('.beginTest').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    });
}
    //compares answer choice to answer in STORE to define if score will be updated or not once answer is submitted
function submitAnswer(){
    $('.questionBox').on('submit', function(event){
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let chosen = $('input:checked');
        let answer = chosen.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct){
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });
}
    //creates approriate response when answer choice matches correct Answer
function correctAnswer(){
    $('.response').html(`<img class = "images" src = "images/Clinics_RightAnswer.jpg">
    <p class = "wellDone">Thats CORRECT!</p>
    <button type= "button" class= "nextButton button">Next Question</button>`);
    updateScore();
}
    //provides correct answer if answer choice doesn't match correct answer
function wrongAnswer(){
    $('.response').html(`<img class = "images" src = "images/Clinics_WrongAnswer.jpg"><p class= "correction">Oops! The Correct Answer is:</p>
    <p class= "correctAnswer">${STORE[questionNumber].correctAnswer}</p>
    <button type = "submit" class = "nextButton button">Next Question</button>`);
}
    //renders the following question from STORE after showing the correct response
function nextQuestion(){
    $('.response').on('click', '.nextButton', function(event){
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(generateQuestion());
    });
}
    //defines the final page displayed based on final score
function finalResult(){
    $('.final').show();


    const great = [
        'Great Job!',
        'You know what it takes to stay safe!',
        'Share this quiz with your family & friends to spread the knowledge!'
    ]
    const good = [
        'Not Bad',
        'It might be a good idea for you to get tested',
        'Retake this quiz to learn what you need to know about Corona!'
    ]
    const bad = [
        'Needs work',
        'It is important to stay informed about the virus to prevent the spread!',
        'The reason why COVID-19 is so dangerous is due to unconcious spreading'
    ]
    if(score >= 5){
        array = great;
    }
    else if(score < 5 && score >= 3){
        array = good;
    }
    else {
        array = bad;
    }

    return $('.final').html(`
    <h3>"${array[0]}"</h3> 
    <h3>Your score is ${score}/7</h3>
    <p>${array[1]}</p>
    <h3>${array[2]}</h3>
    <button type = "submit" class = "restartButton button">Restart Quiz</button>`);
}
    //clears results and returns to homepage to begin test again
function restartQuiz(){
    $('.final').on('click', '.restartButton', function(event){
        event.preventDefault();
        resetResults();
        $('.altBox').hide();
        $('.beginTest').show();
    });
}

function makeQuiz(){
    beginTest();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}
$(makeQuiz);