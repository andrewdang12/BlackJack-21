/* ----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];



/*---- app's state (variables)------ */

let cardsDrawn = 0;

let player = {
  hand: [],
  score: 0
}

let dealer = {
  hand: [],
  score: 0
}



/*----  cached element references ----- */
const dealerEl = document.querySelector('#dcards');
const playerEl = document.querySelector('#pcards');

const playEl = document.querySelector('#play');
const hitEl = document.querySelector('#hit');
const stayEl = document.querySelector('#stay');

stayEl.disabled = true;
hitEl.disabled = true;


/* ----- event listeners ----- */

playEl.addEventListener('click', replay);
hitEl.addEventListener('click', hit);
stayEl.addEventListener('click', stay)



/* ----- functions ------ */


function restart(){
  player.hand = [];
  player.score = 0;
  dealer.hand = [];
  dealer.score = 0;
  deck.create();
  deck.shuffle();
  playEl.disabled = false;
  hitEl.disabled = true;
  stayEl.disabled = true;
  
}


let deck  = {
    deckArray: [],
    create: function(){
     let suits = ['s', 'c', 'd', 'h'];
     let ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
      for(let s = 0; s<suits.length; s++){
        for(let r = 0; r<ranks.length; r++){
          deck.deckArray[s*13 + r] = {
            suit: suits[s],
            rank: ranks[r],
            value: (parseInt(r) ? parseInt(r): 10)
          };
        }
      }
    },

    shuffle: function(){
      for(let i=0; i<deck.deckArray.length; i++){
        let rndm = Math.floor(Math.random()*deck.deckArray.length);
        let temp = deck.deckArray[rndm];
        deck.deckArray[rndm] = deck.deckArray[i];
        deck.deckArray[i] = temp;
      }
    }
};

deck.create();
deck.shuffle();
console.log(deck.deckArray)

function cardValue(ace){
  let cardArray = [],
  sum = 0,
  aceVal = 0;
  cardArray = ace;
  for(i=0; i<cardArray.length; i++){
    if(cardArray[i].ranks === 'K' || cardArray[i].ranks === 'Q' || cardArray[i].ranks === 'J'){
      sum += 10;
    }else if(cardArray[i].ranks === 'A'){
      sum += 11;
      aceVal += 1;
    }else {
      sum += cardArray[i].rank;
    }
  }
  while (aceVal > 0 && sum > 21){
    sum -= 10;
    aceVal -= 1;
  }
  return sum;
}


function gamePlay(){
  if(player.score === 21){
    document.querySelector('#phrase').innerHTML = 'Blackjack!!! Congratulations Next hand?';
    restart();
  }
  if(dealer.score === 21){
    document.querySelector('#phrase').innerHTML = "Unlucky!! Dealer won. Play again?"
    restart();
  }
  if(player.score > 21){
    document.querySelector('#phrase').innerHTML = "Bust!! You lost. Play again?"
    restart();
  }
  if(dealer.score >= 17 && dealer.score < 21 && player.score === dealer.score){
    document.querySelector('#phrase').innerHTML = 'Push!! You tied with the Dealer. Play again?'
    restart();
  }
  if(dealer.score >= 17 && player.score < 21 && player.score > dealer.score){
    document.querySelector('#phrase').innerHTML = 'You won!!! Play again?'
    restart();
  } 
  if(dealer.score >=17 && player.score > 21 && player.score){
    document.querySelector('#phrase').innerHTML = 'Unlucky!! Dealer won. Play again?'
    restart();
  }
}

function replay(){
  playEl.disabled = true;
  hitEl.disabled = false;
  stayEl.disabled = false;
  hit();
  hit();
  dealerPull();
  dealerPull();
 // gamePlay();
  render();
}



function hit(){
  player.hand.push(deck.deckArray[cardsDrawn]);
  player.score = cardValue(player.hand);
  //document.querySelector('#pcards').innerHTML = JSON.stringify(player.hand);
  document.querySelector('#pscore').innerHTML = player.score;
  cardsDrawn += 1;
  if (cardsDrawn > 2){
    gamePlay();
  }
}

function dealerPull(){
  dealer.hand.push(deck.deckArray[cardsDrawn]);
  dealer.score = cardValue(dealer.hand);
  //document.querySelector('#dcards').innerHTML = JSON.stringify(dealer.hand);
  document.querySelector('#dscore').innerHTML = dealer.score;
  cardsDrawn += 1;
}

function stay(){
  while(dealer.score<17){
    dealerPull();
  }
  gamePlay();
}

function render(){
 let dcards = document.getElementById('dcards');
 let pcards = document.getElementById('pcards');
 console.log(dealer.hand);
 
 for(let i = 0; i<dealer.hand.length;i++){
   let card = document.createElement('div')

  card.classList.add('card')
  card.classList.add(`${dealer.hand[i].suit}${dealer.hand[i].rank}`)
  dcards.append(card)
 }

 for(let i = 0; i<player.hand.length;i++){
   let card2 = document.createElement('div')
  card2.classList.add('card')
  card2.classList.add(`${player.hand[i].suit}${player.hand[i].rank}`)
  pcards.append(card2)
 }

}

