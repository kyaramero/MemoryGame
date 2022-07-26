'use strict';

// GETTING ELEMENTS
const boardEl = document.querySelector('.board');
const pointsEl = document.querySelector('.move-points');

// POPULATING ARRAY WITH CARDS
const totalCards = 22;
const cards = [];

for (let i = 0; i < totalCards; i++) {
  let card = {};
  card['name'] = `card--${i}`;
  card['src'] = `img/cards/card--${i}.png`;
  cards.push(card);
}

// STORED VARIABLES
const deckForRound = [];

const cardClicked = [];
const cardClickedId = [];

// FLIPPING CARD
const flipCard = function () {
  const cardId = this.getAttribute('data-id');
  cardClicked.push(deckForRound[cardId].name);
  cardClickedId.push(cardId);
  this.setAttribute('src', deckForRound[cardId].src);
  if (cardClicked.length === 2) setTimeout(checkingMatch, 500);
};

// DISPLAYING BLANK CARDS
const displayBoard = function () {
  for (let i = 0; i < 12; i++) {
    let createCard = document.createElement('img');
    createCard.setAttribute('src', 'img/cards/blank.png');
    createCard.setAttribute('data-id', i);
    createCard.addEventListener('click', flipCard);
    boardEl.appendChild(createCard);
  }
};

// SELECTING CARDS
const chosenCards = function () {
  const randomNumbers = [];
  while (randomNumbers.length < 6) {
    let random = Math.trunc(Math.random() * 21) + 1;
    if (randomNumbers.indexOf(random) === -1) randomNumbers.push(random);
  }
  // RANDOM CARDS FOR THE ROUND
  for (let i = 0; i < 6; i++) {
    let cardPicked = {};
    cardPicked['name'] = `card--${randomNumbers[i]}`;
    cardPicked['src'] = `img/cards/card--${randomNumbers[i]}.png`;
    deckForRound.push(cardPicked, cardPicked);
  }
};

// INITIALIZATION STATE
const init = function () {
  pointsEl.textContent = 0;
  let points = 0;

  displayBoard();
  chosenCards();
};
init();
console.log(deckForRound);
