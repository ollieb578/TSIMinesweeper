// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// tile.js
// Tile object class.

class Tile {
    constructor(type) {
        this.type = type;
    }

    // returns:
    // this.type - string, the type of the tile object, either "empty" or "mine"
    getType() {
        return this.type;
    }

    // params:
    // type - string, either "empty" or "mine"
    setType(type) {
        this.type = type;
    }
}

module.exports = Tile;