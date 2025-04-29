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
const resetBtn = document.querySelector('#reset');

  /*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
resetBtn.addEventListener('click', init);


  /*----- functions -----*/
function init() {
  cards = getShuffledCards();
  firstCard = null;
  matchAttempts = 0;
  ignoreClicks = false;
  render();
};

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card.flipped) ? card.img : CARD_BACK;
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
  if (firstCard === card) return; // this "should" prevent clicking the same card and having it change to true.
  
  if (firstCard) {
      // checks if a firstcard has been selected. if not null then player is choosing secondcard
      card.flipped = true; // temporarily marks second card as flipped so render will show the secondcard
      render(); // show both cards

      if (firstCard.img === card.img) { // compares img string since it is two different objects
      // correct match
      firstCard.matched = card.matched = true; // sets true to card and firstcard
      firstCard = null; // resets the value of firstcard
      render(); // update display to show matched cards
      } else {
      ignoreClicks = true; // if card is not matched we set click timeout to (x) seconds
      setTimeout(() => { 
        firstCard.flipped = card.flipped = false; // cards not matching, hide them again.
        firstCard = null; // then set firstcard and click timeout back to null/false
        ignoreClicks = false;
        render(); // call render to update display
      }, 1000); // 1 second(s)
      matchAttempts++; // Add to failed attempts counter
    }
  } else { // runs if firstcard is null, updating to show the first card selection.
    card.flipped = true;
    firstCard = card;
    render();
  }
};


// Checks if every card in cards array is set to true. If yes, dispaly win message.
function isWinner() {
  if (cards.every(card => card.matched)) {
      msgEl.innerHTML = 'You Win!';
  }
};

  

// Initialize all state, then call render()
  init();