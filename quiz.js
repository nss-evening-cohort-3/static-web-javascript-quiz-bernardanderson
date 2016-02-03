
// Makes global references to the input fields on the webpage
var heightTextField = document.getElementById("tree-height");
var charTextField = document.getElementById("tree-char");
var button = document.getElementById("grow-tree");

//
// Checks if any key pressed is the "Enter" key. The "Enter" key 
// has a .keyCode numeric value of 13. Also, this checks to see if the focused 
// element is either of the two input boxes based on their IDs. If both are true,
// then the input fields are checked for correct inputs via the checkInputs func.
//
function determineKeyPressed(keyPress) {

  var focusedElement = document.activeElement.id; //Gets the ID of the focused/active element

  if (keyPress.keyCode === 13 && (focusedElement === "tree-char" || focusedElement === "tree-height")) {
    
    checkInputs();
  
  }
}

//
// This checks the validity of the characters entered in the input fields. 
// If valid, it calls the function to build the tree.  
// .validity.valid compares to the the input type. If the "type" has no restrictions, 
// the "pattern" attribute is used for validation.
// https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
// 
function checkInputs() {
  
  if (heightTextField.validity.valid && charTextField.validity.valid) {

    drawTree();

  } else {

    alert("Both fields must contain the correct input!");

  }
}

//
// Function that draws the tree using the specified character and height from 
// input fields storing them in the tree object.
//
function drawTree() {

  // Initialize the tree object and keys
  var tree = {
    height: heightTextField.value,
    buildCharacter: charTextField.value
  };

  var numberOfChars; // How many non-space chars per line
  var numberOfSideSpaces; // How many spaces left and right of chars
  var lineCharCounter = 0; // Counter to increase the number of chars per line
  var treeLineText = ""; // String to hold the line of chars
  var maxTreeWidth = 2 * tree.height - 1; // What is the max tree width?
  
  console.clear(); // Clears the console so it looks nice for each tree displayed

  for (var currentHeight = 1; currentHeight <= tree.height; currentHeight++) {

    //Determines the number of build chars on that line
    numberOfChars = currentHeight + lineCharCounter;

    //Determines the number of spaces on either side of the build chars for that line
    numberOfSideSpaces = (maxTreeWidth - numberOfChars)/2;
    
    treeLineText += " ".repeat(numberOfSideSpaces); //Repeats the space n times on the left
    treeLineText += tree.buildCharacter.repeat(numberOfChars); //Repeats the char n times
    treeLineText += " ".repeat(numberOfSideSpaces); //Repeats the space n times on the right

    console.log(treeLineText);
    treeLineText = "";  //Clears for the treeLineText for next line's input
    lineCharCounter++;

  }
}

// Assigns a function to be executed when the "button" is clicked
button.addEventListener("click", checkInputs);

// Adds a listener to detect if ANY key is pressed.  "keydown" contains
// an object with a lot of info about the key that was pressed.
document.addEventListener("keydown", determineKeyPressed);


/// General Solving Math
//
// The entered height dictates the width of the tree.
// 1H:1W, 2H:3W, 3H:5W, 4H:7W so (2 * height - 1) = width

// The number of chars on each line: height + counter = chars (when counter starts at 0)
// The number of spaces on each either side will be (width - chars)/2
