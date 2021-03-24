//let questionArray = [];
var questionArray = [50];
var numberOfShapes = 5;
var iterationOfShapes = 10;
var shapesToDisplay = 5;
populateQuestionArray();
let answerArray = [];

let square = $(".css-shapes-square");
let triangle = $(".css-shapes-triangle");
let circle = $(".css-shapes-circle");
let trapezoid = $(".css-shapes-trapezoid");
let bookmark = $(".css-shapes-bookmark");

var shapes = [square, triangle, circle, trapezoid, bookmark];

function populateQuestionArray(){
    for (let i = 0; i < iterationOfShapes; i++) {
            for (let j = 0; j < numberOfShapes; j++) {
                questionArray[(i * numberOfShapes) + j] = j;
            }           
    }
}


function shuffleArray() {
    for (let i = 0; i < questionArray.length; i++){
        rand = Math.floor(Math.random() * questionArray.length);
        temp = questionArray[i];
        questionArray[i] = questionArray[rand];
        questionArray[rand] = temp;
    }
    for(let i = 0; i < 30; i++){
        console.log(questionArray[i]);
    }
}




function displaySequence (shapesToDisplay) {
    shuffleArray();
    for (let i = 1; i < shapesToDisplay; i++){
        console.log(questionArray[i]);
        setTimeout(function() {shapes[questionArray[i]].clone().appendTo(".shape-display-box"); }, 3000);
        setTimeout(function() {$(".shape-display-box").empty(); }, 5000);    
    }

    /*setTimeout(function() {questionArray[0].clone().appendTo(".shape-display-box"); }, 500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 1500);
    setTimeout(function() {questionArray[1].clone().appendTo(".shape-display-box"); }, 2000);
    setTimeout(function() {$(".shape-display-box").empty(); }, 3000);
    setTimeout(function() {questionArray[2].clone().appendTo(".shape-display-box"); }, 3500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 4500);
*/
}

$("#start-button").click(displaySequence);
$("#submit-button").click(checkAnswer);


    square.click(function() {
        answerArray.push(square);
        console.log(answerArray);
    });

    triangle.click(function() {
        answerArray.push(triangle);
        console.log(answerArray);
    });

    circle.click(function() {
        answerArray.push(circle);
        console.log(answerArray);
    });

    trapezoid.click(function() {
        answerArray.push(trapezoid);
        console.log(answerArray);
    });

    bookmark.click(function() {
        answerArray.push(bookmark);
        console.log(answerArray);
    });

function checkAnswer(shapes){
    console.log();
    answerArray = [];
    console.log(answerArray)
}

function correctAnswerCounter() {

}
