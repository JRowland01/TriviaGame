$(document).ready(function() {

generateQuiz();

//Initializes correct and incorrect answers talleys
$("#correctAnswers").text(correctAnswers);
$("#incorrectAnswers").text(10 - correctAnswers);

//Hides the scores in the start page
$(".results").hide();

var gameTimer;


$(".startButton").click(function() {
    $(".startButton").hide();
    $(".results").hide();
    $("#quiz").show();
    $("#questions").show();
    gameTimer = setInterval(mainTime, 3000);
});

//A function for the time used during the game.

function mainTime() {
    var previousTime = $('#timeR').text();
    var newTime = previousTime - 1;

    if (newTime < 1) {
        clearInterval(gameTimer);
        displayResults();
        return;

    }

    $('#timeR').text(newTime);
}

//End button

$(".endButton").click(function() {
    displayResults();

});


var resetTimer;


});

//A function that generates the quiz.

function generateQuiz() {
    var top = $("#questions");

    for (var q = 0; q < questionsArray.length; q++) {
        var qDiv = $("<div>");
        var qName = "question" + q;
        qDiv.attr("id", qName);
        var qValue = $("<span>");
       
        qValue.text(questionsArray[q].question);
        qDiv.append(qValue);
      

        for (var c = 0; c < 4; c++) {
            var cInput = $("<input>");
            var cValue = questionsArray[q].choices[c];
            cInput.attr("name", qName)
                .attr("type", "radio")
                .attr("value", cValue);
            qDiv.append(cValue);
            qDiv.append(cInput);
        }
        top.append(qDiv);


    }

}

//Initializes quizQuestions function and allows the answered and unanswered results to be returned.
function quizQuestions() {
    var cAnswers = 0;
    var unanswered = 0;
    for (var q = 0; q < questionsArray.length; q++) {
        var chosenValue = $('input[name="question' + q +'"]:checked').val();
        if (chosenValue === undefined) {
            unanswered++;
        } else cAnswers += (chosenValue == questionsArray[q].correctAnswer) ? 1 : 0;

    }
    return [cAnswers, unanswered];
}

//Object array containing the questions, answer options and the correct answers.
var questionsArray = [{
    question: "A simple side dish made from fried sweet plantains.",
    choices: ["empanada", "maduros", "mofongo", "tostones"],
    correctAnswer: "maduros"
}, {
    question: "Which one of these is not a beverage?",
    choices: ["jamaica", "piña", "horchata", "fresa"],
    correctAnswer: "fresa"
}, {
    question: "A roasted pork shoulder served during the holidays in Puerto Rico.",
    choices: ["barbacoa", "lengua", "asada", "pernil"],
    correctAnswer: "pernil"
}, {
    question: "Which one of these items is a Mexican sandwich?",
    choices: ["torta", "empanada", "flauta", "taco"],
    correctAnswer: "torta"
}, {
    question: "Which product is not a ingredient in tres leches cake?",
    choices: ["evaporated milk", "vanilla", "condensed milk", "piloncillo"],
    correctAnswer: "piloncillo"
}, {
    question: "Which one of these dishes are fried grasshoppers?",
    choices: ["sopes", "chapulines", "elote", "menudo"],
    correctAnswer: "chapulines"
}, {
    question: "Which dessert below is custard-based?",
    choices: ["churros", "cajetas", "flan", "sopapilla"],
    correctAnswer: "flan"
}, {
    question: "Which item is a traditional taco topping in Mexico?",
    choices: ["radishes", "tomatoes", "lettuce", "cheddar cheese"],
    correctAnswer: "radishes"
}, {
    question: "A Salvadorean dish made from a thick handmade corn tortilla and a variety of fillings.",
    choices: ["nacatamal", "pupusa", "arepa", "enchilada"],
    correctAnswer: "pupusa"
}, {
    question: "A traditional Spanish dish made from saffron-flavored rice and various meats.",
    choices: ["pozole", "casado", "paella", "mojarra"],
    correctAnswer: "paella"
}];

//A function that allows the talleys to be displayed

function displayResults() {
    var correctAnswers;
    var unanswered;
    var qq = quizQuestions();
    correctAnswers = qq[0];
    unanswered = qq[1];
    $("#quiz").hide();
    $(".results").show();
    $("#correctAnswers").text(correctAnswers);
    $("#incorrectAnswers").text(10 - correctAnswers - unanswered);
    $('#unansweredQuestions').text(unanswered);
    resetTimer = setInterval(reset, 6000);
}


//Resets the game

function reset() {
    $(".startButton").show();
    $(".results").hide();
    $("#quiz").hide();
    $("#questions").hide();
    $("input:checked").removeAttr("checked");
    $('#timeR').text("60");
    clearInterval(resetTimer);
}