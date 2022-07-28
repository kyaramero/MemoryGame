// 'use strict';

// // GETTING ELEMENTS
// const boardEl = document.querySelector('.board');
// const pointsEl = document.querySelector('.move-points');

// // POPULATING ARRAY WITH CARDS
// const totalCards = 21;
// const cards = [];

// for (let i = 0; i < totalCards; i++) {
//   let card = {};
//   card['name'] = `card--${i}`;
//   card['src'] = `img/cards/card--${i}.png`;
//   cards.push(card);
// }

// // STORED VARIABLES
// const deckForRound = [];

// const cardClicked = [];
// const cardClickedId = [];

// // FLIPPING CARD
// const flipCard = function () {
//   const cardId = this.getAttribute('data-id');
//   cardClicked.push(deckForRound[cardId].name);
//   cardClickedId.push(cardId);
//   this.setAttribute('src', deckForRound[cardId].src);
//   if (cardClicked.length === 2) setTimeout(checkingMatch, 500);
// };

// // CHECKING MATCH
// const checkingMatch = function () {};

// // DISPLAYING BLANK CARDS
// const displayBoard = function () {
//   for (let i = 0; i < 12; i++) {
//     let createCard = document.createElement('img');
//     createCard.setAttribute('src', 'img/cards/blank.png');
//     createCard.setAttribute('data-id', i);
//     createCard.addEventListener('click', flipCard);
//     boardEl.appendChild(createCard);
//   }
// };

// // SELECTING CARDS
// const chosenCards = function () {
//   const randomNumbers = [];
//   while (randomNumbers.length < 6) {
//     let random = Math.trunc(Math.random() * 20) + 1;
//     if (randomNumbers.indexOf(random) === -1) randomNumbers.push(random);
//   }
//   // RANDOM CARDS FOR THE ROUND
//   for (let i = 0; i < 6; i++) {
//     let cardPicked = {};
//     cardPicked['name'] = `card--${randomNumbers[i]}`;
//     cardPicked['src'] = `img/cards/card--${randomNumbers[i]}.png`;
//     deckForRound.push(cardPicked, cardPicked);
//   }
// };

// // INITIALIZATION STATE
// const init = function () {
//   pointsEl.textContent = 0;
//   let points = 0;

//   displayBoard();
//   chosenCards();
// };
// init();
// console.log(deckForRound);

// SELECTORS
const board = document.querySelector('.board');

// DECK VARIABLES
const fullDeck = [];
const halfdeck = [];
let deckForRound = [];

// INFORMATION
const numberOfCards = 21;
const pairsForRound = 6;

const generateBoard = function () {
  // POPULATING FULL DECK
  for (let i = 0; i < numberOfCards; i++) {
    const card = `img/cards/card--${i}.png`;
    fullDeck.push(card);
  }
  const cloneDeck = [...fullDeck];
  // RANDOM CARDS
  for (let i = 0; i < pairsForRound; i++) {
    const randomIndex = Math.trunc(Math.random() * cloneDeck.length);
    halfdeck.push(cloneDeck[randomIndex]);
    cloneDeck.splice(randomIndex, 1);
  }
  // DUPLICATING AND SHUFFLING DECK
  const deck = [...halfdeck, ...halfdeck];
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.trunc(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  deckForRound = deck;
  return deckForRound;
};

// DISPLAY BOARD
const displayBoard = function () {
  for (let i = 0; i < deckForRound.length; i++) {
    const card = `<div class="card">
    <div class="card-face back-card"><img src="${deckForRound[i]}"></div>
    <div class="card-face front-card" id="card--${i}"><img src="img/cards/blank.png"></div>
    </div>`;
    board.innerHTML += card;
  }
};

// FLIP CARDS
const flipCard = function () {
  document.querySelectorAll('.card').forEach((item) => {
    item.addEventListener('click', function () {
      item.classList.toggle('flipped-card');
    });
  });
};

// INITIALIZATION
const init = function () {
  generateBoard();
  displayBoard();
  flipCard();
};

init();
