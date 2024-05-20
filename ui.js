// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// ui.js
// User interface class. Handles printing of game data to console, as well as user input and flag functionality.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Grid = require("./grid");

// global vars
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Ui {
    constructor(grid) {
        this.grid = grid;
        this.flagMask = new Array(grid.ysize).fill("*").map(() => new Array(grid.xsize).fill("*"));
    }

    // prints the current state of the grid
    // reads the revealMask from the grid object, then overlays user flags onto it
    printGrid() {
        const displayGrid = this.grid.getRevealMask();

        console.log("\nMINESWEEPER\n");

        process.stdout.write("   ");

        // print alphabetical labels along the top
        for (let x in displayGrid[0]) {
            process.stdout.write(alpha[x] + "  ");
        }
        
        // print rows, and row labels
        for (let y in displayGrid) {
            process.stdout.write("\n" + y);

            for (let x in displayGrid[y]) {
                process.stdout.write("  " + displayGrid[y][x]);
            }
        }

    }

    // prints the full grid, used when the game ends
    // reads the tiles from the grid object
    printFullGrid() {

    }

    // takes an input from the user on whether they want to guess a tile or place a flag
    userInput() {

    }

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    guessInput() {

    }

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    flagInput() {

    }
}

module.exports = Ui;