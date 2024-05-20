// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// grid.js
// Grid object class.

const Tile = require("./tile");

class Grid {
    constructor(xsize, ysize, mines) {
        this.xsize = xsize;
        this.ysize = ysize;
        this.mines = mines;
        this.tiles = [];
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
        let mineX;
        let mineY;

        // create tile array of xs for each y
        for (let y = 0; y < this.ysize; y++) {
            let yArray = [];

            // create tile for each x
            for (let x = 0; x < this.xsize; x++) {
                    yArray.push(new Tile("empty"));
            }

            this.tiles.push(yArray);
        }

        // populates grid with mines
        for (let i = 0; i < this.mines; i++) {
            while (mineX.isNaN() || this.tiles[mineY][mineX].getType() == "mine") {
                mineX = this.getRandomIntInclusive(0, this.xsize - 1);
                mineY = this.getRandomIntInclusive(0, this.ysize - 1);
            } 

            this.tiles[mineY][mineX].setType("mine");
        }
    }

    // reveals contents of selected tile. checks 3x3 area around tile if it's not a bomb.
    // RECURSIVE:
    reveal(x, y) {
        
    }

    // gets tiles array object
    getTiles() {
        return this.tiles;
    }
}

module.exports = Grid