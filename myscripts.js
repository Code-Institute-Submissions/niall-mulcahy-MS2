let square = $(".css-shapes-square")
let triangle = $(".css-shapes-triangle")
let circle = $(".css-shapes-circle")
let trapezoid = $(".css-shapes-trapezoid")
let bookmark = $(".css-shapes-bookmark")

let shapes = ["square", "triangle", "circle", "trapezoid", "bookmark"];

function generateQuestionArray () {
    var newArray = [];
    for (let i = 0; i < 3; i++){
        newArray.push(shapes[Math.floor(Math.random() * shapes.length)]);
    }
    console.log(newArray)
};

$("#start-button").click(generateQuestionArray);


function displayArray() {

}

function generateAnswerArray() {

}

function checkAnswer() {

}

function correctAnswerCounter() {

}

