//Variables initialised here

var questionArray = [50];
var numberOfShapes = 5;
var iterationOfShapes = 10;
var shapesToDisplay;
var answerArray = [];
var answersToDate = 0;
var highScore = 0;
var rand;
var temp;

// Selecting the large shapes from the DOM here and making the shapes array
var square = $(".css-shapes-square");
var triangle = $(".css-shapes-triangle");
var circle = $(".css-shapes-circle");
var trapezoid = $(".css-shapes-trapezoid");
var triangleDown = $(".css-shapes-triangle-down");
var shapes = [square, triangle, circle, trapezoid, triangleDown];

// Selecting the small shapes from the DOM here, they are hidden by default. Then placing them in the smallShapes array
var smallSquare = $(".small-square");
var smallTriangle = $(".small-triangle");
var smallCircle = $(".small-circle");
var smallTrapezoid = $(".small-trapezoid");
var smallTriangleDown = $(".small-triangle-down");
var smallShapes = [smallSquare, smallTriangle, smallCircle, smallTrapezoid, smallTriangleDown];

// The setup function is run when the page loads, it creates the array which the questions are selected from, then the answer and submit buttons are disabled


setup();

function setup(){
    populateQuestionArray();
    disableButtons(2);
    shapesToDisplay = numberOfShapes - 2;
// The line above sets the initial amount of shapes to 3 - for testing, set this number to whatever you want
}

// This function is populating the questionArray which has 50 items. It loops through 0-4, 10 times
function populateQuestionArray(){
    for (let i = 0; i < iterationOfShapes; i++) {
            for (let j = 0; j < numberOfShapes; j++) {
                questionArray[(i * numberOfShapes) + j] = j;
            }           
    }
}

// This function is there to iterate through the questionArray and mix the values around
function shuffleArray() {
    for (let i = 0; i < questionArray.length; i++){
        rand = Math.floor(Math.random() * questionArray.length);
        temp = questionArray[i];
        questionArray[i] = questionArray[rand];
        questionArray[rand] = temp;
    }    
}

// Function to call the displaySequence which is used later
function displaySequenceCaller(){
    displaySequence(shapesToDisplay);
        
}



//function to display the shapes to the game user when they press 'start game!'
function displaySequence (shapesToDisplay) {
    clearDisplayBox();
    shuffleArray();
    disableButtons(3);

    //This line ensures the shapes are centered within the game-play-area
    document.getElementById('game-play-area').style.justifyContent = "center";
    
    // The game waits 500 ms before showing the user the first shape, and shows the each shape for one second
    let time1 = 500;
    let time2 = 1500;

    //This code block appends the shape to the shape display box and then clears the game play area for the next shape to be shown
    //The timeout ensures that the shapes are shown one after the other
    for (let i = 0; i < shapesToDisplay; i++){
        setTimeout(function() {shapes[questionArray[i]].clone().appendTo(".shape-display-box"); }, time1);
        setTimeout(function() {$(".shape-display-box").empty(); }, time2);
        time1 += 1500;
        time2 += 1500;    
    }

    // This sets the answer array to 0 and then disables all buttons until the shapes have finished showing
    answerArray.length = 0;
    setTimeout(disableButtons, 1500 * shapesToDisplay);
    
    
}

// These are jquery selectors being used to call the correct functions when the start and submit buttons are clicked
$("#start-button").click(displaySequenceCaller);
$("#submit-button").click(checkAnswer);


// These functions are run when the the answer shapes are clicked
// They create a div, then append that div to the game area, and then add the associated class to that div
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


// This function checks if the length of the answer and question arrays are the same
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


// This function checks if the answer and question arrays have the same values 
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

//This function is called when the submit answer button is clicked
// It clears the small shapes out of the display box, it then checks if no. of answers and are answer correct are true, 

function checkAnswer(){
    var userMessage;
    clearDisplayBox();
    // Correct number of answers and all correct
    if (correctNumberOfAnswers(shapesToDisplay,true) && areAnswersCorrect(shapesToDisplay)){       
        userMessage = `Well done, you got ${shapesToDisplay} correct!`;
        let streak = document.getElementById('streak');
        streak.innerHTML = shapesToDisplay;
        alert(`${userMessage}`)
        shapesToDisplay++;
    }else { 
        userMessage = "Answer Incorrect!";
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
                document.getElementById('game-play-area').style.justifyContent = "left";
                displayAnswerVariance(shapesToDisplay);         
            }
        }
        //This sets the game back to starting with 3 shapes, clears the answerarray and the current streak value 
        shapesToDisplay = numberOfShapes - 2;
        answerArray.length = 0;
        streak.innerHTML = 0;
    }
    // Only enable start button   
    disableButtons(2);
    // Notify user of outcome of game 	
}

// This switch statement was used to disable and enable the buttons in an easier way
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

	var submitButton = document.getElementById('submit-button');
	submitButton.disabled = true;
	var shapeButtons = document.getElementsByClassName('shape');
	for (var i = 0; i < shapeButtons.length; i++){
		shapeButtons[i].style.pointerEvents = 'none';
	}
	var startButton = document.getElementById('start-button');
	startButton.disabled = false;
}

// Enables answer buttons, disables start button
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

// Disables all buttons
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


// Clears the display box, is called when the small shapes are appended to the display box
function clearDisplayBox(){
    $(".shape-display-box").empty();
}

// Called only when the user gets the number of answers correct but the values incorrect
function createRows () {
    //creates a div
    var row1a = document.createElement("div");
    //gives div an id
    row1a.setAttribute('id', 'row1a');
    // adds style rules to the div
    row1a.classList.add("float-left");
    row1a.classList.add("margin-top");
    //appends div to display box
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

// takes the hidden q1 div from the dom and clones it twice
    var smallQ1 = document.getElementById("small-q1");
    var clnQ1 = smallQ1.cloneNode(true);
    var clnQ2 = smallQ1.cloneNode(true);

// appends the q1 to row1a of the display box
    document.getElementById("row1a").appendChild(clnQ1);


// This appends the question that was asked to row1a in the display box
    for(let i = 0; i < counter; i++){
        smallShapes[questionArray[i]].clone().appendTo("#row1a");
    }


    var smallA1 = document.getElementById("small-a1");
    var clnA1 = smallA1.cloneNode(true);
    var clnA2 = smallA1.cloneNode(true);

    document.getElementById("row1b").appendChild(clnA1);


    for(let i = 0; i < counter; i++){
        smallShapes[answerArray[i]].clone().appendTo("#row1b");
    }
    counter = Math.min(p1,20);

    if (p1 > 10){

        document.getElementById("row2a").appendChild(clnQ2);
        for(let i = 10; i < counter; i++){
            smallShapes[questionArray[i]].clone().appendTo("#row2a");
        }

        document.getElementById("row2b").appendChild(clnA2);
        for(let i = 10; i < counter; i++){
            smallShapes[answerArray[i]].clone().appendTo("#row2b");
         }
    }

}
