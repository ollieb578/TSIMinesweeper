// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// main.js
// Executable js file that runs the minesweeper game.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Grid = require("./grid");

let a = new Grid(2,3,2);
a.populate();

console.log(a.getTiles());