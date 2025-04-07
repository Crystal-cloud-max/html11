"use strict";

window.onload = init;
//References the TD cells within the Hanjie table grid.
var puzzleCells;
//Stores the current background color of the puzzle cells during the mouseover event.
var cellBackground;

/*  Run when the web page is loaded; displays puzzle 1
    and loads the event handlers for the web page buttons. 
 */
function init() {
    document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
    document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

    var puzzleButtons = document.getElementsByClassName("puzzles");
    for (var i = 0; i < puzzleButtons.length; i++) {
        puzzleButtons[i].onclick = swapPuzzle;
    }
    setupPuzzle();
    document.addEventListener("mouseup", endBackground);
    //add event listener to the Show Solution button
    document.getElementById("solve").addEventListener("click", function () {
        //remove the inline backgroundColor style from each cell
        for (var i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "";
        }
    });
}
function swapPuzzle(e) {
    if (confirm("You will lose all of your work on the puzzle Continue?")) {
        var puzzleID = e.target.id;//targets the input button id attribute
        var puzzleTitle = e.target.value;
        document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

        switch (puzzleID) {
            case "puzzle1":
                document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
                break;
            case "puzzle2":
                document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
                break;
            case "puzzle3":
                document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
                break;
        }
            setupPuzzle();
    }
}
//Sets up a new puzzle, adding the event handlers for every puzzle cell.      
function setupPuzzle() {
    puzzleCells = document.querySelectorAll("table#hanjieGrid td");
    for (var i = 0; i < puzzleCells.length; i++) {
        puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";//gold
        puzzleCells[i].onmousedown = setBackground;
        puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
    }
    //check the puzzle solution
    document.getElementById("hanjieGrid").addEventListener("mouseup", function () {
        var solved = true;
        for (var i = 0; i < puzzleCells.length; i++) {
            if ((puzzleCells[i].className === "filled" &&
                puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)") ||
                (puzzleCells[i].className === "empty" &&
                    puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")) {
                solved = false;
                break;
            }
        }
        if (solved) alert("You Solved the Puzzle");

    });
    //create object collections of the filled and empty cells
    var filled = document.querySelectorAll("table#hanjieGrid td.filled");
    var empty = document.querySelectorAll("table#hanjieGrid td.empty");
    //create an event listener to highlight incorrect cells
    document.getElementById("peek").addEventListener("click", function () {
        //display incorrect white cells in pink
        for (var i = 0; i < filled.length; i++) {
            if (filled[i].style.backgroundColor === "rgb(255, 255, 255)") {
                filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            }
        }
        //display incorrect gray cells in red
        for (var i = 0; i < empty.length; i++) {
            if (empty[i].style.backgroundColor === "rgb(101, 101, 101)") {
                empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }
        }
        //remove the hints after 3 second
        setTimeout(
            function () {
                //change pink cells to white and red cells to gray
                for (var i = 0; i < puzzleCells.length; i++) {
                    if (puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)") {
                        puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
                    }
                    if (puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
                        puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
                    }
                }
            }, 3000);
    });
}
//Sets the background color of the puzzle cells during the mousedown event
function setBackground(e) {
    var cursorType;
    //set the background based on the keyboard key
    if (e.shiftKey) {
        cellBackground = "rgb(233, 207, 29)";
        cursorType = "url(jpf_eraser.png), cell";
    }
    else if (e.altKey) {
        cellBackground = "rgb(255, 255, 255)";
        cursorType = "url(jpf_cross.png), crosshair";
    }
    else {
        cellBackground = "rgb(101, 101, 101)";
        cursorType = "url(jpf_pencil.png), pointer";
    }
    e.target.style.backgroundColor = cellBackground;
    //create an event listener for every puzzle cell
    for (var i = 0; i < puzzleCells.length; i++) {
        puzzleCells[i].addEventListener("mouseenter", extendBackground);
        puzzleCells[i].style.cursor = cursorType;
    }
    //avoid from selecting table text
    e.preventDefault();
}
//Extends the background color of the original puzzle cell during the mouseenter event.
function extendBackground(e) {
    e.target.style.backgroundColor = cellBackground;
}
//Ends the action of extending the cell backgrounds in response to the mouseup event.
function endBackground() {
    for (var i = 0; i < puzzleCells.length; i++) {
        puzzleCells[i].removeEventListener("mouseenter", extendBackground);
        puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
    }
}
         
/*  Returns a text string of the HTML code to
    display a hanjie Web table based on the contents of
    multi-dimensional array, puzzle.
*/
function drawPuzzle(hint, rating, puzzle) {
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */
   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */
   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }
   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */
   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }
   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }
      htmlString += "</tr>";
   }
   htmlString += "</table>";
   return htmlString;
}