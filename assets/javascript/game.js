// Hangman: Heavy Metal Style | By Juliette Rapala
// =====================================================================================

// Global Variables 
// =====================================================================================

	// List of words
	var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Gojira", "Tool"];

	// Mystery word to guess
	var randomWord = "";											
	var letterList = [];											// Array to hold letters of word
	var lettersRemaining = 0;										// Number of letters remaining to guess
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	// Game Panel
	var wins = 0;													// Number of wins
	var gameboard = [];												// Gameboard array
	var guessesLeft = 0;											// Number of guesses (equal to number of letters in word)
	var lettersGuessed = [];										// Letters guessed



// Functions
// =====================================================================================

	// Start a new game
	function initializeGame() {

		// Pick mystery word at random
		var randomNumber = Math.floor(Math.random()* words.length);	// Find random number between 0 and length of word list
		randomWord = words[randomNumber].toUpperCase();				// Choose word using the random number as an index, make uppercase

		// Turn word into list of characters
		letterList = randomWord.split('');							
		
		// Reset game panel
		lettersGuessed = [];										// Reset "Letters Already Guessed:"
		guessesLeft = 0;											// Reset "Guesses Left:"
		gameboard = [];												// Reset "Current Word:"
		guessesLeft = 0;											// Reset guesses left
		lettersRemaining = 0;										// Reset letters remaining

		// Build unsolved gameboard	
		for (i in letterList) {
			if (letterList[i] !== " ") {	
				gameboard.push("_");								// Replace letter with underscore
				guessesLeft++;										// Guesses equal number of letters in word
				lettersRemaining++;									// Total number of letters in word
			} else {
				gameboard.push("<br>");								// Replace space with break instead of underscore
			}
		}

		// Reset screen
		document.getElementById("video").innerHTML = "";							// Hide video (if present)
		document.getElementById("wins").innerHTML = wins;							// Display win counter
		document.getElementById("gameboard").innerHTML = gameboard.join(" ");		// Display gameboard
		document.getElementById("guessesLeft").innerHTML = guessesLeft;				// Display guesses
	}

	// Check if guessed letter is valid
	function check(letter) {
		document.getElementById("alert").innerHTML = "";							// Clear alert message
		if (alphabet.includes(letter)) {						// Check if guess is a letter in the alphabet
			if (lettersGuessed.indexOf(letter) === -1) {							// If letter not previously guess..
					lettersGuessed.push(letter);									// Add letter to "Letters Guessed"
					document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
					guess(letter);													// Check if guessed letter is in word
			} else {
					document.getElementById("alert").innerHTML = "Letter already guessed. Please try a different letter.";		// Alert if letter already guessed
			}
		} else {
				document.getElementById("alert").innerHTML = "Please enter a letter.";		// Alert if user did not guess a letter.
				letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();			// Allow user to try again.
		}	
	}

	// Check if guessed letter is in the mystery word.
	function guess(letter) {
		// Reset
		var letterInWord = null;

		// Check if guessed letter is in the mystery word.
		for (var j = 0; j<letterList.length; j++) {						
			if (letterList[j] === letter) {
				letterInWord = true;
			}
		}

		// If the guessed letter is in the mystery word, add letter to gameboard and decrease the number of letters remaining.
		if (letterInWord) {
			for (var k = 0; k<letterList.length; k++) {						
				if (letterList[k] === letter) {
					gameboard[k] = letter;									
					document.getElementById("gameboard").innerHTML = gameboard.join(" ");
					lettersRemaining--;									
				}
			}

		// If guessed letter is not in the mystery word, lose a guess.
		} else {
			// If/else statement prevents guess counter from going below zero
			if (guessesLeft > 0) {
				guessesLeft--;													
			} else {
				guessesLeft = 0;																
			}
			document.getElementById("guessesLeft").innerHTML = guessesLeft;
		}

		// If all letters in the mystery word are guessed, add a win.
		if (lettersRemaining === 0) {													
			wins++;	
			// Needed to fix bug of wins incrementing if more letters guessed.
			for (var i = 0; i<alphabet.length; i++) {	
				if (!lettersGuessed.includes(alphabet[i])) {
      			lettersGuessed.push(alphabet[i]);
				}
			}	
		}
	}

	// Check if win or loss occurs after a guess
	function checkWin() {
		// If no more letters left to guess, you win!
		if (lettersRemaining === 0) {																			
			document.getElementById("wins").innerHTML = wins;				// Update wins counts
			document.getElementById("lettersGuessed").innerHTML = "";		// Hides letters guessed after a win
			var giftTitle = randomWord + " - " + titles[randomWord];		// Alert with "You win!" and artist & song title.
			document.getElementById("alert").innerHTML = "You win!<br>" + giftTitle + "<br>Press &lt;enter&gt; to start next game";													
			// Play video of song
			document.getElementById("video").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videos[randomWord] + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';	// Grab video embed text from videos.js
			win = true;
			document.body.onkeyup = function(e){
	    		if (e.keyCode == 13) {										// Hit enter key to begin next round
	       			initializeGame();										// Restart game
				} 
			}
		} else if (guessesLeft === 0) {	
			var lose = "Sorry! You lose!<br>The word was: " + randomWord;
			document.getElementById("alert").innerHTML = lose;
			document.getElementById("lettersGuessed").innerHTML = "";		// Hides letters guessed after a win
			initializeGame();	
		}
	}

	// Play Game
	function play() {
		document.onkeyup = function(event) {	
			var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();	// Take letter from keystroke, make uppercase
			check(letterGuessed);	
			checkWin();
		}												
	}


// Gameplay
// =====================================================================================

	initializeGame();
	play();



