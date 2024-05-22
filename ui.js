// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// ui.js
// User interface class. Handles printing of game data to console, as well as user input and flag functionality.

// external imports
const prompt = require("prompt-sync")();
const colors = require("colors");

// class imports for game
const Grid = require("./grid");

// global vars
// alphabet array for X mappings - there's probably a better way to do this
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Ui {
    constructor(grid) {
        this.grid = grid;
        this.flagMask = new Array(grid.ysize).fill("*").map(() => new Array(grid.xsize).fill("*"));
        this.flagCount = grid.getMines();
    }

    // prints the current state of the grid
    // reads the revealMask from the grid object, then overlays user flags onto it
    printGrid() {
        const displayGrid = this.grid.getRevealMask();

        console.log("\n\nMINESWEEPER                  " + this.flagCount + " F".red + "\n");

        process.stdout.write("    ");

        // print alphabetical labels along the top
        for (let x in displayGrid[0]) {
            process.stdout.write(alpha[x] + "  ");
        }

        // print rows, and row labels
        for (let y in displayGrid) {
            // print row labels with correct spacing
            if (y < 10) {
                process.stdout.write("\n " + y);
            } else {
                process.stdout.write("\n" + y);
            }

            // implementing colours based on what's on the tile
            // red for flags, yellow for numbers greater than 0, green for 0
            for (let x in displayGrid[y]) {
                if (this.flagMask[y][x] == "F") {
                    process.stdout.write("  F".red);
                } else {
                    if (displayGrid[y][x] == "0") {
                        process.stdout.write("  0".green);
                    } else if (displayGrid[y][x] != "*" && displayGrid[y][x] > 0) {
                        process.stdout.write("  " + String(displayGrid[y][x]).yellow);
                    } else {
                        process.stdout.write("  " + displayGrid[y][x]);
                    }
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
                    process.stdout.write("  M".red);
                } else {
                    process.stdout.write("  _");
                }
            }
        }
    }

    // takes an input from the user on whether they want to guess a tile or place a flag
    // returns true if the game isn't over, false if the user has tripped a mine
    //  probably a bit dodgy, shouldn't be mixing UI functionality and game logic like this
    //  all the functions from here onwards hook directly into grid and interact with its
    //  attributes.
    userInput() {
        console.log("\n");
        let input = prompt("Place [F]lag or [*G]uess a tile?").toLowerCase().trim();

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
            && alpha.slice(0, this.grid.xsize).includes(coords[0]) // if x coordinate valid
            && coords[1] >= 0 // if y coordinate larger than 0
            && coords[1] < this.grid.ysize // if y coordinate smaller than limit
        ) {
            return true;
        } 

        return false;
    }

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    // returns true if the game isn't over, false if the user has tripped a mine
    guessInput() {
        const text = "Enter the tile's coordinates (in the form 'x 3'): ";
        let input = prompt(text).toUpperCase().trim();

        while (!this.validateInput(input)){
            console.log("Input not valid. Please try again");
            input = prompt(text).toUpperCase().trim();
        }

        // pulls values out of user input
        let coords = input.split(" ");
        let xval = alpha.indexOf(coords[0]);
        let yval = coords[1];

        // runs reveal function in grid
        if (this.grid.reveal(xval, yval) != "gameover") {
            // remove flag
            if (this.flagMask[yval][xval] == "F") {
                this.flagMask[yval][xval] = "*";
                this.flagCount += 1;
            }

            return true;
        } else {
            return false;
        }
    }   

    // takes user guesses as input in the form "x00" where "x" is the column label and "00" is the row number
    // returns true
    flagInput() {
        const displayGrid = this.grid.getRevealMask();
        const text = "Enter the tile's coordinates (in the form 'x 3') to place/remove flag: ";
        let input = prompt(text).toUpperCase().trim();
        
        // validation
        while (!this.validateInput(input)){
            input = prompt(text).toUpperCase().trim();
            console.log("Input not valid. Please try again")
        }

        // pulls values out of user input
        let coords = input.split(" ");
        let xval = alpha.indexOf(coords[0]);
        let yval = coords[1];

        // adds flag to flagMask object
        if (this.flagMask[yval][xval] != "F") {
            if (displayGrid[yval][xval] == "*") {
                this.flagMask[yval][xval] = "F";
                this.flagCount -= 1;
            } else {
                console.log("\nCan't flag this!".red);
            }
        } else {
            this.flagMask[yval][xval] = "*";
            this.flagCount += 1;
        }
        
        return true;
    }
}

module.exports = Ui;