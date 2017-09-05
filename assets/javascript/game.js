// To Do:
// 
// Add side image
// Add correct winning artist - song text
// Generate list of YouTube Videos
// Add sound effect for correct guess
// Add sound effect for incorrect guess
// Stop additional wins after won game
// Test if videos work



// Global Variables 
// =====================================================================================

// List of words
var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Gojira", "Tool"];
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
	document.getElementById("video").innerHTML = "";			// Hide video

	// Pick random word
	var randomNumber = Math.floor(Math.random()* listLength);	// Find random number between 0 and length of word list
	randomWord = words[randomNumber].toUpperCase();				// Choose word using the random number as an index, make uppercase
	//randomWord = "TOOL"	;										// Debug
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
			gameboard.push("<br>");								// Replace space with space instead of underscore
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

// Check if guessed letter in word
function guess(letter) {

	var letterInWord = null;


	for (var j = 0; j<letterList.length; j++) {				// Is letter in word?
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
		console.log("Letter not in word");					// If letter not in word..
		guessesLeft--;										// Lose a guess
		console.log("Guesses left: " + guessesLeft);
		document.getElementById("guessesLeft").innerHTML = guessesLeft;

	}



}


// Check for win or lose
function checkWin() {
	if (lettersRemaining === 0) {								// If no more letters left to guess, you win!
		var giftTitle = randomWord + " - " + titles[randomWord];
		document.getElementById("alert").innerHTML = "You win!<br>" + giftTitle + "<br>Press &lt;space&gt; to start next game";
		wins++;
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("video").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videos[randomWord] + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';	// Grab video embed text from videos.js
		document.body.onkeyup = function(e){
    		if(e.keyCode == 32){								// Hit space bar to begin next round
        		initializeGame();
    		} else {
    			e.preventDefault();
    		}
		}

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






