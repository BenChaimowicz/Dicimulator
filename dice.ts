class Dice {

    private _totalRolls: number = 0;
    private _sameRolls: number = 0;
    private _avgRoll: number = 0;
    private _lastSum: number;
    private _diceRolls: number = 0;
    private _sumOfAllRolls: number = 0;
    AllDice: Die[] = [];
    private _rollHistory: number[][] = [];
    diceNum: number;
    input: HTMLInputElement = document.querySelector('#numOfDice');
    btn: HTMLButtonElement = document.querySelector('#rollBtn');
    imgContainer: HTMLDivElement = document.querySelector('#imgContainer');
    statsContainer: HTMLDivElement = document.querySelector('#statsContainer');

    constructor() {
        this.diceNum = parseInt(this.input.value);
    }

    initImageBoxes() {
        for (let i = 1; i <= 10; i++) {
            let imgBox: HTMLImageElement = document.createElement('img');
            imgBox.id = 'img' + i;
            imgBox.src = './Images/1.png';
            this.imgContainer.appendChild(imgBox);
        }
    }

    initDice() {
        this.diceNum = parseInt(this.input.value);
        this.AllDice = [];
        for (let i = 1; i <= this.diceNum; i++) {
            let imgBox: HTMLImageElement = document.querySelector('#img' + i);
            this.AllDice.push(new Die(6, imgBox));
        }
    }

    private logRoll(dicenum: number, rollsum: number) {
        this._rollHistory.push([dicenum, rollsum]);
        this._avgRoll = this.avgRoll();
        this._lastSum = rollsum;
    }

    rollAll() {
        let rolls: number[] = [];
        let rollSum: number = 0;
        let minimal: number = (this.diceNum) * 1;
        let maximal: number = (this.diceNum) * 6;
        for (let i = 0; i < this.AllDice.length; i++) {
            let currRoll: number = this.AllDice[i].roll();
            rollSum += currRoll;
            rolls.push(currRoll);
        }
        setTimeout(() => { this.playSound(rollSum, minimal, maximal, rolls) }, 2000);
        console.log(rollSum);
        this._totalRolls++;
        this.logRoll(this.diceNum, rollSum);
    }

    private playSound(num: number, min: number, max: number, rolls: number[]) {
        let minmax: boolean = false;

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
        if (this.allSame(rolls) == true && minmax == false) {
            yay.load();
            yay.play();
        }
        minmax = false;

    }

    allSame(array: number[]): boolean {
        let firstI: number = array[0];
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

    private avgRoll(): number {
        let diceRolls: number = 0;
        let rollSums: number = 0;

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
        setTimeout(() => { this.postStats(); }, 2500);
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
            let imgBox: HTMLImageElement = document.querySelector('#img' + i);
            if (i > this.diceNum) {
                imgBox.style.display = 'none';
            } else { imgBox.style.display = 'inline-block'; }
        }

    }

    private postStats() {
        let str1: string = 'Sum: ' + this._lastSum + '<br>';
        let str2: string = 'Total times rolled: ' + this._totalRolls + '<br>';
        let str3: string = 'Total dice rolled: ' + this._diceRolls + '<br>';
        let str4: string = 'Sum of all rolls: ' + this._sumOfAllRolls + '<br>';
        let str5: string = 'Total roll average: ' + this._avgRoll.toFixed(2) + '<br>';
        let str6: string = 'All same value rolls: ' + this._sameRolls + '<br>';

        this.statsContainer.innerHTML = str1 + str2 + str3 + str4 + str5;
    }
}
