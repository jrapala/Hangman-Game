//Logo on top
//"Press any key to get started!"
//"Wins"
//"Current Word"
//"_ _ _ _ _ _"
//"Number of Guesses Remaining"
//"#"
//"Letters Already Guessed"
//"A, E, S"
//Listen for letters that are typed
//Guessing Correct --> Display Artist and Song Title --> Change Picture --> Play Song

// List of words
var words = ["Black Sabbath", "Manowar", "Iron Maiden", "Slayer", "Metallica", "Pantera", "Judas Priest", "Megadeth", "Death", "Motorhead", "Carcass", "Cannibal Corpse", "Anthrax", "Sepultura", "Dio", "Mercyful Fate", "Morbid Angel", "Meshuggah", "Opeth", "Testament", "At The Gates", "ACDC", "Celtic Frost", "Ozzy Osbourne", "Napalm Death", "Lamb of God", "Death", "Gojira", "Tool"];

// Pick random word
var listLength = words.length;   				// Find length of word list
var randomNumber = Math.floor(Math.random()* listLength);	// Find random number between 0 and length of word list
var randomWord = words[randomNumber];			// Choose word using the random number as an index
console.log(randomWord);						// Debug
console.log(randomWord.length);					// Debug

// Turn word into list of characters
var letterList = randomWord.split('');			// Turn word into list of letters
console.log(letterList);						// Debug
console.log(letterList.length);					// Debug

// Build blank gameboard for UI
var gameboard = "";								// Create blank gameboard

for (var char in letterList) {					
	if (letterList[char] === " ") {				// If character in the word is a space, add a space.
		gameboard += " ";
	} else {
		gameboard += "_ ";						// If character in the word is a letter, add a "_" and a space.
	}					
}

gameboard = gameboard.substring(0, gameboard.length-1);		// Remove last space from gameboard

console.log(gameboard);							// Debug
console.log(gameboard.length);					// Debug

// Build unsolved gameboard
unsolvedGameboard = [];

for (char in letterList) {
	if (letterList[char] !== " ") {	
		unsolvedGameboard.push("");		
	}
}

console.log(unsolvedGameboard);	


// Build solved gameboard
solvedGameboard = [];

for (char in letterList) {
	if (letterList[char] !== " ") {	
		solvedGameboard.push(letterList[char].toUpperCase());		
	}
}

console.log(solvedGameboard);	

// Listen for user input

