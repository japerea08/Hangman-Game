
var hangman = {
	//object's attributes
	movieList : ["JAWS", "FAST AND FURIOUS", "JURASSIC PARK"],
	numberOfWins : 0,
	numberOfGuesses : 0,
	numberOfGames : 0, //this variable will act as a counter for the amount of possible games
	answer: "", //initialize based off the size of the movie taken from the array
	guessedLetters : [], //set to size 26 because there are only 26 letters in alphabet
	gameStart : false,
	dashedAnswer : "",

	//methods
	//when the user first begins the game
	initializeGame : function(){
		
		if(this.gameStart == false){
			this.gameStart = true;

			//initializing the game
			this.numberOfGuesses = 6;
			document.getElementById("guesses").innerHTML = this.numberOfGuesses;

			//purge the guessed array
			this.guessedLetters = [];
			document.getElementById("guessedLetters").innerHTML = this.guessedLetters;

			//purge the dashed array
			this.dashedAnswer = "";

			//counts how many possible games
			this.numberOfGames = this.movieList.length;

			//grab a movie from the list
			this.answer = this.getMovie();


			//add dashes or spaces for the user to see
			if(this.answer === undefined){
				alert("Refresh the Game");
			}
			for(var i = 0; i < this.answer.length; i++){
				if(this.answer[i] != " "){
					this.dashedAnswer += "-";  
				}
				else{
					this.dashedAnswer += " ";
				}
			}
			//after the for loop, the dashes should be set
			document.getElementById("dashed").innerHTML = this.dashedAnswer;
		}
	},

	//this function will get a movie from the Array, update the array, and uses random number generator
	getMovie: function(){
		//random number
		randomSelector = Math.floor(Math.random() * this.movieList.length);
		var selectedMovie = this.movieList[randomSelector];

		//rewrite the array
		this.movieList.splice(randomSelector, 1);
		console.log("Rewritten movielist: " + this.movieList);

		return selectedMovie;

	},

	//function to check the state of the game
	checkGameState: function(){
		if(this.gameStart == false){
			return 0;
		}
		else{
			return 1;
		}
	},

	//function to see if the game was won or lost
	checkAnswer: function(){
		//then user wins
		if(this.dashedAnswer == this.answer){
			console.log("User wins");
			//purge the dashes on the website
			//after the for loop, the dashes should be set
			document.getElementById("dashed").innerHTML = "";
			return true;
			//need to select the next word off the list
		}
		else{
			return false;
		}

	},

	//function that will place an image of movie
	setImage: function(answer){
		if(answer == "JAWS"){
			document.getElementById("image").src = "assets/images/jaws.jpeg"; 

		}
		else if(answer == "JURASSIC PARK"){
			document.getElementById("image").src = "assets/images/jurassic_park.jpeg";

		}
		else if(answer == "FAST AND FURIOUS"){
			document.getElementById("image").src = "assets/images/fast.jpeg";
		}

	},

	//function to check the letter typed in by user
	checkWord: function(letter){
		var indexNumber = this.answer.indexOf(letter);
		if(indexNumber != -1){
			//variable to store all the indices at which the letter occurs
			var indices = [];
			indices.push(indexNumber);

			//search the remaining string for multiple occurences
			if(indexNumber != (this.answer.length-1)){
				for(var i = indexNumber+1; i < this.answer.length; i++){
					if(letter === this.answer[i] ){
						indices.push(i);
					}
				}
			}
			//replace the dash area with the index
			for(var i = 0; i < indices.length; i++){
				this.dashedAnswer = this.dashedAnswer.replaceAt(indices[i], letter);
			}
			
			console.log("Index Number: " + indexNumber);
			document.getElementById("dashed").innerHTML = this.dashedAnswer;
			console.log("Dashed answer: " + this.dashedAnswer);
			
			if(hangman.checkAnswer() == true){
				//call image function
				hangman.setImage(this.answer);
				document.getElementById("dashed").innerHTML = this.dashedAnswer;
                //code to rerun the game
                console.log("Won");
                this.gameStart = false;
                this.numberOfWins++;
                this.numberOfGames--;
                if(this.numberOfGames == -1){
                	alert("Game Over, You Won!");
                	alert("Refresh to Play Again");
                }
                document.getElementById("wins").innerHTML = this.numberOfWins;
                this.initializeGame();
          	}
		}
		//populate the guessed letters and decrease the number of available guesses
		else{

			this.numberOfGuesses--;
			//check to see if the game is lost
			if(this.numberOfGuesses == -1){
				alert("You lost");
				alert("Reload the game to play agian");
			}

			//checking to see if the letter was already guessed
			if(this.guessedLetters.indexOf(letter) > -1){
				//letter is already there
				
			}
			else{
				this.guessedLetters.push(letter);
			}
			document.getElementById("guesses").innerHTML = this.numberOfGuesses;
			console.log("Guessed Letters: " + this.guessedLetters);
			document.getElementById("guessedLetters").innerHTML = this.guessedLetters;

		}
		
	},

};

//function to replace a char in a string
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
