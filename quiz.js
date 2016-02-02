
// Makes references to the input fields from the DOM
var heightTextField = document.getElementById("tree-height");
var charTextField = document.getElementById("tree-char");
var button = document.getElementById("grow-tree");

//
// Checks if any key pressed is the "enter" key. The "enter" key 
// has a .keyCode numeric value of 13.  If "enter" isn't pressed then nothing happens.
// Also, this checks to see if the focused element is either of the two input boxes
// based on their IDs.  If neither input ID has focus, nothing happens.
//
function determinedKeyPressed(keyPress) {

  var focusedElement = document.activeElement.id; //Gets the ID of the focused/active element

  // This statement checks if "Enter" (number 13) is pressed AND "tree-char" OR "tree-height" has focus
  if (keyPress.keyCode === 13 && (focusedElement === "tree-char" || focusedElement === "tree-height")) {
    
    checkInputs();
  
  }
}

//
// Function that check the validity of the characters entered in the input fields. 
// If valid, it calls the function to build the tree.  .validity.valid compares to the 
// the input type. If the type has no restrictions the "pattern" attribute is validated
// https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
// 
function checkInputs() {
  
// Initialize the tree object
  var tree = {
    height: 0,
    buildCharacter: ""
  };

// Check the validity of the input fields, if true then get the height/buildChar and 
// call the draw fuction.
  if (heightTextField.validity.valid && charTextField.validity.valid) {

    tree.height = heightTextField.value;
    tree.buildCharacter = charTextField.value;
    drawTree(tree.height, tree.buildCharacter);

  } else {

    alert("Both fields must contain the correct input!");

  }
}

//
// Function that draws the tree using the specified character
// and height. It receives those from where it's called.
//
function drawTree(height, buildCharacter) {

  var numberOfChars; // How many non-space chars per line
  var numberOfSideSpaces; // How many spaces left and right of chars
  var counter = 0; // Counter to increase the number of chars per line
  var treeLineText = ""; // String to hold the line of chars
  var maxTreeWidth = 2 * height - 1; // What is the max tree width?
  
  console.clear(); // Clears the console so it looks nice for each tree displayed

  for (var currentHeight = 1; currentHeight <= height; currentHeight++) {

    //Determines the number of build chars on that line
    numberOfChars = currentHeight + counter;

    //Determines the number of spaces on either side of the build chars for that line
    numberOfSideSpaces = (maxTreeWidth - numberOfChars)/2;
    
    treeLineText += " ".repeat(numberOfSideSpaces); //Repeats the space n times
    treeLineText += buildCharacter.repeat(numberOfChars); //Repeats the char n times
    treeLineText += " ".repeat(numberOfSideSpaces); //Repeats the space n times

    console.log(treeLineText);
    treeLineText = "";  //Clears for the treeLineText for next line's input
    counter++;

  }
}

// Assigns a function to be executed when the "button" is clicked
button.addEventListener("click", checkInputs);

// Adds a listener to detect if ANY key is pressed.  "keydown" contains
// an object with a lot of info about the key that was pressed.
// When looking for a specific key, look at the .keyCode . 
// It has a numeric value specfic to each key on the keyboard. 
document.addEventListener("keydown", determinedKeyPressed);


//
/// General Solving Math
//
// The entered height dictates the width of the tree.
// 1H:1W, 2H:3W, 3H:5W, 4H:7W so (2 * height - 1) = width

// The number of chars on each line: height + counter = chars (when counter starts at 0)
// The number of spaces on each either side will be (width - chars)/2
