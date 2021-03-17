let square = $(".css-shapes-square")
let triangle = $(".css-shapes-triangle")
let circle = $(".css-shapes-circle")
let trapezoid = $(".css-shapes-trapezoid")
let bookmark = $(".css-shapes-bookmark")

let shapes = [square, triangle, circle, trapezoid, bookmark];

function generateQuestionArray () {
    newArray = [];
    for (let i = 0; i < 3; i++){
        newArray.push(shapes[Math.floor(Math.random() * shapes.length)]);
    }
    console.log(newArray);

    for (let i = 0; i < 3; i++) {
        setTimeout(function () {
            newArray[i].clone().appendTo(".shape-display-box");
        }, 1000);
    };
};

$("#start-button").click(generateQuestionArray);

$("button.copy").click(function() {
    $(this).prev().children("img").clone().appendTo("#copiedimages");
});

function generateAnswerArray() {

}

function checkAnswer() {

}

function correctAnswerCounter() {

}

