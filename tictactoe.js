var boxes = document.querySelectorAll('.box');
var resultDiv = document.querySelector('.result');
var resetBtn = document.querySelector('.reset-btn');
var gameRoundDisplayBtn = document.querySelector('.gameRoundDisplay-btn');
var containerDiv = document.querySelector('.container');
var menuDiv = document.querySelector('.menu-options');
var asideDiv = document.querySelector('aside');
var anAvatarBtn = document.querySelector('.avatar-btn');
var homeBtn = document.querySelector(".btn-home");
var menuHomeDiv = "";
var scorePerMove = 0;
var scorePlayer1 = [];
var scorePlayer2 = [];
var count = 0;
var gameCounter = 0;
var individualGameRecords = {};
var overallGameRecords= [];
var playerNumber = 0;
var finalScorePlayer1 = 0;
var finalScorePlayer2 = 0;
var isGameOver = false;
var isMenuItemsClicked = false;
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
        //individualGameRecords.push()
        isGameOver = true;
        gameCounter++;
        individualGameRecords = {};
        individualGameRecords.round = gameCounter;
        individualGameRecords.player = playerNumber;
        overallGameRecords.push(individualGameRecords);
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
  //isMenuItemsClicked  = true;
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
     // gameCounter++;
     
      
      break;
    } else {
      resultDiv.textContent = `Game Over !!!! Draw`;
     // gameCounter++;
     playerNumber = 0;
    
    }
  }
  isGameOver = true;
  individualGameRecords = {};
  gameCounter++;
  individualGameRecords.round = gameCounter;
  individualGameRecords.player = playerNumber;
  overallGameRecords.push(individualGameRecords);
  count = 0;
 
}

var removeAsideMainDivChildElements  = function() {
  while (menuDiv.firstChild) {
    menuDiv.removeChild(menuDiv.firstChild);
  }
}
var displayGameRecords = function() {
 removeAsideMainDivChildElements();
  
  var recordDiv = document.createElement('div');
  var content = getRecords();
  var gameRecords = `<h1 class="menu-home">Menu</h1><h2>Game Records</h2>
  <ul>${content}</ul>`;
  recordDiv.innerHTML = gameRecords;
  //gameRecordsDiv.appendChild(recordDiv);
  menuDiv.appendChild(recordDiv);
  isMenuItemsClicked  = true;
  //asideDiv.appendChild(gameRecordsDiv);
  //menuHomeDiv = document.querySelector('.menu-home');

}

var getRecords = function() {
  var record = `<li> Round&nbsp;&nbsp; &nbsp;    Winner</li>`;
  var winner= "";
  for(var i = 0; i < overallGameRecords.length; i++) {
    if(overallGameRecords[i].player == 0) {
      winner = "Draw";
    }
    if(overallGameRecords[i].player == 1) {
      winner = "Player 1";
    }
    if(overallGameRecords[i].player == 2) {
      winner = "Player 2";
    }
    record += `<li> ${overallGameRecords[i].round}&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;      ${winner} </li>`;
  }
  return record;
}

var displayMainMenu = function() {
  if(isMenuItemsClicked) {
    removeAsideMainDivChildElements();
    var newResetbtn = document.createElement('button');
    // newResetbtn.addEventListener('click',function(){
    //   //console.log("hello");
    //   reset();
    // });
    newResetbtn.addEventListener('click',reset);
    var newGameRoundDisplayBtn = document.createElement('button');
    newGameRoundDisplayBtn.addEventListener('click',displayGameRecords);
    var newavatarBtn = document.createElement('button');
    newavatarBtn.addEventListener('click',chooseAvatars);
    menuDiv.appendChild(newResetbtn);
    menuDiv.appendChild(newGameRoundDisplayBtn );
    menuDiv.appendChild(newavatarBtn);
    newResetbtn.classList.add('reset-btn');
    newResetbtn.classList.add('button');
    newResetbtn.classList.add('dynamic-reset-btn');
    newResetbtn.textContent = "Reset";
    newGameRoundDisplayBtn.classList.add('gameRoundDisplay-btn');
    newGameRoundDisplayBtn.classList.add('button');
    newGameRoundDisplayBtn.classList.add('dynamic-record-button');
    newGameRoundDisplayBtn.textContent = "Display Game Records";
    newavatarBtn.classList.add('avatar-btn');
    newavatarBtn.classList.add('button');
    newavatarBtn.classList.add('dynamic-avatar-btn');
    newavatarBtn.textContent = "Choose Your Avatar";
  
   }

}
var chooseAvatars = function() {
  removeAsideMainDivChildElements();
  var avatarDiv = document.createElement('div');
  avatarDiv.classList.add('avatar');
  menuDiv.appendChild(avatarDiv );
 
  isMenuItemsClicked  = true;
}

boxes.forEach(function(box) {
  box.addEventListener('click',trackMoves);
})

resetBtn.addEventListener('click',reset);
gameRoundDisplayBtn.addEventListener('click',displayGameRecords);
homeBtn.addEventListener('click',displayMainMenu);
//menuHomeDiv.addEventListener('click',displayMainMenu);
anAvatarBtn.addEventListener('click',chooseAvatars);



// dynamicResetBtn.addEventListener("click", function(evt) {
//     // if (evt.target && 
//     //     evt.target.matches(".element")) {
//         //doYourStuff();
//         console.log("hello");
//    // }
// }, false);
//console.log(dynamicResetBtn);

// var doYourStuff = function(){
//   console.log("hello");
// }