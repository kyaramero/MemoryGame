'use strict';

// selectors
const board = document.querySelector('.board');
const movesEl = document.querySelector('.move-points');
const btnRestart = document.querySelector('.btn-restart');

// cards information
const numberOfCards = 21;
const pairsForRound = 6;

// DECK VARIABLES
let fullDeck;
let halfdeck;
let deckForRound;
let playeableCards;
let moves;
let play;
let lastFlipped;
let selectedCard;
let foundCards;

const generateBoard = function () {
  if (play) {
    // building deck of cards
    for (let i = 0; i < numberOfCards; i++) {
      const card = `img/cards/card--${i}.png`;
      fullDeck.push(card);
    }
    const cloneDeck = [...fullDeck];

    // picking cards for round
    for (let i = 0; i < pairsForRound; i++) {
      const randomIndex = Math.trunc(Math.random() * cloneDeck.length);
      halfdeck.push(cloneDeck[randomIndex]);
      cloneDeck.splice(randomIndex, 1);
    }

    // duplicating and shuffling deck
    const deck = [...halfdeck, ...halfdeck];
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.trunc(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deckForRound = deck;
  }
};

// DISPLAY BOARD
const displayBoard = function () {
  for (let i = 0; i < deckForRound.length; i++) {
    const card = `<div class="card">
    <div class="card-face back-card" id="card--${i}"><img src="${deckForRound[i]}"></div>
    <div class="card-face front-card"><img src="img/cards/blank.png"></div>
    </div>`;
    playeableCards.push(card);
    board.innerHTML += card;
  }
  console.log(playeableCards);
};

// EVENT LISTENER TO FLIP
const cardFlip = function () {
  if (play) {
    document.querySelectorAll('.card').forEach((item) => {
      item.addEventListener('click', function () {
        // CLICK ONLY IF THE CARD ISN'T FLIPPED
        if (!item.classList.contains('flipped-card')) {
          // ONLY FLIP TWO FOR ROUND
          item.classList.add('flipped-card');
          let backCard = item.getElementsByClassName('back-card');
          lastFlipped.push(backCard[0].innerHTML);
          selectedCard.push(item);
          // AFTER CLICKING IN TWO CARDS
          if (lastFlipped.length === 2) {
            moves++;
            movesEl.textContent = moves;
            setTimeout(checkForMatch, 600);
          }
        }
      });
    });
  }
};

// CEHCKING IF MATCHES
const checkForMatch = function () {
  if (lastFlipped[0] === lastFlipped[1]) {
    console.log('It matches');
    foundCards++;
    if (selectedCard.length === pairsForRound * 2) {
      play = false;
    }
  } else {
    console.log('It doesnt');
    selectedCard[0].classList.toggle('flipped-card');
    selectedCard[1].classList.toggle('flipped-card');
  }
  selectedCard = [];
  lastFlipped = [];
};

// INITIALIZATION
const init = function () {
  fullDeck = [];
  halfdeck = [];
  deckForRound = [];
  playeableCards = [];
  lastFlipped = [];
  selectedCard = [];

  foundCards = 0;
  moves = 0;
  play = true;

  board.innerHTML = ``;
  movesEl.textContent = 0;

  generateBoard();
  displayBoard();
  cardFlip();
};

init();

// REPLAY
btnRestart.addEventListener('click', init);
