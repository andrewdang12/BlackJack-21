/* ----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*---- app's state (variables)------ */
let cards;
let shuffledDeck;
let playerHand;
let dealerHand;
dealerScore = 0;
playerScore = 0;


/*----  cached element references ----- */
const dealerEl = document.querySelector('#dcards');
const playerEl = document.querySelector('#pcards');
const playEl = document.querySelector('#play');h
const hitEl = document.querySelector('#hit');
const playagEl = document.querySelector('#playag');
const shuffledContainer = document.getElementById('shuffled-deck-container');

/* ----- event listeners ----- */

playEl.addEventListener('click', );
hitEl.addEventListener('click', );
playagEl.addEventListener('click', );
document.querySelector('button').addEventListener('click', renderShuffledDeck);

/* ----- functions ------ */
init();

function init(){


}




function renderShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  const cardsHtml = deck.reduce(function(html, card) {
    return html + `<div class="card ${card.face}"></div>`;
  }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderShuffledDeck();


//display two cards for both player and dealer

function getHand(shuffledDeck){
  randomHand = Math.floor((Math.random() * shuffledDeck.length));
    return shuffledDeck[randomHand];

}

function play(){
  playerCards = [getHand(shuffledDeck), getHand(shuffledDeck)];
  dealerCards = [gethand(shuffledDeck), getHand(shuffledDeck)];
}

play();
console.log(playerCards);
console.log(dealerCards);