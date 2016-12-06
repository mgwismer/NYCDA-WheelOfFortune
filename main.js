listOfPhrases = ["Democratic process", "Constitutional rights",
"Executive power", "Legislative branch"];

var currentGame = new wordGame("Wheel of Fortune");
currentGame.start();

//Top object wordGame
function wordGame(title) {
  this.name = title;
  this.start = function() {
    this.displayStartPage();
  }
  
  this.playGame = function() {  
    quote = this.selectQuote();
    board = new makeBoard(phrase);
    board.displayGamePage();
    board.play()
  }

  //this function part of wordGame object
  this.displayStartPage = function() {
    $("start-div").css("visibility", "visible");
    $("start-btn").click(function(){
      currentGame.playGame();
    });
  }

  this.selectQuote = function() {
    var rand = listOfPhrases[Math.floor(Math.random()*listOfPhrases.length)];
    return rand;  
  }
}// End wordGame object

//Main object makeBoard.
function makeBoard(phraseString) {
   this.phrase = phraseString;
   this.numGuess = 0;
   this.numLines = 0;
   this.charPerLine = 20;
   this.displayGamePage = function() {
     currPhrase = new newPhrase(this.phrase);
     this.displayWordBoxes(currPhrase);
     this.displayGameButtons();
     this.makeEventListeners();
   }

   this.displayWordBoxes = function(phrase) {
     for (var i = 0; i < phrase.wordArray.length; i++) {
        placeWordOnLine(phrase.wordArray[i],this.charPerLine);
        createSpace(this.charPerLine);
     }
   }
 
   //can I use function displayWordBoxes() {}
   placeWordOnLine = function(word,numSpaces) {
    for (var i = 0; i < word.length; i++) {
      var letBox = document.createElement("div");
      letBox.className = "input-div-letter";
      var letDiv = document.getElementsByClassName("input-div")[0];
      letDiv.appendChild(letBox);
    }
    this.charPerLine -= word.length;
  }

   createSpace = function() {
    var letBox = document.getElementsByClassName('input-div-letter');
    letBox.style.marginRight = "50px";  
   }
} //end makeBoard object

//Third object newPhrase
function newPhrase(phrase) {
   this.total = phrase.length;
   this.wordArray = phrase.split(" ");
} //end newPhrase object
