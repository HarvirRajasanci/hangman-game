const $imageBox   = $("#image-box");
const $hintBox    = $("#hint-box");
const $lettersBox = $("#letters-box");
const $guessesBox = $("#guesses-box");
const $keyboardUI = $("#keyboard-ui");

const maxGuesses = 6;

let currentImage     = 0;
let incorrectGuesses = 0;
let correctGuesses   = 0;

let currentWord = "";
let wordHint    = "";

function getRandomWord()
{
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    wordHint    = hint;
}

function initializeKeyboard()
{
    keys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    
    keys.forEach(key => 
    {
        const button = document.createElement("button");
        button.innerText = key;
        $keyboardUI.append(button);
        button.addEventListener("click", e => initializeGame(e.target, key));
    });
}

function initializeLetterBoxes()
{
    let spaces = currentWord.length;

    html = "";

    html += `<ul class="word-letters">`;
    for(let i=0; i < spaces; i++)
    {
        html += `<li class="letter"></li>`;
    }
    html += "</ul>";

    return html;
}

function guessTracker()
{
    const html = `Incorrect Guesses: ${incorrectGuesses} / ${maxGuesses}`;

    return html;
}

function updateImage()
{
    const html = `<img src="../images/hangman-${currentImage}.svg">`;
    return html;
}

function initializeGame(button, clickedLetter)
{
    const lettersList = document.querySelector(".word-letters");

    if(currentWord.includes(clickedLetter))
    {
        [...currentWord].forEach((letter, index) => 
        {
            if(letter === clickedLetter)
            {
                lettersList.querySelectorAll("li")[index].innerText = letter;
                lettersList.querySelectorAll("li")[index].classList.add("guessed");
                correctGuesses++;
            }
        })
    }
    else
    {
        incorrectGuesses++;
        currentImage++;
        $imageBox.html(updateImage());
        $guessesBox.html(guessTracker());
    }
    button.disabled = true;

    if(correctGuesses === currentWord.length) return gameOver(true);
    if(incorrectGuesses === maxGuesses) return gameOver(false);
}

getRandomWord();
initializeKeyboard()
$imageBox.html(updateImage());
$hintBox.html(wordHint);
$lettersBox.html(initializeLetterBoxes());
$guessesBox.html(guessTracker());
