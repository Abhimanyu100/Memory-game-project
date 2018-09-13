/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


let allCards = document.getElementsByClassName('card');
let openCard = [];
let allDataArray = [];
let deck = document.getElementsByClassName('deck');
let matchedCards = 0;
let moves = 0;
let clickable = true;


function storeToArray() {
    for (let i = 0; i < allCards.length; i++) {
        allDataArray.push(allCards[i]);
    }
    shuffle(allDataArray);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(allDataArray) {
    var currentIndex = allDataArray.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = allDataArray[currentIndex];
        allDataArray[currentIndex] = allDataArray[randomIndex];
        allDataArray[randomIndex] = temporaryValue;
    }
    pushCardsBack();
    return allDataArray;
}
shuffle(allDataArray);


// push all the shuffled card back to deck
function pushCardsBack() {
    for (let i = 0; i < allDataArray.length; i++) {
        document.querySelector('.card').remove();
    }
    for (let j = 0; j < allDataArray.length; j++) {
        document.querySelector('.deck').appendChild(allDataArray[j]);
    }
}


// click event listener for every card
for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', function () {
        if (clickable === true) {
            this.classList.add('open');
            this.classList.add('show');
            let tempCard = this;
            openCard.push(this);
            if (openCard.length === 2) {
                clickable = false;
                compareCard();
            }
        }
    });
}
// function to compare two cards
function compareCard() {
    let firstCard = openCard[0];
    let secondCard = openCard[1];
    countMove();
    starRating();
    if (firstCard.innerHTML === secondCard.innerHTML) {
        openCard = [];
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matchedCards += 2;
        clickable = true;
        if (matchedCards === 16) {

            youWon();
        }
    } else {
        setTimeout(function () {
            openCard = [];
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            secondCard.classList.remove('show');
            secondCard.classList.remove('open');
            clickable = true;
        }, 500);
    }
}
// move counter function 
function countMove() {
    moves += 1;
    document.querySelector('.moves').innerHTML = moves;
}
// function to be called after the user won the game 
function youWon() {
    document.getElementById('mainDiv').style.display = 'none';
    document.getElementById('modal').style.display = 'block';
    document.querySelector('#result').innerHTML = `You took ${moves} moves to win the Game...`;

}

document.getElementById('replay').addEventListener('click', function () {
    replay();
});
document.getElementById('replayBtn').addEventListener('click', function () {
    replay();
});
// replay function 
function replay() {
    matchedCards = 0;
    clickable = true;
    document.getElementById('modal').style.display = 'none';
    document.getElementById('mainDiv').style.display = 'flex';
    document.getElementsByClassName('card');
    removeClass();
    moves = 0;
    document.querySelector('.moves').innerHTML = 0;
    document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

    shuffle(allDataArray);
}
// function to move all the cards back to its default position 
function removeClass() {
    let card = document.querySelectorAll('.card');
    for (let i = 0; i < 16; i++) {
        card[i].classList.remove('open');
        card[i].classList.remove('match');
        card[i].classList.remove('show');
    }
}
// function for star rating 
function starRating() {
    let starsList = document.querySelector('.stars');
    if (moves === 15) {
        starsList.firstElementChild.remove();
    } else if (moves === 20) {
        starsList.firstElementChild.remove();
    } else if (moves === 28) {
        starsList.firstElementChild.remove();
    }
}

storeToArray();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */