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
    constructor(difficulty) {
        // difficulty picker
        if (difficulty == 3) {
            this.grid = new Grid(24, 20, 99);
        } else if (difficulty == 2) {
            this.grid = new Grid(18, 14, 40);
        } else {
            this.grid = new Grid(10, 8, 10);
        }

        this.ui = new UI(this.grid);
        this.gameOver = false;
    }

    // contains all the necessary logic for the whole game
    // initializes grid and ui
    // returns true if game won, false if lost
    play(){
        this.grid.populate();

        while (!this.gameOver) {
            this.ui.printGrid();

            if (!this.ui.userInput()){
                console.log("================ GAME OVER ! ================");
                this.ui.printFullGrid();
                this.gameOver = true;
            }

            if (this.grid.checkWin()){
                console.log("================  YOU WIN !  ================");
                this.ui.printFullGrid();
                this.gameOver = true;

                return true;
            }
        }

        return false;
    }
}

module.exports = Game;