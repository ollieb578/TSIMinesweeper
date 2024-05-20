// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// main.js
// Executable js file that runs the minesweeper game.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Tile = require("./tile");

let a = new Tile(type = "Bomb");

console.log(a.getType());