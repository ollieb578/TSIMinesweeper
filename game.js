// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// game.js
// Runs all core game logic. Initializes board, and handles UI functions. Called by main.js only.

// TODO: implement difficulty settings somehow.
//
// easy:     8x10 board, 10 mines
// medium:  14x18 board, 40 mines
// hard:    20x24 board, 99 mines
// 
// can't support boards larger than 00x26, need to work on UI class

// class imports for game
const Grid = require("./grid");
const UI = require("./ui");

class Game {
    constructor() {
        // TODO: sort this out, build a difficulty picker in main or something
        this.grid = new Grid();

        this.ui = new UI(this.grid);
        this.gameOver = false;
    }

    // contains all the necessary logic for the whole game
    // initializes grid and ui
    play(){
        this.grid.populate();
        this.ui.printGrid();

        while (!this.gameOver) {

        }
    }
}