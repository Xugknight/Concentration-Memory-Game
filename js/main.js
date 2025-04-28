  /*----- constants -----*/
// Each of the "card" objects will be copied twice,
// then shuffled and used for the board's cards
const SOURCE_CARDS = [
  {img: 'https://i.imgur.com/ZXPKaiN.jpg', matched: false},
  {img: 'https://i.imgur.com/XMEsZBX.jpg', matched: false},
  {img: 'https://i.imgur.com/6jX1bMT.jpg', matched: false},
  {img: 'https://i.imgur.com/yKdqsBv.jpg', matched: false},
  {img: 'https://i.imgur.com/1BV3HLr.jpg', matched: false},
  {img: 'https://i.imgur.com/QYmN6Hp.jpg', matched: false},
  {img: 'https://i.imgur.com/D5pWE05.jpg', matched: false},
  {img: 'https://i.imgur.com/Ss4Xo3x.jpg', matched: false}
];
const CARD_BACK = 'https://i.imgur.com/WoEmI2M.jpg'; 

  /*----- state variables -----*/
// let board; // track arrangement of cards, and card status(facedown, faceup, matched)
// let matchAttempts; // number of attempts player has made
// let isWinner; // check win condition
// let gameProgress; // remaining cards
// let gameState; // current phase , flipping first card, second card, checking matches, is game still going.
let cards; // Array of 16 shuffled card objects
let firstCard; // First card clicked (card object) or null
let ignoreClicks;


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);


  /*----- functions -----*/
init();

function init() {
  cards = getShuffledCards();
  firstCard = null;
  ignoreClicks = false;
  render();
  // matchAttempts = 0;
  // isWinner = false; 
};

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
    // imgEl.src = card.img; // Showing card face for testing.
    imgEl.src = src;
  });
};

function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({...card}, {...card}); // {...} using spread operator. Takes properties from card object and spreads them into new objects.
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
    // console.log(card);
  }

  return cards;
};

// Update all impacted state, then call render()
function handleChoice(event) {
  const cardIdx = parseInt(event.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
  if (firstCard) {
    if (firstCard.img === card.img) { // compares img string since it is two different objects
      // correct match
      firstCard.matched = card.matched = true; // sets true to card and first card
      firstCard = null; // resets firstcard so next selection can be made
    }

  } else {
    firstCard = card;
  }
  render();
  // console.log(card); // testing
};

  // Initialize all state, then call render()