'use strict';

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
let scores, currentScore, activePlayer, playing = null;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreZeroEl.innerText = 0;
    scoreOneEl.innerText = 0;
    currentZeroEl.innerText = 0;
    currentOneEl.innerText = 0;

    diceEl.classList.add("hidden");
    sectionZeroEl.classList.add("player--active");
    currentOneEl.classList.remove("player--active");
    sectionZeroEl.classList.remove("player--winner");
    sectionZeroEl.classList.remove("player--winner");
    
}

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).innerText = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    sectionZeroEl.classList.toggle("player--active");
    sectionOneEl.classList.toggle("player--active");
}
//
btnRollEl.addEventListener("click", function () {
    if(playing){
      //generating random dice number
      let dice = Math.trunc(Math.random() * 6 + 1);

      //display the dice number
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;
      //condition
      if (dice !== 1) {
        // add current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).innerText =
          currentScore;
      } else {
        //switch player
        switchPlayer();
      }
    }
});

btnHoldEl.addEventListener('click', function (){
    if(playing){
        scores[activePlayer] += currentScore;
        console.log(scores, "score");
        console.log(scores[activePlayer], "active player score");

        document.getElementById(`score--${activePlayer}`).innerText =
          scores[activePlayer];

        if (scores[activePlayer] >= 20) {
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