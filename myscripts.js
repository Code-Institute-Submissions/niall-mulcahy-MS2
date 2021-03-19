let square = $(".css-shapes-square")
let triangle = $(".css-shapes-triangle")
let circle = $(".css-shapes-circle")
let trapezoid = $(".css-shapes-trapezoid")
let bookmark = $(".css-shapes-bookmark")

let shapes = [square, triangle, circle, trapezoid, bookmark];

function generateQuestionArray () {
    questionArray = [];
    for (let i = 0; i < 3; i++){
        questionArray.push(shapes[Math.floor(Math.random() * shapes.length)]);
    }
    console.log(questionArray);

    setTimeout(function() {questionArray[0].clone().appendTo(".shape-display-box"); }, 500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 1500);
    setTimeout(function() {questionArray[1].clone().appendTo(".shape-display-box"); }, 2000);
    setTimeout(function() {$(".shape-display-box").empty(); }, 3000);
    setTimeout(function() {questionArray[2].clone().appendTo(".shape-display-box"); }, 3500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 4500);
}

$("#start-button").click(generateQuestionArray);

$("#submit-button").click(checkAnswer);

var answerArray = [];

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

function checkAnswer(questionArray, answerArray) {
    if (JSON.stringify(questionArray) === JSON.stringify(answerArray)) {
        alert ("You got it right!");}
        else {
            alert ("nice try! Better luck next time!");
        }
    questionArray = [];
}


function correctAnswerCounter() {

}

