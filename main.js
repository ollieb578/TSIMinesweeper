// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// main.js
// Executable js file that runs the minesweeper game.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Game = require("./game");

function chooseDifficulty() {
    let userChoice = prompt("Choose difficulty: [*1] Easy, [2] Medium, [3] Hard: ").toLowerCase();

    switch (userChoice) {
        case "3":
            return 3;
        case "2":
            return 2;
        default:
            return 1;
    }
}

function main() {
    let wins = 0;

    console.log("\nWelcome to: \n     M I N E S W E E P E R");

    let userChoice = prompt("Start new game? [*Y]es or [N]o: ").toLowerCase();

    if (userChoice != "n") {
        let game = new Game(chooseDifficulty());

        if (game.play()){
            wins += 1;
        }
        
        main();
    }
    
    console.log("Exiting...")
}

main();