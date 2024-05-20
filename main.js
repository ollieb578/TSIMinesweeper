// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// main.js
// Executable js file that runs the minesweeper game.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Grid = require("./grid");
const UI = require("./ui");


let a = new Grid(10,8,10);
a.populate();

//console.log(a.getTiles());
console.log(a.getRevealMask());

a.reveal(1,1);
a.reveal(2,2);

console.log(a.getRevealMask());

let b = new UI(a);
b.printGrid();