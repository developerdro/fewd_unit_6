const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;


const startGameBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
startGameBtn.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});


const phrases = [
    'A Piece of Cake',
    'Back to Square One',
    'Between a Rock and a Hard Place',
    'Close But No Cigar',
    'Curiosity Killed The Cat'
];


// Gets a random phrase
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random()*arr.length)];
    return randomPhraseAsArray = [...randomPhrase]
};


const phraseArray = getRandomPhraseAsArray(phrases);


// Add a phrase to display
function addPhraseToDisplay(arr) {
    for ( let i = 0; i < arr.length; i++) {
        const li = document.createElement('LI');
        const letter = document.createTextNode(`${arr[i]}`);
        if ( arr[i] === " ") {
            li.className = "space"
        } else {
            li.className = "letter"
        }
        li.appendChild(letter);
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(li)
    }
};


addPhraseToDisplay(phraseArray);

// Check if letter clicked matches letter in phrase
function checkLetter (param1) {
    const letterClass = document.getElementsByClassName('letter');
    let match = 0;
    for ( let i = 0; i < letterClass.length; i++) {
        if ( param1.toLowerCase() === letterClass[i].textContent.toLowerCase() ) {
            match++;
        }
    };
    if (match > 0) {
        for ( let i = 0; i < letterClass.length; i++ ) {
            if ( param1.toLowerCase() === letterClass[i].textContent.toLowerCase() ) {
                letterClass[i].className += " show";
            };
        };
        return param1;
    } else {
        return null;
    };
};


// Listen to Keyboard 
qwerty.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.setAttribute("disabled", "");
        const letterFound = checkLetter(e.target.textContent);
        if ( letterFound === null) {
            missed++;
            const lives = missed - 1;
            const scoreboard = document.querySelector('#scoreboard ol');
            const tries = scoreboard.getElementsByTagName('li');
            tries[lives].style.display = 'none';
        }
        checkWin();
    }
});


// Check If Game is won or lose 
function checkWin () { 
    const countShow = document.getElementsByClassName('show').length;
    const countLetter = document.getElementsByClassName('letter').length;
    if ( countLetter === countShow) {
        // Win Game
        const win = document.createElement('div');
        const winMessage = document.createElement('h2');
        const newGameBtn = document.createElement('a');
        win.setAttribute('id', 'overlay');
        win.setAttribute('class', 'win endGame');
        winMessage.setAttribute('class', 'title');
        winMessage.innerHTML = 'WINNER! &#128512;';
        newGameBtn.setAttribute('class', 'btn__reset');
        newGameBtn.innerHTML = 'New Game';
        main.appendChild(win);
        win.appendChild(winMessage);
        win.appendChild(newGameBtn);
        newGameBtn.addEventListener('click', e => {
            newGame();
        });
        
    };
    if ( missed >= 5) {
        // Lose Game 
        const lose = document.createElement('div');
        const loseMessage = document.createElement('h2');
        const newGameBtn = document.createElement('a');
        lose.setAttribute('id', 'overlay');
        lose.setAttribute('class', 'lose endGame');
        loseMessage.setAttribute('class', 'title');
        loseMessage.innerHTML = 'TRY AGAIN! &#128532;';
        newGameBtn.setAttribute('class', 'btn__reset');
        newGameBtn.innerHTML = 'New Game';
        main.appendChild(lose);
        lose.appendChild(loseMessage);
        lose.appendChild(newGameBtn);
        newGameBtn.addEventListener('click', e => {
            newGame();
        });
    };
};


const main = document.querySelector('.main-container');


// Delete Phrase
function deletePhrase () {
    const ul = document.querySelector('#phrase ul');
    const listLength = ul.children.length;
    for ( let i = 0; i < listLength; i++) {
        ul.removeChild(ul.children[0]);
    };
};


// Reset Keyboard
function resetKeyboard () {
    const keyboard = document.getElementsByClassName('keyrow');
    for ( let i = 0; i < keyboard.length; i++) {
        const keyLine = keyboard[i];
        const keys = keyLine.getElementsByTagName('button');
        for ( let j = 0; j < keys.length; j++) {
            keys[j].removeAttribute('class');
            keys[j].removeAttribute('disabled');
        };
    };
};


// New Game 
function newGame() {
    getRandomPhraseAsArray(phrases);
    const phraseArray = getRandomPhraseAsArray(phrases);
    deletePhrase();
    resetKeyboard();
    addPhraseToDisplay(phraseArray);
    missed = 0;
    const scoreboard = document.querySelector('#scoreboard ol');
    const tries = scoreboard.getElementsByTagName('li');
    for ( let i = 0; i < tries.length; i++) {
        tries[i].removeAttribute('style');
    };
    const endGame = document.querySelector('.endGame');
    main.removeChild(endGame);
};