// To Do:
// 
// If letter guessed multiple times, only display once, only take off one guess
// If multiple letters in word, display only one letter in "Letters Already Guessed"
// 
// 
// Guessing Correct --> Display "You win!" & Display Artist and Song Title on top --> Play YouTube Video
// Run out of turns --> Display "Game Over!""


// Global Variables 
// =====================================================================================

// List of words
var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Death", "Gojira", "Tool"];
var listLength = words.length;   								// Find length of word list
var randomWord = "";											// Word to guess (can includes spaces)
var letterList = [];											// Word split into array of characters
var guessesLeft = 0;											// Number of guesses (equal to number of letters in word)
var lettersRemaining = 0;										// Number of letters remaining to guess
var gameboard = [];												// Gameboard array
var wins = 0;													// Number of wins
var lettersGuessed = [];										// Letters guessed

// Functions
// =====================================================================================

// Start a new game
function initializeGame() {
	// Clear console
	console.clear();

	// Pick random word
	var randomNumber = Math.floor(Math.random()* listLength);	// Find random number between 0 and length of word list
	randomWord = words[randomNumber].toUpperCase();				// Choose word using the random number as an index, make uppercase
	randomWord = "TOOL"	;										// Debug
	console.log("Random word: " + randomWord);					// Debug
	lettersGuessed = [];										// Reset "Letters Already Guessed:"
	guessesLeft = 0;											// Reset "Guesses Left:"
	gameboard = [];												// Reset "Current Word:"
	guessesLeft = 0;											// Reset guesses left
	lettersRemaining = 0;										// Reset letters remaining

	// Turn word into list of characters
	letterList = randomWord.split('');							// Turn word into list of letters

	// Build unsolved gameboard	
	for (i in letterList) {
		if (letterList[i] !== " ") {	
			gameboard.push("_");								// Replace letter with underscore
			guessesLeft++;
			lettersRemaining++;
			console.log(gameboard);
		} else {
			gameboard.push(" ");								// Replace space with space instead of underscore
		}
	}

	document.getElementById("wins").innerHTML = wins;
	document.getElementById("gameboard").innerHTML = gameboard.join(" ");
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// Check if guessed letter is valid
function check(letter) {
	document.getElementById("alert").innerHTML = "";			// Clear alert message
	if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter)) {		// Check if a letter in the alphabet
		if (lettersGuessed.indexOf(letter) === -1) {			
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
				guess(letter);
		} else {
				document.getElementById("alert").innerHTML = "Letter already guessed. Please try a different letter.";		// Alert
		}
	} else {
			document.getElementById("alert").innerHTML = "Please enter a letter.";		// Alert
			letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();		// Guess not a letter. Try again.
	}	
}

// Check guessed letter
function guess(letter) {

	var letterInWord = null;


	for (var j = 0; j<letterList.length; j++) {					// If letter in word..
		if (letterList[j] === letter) {
			letterInWord = true;
		}
	}

	if (letterInWord) {
		for (var k = 0; k<letterList.length; k++) {			// If letter in word..
			if (letterList[k] === letter) {
				gameboard[k] = letter;						// Replace underscore with the letter
				console.log(gameboard);
				document.getElementById("gameboard").innerHTML = gameboard.join(" ");
				lettersRemaining--;							// Decrease number of letters remaining
	
			}
		}
	} else {
		console.log("Letter not in word");
		guessesLeft--;										// Decrease guesses if letter not in word
		console.log("Guesses left: " + guessesLeft);
		document.getElementById("guessesLeft").innerHTML = guessesLeft;

	}



}


// Check for win or lose
function checkWin() {
	if (lettersRemaining === 0) {								// If no more letters left to guess, you win!
		document.getElementById("alert").innerHTML = "You win!";
		wins++;
		document.getElementById("wins").innerHTML = wins;
		initializeGame();
	} else if (guessesLeft === 0) {								// If no more guesses left, you lose!
		var lose = "Sorry! You lose!<br>The word was: " + randomWord;
		document.getElementById("alert").innerHTML = lose;
		initializeGame();
	}
}

// Gameplay
// =====================================================================================

initializeGame();

document.onkeyup = function(event) {	
		var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();	// Take letter from keystroke, make uppercase
		check(letterGuessed);													
		checkWin();
	}





