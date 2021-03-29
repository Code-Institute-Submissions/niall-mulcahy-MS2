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
var bookmark = $(".css-shapes-bookmark");
var shapes = [square, triangle, circle, trapezoid, bookmark];
setup();

function setup(){
    populateQuestionArray();
    disableButtons(2);
    shapesToDisplay = numberOfShapes - 2;

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

    bookmark.click(function() {
        answerArray.push(4);
        let smallBookmark = document.createElement('div');
        smallBookmark.classList.add("small-bookmark");   
        document.getElementById("shape-display-box").appendChild(smallBookmark);
    });

function correctNumberOfAnswers(p1){
    var returnValue = true;
    var valueOfP1 = p1;
	if (answerArray.length != valueOfP1){
        returnValue = false;	
        alert(`lengths not equal ans arr ay length = ${answerArray.length} = ${valueOfP1}`);		
	}
    return returnValue;    
}

function areAnswersCorrect(p1){
    var returnValue = true;
    for (let i = 0; i < shapesToDisplay; i++){
		if(answerArray[i] != questionArray[i]){
            alert(`failed on ${i}`);
            alert(`answerArray ${answerArray[i]}`);
            alert(`questionArray ${questionArray[i]}`)
			returnValue = false;			
			//break;
		}
    } 
    return returnValue;
}
function checkAnswer(){
    var userMessage;
    clearDisplayBox();
    // Correct number of answers and all correct
    if (correctNumberOfAnswers(shapesToDisplay) && areAnswersCorrect(shapesToDisplay)){       
        userMessage = `Well done you got ${shapesToDisplay} correct`;
        let streak = document.getElementById('streak');
        streak.innerHTML = shapesToDisplay;
        shapesToDisplay++;
    }else{
        userMessage = "User Input Incorrect";
        // User did not enter correct solution
        // check if this is a new highest score
        if (shapesToDisplay - 1 > highScore){
            userMessage +=`\n\nYou did however set a new\nrecord of ${shapesToDisplay - 1} correct responses`;
			highScore = shapesToDisplay - 1;
			var highScoreCounter = document.getElementById('session-record');
            highScoreCounter.innerHTML = highScore;
		}
        shapesToDisplay = numberOfShapes - 2;
        answerArray.length = 0;
        streak.innerHTML = 0;
    }
    // Only enable start button   
    disableButtons(2);
    // Notify user of outcome of game 
    alert(`${userMessage}`)	
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


//Bug 29/03 @ 11:22 - if answer is wrong, user has to press the submit answer button a second time to input their answer after being told its wrong.
//Always works if lengths are not equal, only breaks if lengths are equal but values aren't
//Also Streak feature is behaving the same as the high score feature, not going to 0 after a fail - fixed as far as I can see