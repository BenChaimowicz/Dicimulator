"use strict";
class Die {
    constructor(faces = 6, drawTgt) {
        this.min = 1;
        this.d6imgs = [];
        this.faces = faces;
        this.drawTgt = drawTgt;
        for (let i = 1; i <= faces; i++) {
            this.d6imgs.push(('./images/' + i + '.png'));
        }
    }
    fitPic(num) {
        this.drawTgt.src = this.d6imgs[num - 1];
    }
    rollDice() {
        let rolledNum = Math.floor(Math.random() * (this.faces - this.min + 1) + this.min);
        return rolledNum;
    }
    changePics(faces = this.faces) {
        let rnd = Math.floor(Math.random() * (this.faces - this.min + 1) + this.min);
        this.drawTgt.src = this.d6imgs[rnd - 1];
    }
    roll() {
        let result = this.rollDice();
        let timer = setInterval(() => { this.changePics(); }, 250);
        let timer2;
        setTimeout(() => { clearInterval(timer); timer2 = setInterval(() => { this.changePics(); }, 500); }, 1000);
        setTimeout(() => { clearInterval(timer2); this.fitPic(result); }, 2000);
        console.log(result);
        return result;
    }
}
