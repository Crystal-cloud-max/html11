"use strict";

//call function after browser loads
window.onload = init;

//sets up the event handlers for the page
function init() {
    var calcButtons = document.getElementsByClassName("calcButton");
    //loop through calculator buttons for input to the calculator screen when key is clicked
    for (var i = 0; i < calcButtons.length; i++) {
        calcButtons[i].onclick = buttonClick;//call function
    }
    //runs function in response to keydown event when clicked on calculator 
    document.getElementById("calcWindow").onkeydown = calcKeys;
}

//functions to the buttons clicked within the calculator
function buttonClick(e) {
    var calcValue = document.getElementById("calcWindow").value;
    var calcDecimal = document.getElementById("decimals").value;

    //targets each input value attribute for calculator button
    var buttonValue = e.target.value;

    switch (buttonValue) {
        case "del":
            calcValue = "";//erase
            break;
        case "bksp":
            calcValue = eraseChar(calcValue);//erase recent character
            break;
        //calculate value of current expression to next line
        case "enter":
            calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
            break;
        //copy last equation in calculate window
        case "prev":
            calcValue += lastEq(calcValue);
            break;
        //append calculator button character to character window
        default:
            calcValue += buttonValue;
            break;
    }
    //display value to the calculator window screen
    document.getElementById("calcWindow").value = calcValue;

    //puts cursor focus within calculator window screen
    document.getElementById("calcWindow").focus();
}

//Adds functions to key pressed within the calculator window 
function calcKeys(e) {
    var calcValue = document.getElementById("calcWindow").value;
    var calcDecimal = document.getElementById("decimals").value;

    switch (e.key) {//event targets key attribute
        case "Delete":
            calcValue = "";//erase
            break;
        case "Enter":
            calcValue += " = " + evalEq(calcValue, calcDecimal);
            break;
        case "ArrowUp":
            calcValue += lastEq(calcWindow.value);
            e.preventDefault();
            break;
    }
    //display value to the calculator window screen
    document.getElementById("calcWindow").value = calcValue;
}

//Erases the last character from the text string
function eraseChar(textStr) {
    //from 1st character to 2nd to last character
   return textStr.substr(0, textStr.length - 1);
}

//Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter
function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);//evaluate last line
   return eqValue.toFixed(decimals);
}

//Returns the previous expression from the list of expressions in the textStr parameter
function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length - 2];//2nd to last line
   //from 1st character to last expression for index of = sign no whitespaces
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}