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
    disableButtons(1);

    /*setTimeout(function() {questionArray[0].clone().appendTo(".shape-display-box"); }, 500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 1500);
    setTimeout(function() {questionArray[1].clone().appendTo(".shape-display-box"); }, 2000);
    setTimeout(function() {$(".shape-display-box").empty(); }, 3000);
    setTimeout(function() {questionArray[2].clone().appendTo(".shape-display-box"); }, 3500);
    setTimeout(function() {$(".shape-display-box").empty(); }, 4500);
*/
}

//$("#start-button").click(displaySequence);
//$("#submit-button").click(checkAnswer);


    square.click(function() {
        answerArray.push(0);
    });

    triangle.click(function() {
        answerArray.push(1);
    });

    circle.click(function() {
        answerArray.push(2);
    });

    trapezoid.click(function() {
        answerArray.push(3);
    });

    bookmark.click(function() {
        answerArray.push(4);
    });

function checkAnswer(shapesToDisplay){
    let returnValue = true;
	if (answerArray.length != shapesToDisplay){
        returnValue = false;	
        alert("lengths not equal");		
	}
	if (returnValue == true){
        
		for (let i = 0; i < shapesToDisplay; i++){
			if(answerArray[i] != questionArray[i]){
                alert(`failed on ${i}`);
                alert(`answerArray ${answerArray[i]}`);
                alert(`questionArray ${questionArray[i]}`)
				returnValue = false;			
				//break;
			}
		}        
	}
	if (returnValue == true) {
		disableButtons(2);
        alert(`well done you got ${shapesToDisplay} correct`)
        shapesToDisplay++;
        alert(`Shapes to display now ${shapesToDisplay} `)
	} else {
		if (shapesToDisplay - 1 > highScore){
			highScore = shapesToDisplay - 1;
			var highScoreCounter = document.getElementById('high-score');
			highScoreCounter.innerHTML = highScore;
		}
		//Notify the player that he failed and how many he got right
        // also tell him if it is a new record
        shapesToDisplay = numberOfShapes - 2;
        disableButtons(2);
        alert("unlucky");
        answerArray.length = 0;
    }
    alert(`${shapesToDisplay}`)
	return returnValue;
}

function correctAnswerCounter() {
	
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