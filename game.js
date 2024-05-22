// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// game.js
// Runs all core game logic. Initializes board, and handles UI functions. Called by main.js only.

// easy:     8x10 board, 10 mines
// medium:  14x18 board, 40 mines
// hard:    20x24 board, 99 mines

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
        this.elapsed = 0;
    }

    // contains all the necessary logic for the whole game
    // initializes grid and ui
    // returns time elapsed if won, false if lost
    // this is definitely bad practise but it does make things easier
    play(){
        const start = Date.now();
        let turn = 0;

        this.grid.populate();

        while (!this.gameOver) {
            this.ui.printGrid();

            if (!this.ui.userInput()){
                if (turn == 0) {
                    this.grid.populate();
                } else {
                    this.ui.printFullGrid();
                    console.log("\n\n================ GAME OVER ! ================");
                    this.gameOver = true;
                }
            }

            if (this.grid.checkWin()){
                this.ui.printFullGrid();
                console.log("\n\n================  YOU WIN !  ================");

                this.elapsed = Math.ceil((Date.now() - start)/1000);
                console.log("Time: " + this.elapsed);
                
                this.gameOver = true;

                return true;
            }

            turn += 1;
        }

        return false;
    }

    // get the time elapsed attribute
    getTime(){
        return this.elapsed;
    }
}

module.exports = Game;