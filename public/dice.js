"use strict";
class Dice {
    constructor() {
        this.AllDice = [];
        this.input = document.querySelector('#numOfDice');
        this.btn = document.querySelector('#rollBtn');
        this.imgContainer = document.querySelector('#imgContainer');
        this.diceNum = parseInt(this.input.value);
    }
    initImageBoxes() {
        for (let i = 1; i <= 10; i++) {
            let imgBox = document.createElement('img');
            imgBox.id = 'img' + i;
            imgBox.src = './Images/1.png';
            this.imgContainer.appendChild(imgBox);
        }
    }
    initDice() {
        this.diceNum = parseInt(this.input.value);
        this.AllDice = [];
        for (let i = 1; i <= this.diceNum; i++) {
            let imgBox = document.querySelector('#img' + i);
            this.AllDice.push(new Die(6, imgBox));
        }
    }
    rollAll() {
        let rolls = [];
        let rollSum = 0;
        let minimal = (this.diceNum) * 1;
        let maximal = (this.diceNum) * 6;
        for (let i = 0; i < this.AllDice.length; i++) {
            let currRoll = this.AllDice[i].roll();
            rollSum += currRoll;
            rolls.push(currRoll);
        }
        setTimeout(() => { this.playSound(rollSum, minimal, maximal, rolls); }, 2000);
        console.log(rollSum);
    }
    playSound(num, min, max, rolls) {
        let minmax = false;
        if (num == max) {
            minmax = true;
            yeah.load();
            yeah.play();
        }
        if (num == min || num == min + 1) {
            minmax = true;
            shit.load();
            shit.play();
        }
        if (allSame(rolls) == true && minmax == false) {
            yay.load();
            yay.play();
        }
        function allSame(array) {
            let firstI = array[0];
            if (array.length == 1) {
                return false;
            }
            for (let i = 0; i < array.length; i++) {
                if (array[i] != firstI)
                    return false;
            }
            return true;
        }
        minmax = false;
    }
    refresh() {
        this.btn.disabled = true;
        this.input.disabled = true;
        this.initDice();
        this.rollAll();
        diceroll.load();
        diceroll.play();
        setTimeout(() => { this.btn.disabled = false; this.input.disabled = false; }, 2500);
    }
    bindBtn() {
        this.btn.setAttribute('onclick', 'DiceMain.refresh()');
        this.input.oninput = function () { DiceMain.hideImages(); };
    }
    hideImages() {
        this.diceNum = parseInt(this.input.value);
        for (let i = 10; i > 0; i--) {
            let imgBox = document.querySelector('#img' + i);
            if (i > this.diceNum) {
                imgBox.style.display = 'none';
            }
            else {
                imgBox.style.display = 'inline-block';
            }
        }
    }
}
