// TSI Javascript Minesweeper project
// By Oliver Barnes, 20/05/2024

// leaderboard.js
// Implements all leaderboard functions, including reading and writing to the leaderboard.json file.

// external imports
const fs = require("fs");
const prompt = require("prompt-sync")();

class Leaderboard {
    constructor(){
        this.filepath = "./leaderboard.json";
    }

    // reads contents of leaderboard.json file
    // returns JSON object containing all data in the file
    readLeaderboard() {
        let data;
        try {
            data = JSON.parse(fs.readFileSync("./leaderboard.json"));
        } catch (Error) {
            console.log("Error: leaderboard.json is not present or cannot be accessed.");
        }
    
        return(data);
    }

    // maps integer representation of difficulty to its text equivalent
    difficultyMap(difficulty) {
        let textDifficulty;

        switch (difficulty) {
            case 1:
                textDifficulty = "easy";
                break;
            case 2:
                textDifficulty = "medium";
                break;
            case 3:
                textDifficulty = "hard";
                break;
            case 4:
                textDifficulty = "hard";
                break;
        }

        return textDifficulty;
    }

    // print for all leaderboard entries of a given difficulty
    printLeaderboard(difficulty) {
        let textDifficulty = this.difficultyMap(difficulty);

        const data = this.readLeaderboard().leaderboard;
        const entries = data.filter(function(data) { return data.Difficulty == textDifficulty; })[0].Entries;

        console.log("================ LEADERBOARD ================");

        if (textDifficulty == "medium") {
            console.log("============= Difficulty: medium ============");
        } else {
            console.log("============== Difficulty: " + textDifficulty + " =============");
        }

        for (let entry in entries) {
            console.log("             " + entries[entry].name + "            " + entries[entry].time);
        }        
    }

    // adds a new entry to the leaderboard.
    newEntry(difficulty, time) {
        let textDifficulty = this.difficultyMap(difficulty);

        const data = this.readLeaderboard();
        const entries = data.leaderboard.filter(function(data) { return data.Difficulty == textDifficulty; })[0].Entries;
        
        let name = "a";

        while (name.length != 5) {
            name = prompt("Enter your name for the leaderboard! 5 chars: ");
        }
        
        entries.push({"name" : name, "time" : time});
        
        const jsonData = JSON.stringify(data);
        fs.writeFileSync("leaderboard.json", jsonData);
    }
}

module.exports = Leaderboard;