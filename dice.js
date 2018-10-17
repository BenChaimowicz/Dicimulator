"use strict";
class Dice {
    constructor() {
        this._totalRolls = 0;
        this._sameRolls = 0;
        this._avgRoll = 0;
        this._diceRolls = 0;
        this._sumOfAllRolls = 0;
        this.AllDice = [];
        this._rollHistory = [];
        this.input = document.querySelector('#numOfDice');
        this.btn = document.querySelector('#rollBtn');
        this.imgContainer = document.querySelector('#imgContainer');
        this.statsContainer = document.querySelector('#statsContainer');
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
    logRoll(dicenum, rollsum) {
        this._rollHistory.push([dicenum, rollsum]);
        this._avgRoll = this.avgRoll();
        this._lastSum = rollsum;
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
        this._totalRolls++;
        this.logRoll(this.diceNum, rollSum);
    }
    playSound(num, min, max, rolls) {
        let minmax = false;
        if (num == max) {
            minmax = true;
            yeah.load();
            yeah.play();
        }
        if (num == min || num == min + (1 * this.diceNum)) {
            minmax = true;
            shit.load();
            shit.play();
        }
        if (this.allSame(rolls) == true && minmax == false) {
            yay.load();
            yay.play();
        }
        minmax = false;
    }
    allSame(array) {
        let firstI = array[0];
        if (array.length == 1) {
            return false;
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i] != firstI)
                return false;
        }
        this._sameRolls++;
        return true;
    }
    avgRoll() {
        let diceRolls = 0;
        let rollSums = 0;
        for (let i = 0; i < this._rollHistory.length; i++) {
            diceRolls += this._rollHistory[i][0];
            rollSums += this._rollHistory[i][1];
        }
        this._diceRolls = diceRolls;
        this._sumOfAllRolls = rollSums;
        return (rollSums / diceRolls);
    }
    refresh() {
        this.btn.disabled = true;
        this.input.disabled = true;
        this.initDice();
        this.rollAll();
        this.postStats();
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
    postStats() {
        let str1 = 'Sum: ' + this._lastSum + '<br>';
        let str2 = 'Total times rolled: ' + this._totalRolls + '<br>';
        let str3 = 'Total dice rolled: ' + this._diceRolls + '<br>';
        let str4 = 'Sum of all rolls: ' + this._sumOfAllRolls + '<br>';
        let str5 = 'Total roll average: ' + this._avgRoll.toFixed(2) + '<br>';
        this.statsContainer.innerHTML = str1 + str2 + str3 + str4 + str5;
    }
}
