// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// grid.js
// Grid object class.
// This is the board where the game is played, and as such stores the bulk of the logic.

const Tile = require("./tile");

class Grid {
    constructor(xsize, ysize, mines) {
        this.xsize = xsize;
        this.ysize = ysize;
        this.mines = mines;
        this.turn = 0;
        this.tiles; // this is a 2D array, index as [y][x] for positional coordinates.
        this.revealMask = new Array(ysize).fill("*").map(() => new Array(xsize).fill("*")); // this is a 2D array, like tiles. shows which tiles have been revealed, and their values.
    }

    // creates a random integer between (and including) values specified
    // needed for mine placement
    // sourced from : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    // populates the tiles array with tile objects
    // this includes setting positions of the bombs
    populate() {
        this.tiles = [];

        let mineX;
        let mineY;
        let yArray = [];

        // create tile array of xs for each y
        for (let y = 0; y < this.ysize; y++) {
            yArray = [];

            // create tile for each x
            for (let x = 0; x < this.xsize; x++) {
                    yArray.push(new Tile("empty"));
            }

            this.tiles.push(yArray);
        }

        // populates grid with mines
        for (let i = 0; i < this.mines; i++) {
            // probably bad practise because in theory it /can/ run forever
            // statistics says it won't
            do {
                mineX = this.getRandomIntInclusive(0, this.xsize - 1);
                mineY = this.getRandomIntInclusive(0, this.ysize - 1);
            } while (this.tiles[mineY][mineX].getType() == "mine");

            this.tiles[mineY][mineX].setType("mine");
        }
    }

    // reveals contents of selected tile. checks 3x3 area around tile if it's not a bomb.
    // returns:
    // string - "gameover" if mine guessed
    // RECURSIVE: calls itself iff the current cell hasn't got a value, and there are no 
    //              mines in its radius.
    reveal(x, y) {
        let minecount = 0;
        let currentX;
        let currentY;
        
        if (this.tiles[y][x].getType() == "mine") {
            // prevents user from losing on first turn
            // can potentially recurse forever, possible solution is to transpose mine to fixed position?
            if (this.turn == 0) {
                this.populate();
                this.reveal(x,y);
                this.turn = 0;
            } else {
                return("gameover");
            }
        } else if (this.revealMask[y][x] == "*") {
            // for all surrounding tiles
            // y modifier
            for (let i = -1; i < 2; i++) {
                // x modifier
                for (let j = -1; j < 2; j++) {
                    currentX = Number(x) + j;
                    currentY = Number(y) + i;
                    
                    // if in range of grid
                    if (currentY >= 0 && currentY < this.ysize && currentX >= 0 && currentX < this.xsize) {
                        //check if mine
                        if (this.tiles[currentY][currentX].getType() == "mine") {
                            minecount += 1;
                        }
                    }
                }
            }

            // sets the value onto the revealMask to be displayed to user
            this.revealMask[y][x] = minecount;
            
            // if no mines detected in 3x3 radius
            if (minecount == 0) {
                // for all surrounding tiles
                // y modifier
                for (let i = -1; i < 2; i++) {
                    // x modifier
                    for (let j = -1; j < 2; j++) {
                        currentX = Number(x) + j;
                        currentY = Number(y) + i;

                        // if in range of grid
                        if (currentY >= 0 && currentY < this.ysize 
                            && currentX >= 0 
                            && currentX < this.xsize) {
                            this.reveal(currentX, currentY);
                        }
                    }
                }
            }
        }
    }

    // checks for win condition
    // this is probably inefficient but i couldn't think of a better way to do it
    checkWin() {
        let minecount = 0;

        // iterate rows
        for (let y = 0; y < this.ysize; y++) {
            // iterate columns
            for (let x = 0; x < this.xsize; x++) {
                // check for presence of "*" in grid
                if (this.revealMask[y][x] == "*") {
                    minecount += 1;
                }
            }
        }

        if (minecount == this.mines) {
            return true;
        }

        return false;
    }

    // gets ysize attribute
    getYsize() {
        return this.ysize;
    }

    // gets xsize attribute
    getXsize() {
        return this.xsize;
    }

    // gets mines attribute
    getMines() {
        return this.mines;
    }

    // gets tiles array object
    getTiles() {
        return this.tiles;
    }

    // gets mask array object
    getRevealMask() {
        return this.revealMask;
    }
}

module.exports = Grid;