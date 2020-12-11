var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// ----start function---  event listener on any key, that call to nextSequence function on the first time.
// checking if the gmae has started already, if no - any key will start the game.
// after the game has started by the key, "started" changes to true.

var started = false;

$("body").keydown(function(){
  if (started===false){
    nextSequence();
    // the next line toggle the boolean "started" to false/true.
    started =!(started) ;
  }
});

function nextSequence(){
  var randomNumber = Math.round(Math.random()*3);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level ++;
  $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(this);
  if (checkAnswer(userClickedPattern.length -1) == true){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern=[];
      },700);
    }
  }
  else{
    gameOver();
    startOver()
  }
});

function playSound(name){
  var Sound = new Audio ("sounds/" +name +".mp3");
  Sound.play();
}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");
  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    return true;
  }
  else{
    return false;
  }
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  playSound("wrongFFF");
    $("#level-title").html("Game over, press any key to restart");
}

function startOver(){
  userClickedPattern=[];
  gamePattern=[];
  level=0;
  started = false;
}
