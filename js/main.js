/*----- constants -----*/
const SOURCE_CARDS = [
  { img: 'https://i.imgur.com/Y2IWUda.jpeg', matched: false },
  { img: 'https://i.imgur.com/0FXcXsP.jpeg', matched: false },
  { img: 'https://i.imgur.com/30qIWHs.jpeg', matched: false },
  { img: 'https://i.imgur.com/6FqaEdk.jpeg', matched: false },
  { img: 'https://i.imgur.com/m2cfZQZ.jpeg', matched: false },
  { img: 'https://i.imgur.com/jEdx7o9.jpeg', matched: false },
  { img: 'https://i.imgur.com/MnfkkR7.jpeg', matched: false },
  { img: 'https://i.imgur.com/akU3BZM.jpeg', matched: false },
  { img: 'https://i.imgur.com/8oN1YY5.jpeg', matched: false },
  { img: 'https://i.imgur.com/YAM6N2Y.jpeg', matched: false },
  { img: 'https://i.imgur.com/6CiCtxJ.jpeg', matched: false },
  { img: 'https://i.imgur.com/cMsrzQ8.jpeg', matched: false }
];
const CARD_BACK = 'https://i.imgur.com/MNVTu4Z.png';


/*----- state variables -----*/
let cards;
let firstCard;
let ignoreClicks;
let matchAttempts;
let gameLoss;


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
  gameLoss = false;
  render();
};

function render() {
  cards.forEach(function (card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card.flipped) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  msgEl.innerHTML = gameLoss ? 'You Died' : `Failed Matches: ${matchAttempts}`;
  isWinner();
};

function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card });
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
  if (isNaN(cardIdx) || ignoreClicks || gameLoss) return;
  const card = cards[cardIdx];
  if (firstCard === card) return;
  if (firstCard) {
    card.flipped = true;
    render();

    if (firstCard.img === card.img) {
      // correct match
      firstCard.matched = card.matched = true;
      firstCard = null;
      render();
    } else {
      ignoreClicks = true;
      setTimeout(() => {
        firstCard.flipped = card.flipped = false;
        firstCard = null;
        ignoreClicks = false;
        render();
      }, 1200);
      matchAttempts++;
      if (matchAttempts >= 12) {
        gameLoss = true;
      }
    }
  } else {
    card.flipped = true;
    firstCard = card;
    render();
  }
};

function isWinner() {
  if (cards.every(card => card.matched)) {
    msgEl.innerHTML = 'You Win!';
  }
};


// Initialize all state, then call render()
init();