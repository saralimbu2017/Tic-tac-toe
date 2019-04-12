var boxes = document.querySelectorAll('.box');
var resultDiv = document.querySelector('.result');
var resetBtn = document.querySelector('.reset-btn');
var gameRoundDisplayBtn = document.querySelector('.gameRoundDisplay-btn');
var containerDiv = document.querySelector('.container');
var menuDiv = document.querySelector('.menu-options');
var asideDiv = document.querySelector('aside');
var anAvatarBtn = document.querySelector('.avatar-btn');
var homeBtn = document.querySelector(".btn-home");
var timerSpan = document.querySelector(".timer");
var avatarForPlayer1Btn = "";
var avatarForPlayer2Btn = "";
var menuHomeDiv = "";
var timeLeft = null;
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
var avatarNinjaDivs = "";
var player1 = "player1";
var player2 = "player2";
var timerId = null;
var seconds= 11;

var winningScores = [
                      [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];

var trackMoves = function(event) {
  count++;
  if(count >= 1 && seconds > 0 && !isGameOver) {
    handleStartTimer();
  } 
  scorePerMove = Number(event.target.id);
  if(isOdd(count)) {
    if(!isGameOver) {
      if(event.target.classList.contains(`${player1}`) || event.target.classList.contains(`${player2}`) ){
        count--;
        event.target.classList.add(`ninjaNod`);
      } else {
        if(event.target.classList.contains(`ninjaNod`)) {
          event.target.classList.remove(`ninjaNod`);
        }
        event.target.classList.add(`${player1}`);
        scorePlayer1.push(scorePerMove);
      }
      
      
    }
    if(scorePlayer1.length == 3) {
      if(isPlayer1Winning()) {
        resultDiv.textContent = `Game Over !!!! Winner: Player1`;
        playerNumber = 1;
        //individualGameRecords.push()
        isGameOver = true;
        handleStopTimer();
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
      if(event.target.classList.contains(`${player1}`) || event.target.classList.contains(`${player2}`) ){
        count--;
        event.target.classList.add(`ninjaNod`);
      } else {
        if(event.target.classList.contains(`ninjaNod`)) {
          event.target.classList.remove(`ninjaNod`);
        }
        
        event.target.classList.add(`${player2}`);
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
  if(box.classList.contains(`${player1}`)) {
    box.classList.remove(`${player1}`);
  } else if(box.classList.contains(`${player2}`)) {
    box.classList.remove(`${player2}`);
  }
  });
  handleResetTimer();
  isGameOver = false;
  resultDiv.textContent = "";
  scorePlayer1 = [];
  scorePlayer2 = [];
  count = 0;
  seconds = 30;
 // var timeLeft = addPrefixZero();
 
  //timerSpan.textContent=` Time Left  00:00`;
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
     playerNumber = null;
    
    }
  }
  isGameOver = true;
  handleStopTimer();
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
  // var gameRecords = `<h1 class="menu-home">Menu</h1><h2>Game Records</h2>
  var gameRecords = `<h2>&nbsp;&nbsp; &nbsp; Game Records</h2>
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
    if(overallGameRecords[i].player == null) {
      winner = "Draw";
    }
    // if(overallGameRecords[i].player == 0) {
    //   winner = "0";
    // }
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
    newavatarBtn.textContent = "Choose Your Ninja Avatar";
  
   }

}
var assignAvatar = function(event) {
  reset();
  if(event.target.classList.contains('avatarNaruto')) {
    //console.log("naruto");
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarNaruto');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarNaruto";
      //avatarForPlayer1Div.classList.add('player');
      
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarNaruto');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2"; 
      player2="avatarNaruto";
    }
  } else if(event.target.classList.contains('avatarSasuke')) {
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarSasuke');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarSasuke";
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarSasuke');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2";
      player2="avatarSasuke";
    }
  } else if(event.target.classList.contains('avatarSakura')) {
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarSakura');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarSakura";
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarSakura');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2";
      player2="avatarSakura";
    }
  } else if(event.target.classList.contains('avatarHinata')) {
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarHinata');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarHinata";
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarHinata');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2";
      player2="avatarHinata";
    }
  } else if(event.target.classList.contains('avatarGaara')) {
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarGaara');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarGaara";
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarGaara');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2";
      player2="avatarGaara";
    }
  } else if(event.target.classList.contains('avatarKakashi')) {
    if(!avatarForPlayer1Div.classList.contains('avatarNinja')) {
      avatarForPlayer1Div.classList.add('avatarKakashi');
      avatarForPlayer1Div.classList.add('avatarNinja');
      avatarForPlayer1Div.textContent = "Player1";
      player1="avatarKakashi";
    } else if(!avatarForPlayer2Div.classList.contains('avatarNinja')) {
      avatarForPlayer2Div.classList.add('avatarKakashi');
      avatarForPlayer2Div.classList.add('avatarNinja');
      avatarForPlayer2Div.textContent = "Player2";
      player2="avatarKakashi";
    }
  }

}
var selectAvatarPlayer1 = function() {
  avatarNinjaDivs.forEach(function(avatarNinjaDiv){
   // avatarNinjaDiv.addEventListener('click',assignAvatar);
   console.log("hello ninja");
  });
}
var chooseAvatars = function() {
  removeAsideMainDivChildElements();
  var avatarDiv = document.createElement('div');
  avatarDiv.classList.add('avatar');
  var avatarNarutoDiv = document.createElement('div');
  avatarNarutoDiv.classList.add('avatarNinja');
  avatarNarutoDiv.classList.add('avatarNaruto');
  var avatarSasukeDiv = document.createElement('div');
  avatarSasukeDiv.classList.add('avatarNinja');
  avatarSasukeDiv.classList.add('avatarSasuke');
  var avatarHinataDiv = document.createElement('div');
  avatarHinataDiv.classList.add('avatarNinja');
  avatarHinataDiv.classList.add('avatarHinata');
  var avatarSakuraDiv = document.createElement('div');
  avatarSakuraDiv.classList.add('avatarNinja');
  avatarSakuraDiv.classList.add('avatarSakura');
  var avatarGaaraDiv = document.createElement('div');
  avatarGaaraDiv.classList.add('avatarNinja');
  avatarGaaraDiv.classList.add('avatarGaara');
  var avatarKakashiDiv = document.createElement('div');
  avatarKakashiDiv.classList.add('avatarNinja');
  avatarKakashiDiv.classList.add('avatarKakashi');
  avatarDiv.appendChild(avatarNarutoDiv);
  avatarDiv.appendChild(avatarSasukeDiv);
  avatarDiv.appendChild(avatarHinataDiv);
  avatarDiv.appendChild(avatarSakuraDiv);
  avatarDiv.appendChild(avatarGaaraDiv);
  avatarDiv.appendChild(avatarKakashiDiv);

  
  playerAvatarsContainer = document.createElement('div');
  playerAvatarsContainer.classList.add('playerAvatarsContainer');
  avatarForPlayer1Div = document.createElement('div');
  //avatarForPlayer1Div.textContent = "Player1";
  avatarForPlayer1Div.classList.add('avatarPlayer');
  avatarForPlayer2Div= document.createElement('div');
  //avatarForPlayer2Div.textContent = "Player2";
  avatarForPlayer2Div.classList.add('avatarPlayer');
  //avatarForPlayer1Btn.addEventListener('click',selectAvatarPlayer1);
  menuDiv.appendChild(avatarDiv );
  playerAvatarsContainer.appendChild(avatarForPlayer1Div);
  playerAvatarsContainer.appendChild(avatarForPlayer2Div);
  menuDiv.appendChild(playerAvatarsContainer);
  avatarNinjaDivs = document.querySelectorAll('.avatarNinja')
  avatarNinjaDivs.forEach(function(avatarNinjaDiv){
  avatarNinjaDiv.addEventListener('click',assignAvatar);
    //console.log("hello ninja");
   });
  isMenuItemsClicked  = true;
}
var addPrefixZero = function(seconds) {
  var timeString = "";
  var timeStringSecondsLessThanZero ="00";
  //return seconds;
  if( seconds <30 ){
    timeString += seconds.toString();
    if(timeString.length < 2 ) {
    //timeString = ``;
    return `0${timeString}`;
    } else {

    return `${timeString}`;
    }
  }
  return timeStringSecondsLessThanZero;
  //console.log(seconds);

  }
   
  


var tick = function() {
  seconds--;
  // timerSpan.textContent= seconds;
  // timerSpan.textContent=`Time Left: ${seconds}`;
  if(seconds > 0){
  timeLeft = addPrefixZero(seconds);
  timerSpan.textContent=` Time Left:00: ${timeLeft}`;
  }
  
  if(seconds == 0){
    handleStopTimer();
  }
}
var handleStartTimer = function() {
  
  if(timerId===null){
  timerId = setInterval(tick,1000);
 }
}



 var handleStopTimer = function() {
  timeLeft = addPrefixZero();
  timerSpan.textContent=` Time Left:00: ${timeLeft}`;
  //timerSpan.textContent=` Time Left: ${seconds}`;
  clearInterval(timerId);

  
  timerId=null;
  resultDiv.textContent = `Game Over !!!! Time Out`;
  isGameOver = true;

}

var handleResetTimer = function() {
  //timeLeft = addPrefixZero();
  timerSpan.textContent=` Time Left:00:00`;
  //timerSpan.textContent=` Time Left: ${seconds}`;
  clearInterval(timerId);
  timerId=null;
  //resultDiv.textContent = `Game Over !!!! Time Out`;
  //isGameOver = true;

}


boxes.forEach(function(box) {
  box.addEventListener('click',trackMoves);
})

resetBtn.addEventListener('click',reset);
gameRoundDisplayBtn.addEventListener('click',displayGameRecords);
homeBtn.addEventListener('click',displayMainMenu);
//menuHomeDiv.addEventListener('click',displayMainMenu);
anAvatarBtn.addEventListener('click',chooseAvatars);
timerSpan.addEventListener('click',handleStartTimer);
//timerSpan.addEventListener('click',handleStopTimer);

