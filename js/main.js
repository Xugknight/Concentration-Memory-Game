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
// let isWinner; // check win condition
// let gameProgress; // remaining cards
// let gameState; // current phase , flipping first card, second card, checking matches, is game still going.
let cards; // Array of 16 shuffled card objects
let firstCard; // First card clicked (card object) or null
let ignoreClicks; // timeouts the click after guesses
let matchAttempts; // number of attempts player has made


  /*----- cached elements  -----*/
const msgEl = document.querySelector('h3');

  /*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);


  /*----- functions -----*/
function init() {
  cards = getShuffledCards();
  firstCard = null;
  matchAttempts = 0;
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
  msgEl.innerHTML = `Failed Matches: ${matchAttempts}`;
  isWinner();
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
  }

  return cards;
};

// Update all impacted state, then call render()
function handleChoice(event) {
  const cardIdx = parseInt(event.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
   // if (firstCard.img === card.img) { // faulty, can click on same card to have it change to "true". Players can game system abusing this.
  if (card.matched || card === firstCard) return; // Prevent clicking the same card
  // checks if player has clicked firstcard, if firstcard has value then this is secondcard
  if (firstCard) {
    // checks if secondcard is same object as first. If true keep value same, if false card.matched set to false.
    card.matched = card === firstCard ? card.matched : false; 
    render(); // Show the second card
    if (firstCard.img === card.img) {
      // Correct match
      firstCard.matched = card.matched = true;
      firstCard = null; // reset first card
    } else {
      // Incorrect match
      ignoreClicks = true; // Block further clicks
      setTimeout(() => {
        firstCard = null; // Reset first card
        render(); // Flip both cards back
      }, 500); // 1-second delay
    }
    // check winner
    isWinner();
    matchAttempts++;
  } else {
    firstCard = card;
  }
  render(); // Render updates to the board
}


// Checks if every card in cards array is set to true. If yes, dispaly win message.
function isWinner() {
  if (cards.every(card => card.matched)) {
      msgEl.innerHTML = 'You Win!';
  }
};

  

// Initialize all state, then call render()
  init();