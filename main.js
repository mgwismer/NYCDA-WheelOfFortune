$(document).ready(function() {
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
    
    //this function part of wordGame object
    this.displayStartPage = function() {
      $(".start-div").css("visibility", "visible");
      $(".start-btn").click(function(){
        console.log("button clicked");
        currentGame.playGame();
      });
    }

    this.playGame = function() {  
      quote = this.selectQuote();
      board = new makeBoard(quote);
      board.displayGamePage();
      //board.play()
    }

    this.selectQuote = function() {
      console.log("phrase 1 "+listOfPhrases[0]);
      var rand = listOfPhrases[Math.floor(Math.random()*listOfPhrases.length)];
      console.log(rand);
      return rand;  
    }
  }// End wordGame object

  //Main object makeBoard.
  function makeBoard(phraseString) {
     this.phrase = phraseString;
     this.numGuess = 0;
     this.numLines = 0;
     this.charPerLine = 20;
     this.numBlanks = 0;
     this.displayGamePage = function() {
       currPhrase = new newPhrase(this.phrase);
       this.displayWordBoxes(currPhrase);
       this.displayGameButtons();
       this.makeListenersOnPlay(currPhrase);
     }

     this.displayWordBoxes = function(phrase) {
       $(".start-div").css("visibility","hidden");
       for (var i = 0; i < phrase.wordArray.length; i++) {
          this.numBlanks += phrase.wordArray[i].length;
          //console.log("Word "+i+" "+phrase.wordArray[i]);
          this.placeWordOnLine(phrase.wordArray[i],this.charPerLine);
          this.createSpace(this.charPerLine);
       }
       $(".input-div").css("visibility","visible");
     }
   
     //can I use function displayWordBoxes() {}
     this.placeWordOnLine = function(word,numSpaces) {
      console.log("word length "+word.length);
      for (var i = 0; i < word.length; i++) {
        var letBox = document.createElement("div");
        letBox.className = "input-div-letter";
        var letDiv = document.getElementsByClassName("input-div")[0];
        letDiv.appendChild(letBox);
      }
      this.charPerLine -= word.length;
    }

     this.createSpace = function() {
      var space = document.createElement("div");
      space.className = "input-div-blank";
      var letDiv = document.getElementsByClassName("input-div")[0];
      letDiv.appendChild(space);
      board.charPerLine -= 1;
      console.log("char left "+this.charPerLine);
     }

     this.displayGameButtons = function() {
       $(".input-guess-div").css("visibility","visible");
     }

     this.makeListenersOnPlay = function(currPhrase) {
       console.log(currPhrase.wordArray[0]);
       inLet = document.querySelector(".letter-btn");
       inLet.addEventListener("click", checkForLetter, false);
       inLet.currPhrase = currPhrase;
       $(".phrase-btn").click(function() {
         checkForPhraseMatch();
       })
     }

     checkForLetter = function(evt) {
       //charIn = inputLetter();
       console.log("in checkForLetter "+evt.target.currPhrase.wordArray[0]);
       charIn = "b";
       if (letterInPhrase(charIn)) { 
          board.numBlanks -= displayLetters(charIn);
       }
       else {
          //displayNotThisLetter();
       }
       board.numGuess += 1;
     }

     letterInPhrase = function(charIn) {
       return (board.phrase.indexOf(charIn) >= 0);
     }
 
     displayLetters = function(charIn) {

     }
  } //end makeBoard object

  //Third object newPhrase
  function newPhrase(phrase) {
     this.total = phrase.length;
     this.wordArray = phrase.split(" ");
  } //end newPhrase object

})
