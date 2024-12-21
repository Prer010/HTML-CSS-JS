var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;


$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }  
});


function nextSequence() {

    userClickedPattern = [];
    
    $("#level-title").text("Level " + ++level);
    
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    }


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel) {
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function () {
          nextSequence();
        }, 1000);
}
}

else {
console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!, Press Any Key to Restart!");
    startOver();
}

}

function startOver() {
started = false;
gamePattern = [];
level = 0;
}

function playSound(name) {
    var audio = new Audio("./sounds/" +name+ ".mp3");
    audio.play();
}

function animatePress(currentColour) {
$("#" +currentColour).addClass("pressed");
setTimeout(function () {
    $("#" +currentColour).removeClass("pressed");
  }, 100);
}
