const $popUpContent = $("#pop-up-content");

let timeoutHandler;

function initializePopup()
{
    html = "";
    html += `<img id="pop-up-img">`;
    html += `<h2 id="pop-up-header"></h2>`;
    html += `<p id="pop-up-message"></p>`;
    html += `<button id="play-again">Play Again?</button>`;
    return html;
}

function gameOver(Victory)
{
    if(Victory)
    {
        $("#pop-up-img").attr("src", "../images/victory.gif");
        $("#pop-up-header").text("Congrats!");
        $("#pop-up-message").html(`You found the word: <strong>${currentWord}</strong>`);
    }
    else
    {
        $("#pop-up-img").attr("src", "../images/lost.gif");
        $("#pop-up-header").text("Game Over!");
        $("#pop-up-message").html(`The correct word was: <strong>${currentWord}</strong>`);
    }

    timeoutHandler = setTimeout(function()
    {
        $("#pop-up").css("display", "block");

        let opacity = 0;
        let fadeInInterval;
        
        fadeInInterval = setInterval(function() 
        {
            opacity = opacity + 0.01;

            $("#pop-up").css("opacity", opacity);
        
            if (opacity >= 1) 
            {
                clearInterval(fadeInInterval);
            }

        }, 1);
    });
}

$popUpContent.on("click", "#play-again", function() 
{
    // Reset game variables
    currentImage     = 0;
    incorrectGuesses = 0;
    correctGuesses   = 0;

    currentWord = "";
    wordHint    = "";

    // Hide the popup
    $("#pop-up").css("display", "none");

    // Reset the game components
    getRandomWord();
    $keyboardUI.find("button").prop("disabled", false);
    $imageBox.html(updateImage());
    const wordHintObject = new DisplayWordHint(wordHint);
    wordHintObject.displayHint();
    $lettersBox.html(initializeLetterBoxes());
    $guessesBox.html(guessTracker());
    $popUpContent.html(initializePopup());
});

$popUpContent.html(initializePopup());
