let pageContainer : HTMLDivElement = document.querySelector('#pageContainer');
pageContainer.style.width = window.innerWidth + 'px';
pageContainer.style.height = window.innerHeight + 'px';

let yeah: HTMLAudioElement = new Audio('./Sounds/yeah.mp3');
let shit: HTMLAudioElement = new Audio('./Sounds/shit.mp3');
let diceroll: HTMLAudioElement = new Audio('./Sounds/diceroll.mp3');
let yay: HTMLAudioElement = new Audio('./Sounds/yay.mp3');

let DiceMain: Dice = new Dice();
DiceMain.initImageBoxes();
DiceMain.initDice();
DiceMain.bindBtn();
DiceMain.hideImages();