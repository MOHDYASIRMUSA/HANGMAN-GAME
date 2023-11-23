const words = ["hangman", "javascript", "programming", "developer"];
let selectedWord = getWordByDifficulty('easy');
let guessedWord = Array(selectedWord.length).fill("_");
let wrongLetters = [];
let attemptsLeft = 6;
let score = 0;

function displayWord() {
    document.getElementById("word-display").textContent = guessedWord.join(" ");
}

function displayWrongLetters() {
    document.getElementById("wrong-letters").textContent = `Wrong letters: ${wrongLetters.join(", ")}`;
}

function displayGameInfo() {
    document.getElementById("attempts-left").textContent = attemptsLeft;
    document.getElementById("score").textContent = score;
}

function makeGuess() {
    const inputElement = document.getElementById("letter");
    const letter = inputElement.value.toLowerCase();

    if (!letter || !/^[a-zA-Z]$/.test(letter)) {
        alert("Please enter a valid letter.");
        return;
    }

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        wrongLetters.push(letter);
        attemptsLeft--;

        if (attemptsLeft === 0) {
            alert(`Sorry, you've run out of attempts. The word was "${selectedWord}". Your score is ${score}.`);
            resetGame();
        }
    }

    if (guessedWord.join("") === selectedWord) {
        alert(`Congratulations! You guessed the word! Your score is ${score}.`);
        resetGame();
    }

    displayWord();
    displayWrongLetters();
    displayGameInfo();
    inputElement.value = "";
}

function resetGame() {
    attemptsLeft = 6;
    score = 0;
    selectedWord = getWordByDifficulty(document.getElementById("difficulty").value);
    guessedWord = Array(selectedWord.length).fill("_");
    wrongLetters = [];
    displayWord();
    displayWrongLetters();
    displayGameInfo();
}

function getWordByDifficulty(difficulty) {
    const filteredWords = words.filter(word => {
        if (difficulty === 'easy') return word.length <= 6;
        if (difficulty === 'medium') return word.length > 6 && word.length <= 10;
        if (difficulty === 'hard') return word.length > 10;
    });

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

// Initial display
displayWord();
displayWrongLetters();
displayGameInfo();
