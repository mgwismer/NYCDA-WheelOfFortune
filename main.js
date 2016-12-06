listOfPhrases = ["Democratic process", "Constitutional rights",
"Executive power", "Legislative branch"];

var currentGame = new wordGame(title);
currentGame.start();

//Top object wordGame
function wordGame(title) {
  this.name = title;
  this.start = function() {
    this.displayStartPage();
    quote = this.selectQuote();
    board = new makeBoard(phrase);
    board.displayGamePage();
    board.play()
  }
  
  //this function part of wordGame object
  this.displayStartPage = function() {
    $("start-div").css("visibility", "visible");
  }

  this.selectQuote = function() {
    var rand = listOfPhrases[Math.floor(Math.random()*listOfPhrases.length)];
    return rand;  
  }

//Main object makeBoard.
function makeBoard(phraseString) {
   this.phrase = phraseString;
   this.numGuess = 0;
   this.displayGamePage = function() {
     var parsedPhrase = new gamePhrase(this.phrase);
     makeEventListeners()
   }
}

//Third object newPhrase
function newPhrase(phrase) {
   this.total = phrase.length;
   this.wordArray = phrase.split(" ");
}