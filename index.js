var level = 0
var userClickedpattern = []
var computerclickedpattern = []
game_starts = false
color = ["green","yellow","red","blue"]

$(document).keydown(function(){
    $("#level-title").text("Level"+ " "+level)
    computerSelection()
    game_starts = true
  })

$(".btn").click(function(){
  playSound(this.id)
  userClickedpattern.push(this.id)
  checkPattern(userClickedpattern.length-1)//when we start length is 1 but index is 0
  console.log(userClickedpattern)
});

function playSound(val){
  var audioFile = val+".mp3"
  console.log(audioFile)
  var audio = new Audio(audioFile)
  audio.play()
  animate(val)
}

function animate(color){
    $("#"+color).addClass("pressed")
    setTimeout(function() {
    $("#" + color).removeClass("pressed")
    }, 100)
}

function computerSelection(){
  userClickedpattern =[]
  level++;
  $("#level-title").text("Level " + level);
  randomChoice = Math.floor(Math.random()*color.length)
  colorChoice = color[randomChoice]
  console.log(colorChoice)
  computerclickedpattern.push(colorChoice)
  playSound(colorChoice)
  animate(colorChoice)
}

function checkPattern(currentLevel){
 if (computerclickedpattern[currentLevel] === userClickedpattern[currentLevel]) {
   if (userClickedpattern.length === computerclickedpattern.length) {
     setTimeout(function() {
       computerSelection();
     }, 1000);
   }
 } else {
   playSound("wrong");
   $("body").addClass("game-over");
   $("#level-title").text("Game Over, Press Any Key to Restart");
   
   setTimeout(function() {
     $("body").removeClass("game-over");
   }, 200);
   
   gameOver();
 }
}

function gameOver(){
  $("body").addClass("game-over")
  level = 0
  computerclickedpattern = []
  userClickedpattern = []
  game_starts = false
}
