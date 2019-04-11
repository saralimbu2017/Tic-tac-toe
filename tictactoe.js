var boxes = document.querySelectorAll('.box');
var resultDiv = document.querySelector('.result');
var resetBtn = document.querySelector('.reset-btn');
var scorePerMove = 0;
var scorePlayer1 = [];
var scorePlayer2 = [];
var count = 0;
var gameCounter = 0;
var gameRoundRecords = [];
var game = {};
var playerNumber = 0;
var finalScorePlayer1 = 0;
var finalScorePlayer2 = 0;
var isGameOver = false;
var winningScores = [
                      [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];
var trackMoves = function(event) {
  count++;
  scorePerMove = Number(event.target.id);
  if(isOdd(count)) {
  if(!isGameOver) {
  event.target.classList.add('player1');
  scorePlayer1.push(scorePerMove);
  }
  
    if(scorePlayer1.length == 3) {
        if(isPlayer1Winning()) {
        resultDiv.textContent = `Game Over !!!! Winner: Player1`;
        playerNumber = 1;
        isGameOver = true;
        }
    }
  } else {
    if(!isGameOver) {
      event.target.classList.add('player2');
      scorePlayer2.push(scorePerMove);
    }
 
  if(scorePlayer1.length == 3 && scorePlayer2.length == 3 ) {
  
  checkWinner();
  }
  }
  

 
}

var checkCountofMoves = function() {
  

      
   
    if(scorePlayer1.length == 3 && scorePlayer2.length == 3) {
      checkWinner();
    } 
   
} 


var reset = function() {
  //event.preventDefault();
  boxes.forEach(function(box) {
  if(box.classList.contains('player1')) {
    box.classList.remove('player1');
      //console.log(scorePlayer1);
  } else if(box.classList.contains('player2')) {
    box.classList.remove('player2');
     // console.log(scorePlayer2);
  }

  });
  scorePlayer1 = [];
  scorePlayer2 = [];
}

var isOdd = function(count) {
  if(count % 2 !== 0) {
    return true;
  }
}

var isPlayer1Winning = function() {
  finalScore = scorePlayer1.sort().join('');
  for(var i = 0; i < winningScores.length; i++) {
    winningScore = winningScores[i].sort().join('');
  
    if(winningScore === finalScore){
      
      return true;
    } 

  }
  return false;
 
}

var checkWinner = function() {
  //finalScorePlayer1 = scorePlayer1.sort().join('');
  finalScorePlayer2 = scorePlayer2.sort().join('');
 
  //gameCounter++;
  for(var i = 0; i < winningScores.length; i++) {
    winningScore = winningScores[i].sort().join('');
    //console.log(winningScore);
    if(winningScore === finalScorePlayer2) {
    
    resultDiv.textContent = `Game Over !!!! Winner: Player2`;
    playerNumber = 2;
    isGameOver = true;
    break;
    } else {
      //console.log(`Draw`);
    resultDiv.textContent = `Game Over !!!! Draw`;
    isGameOver = true;
    }
  }
  game.round = gameCounter;
  game.winner = playerNumber;
  gameRoundRecords.push(game);
  
}

boxes.forEach(function(box) {
  box.addEventListener('click',trackMoves);
})

resetBtn.addEventListener('click',reset);
