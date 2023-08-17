'use strict';

let score = document.querySelectorAll(".score")

const roll = document.querySelector(".btn--roll")

const newGame = document.querySelector(".btn--new")

const dice = document.querySelector(".dice")

const currentDice1 = document.getElementById("current--0")

const currentDice2 = document.getElementById("current--1")

const hold = document.querySelector(".btn--hold")


let current = 0

score[0].textContent = 0
score[1].textContent = 0

let totalscore = [0, 0]

let activePlayer = 0

function checkTotal(playerNumber){
    if (totalscore[playerNumber] >= 100 ){
        document.querySelector(`.player--${playerNumber}`).classList.remove("player--active")
        document.querySelector(`.player--${playerNumber}`).classList.add("player--winner")
    }
}

function check(num){
    if (totalscore[num] >= 100 ){
        return true
    }
}

function changeto2(){
    checkTotal(0)
    if (!check(0) && !check(1)){
        document.querySelector(".player--0").classList.remove("player--active");
        document.querySelector(".player--1").classList.add("player--active");
        current = 0;
        currentDice1.textContent = 0;
        activePlayer = 1;
    }
    
}

function changeto1(){
    checkTotal(1)
    if (!check(0) && !check(1)){
        document.querySelector(".player--1").classList.remove("player--active")
        document.querySelector(".player--0").classList.add("player--active")
        current = 0
        currentDice2.textContent = 0
        activePlayer = 0;

    }

}


function rollDice(){

    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    if (diceNumber !== 1 ){
        if (!check(0) && !check(1)){
            dice.classList.remove("hide")   
            dice.src = `dice-${diceNumber}.png`
            current += diceNumber
        }
        
        document.getElementById(`current--${activePlayer}`).textContent = current

    }else if(diceNumber === 1){
        if (!check(0) && !check(1)){
            dice.classList.remove("hide") 
            if (activePlayer === 0){
                if (!check(0)){
                    dice.src = `dice-1.png`
                    changeto2()
                }
                else{
                    document.getElementById(`current--0`).textContent = current
                }
                
            }
            else {
                if (!check(1)){
                    dice.src = `dice-1.png`
                    changeto1()
                }
                else{
                    document.getElementById(`current--1`).textContent = current
                }

            }
        
        }
        
    }
    
}


function holding(){
    if (activePlayer === 0){
        
        if (!check(0)){
            if (!check(0) && !check(1)){
                totalscore[0] += current
            }
            score[0].textContent = totalscore[0]
            changeto2()
        }
        else{
            document.getElementById(`current--0`).textContent = current
        }
    }
    else{
        
        if (!check(0)){
            if (!check(0) && !check(1)){
                totalscore[1] += current
            }
            score[1].textContent = totalscore[1]
            changeto1()
        }
        else{
            document.getElementById(`current--1`).textContent = current
        }
    }   
}

function changeColor(color){
    
    document.querySelector(`.player--${color}`).classList.remove("player--winner")
    document.querySelector(".player--0").classList.add("player--active")
}

function changetodefault(){
    if ( totalscore[0] >= 100 ) {
        changeColor(0)
    }
        
    else if( totalscore[1] >= 100 ) {
        changeColor(1)
    }

    totalscore = [0,0]
    score[1].textContent = totalscore[1]
    score[0].textContent = totalscore[0]
    dice.classList.add("hide")
    activePlayer = 0
}

function newgame(){
    if (activePlayer === 1){
        
        changetodefault() 
        current = 0;
        currentDice2.textContent = 0;
        
    }

    else if ( activePlayer === 0 ) {
        current = 0;
        currentDice1.textContent = 0;
        changetodefault()
    }
    
}


hold.addEventListener('click', holding)


roll.addEventListener('click', rollDice)


newGame.addEventListener('click', newgame)