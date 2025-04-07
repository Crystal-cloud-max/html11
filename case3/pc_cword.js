"use strict";

//initialize variables for the puzzle game
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

//call function after browser loads
window.onload = init;

//Initializes the puzzle, setting up the event handlers and the variable values
function init() {
    allLetters = document.querySelectorAll("table#crossword span");

    //references 1st object of allLetters
    currentLetter = allLetters[0];

    //declare variables setting its value = value of the attribute for currentLetter
    acrossClue = document.getElementById(currentLetter.dataset.clueA);
    downClue = document.getElementById(currentLetter.dataset.clueD);

    //color the crossword's puzzle's 1st letter by calling function
    formatPuzzle(currentLetter);

    //users should be able to select a puzzle cell using their mouse
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.cursor = "pointer";//display hand
        allLetters[i].onmousedown = function (e) {
            formatPuzzle(e.target);
        };
    }
    //call function when key pressed
    document.onkeydown = selectLetter;

    /*users can change the typing direction either by using the
     keyboard or by clicking the pointer on an image located below the puzzle*/
    var typeImage = document.getElementById("directionImg");
    typeImage.style.cursor = "pointer";

    //function runs when clicked
    typeImage.onclick = switchTypeDirection;
    
    //users will be able to briefly view their mistakes
    document.getElementById("showErrors").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            if (allLetters[i].textContent !== allLetters[i].dataset.letter) {
                allLetters[i].style.color = "red";
                //removes hints after 3 seconds
                setTimeout(function () {
                    for (var i = 0; i < allLetters.length; i++) {
                        allLetters[i].style.color = "";
                    }
                }, 3000);
            }
        }
    };
    //show solutions
    document.getElementById("showSolution").onclick = function () {
        for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].textContent = allLetters[i].dataset.letter;
        }
    };
}

//Formats the appearance of the puzzle given the selected puzzle letter
function formatPuzzle(puzzleLetter) {
    currentLetter = puzzleLetter;
    //remove the current colors in the puzzle
    for (var i = 0; i < allLetters.length; i++) {
        allLetters[i].style.backgroundColor = "";
    }
    acrossClue.style.color = "";
    downClue.style.color = "";

    /*determine whether there exists an across clue  for the current letter 
    by testing whether currentLetter.dataset.clueA != undefined*/
    if (currentLetter.dataset.clueA !== undefined) {
        //reference the across clue for current letter
        acrossClue = document.getElementById(currentLetter.dataset.clueA);
        acrossClue.style.color = "blue";
        wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(231,231,255)";  
        }
    }
    if (currentLetter.dataset.clueD !== undefined) {
        //reference the across clue for current letter
        downClue = document.getElementById(currentLetter.dataset.clueD);
        downClue.style.color = "red";
        wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]"); 
        for (var i = 0; i < wordLetters.length; i++) {
            wordLetters[i].style.backgroundColor = "rgb(255,231,231)";
        }
    }
    //indicate the typing direction for the current letter
    if (typeDirection === "right") {
        currentLetter.style.backgroundColor = "rgb(191,191,255)";
    }
    else {
        currentLetter.style.backgroundColor = "rgb(255,191,255)";
    }
}
//Applies keyboard actions to select a letter or modify the puzzle navigation
function selectLetter(e) {
    var leftLetter = document.getElementById(currentLetter.dataset.left);
    var upLetter = document.getElementById(currentLetter.dataset.up);
    var rightLetter = document.getElementById(currentLetter.dataset.right);
    var downLetter = document.getElementById(currentLetter.dataset.down);

    //store code of the key pressed by the user to retrieve key code value
    var userKey = e.keyCode;

    /*determine program response based on value of userKey*/
    //left arrow key
    if (userKey === 37) {
        formatPuzzle(leftLetter);
    }
    //up arrow key
    else if (userKey === 38) {
        formatPuzzle(upLetter);
    }
    //right arrow and tab key
    else if (userKey === 39 || userKey === 9) {
        formatPuzzle(rightLetter);
    }
    //down arrow and enter key
    else if (userKey === 40 || userKey === 13) {
        formatPuzzle(downLetter);
    }
    //backspace or delete key
    else if (userKey === 8 || userKey === 46) {
        currentLetter.textContent = "";
    }
    //spacebar
    else if (userKey === 32) {
        switchTypeDirection();
    }
    //letters a-z
    else if (userKey >= 65 && userKey <= 90) {
        //write character into the cell
        currentLetter.textContent = getChar(userKey);
        //move to next cell in puzzle
        if (typeDirection === "right") {
            formatPuzzle(rightLetter);
        }
        //move down
        else {
            formatPuzzle(downLetter);
        }
    }
    //prevents browser from performing the default action in reponse to keyboard event
    e.preventDefault();
}
//Toggles the typing direction between right and down
function switchTypeDirection() {
    var typeImage = document.getElementById("directionImg");

    //tests the value of the typeDirection global variable
    if (typeDirection === "right") {
        typeDirection = "down";
        typeImage.src = "pc_down.png";
        currentLetter.style.backgroundColor = "rgb(255,191,191)";
    }
    else {
        typeDirection = "right";
        typeImage.src = "pc_right.png";
        currentLetter.style.backgroundColor = "rgb(191,191,255)";
    }
}
/*====================================================*/
//Returns the text character associated with the key code value, keyNum
function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
