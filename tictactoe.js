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
      if(event.target.classList.contains('player1') || event.target.classList.contains('player2') ){
        count--;

      } else {
        event.target.classList.add('player1');
        scorePlayer1.push(scorePerMove);
      }
      
      
    }
    if(scorePlayer1.length == 3) {
      if(isPlayer1Winning()) {
        resultDiv.textContent = `Game Over !!!! Winner: Player1`;
        playerNumber = 1;
        isGameOver = true;
        count = 0;
      }
    }
  } else {
    if(!isGameOver) {
      if(event.target.classList.contains('player1') || event.target.classList.contains('player2') ){
        count--;
      } else {
        event.target.classList.add('player2');
        scorePlayer2.push(scorePerMove);
      }
    }
    if(scorePlayer1.length == 3 && scorePlayer2.length == 3 ) {
      checkResult();
    }
  }
}

var reset = function() {
  boxes.forEach(function(box) {
  if(box.classList.contains('player1')) {
    box.classList.remove('player1');
  } else if(box.classList.contains('player2')) {
    box.classList.remove('player2');
  }
  });
  isGameOver = false;
  resultDiv.textContent = "";
  scorePlayer1 = [];
  scorePlayer2 = [];
  count = 0;
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

var checkResult = function() {
  finalScorePlayer2 = scorePlayer2.sort().join('');
  for(var i = 0; i < winningScores.length; i++) {
    winningScore = winningScores[i].sort().join('');
    if(winningScore === finalScorePlayer2) {
      resultDiv.textContent = `Game Over !!!! Winner: Player2`;
      playerNumber = 2;
      //isGameOver = true;
      // count = 0;
      break;
    } else {
      resultDiv.textContent = `Game Over !!!! Draw`;
      //isGameOver = true;
    }
  }
  isGameOver = true;
  count = 0;
  game.round = gameCounter;
  game.winner = playerNumber;
  gameRoundRecords.push(game);
}

boxes.forEach(function(box) {
  box.addEventListener('click',trackMoves);
})

resetBtn.addEventListener('click',reset);


