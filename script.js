"use strict";

//selecting elements

const scoreZeroEl = document.getElementById("score--0");
const scoreOneEl = document.getElementById("score--1");
const currentZeroEl = document.querySelector("#current--0");
const currentOneEl = document.querySelector("#current--1");
const sectionZeroEl = document.querySelector(".player--0");
const sectionOneEl = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");


//initial condition
let activePlayer, currentScore, scores, playing = null;

let init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    scoreZeroEl.innerText = 0;
    scoreOneEl.innerText = 0;
    currentZeroEl.innerText = 0;
    currentOneEl.innerText = 0;

    diceEl.classList.add("hidden");
    sectionZeroEl.classList.add("player--active");
    sectionOneEl.classList.remove("player--active");
    sectionZeroEl.classList.remove("player--winner");
    sectionOneEl.classList.remove("player--winner");
}
init();


let switchPlayer = function(){
    document.querySelector(`#current--${activePlayer}`).innerText = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    sectionZeroEl.classList.toggle("player--active");
    sectionOneEl.classList.toggle("player--active");
}

btnRollEl.addEventListener('click', function(){
    if(playing){
      //generate dice
      let dice = Math.trunc(Math.random() * 6 + 1);

      //display the dice
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;

      //dice == 1
      if (dice !== 1) {
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).innerText =
          currentScore;
      } else {
        switchPlayer();
      }
    }
})

btnHoldEl.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).innerText =
          scores[activePlayer];
        if (scores[activePlayer] >= 100) {
          playing = false;
          diceEl.classList.add("hidden");
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");
        } else {
          switchPlayer();
        }
    }
})

btnNewEl.addEventListener('click', function(){
    init();
})