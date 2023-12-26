// All possible button colors:
var buttonColours = ["red", "blue", "green", "yellow"];

// Game pattern is empty:
var gamePattern = [];

// User didn't click anything:
var userClickedPattern = [];

// Game didn't start yet:
var started = false;

// Initial level of the game:
var level = 0;

// When player presses any button:
$(document).keypress(function() {
  // And if  the game already started:
  if (!started) {
    
    // Show on the screen that player is on the Level 0 (for very short time):
    $("#level-title").text("Level " + level);

    // Run function where another colored button is added to the game pattern:
    nextSequence();

    // Game started:
    started = true;

  }
});

// What happens when user clicks on one of the four color buttons:
$(".btn").click(function() {
  // Add user chosen button color (same as it's id) to the user clicked pattern:
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // Play button specific sound:
  playSound(userChosenColour);
  // Animate pressing player chosen color:
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence:
  checkAnswer(userClickedPattern.length-1);
});



// Create a new function called checkAnswer(), it should take one input with the name currentLevel:
function checkAnswer(currentLevel) {

  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong":
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement:
    if (userClickedPattern.length === gamePattern.length){

      // Call nextSequence() after a 1000 millisecond delay:
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong:
    playSound("wrong");

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds:
     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong:
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Call startOver() if the user gets the sequence wrong:
    startOver();
  }

}

// Function that chooses next random color for player to memorize in the sequence:
function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level:
  userClickedPattern = [];

  // Move one level up:
  level++;

  // Show new level on the game screen:
  $("#level-title").text("Level " + level);

  // Choose random color from four avaliable colors:
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  //Add randomly chosen for player color into the game pattern sequence:
  gamePattern.push(randomChosenColour);
  
  //Create effect of the flash when next color button is shown to the player:
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play sound specific for that same next color button shown to the player:
  playSound(randomChosenColour);

 
}

// Function to start game over:
function startOver() {
   // Reset values of level, gamePattern and started variables (to their initial values):
   level = 0;
   gamePattern = [];
   started = false;
}

// Function for playing sounds for each time button is pressed or if wrong button pressed:
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour:
function animatePress(currentColor) {

  // Use jQuery to add this pressed class to the button that gets clicked inside animatePress():
  $("#" + currentColor).addClass("pressed");

  // Use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds:
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
