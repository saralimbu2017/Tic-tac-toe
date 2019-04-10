var boxes = document.querySelectorAll('.box');
var resultDiv = document.querySelector('.result');
var scorePerMove = 0;
var scorePlayer1 = [];
var scorePlayer2 = [];
var count = 0;
var winningScores = [
                      [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];
var trackMoves = function(event) {
  count++;
  scorePerMove = Number(event.target.id);
  if(isOdd(count)){
    event.target.classList.add('player1');
  //console.log(`odd click ${count}`);
  scorePlayer1.push(scorePerMove);

  } else {
  //  console.log(`even click ${count}`);
  event.target.classList.add('player2');
  scorePlayer2.push(scorePerMove);
  }
  
  if(scorePlayer1.length == 3 && scorePlayer2.length == 3) {
    checkWinner(scorePlayer1, scorePlayer2);
    reset();
  }
}

var reset = function(){
  scorePlayer1 = [];
  scorePlayer2 = [];
  boxes.forEach(function(box){
    if(box.classList.contains('player1')){
      box.classList.remove('player1');
    } else {
      box.classList.remove('player2');
    }

  });
}

var isOdd = function(count) {
  if(count % 2 !== 0) {
    return true;
  }
}

var checkWinner = function(scorePlayer1, scorePlayer2) {
  scorePlayer1 = scorePlayer1.sort().toString();
  scorePlayer2 = scorePlayer2.sort().toString();
  for(var i = 0; i < winningScores.length; i++) {
    winningScore = winningScores[i].sort().toString();
    //console.log(winningScore);
    if(winningScore === scorePlayer1){
      //console.log(`Winner is Player1`);
      resultDiv.textContent = `Winner: Player1`;
      break;
    } else if(winningScore == scorePlayer2) {
      //console.log(`Winner is Player2`);
      resultDiv.textContent = `Winner: Player2`;
      break;
    } else {
      //console.log(`Draw`);
      resultDiv.textContent = `Draw`;
    }
  }

}

boxes.forEach(function(box) {
  box.addEventListener('click',trackMoves);
})
