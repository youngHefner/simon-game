var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

function nextSequence() {
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var buttonPlay=new Audio("sounds/" + randomChosenColour + ".mp3");
    buttonPlay.play();
    level ++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var buttonPlay=new Audio("sounds/" + name + ".mp3");
    buttonPlay.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel) {
    if (currentLevel[currentLevel.length-1]===gamePattern[currentLevel.length-1]) {
        if (userClickedPattern.length===gamePattern.length) {
        setTimeout(function() { nextSequence()},1000);
        }
    } else {
        var gameOverSound=new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

$(document).keypress(function() {
    if (started===false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started=true;
    }
});

$(".btn").click(function () {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern);
});

