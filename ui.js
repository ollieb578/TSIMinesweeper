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

        console.log("\n\nMINESWEEPER\n");

        process.stdout.write("   ");

        // print alphabetical labels along the top
        for (let x in displayGrid[0]) {
            process.stdout.write(alpha[x] + "  ");
        }
        
        // print rows, and row labels
        for (let y in displayGrid) {
            process.stdout.write("\n" + y);

            for (let x in displayGrid[y]) {
                if (this.flagMask[y][x] != "F") {
                    process.stdout.write("  " + displayGrid[y][x]);
                } else {
                    process.stdout.write("  F");
                }
            }
        }
    }

    // prints the full grid, used when the game ends
    // reads the tiles from the grid object
    printFullGrid() {
        const displayGrid = this.grid.getTiles();

        console.log("\n\nMINESWEEPER\n");

        process.stdout.write("   ");

        // print alphabetical labels along the top
        for (let x in displayGrid[0]) {
            process.stdout.write(alpha[x] + "  ");
        }
        
        // print rows, and row labels
        for (let y in displayGrid) {
            process.stdout.write("\n" + y);

            for (let x in displayGrid[y]) {
                if(displayGrid[y][x].getType() == "mine") {
                    process.stdout.write("  M");
                } else {
                    process.stdout.write("  _");
                }
            }
        }
    }

    // takes an input from the user on whether they want to guess a tile or place a flag
    // returns true if the game isn't over, false if the user has tripped a mine
    // probably a bit dodgy, shouldn't be mixing UI functionality and game logic like this
    userInput() {
        let input = prompt("Place [F]lag or [*G]uess a tile?").toLowerCase();

        if (input == "f") {
            return(this.flagInput());
        } else {
            return(this.guessInput());
        }
    }

    // validates user input
    // returns true if valid, false otherwise
    validateInput(input) {
        let coords = input.split(" ");

        if (coords.length == 2 
            && coords[0] in alpha.slice(0, this.grid.xsize - 1)
            && coords[1] >= 0 
            && coords[1] < this.grid.ysize
        ) {
            return true;
        } 

        return false;
    }

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    // returns true if the game isn't over, false if the user has tripped a mine
    guessInput() {
        let input = prompt("Enter the tile's coordinates (in the form 'x 3'): ").toUpperCase();
        let coords = input.split(" ");

        while (!this.validateInput(input)){
            input = prompt("Enter the tile's coordinates (in the form 'x 3'): ").toUpperCase();
            console.log("Input not valid. Please try again")
        }

        let xval = alpha.indexOf(coords[0]);
        let yval = coords[1];

        return(this.grid.reveal(xval, yval));
    }   

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    // returns true
    flagInput() {
        let input = prompt("Enter the tile's coordinates (in the form 'x 3'): ").toUpperCase();
        let coords = input.split(" ");

        while (!this.validateInput(input)){
            input = prompt("Enter the tile's coordinates (in the form 'x 3'): ").toUpperCase();
            console.log("Input not valid. Please try again")
        }

        let xval = alpha.indexOf(coords[0]);
        let yval = coords[1];

        this.flagMask[yval][xval] = "F";
        return true;
    }
}

module.exports = Ui;