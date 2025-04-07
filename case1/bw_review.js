"use strict";

//call function after browser loads object
window.onload = init;

//Initializes the contents of the web page and sets up the event handlers.
function init() {
    var stars = document.querySelectorAll("span#stars img");

    //loop for hand to occur over each star image then light stars when clicked
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.cursor = "pointer";
        stars[i].addEventListener("mouseenter", lightStars);
    }
    ////display number of stars after clicked
    document.getElementById("comment").addEventListener("keyup", updateCount);
}
//Function that colors the stars representing the user rating for the book.
function lightStars(e){
    var starNumber = e.target.alt;//target alt attribute for each img
    var stars = document.querySelectorAll("span#stars img");

    for (var i = 0; i < stars.length; i++) {
        //light every star in collection
        stars[i].src = "bw_star2.png";//gold star
    }

    //loops through the collection of stars collection 
    for (var i = stars; i < stars.length; i++) {
        stars[i].src = "bw_star.png";
    }
    //display 5 stars for example
    document.getElementById("rating").value = starNumber + " stars";

    //when mouse pointer moves off a star image, the lit stars should be unlit
    e.target.addEventListener("mouseleave", turnOffStars);//call function

    /*if user clicks the star image, the selected rating should be set,
     * which means moving the mouse pointer off the star should not remove the rating
     */
    e.target.addEventListener("click", function () {
        e.target.removeEventListener("mouseleave", turnOffStars);
    });
}
//Function that restores the stars to empty colors, removing the user rating for the book.
function turnOffStars(e) {
    var stars = document.querySelectorAll("span#stars img");
    //loops through all images in the stars collection and change src attribute to new file
    for (var i = 0; i < stars.length; i++) {
        stars[i].src = "bw_star.png";//white star
    }
    //erase value for number of stars
    document.getElementById("rating").value = "";
}
//Updates the count of characters in the wordCountBox element.
function updateCount() {
    var commentText = document.getElementById("comment").value;

    //calculate number of characters in commentText
    var charCount = countCharacters(commentText);//call function

    //change value stored in wordCount input box  to text string charCount/1000
    var wordCountBox = document.getElementById("wordCount");
    wordCountBox.value = charCount + "/1000";

    //change styles of wordCount input after typing over 1000 characters in textarea for comments
    if (charCount > 1000) {
        wordCountBox.style.color = "white";
        wordCountBox.style.backgroundColor = "red";
    }
    else {
        wordCountBox.style.color = "black";
        wordCountBox.style.backgroundColor = "white";
    }
}

//Returns the number of a non-whitespace characters within textStr
function countCharacters(textStr) {
   var commentregx = /\s/g;//regular expression
   var chars = textStr.replace(commentregx, "");//replace for empty string
   return chars.length;//number of characters
}   