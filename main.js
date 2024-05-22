// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// main.js
// Executable js file that runs the minesweeper game.

// external imports
const prompt = require("prompt-sync")();

// class imports for game
const Game = require("./game");
const Leaderboard = require("./leaderboard");

function chooseDifficulty() {
    console.log("\nChoose difficulty:")
    let userChoice = prompt("[*1] Easy, [2] Medium, [3] Hard: ").toLowerCase();

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
    let leaderboard = new Leaderboard();

    console.log("\nWelcome to: \n     M I N E S W E E P E R\n");

    let userChoice = prompt("Start new game? [*Y]es or [N]o: ").toLowerCase();

    while (userChoice != "n") {
        let difficulty = chooseDifficulty();
        let game = new Game(difficulty);

        if (game.play() != false){
            wins += 1;

            leaderboard.newEntry(difficulty, game.getTime());
        }

        leaderboard.printLeaderboard(difficulty);

        console.log("\n");
        userChoice = prompt("Start new game? [*Y]es or [N]o: ").toLowerCase();
    }
    
    console.log("Exiting...");
}

main();