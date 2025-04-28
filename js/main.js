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
let board; // track arrangement of cards, and card status(facedown, faceup, matched)
let matchAttempts; // number of attempts player has made
let isWinner; // check win condition
let gameProgress; // remaining cards
let gameState; // current phase , flipping first card, second card, checking matches, is game still going.

  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/
init() {
  matchAttempts = 0;
  isWinner = false; 
};


  // Initialize all state, then call render()