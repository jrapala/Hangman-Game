// Document:
// Logo on top
// "Press any key to get started!"
// "Wins"
// "Current Word"
// "_ _ _ _ _ _"
// "Number of Guesses Remaining"
// "#"
// "Letters Already Guessed"
// "A, E, S"
// Listen for letters that are typed
// If letter in word, display letter, display guessed letters
// If letter not in word, lose a guess, display guessed letters
// Guessing Correct --> Display Artist and Song Title --> Change Picture --> Play Song
// Run out of turns --> Game Over


// Global Variables 
// ===========================================

// List of words
var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Death", "Gojira", "Tool"];
var randomWord = "";											// Word to guess (can includes spaces)
var letterList = [];											// Word split into array of characters
var guessesLeft = 0;											// Number of guess (equal to number of letters in word)
var lettersRemaining = 0;										// Number of letters remaining to guess
var gameboard = [];												// Gameboard array

// Functions
// ===========================================

// Start a new game
function initializeGame() {
	// Clear console
	console.clear();

	// Pick random word
	var listLength = words.length;   							// Find length of word list
	var randomNumber = Math.floor(Math.random()* listLength);	// Find random number between 0 and length of word list
	randomWord = words[randomNumber].toUpperCase();				// Choose word using the random number as an index
	randomWord = "TOOL"	;										// Debug
	console.log("Random word: " + randomWord);					// Debug

	// Turn word into list of characters
	letterList = randomWord.split('');							// Turn word into list of letters

	// Build unsolved gameboard	
	for (i in letterList) {
		if (letterList[i] !== " ") {	
			gameboard.push("_");								// Replace letter with underscore + space
			guessesLeft++;
			lettersRemaining++;
		} else {
			gameboard.push(" ");								// Replace space with space instead of underscore
		}
	}
}

// Process guessed letter
function guess(letter) {
	if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter)) {		// Make sure guess is in the alphabet
		if (letterList.indexOf(letter) === -1) {			
			console.log("Letter not in word");
			guessesLeft--;										// Decrease guesses if letter not in word
			console.log("Guess left: " + guessesLeft);
		} else {
			for (var i = 0; i<letterList.length; i++) {			// If letter in word..
				if (letterList[i] === letter) {
					gameboard[i] = letter;						// Replace underscore with the letter
					console.log(gameboard);
					lettersRemaining--;							// Decrease number of letters remaining
				}
			}
		}
	}
}

// Check for win or lose
function checkWin() {
	if (lettersRemaining === 0) {								// If no more letters left to guess, you win!
		console.log("You win!");
	} else if (guessesLeft === 0) {								// If no more guesses left, you lose!
		console.log("You lose!");
		console.log("The word was: " + randomWord);				// Display answer
	}
}

// Gameplay
// ===========================================
initializeGame();

document.onkeyup = function(event) {
		var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();
		guess(letterGuessed);
		checkWin();
	}





