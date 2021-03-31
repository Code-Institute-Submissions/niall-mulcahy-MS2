var questionArray = [50];
var numberOfShapes = 5;
var iterationOfShapes = 10;
var shapesToDisplay;
var answerArray = [];
var answersToDate = 0;
var highScore = 0;
var square = $(".css-shapes-square");
var triangle = $(".css-shapes-triangle");
var circle = $(".css-shapes-circle");
var trapezoid = $(".css-shapes-trapezoid");
var triangleDown = $(".css-shapes-triangle-down");
var shapes = [square, triangle, circle, trapezoid, triangleDown];
/*var smallSquare = document.createElement('div');
smallSquare.classList.add("small-square");
var smallTriangle = document.createElement('div');
smallTriangle.classList.add("small-triangle");
var smallCircle = document.createElement('div');
smallCircle.classList.add("small-circle");
var smallTrapezoid = document.createElement('div');
smallTrapezoid.classList.add("small-trapezoid");
var smallRectangle = document.createElement('div');
smallRectangle.classList.add("small-rectangle");
*/
var smallSquare = $(".small-square");
var smallTriangle = $(".small-triangle");
var smallCircle = $(".small-circle");
var smallTrapezoid = $(".small-trapezoid");
var smallTriangleDown = $(".small-triangle-down");

var smallShapes = [smallSquare, smallTriangle, smallCircle, smallTrapezoid, smallTriangleDown];
setup();

function setup(){
    populateQuestionArray();
    disableButtons(2);
    //shapesToDisplay = numberOfShapes - 2;
    shapesToDisplay = 14;
}


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
}

function displaySequenceCaller(){
    //displaySequence(shapesToDisplay);
    displaySequence(shapesToDisplay)
        
}



function displaySequence (shapesToDisplay) {
    clearDisplayBox();
    shuffleArray();
    disableButtons(3);
	
    let time1 = 500;
    let time2 = 1500;

    for (let i = 0; i < shapesToDisplay; i++){
        console.log("current i =" + i);
        setTimeout(function() {shapes[questionArray[i]].clone().appendTo(".shape-display-box"); }, time1);
        setTimeout(function() {$(".shape-display-box").empty(); }, time2);
        time1 += 1500;
        time2 += 1500;    
    }
    answerArray.length = 0;
    setTimeout(disableButtons, 1500 * shapesToDisplay);
    
    
}

$("#start-button").click(displaySequenceCaller);
$("#submit-button").click(checkAnswer);


    square.click(function() {
        answerArray.push(0);
        let smallSquare = document.createElement('div');
        smallSquare.classList.add("small-square");   
        document.getElementById("shape-display-box").appendChild(smallSquare);

    });

    triangle.click(function() {
        answerArray.push(1);
        let smallTriangle = document.createElement('div');
        smallTriangle.classList.add("small-triangle");   
        document.getElementById("shape-display-box").appendChild(smallTriangle);
    });

    circle.click(function() {
        answerArray.push(2);
        let smallCircle = document.createElement('div');
        smallCircle.classList.add("small-circle");   
        document.getElementById("shape-display-box").appendChild(smallCircle);
    });

    trapezoid.click(function() {
        answerArray.push(3);
        let smallTrapezoid = document.createElement('div');
        smallTrapezoid.classList.add("small-trapezoid");   
        document.getElementById("shape-display-box").appendChild(smallTrapezoid);
    });

    triangleDown.click(function() {
        answerArray.push(4);
        let smallTriangleDown = document.createElement('div');
        smallTriangleDown.classList.add("small-triangle-down");   
        document.getElementById("shape-display-box").appendChild(smallTriangleDown);
    });

function correctNumberOfAnswers(p1,p2){
    var result = true;
    var valueOfP1 = p1;
	if (answerArray.length != valueOfP1){
        result = false;	
       if (p2)
        alert(`You did not answer the correct number of shapes:\nQuestions: ${valueOfP1}\nAnswers: ${answerArray.length}`);		
	}
    return result;    
}

function areAnswersCorrect(p1){
    var result = true;
    for (let i = 0; i < shapesToDisplay; i++){
		if(answerArray[i] != questionArray[i]){
			result = false;			
			//break;
		}
    } 
    return result;
}
function checkAnswer(){
    var userMessage;
    clearDisplayBox();
    // Correct number of answers and all correct
    if (correctNumberOfAnswers(shapesToDisplay,true) && areAnswersCorrect(shapesToDisplay)){       
        userMessage = `Well done you got ${shapesToDisplay} correct`;
        let streak = document.getElementById('streak');
        streak.innerHTML = shapesToDisplay;
        alert(`${userMessage}`)
        shapesToDisplay++;
    }else { 
        userMessage = "User Input Incorrect";
        // User did not enter correct solution
        // check if this is a new highest score
        if (shapesToDisplay - 1 > highScore && shapesToDisplay - 1 > 2){
            userMessage +=`\n\nYou did however set a new\nrecord of ${shapesToDisplay - 1} correct responses`;
			highScore = shapesToDisplay - 1;
			var highScoreCounter = document.getElementById('session-record');
            highScoreCounter.innerHTML = highScore;
        }
        if (correctNumberOfAnswers(shapesToDisplay,false)){
            //this means at least one answer incorrect, but number of answer is correct            
            userMessage += `\n\n Do you wish to see where you went wrong?`
            if (confirm(userMessage)){
                createRows();
                displayAnswerVariance(shapesToDisplay);         
            }
        } 
        shapesToDisplay = numberOfShapes - 2;
        answerArray.length = 0;
        streak.innerHTML = 0;
    }
    // Only enable start button   
    disableButtons(2);
    // Notify user of outcome of game 	
}


function disableButtons(param){
    switch (param){
        case 1:
            disableStartButtons();
            break;
         case 2:
             disableAnswerButtons();
             break;
         case 3:
             disableAllButtons()
             break;
          default  :
            disableStartButtons(); 
                 
    }        
}

function disableAnswerButtons(){
//disables all buttons used for answer
//
	var submitButton = document.getElementById('submit-button');
	submitButton.disabled = true;
	var shapeButtons = document.getElementsByClassName('shape');
	for (var i = 0; i < shapeButtons.length; i++){
		shapeButtons[i].style.pointerEvents = 'none';
	}
	var startButton = document.getElementById('start-button');
	startButton.disabled = false;
}

function disableStartButtons(){
	var startButton = document.getElementById('start-button');
	startButton.disabled = true;
	var shapeButtons = document.getElementsByClassName('shape');
	for (var i = 0; i < shapeButtons.length; i++){
		shapeButtons[i].style.pointerEvents = 'auto';
	}
	var submitButton = document.getElementById('submit-button');
	submitButton.disabled = false;
}

function disableAllButtons(){
	var submitButton = document.getElementById('submit-button');
	submitButton.disabled = true;
	var startButton = document.getElementById('start-button');
	startButton.disabled = true;
	var shapeButtons = document.getElementsByClassName('shape');
	for (var i = 0; i < shapeButtons.length; i++){
		shapeButtons[i].style.pointerEvents = 'none';
	}
}


function clearDisplayBox(){
    $(".shape-display-box").empty();
}


function createRows () {
    var row1a = document.createElement("div");
    row1a.setAttribute('id', 'row1a');
    row1a.classList.add("float-left");
    row1a.classList.add("margin-top");
    document.getElementById("shape-display-box").appendChild(row1a);

    var row1b = document.createElement("div");
    row1b.setAttribute('id', 'row1b');
    row1b.classList.add("float-left");
    document.getElementById("shape-display-box").appendChild(row1b);

    var row2a = document.createElement("div");
    row2a.setAttribute('id', 'row2a');
    row2a.classList.add("float-left");
    row2a.classList.add("margin-top");
    document.getElementById("shape-display-box").appendChild(row2a);

    var row2b = document.createElement("div");
    row2b.setAttribute('id', 'row2b');
    row2b.classList.add("float-left");
    document.getElementById("shape-display-box").appendChild(row2b);

    var row3a = document.createElement("div");
    row3a.setAttribute('id', 'row3a');
    document.getElementById("shape-display-box").appendChild(row3a);

    var row3b = document.createElement("div");
    row3b.setAttribute('id', 'row3b');
    document.getElementById("shape-display-box").appendChild(row3b);

}



function displayAnswerVariance(p1) {
 //p1 is shapes to display
    let counter = Math.min(p1,10);

    var smallQ1 = document.getElementById("small-q1");
    document.getElementById("row1a").appendChild(smallQ1);

    for(let i = 0; i < counter; i++){
        smallShapes[questionArray[i]].clone().appendTo("#row1a");
    }

    var smallA1 = document.getElementById("small-a1");
    document.getElementById("row1b").appendChild(smallA1);

    for(let i = 0; i < counter; i++){
        smallShapes[answerArray[i]].clone().appendTo("#row1b");
    }
    counter = Math.min(p1,20);

    var smallQ2 = document.getElementById("small-q2");
    document.getElementById("row2a").appendChild(smallQ2);
    for(let i = 10; i < counter; i++){
        smallShapes[questionArray[i]].clone().appendTo("#row2a");
    }

    var smallA2 = document.getElementById("small-a2");
    document.getElementById("row2b").appendChild(smallA2);
    for(let i = 10; i < counter; i++){
        smallShapes[answerArray[i]].clone().appendTo("#row2b");
    }
}


function appendText(){
    
}


/* for tomorrow, get rid of testing alerts,
add the you answered, versus correct answer, figure out how to center the display answer function
add comments and tidy functions*/