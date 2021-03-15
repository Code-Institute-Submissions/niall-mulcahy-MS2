let square = $(".css-shapes-square")
let triangle = $(".css-shapes-triangle")
let circle = $(".css-shapes-circle")
let trapezoid = $(".css-shapes-trapezoid")
let bookmark = $(".css-shapes-bookmark")

let shapes = ["square", "triangle", "circle", "trapezoid", "bookmark"];


function generateSingleShape () {
    let singleShape = shapes[Math.floor(Math.random() * shapes.length)];
    var questionArray = [];
    questionArray.push(singleShape);
    console.log(questionArray);
};

$("#start-button").click(function (){
    var newArray = [];
    for (let i = 0; i < 3; i++){
        generateSingleShape();
    }
})


function displayArray() {

}

function generateAnswerArray() {

}

function checkAnswer() {

}

function correctAnswerCounter() {

}

