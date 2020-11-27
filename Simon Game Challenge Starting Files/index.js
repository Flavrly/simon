let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// starts game
$(document).keypress(function(){
    if(!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// click handler & passes in clicked color to check answer
$("div .btn").click(function(event){
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})



// runs game logic for the picked colors
function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    // animation for chosen color?
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor);

}





// sound handler
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animate pressed button
function animatePress(currentColor){
    $("#" + currentColor).toggleClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


// checks clicked colors
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(() => {
               nextSequence(); 
            }, 1000);
        }
        // handles wrong clicked colors
    } else {
        console.log("no");
        $("h1").text("Game Over Press Any Key to Restart");
        $("body").toggleClass("game-over");
        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 200);
        gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        startOver();
    }
}

// starts game over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}