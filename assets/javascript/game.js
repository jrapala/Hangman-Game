// Hangman: Heavy Metal Style | By Juliette Rapala
// =====================================================================================


var hangmanApp = {
	
	// Variables 
	// =====================================================================================

	// List of words
	words : ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Gojira", "Tool"],

	// Mystery word to guess
	randomWord : "",											
	letterList : [],											// Array to hold letters of word
	lettersRemaining : 0,										// Number of letters remaining to guess

	// Game Panel
	wins : 0, 													// Number of wins
	gameboard : [],												// Gameboard array
	guessesLeft : 0,											// Number of guesses (equal to number of letters in word)
	lettersGuessed : [],										// Letters guessed

	// Misc variables
	alphabet : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

	// Functions
	// =====================================================================================

	// Start a new game
	initializeGame : function() {

		// Pick mystery word at random
		var randomNumber = Math.floor(Math.random()* this.words.length);		// Find random number between 0 and length of word list
		this.randomWord = this.words[randomNumber].toUpperCase();				// Choose word using the random number as an index, make uppercase

		// Turn word into list of characters
		this.letterList = this.randomWord.split('');							
		
		// Reset game panel
		this.gameboard = [];													// Reset "Current Word:"
		this.lettersRemaining = 0;												// Reset letters remaining
		this.guessesLeft = 0;													// Reset "Guesses Left:"
		this.lettersGuessed = [];												// Reset "Letters Already Guessed:"

		// Build unsolved gameboard	
		for (i in this.letterList) {
			if (this.letterList[i] !== " ") {	
				this.gameboard.push("_");										// Replace letter with underscore
				this.guessesLeft++;												// Guesses equal number of letters in word
				this.lettersRemaining++;										// Total number of letters in word
			} else {
				this.gameboard.push("<br>");									// Replace space with break instead of underscore
			}
		}

		// Reset screen
		document.getElementById("video").innerHTML = "";									// Hide video (if present)
		document.getElementById("wins").innerHTML = this.wins;								// Display win counter
		document.getElementById("gameboard").innerHTML = this.gameboard.join(" ");			// Display gameboard
		document.getElementById("guessesLeft").innerHTML = this.guessesLeft;				// Display guesses
	},

	// Check if guessed letter is valid
	check : function(letter) {
		document.getElementById("alert").innerHTML = "";										// Clear alert message
		if (this.alphabet.includes(letter)) {													// Check if guess is a letter in the alphabet
			if (this.lettersGuessed.indexOf(letter) === -1) {									// If letter not previously guess..
					this.lettersGuessed.push(letter);											// Add letter to "Letters Guessed"
					document.getElementById("lettersGuessed").innerHTML = this.lettersGuessed.join(" ");
					this.guess(letter);															// Check if guessed letter is in word
			} else {
					document.getElementById("alert").innerHTML = "Letter already guessed. Please try a different letter.";		// Alert if letter already guessed
			}
		} else {
				document.getElementById("alert").innerHTML = "Please enter a letter.";			// Alert if user did not guess a letter.
				this.letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();			// Allow user to try again.
		}	
	},

	// Check if guessed letter is in the mystery word.
	guess : function(letter) {
		// Reset
		var letterInWord = null;

		// Check if guessed letter is in the mystery word.
		for (var j = 0; j<this.letterList.length; j++) {						
			if (this.letterList[j] === letter) {
				letterInWord = true;
			}
		}

		// If the guessed letter is in the mystery word, add letter to gameboard and decrease the number of letters remaining.
		if (letterInWord) {
			for (var k = 0; k<this.letterList.length; k++) {						
				if (this.letterList[k] === letter) {
					this.gameboard[k] = letter;									
					document.getElementById("gameboard").innerHTML = this.gameboard.join(" ");
					this.lettersRemaining--;									
				}
			}
		// If guessed letter is not in the mystery word, lose a guess.
		} else {
			// If/else statement prevents guess counter from going below zero
			if (this.guessesLeft > 0) {
				this.guessesLeft--;													
			} else {
				this.guessesLeft = 0;																
			}
			document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
		}

		// If all letters in the mystery word are guessed, add a win. Keep outside of checkWin() loop to prevent multiple win increments.
		if (this.lettersRemaining === 0) {													
			this.wins++;	
			// Add all unguessed letters to prevent multiple win increments.
			for (var i = 0; i<this.alphabet.length; i++) {	
				if (!this.lettersGuessed.includes(this.alphabet[i])) {
      			this.lettersGuessed.push(this.alphabet[i]);
				}
			}	
		}
	},

	// Check if win or loss occurs after a guess
	checkWin : function() {
		// If no more letters left to guess, you win!
		if (this.lettersRemaining === 0) {																			
			document.getElementById("wins").innerHTML = this.wins;					// Update win count
			document.getElementById("lettersGuessed").innerHTML = "";				// Hides letters guessed after a win
			var giftTitle = this.randomWord + " - " + titles[this.randomWord];		// Alert with "You win!" and artist & song title.
			document.getElementById("alert").innerHTML = "You win!<br>" + giftTitle + "<br>Press &lt;enter&gt; to start next game";													
			// Play video of song
			document.getElementById("video").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videos[this.randomWord] + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';	// Grab video embed text from videos.js
			this.win = true;
			var self = this;
			document.body.onkeyup = function(e){
	    		if (e.keyCode == 13) {												// Hit enter key to begin next round
	       			self.initializeGame();											// Restart game
				} 
			}
		} else if (this.guessesLeft === 0) {	
			var lose = "Sorry! You lose!<br>The word was: " + this.randomWord;
			document.getElementById("alert").innerHTML = lose;
			document.getElementById("lettersGuessed").innerHTML = "";				// Hides letters guessed after a win
			this.initializeGame();	
		}
	},

	// Play Game
	play : function() {
		var self = this;
		document.onkeyup = function(event) {	
			var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();	// Take letter from keystroke, make uppercase
			self.check(letterGuessed);	
			self.checkWin();
		}												
	}
}


// Gameplay
// =====================================================================================

hangmanApp.initializeGame();
hangmanApp.play();



