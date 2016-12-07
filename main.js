$(document).ready(function() {
  listOfPhrases = ["democratic process", "constitutional rights",
  "executive power", "legislative branch", "supreme court",
  "separation of powers", "federal government","bicameral congress"];

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
      var rand = listOfPhrases[Math.floor(Math.random()*listOfPhrases.length)];
      console.log(rand);
      return rand;  
    }
  }// End wordGame object

  //Main object makeBoard.
  function makeBoard(phraseString) {
     this.phrase = phraseString;
     this.numGuess = 20;
     this.numLines = 0;
     this.charPerLine = 20;
     this.numBlanks = 0;
     this.guessedLetters = [];
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
   
     //creates the boxes for one word in the display
     this.placeWordOnLine = function(word,numSpaces) {
      console.log("word length "+word.length);
      for (var i = 0; i < word.length; i++) {
        //create a div element
        var letBox = document.createElement("div");
        //give that div element a class 
        letBox.className = "input-div-letter";
        //find the parent element
        var letDiv = document.getElementsByClassName("input-div")[0];
        //attach the new div element to the parent
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
       inLet = document.getElementsByClassName("letter-btn")[0];
       inLet.addEventListener("click", checkForLetter, false);
       inLet.currPhrase = currPhrase;
       console.log("letter btn "+inLet);
       $(".phrase-btn").click(function() {
         checkForPhraseMatch();
       })
     }

     checkForLetter = function(evt) {
       currPhrase = evt.target.currPhrase;
       console.log("currPhrase "+currPhrase);
       var charIn = inputLetter();
       if (charIn != null) {
         if (letterInPhrase(charIn)) { 
           displayLetters(charIn,currPhrase);
         }
         else {
           writeErrorMsg("This letter is not in the answer");
         }
         board.numGuess -= 1;
         $(".guess-msg").html(board.numGuess+" guesses left");
       }
     }

     inputLetter = function() {
        var inLet = $(".letter-field").val();
        $(".letter-field").val("");
        console.log("input "+inLet.length);
        if (inLet.length != 1) {
          writeErrorMsg("Input one character");
          return null;
        }
        else
          return inLet;
     }

     writeErrorMsg = function(message) {
        $(".error-msg").html(message);
     }

     letterInPhrase = function(charIn) {
       var index = board.phrase.indexOf(charIn);
       return (board.phrase.indexOf(charIn) >= 0);
     }
 
     displayLetters = function(charIn) {
       var indices = [];
       console.log("board.phrase "+board.phrase)
       for(var i=0; i < board.phrase.length; i++) {
         if (board.phrase[i] == charIn) 
           indices.push(i);
       }
       console.log("letter indices");
       console.log(indices);
       board.numBlanks -= indices.length;
       putLettersInBlocks(charIn,indices);
     }

     putLettersInBlocks = function(charIn,indices) {
       var bloxDiv = document.getElementsByClassName("input-div")[0].childNodes;
       for (var i = 0; i < indices.length; i++) {
         bloxDiv[indices[i]+1].innerText = charIn
       }
     }
     
     fillInAllLetters = function() {
       var bloxDiv = document.getElementsByClassName("input-div")[0].childNodes;
       for (var i = 0; i < board.phrase.length; i++) {
         bloxDiv[i+1].innerText = board.phrase[i];
       }
     }
     checkForPhraseMatch = function() {
       var inPhrase = $(".phrase-field").val();
       fillInAllLetters();
       if (inPhrase == board.phrase) {
         writeErrorMsg("Congratulations you win");
         $(".error-msg").fadeOut(800).fadeIn(800).fadeOut(400).fadeIn(400)
           .fadeOut(400).fadeIn(400);
       }
       else {
         writeErrorMsg("Sorry, you should try harder");
       }
     }
  } //end makeBoard object

  //Third object newPhrase
  function newPhrase(phrase) {
     this.total = phrase.length;
     this.wordArray = phrase.split(" ");
  } //end newPhrase object

})
