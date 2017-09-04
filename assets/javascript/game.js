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

// List of words
var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Death", "Gojira", "Tool"];

// Pick random word
var listLength = words.length;   							// Find length of word list
var randomNumber = Math.floor(Math.random()* listLength);	// Find random number between 0 and length of word list
var randomWord = words[randomNumber].toUpperCase();			// Choose word using the random number as an index
console.log(randomWord);									// Debug
console.log(randomWord.length);								// Debug

// Turn word into list of characters
var letterList = randomWord.split('');			// Turn word into list of letters
console.log(letterList);									// Debug
console.log(letterList.length);								// Debug

// Build unsolved gameboard
var gameboard = [];										
var guessesAllowed = 0;									

for (char in letterList) {
	if (char !== " ") {	
		gameboard.push("_");							// Replace letter with underscore + space
		guessesAllowed++;									// Guesses allowed same as number of letters in word
	} else {
		gameboard.push(" ");							// Replace space with space
	}
}

console.log(gameboard);									// Debug

// Listen for user input


// Register guessed letter
var guess = "a";										// Debug
var letterFound = false;

for (var i = 0; i<letterList.length; i++) {	
	if (letterList[i] === guess) {
		gameboard[i] = guess;							// Replace underscore with letter if guesseed correctly
		letterFound = true;
		return gameboard;
	} 
}

if (letterFound === false) {
	guessesAllowed -= 1;
} else {
	letterFound = true;
}

console.log("Guesses left: " + guessesAllowed);
console.log(gameboard);


////////////// Unneeded code? //////////////////////

// Build blank gameboard for UI
//var uiGameboard = "";											// Create blank gameboard
//
//for (var char in letterList) {					
//	if (letterList[char] === " ") {							// If character in the word is a space, add a space.
//		uiGameboard += " ";
//	} else {
//		uiGameboard += "_ ";									// If character in the word is a letter, add a "_" and a space.
//	}					
// }
//
// uiGameboard = uiGameboard.substring(0, uiGmeboard.length-1);		// Remove last space from gameboard
//
// console.log(uiGameboard);										// Debug
// console.log(uiGameboard.length);								// Debug


// Build solved gameboard
//solvedGameboard = [];
//
//for (char in letterList) {
//	if (letterList[char] !== " ") {	
//		solvedGameboard.push(letterList[char].toUpperCase());		
//	} else {
//		solvedGameboard.push(" ");
//}
//
//console.log(solvedGameboard);	
