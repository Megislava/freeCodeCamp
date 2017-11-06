var randomArr = [];
var counter;

var winBox = document.querySelector(".winning");

var buttons = document.querySelectorAll(".gameBoard button");
buttons.forEach((button) => button.addEventListener("click", click));

var lengtRandomArr = document.querySelector(".number");
lengtRandomArr.innerText = randomArr.length;

var stricked;

function strictMode(){
  document.querySelector(".strictMode").style.backgroundColor = "red";
  stricked = true;
}

function startGame(){
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  randomArr.push(randomNumber);
  lengtRandomArr.innerText = randomArr.length;
  counter = 0;
  pcTurn();
}

function pcTurn(){
  randomArr.forEach((buttonId, i)=>{
      setTimeout(() => {
        whiteButton(buttonId);
        sound(buttonId);
      }, i * 1000);  
      setTimeout(() => normalButton(buttonId), 200 + i * 1000);    
  });
}

function whiteButton(button){
  document.getElementById(button).style.backgroundColor = "white";
}

function normalButton(button){
  if(button == 1){
    document.getElementById(button).style.backgroundColor = "#ffc107";
  } else if(button == 2){
    document.getElementById(button).style.backgroundColor = "#007bff";
  } else if(button == 3){
    document.getElementById(button).style.backgroundColor = "#dc3545";
  } else{
    document.getElementById(button).style.backgroundColor = "#218838";
  }
}

function sound(id){
  var snd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound" + id + ".mp3");
  snd.play();
}

function click(event){
  sound(event.target.id);
  humanTurn(event.target.id);
}

function humanTurn(buttonId){  
  setTimeout(() => whiteButton(buttonId));  
  setTimeout(() => normalButton(buttonId), 200);
  if (buttonId == randomArr[counter]){
    if(counter === randomArr.length - 1){
      if(randomArr.length === 20){
        winning();
        return;
      }
      setTimeout(startGame, 1500);      
    }
    counter++;
  } else {
    if (stricked){
      alert("You clicked the wrong button. The game will start over!");
      resetGame();
    } else {
      alert("Watch out! You clicked at the wrong button!");
      setTimeout(pcTurn, 1500);
    }
  }
}

function winning(){
  winBox.style.display = "block";  
  setTimeout(resetGame, 3000);
}

function resetGame(){
  console.log(randomArr, counter);
  winBox.style.display = "none";
  randomArr = [];
  counter = 0;
  lengtRandomArr.innerText = randomArr.length;
  console.log(randomArr, counter);
  setTimeout(startGame, 3000);
}