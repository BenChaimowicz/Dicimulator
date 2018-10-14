
class Die {
    faces: number;
    min: number = 1;
    d6imgs: string[] = [];
    drawTgt: HTMLImageElement;

    constructor(faces: number=6,drawTgt:HTMLImageElement) {
        this.faces = faces;
        this.drawTgt = drawTgt;

        for (let i = 1; i <= faces; i++) {
            this.d6imgs.push(('./Images/' + i + '.png'));
        }
        
    }

    private fitPic(num: number) {
        this.drawTgt.src = this.d6imgs[num - 1];
    }

    private rollDice(): number {
        let rolledNum: number = Math.floor(Math.random() * (this.faces - this.min + 1) + this.min);
        return rolledNum;
    }

    private changePics(faces: number = this.faces) {
        let rnd: number = Math.floor(Math.random() * (this.faces - this.min + 1)+this.min);
        this.drawTgt.src = this.d6imgs[rnd-1];
    }

    public roll(): number {
        
        let result: number = this.rollDice();
        let timer: number = setInterval(() => { this.changePics() }, 250);
        let timer2: number;
        setTimeout(() => { clearInterval(timer); timer2 = setInterval(() => { this.changePics() }, 500); }, 1000);
        setTimeout(() => { clearInterval(timer2); this.fitPic(result); }, 2000);
        console.log(result);
        return result;
    }
}